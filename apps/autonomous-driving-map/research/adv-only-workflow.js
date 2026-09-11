export const meta = {
  name: 'admap-adv-only',
  description: '検証済みverifyに対し敵対的再検証のみを実行（adv失敗分の補完）',
  phases: [{ title: 'Adversarial', detail: '各expのverify提案を独立に再取得して反証' }],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const expDir = A.expDir
const items = A.items || [] // [{expId, verify}]
if (!expDir || items.length === 0) throw new Error('args missing expDir/items; got type=' + typeof args)

const ADVERSARIAL_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['expId', 'reviewedClaims', 'splitVerdict', 'confirmedCorrections', 'rejectedCorrections', 'finalRecommendation'],
  properties: {
    expId: { type: 'string' },
    reviewedClaims: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['claim', 'verdict', 'reasoning'], properties: { claim: { type: 'string' }, verdict: { type: 'string', enum: ['upheld', 'refuted', 'uncertain'] }, reasoning: { type: 'string' } } } },
    splitVerdict: { type: 'string', enum: ['agree', 'disagree', 'n/a'] },
    confirmedCorrections: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['field', 'correction', 'confidence'], properties: { field: { type: 'string' }, correction: { type: 'string' }, confidence: { type: 'string', enum: ['high', 'medium', 'low'] } } } },
    rejectedCorrections: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['field', 'correction', 'reason'], properties: { field: { type: 'string' }, correction: { type: 'string' }, reason: { type: 'string' } } } },
    finalRecommendation: { type: 'string' },
  },
}

function advPrompt(expId, verify) {
  return `あなたは「敵対的検証官」です。先行検証官が提案した訂正・分割・情報源追加を、独立に情報源を再取得して反証を試みてください。デフォルトは懐疑的（裏付けが不確かなら upheld にせず uncertain か refuted）。

手順:
1. WebFetch/WebSearch を ToolSearch query "select:WebFetch,WebSearch" でロード。
2. Read で ${expDir}/${expId}.json を読み、元レコードを把握する。
3. 下記の先行検証官の提案について、関係するURLを自分で WebFetch し（必要なら WebSearch で裏取り）、事実を独立に確認する。
4. 各訂正/分割主張に upheld（情報源が確実に訂正を支持）/ refuted（訂正は誤り・元の値が妥当）/ uncertain（判断不能）を付す。
5. confirmedCorrections には情報源で確実に裏付けられた訂正のみ残し、却下したものは rejectedCorrections に理由付きで記す。分割提案には splitVerdict（agree/disagree/n/a）を返す。

先行検証官の出力(JSON):
${JSON.stringify(verify)}

expId は "${expId}" を設定すること。`
}

phase('Adversarial')
log(`${items.length} 件の敵対的再検証を実行します`)

const results = await pipeline(
  items,
  (it) => agent(advPrompt(it.expId, it.verify), { label: `adv:${it.expId}`, phase: 'Adversarial', schema: ADVERSARIAL_SCHEMA })
    .then((adv) => ({ expId: it.expId, verify: it.verify, adversarial: adv }))
)

return results
