// 「XX百名山」リスト定義
// 各リストは catalog.js の山ID（メンバーシップ）と、そのリスト内の通し番号 no を持つ。
//
// スキーマ:
//   {
//     id,            // ハッシュルーティング用スラッグ（^[a-z0-9-]+$）。例 "hyakumeizan"
//     label,         // 表示名。例 "日本百名山"
//     shortLabel?,   // 一覧見出し等で使う短縮名。省略時は label
//     source?,       // 出典
//     members: [ { id, no } ],  // id は catalog.js に存在する山ID。no は 1..N の連番
//   }
//
// 設計方針:
//   - 登頂記録は山ID単位で全リスト共通（store.js）。同じ富士山は複数リストに登場する。
//   - no はリストごとに独立（出典の番号体系に従う）。自動採番せず明示する。
//   - 二百名山・三百名山は「百名山を含む総称リスト」として全件（200/300座）を members に持つ。

const MOUNTAIN_LISTS = [
  {
    id: "hyakumeizan",
    label: "日本百名山",
    shortLabel: "百名山",
    source: "深田久弥『日本百名山』(1964)",
    members: [
      { id: "m001", no: 1 },
      { id: "m002", no: 2 },
      { id: "m003", no: 3 },
      { id: "m004", no: 4 },
      { id: "m005", no: 5 },
      { id: "m006", no: 6 },
      { id: "m007", no: 7 },
      { id: "m008", no: 8 },
      { id: "m009", no: 9 },
      { id: "m010", no: 10 },
      { id: "m011", no: 11 },
      { id: "m012", no: 12 },
      { id: "m013", no: 13 },
      { id: "m014", no: 14 },
      { id: "m015", no: 15 },
      { id: "m016", no: 16 },
      { id: "m017", no: 17 },
      { id: "m018", no: 18 },
      { id: "m019", no: 19 },
      { id: "m020", no: 20 },
      { id: "m021", no: 21 },
      { id: "m022", no: 22 },
      { id: "m023", no: 23 },
      { id: "m024", no: 24 },
      { id: "m025", no: 25 },
      { id: "m026", no: 26 },
      { id: "m027", no: 27 },
      { id: "m028", no: 28 },
      { id: "m029", no: 29 },
      { id: "m030", no: 30 },
      { id: "m031", no: 31 },
      { id: "m032", no: 32 },
      { id: "m033", no: 33 },
      { id: "m034", no: 34 },
      { id: "m035", no: 35 },
      { id: "m036", no: 36 },
      { id: "m037", no: 37 },
      { id: "m038", no: 38 },
      { id: "m039", no: 39 },
      { id: "m040", no: 40 },
      { id: "m041", no: 41 },
      { id: "m042", no: 42 },
      { id: "m043", no: 43 },
      { id: "m044", no: 44 },
      { id: "m045", no: 45 },
      { id: "m046", no: 46 },
      { id: "m047", no: 47 },
      { id: "m048", no: 48 },
      { id: "m049", no: 49 },
      { id: "m050", no: 50 },
      { id: "m051", no: 51 },
      { id: "m052", no: 52 },
      { id: "m053", no: 53 },
      { id: "m054", no: 54 },
      { id: "m055", no: 55 },
      { id: "m056", no: 56 },
      { id: "m057", no: 57 },
      { id: "m058", no: 58 },
      { id: "m059", no: 59 },
      { id: "m060", no: 60 },
      { id: "m061", no: 61 },
      { id: "m062", no: 62 },
      { id: "m063", no: 63 },
      { id: "m064", no: 64 },
      { id: "m065", no: 65 },
      { id: "m066", no: 66 },
      { id: "m067", no: 67 },
      { id: "m068", no: 68 },
      { id: "m069", no: 69 },
      { id: "m070", no: 70 },
      { id: "m071", no: 71 },
      { id: "m072", no: 72 },
      { id: "m073", no: 73 },
      { id: "m074", no: 74 },
      { id: "m075", no: 75 },
      { id: "m076", no: 76 },
      { id: "m077", no: 77 },
      { id: "m078", no: 78 },
      { id: "m079", no: 79 },
      { id: "m080", no: 80 },
      { id: "m081", no: 81 },
      { id: "m082", no: 82 },
      { id: "m083", no: 83 },
      { id: "m084", no: 84 },
      { id: "m085", no: 85 },
      { id: "m086", no: 86 },
      { id: "m087", no: 87 },
      { id: "m088", no: 88 },
      { id: "m089", no: 89 },
      { id: "m090", no: 90 },
      { id: "m091", no: 91 },
      { id: "m092", no: 92 },
      { id: "m093", no: 93 },
      { id: "m094", no: 94 },
      { id: "m095", no: 95 },
      { id: "m096", no: 96 },
      { id: "m097", no: 97 },
      { id: "m098", no: 98 },
      { id: "m099", no: 99 },
      { id: "m100", no: 100 },
    ],
  },

  // 段階的に追加予定:
  //   - nihyakumeizan（日本二百名山）: 百名山100座 + 追加100座 = 全200座
  //   - sanbyakumeizan（日本三百名山）: 全300座
  //   - hana-hyakumeizan（花の百名山）/ shin-hana-hyakumeizan（新・花の百名山）
];

// 既定で表示するリスト
const DEFAULT_LIST_ID = "hyakumeizan";

if (typeof module !== "undefined" && module.exports) {
  module.exports = { MOUNTAIN_LISTS, DEFAULT_LIST_ID };
}
