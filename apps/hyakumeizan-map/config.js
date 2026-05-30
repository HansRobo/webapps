// 日本百名山マップ 設定
//
// オーナー（アプリ管理者）の登頂記録は公開 Gist に置き、全訪問者のデフォルト表示として
// 認証不要で読み取る。オーナー自身は PAT 同期（store.js）で同じ Gist へ書き込む。
//
//   - OWNER_GIST_ID: オーナーの公開 Gist ID。空の間はデフォルト記録なし（全て未登頂表示）。
//                    PAT 同期で Gist を作成後、その ID をここに設定してコミットすると
//                    その記録が全訪問者の初期表示になる。
//   - GIST_FILENAME: Gist 内のファイル名（読み取り・書き込みで共通）。

const HYAKUMEIZAN_CONFIG = {
  OWNER_GIST_ID: "2c0ae2c7c4d165d1bbda06a090ce575b",
  GIST_FILENAME: "hyakumeizan-ascents.json",
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { HYAKUMEIZAN_CONFIG };
}
