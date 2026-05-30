// マスター山カタログ（リスト横断の山の実体）
// 「XX百名山」各リストはこのカタログの山を lists.js で参照する（メンバーシップ方式）。
// 配列の並びは日本百名山の掲載順（北→南）が基準。新規追加分は末尾に積む。
//
// 設計方針:
//   - prefectures / region は必ず schema.js の PREF / REGION を参照する（文字列リテラル禁止）
//   - lat / lng は山頂のおおよその座標（代表値）。厳密な測量値ではない
//   - elevation は標高(m)。出典は国土地理院・環境省等の一般的な山岳標高データに基づく代表値
//   - no（リスト内通し番号）はここには持たない。lists.js の members で持つ
//   - id はリスト横断で安定（登頂記録のキー）。一度割り当てたら変更しない
//   - 同名・別座の山（例: 鳥取の大山 と 丹沢の大山）は name を識別可能名にし alias で補う
//
// 各エントリのスキーマ:
//   {
//     id, name, alias?, reading, elevation,
//     prefectures: [PREF.*], region: REGION.*, lat, lng, source
//   }

const MOUNTAIN_CATALOG = [
  // ── 北海道 ──
  { id: "m001", name: "利尻岳", alias: "利尻山", reading: "りしりだけ", elevation: 1721, prefectures: [PREF.HOKKAIDO], region: REGION.HOKKAIDO, lat: 45.178, lng: 141.242, source: "国土地理院" },
  { id: "m002", name: "羅臼岳", reading: "らうすだけ", elevation: 1661, prefectures: [PREF.HOKKAIDO], region: REGION.HOKKAIDO, lat: 44.077, lng: 145.122, source: "国土地理院" },
  { id: "m003", name: "斜里岳", reading: "しゃりだけ", elevation: 1547, prefectures: [PREF.HOKKAIDO], region: REGION.HOKKAIDO, lat: 43.766, lng: 144.721, source: "国土地理院" },
  { id: "m004", name: "阿寒岳", alias: "雌阿寒岳", reading: "あかんだけ", elevation: 1499, prefectures: [PREF.HOKKAIDO], region: REGION.HOKKAIDO, lat: 43.386, lng: 144.009, source: "国土地理院" },
  { id: "m005", name: "大雪山", alias: "旭岳", reading: "だいせつざん", elevation: 2291, prefectures: [PREF.HOKKAIDO], region: REGION.HOKKAIDO, lat: 43.663, lng: 142.854, source: "国土地理院" },
  { id: "m006", name: "トムラウシ山", reading: "とむらうしやま", elevation: 2141, prefectures: [PREF.HOKKAIDO], region: REGION.HOKKAIDO, lat: 43.529, lng: 142.851, source: "国土地理院" },
  { id: "m007", name: "十勝岳", reading: "とかちだけ", elevation: 2077, prefectures: [PREF.HOKKAIDO], region: REGION.HOKKAIDO, lat: 43.418, lng: 142.686, source: "国土地理院" },
  { id: "m008", name: "幌尻岳", reading: "ぽろしりだけ", elevation: 2053, prefectures: [PREF.HOKKAIDO], region: REGION.HOKKAIDO, lat: 42.686, lng: 142.689, source: "国土地理院" },
  { id: "m009", name: "羊蹄山", alias: "後方羊蹄山", reading: "ようていざん", elevation: 1898, prefectures: [PREF.HOKKAIDO], region: REGION.HOKKAIDO, lat: 42.827, lng: 140.811, source: "国土地理院" },

  // ── 東北 ──
  { id: "m010", name: "岩木山", reading: "いわきさん", elevation: 1625, prefectures: [PREF.AOMORI], region: REGION.TOHOKU, lat: 40.656, lng: 140.303, source: "国土地理院" },
  { id: "m011", name: "八甲田山", reading: "はっこうださん", elevation: 1585, prefectures: [PREF.AOMORI], region: REGION.TOHOKU, lat: 40.659, lng: 140.877, source: "国土地理院" },
  { id: "m012", name: "八幡平", reading: "はちまんたい", elevation: 1613, prefectures: [PREF.IWATE, PREF.AKITA], region: REGION.TOHOKU, lat: 39.958, lng: 140.854, source: "国土地理院" },
  { id: "m013", name: "岩手山", reading: "いわてさん", elevation: 2038, prefectures: [PREF.IWATE], region: REGION.TOHOKU, lat: 39.853, lng: 141.001, source: "国土地理院" },
  { id: "m014", name: "早池峰山", alias: "早池峰", reading: "はやちねさん", elevation: 1917, prefectures: [PREF.IWATE], region: REGION.TOHOKU, lat: 39.557, lng: 141.489, source: "国土地理院" },
  { id: "m015", name: "鳥海山", reading: "ちょうかいさん", elevation: 2236, prefectures: [PREF.YAMAGATA, PREF.AKITA], region: REGION.TOHOKU, lat: 39.099, lng: 140.049, source: "国土地理院" },
  { id: "m016", name: "月山", reading: "がっさん", elevation: 1984, prefectures: [PREF.YAMAGATA], region: REGION.TOHOKU, lat: 38.549, lng: 140.027, source: "国土地理院" },
  { id: "m017", name: "朝日岳", alias: "大朝日岳", reading: "あさひだけ", elevation: 1871, prefectures: [PREF.YAMAGATA, PREF.NIIGATA], region: REGION.TOHOKU, lat: 38.261, lng: 139.917, source: "国土地理院" },
  { id: "m018", name: "蔵王山", alias: "熊野岳", reading: "ざおうさん", elevation: 1841, prefectures: [PREF.YAMAGATA, PREF.MIYAGI], region: REGION.TOHOKU, lat: 38.144, lng: 140.440, source: "国土地理院" },
  { id: "m019", name: "飯豊山", reading: "いいでさん", elevation: 2105, prefectures: [PREF.FUKUSHIMA, PREF.YAMAGATA, PREF.NIIGATA], region: REGION.TOHOKU, lat: 37.854, lng: 139.708, source: "国土地理院" },
  { id: "m020", name: "吾妻山", alias: "西吾妻山", reading: "あづまやま", elevation: 2035, prefectures: [PREF.FUKUSHIMA, PREF.YAMAGATA], region: REGION.TOHOKU, lat: 37.733, lng: 140.246, source: "国土地理院" },
  { id: "m021", name: "安達太良山", reading: "あだたらやま", elevation: 1700, prefectures: [PREF.FUKUSHIMA], region: REGION.TOHOKU, lat: 37.619, lng: 140.288, source: "国土地理院" },
  { id: "m022", name: "磐梯山", reading: "ばんだいさん", elevation: 1816, prefectures: [PREF.FUKUSHIMA], region: REGION.TOHOKU, lat: 37.601, lng: 140.072, source: "国土地理院" },
  { id: "m023", name: "会津駒ヶ岳", reading: "あいづこまがたけ", elevation: 2133, prefectures: [PREF.FUKUSHIMA], region: REGION.TOHOKU, lat: 37.046, lng: 139.345, source: "国土地理院" },

  // ── 上信越・尾瀬 / 関東 ──
  { id: "m024", name: "那須岳", alias: "茶臼岳", reading: "なすだけ", elevation: 1915, prefectures: [PREF.TOCHIGI], region: REGION.KANTO, lat: 37.122, lng: 139.963, source: "国土地理院" },
  { id: "m025", name: "魚沼駒ヶ岳", alias: "越後駒ヶ岳", reading: "うおぬまこまがたけ", elevation: 2003, prefectures: [PREF.NIIGATA], region: REGION.JOSHINETSU, lat: 37.140, lng: 139.156, source: "国土地理院" },
  { id: "m026", name: "平ヶ岳", reading: "ひらがたけ", elevation: 2141, prefectures: [PREF.NIIGATA, PREF.GUNMA], region: REGION.JOSHINETSU, lat: 36.943, lng: 139.180, source: "国土地理院" },
  { id: "m027", name: "巻機山", reading: "まきはたやま", elevation: 1967, prefectures: [PREF.NIIGATA, PREF.GUNMA], region: REGION.JOSHINETSU, lat: 36.916, lng: 138.953, source: "国土地理院" },
  { id: "m028", name: "燧ヶ岳", reading: "ひうちがたけ", elevation: 2356, prefectures: [PREF.FUKUSHIMA], region: REGION.JOSHINETSU, lat: 36.955, lng: 139.286, source: "国土地理院" },
  { id: "m029", name: "至仏山", reading: "しぶつさん", elevation: 2228, prefectures: [PREF.GUNMA], region: REGION.JOSHINETSU, lat: 36.903, lng: 139.173, source: "国土地理院" },
  { id: "m030", name: "谷川岳", reading: "たにがわだけ", elevation: 1977, prefectures: [PREF.GUNMA, PREF.NIIGATA], region: REGION.JOSHINETSU, lat: 36.834, lng: 138.929, source: "国土地理院" },
  { id: "m031", name: "雨飾山", reading: "あまかざりやま", elevation: 1963, prefectures: [PREF.NIIGATA, PREF.NAGANO], region: REGION.JOSHINETSU, lat: 36.906, lng: 137.946, source: "国土地理院" },
  { id: "m032", name: "苗場山", reading: "なえばさん", elevation: 2145, prefectures: [PREF.NIIGATA, PREF.NAGANO], region: REGION.JOSHINETSU, lat: 36.847, lng: 138.694, source: "国土地理院" },
  { id: "m033", name: "妙高山", reading: "みょうこうさん", elevation: 2454, prefectures: [PREF.NIIGATA], region: REGION.JOSHINETSU, lat: 36.892, lng: 138.113, source: "国土地理院" },
  { id: "m034", name: "火打山", reading: "ひうちやま", elevation: 2462, prefectures: [PREF.NIIGATA], region: REGION.JOSHINETSU, lat: 36.921, lng: 138.075, source: "国土地理院" },
  { id: "m035", name: "高妻山", reading: "たかつまやま", elevation: 2353, prefectures: [PREF.NIIGATA, PREF.NAGANO], region: REGION.JOSHINETSU, lat: 36.808, lng: 138.060, source: "国土地理院" },
  { id: "m036", name: "男体山", reading: "なんたいさん", elevation: 2486, prefectures: [PREF.TOCHIGI], region: REGION.KANTO, lat: 36.765, lng: 139.491, source: "国土地理院" },
  { id: "m037", name: "日光白根山", alias: "奥白根山", reading: "にっこうしらねさん", elevation: 2578, prefectures: [PREF.GUNMA, PREF.TOCHIGI], region: REGION.KANTO, lat: 36.798, lng: 139.377, source: "国土地理院" },
  { id: "m038", name: "皇海山", reading: "すかいさん", elevation: 2144, prefectures: [PREF.GUNMA, PREF.TOCHIGI], region: REGION.KANTO, lat: 36.701, lng: 139.337, source: "国土地理院" },
  { id: "m039", name: "武尊山", reading: "ほたかやま", elevation: 2158, prefectures: [PREF.GUNMA], region: REGION.KANTO, lat: 36.802, lng: 139.135, source: "国土地理院" },
  { id: "m040", name: "赤城山", alias: "黒檜山", reading: "あかぎやま", elevation: 1828, prefectures: [PREF.GUNMA], region: REGION.KANTO, lat: 36.560, lng: 139.193, source: "国土地理院" },
  { id: "m041", name: "草津白根山", reading: "くさつしらねさん", elevation: 2160, prefectures: [PREF.GUNMA], region: REGION.JOSHINETSU, lat: 36.643, lng: 138.528, source: "国土地理院" },
  { id: "m042", name: "四阿山", reading: "あずまやさん", elevation: 2354, prefectures: [PREF.GUNMA, PREF.NAGANO], region: REGION.JOSHINETSU, lat: 36.534, lng: 138.412, source: "国土地理院" },
  { id: "m043", name: "浅間山", reading: "あさまやま", elevation: 2568, prefectures: [PREF.NAGANO, PREF.GUNMA], region: REGION.JOSHINETSU, lat: 36.406, lng: 138.523, source: "国土地理院" },
  { id: "m044", name: "筑波山", reading: "つくばさん", elevation: 877, prefectures: [PREF.IBARAKI], region: REGION.KANTO, lat: 36.225, lng: 140.107, source: "国土地理院" },

  // ── 北アルプス ──
  { id: "m045", name: "白馬岳", reading: "しろうまだけ", elevation: 2932, prefectures: [PREF.NAGANO, PREF.TOYAMA], region: REGION.KITA_ALPS, lat: 36.758, lng: 137.759, source: "国土地理院" },
  { id: "m046", name: "五竜岳", reading: "ごりゅうだけ", elevation: 2814, prefectures: [PREF.TOYAMA, PREF.NAGANO], region: REGION.KITA_ALPS, lat: 36.658, lng: 137.752, source: "国土地理院" },
  { id: "m047", name: "鹿島槍ヶ岳", reading: "かしまやりがたけ", elevation: 2889, prefectures: [PREF.TOYAMA, PREF.NAGANO], region: REGION.KITA_ALPS, lat: 36.624, lng: 137.747, source: "国土地理院" },
  { id: "m048", name: "剱岳", reading: "つるぎだけ", elevation: 2999, prefectures: [PREF.TOYAMA], region: REGION.KITA_ALPS, lat: 36.623, lng: 137.617, source: "国土地理院" },
  { id: "m049", name: "立山", alias: "大汝山", reading: "たてやま", elevation: 3015, prefectures: [PREF.TOYAMA], region: REGION.KITA_ALPS, lat: 36.575, lng: 137.618, source: "国土地理院" },
  { id: "m050", name: "薬師岳", reading: "やくしだけ", elevation: 2926, prefectures: [PREF.TOYAMA], region: REGION.KITA_ALPS, lat: 36.466, lng: 137.547, source: "国土地理院" },
  { id: "m051", name: "黒部五郎岳", reading: "くろべごろうだけ", elevation: 2840, prefectures: [PREF.TOYAMA, PREF.GIFU], region: REGION.KITA_ALPS, lat: 36.398, lng: 137.539, source: "国土地理院" },
  { id: "m052", name: "黒岳", alias: "水晶岳", reading: "くろだけ", elevation: 2986, prefectures: [PREF.TOYAMA], region: REGION.KITA_ALPS, lat: 36.408, lng: 137.594, source: "国土地理院" },
  { id: "m053", name: "鷲羽岳", reading: "わしばだけ", elevation: 2924, prefectures: [PREF.TOYAMA, PREF.NAGANO], region: REGION.KITA_ALPS, lat: 36.391, lng: 137.594, source: "国土地理院" },
  { id: "m054", name: "槍ヶ岳", reading: "やりがたけ", elevation: 3180, prefectures: [PREF.NAGANO, PREF.GIFU], region: REGION.KITA_ALPS, lat: 36.342, lng: 137.648, source: "国土地理院" },
  { id: "m055", name: "穂高岳", alias: "奥穂高岳", reading: "ほたかだけ", elevation: 3190, prefectures: [PREF.NAGANO, PREF.GIFU], region: REGION.KITA_ALPS, lat: 36.289, lng: 137.648, source: "国土地理院" },
  { id: "m056", name: "常念岳", reading: "じょうねんだけ", elevation: 2857, prefectures: [PREF.NAGANO], region: REGION.KITA_ALPS, lat: 36.325, lng: 137.728, source: "国土地理院" },
  { id: "m057", name: "笠ヶ岳", reading: "かさがたけ", elevation: 2898, prefectures: [PREF.GIFU], region: REGION.KITA_ALPS, lat: 36.321, lng: 137.586, source: "国土地理院" },
  { id: "m058", name: "焼岳", reading: "やけだけ", elevation: 2455, prefectures: [PREF.NAGANO, PREF.GIFU], region: REGION.KITA_ALPS, lat: 36.227, lng: 137.587, source: "国土地理院" },
  { id: "m059", name: "乗鞍岳", alias: "剣ヶ峰", reading: "のりくらだけ", elevation: 3026, prefectures: [PREF.GIFU, PREF.NAGANO], region: REGION.KITA_ALPS, lat: 36.106, lng: 137.554, source: "国土地理院" },

  // ── 中部（御嶽・八ヶ岳・奥秩父 ほか） ──
  { id: "m060", name: "御嶽山", alias: "剣ヶ峰", reading: "おんたけさん", elevation: 3067, prefectures: [PREF.NAGANO, PREF.GIFU], region: REGION.CHUBU, lat: 35.893, lng: 137.480, source: "国土地理院" },
  { id: "m061", name: "美ヶ原", alias: "王ヶ頭", reading: "うつくしがはら", elevation: 2034, prefectures: [PREF.NAGANO], region: REGION.CHUBU, lat: 36.224, lng: 138.103, source: "国土地理院" },
  { id: "m062", name: "霧ヶ峰", alias: "車山", reading: "きりがみね", elevation: 1925, prefectures: [PREF.NAGANO], region: REGION.CHUBU, lat: 36.105, lng: 138.193, source: "国土地理院" },
  { id: "m063", name: "蓼科山", reading: "たてしなやま", elevation: 2531, prefectures: [PREF.NAGANO], region: REGION.CHUBU, lat: 36.103, lng: 138.295, source: "国土地理院" },
  { id: "m064", name: "八ヶ岳", alias: "赤岳", reading: "やつがたけ", elevation: 2899, prefectures: [PREF.NAGANO, PREF.YAMANASHI], region: REGION.CHUBU, lat: 35.971, lng: 138.370, source: "国土地理院" },
  { id: "m065", name: "両神山", reading: "りょうかみさん", elevation: 1723, prefectures: [PREF.SAITAMA], region: REGION.KANTO, lat: 35.999, lng: 138.838, source: "国土地理院" },
  { id: "m066", name: "雲取山", reading: "くもとりやま", elevation: 2017, prefectures: [PREF.TOKYO, PREF.SAITAMA, PREF.YAMANASHI], region: REGION.KANTO, lat: 35.857, lng: 138.943, source: "国土地理院" },
  { id: "m067", name: "甲武信ヶ岳", reading: "こぶしがたけ", elevation: 2475, prefectures: [PREF.SAITAMA, PREF.YAMANASHI, PREF.NAGANO], region: REGION.CHUBU, lat: 35.910, lng: 138.732, source: "国土地理院" },
  { id: "m068", name: "金峰山", reading: "きんぷさん", elevation: 2599, prefectures: [PREF.YAMANASHI, PREF.NAGANO], region: REGION.CHUBU, lat: 35.870, lng: 138.625, source: "国土地理院" },
  { id: "m069", name: "瑞牆山", reading: "みずがきやま", elevation: 2230, prefectures: [PREF.YAMANASHI], region: REGION.CHUBU, lat: 35.887, lng: 138.583, source: "国土地理院" },
  { id: "m070", name: "大菩薩岳", alias: "大菩薩嶺", reading: "だいぼさつだけ", elevation: 2057, prefectures: [PREF.YAMANASHI], region: REGION.CHUBU, lat: 35.748, lng: 138.847, source: "国土地理院" },
  { id: "m071", name: "丹沢山", reading: "たんざわさん", elevation: 1567, prefectures: [PREF.KANAGAWA], region: REGION.KANTO, lat: 35.487, lng: 139.163, source: "国土地理院" },
  { id: "m072", name: "富士山", reading: "ふじさん", elevation: 3776, prefectures: [PREF.SHIZUOKA, PREF.YAMANASHI], region: REGION.CHUBU, lat: 35.361, lng: 138.728, source: "国土地理院" },
  { id: "m073", name: "天城山", alias: "万三郎岳", reading: "あまぎさん", elevation: 1406, prefectures: [PREF.SHIZUOKA], region: REGION.CHUBU, lat: 34.860, lng: 139.005, source: "国土地理院" },

  // ── 中央アルプス ──
  { id: "m074", name: "木曽駒ヶ岳", reading: "きそこまがたけ", elevation: 2956, prefectures: [PREF.NAGANO], region: REGION.CHUO_ALPS, lat: 35.789, lng: 137.804, source: "国土地理院" },
  { id: "m075", name: "空木岳", reading: "うつぎだけ", elevation: 2864, prefectures: [PREF.NAGANO], region: REGION.CHUO_ALPS, lat: 35.726, lng: 137.818, source: "国土地理院" },
  { id: "m076", name: "恵那山", reading: "えなさん", elevation: 2191, prefectures: [PREF.NAGANO, PREF.GIFU], region: REGION.CHUO_ALPS, lat: 35.440, lng: 137.595, source: "国土地理院" },

  // ── 南アルプス ──
  { id: "m077", name: "甲斐駒ヶ岳", reading: "かいこまがたけ", elevation: 2967, prefectures: [PREF.YAMANASHI, PREF.NAGANO], region: REGION.MINAMI_ALPS, lat: 35.758, lng: 138.237, source: "国土地理院" },
  { id: "m078", name: "仙丈ヶ岳", reading: "せんじょうがたけ", elevation: 3033, prefectures: [PREF.YAMANASHI, PREF.NAGANO], region: REGION.MINAMI_ALPS, lat: 35.720, lng: 138.183, source: "国土地理院" },
  { id: "m079", name: "鳳凰山", alias: "観音岳", reading: "ほうおうざん", elevation: 2840, prefectures: [PREF.YAMANASHI], region: REGION.MINAMI_ALPS, lat: 35.696, lng: 138.297, source: "国土地理院" },
  { id: "m080", name: "北岳", reading: "きただけ", elevation: 3193, prefectures: [PREF.YAMANASHI], region: REGION.MINAMI_ALPS, lat: 35.674, lng: 138.239, source: "国土地理院" },
  { id: "m081", name: "間ノ岳", reading: "あいのだけ", elevation: 3190, prefectures: [PREF.YAMANASHI, PREF.SHIZUOKA], region: REGION.MINAMI_ALPS, lat: 35.646, lng: 138.228, source: "国土地理院" },
  { id: "m082", name: "塩見岳", reading: "しおみだけ", elevation: 3052, prefectures: [PREF.NAGANO, PREF.SHIZUOKA], region: REGION.MINAMI_ALPS, lat: 35.567, lng: 138.177, source: "国土地理院" },
  { id: "m083", name: "悪沢岳", alias: "荒川東岳", reading: "わるさわだけ", elevation: 3141, prefectures: [PREF.SHIZUOKA], region: REGION.MINAMI_ALPS, lat: 35.487, lng: 138.181, source: "国土地理院" },
  { id: "m084", name: "赤石岳", reading: "あかいしだけ", elevation: 3121, prefectures: [PREF.NAGANO, PREF.SHIZUOKA], region: REGION.MINAMI_ALPS, lat: 35.461, lng: 138.158, source: "国土地理院" },
  { id: "m085", name: "聖岳", reading: "ひじりだけ", elevation: 3013, prefectures: [PREF.NAGANO, PREF.SHIZUOKA], region: REGION.MINAMI_ALPS, lat: 35.424, lng: 138.143, source: "国土地理院" },
  { id: "m086", name: "光岳", reading: "てかりだけ", elevation: 2592, prefectures: [PREF.NAGANO, PREF.SHIZUOKA], region: REGION.MINAMI_ALPS, lat: 35.336, lng: 138.092, source: "国土地理院" },

  // ── 北陸・近畿 ──
  { id: "m087", name: "白山", alias: "御前峰", reading: "はくさん", elevation: 2702, prefectures: [PREF.ISHIKAWA, PREF.GIFU], region: REGION.CHUBU, lat: 36.155, lng: 136.771, source: "国土地理院" },
  { id: "m088", name: "荒島岳", reading: "あらしまだけ", elevation: 1523, prefectures: [PREF.FUKUI], region: REGION.CHUBU, lat: 35.928, lng: 136.598, source: "国土地理院" },
  { id: "m089", name: "伊吹山", reading: "いぶきやま", elevation: 1377, prefectures: [PREF.SHIGA, PREF.GIFU], region: REGION.KINKI, lat: 35.418, lng: 136.406, source: "国土地理院" },
  { id: "m090", name: "大台ヶ原山", alias: "日出ヶ岳", reading: "おおだいがはらやま", elevation: 1695, prefectures: [PREF.NARA, PREF.MIE], region: REGION.KINKI, lat: 34.182, lng: 136.105, source: "国土地理院" },
  { id: "m091", name: "大峰山", alias: "八経ヶ岳", reading: "おおみねさん", elevation: 1915, prefectures: [PREF.NARA], region: REGION.KINKI, lat: 34.173, lng: 135.910, source: "国土地理院" },

  // ── 中国・四国 ──
  { id: "m092", name: "大山", alias: "剣ヶ峰", reading: "だいせん", elevation: 1729, prefectures: [PREF.TOTTORI], region: REGION.CHUGOKU, lat: 35.371, lng: 133.546, source: "国土地理院" },
  { id: "m093", name: "剣山", reading: "つるぎさん", elevation: 1955, prefectures: [PREF.TOKUSHIMA], region: REGION.CHUGOKU, lat: 33.854, lng: 134.094, source: "国土地理院" },
  { id: "m094", name: "石鎚山", alias: "天狗岳", reading: "いしづちさん", elevation: 1982, prefectures: [PREF.EHIME], region: REGION.CHUGOKU, lat: 33.768, lng: 133.115, source: "国土地理院" },

  // ── 九州 ──
  { id: "m095", name: "九重山", alias: "中岳", reading: "くじゅうさん", elevation: 1791, prefectures: [PREF.OITA], region: REGION.KYUSHU, lat: 33.086, lng: 131.249, source: "国土地理院" },
  { id: "m096", name: "祖母山", reading: "そぼさん", elevation: 1756, prefectures: [PREF.OITA, PREF.MIYAZAKI], region: REGION.KYUSHU, lat: 32.825, lng: 131.347, source: "国土地理院" },
  { id: "m097", name: "阿蘇山", alias: "高岳", reading: "あそさん", elevation: 1592, prefectures: [PREF.KUMAMOTO], region: REGION.KYUSHU, lat: 32.884, lng: 131.104, source: "国土地理院" },
  { id: "m098", name: "霧島山", alias: "韓国岳", reading: "きりしまやま", elevation: 1700, prefectures: [PREF.KAGOSHIMA, PREF.MIYAZAKI], region: REGION.KYUSHU, lat: 31.934, lng: 130.862, source: "国土地理院" },
  { id: "m099", name: "開聞岳", reading: "かいもんだけ", elevation: 924, prefectures: [PREF.KAGOSHIMA], region: REGION.KYUSHU, lat: 31.180, lng: 130.528, source: "国土地理院" },
  { id: "m100", name: "宮之浦岳", reading: "みやのうらだけ", elevation: 1936, prefectures: [PREF.KAGOSHIMA], region: REGION.KYUSHU, lat: 30.337, lng: 130.508, source: "国土地理院" },
];

// Node.js（バリデータ）からも参照できるようにする
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MOUNTAIN_CATALOG };
}
