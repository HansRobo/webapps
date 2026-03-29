# AGENTS.md

このファイルは `apps/autonomous-driving-map` を編集するエージェント向けの作業指針です。

## 目的
- 自動運転マップアプリの表示・データ整合性を保ちながら変更する。
- 既存の UI 挙動を壊さず、最小変更で目的を達成する。

## 対象ファイル
- `index.html`: 画面構造
- `style.css`: 見た目・レイアウト
- `app.js`: 画面ロジック
- `data.js`: データ本体
- `enums.js`: 定義値
- `check-references.js` / `check-urls.js`: データ検証スクリプト

## 編集ルール
- 既存の命名規則・コードスタイルに合わせる。
- 関連のないリファクタや大規模整形は行わない。
- `data.js` は差分が大きくなりやすいため、必要箇所のみを更新する。
- 文字コードは UTF-8 を維持する。
- コメントは必要最小限で、意図が読み取りにくい箇所にのみ追加する。

## 動作確認
- 変更後は最低限、以下を実行してエラー有無を確認する。
  - `node apps/autonomous-driving-map/check-references.js`
  - `node apps/autonomous-driving-map/check-urls.js`
- UI 変更時は `apps/autonomous-driving-map/index.html` をブラウザで開き、主要表示が崩れていないことを確認する。

## 禁止事項
- ユーザーが依頼していない破壊的変更（大規模削除、構造変更、データ全置換）をしない。
- 外部仕様が不明な値を推測で追加しない。必要なら TODO を残して明示する。
