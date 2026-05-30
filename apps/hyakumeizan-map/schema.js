// 日本百名山マップ スキーマ定義
// UMD形式: ブラウザ（グローバル変数）と Node.js（module.exports）の両方で動作する
//
// 設計方針:
//   - data.js は必ずこのファイルの定数を参照する（文字列リテラルで enum 値を書かない）
//   - タイポすると undefined になりバリデーションで即検出される
//   - 表示ラベルの変更はここ1箇所のみ

(function (exports) {

  // ─────────────────────────────────────────────
  // PREF: 都道府県（47都道府県）
  // ─────────────────────────────────────────────
  const PREF = {
    HOKKAIDO:  { id: "hokkaido",  label: "北海道" },
    AOMORI:    { id: "aomori",    label: "青森県" },
    IWATE:     { id: "iwate",     label: "岩手県" },
    MIYAGI:    { id: "miyagi",    label: "宮城県" },
    AKITA:     { id: "akita",     label: "秋田県" },
    YAMAGATA:  { id: "yamagata",  label: "山形県" },
    FUKUSHIMA: { id: "fukushima", label: "福島県" },
    IBARAKI:   { id: "ibaraki",   label: "茨城県" },
    TOCHIGI:   { id: "tochigi",   label: "栃木県" },
    GUNMA:     { id: "gunma",     label: "群馬県" },
    SAITAMA:   { id: "saitama",   label: "埼玉県" },
    CHIBA:     { id: "chiba",     label: "千葉県" },
    TOKYO:     { id: "tokyo",     label: "東京都" },
    KANAGAWA:  { id: "kanagawa",  label: "神奈川県" },
    NIIGATA:   { id: "niigata",   label: "新潟県" },
    TOYAMA:    { id: "toyama",    label: "富山県" },
    ISHIKAWA:  { id: "ishikawa",  label: "石川県" },
    FUKUI:     { id: "fukui",     label: "福井県" },
    YAMANASHI: { id: "yamanashi", label: "山梨県" },
    NAGANO:    { id: "nagano",    label: "長野県" },
    GIFU:      { id: "gifu",      label: "岐阜県" },
    SHIZUOKA:  { id: "shizuoka",  label: "静岡県" },
    AICHI:     { id: "aichi",     label: "愛知県" },
    MIE:       { id: "mie",       label: "三重県" },
    SHIGA:     { id: "shiga",     label: "滋賀県" },
    KYOTO:     { id: "kyoto",     label: "京都府" },
    OSAKA:     { id: "osaka",     label: "大阪府" },
    HYOGO:     { id: "hyogo",     label: "兵庫県" },
    NARA:      { id: "nara",      label: "奈良県" },
    WAKAYAMA:  { id: "wakayama",  label: "和歌山県" },
    TOTTORI:   { id: "tottori",   label: "鳥取県" },
    SHIMANE:   { id: "shimane",   label: "島根県" },
    OKAYAMA:   { id: "okayama",   label: "岡山県" },
    HIROSHIMA: { id: "hiroshima", label: "広島県" },
    YAMAGUCHI: { id: "yamaguchi", label: "山口県" },
    TOKUSHIMA: { id: "tokushima", label: "徳島県" },
    KAGAWA:    { id: "kagawa",    label: "香川県" },
    EHIME:     { id: "ehime",     label: "愛媛県" },
    KOCHI:     { id: "kochi",     label: "高知県" },
    FUKUOKA:   { id: "fukuoka",   label: "福岡県" },
    SAGA:      { id: "saga",      label: "佐賀県" },
    NAGASAKI:  { id: "nagasaki",  label: "長崎県" },
    KUMAMOTO:  { id: "kumamoto",  label: "熊本県" },
    OITA:      { id: "oita",      label: "大分県" },
    MIYAZAKI:  { id: "miyazaki",  label: "宮崎県" },
    KAGOSHIMA: { id: "kagoshima", label: "鹿児島県" },
    OKINAWA:   { id: "okinawa",   label: "沖縄県" },
  };

  // ─────────────────────────────────────────────
  // REGION: 山域・地方区分
  // 日本百名山を地方／山域でグルーピングするための区分
  // ─────────────────────────────────────────────
  const REGION = {
    HOKKAIDO:    { id: "hokkaido",    label: "北海道" },
    TOHOKU:      { id: "tohoku",      label: "東北" },
    JOSHINETSU:  { id: "joshinetsu",  label: "上信越・尾瀬" },
    KANTO:       { id: "kanto",       label: "関東" },
    KITA_ALPS:   { id: "kita-alps",   label: "北アルプス" },
    CHUO_ALPS:   { id: "chuo-alps",   label: "中央アルプス" },
    MINAMI_ALPS: { id: "minami-alps", label: "南アルプス" },
    CHUBU:       { id: "chubu",       label: "中部（その他）" },
    KINKI:       { id: "kinki",       label: "近畿" },
    CHUGOKU:     { id: "chugoku",     label: "中国・四国" },
    KYUSHU:      { id: "kyushu",      label: "九州" },
  };

  exports.PREF = PREF;
  exports.REGION = REGION;

})(typeof module !== "undefined" ? module.exports : window);
