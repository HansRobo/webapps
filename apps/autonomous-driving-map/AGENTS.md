# 自動運転実証実験マップ — エージェント向けデータ編集ガイドライン

このファイルはコーディングエージェントがデータを追加・更新する際の必須ルールと手順を定めます。

---

## ⚠️ 最重要ルール: schema.js の定数を直接参照する

`data.js` の `status`, `prefecture`, `vehicle`, `adSystem` フィールドで **文字列リテラルを書いてはならない**。

```js
// ❌ NG: 文字列リテラルで書く（タイポが気づかれない・表記ゆれの原因）
status:     { value: "実施中", refs: [1] }
prefecture: { value: "茨城県", refs: [1] }
vehicle:    { value: "NAVYA ARMA", refs: [2] }
adSystem:   { value: "NAVYA", refs: [] }

// ✅ OK: schema.js の定数を直接参照（タイポすると即 undefined → バリデーターで検出）
status:     { value: STATUS.ACTIVE, refs: [1] }
prefecture: { value: PREF.IBARAKI, refs: [1] }
vehicle:    { value: VEH.NAVYA_ARMA, refs: [2] }
adSystem:   { value: ADS.NAVYA, refs: [] }
```

`STATUS.*`, `PREF.*`, `VEH.*`, `ADS.*` はすべて `schema.js` で定義されている。
新しい車両・ADシステムが必要な場合は **schema.js を先に編集してから** data.js を更新する。

---

## データ追加・更新の手順

### 1. 既存エントリの更新

```
a. schema.js を確認（必要な定数が存在するか）
b. data.js の該当エントリを編集
   - 更新した情報に合わせてフィールドを修正
   - 新しい情報源があれば references に追加（既存エントリを削除しない）
c. node apps/autonomous-driving-map/validate-data.mjs でエラーなしを確認
```

### 2. 新規実験エントリの追加

```
a. schema.js に未登録の車両・ADシステムがある場合は VEH.* / ADS.* に追加する
b. 新規組織名がある場合は schema.js の KNOWN_ORGS に追加する（警告を消すため）
c. data.js に新エントリを追加
   - id は "exp-XXX" 形式（最後のIDの次の連番）
   - 必須フィールド: id, name, location, prefecture, period, status,
                     description, vehicle, adSystem, route, operationType,
                     stakeholders, references
   - references に最低1件の一次情報URLを追加する
   - 不明な値は null（例: adSystem: null）
d. node apps/autonomous-driving-map/validate-data.mjs で確認
```

---

## エントリの正しい形式

```js
{
  id: "exp-XXX",
  name: { value: "実験の正式名称", refs: [1] },
  location: { value: "都道府県・市区町村（具体的な場所）", lat: 35.000, lng: 135.000, refs: [1] },
  prefecture: { value: PREF.TOKYO, refs: [1] },          // ← PREF.* 必須
  period: { value: "2024年〜（継続中）", refs: [1] },
  status: { value: STATUS.ACTIVE, refs: [1] },            // ← STATUS.* 必須
  description: {
    value: "実験の詳細説明。できるだけ具体的に。",
    refs: [1, 2]
  },
  vehicle: { value: VEH.NAVYA_ARMA, refs: [2] },          // ← VEH.* 必須
  adSystem: { value: ADS.TIER_IV, refs: [] },             // ← ADS.* 必須（不明なら null）
  route: { value: "起点〜終点 約Xkm（道路種別）", refs: [1] },
  operationType: { value: "レベル2（乗務員乗車）", refs: [1, 2] },
  stakeholders: [
    { role: "自治体・事業主体", name: "○○市（△△県）", refs: [1] },
    { role: "自動運転システム開発", name: "株式会社ティアフォー", refs: [2] },
  ],
  references: [
    {
      id: 1,
      title: "記事・プレスリリースのタイトル",
      url: "https://example.com/article",
      date: "2024-04-01",
      source: "出典機関名",
    },
  ],
},
```

### 複数車両・複数ADシステムの場合

```js
vehicle: [
  { value: VEH.NAVYA_EVO, refs: [1] },
  { value: VEH.BYD_J6, refs: [2] },
],
adSystem: [
  { value: ADS.NAVYA, refs: [1] },
  { value: ADS.TIER_IV, refs: [2] },
],
```

---

## schema.js へのエントリ追加

### 新しい車両を追加する場合

```js
// schema.js の VEH に追加
NEW_VEHICLE: { id: "new-vehicle", label: "新車両名（正式名称）" },
```

### 新しいADシステムを追加する場合

```js
// schema.js の ADS に追加
NEW_SYSTEM: { id: "new-system", label: "システム名" },
```

### 新しい組織名を登録する場合

```js
// schema.js の KNOWN_ORGS 配列に追加（警告レベルの管理）
"新しい組織の正式名称",
```

---

## バリデーションコマンド

```bash
# データ構造・enum整合性チェック（エラーがあれば exit 1）
node apps/autonomous-driving-map/validate-data.mjs

# 詳細ログ付き
node apps/autonomous-driving-map/validate-data.mjs --verbose

# 参考文献URLの死活チェック（構造チェックのみ・高速）
node apps/autonomous-driving-map/check-sources.mjs --no-fetch

# URL確認あり
node apps/autonomous-driving-map/check-sources.mjs

# 12ヶ月以上前の参照を検出
node apps/autonomous-driving-map/check-sources.mjs --stale 12 --no-fetch

# 特定実験のみ確認
node apps/autonomous-driving-map/check-sources.mjs --exp exp-001
```

---

## よくある誤りと対処

| 誤り | 対処 |
|------|------|
| `status: { value: "実施中", ...}` | → `STATUS.ACTIVE` など schema.js の正確なキーを確認 |
| `prefecture: { value: "北海道", ...}` | → `PREF.HOKKAIDO` など |
| `vehicle: { value: "NAVYA ARMA", ...}` | → `VEH.NAVYA_ARMA` など |
| `adSystem: { value: "ティアフォー", ...}` | → `ADS.TIER_IV` など |
| 新車両をいきなり data.js に書く | → schema.js の VEH.* に先に追加する |
| stakeholder.name に未登録の組織名 | → schema.js の KNOWN_ORGS に追加（警告が消える） |
| refs に存在しない参考文献IDを指定 | → バリデーターでエラー検出。references に先に追加する |

---

## data.js 編集時の注意事項

- **コメントの維持**: 既存のコメントを消さない
- **エントリ順序**: 基本的に id 連番順を維持する
- **最小限の編集**: 必要なフィールドのみ変更し、無関係なフィールドを触らない
- **UTF-8 エンコーディング**: 日本語はそのまま記述する（エスケープ不要）
