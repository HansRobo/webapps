// reference整合性チェックスクリプト
// data.jsのrefs/references間の整合性を検証する

const fs = require('fs');
const path = require('path');

// data.jsをEXPERIMENTSとして読み込む
const dataPath = path.join(__dirname, 'data.js');
const raw = fs.readFileSync(dataPath, 'utf-8');

// EXPERIMENTS配列を評価
let EXPERIMENTS;
try {
  const code = raw.replace(/^\/\/.*$/gm, '').replace('const EXPERIMENTS = ', 'EXPERIMENTS = ');
  EXPERIMENTS = eval(`(function(){ var EXPERIMENTS; ${code}; return EXPERIMENTS; })()`);
} catch (e) {
  console.error('data.js parse error:', e.message);
  process.exit(1);
}

// 全フィールドからrefsを再帰的に収集
function collectRefs(obj) {
  const refs = new Set();
  if (!obj || typeof obj !== 'object') return refs;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      for (const r of collectRefs(item)) refs.add(r);
    }
    return refs;
  }
  for (const [key, val] of Object.entries(obj)) {
    if (key === 'refs' && Array.isArray(val)) {
      for (const r of val) refs.add(r);
    } else if (key === 'references') {
      // referencesフィールド自体は除外（参照元ではなく定義側）
    } else {
      for (const r of collectRefs(val)) refs.add(r);
    }
  }
  return refs;
}

// 空refsを持つフィールドを収集
function collectEmptyRefs(obj, expId, parentKey = '') {
  const results = [];
  if (!obj || typeof obj !== 'object') return results;
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      results.push(...collectEmptyRefs(item, expId, `${parentKey}[${i}]`));
    });
    return results;
  }
  for (const [key, val] of Object.entries(obj)) {
    if (key === 'references') continue;
    if (key === 'refs' && Array.isArray(val) && val.length === 0) {
      results.push({ expId, field: parentKey });
    } else if (typeof val === 'object') {
      results.push(...collectEmptyRefs(val, expId, key));
    }
  }
  return results;
}

const issues = {
  missingRef: [],    // refsに存在しない参照ID
  unusedRef: [],     // 使われていないreference
  emptyRefs: [],     // refs: []
  duplicateId: [],   // references内の重複ID
};

for (const exp of EXPERIMENTS) {
  const refs = exp.references || [];
  const definedIds = new Set(refs.map(r => r.id));

  // 重複ID
  const seen = new Set();
  for (const r of refs) {
    if (seen.has(r.id)) {
      issues.duplicateId.push({ expId: exp.id, refId: r.id });
    }
    seen.add(r.id);
  }

  // 使われているID収集（references自体を除く）
  const usedIds = collectRefs({ ...exp, references: undefined });

  // 存在しない参照ID
  for (const usedId of usedIds) {
    if (!definedIds.has(usedId)) {
      issues.missingRef.push({ expId: exp.id, refId: usedId });
    }
  }

  // 未使用参照
  for (const r of refs) {
    if (!usedIds.has(r.id)) {
      issues.unusedRef.push({ expId: exp.id, refId: r.id, title: r.title });
    }
  }

  // 空refs
  issues.emptyRefs.push(...collectEmptyRefs(exp, exp.id));
}

// 結果出力
console.log('=== Phase 1: 構造チェック結果 ===\n');

console.log(`【存在しない参照ID】 ${issues.missingRef.length}件`);
for (const i of issues.missingRef) {
  console.log(`  ${i.expId}: refs に ${i.refId} が使われているが references に存在しない`);
}

console.log(`\n【未使用参照】 ${issues.unusedRef.length}件`);
for (const i of issues.unusedRef) {
  console.log(`  ${i.expId}: id=${i.refId} "${i.title}" が未使用`);
}

console.log(`\n【空のrefs】 ${issues.emptyRefs.length}件`);
for (const i of issues.emptyRefs) {
  console.log(`  ${i.expId}: ${i.field} の refs が空`);
}

console.log(`\n【重複参照ID】 ${issues.duplicateId.length}件`);
for (const i of issues.duplicateId) {
  console.log(`  ${i.expId}: id=${i.refId} が重複`);
}

// URLリスト出力（Phase 2用）
const urls = [];
for (const exp of EXPERIMENTS) {
  for (const ref of (exp.references || [])) {
    urls.push({ expId: exp.id, refId: ref.id, url: ref.url, title: ref.title });
  }
}
console.log(`\n総URL数: ${urls.length}`);

// JSON形式で保存（URLチェック用）
fs.writeFileSync(
  path.join(__dirname, 'research', 'reference-urls.json'),
  JSON.stringify(urls, null, 2),
  'utf-8'
);
console.log('research/reference-urls.json に全URL一覧を保存しました');

// 構造チェック結果をJSONで保存
fs.writeFileSync(
  path.join(__dirname, 'research', 'reference-structure-issues.json'),
  JSON.stringify(issues, null, 2),
  'utf-8'
);
console.log('research/reference-structure-issues.json に構造チェック結果を保存しました');
