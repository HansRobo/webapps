# LiDARカタログ — エージェント向けデータ編集ガイドライン

このファイルはコーディングエージェントがデータを追加・更新する際の必須ルールと手順を定めます。

---

## ⚠️ 最重要ルール: enum定数を直接参照する

`data.js` のエントリで enum 値を **文字列リテラルで書いてはならない**。

```js
// ❌ NG: 文字列リテラルで書く（タイポが気づかれない・表記ゆれの原因）
manufacturer: { name: "Hesai Technology", ... }
category: { id: "auto-long", ... }

// ✅ OK: schema.js の定数を直接参照（タイポすると即 undefined → バリデーターで検出）
manufacturer: M.HESAI
category: CAT.AUTO_LONG
scanningMethod: SCAN.MECHANICAL
wavelength: WAVE.NM905
```

`M.*`, `CAT.*`, `SCAN.*`, `WAVE.*`, `SRC_TYPE.*` はすべて `schema.js` で定義されている。
新しいメーカー・カテゴリ・方式が必要な場合は **schema.js を先に編集してから** data.js を更新する。

---

## データ追加・更新の手順

### 1. 既存エントリの更新

```
a. schema.js を確認（必要な定数が存在するか）
b. data.js の該当エントリを編集
   - specs.*.value を最新値に更新
   - 古い references エントリの date を更新
   - 新しい情報源があれば references に追加（既存エントリを削除しない）
c. node apps/lidar-catalog/validate-data.mjs でエラーなしを確認
```

### 2. 新製品追加

```
a. schema.js に未登録のメーカーがある場合は M.* に追加する
b. 新しい走査方式がある場合は SCAN.* に追加する
c. data.js に新エントリを追加
   - id は "メーカーid-製品名" 形式（例: hesai-at128）
   - すべての specs フィールドを記述（不明な場合は { value: null, refs: [] }）
   - references に最低1件の一次情報URLを追加する
d. node apps/lidar-catalog/validate-data.mjs で確認
```

---

## 一次情報の確認方法

エージェントが参考文献を確認・更新する際の優先順位:

1. **`manufacturer.url`** から公式サイトを辿る（各メーカーオブジェクトに記録済み）
2. **`type: "product-page"`** の参照が最も信頼性が高い（公式製品ページ）
3. `type: "datasheet"` または `type: "spec-sheet"` が次点
4. `type: "press-release"` は発表時点の情報（スペックが更新されている場合あり）
5. `type: "news"` は二次情報（公式確認が必要）

```js
// 参考文献の正しい形式
references: [
  {
    id: 1,
    url: "https://www.hesaitech.com/product/at128/",  // ← 検証可能なURL
    title: "Hesai AT128 Product Page",
    date: "2024-01",      // ← 最終確認日 (YYYY-MM または YYYY)
    source: "Hesai Technology",
    type: SRC_TYPE.PRODUCT_PAGE,  // ← 文字列リテラル禁止
  }
]
```

---

## specs フィールドの書き方

### 共通ルール
- 値がある → `{ value: 数値または文字列, unit: "単位", refs: [1] }` （refsに出典を必ず記録）
- 値が不明 → `{ value: null, refs: [] }` （フィールド自体を省略しない）
- 補足説明 → `note: "補足文字列"` を追加（例: `note: "@ 10% reflectivity"`）

### 共通スペックフィールド一覧

| フィールド   | 説明                | 単位例          |
|-------------|---------------------|----------------|
| `channels`  | チャンネル（ビーム）数 | `"ch"`         |
| `maxRange`  | 最大検知距離（10%反射率基準） | `"m"`  |
| `peakRange` | ピーク検知距離（80%等）| `"m"`          |
| `fovH`      | 水平FOV             | `"°"`          |
| `fovV`      | 垂直FOV             | `"°"`          |
| `resH`      | 水平角度分解能       | `null`（文字列）|
| `resV`      | 垂直角度分解能       | `null`（文字列）|
| `pointRate` | 点群レート           | `"pts/s"`      |
| `accuracy`  | 距離精度            | `null`（文字列）|
| `minRange`  | 最小検知距離（不感帯）| `"m"`          |
| `power`     | 消費電力            | `"W"`          |
| `size`      | 外形寸法            | `null`（文字列）|
| `weight`    | 重量                | `"g"` or `"kg"`|
| `protection`| 保護等級（IP等級）   | `null`（文字列）|
| `interface` | 通信インタフェース    | `null`（文字列）|

---

## ルーティング構造（リデザイン後）

アプリはハッシュベースルーターで複数ビューを切り替える構造になっています。

| ルート | 内容 |
|--------|------|
| `#/products` | 製品カタログ（フィルタ・グリッド） |
| `#/manufacturers` / `#/manufacturers/:id` | メーカー一覧 / 詳細 |
| `#/scan-methods` / `#/scan-methods/:id` | 走査方式一覧 / 詳細 |
| `#/wavelengths` / `#/wavelengths/:id` | 波長一覧 / 詳細 |
| `#/categories` / `#/categories/:id` | カテゴリ一覧 / 詳細 |
| `#/compare` | 2D比較ビュー（軸選択式散布図） |
| `#/graph` | 関係性グラフビュー（力学シミュレーション） |

### schema.js の新フィールドについて

**SCAN エントリ**には以下のオプショナルフィールドが追加されています:
- `icon`: Material Symbolsのアイコン名
- `descriptionJa`: 走査方式の説明文（日本語）
- `pros`: メリットの配列
- `cons`: デメリットの配列

**WAVE エントリ**:
- `colorHex`: 波長を表すカラーコード
- `eyeSafety`: アイセーフティ情報
- `detectorType`: 検出器タイプ
- `descriptionJa`: 説明文（日本語）

**CAT エントリ**:
- `icon`: Material Symbolsのアイコン名
- `typicalRange`: 典型的な検知距離範囲
- `descriptionJa`: カテゴリの説明文（日本語）

新しいSCAN/CAT/WAVEエントリを追加する際は、上記フィールドを一緒に記述することを推奨します。

---

## バリデーションコマンド

```bash
# データ構造・enum整合性チェック
node apps/lidar-catalog/validate-data.mjs

# 詳細ログ付き
node apps/lidar-catalog/validate-data.mjs --verbose

# 参考文献URLの死活チェック（全エントリ）
node apps/lidar-catalog/check-sources.mjs --no-fetch   # 構造チェックのみ（高速）
node apps/lidar-catalog/check-sources.mjs              # URL確認あり

# 特定製品のみ確認
node apps/lidar-catalog/check-sources.mjs --product hesai-at128

# 12ヶ月以上前の旧情報を検出
node apps/lidar-catalog/check-sources.mjs --stale 12 --no-fetch
```

---

## よくある誤りと対処

| 誤り | 対処 |
|------|------|
| `manufacturer: M.HESAI_TECH` | → `M.HESAI` など schema.js の正確なキーを確認 |
| `type: "product_page"` | → `type: SRC_TYPE.PRODUCT_PAGE`（文字列リテラル禁止） |
| specs フィールドを省略 | → `{ value: null, refs: [] }` を明示する |
| refs に存在しない参考文献IDを指定 | → バリデーターでエラー検出。references に先に追加する |
| 新メーカーをいきなり data.js に書く | → schema.js の M.* に先に追加する |
