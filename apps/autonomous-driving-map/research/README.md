# 実証実験データ 再探索ワークフロー

## 1. 台帳生成（47都道府県 + 並列バッチ）

```bash
node scripts/prepare-prefecture-research.mjs
```

生成物:
- `prefecture-research-plan.json`
- `prefecture-research-plan.md`
- `candidates.json`

## 2. 候補入力

`candidates.json` の各都道府県に `candidates` を追加する。

候補1件の推奨フォーマット:

```json
{
  "title": "日立市における自動運転レベル4認可取得について",
  "url": "https://www.hitachi.lg.jp/",
  "date": "2024-11-26",
  "sourceType": "primary",
  "decision": "pending",
  "note": "既存exp-009の参照更新候補"
}
```

`decision` は以下のいずれか:
- `new`
- `update`
- `exclude`
- `pending`

## 3. 候補検証

```bash
node scripts/validate-research-candidates.mjs apps/autonomous-driving-map/research/candidates.json
```

## 4. data.js 反映前チェック

```bash
node scripts/validate-data.mjs
```

## ポリシー（この台帳の前提）

- 対象: 自動運転実証のみ
- ソース: 一次情報優先（省庁/自治体/企業公式）
- 計画案件: 採択済み・未運行は `計画中` で管理
- 期間: 2023-01-01 以降中心
