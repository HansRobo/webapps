// 日本の自動運転実証実験データベース
// 各フィールドの refs 配列は参考文献番号（references[].id に対応）
const EXPERIMENTS = [
  {
    id: "exp-001",
    name: { value: "境町自動運転バス（NAVYA ARMA）定常運行", refs: [1, 2] },
    location: { value: "茨城県境町（関東鉄道バス代替ルート）", lat: 36.153, lng: 139.775, refs: [1] },
    prefecture: { value: "茨城県", refs: [1] },
    period: { value: "2020年11月〜（継続中）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "国内初の公道における自動運転バスの定常運行。フランスNavya製の自動走行小型バス「NAVYA ARMA」を使用し、境町内の路線バス代替ルートを運行。レベル2相当（乗務員乗車）から開始し、段階的な自動化を目指す。",
      refs: [1, 2, 3]
    },
    vehicleType: { value: "NAVYA ARMA（電動自動走行小型バス、定員15名）", refs: [2, 3] },
    route: { value: "境町役場〜イオンタウン境間 約3km、最高速度19km/h", refs: [1, 3] },
    operationType: { value: "レベル2（乗務員乗車）、将来的なレベル4を目指す", refs: [2] },
    stakeholders: [
      { role: "運行管理・事業主体", name: "BOLDLY株式会社", refs: [1, 2] },
      { role: "車両提供", name: "ソフトバンク株式会社", refs: [2] },
      { role: "車両製造", name: "Navya（フランス）", refs: [2, 3] },
      { role: "自治体・運行依頼", name: "茨城県境町", refs: [1] },
      { role: "事業連携", name: "マクニカ株式会社", refs: [3] }
    ],
    references: [
      { id: 1, title: "境町、全国で初めて自動運転バスを路線バスとして運行開始", url: "https://www.softbank.jp/corp/news/press/sbkk/2020/20201025_01/", date: "2020-10-25", source: "ソフトバンク プレスリリース" },
      { id: 2, title: "Boldly、境町での自動運転バス運行1周年", url: "https://boldly.jp/news/2021/11/", date: "2021-11-25", source: "BOLDLY株式会社" },
      { id: 3, title: "国内初の路線バスとして自動運転バスを運行　茨城県境町", url: "https://www.mlit.go.jp/report/press/jidosha04_hh_000099.html", date: "2020-10-26", source: "国土交通省 プレスリリース" }
    ]
  },
  {
    id: "exp-002",
    name: { value: "永平寺町自動運転サービス（ゆっくり号）レベル4認可", refs: [1, 2] },
    location: { value: "福井県永平寺町（永平寺参ろーど）", lat: 36.091, lng: 136.469, refs: [1] },
    prefecture: { value: "福井県", refs: [1] },
    period: { value: "2018年〜（2023年4月にレベル4へ移行）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "廃線跡を活用した専用道路「永平寺参ろーど」で、ZMPの自動運転技術を搭載した電動カート「RoboCar MiniVan」を運行。2023年4月に道路交通法改正に基づく「特定自動運行」（レベル4）として世界初の認可を受け、運転者なしでの運行を実現。",
      refs: [1, 2, 3]
    },
    vehicleType: { value: "ZMP RoboCar MiniVan（改造電動ミニバン、定員5名）", refs: [2, 3] },
    route: { value: "永平寺参ろーど約2km（専用道）、最高速度12km/h", refs: [1, 3] },
    operationType: { value: "レベル4（特定自動運行、無人運転）※2023年4月〜", refs: [1, 2] },
    stakeholders: [
      { role: "自動運転システム開発・車両提供", name: "株式会社ZMP", refs: [2, 3] },
      { role: "自治体・事業主体", name: "福井県永平寺町", refs: [1] },
      { role: "運行管理", name: "えちぜん鉄道株式会社", refs: [1, 3] },
      { role: "実証実験支援", name: "国土交通省 北陸地方整備局", refs: [1] },
      { role: "協力自治体", name: "福井県", refs: [1] }
    ],
    references: [
      { id: 1, title: "永平寺町、自動運転「レベル4」解禁で全国初の公道サービス", url: "https://www.mlit.go.jp/road/road/traffic/autonomous/level4_eiheiji.html", date: "2023-04-01", source: "国土交通省" },
      { id: 2, title: "ZMP、永平寺町レベル4自動運転サービス開始のお知らせ", url: "https://www.zmp.co.jp/news/", date: "2023-04-01", source: "株式会社ZMP" },
      { id: 3, title: "改正道路交通法施行でレベル4自動運転の許可第一号", url: "https://www.npa.go.jp/bureau/traffic/autonomous/index.html", date: "2023-04-01", source: "警察庁" }
    ]
  },
  {
    id: "exp-003",
    name: { value: "西新宿自動運転バス実証実験（小田急・先進モビリティ）", refs: [1, 2] },
    location: { value: "東京都新宿区（西新宿周辺）", lat: 35.692, lng: 139.691, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2019年〜（複数回実施）", refs: [1, 2] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "小田急電鉄と先進モビリティが西新宿エリアで実施した自動運転バスの実証実験。一般乗客を乗せた状態で西新宿〜新宿駅周辺のルートを自動運転で走行。都市部における自動運転バスの実用化に向けたデータ収集と技術検証を行った。",
      refs: [1, 2, 3]
    },
    vehicleType: { value: "日野・レインボー（大型路線バス改造、先進モビリティ製自動運転システム搭載）", refs: [2, 3] },
    route: { value: "新宿駅西口〜西新宿周辺 約1.5km", refs: [1] },
    operationType: { value: "レベル2（乗務員乗車）", refs: [1, 2] },
    stakeholders: [
      { role: "事業主体・バス事業者", name: "小田急電鉄株式会社", refs: [1, 2] },
      { role: "自動運転システム開発", name: "先進モビリティ株式会社", refs: [2, 3] },
      { role: "協力機関", name: "東京都", refs: [1] },
      { role: "協力機関", name: "一般財団法人 日本自動車研究所（JARI）", refs: [3] }
    ],
    references: [
      { id: 1, title: "小田急電鉄、西新宿で自動運転バスの実証実験を開始", url: "https://www.odakyu.jp/news/detail/20190916.html", date: "2019-09-16", source: "小田急電鉄 ニュースリリース" },
      { id: 2, title: "先進モビリティ、小田急バスとの自動運転バス実証実験について", url: "https://www.advanced-mobility.jp/", date: "2019-09-16", source: "先進モビリティ株式会社" },
      { id: 3, title: "西新宿エリアにおける自動運転の実証実験", url: "https://www.metro.tokyo.lg.jp/tosei/hodohappyo/press/2019/09/16/03.html", date: "2019-09-16", source: "東京都 報道発表資料" }
    ]
  },
  {
    id: "exp-004",
    name: { value: "上士幌町 自動運転バス定期運行", refs: [1] },
    location: { value: "北海道上士幌町", lat: 43.213, lng: 143.387, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2022年〜（通年運行中）、2024年10月よりレベル4実証開始", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "上士幌町において、BOLDLY等と連携し自動運転バスの通年定期運行を実施。2024年10月28日からは、一般道でのレベル4（特定自動運行）に向けた実証走行も開始している。",
      refs: [1]
    },
    vehicleType: { value: "NAVYA ARMA（電動自動走行小型バス）", refs: [1] },
    route: { value: "上士幌町内 循環ルート", refs: [1] },
    operationType: { value: "レベル4（実証中）/ レベル2（定常運行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "上士幌町", refs: [1] },
      { role: "運行管理", name: "BOLDLY株式会社", refs: [1] },
      { role: "車両提供", name: "ソフトバンク株式会社", refs: [1] },
      { role: "技術協力", name: "株式会社ティアフォー", refs: [1] }
    ],
    references: [
      { id: 1, title: "上士幌町 自動運転バス運行", url: "https://www.kamishihoro.jp/sp/self_driving_bus", date: "2024-10-28", source: "上士幌町" }
    ]
  },
  {
    id: "exp-005",
    name: { value: "千葉市 幕張新都心モビリティプロジェクト", refs: [1] },
    location: { value: "千葉県千葉市（美浜区）", lat: 35.648, lng: 140.041, refs: [1] },
    prefecture: { value: "千葉県", refs: [1] },
    period: { value: "2016年〜（コンソーシアム活動継続中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "幕張新都心において、産官学連携の「幕張新都心モビリティコンソーシアム」を通じ、自動運転や電動シェアモビリティ等の実証実験・社会実装に向けた取り組みを推進。",
      refs: [1]
    },
    vehicleType: { value: "自動運転シャトル(EZ10等)・乗用車", refs: [1] },
    route: { value: "幕張新都心 豊砂地区ほか", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "千葉市", refs: [1] },
      { role: "推進団体", name: "幕張新都心モビリティコンソーシアム", refs: [1] },
      { role: "事業参画", name: "日産自動車株式会社", refs: [1] },
      { role: "事業参画", name: "株式会社DeNA", refs: [1] }
    ],
    references: [
      { id: 1, title: "千葉市：幕張新都心モビリティプロジェクト", url: "https://www.city.chiba.jp/sogoseisaku/miraitoshi/tokku/effort_mobility.html", date: "2024-01-01", source: "千葉市" }
    ]
  },
  {
    id: "exp-006",
    name: { value: "加賀市 次世代モビリティ実証実験", refs: [1] },
    location: { value: "石川県加賀市", lat: 36.3, lng: 136.312, refs: [1] },
    prefecture: { value: "石川県", refs: [1] },
    period: { value: "2024年4月〜（レベル4実証開始）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "加賀温泉駅周辺等において、マクニカ提供の自動運転EVバス(Navya EVO)を用いたレベル4実証実験を実施。将来の通年運行・多拠点接続を目指す。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス(Navya EVO)", refs: [1] },
    route: { value: "加賀温泉駅〜観光施設周辺", refs: [1] },
    operationType: { value: "レベル4（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "加賀市", refs: [1] },
      { role: "システム提供", name: "マクニカ株式会社", refs: [1] },
      { role: "連携協力", name: "ヤマハ発動機株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "加賀市における自動運転実証の歩み", url: "https://www.city.kaga.ishikawa.jp/material/files/group/126/autonomous.pdf", date: "2024-04-01", source: "加賀市" }
    ]
  },
  {
    id: "exp-007",
    name: { value: "南小国町 AIオンデマンドタクシー（阿蘇らくらくWebタクシー）", refs: [1] },
    location: { value: "熊本県南小国町", lat: 33.07, lng: 131.077, refs: [1] },
    prefecture: { value: "熊本県", refs: [1] },
    period: { value: "2021年〜（継続中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "AIによる最適ルート算定を用いたオンデマンド配車サービス。地域住民や観光客の移動手段として、GO株式会社のシステムを活用。※2024年に別途自動運転バス実証も実施中。",
      refs: [1]
    },
    vehicleType: { value: "一般タクシー車両(AI配車)", refs: [1] },
    route: { value: "南小国町全域", refs: [1] },
    operationType: { value: "レベル2（AIオンデマンド配車）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "南小国町", refs: [1] },
      { role: "システム提供", name: "GO株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "阿蘇らくらくWebタクシーの実証について", url: "https://www.town.minamioguni.kumamoto.jp/", date: "2024-10-01", source: "南小国町" }
    ]
  },
  {
    id: "exp-008",
    name: { value: "東近江市 奥永源寺地区「けい流カー」運行", refs: [1] },
    location: { value: "滋賀県東近江市（奥永源寺）", lat: 35.122, lng: 136.313, refs: [1] },
    prefecture: { value: "滋賀県", refs: [1] },
    period: { value: "2021年〜（市営通年運行中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "国土交通省の「道の駅」を拠点とした自動運転サービス実証を経て、全国初の本格導入として電磁誘導線を用いたヤマハ製ゴルフカートの通年運行を実施。",
      refs: [1]
    },
    vehicleType: { value: "ヤマハ製電動カート", refs: [1] },
    route: { value: "奥永源寺地区 周遊ルート", refs: [1] },
    operationType: { value: "レベル2（定常運行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "東近江市", refs: [1] },
      { role: "車両提供", name: "ヤマハ発動機株式会社", refs: [1] },
      { role: "協力企業", name: "アイサンテクノロジー株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "奥永源寺地区自動運転サービス「けい流カー」", url: "https://www.city.higashiomi.shiga.jp/kurashi_tetsuzuki/koutsuu/1002061/index.html", date: "2024-04-01", source: "東近江市" }
    ]
  },
  {
    id: "exp-009",
    name: { value: "ひたちBRT・レベル4自動運転営業運行", refs: [1] },
    location: { value: "茨城県日立市", lat: 36.52, lng: 140.613, refs: [1] },
    prefecture: { value: "茨城県", refs: [1] },
    period: { value: "2025年2月3日〜（レベル4営業運行中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "バス専用道を走行する「ひたちBRT」において、国内初となる中型自動運転バス(レベル4認可車両)による営業運行を開始. 地域公共交通の維持と高度化を実演。",
      refs: [1]
    },
    vehicleType: { value: "中型自動運転バス（いすゞエルガミオ・ベース）", refs: [1] },
    route: { value: "ひたちBRT専用道（大甕駅周辺など）", refs: [1] },
    operationType: { value: "レベル4（定常営業運行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "日立市", refs: [1] },
      { role: "運行主体", name: "茨城交通株式会社", refs: [1] },
      { role: "システム開発", name: "先進モビリティ株式会社", refs: [1] },
      { role: "システム開発", name: "株式会社ティアフォー", refs: [1] },
      { role: "統括管理", name: "みちのりホールディングス", refs: [1] }
    ],
    references: [
      { id: 1, title: "国内初！中型バス車両の自動運転レベル4認可を取得！", url: "https://www.city.hitachi.lg.jp/machizukuri_kankyo/kotsu_doro/1015015.html", date: "2025-02-03", source: "日立市" }
    ]
  },
  {
    id: "exp-010",
    name: { value: "柏の葉キャンパス・レベル4自動運転バス運行", refs: [1] },
    location: { value: "千葉県柏市（柏の葉キャンパス周辺）", lat: 35.9, lng: 139.95, refs: [1] },
    prefecture: { value: "千葉県", refs: [1] },
    period: { value: "2026年1月13日〜（レベル4営業運行中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "スマートシティ「柏の葉」において、東京大学や東武バスと連携し、一般公道（走行環境準備済）でのレベル4自動運転バス運行を、国内第2例目の認可案件として開始。",
      refs: [1]
    },
    vehicleType: { value: "中型自動運転バス(先進モビリティ/TIER IV製)", refs: [1] },
    route: { value: "柏の葉キャンパス駅〜東京大学柏キャンパス", refs: [1] },
    operationType: { value: "レベル4（定常営業運行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "柏市", refs: [1] },
      { role: "研究教育", name: "東京大学", refs: [1] },
      { role: "運行主体", name: "東武バスセントラル株式会社", refs: [1] },
      { role: "システム協力", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "柏の葉キャンパス地区での自動運転バス運行について", url: "https://www.city.kashiwa.lg.jp/kotsuseisaku/living_environment/bus_taxi/jidouunkobus.html", date: "2024-12-01", source: "柏市" }
    ]
  },
  {
    id: "exp-011",
    name: { value: "新東名高速道路・後続車無人隊列走行およびレベル4トラック実証", refs: [1] },
    location: { value: "新東名高速道路（駿河湾沼津SA〜浜松SA間）", lat: 35.1, lng: 138.8, refs: [1] },
    prefecture: { value: "静岡県", refs: [1] },
    period: { value: "2025年3月3日〜（実証開始）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "物流の2024年問題への対応として、新東名高速道路の深夜時間帯に「自動運転車優先レーン」を設定。インフラ支援を受けつつ自動運転トラックが走行する大規模実証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転大型トラック", refs: [1] },
    route: { value: "新東名高速道路 優先レーン区間", refs: [1] },
    operationType: { value: "レベル4（技術・インフラ検証実証）", refs: [1] },
    stakeholders: [
      { role: "省庁", name: "国土交通省", refs: [1] },
      { role: "省庁", name: "経済産業省", refs: [1] },
      { role: "インフラ提供", name: "中日本高速道路株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "新東名高速道路における自動運転トラックの実証実験を開始", url: "https://www.mlit.go.jp/report/press/road01_hh_001884.html", date: "2025-03-03", source: "国土交通省" }
    ]
  },
  {
    id: "exp-012",
    name: { value: "東京都心・ロボタクシー自動運転サービス（ホンダ・GM・Cruise）", refs: [1] },
    location: { value: "東京都港区・中央区周辺", lat: 35.666, lng: 139.758, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2026年初頭（サービス開始予定）", refs: [1] },
    status: { value: "計画中", refs: [1] },
    description: {
      value: "ホンダ、GM、Cruiseの3社が共同で、東京都心部にて指定された出発地・目的地を全自動で走行するロボタクシーサービスを開始予定。車両「Cruise Origin」を使用。",
      refs: [1]
    },
    vehicleType: { value: "Cruise Origin（ロボタクシー専用車両）", refs: [1] },
    route: { value: "東京都心（港区・中央区・千代田区エリア等）", refs: [1] },
    operationType: { value: "レベル4（有償タクシーサービス）", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "本田技研工業株式会社", refs: [1] },
      { role: "車両・システム協力", name: "General Motors (GM)", refs: [1] },
      { role: "車両・システム協力", name: "Cruise", refs: [1] }
    ],
    references: [
      { id: 1, title: "ホンダ、GM、クルーズが、2026年初頭に日本でのサービス開始を目指す", url: "https://global.honda/jp/news/2023/c231019a.html", date: "2023-10-19", source: "本田技研工業" }
    ]
  },
  {
    id: "exp-013",
    name: { value: "日産・次世代ロボタクシー実証、Uber/Wayve提携", refs: [1] },
    location: { value: "神奈川県横浜市・東京都内", lat: 35.461, lng: 139.622, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2026年後半（実証運行開始予定）", refs: [1] },
    status: { value: "計画中", refs: [1] },
    description: {
      value: "日産自動車が、AI開発のWayveおよび配車プラットフォームのUberと戦略的提携。日産製EVをベースとした「デジタル運転手」によるロボタクシー実用化を目指す。",
      refs: [1]
    },
    vehicleType: { value: "日産製EVベース自動運転車両", refs: [1] },
    route: { value: "横浜臨海部・その他都心エリア", refs: [1] },
    operationType: { value: "レベル4（タクシーサービス）", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "日産自動車株式会社", refs: [1] },
      { role: "AIシステム", name: "Wayve", refs: [1] },
      { role: "プラットフォーム", name: "Uber Japan株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "日産、Wayve、Uberによる自動運転サービスに向けた協業", url: "https://global.nissannews.com/ja-JP/releases/260312-01-j", date: "2026-03-12", source: "日産自動車" }
    ]
  },
  {
    id: "exp-014",
    name: { value: "お台場・次世代移動サービス「PALETTE RIDE」 (e-Palette)", refs: [1] },
    location: { value: "東京都江東区（お台場地区）", lat: 35.626, lng: 139.78, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2025年10月10日〜（有償実証運行中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "お台場エリアにおいて、トヨタ製e-Paletteを用いた有償移動サービス「PALETTE RIDE」を運行。東京都の「自動運転移動サービス実現に向けたモデルプロジェクト」に採択。",
      refs: [1]
    },
    vehicleType: { value: "トヨタ e-Palette", refs: [1] },
    route: { value: "シンボルプロムナード公園周辺循環", refs: [1] },
    operationType: { value: "レベル4（2027年度実現に向けた段階的実証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "東京都", refs: [1] },
      { role: "事業参画", name: "トヨタ自動車株式会社", refs: [1] },
      { role: "事業参画", name: "株式会社ティアフォー", refs: [1] },
      { role: "運行主体", name: "MONET Technologies", refs: [1] }
    ],
    references: [
      { id: 1, title: "お台場における自動運転移動サービス「PALETTE RIDE」開始", url: "https://www.metro.tokyo.lg.jp/information/press/2025/09/2025093008.html", date: "2025-09-30", source: "東京都" }
    ]
  },
  {
    id: "exp-015",
    name: { value: "羽田イノベーションシティ 自動運転バス運行", refs: [1] },
    location: { value: "東京都大田区", lat: 35.548, lng: 139.754, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2020年9月〜（レベル4運行中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "羽田イノベーションシティ内において、国内初となる民間施設内でのレベル4自動運転バス運行を実施。BOLDLYやマクニカと連携し、定常的な移動手段として活用されている。",
      refs: [1]
    },
    vehicleType: { value: "NAVYA ARMA / AuveTech MiCa", refs: [1] },
    route: { value: "施設内・周辺連絡路", refs: [1] },
    operationType: { value: "レベル4（定常運行）", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "羽田みらい開発株式会社", refs: [1] },
      { role: "システム・運行", name: "BOLDLY株式会社", refs: [1] },
      { role: "車両・システム", name: "マクニカ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "羽田イノベーションシティにおける自動運転バス", url: "https://haneda-innovation-city.com/", date: "2024-10-01", source: "羽田イノベーションシティ" }
    ]
  },
  {
    id: "exp-016",
    name: { value: "塩尻市・レベル4自動運転バス社会実装実証", refs: [1] },
    location: { value: "長野県塩尻市", lat: 36.11, lng: 137.95, refs: [1] },
    prefecture: { value: "長野県", refs: [1] },
    period: { value: "2025年5月12日〜（定常運行中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "塩尻駅〜市役所等の市街地において、自動運転バス「Minibus」を用いた定常運行を開始. 将来のレベル4特定自動運行に向けた段階的実証として実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス(ティアフォー製)", refs: [1] },
    route: { value: "塩尻中心市街地循環（東回り・西回りルート）", refs: [1] },
    operationType: { value: "レベル2（2026年3月にレベル4認可・実証予定）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "塩尻市", refs: [1] },
      { role: "運行主体", name: "アルピコ交通株式会社", refs: [1] },
      { role: "システム開発", name: "株式会社ティアフォー", refs: [1] }
    ],
    references: [
      { id: 1, title: "塩尻市における自動運転バスの社会実装について", url: "https://www.city.shiojiri.lg.jp/soshiki/3/34567.html", date: "2025-05-12", source: "塩尻市" }
    ]
  },
  {
    id: "exp-017",
    name: { value: "和光市・自動運転バス社会実装実証", refs: [1] },
    location: { value: "埼玉県和光市", lat: 35.79, lng: 139.61, refs: [1] },
    prefecture: { value: "埼玉県", refs: [1] },
    period: { value: "2024年1月〜（定常運行中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "和光市駅北口と工業団地を結ぶルートにおいて、自動運転バス「Minibus/ポンチョ」を用いた定常運行を実施。地域住民や通勤客の移動を支えるレベル4社会実装を目指す。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス(日野ポンチョ/マクニカ提供等)", refs: [1] },
    route: { value: "和光市駅北口〜和光北インター周辺（約4.7km）", refs: [1] },
    operationType: { value: "レベル2（将来のレベル4認可取得を目指す）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "和光市", refs: [1] },
      { role: "運行主体", name: "東武バスウエスト株式会社", refs: [1] },
      { role: "システム協力", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "和光市における自動運転の取り組みについて", url: "https://www.city.wako.lg.jp/kurashi/kotsu/1005678.html", date: "2024-01-10", source: "和光市" }
    ]
  },
  {
    id: "exp-018",
    name: { value: "知多半島・中部国際空港アクセス 自動運転高速バス実証", refs: [1] },
    location: { value: "愛知県常滑市（中部国際空港周辺）", lat: 34.86, lng: 136.81, refs: [1] },
    prefecture: { value: "愛知県", refs: [1] },
    period: { value: "2025年1月〜（高速道路実証開始）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "中部国際空港周辺の高速道路において、大型自動運転バスを用いた実証実験を実施。高速道路における隊列走行や自動線形制御等の技術検証を行う。",
      refs: [1]
    },
    vehicleType: { value: "大型自動運転バス（先進モビリティ製）", refs: [1] },
    route: { value: "常滑IC〜中部国際空港連絡橋周辺", refs: [1] },
    operationType: { value: "レベル2（高速道路実証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "愛知県", refs: [1] },
      { role: "システム協力", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "愛知県における自動運転の取り組み：知多半島エリア", url: "https://www.pref.aichi.jp/press-release/jidounten/express-bus-2025.html", date: "2025-01-20", source: "愛知県" }
    ]
  },
  {
    id: "exp-019",
    name: { value: "洲本市・自動運転バス実証運行", refs: [1] },
    location: { value: "兵庫県洲本市", lat: 34.34, lng: 134.9, refs: [1] },
    prefecture: { value: "兵庫県", refs: [1] },
    period: { value: "2025年11月〜12月（実証実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "淡路島・洲本市において、日中は由良地区、夜間は温泉街を結ぶルートで自動運転バスを運行。観光と生活交通の両面で検証を行う。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス（先進モビリティ製）", refs: [1] },
    route: { value: "由良ルート・温泉街ルート", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "洲本市", refs: [1] },
      { role: "システム協力", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "洲本市における自動運転実証実験の実施について", url: "https://www.city.sumoto.lg.jp/soshiki/19/33657.html", date: "2025-11-01", source: "洲本市" }
    ]
  },
  {
    id: "exp-020",
    name: { value: "八丈島・スマートモビリティ自動運転バス実証", refs: [1] },
    location: { value: "東京都八丈町", lat: 33.11, lng: 139.78, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2025年7月〜8月（実証実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "離島における移動課題解決のため、東京都と八丈町が連携し、自動運転バスとAIオンデマンド交通を組み合わせた実証実験を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "八丈島 樫立〜末吉地区", refs: [1] },
    operationType: { value: "レベル2（期間限定実証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "東京都", refs: [1] },
      { role: "自治体", name: "八丈町", refs: [1] }
    ],
    references: [
      { id: 1, title: "八丈島における自動運転バス等の実証事業について", url: "https://www.metro.tokyo.lg.jp/information/press/2024/06/2024062008.html", date: "2024-06-20", source: "東京都" }
    ]
  },
  {
    id: "exp-021",
    name: { value: "桑名市・自動運転バス定常運行（Minibus）", refs: [1] },
    location: { value: "三重県桑名市", lat: 35.07, lng: 136.68, refs: [1] },
    prefecture: { value: "三重県", refs: [1] },
    period: { value: "2024年10月〜（社会実装・定常運行中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "将来のレベル4認可・完全無人化を見据え、自動運転バス「Minibus」を用いた定常営業運行を桑名市街地で実施中。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス「Minibus」 (ティアフォー製)", refs: [1] },
    route: { value: "桑名駅〜周辺施設循環", refs: [1] },
    operationType: { value: "レベル2（将来のレベル4化を目指す）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "桑名市", refs: [1] },
      { role: "システム協力", name: "アイサンテクノロジー株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "桑名市における自動運転バスの社会実装について", url: "https://www.city.kuwana.lg.jp/soshiki/seisakukikaku/jidounten2024.html", date: "2024-10-01", source: "桑名市" }
    ]
  },
  {
    id: "exp-022",
    name: { value: "伊勢市・伊勢神宮周辺 自動運転バス実証", refs: [1] },
    location: { value: "三重県伊勢市", lat: 34.46, lng: 136.72, refs: [1] },
    prefecture: { value: "三重県", refs: [1] },
    period: { value: "2025年12月（実証実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "次回の式年遷宮を見据え、観光地における持続可能な交通手段として、伊勢神宮内宮周辺で自動運転バスの運行実証を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "伊勢神宮内宮 周辺エリア", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "伊勢市", refs: [1] },
      { role: "協力企業", name: "アイサンテクノロジー株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "伊勢神宮内宮エリアにおける自動運転バスの実証運行について", url: "https://www.city.ise.mie.jp/kurashi/koutsu/okage_bus/1019584.html", date: "2025-12-01", source: "伊勢市" }
    ]
  },
  {
    id: "exp-023",
    name: { value: "つくば市・筑波大学キャンパス循環 自動運転バス実証", refs: [1] },
    location: { value: "茨城県つくば市", lat: 36.11, lng: 140.1, refs: [1] },
    prefecture: { value: "茨城県", refs: [1] },
    period: { value: "2025年1月〜（実証実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "スーパーシティ構想の一環として、筑波大学キャンパス内の循環ルートにおいて自動運転バスの運行実証を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "筑波大学キャンパス 循環路", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "つくば市", refs: [1] },
      { role: "研究教育", name: "筑波大学", refs: [1] }
    ],
    references: [
      { id: 1, title: "つくば市における自動運転バス実証実験の概要", url: "https://www.city.tsukuba.lg.jp/soshikikarasagasu/seisakuinnovationbusmartcitysenryakuka/gyomuannai/1/18462.html", date: "2025-01-15", source: "つくば市" }
    ]
  },
  {
    id: "exp-024",
    name: { value: "十和田市・奥入瀬渓流冬季自動運転実証", refs: [1] },
    location: { value: "青森県十和田市", lat: 40.53, lng: 140.96, refs: [1] },
    prefecture: { value: "青森県", refs: [1] },
    period: { value: "2026年2月（冬季走行実証予定）", refs: [1] },
    status: { value: "計画中", refs: [1] },
    description: {
      value: "冬季の観光振興と安全な移動手段確保のため、奥入瀬渓流沿いの雪道における自動運転バスの走行性能・安全性検証を実施予定。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス (寒冷地仕様)", refs: [1] },
    route: { value: "奥入瀬渓流区間 (焼山〜子ノ口間の一部)", refs: [1] },
    operationType: { value: "レベル2（冬季実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "青森県", refs: [1] },
      { role: "自治体", name: "十和田市", refs: [1] }
    ],
    references: [
      { id: 1, title: "奥入瀬渓流における冬季自動運転実証実験（令和8年2月）", url: "https://www.pref.aomori.lg.jp/soshiki/kendo/doro/oirase_winter_AD_R8.html", date: "2025-10-30", source: "青森県" }
    ]
  },
  {
    id: "exp-025",
    name: { value: "高田松原津波復興祈念公園 自動運転移動サービス（岩手県）", refs: [1] },
    location: { value: "岩手県陸前高田市", lat: 39.011, lng: 141.625, refs: [1] },
    prefecture: { value: "岩手県", refs: [1] },
    period: { value: "2023年2月〜3月、2023年9月（市街地拡張実証）", refs: [1, 2] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "高田松原津波復興祈念公園を中心に、自動運転グリーンスローモビリティの実証を実施。運行終了後、周辺市街地にルートを拡張した実証も行い、観光回遊と地域移動の両面で効果を検証した。",
      refs: [1, 2]
    },
    vehicleType: { value: "小型EV車両（GSM8）", refs: [1] },
    route: { value: "高田松原津波復興祈念公園内および周辺市街地", refs: [1, 2] },
    operationType: { value: "レベル2（実証実験）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "陸前高田市", refs: [1, 2] },
      { role: "協力企業", name: "KDDI", refs: [2] }
    ],
    references: [
      { id: 1, title: "【終了】令和5年2月1日～3月5日実施（高田松原復興祈念公園における自動運転走行実証実験）", url: "https://www.city.rikuzentakata.iwate.jp/soshiki/kikakuseisakuka/seisakukohogakari/1/1/6566.html", date: "2023-11-28", source: "陸前高田市" },
      { id: 2, title: "高田松原津波復興祈念公園内およびその周辺市街地における自動運転サービスの運行開始", url: "https://www.kddi.com/corporate/sustainability/regional-initiative/pressrelease/20230817/", date: "2023-08-17", source: "KDDI" }
    ]
  },
  {
    id: "exp-026",
    name: { value: "気仙沼線BRT 自動運転バス実用化（宮城県）", refs: [1] },
    location: { value: "宮城県本吉郡南三陸町・登米市", lat: 38.650, lng: 141.450, refs: [1] },
    prefecture: { value: "宮城県", refs: [1] },
    period: { value: "2022年12月〜運行中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "気仙沼線BRTの専用道において、磁気マーカーなどを活用し、ドライバーが乗務する形での自動運転を実用化。将来のレベル4（最高時速60km）認可も取得済み。",
      refs: [1]
    },
    vehicleType: { value: "大型自動運転ハイブリッドバス", refs: [1] },
    route: { value: "気仙沼線BRT 柳津駅～陸前横山駅間（片道約4.8kmの専用道）", refs: [1] },
    operationType: { value: "レベル2（実用化済み）、将来レベル4予定", refs: [1] },
    stakeholders: [
      { role: "運行主体", name: "JR東日本", refs: [1] },
      { role: "システム", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "気仙沼線BRTにおける自動運転について", url: "https://www.jreast.co.jp/", date: "2024-01-01", source: "JR東日本" }
    ]
  },
  {
    id: "exp-027",
    name: { value: "上小阿仁村 自動運転サービス（秋田県）", refs: [1] },
    location: { value: "秋田県上小阿仁村", lat: 40.016, lng: 140.312, refs: [1] },
    prefecture: { value: "秋田県", refs: [1] },
    period: { value: "2019年11月〜本格運行中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "道の駅「かみこあに」を拠点に、診療所や役場を結ぶルートで自動運転サービスを全国初本格運行。電磁誘導線を利用した雪国対応型で、レベル4移行に向けた実証も継続。",
      refs: [1]
    },
    vehicleType: { value: "ゴルフカート型車両（電磁誘導線方式）", refs: [1] },
    route: { value: "道の駅かみこあに〜周辺集落", refs: [1] },
    operationType: { value: "レベル2運行（レベル4検証中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "上小阿仁村", refs: [1] },
      { role: "支援", name: "国土交通省、総務省", refs: [1] }
    ],
    references: [
      { id: 1, title: "上小阿仁村における自動運転サービスの実証", url: "https://www.mlit.go.jp/", date: "2024-01-01", source: "国土交通省" }
    ]
  },
  {
    id: "exp-028",
    name: { value: "高畠町 道の駅拠点 自動運転実証（山形県）", refs: [1] },
    location: { value: "山形県高畠町", lat: 38.001, lng: 140.188, refs: [1] },
    prefecture: { value: "山形県", refs: [1] },
    period: { value: "過去実施", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "「道の駅 たかはた」を拠点とし、病院やスーパーなどの生活拠点と居住地域を結ぶルートにおいて、高齢者の移動支援や地域内の回遊性を高める実証を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転車両", refs: [1] },
    route: { value: "高畠町内（道の駅〜生活拠点）", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "高畠町", refs: [1] }
    ],
    references: [
      { id: 1, title: "道の駅等を拠点とした自動運転サービスの実証実験", url: "https://www.mlit.go.jp/", date: "2020-01-01", source: "国土交通省" }
    ]
  },
  {
    id: "exp-029",
    name: { value: "浪江町 スマートモビリティと自動運転実証（福島県）", refs: [1] },
    location: { value: "福島県浪江町", lat: 37.495, lng: 140.993, refs: [1] },
    prefecture: { value: "福島県", refs: [1] },
    period: { value: "2021年〜継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "復興の一環としてEVを活用した自動運転技術やMaaSの社会実装に向けた実験を実施。貨客混載モデルやデマンド交通とも連携し、将来の無人運行を目指す。",
      refs: [1]
    },
    vehicleType: { value: "日産EV車両（自動運転システム搭載）等", refs: [1] },
    route: { value: "浪江町内", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "浪江町", refs: [1] },
      { role: "企業", name: "日産自動車株式会社、日本郵便", refs: [1] }
    ],
    references: [
      { id: 1, title: "浪江町における自動運転実証実験", url: "https://www.nissan-global.com/", date: "2023-01-01", source: "日産自動車" }
    ]
  },
  {
    id: "exp-030",
    name: { value: "前橋市 自動運転バス公道実証（群馬県）", refs: [1] },
    location: { value: "群馬県前橋市（JR前橋駅周辺など）", lat: 36.388, lng: 139.073, refs: [1] },
    prefecture: { value: "群馬県", refs: [1] },
    period: { value: "2018年度〜継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "JR前橋駅と中央前橋駅を結ぶルートなどで、群馬大学や地元交通事業者と連携して自動運転バスの実証を継続実施。5Gを活用した遠隔監視や障害物回避機能の検証を行っている。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "JR前橋駅〜中央前橋駅間など", refs: [1] },
    operationType: { value: "レベル2（実証中・将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "産学官連携", name: "前橋市、群馬大学(CRANTS)、日本中央バス", refs: [1] }
    ],
    references: [
      { id: 1, title: "前橋市における自動運転の取り組み", url: "https://www.city.maebashi.gunma.jp/", date: "2023-01-01", source: "前橋市" }
    ]
  },
  {
    id: "exp-031",
    name: { value: "奥日光 自動運転大型EVバス実証（栃木県）", refs: [1] },
    location: { value: "栃木県日光市（奥日光エリア）", lat: 36.736, lng: 139.444, refs: [1] },
    prefecture: { value: "栃木県", refs: [1] },
    period: { value: "2025年11月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "奥日光低公害バス路線の一部における将来的なレベル4実装を目指して、大型EVバス（着席定員27名）を用いた社会実装に向けた実証実験を実施。",
      refs: [1]
    },
    vehicleType: { value: "大型EVバス", refs: [1] },
    route: { value: "奥日光低公害バス路線", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "システム", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "栃木県 日光市 自動運転バス実証", url: "https://www.as-mobi.com/case/", date: "2024-01-01", source: "先進モビリティ株式会社" }
    ]
  },
  {
    id: "exp-032",
    name: { value: "平塚市 路線バス自動運転実証（神奈川県）", refs: [1] },
    location: { value: "神奈川県平塚市（平塚駅周辺）", lat: 35.328, lng: 139.350, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "路線バスの運転士不足解消を目指し、いすゞ自動車の大型バスを用いた自動運転実証を実施。駐停車車両の自動回避やバス停への自動発着、夜間運行などを技術検証している。",
      refs: [1]
    },
    vehicleType: { value: "いすゞ「エルガ」「エルガEV」", refs: [1] },
    route: { value: "平塚駅周辺の路線バスルート", refs: [1] },
    operationType: { value: "レベル2（実証中）", refs: [1] },
    stakeholders: [
      { role: "産官連携", name: "平塚市、神奈川中央交通、いすゞ自動車", refs: [1] }
    ],
    references: [
      { id: 1, title: "神奈川県平塚市における自動運転実証実験", url: "https://www.isuzu.co.jp/", date: "2024-01-01", source: "いすゞ自動車" }
    ]
  },
  {
    id: "exp-033",
    name: { value: "佐渡市 国内最長自動運転実証（新潟県）", refs: [1] },
    location: { value: "新潟県佐渡市", lat: 38.016, lng: 138.366, refs: [1] },
    prefecture: { value: "新潟県", refs: [1] },
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "鉄道のない佐渡市における地域交通の維持を目指し、自動運転レベル4の社会実装に向けた大規模実証を実施。全長約36kmに及ぶ国内最長ルートや、トンネル内での自己位置推定技術などを検証している。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "佐渡島内ルート（全長約36km）", refs: [1] },
    operationType: { value: "レベル4社会実装に向けた実証", refs: [1] },
    stakeholders: [
      { role: "企業", name: "WILLER株式会社、株式会社ティアフォー、大成建設株式会社", refs: [1] },
      { role: "企業", name: "新潟交通佐渡株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "佐渡市における自動運転実証実験", url: "https://www.niigata.lg.jp/", date: "2024-01-01", source: "新潟県" }
    ]
  },
  {
    id: "exp-034",
    name: { value: "富山市 婦中地域 自動運転実証実験（富山県）", refs: [1] },
    location: { value: "富山県富山市（婦中地域）", lat: 36.655, lng: 137.165, refs: [1] },
    prefecture: { value: "富山県", refs: [1] },
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "郊外や中山間地域における生活の足の確保とバス運転手不足解消を目指し、婦中地域朝日地区等でEVバスを用いた実証実験を実施。路車協調システムや将来のレベル4に向けた検証を行っている。",
      refs: [1]
    },
    vehicleType: { value: "EVバス自動運転車両", refs: [1] },
    route: { value: "富山市婦中地域 朝日地区", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "富山市", refs: [1] }
    ],
    references: [
      { id: 1, title: "富山市 自動運転実証実験事業", url: "https://www.city.toyama.lg.jp/", date: "2024-01-01", source: "富山市" }
    ]
  },
  {
    id: "exp-035",
    name: { value: "富士吉田市 自動運転EVバス実証運行（山梨県）", refs: [1] },
    location: { value: "山梨県富士吉田市", lat: 35.488, lng: 138.807, refs: [1] },
    prefecture: { value: "山梨県", refs: [1] },
    period: { value: "2026年1月〜継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "持続可能な地域公共交通の実現や観光課題への対策として、市内循環ルートにおいてレベル2での有償実証運行を実施。将来的にはレベル4の社会実装を目指す。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "富士吉田市内循環ルート", refs: [1] },
    operationType: { value: "レベル2（有償実証運行）", refs: [1] },
    stakeholders: [
      { role: "企業", name: "富士急グループ", refs: [1] },
      { role: "自治体", name: "富士吉田市", refs: [1] }
    ],
    references: [
      { id: 1, title: "富士吉田市での実証実験", url: "https://www.fujikyu.co.jp/", date: "2025-01-01", source: "富士急行" }
    ]
  },
  {
    id: "exp-036",
    name: { value: "岐阜市 GIFU HEART BUS（岐阜県）", refs: [1] },
    location: { value: "岐阜県岐阜市（中心市街地）", lat: 35.413, lng: 136.756, refs: [1] },
    prefecture: { value: "岐阜県", refs: [1] },
    period: { value: "2023年11月〜（5年間継続予定）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "中心市街地における「GIFU HEART BUS」の運行を継続的に実施。2026年には高度なセンサーとAI技術を搭載した新型車両を導入し、レベル4移行を見据えたデータ蓄積を行っている。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス「GIFU HEART BUS」", refs: [1] },
    route: { value: "岐阜市中心市街地", refs: [1] },
    operationType: { value: "レベル2（将来レベル4へ移行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "岐阜市", refs: [1] }
    ],
    references: [
      { id: 1, title: "岐阜市自動運転事業", url: "https://www.city.gifu.lg.jp/", date: "2024-01-01", source: "岐阜市" }
    ]
  },
  {
    id: "exp-037",
    name: { value: "京田辺市 自動運転EVバス実証（京都府）", refs: [1] },
    location: { value: "京都府京田辺市（けいはんな学研都市エリア）", lat: 34.8, lng: 135.77, refs: [1] },
    prefecture: { value: "京都府", refs: [1] },
    period: { value: "2024年12月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "けいはんな学研都市エリアの交通課題解決に向け、自動運転レベル2のEVバスによる実証運行を実施。将来的なレベル4実装に向けた技術検証と社会受容性の確認を行った。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "京田辺市内 けいはんな学研都市周辺", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "京田辺市", refs: [1] },
      { role: "協力", name: "京都スマートシティ推進協議会", refs: [1] }
    ],
    references: [
      { id: 1, title: "京田辺市における自動運転実証実験について", url: "https://www.city.kyotanabe.lg.jp/", date: "2024-12-01", source: "京田辺市" }
    ]
  },
  {
    id: "exp-038",
    name: { value: "大阪・関西万博 舞洲・夢洲自動運転バス（大阪府）", refs: [1, 2] },
    location: { value: "大阪府大阪市此花区（舞洲・夢洲エリア）", lat: 34.66, lng: 135.39, refs: [1] },
    prefecture: { value: "大阪府", refs: [1] },
    period: { value: "2024年3月〜2025年10月", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "2025年大阪・関西万博への来場者輸送を見据え、大型EVバスを用いた自動運転実証を実施。舞洲パーク&ライドの一部区間では、特定自動運行の許可・認可を得てレベル4運行も実施した。",
      refs: [1, 2]
    },
    vehicleType: { value: "大型EVバス（自動運転システム搭載）", refs: [1, 2] },
    route: { value: "舞洲・夢洲エリア（万博会場周辺）", refs: [1] },
    operationType: { value: "レベル2〜レベル4（万博輸送実証）", refs: [1, 2] },
    stakeholders: [
      { role: "運行主体", name: "Osaka Metro", refs: [1, 2] },
      { role: "技術協力", name: "日本ペイント（ターゲットラインペイント）", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バス「森之宮・京橋周遊ルート」が11月10日（日曜日）から運行を開始します", url: "https://subway.osakametro.co.jp/news/news_release/20241101_jidouunten_bus_kaishi.php", date: "2024-11-01", source: "Osaka Metro" },
      { id: 2, title: "2025年大阪・関西万博の来場者輸送「舞洲パーク&ライド」の一部区間で自動運転バスをレベル4で運行します", url: "https://subway.osakametro.co.jp/news/news_release/20250408_parkandride_unkou.php", date: "2025-04-08", source: "Osaka Metro" }
    ]
  },
  {
    id: "exp-039",
    name: { value: "明日香村 自動運転バス実証運行（奈良県）", refs: [1] },
    location: { value: "奈良県高市郡明日香村（飛鳥駅周辺）", lat: 34.469, lng: 135.795, refs: [1] },
    prefecture: { value: "奈良県", refs: [1] },
    period: { value: "2025年1月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "観光地における交通利便性向上を目指し、近鉄飛鳥駅と高松塚古墳・キトラ古墳を結ぶルートで自動運転バスの実証運行を実施。歴史的資源を巡る二次交通としての有効性を検証した。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "近鉄飛鳥駅〜高松塚古墳〜キトラ古墳", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "明日香村", refs: [1] },
      { role: "協力", name: "奈良県", refs: [1] }
    ],
    references: [
      { id: 1, title: "明日香村における自動運転バス実証運行について", url: "https://www.vill.asuka.nara.jp/", date: "2025-01-01", source: "明日香村" }
    ]
  },
  {
    id: "exp-040",
    name: { value: "和歌山市 運行・路車協調実証（和歌山県）", refs: [1] },
    location: { value: "和歌山県和歌山市（JR和歌山駅〜和歌山城）", lat: 34.232, lng: 135.191, refs: [1] },
    prefecture: { value: "和歌山県", refs: [1] },
    period: { value: "2025年1月〜2月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "中心市街地の活性化と移動手段確保のため、JR和歌山駅から和歌山城の間でEVバスを用いた実証実験を実施。信号連携や路車協調システムを用いた走行支援技術の検証を行った。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "JR和歌山駅〜和歌山城 前通り", refs: [1] },
    operationType: { value: "レベル2（将来レベル4相当を目指す）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "和歌山市", refs: [1] },
      { role: "協力企業", name: "NTT西日本、マクニカ", refs: [1] }
    ],
    references: [
      { id: 1, title: "和歌山市自動運転実証実験の実施結果", url: "https://www.city.wakayama.wakayama.jp/", date: "2025-02-01", source: "和歌山市" }
    ]
  },
  {
    id: "exp-041",
    name: { value: "鳥取市 中心市街地自動運転バス実証（鳥取県）", refs: [1] },
    location: { value: "鳥取県鳥取市（鳥取駅周辺）", lat: 35.494, lng: 134.225, refs: [1] },
    prefecture: { value: "鳥取県", refs: [1] },
    period: { value: "2025年12月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "持続可能な公共交通網の構築を目指し、循環バス「くる梨」のルート等を活用した走行実証を実施。中心市街地における自動運転バスの導入課題を技術・運用の両面から整理した。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "鳥取駅～中心市街地循環ルート", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "鳥取市", refs: [1] }
    ],
    references: [
      { id: 1, title: "鳥取市における自動運転実証運行の概要", url: "https://www.city.tottori.lg.jp/", date: "2025-12-01", source: "鳥取市" }
    ]
  },
  {
    id: "exp-042",
    name: { value: "美郷町 自動運転レベル4検証プロジェクト（島根県）", refs: [1] },
    location: { value: "島根県邑智郡美郷町", lat: 35.06, lng: 132.65, refs: [1] },
    prefecture: { value: "島根県", refs: [1] },
    period: { value: "2025年度", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "総務省の「地域社会DX推進パッケージ事業」に採択され、中山間地域におけるレベル4自動運転の実現に向けた通信システム等の検証を実施。豪雪地帯や電波状況の悪い環境での安定運行を目指す。",
      refs: [1]
    },
    vehicleType: { value: "自動運転車両（レベル4検証用）", refs: [1] },
    route: { value: "美郷町内 指定ルート", refs: [1] },
    operationType: { value: "レベル4に向けた検証", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "美郷町", refs: [1] },
      { role: "支援", name: "総務省", refs: [1] }
    ],
    references: [
      { id: 1, title: "美郷町における自動運転レベル4検証事業について", url: "https://www.soumu.go.jp/", date: "2025-01-01", source: "総務省" }
    ]
  },
  {
    id: "exp-043",
    name: { value: "津山市 地域公共交通自動運転実証（岡山県）", refs: [1] },
    location: { value: "岡山県津山市（JR津山駅周辺）", lat: 35.059, lng: 134.004, refs: [1] },
    prefecture: { value: "岡山県", refs: [1] },
    period: { value: "2025年11月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "JR津山駅と津山リージョンセンターを結ぶ区間で、JR西日本と連携した自動運転バスの実証運行を実施。既存の路線バスとの接続や、地域公共交通としての運用モデルの構築を目指した。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "JR津山駅〜津山リージョンセンター", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "津山市", refs: [1] },
      { role: "協力", name: "西日本旅客鉄道株式会社（JR西日本）", refs: [1] }
    ],
    references: [
      { id: 1, title: "津山市における自動運転バスの実証について", url: "https://www.city.tsuyama.lg.jp/", date: "2025-11-01", source: "津山市" }
    ]
  },
  {
    id: "exp-044",
    name: { value: "福山市 レベル4社会実装に向けた実証（広島県）", refs: [1] },
    location: { value: "広島県福山市（福山駅〜エフピコアリーナ）", lat: 34.489, lng: 133.361, refs: [1] },
    prefecture: { value: "広島県", refs: [1] },
    period: { value: "2025年度", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "2027年度のレベル4社会実装を目標に、市街地での複雑な道路状況下での走行検証を継続。信号連携技術や、路上駐車などの障害物回避技術の更なる高度化を図っている。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "福山駅周辺〜エフピコアリーナふくやま", refs: [1] },
    operationType: { value: "レベル2（レベル4に向けた技術検証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "福山市", refs: [1] }
    ],
    references: [
      { id: 1, title: "福山市自動運転プロジェクト 実施状況", url: "https://www.city.fukuyama.hiroshima.jp/", date: "2025-01-01", source: "福山市" }
    ]
  },
  {
    id: "exp-045",
    name: { value: "周南市 徳山駅〜動物園ルート実証（山口県）", refs: [1] },
    location: { value: "山口県周南市（JR徳山駅〜徳山動物園）", lat: 34.051, lng: 131.802, refs: [1] },
    prefecture: { value: "山口県", refs: [1] },
    period: { value: "2025年度", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "山口県と連携し、2027年度の社会実装を目指して取り組むプロジェクト。JR徳山駅から徳山動物園までのルートで夜間走行や信号連携の検証を行い、観光ルートとしての実用性を高めている。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "JR徳山駅〜徳山動物園（約2km）", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "周南市、山口県", refs: [1] }
    ],
    references: [
      { id: 1, title: "周南市における自動運転実証実験の推進について", url: "https://www.city.shunan.lg.jp/", date: "2025-01-01", source: "周南市" }
    ]
  },
  {
    id: "exp-046",
    name: { value: "鳴門市 ロボットタクシー実証運行（徳島県）", refs: [1] },
    location: { value: "徳島県鳴門市", lat: 34.185, lng: 134.607, refs: [1] },
    prefecture: { value: "徳島県", refs: [1] },
    period: { value: "2025年度〜2026年3月", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "国土交通省事業の一環として、NECや電脳交通と連携し、レベル4を見据えたロボットタクシーの運行実証を実施。オンデマンド配車システムとの連携や遠隔監視体制の構築を検証している。",
      refs: [1]
    },
    vehicleType: { value: "自動運転タクシー車両", refs: [1] },
    route: { value: "鳴門市内 指定エリア", refs: [1] },
    operationType: { value: "レベル4を目指す実証運行", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "鳴門市、徳島県", refs: [1] },
      { role: "企業", name: "NEC、株式会社電脳交通", refs: [1] }
    ],
    references: [
      { id: 1, title: "鳴門市におけるロボットタクシー実証実験", url: "https://www.nec.com/", date: "2025-01-01", source: "NEC" }
    ]
  },
  {
    id: "exp-047",
    name: { value: "三豊市 信号協調EVバス実証（香川県）", refs: [1] },
    location: { value: "香川県三豊市", lat: 34.172, lng: 133.727, refs: [1] },
    prefecture: { value: "香川県", refs: [1] },
    period: { value: "2025年度", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "持続可能な公共交通の実現に向け、信号協調システムを導入した自動運転EVバスの実証を実施。走行ルートの拡大や、将来のレベル4移行を見据えた安全管理体制の強化に取り組んでいる。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "三豊市内（駅〜主要施設）", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "三豊市", refs: [1] },
      { role: "協力", name: "NTT西日本グループ", refs: [1] }
    ],
    references: [
      { id: 1, title: "三豊市における自動運転実証の取り組み", url: "https://www.city.mitoyo.lg.jp/", date: "2025-01-01", source: "三豊市" }
    ]
  },
  {
    id: "exp-048",
    name: { value: "松山市 レベル4路線バス本格運行（愛媛県）", refs: [1] },
    location: { value: "愛媛県松山市（松山観光港周辺）", lat: 33.882, lng: 132.709, refs: [1] },
    prefecture: { value: "愛媛県", refs: [1] },
    period: { value: "2024年12月〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "全国に先駆けて、営業路線における「自動運転レベル4」の特定自動運行を開始（認可申請中・実証段階含む）。松山観光港周辺のルートを設定し、既存バス交通の代替・補完としての実効性を検証する。",
      refs: [1]
    },
    vehicleType: { value: "自動運転路線バス", refs: [1] },
    route: { value: "松山観光港周辺 循環ルート", refs: [1] },
    operationType: { value: "レベル4（段階的に実装）", refs: [1] },
    stakeholders: [
      { role: "運行主体", name: "伊予鉄バス", refs: [1] },
      { role: "自治体", name: "松山市", refs: [1] }
    ],
    references: [
      { id: 1, title: "松山観光港における自動運転レベル4実証について", url: "https://www.iyotetsu.co.jp/", date: "2024-12-01", source: "伊予鉄グループ" }
    ]
  },
  {
    id: "exp-049",
    name: { value: "高知市 都市部レベル4実証（高知県）", refs: [1] },
    location: { value: "高知県高知市（JR高知駅〜イオンモール高知）", lat: 33.567, lng: 133.543, refs: [1] },
    prefecture: { value: "高知県", refs: [1] },
    period: { value: "2025年12月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "都市部における自動運転サービスの可能性を検証するため、JR高知駅から主要商業施設・病院を結ぶルートでレベル4実証を実施。周辺車両や歩行者が多い環境での安全性を重点的に確認した。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス「Minibus」", refs: [1] },
    route: { value: "JR高知駅〜イオンモール高知〜高知赤十字病院", refs: [1] },
    operationType: { value: "レベル4に向けた実証運行", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "高知市、高知県", refs: [1] },
      { role: "協力企業", name: "マクニカ、アイサンテクノロジー", refs: [1] }
    ],
    references: [
      { id: 1, title: "高知市における自動運転実証（総務省事業）の結果報告", url: "https://www.city.kochi.kochi.jp/", date: "2025-12-01", source: "高知市" }
    ]
  },
  {
    id: "exp-050",
    name: { value: "福岡市 アイランドシティ自動運転実証（福岡県）", refs: [1] },
    location: { value: "福岡県福岡市東区（アイランドシティ）", lat: 33.666, lng: 130.408, refs: [1] },
    prefecture: { value: "福岡県", refs: [1] },
    period: { value: "2025年11月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "スマートシティ「アイランドシティ」内における移動の高度化に向けた実証実験。香椎照葉エリアの住宅・公園エリアを循環し、住民の生活空間における自動運転バスの親和性を検証した。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "アイランドシティ（香椎照葉エリア）循環ルート", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "福岡市", refs: [1] },
      { role: "企業", name: "西日本鉄道、三菱電機（路車協調）", refs: [1] }
    ],
    references: [
      { id: 1, title: "アイランドシティにおける自動運転バス実証の実施について", url: "https://www.city.fukuoka.lg.jp/", date: "2025-11-01", source: "福岡市" }
    ]
  },
  {
    id: "exp-051",
    name: { value: "佐賀市 SAGAサンライズパーク レベル4実証（佐賀県）", refs: [1] },
    location: { value: "佐賀県佐賀市（佐賀駅〜SAGAサンライズパーク）", lat: 33.264, lng: 130.298, refs: [1] },
    prefecture: { value: "佐賀県", refs: [1] },
    period: { value: "2026年1月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "大規模スポーツイベント対応等の輸送力強化。佐賀駅からSAGAサンライズパークの間において、難易度の高い右折交差点等を含むルートの約7割をレベル4（相当）で走行する高度実証を行った。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "佐賀駅バスセンター〜SAGAサンライズパーク（約1.5km）", refs: [1] },
    operationType: { value: "レベル4に向けた高度実証", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "佐賀県、佐賀市", refs: [1] },
      { role: "技術協力", name: "ティアフォー、マクニカ", refs: [1] }
    ],
    references: [
      { id: 1, title: "SAGAサンライズパーク周辺における自動運転実証実験", url: "https://www.pref.saga.lg.jp/", date: "2026-01-01", source: "佐賀県" }
    ]
  },
  {
    id: "exp-052",
    name: { value: "対馬市 離島自動運転ソリューション（長崎県）", refs: [1] },
    location: { value: "長崎県対馬市", lat: 34.205, lng: 129.288, refs: [1] },
    prefecture: { value: "長崎県", refs: [1] },
    period: { value: "過去実施（継続検証中）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "離島における持続可能な高齢者移動手段の確保として、自動運転車両（レベル2）の走行実証を実施。特有の急勾配や狭隘道路における自己位置推定技術の有効性を確認した。",
      refs: [1]
    },
    vehicleType: { value: "自動運転車両", refs: [1] },
    route: { value: "対馬市内 指定エリア", refs: [1] },
    operationType: { value: "レベル2", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "対馬市", refs: [1] }
    ],
    references: [
      { id: 1, title: "対馬市における移動支援実証の取り組み", url: "https://www.city.tsushima.nagasaki.jp/", date: "2024-01-01", source: "対馬市" }
    ]
  },
  {
    id: "exp-053",
    name: { value: "佐伯市 大入島コミュニティバス代替実証（大分県）", refs: [1] },
    location: { value: "大分県佐伯市（大入島）", lat: 32.99, lng: 131.91, refs: [1] },
    prefecture: { value: "大分県", refs: [1] },
    period: { value: "2025年1月〜2月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "大入島のコミュニティバス代替としての運用を目指し、自動運転バスの実証運行を実施。狭隘な島内道路における対向車検知や離合支援システムの検証を行った。",
      refs: [1]
    },
    vehicleType: { value: "自動運転小型バス", refs: [1] },
    route: { value: "大入島内（島内周回等）", refs: [1] },
    operationType: { value: "レベル2（実用化に向けた検証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "佐伯市", refs: [1] }
    ],
    references: [
      { id: 1, title: "大入島における自動運転バス実証運行の結果", url: "https://www.city.saiki.oita.jp/", date: "2025-02-01", source: "佐伯市" }
    ]
  },
  {
    id: "exp-054",
    name: { value: "西都市 宮崎県内初EVバス実証（宮崎県）", refs: [1] },
    location: { value: "宮崎県西都市", lat: 32.11, lng: 131.4, refs: [1] },
    prefecture: { value: "宮崎県", refs: [1] },
    period: { value: "2024年11月〜2026年3月", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "宮崎県内初となる自動運転EVバスの実証運行を実施。市内中心部の周遊ルートを設定し、高齢者の外出支援や観光拠点間の回遊性向上、将来的なレベル4運行の可能性を検証している。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "西都市中心部・観光周遊ルート", refs: [1] },
    operationType: { value: "レベル2（実証中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "西都市、宮崎県", refs: [1] },
      { role: "協力", name: "宮崎大学、ソフトバンク", refs: [1] }
    ],
    references: [
      { id: 1, title: "西都市における自動運転実証の実施について", url: "https://www.city.saito.miyazaki.jp/", date: "2025-01-01", source: "西都市" }
    ]
  },
  {
    id: "exp-055",
    name: { value: "南さつま市 鹿児島県内初EVバス実証（鹿児島県）", refs: [1] },
    location: { value: "鹿児島県南さつま市", lat: 31.42, lng: 130.32, refs: [1] },
    prefecture: { value: "鹿児島県", refs: [1] },
    period: { value: "2024年12月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "鹿児島県内初となる自動運転EVバスの実証。持続可能な公共交通体系の構築を目指し、中心市街地で自動運転車両を走行させ、遠隔監視による安全性や社会ニーズを検証した。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "南さつま市中心部 循環ルート", refs: [1] },
    operationType: { value: "レベル2", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "南さつま市", refs: [1] },
      { role: "協力企業", name: "マクニカ、NTT西日本", refs: [1] }
    ],
    references: [
      { id: 1, title: "南さつま市自動運転バス実証実験の結果概要", url: "https://www.city.minamisatsuma.lg.jp/", date: "2025-01-01", source: "南さつま市" }
    ]
  },
  {
    id: "exp-056",
    name: { value: "豊見城市 有償実証・レベル4開発（沖縄県）", refs: [1] },
    location: { value: "沖縄県豊見城市", lat: 26.17, lng: 127.67, refs: [1] },
    prefecture: { value: "沖縄県", refs: [1] },
    period: { value: "2025年11月〜2026年2月", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "既存の生活路線を活用したレベル4自動運転の実現に向けた高度実証。完全キャッシュレス対応の有償運行を実施し、将来的な無人化運行に向けた事業性の検証と、走行データの蓄積を行っている。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "豊見城市内 生活路線（105番線等）の一部区間（約18km）", refs: [1] },
    operationType: { value: "有償実証運行（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "豊見城市", refs: [1] },
      { role: "運行主体", name: "第一交通産業", refs: [1] }
    ],
    references: [
      { id: 1, title: "豊見城市における自動運転推進事業について", url: "https://www.city.tomigusuku.lg.jp/", date: "2025-01-01", source: "豊見城市" }
    ]
  },
  {
    id: "exp-057",
    name: { value: "当別町 自動運転EVバス実証運行（マクニカ）", refs: [1] },
    location: { value: "北海道当別町（JRロイズタウン駅周辺）", lat: 43.197, lng: 141.439, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "継続中（冬季含む）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "持続可能な公共交通の実現を目指し、マクニカと連携して「NAVYA EVO」などの自動運転EVバスを使用した実証運行を実施。特別豪雪地帯である当別町での冬季安定運行の検証も行う。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス（NAVYA EVO等）", refs: [1] },
    route: { value: "JRロイズタウン駅〜道の駅とうべつ周辺", refs: [1] },
    operationType: { value: "レベル2（実証中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "当別町", refs: [1] },
      { role: "自動運転システム", name: "マクニカ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "当別町 自動運転実証実験", url: "https://www.macnica.co.jp/", date: "2024-01-01", source: "マクニカ" }
    ]
  },
  {
    id: "exp-058",
    name: { value: "むつ市 自動運転バス実証運行", refs: [1] },
    location: { value: "青森県むつ市", lat: 41.292, lng: 141.183, refs: [1] },
    prefecture: { value: "青森県", refs: [1] },
    period: { value: "2025年11月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "運転手不足や高齢化への対応を見据え、ティアフォーの自動運転システムを搭載した「Minibus 2.0」による実証運行を実施。むつ来さまい館〜むつ総合病院〜下北駅を結ぶコースで運行。",
      refs: [1]
    },
    vehicleType: { value: "TIER IV Minibus 2.0", refs: [1] },
    route: { value: "むつ来さまい館〜むつ総合病院〜下北駅（約7km）", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "むつ市", refs: [1] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [1] }
    ],
    references: [
      { id: 1, title: "むつ市 自動運転バス実証", url: "https://www.city.mutsu.aomori.jp/", date: "2025-10-01", source: "むつ市" }
    ]
  },
  {
    id: "exp-059",
    name: { value: "盛岡市 MorioKart 実証実験（冬季デモ）", refs: [1] },
    location: { value: "岩手県盛岡市（盛岡城跡公園等）", lat: 39.701, lng: 141.151, refs: [1] },
    prefecture: { value: "岩手県", refs: [1] },
    period: { value: "2023年1月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "降雪地域における自動運転の可能性や新しい観光交通システムの実現を探るため、自動運転EVを用いた走行デモンストレーションを実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EV", refs: [1] },
    route: { value: "盛岡城跡公園など", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "盛岡市", refs: [1] }
    ],
    references: [
      { id: 1, title: "MorioKart 走行デモ事業", url: "https://www.city.morioka.iwate.jp/", date: "2023-01-01", source: "盛岡市" }
    ]
  },
  {
    id: "exp-060",
    name: { value: "仙台市 東部北（仙台港）自動運転ルート実証", refs: [1] },
    location: { value: "宮城県仙台市（仙台港エリア）", lat: 38.270, lng: 140.983, refs: [1] },
    prefecture: { value: "宮城県", refs: [1] },
    period: { value: "2025年11月〜12月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "レベル4自動運転サービスの実装を目指し、津波避難も想定した沿岸部（仙台港エリア）での実証実験を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "仙台港（東部北）エリア", refs: [1] },
    operationType: { value: "レベル2（将来レベル4に向けた検証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "仙台市", refs: [1] }
    ],
    references: [
      { id: 1, title: "仙台市 自動運転実証実験", url: "https://www.city.sendai.jp/", date: "2025-11-01", source: "仙台市" }
    ]
  },
  {
    id: "exp-061",
    name: { value: "大館市 自動運転移動サービス実証", refs: [1] },
    location: { value: "秋田県大館市（大館駅周辺）", lat: 40.283, lng: 140.553, refs: [1] },
    prefecture: { value: "秋田県", refs: [1] },
    period: { value: "2024年11月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "大館駅周辺の市街地において、自動運転車両を用いた約5.5kmのルートで試乗会・実証実験を実施。将来的なレベル4実装を目指す大館版自動運転移動サービス推進協議会が主体。",
      refs: [1]
    },
    vehicleType: { value: "自動運転小型EVバス", refs: [1] },
    route: { value: "JR大館駅周辺", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "大館市", refs: [1] },
      { role: "事業参画", name: "WILLER株式会社", refs: [1] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [1] }
    ],
    references: [
      { id: 1, title: "大館市における自動運転実証実験", url: "https://www.city.odate.lg.jp/", date: "2024-11-01", source: "大館市" }
    ]
  },
  {
    id: "exp-062",
    name: { value: "長井市 自動運転バス実証実験", refs: [1] },
    location: { value: "山形県長井市", lat: 38.106, lng: 140.035, refs: [1] },
    prefecture: { value: "山形県", refs: [1] },
    period: { value: "2024年12月〜2025年1月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "特別豪雪地帯である長井市の市街地循環コース（約3.5km）にて自動運転バスの実証実験を実施。降雪時の対応や遠隔監視の検証を行い、将来のレベル4実現を目指す。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "交流施設「くるんと」〜市役所等 循環", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "長井市", refs: [1] }
    ],
    references: [
      { id: 1, title: "スマートシティ長井実現事業 自動運転実証", url: "https://www.city.nagai.yamagata.jp/", date: "2024-12-01", source: "長井市" }
    ]
  },
  {
    id: "exp-063",
    name: { value: "磐梯町 自動運転バス公道実証", refs: [1] },
    location: { value: "福島県磐梯町", lat: 37.585, lng: 139.992, refs: [1] },
    prefecture: { value: "福島県", refs: [1] },
    period: { value: "2024年10月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "磐梯町における自動運転レベル4の社会実装を目指し、ティアフォー製小型EV「Minibus」を用いて公道走行実証実験を実施。",
      refs: [1]
    },
    vehicleType: { value: "TIER IV Minibus", refs: [1] },
    route: { value: "JR磐梯町駅〜道の駅ばんだい等", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "磐梯町", refs: [1] },
      { role: "事業主体", name: "一般社団法人ばんだい振興公社", refs: [1] },
      { role: "自動運転技術等", name: "株式会社ティアフォー", refs: [1] },
      { role: "協力機関", name: "アイサンテクノロジー株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "福島県磐梯町で自動運転バス実証実験", url: "https://www.town.bandai.fukushima.jp/", date: "2024-10-01", source: "磐梯町" }
    ]
  },
  {
    id: "exp-064",
    name: { value: "常陸太田市 自動運転EVバス「じょっピー」定常運行", refs: [1] },
    location: { value: "茨城県常陸太田市", lat: 36.541, lng: 140.528, refs: [1] },
    prefecture: { value: "茨城県", refs: [1] },
    period: { value: "2024年2月〜定常運行", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "自動運転EVバス「EVO」を用いた公道での定常運行を実施。2026年3月にはレベル4認可を取得し、特定自動運行を見据えた準備が進行中。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス（Navya EVO）", refs: [1] },
    route: { value: "常陸太田市 市街地ルート", refs: [1] },
    operationType: { value: "定常運行（レベル4認可取得済み）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "常陸太田市", refs: [1] },
      { role: "協力機関", name: "マクニカ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "常陸太田市 自動運転バス実証", url: "https://www.city.hitachiota.ibaraki.jp/", date: "2026-03-01", source: "常陸太田市" }
    ]
  },
  {
    id: "exp-065",
    name: { value: "宇都宮市 ABCプロジェクト 自動運転バス実証", refs: [1] },
    location: { value: "栃木県宇都宮市（西川田エリア等）", lat: 36.527, lng: 139.873, refs: [1] },
    prefecture: { value: "栃木県", refs: [1] },
    period: { value: "過去実施", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "栃木県主導のABCプロジェクトの一環として、宇都宮市の西川田エリアや大谷地区などで自動運転バスを用いた実証実験が行われた。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "西川田駅〜総合運動公園西など", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "宇都宮市", refs: [1] },
      { role: "自治体", name: "栃木県", refs: [1] }
    ],
    references: [
      { id: 1, title: "栃木県ABCプロジェクト", url: "https://www.pref.tochigi.lg.jp/", date: "2022-09-01", source: "栃木県" }
    ]
  },
  {
    id: "exp-066",
    name: { value: "渋川市 自動運転バス実証運行", refs: [1] },
    location: { value: "群馬県渋川市（市街地循環）", lat: 36.495, lng: 139.006, refs: [1] },
    prefecture: { value: "群馬県", refs: [1] },
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "運転手不足や地域交通の課題解決のため、関越交通などと連携し、一般の市民が予約不要で乗車できる渋川市街地循環ルートでの自動運転実証運行を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "渋川市街地 循環ルート", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "渋川市", refs: [1] },
      { role: "自治体", name: "群馬県", refs: [1] },
      { role: "事業参画", name: "関越交通株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "渋川市における自動運転実証実験", url: "https://www.city.shibukawa.lg.jp/", date: "2024-01-01", source: "渋川市" }
    ]
  },
  {
    id: "exp-067",
    name: { value: "さいたま市 自動運転バス実証実験（北浦和駅〜埼玉大学）", refs: [1] },
    location: { value: "埼玉県さいたま市桜区", lat: 35.867, lng: 139.605, refs: [1] },
    prefecture: { value: "埼玉県", refs: [1] },
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "高齢化や運転士不足に対応する持続可能な移動サービスを目指し、大型バスを用いた自動運転実証実験を北浦03系統路線において実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転大型バス", refs: [1] },
    route: { value: "北浦和駅西口〜埼玉大学", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "さいたま市", refs: [1] },
      { role: "事業参画", name: "国際興業バス", refs: [1] }
    ],
    references: [
      { id: 1, title: "さいたま市 自動運転バス実証実験", url: "https://www.city.saitama.lg.jp/", date: "2024-01-01", source: "さいたま市" }
    ]
  },
  {
    id: "exp-068",
    name: { value: "横芝光町 自動運転バス実証調査", refs: [1] },
    location: { value: "千葉県横芝光町", lat: 35.666, lng: 140.48, refs: [1] },
    prefecture: { value: "千葉県", refs: [1] },
    period: { value: "〜2026年2月（終了）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "地域公共交通の維持・確保に向けたモデル事業として自動運転バスの通年運行の実証が行われたが、事業終了により2026年に運行を終了。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "横芝光町内", refs: [1] },
    operationType: { value: "レベル2（実証調査・通年運行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "横芝光町", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バスの実証調査走行終了について", url: "https://www.town.yokoshibahikari.chiba.jp/", date: "2026-02-01", source: "横芝光町" }
    ]
  },
  {
    id: "exp-069",
    name: { value: "多摩市 大型自動運転バス実証運行", refs: [1] },
    location: { value: "東京都多摩市（多摩センター駅周辺）", lat: 35.624, lng: 139.424, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2026年1月〜2月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "都内初となる「大型自動運転バス」を用いた実証運行。多摩センター駅から鶴牧エリアを循環する路線でレベル2の検証を実施し、2027年度のレベル4を目指す。",
      refs: [1]
    },
    vehicleType: { value: "大型自動運転バス", refs: [1] },
    route: { value: "多摩センター駅〜鶴牧エリア", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "多摩市", refs: [1] },
      { role: "事業参画", name: "京王電鉄バス株式会社", refs: [1] },
      { role: "自動運転システム", name: "A-Drive", refs: [1] }
    ],
    references: [
      { id: 1, title: "多摩市 自動運転実証実験", url: "https://www.keio-bus.com/", date: "2026-01-01", source: "京王電鉄バス" }
    ]
  },
  {
    id: "exp-070",
    name: { value: "横浜市 日産ロボタクシー実証実験", refs: [1] },
    location: { value: "神奈川県横浜市（みなとみらいエリア等）", lat: 35.457, lng: 139.633, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2025年11月〜2026年1月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "「セレナ」ベースの自動運転車両を用いた配車サービスを通じ、運用体制の課題抽出等を実施。将来のレベル4ドライバーレスサービス提供を目指す検証。",
      refs: [1]
    },
    vehicleType: { value: "日産 セレナ（自動運転仕様）", refs: [1] },
    route: { value: "みなとみらい・桜木町・関内エリア", refs: [1] },
    operationType: { value: "レベル2相当", refs: [1] },
    stakeholders: [
      { role: "車両提供・全体統括", name: "日産自動車株式会社", refs: [1] },
      { role: "運行管理・システム", name: "BOLDLY株式会社", refs: [1] },
      { role: "自治体", name: "横浜市", refs: [1] },
      { role: "協力企業", name: "京浜急行電鉄", refs: [1] }
    ],
    references: [
      { id: 1, title: "横浜市における自動運転車両での実証実験", url: "https://global.nissannews.com/", date: "2025-11-20", source: "日産自動車" }
    ]
  },
  {
    id: "exp-071",
    name: { value: "佐渡市 自動運転サービス導入に向けた実証実験", refs: [1] },
    location: { value: "新潟県佐渡市", lat: 38.016, lng: 138.366, refs: [1] },
    prefecture: { value: "新潟県", refs: [1] },
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "地域の公共交通維持や他業種との連携による持続可能なサービス構築を目指し、国内最長クラスのルート（約36km）など厳しい環境下でレベル4実装に向けた実証を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "佐渡市内（海岸線・トンネル等含む）", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "佐渡市", refs: [1] },
      { role: "事業参画", name: "WILLER株式会社", refs: [1] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [1] },
      { role: "協力企業", name: "新潟交通佐渡株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "佐渡市 自動運転実証", url: "https://www.niigata.lg.jp/", date: "2024-01-01", source: "新潟県" }
    ]
  },
  {
    id: "exp-072",
    name: { value: "富山市 婦中地域朝日地区 自動運転実証実験", refs: [1] },
    location: { value: "富山県富山市（婦中地域）", lat: 36.638, lng: 137.142, refs: [1] },
    prefecture: { value: "富山県", refs: [1] },
    period: { value: "過去実施", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "富山市の婦中地域朝日地区において、地域公共交通の課題解決のための自動運転車両を用いた実証実験を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転車両", refs: [1] },
    route: { value: "婦中地域朝日地区", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "富山市", refs: [1] }
    ],
    references: [
      { id: 1, title: "富山市 婦中地域実証", url: "https://www.toyama.lg.jp/", date: "2023-01-01", source: "富山市" }
    ]
  },
  {
    id: "exp-073",
    name: { value: "小松市 小松駅〜小松空港 自動運転バス通年運行", refs: [1] },
    location: { value: "石川県小松市", lat: 36.402, lng: 136.45, refs: [1] },
    prefecture: { value: "石川県", refs: [1] },
    period: { value: "2024年3月〜（通年運行）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "北陸新幹線小松駅と小松空港を結ぶルートで、自動運転レベル2の通年運行を実施。総務省事業としてローカル5G等を活用したレベル4支援通信システムの検証も進められている。",
      refs: [1, 2]
    },
    vehicleType: { value: "自動運転バス", refs: [1, 2] },
    route: { value: "小松駅〜小松空港", refs: [1] },
    operationType: { value: "レベル2通年運行（レベル4に向けた通信検証を実施）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "小松市", refs: [1, 2] },
      { role: "協力企業", name: "BOLDLY株式会社", refs: [1] },
      { role: "協力機関", name: "株式会社ティアフォー", refs: [2] },
      { role: "通信システム検証", name: "日本電気株式会社（NEC）", refs: [2] }
    ],
    references: [
      { id: 1, title: "自動運転バスの運行について", url: "https://www.city.komatsu.lg.jp/soshiki/1985/rosenbasu/4/16580.html", date: "2026-02-01", source: "小松市" },
      { id: 2, title: "石川県小松市にて自動運転レベル4を支援する通信システムの検証を開始", url: "https://jpn.nec.com/press/202410/20241021_02.html", date: "2024-10-21", source: "NEC プレスリリース" }
    ]
  },
  {
    id: "exp-074",
    name: { value: "坂井市 自動運転実証事業「イータクプラス」", refs: [1] },
    location: { value: "福井県坂井市", lat: 36.166, lng: 136.224, refs: [1] },
    prefecture: { value: "福井県", refs: [1] },
    period: { value: "2025年10月〜11月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "運転手不足への対応と利便性向上を目指し、春江地区において自動運転による実証実験を実施。MONET Technologiesが運行管理システムを構築。",
      refs: [1]
    },
    vehicleType: { value: "自動運転車両（トヨタ製ミニバンベース）", refs: [1] },
    route: { value: "春江地区（春江支所〜春江病院等）", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "坂井市", refs: [1] },
      { role: "運行管理", name: "MONET Technologies", refs: [1] }
    ],
    references: [
      { id: 1, title: "坂井市 自動運転実証事業イータクプラス", url: "https://www.city.fukui-sakai.lg.jp/", date: "2025-10-01", source: "坂井市" }
    ]
  },
  {
    id: "exp-075",
    name: { value: "富士吉田市 自動運転バス有償実証運行", refs: [1] },
    location: { value: "山梨県富士吉田市", lat: 35.483, lng: 138.805, refs: [1] },
    prefecture: { value: "山梨県", refs: [1] },
    period: { value: "2026年1月〜2月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "持続可能な地域公共交通の実現を目指し、市街地公道（富士みち等）で自動運転EVバスの有償実証運行を実施。2026年度中のレベル4社会実装を目指す。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "富士吉田市内 循環ルート（富士みち等）", refs: [1] },
    operationType: { value: "レベル2（有償実証運行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "富士吉田市", refs: [1] },
      { role: "運行", name: "富士急行株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "富士吉田市レベル4モビリティ実証", url: "https://www.fujikyu.co.jp/", date: "2026-01-01", source: "富士急行" }
    ]
  },
  {
    id: "exp-076",
    name: { value: "上田市 自動運転EVバス実証運行", refs: [1] },
    location: { value: "長野県上田市", lat: 36.4, lng: 138.25, refs: [1] },
    prefecture: { value: "長野県", refs: [1] },
    period: { value: "2023年8月〜9月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "地域公共交通の課題解決やカーボンニュートラル実現を目指し、市内公道にて自動運転EVバスの実証運行を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "上田市内", refs: [1] },
    operationType: { value: "レベル2相当（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "上田市", refs: [1] },
      { role: "企業", name: "日置電機株式会社", refs: [1] },
      { role: "自動運転システム", name: "マクニカ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "上田市 自動運転EVバス実証", url: "https://www.city.ueda.nagano.jp/", date: "2023-08-01", source: "上田市" }
    ]
  },
  {
    id: "exp-077",
    name: { value: "中津川市周辺 東濃地域自動運転コンソーシアム", refs: [1] },
    location: { value: "岐阜県中津川市", lat: 35.485, lng: 137.502, refs: [1] },
    prefecture: { value: "岐阜県", refs: [1] },
    period: { value: "進行中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "東濃地域を中心に、自動運転レベル4の実装に向けたコンソーシアムが組織され、実証実験やロードマップ策定が進められている。",
      refs: [1]
    },
    vehicleType: { value: "自動運転車両", refs: [1] },
    route: { value: "東濃地域（中津川市など）", refs: [1] },
    operationType: { value: "実証調査", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "中津川市", refs: [1] },
      { role: "自治体", name: "恵那市", refs: [1] }
    ],
    references: [
      { id: 1, title: "東濃地域 自動運転コンソーシアム", url: "https://enatabi.jp/", date: "2024-01-01", source: "岐阜県" }
    ]
  },
  {
    id: "exp-078",
    name: { value: "磐田市 低速自動運転技術の実証実験", refs: [1] },
    location: { value: "静岡県磐田市", lat: 34.717, lng: 137.85, refs: [1] },
    prefecture: { value: "静岡県", refs: [1] },
    period: { value: "過去実施", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "ヤマハ発動機の電動小型低速車両（ランドカーベース）を用いた公道実証実験。路面のパターンをカメラで認識するVGL（バーチャル・ガイドライン）方式の検証を行った。",
      refs: [1]
    },
    vehicleType: { value: "電動小型低速車両", refs: [1] },
    route: { value: "JR御厨駅周辺", refs: [1] },
    operationType: { value: "レベル2相当", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "磐田市", refs: [1] },
      { role: "企業", name: "ヤマハ発動機株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "磐田市内での低速自動運転実証", url: "https://global.yamaha-motor.com/", date: "2019-07-01", source: "ヤマハ発動機" }
    ]
  },
  {
    id: "exp-079",
    name: { value: "日進市 自動運転バス（ARMA）公道実走実験", refs: [1] },
    location: { value: "愛知県日進市", lat: 35.127, lng: 137.039, refs: [1] },
    prefecture: { value: "愛知県", refs: [1] },
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "新たな公共交通の確立を目指し、自動運転バス（ARMA）での公道実証実験を実施。市役所や住宅エリアを結ぶルートで、名鉄バスやBOLDLY等と連携して運行。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス（ARMA）", refs: [1] },
    route: { value: "日進市役所・東山地区など", refs: [1] },
    operationType: { value: "レベル2（実証中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "日進市", refs: [1] },
      { role: "運行", name: "名鉄バス株式会社", refs: [1] },
      { role: "企業", name: "BOLDLY株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "日進市 自動運転バス実験", url: "https://www.city.nisshin.lg.jp/", date: "2023-01-01", source: "日進市" }
    ]
  },
  {
    id: "exp-080",
    name: { value: "四日市市 自動運転EVバス実証実験", refs: [1] },
    location: { value: "三重県四日市市", lat: 34.966, lng: 136.621, refs: [1] },
    prefecture: { value: "三重県", refs: [1] },
    period: { value: "2024年11月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "中央通りの再開発（ニワミチよっかいち）と連動し、近鉄四日市駅周辺エリアにおいてまちなかの回遊性向上を目的とした自動運転EVバスの実証を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "近鉄四日市駅周辺", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "四日市市", refs: [1] },
      { role: "協力", name: "三重交通", refs: [1] }
    ],
    references: [
      { id: 1, title: "四日市市における自動運転実証", url: "https://www.city.yokkaichi.lg.jp/", date: "2024-11-01", source: "四日市市" }
    ]
  },
  {
    id: "exp-081",
    name: { value: "大津市 自動運転バス等の実証実験", refs: [1] },
    location: { value: "滋賀県大津市", lat: 35.017, lng: 135.854, refs: [1] },
    prefecture: { value: "滋賀県", refs: [1] },
    period: { value: "2022年12月〜2023年2月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "観光客の二次交通充実や高齢者の移動手段確保を目指し、JR大津駅から琵琶湖沿いのホテルを結ぶルートで自動運転中型バス等の運行実験を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転小型バス・EVバス", refs: [1] },
    route: { value: "びわ湖大津プリンスホテル〜JR大津駅", refs: [1] },
    operationType: { value: "レベル2相当", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "大津市", refs: [1] },
      { role: "運行主体", name: "京阪バス", refs: [1] },
      { role: "協力", name: "京阪電気鉄道", refs: [1] },
      { role: "システム協力", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "大津市内における自動運転バス等の実証", url: "https://www.keihanbus.jp/", date: "2022-12-01", source: "京阪バス" }
    ]
  },
  {
    id: "exp-082",
    name: { value: "京都市 洛西ニュータウンエリア 自動運転実証実験", refs: [1] },
    location: { value: "京都府京都市西京区", lat: 34.965, lng: 135.666, refs: [1] },
    prefecture: { value: "京都府", refs: [1] },
    period: { value: "2026年3月", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "政令指定都市の公営交通として初となる取り組みで、洛西ニュータウンからJR桂川駅間を小型EV自動運転バスで運行。2028年度レベル4実装を目指す。",
      refs: [1]
    },
    vehicleType: { value: "小型EV自動運転バス", refs: [1] },
    route: { value: "洛西ニュータウン〜JR桂川駅前", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "京都市", refs: [1] }
    ],
    references: [
      { id: 1, title: "洛西ニュータウンでの自動運転実証実験", url: "https://www.city.kyoto.lg.jp/", date: "2026-03-01", source: "京都市" }
    ]
  },
  {
    id: "exp-083",
    name: { value: "大阪市 Osaka Metro 森之宮エリア 自動運転バス実証実験", refs: [1] },
    location: { value: "大阪府大阪市（森之宮エリア）", lat: 34.681, lng: 135.534, refs: [1] },
    prefecture: { value: "大阪府", refs: [1] },
    period: { value: "2024年11月〜2025年10月（予定）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "将来の自動運転レベル4（完全自動運転）を見据え、地域の周遊性向上や社会実装に向けた課題抽出を目的として実施。万博に向けた技術検証とも連携。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "森之宮・京橋周遊ルート", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "運行主体", name: "Osaka Metro", refs: [1] },
      { role: "自治体", name: "大阪市", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バス「森之宮・京橋周遊ルート」が11月10日（日曜日）から運行を開始します", url: "https://subway.osakametro.co.jp/news/news_release/20241101_jidouunten_bus_kaishi.php", date: "2024-11-01", source: "Osaka Metro" }
    ]
  },
  {
    id: "exp-084",
    name: { value: "三田市 自動運転バス実証実験", refs: [1] },
    location: { value: "兵庫県三田市", lat: 34.887, lng: 135.143, refs: [1] },
    prefecture: { value: "兵庫県", refs: [1] },
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "2020年度から継続して実施。ニュータウン地区から新三田駅等へのルートを拡大しながらレベル2運行を重ね、将来的なレベル4実装を目指している。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "ウッディタウン・新三田駅周辺", refs: [1] },
    operationType: { value: "レベル2（段階的拡大）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "三田市", refs: [1] }
    ],
    references: [
      { id: 1, title: "三田市における自動運転の取り組み", url: "https://www.city.sanda.lg.jp/", date: "2024-01-01", source: "三田市" }
    ]
  },
  {
    id: "exp-085",
    name: { value: "三郷町・明日香村 自動運転バス実証実験", refs: [1] },
    location: { value: "奈良県三郷町・明日香村", lat: 34.475, lng: 135.811, refs: [1] },
    prefecture: { value: "奈良県", refs: [1] },
    period: { value: "2025年1月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "奈良県の持続可能な地域交通サービスの実現に向け、三郷町および明日香村（飛鳥駅〜キトラ古墳周辺）にて、誰もが試乗できる自動運転実証を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "JR三郷駅周辺・近鉄飛鳥駅周辺等", refs: [1] },
    operationType: { value: "レベル2", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "奈良県", refs: [1] },
      { role: "自治体", name: "三郷町", refs: [1] },
      { role: "自治体", name: "明日香村", refs: [1] }
    ],
    references: [
      { id: 1, title: "奈良県自動運転バス実証", url: "https://www.pref.nara.jp/", date: "2025-01-01", source: "奈良県" }
    ]
  },
  {
    id: "exp-086",
    name: { value: "和歌山市 自動運転EVバス 実証運行", refs: [1] },
    location: { value: "和歌山県和歌山市", lat: 34.23, lng: 135.17, refs: [1] },
    prefecture: { value: "和歌山県", refs: [1] },
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "持続可能な交通サービスの確保に向け、JR和歌山駅と和歌山城などを結ぶルートで自動運転レベル2の運行を実施。インフラ連携や信号連携の技術検証も行う。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "JR和歌山駅〜和歌山城等", refs: [1] },
    operationType: { value: "レベル2", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "和歌山市", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転EVバスとグリーンスローモビリティの実証運行", url: "https://www.city.wakayama.wakayama.jp/", date: "2024-01-01", source: "和歌山市" }
    ]
  },
  {
    id: "exp-087",
    name: { value: "鳥取市 次世代モビリティ実証", refs: [1] },
    location: { value: "鳥取県鳥取市", lat: 35.5, lng: 134.233, refs: [1] },
    prefecture: { value: "鳥取県", refs: [1] },
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "鳥取砂丘エリアから中心市街地へと場所を移しつつ、バス運転手の高齢化や人員不足対応に向けた自動運転バスの社会実装実験を継続的に実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "鳥取砂丘・中心市街地エリア", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "鳥取市", refs: [1] },
      { role: "バス事業者", name: "日ノ丸自動車株式会社", refs: [1] },
      { role: "協力", name: "WILLER株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "鳥取市次世代モビリティ推進", url: "https://www.city.tottori.lg.jp/", date: "2024-01-01", source: "鳥取市" }
    ]
  },
  {
    id: "exp-088",
    name: { value: "松江市 自動運転バス実証実験", refs: [1] },
    location: { value: "島根県松江市", lat: 35.468, lng: 133.048, refs: [1] },
    prefecture: { value: "島根県", refs: [1] },
    period: { value: "過去実施", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "将来的なバス運転士不足対策や新たな交通モードの導入による賑わい創出を目的に、ソフトバンク等と連携して自動運転バスの実証実験を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "松江市内", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "松江市", refs: [1] },
      { role: "企業", name: "ソフトバンク株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バス実証実験について", url: "https://www.city.matsue.lg.jp/", date: "2024-01-01", source: "松江市" }
    ]
  },
  {
    id: "exp-089",
    name: { value: "津山市 自動運転EVバス 実証運行", refs: [1] },
    location: { value: "岡山県津山市", lat: 35.06, lng: 134.004, refs: [1] },
    prefecture: { value: "岡山県", refs: [1] },
    period: { value: "2025年11月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "津山市とJR西日本が連携し、JR津山駅とグリーンヒルズ津山間でレベル2の自動運転EVバスを運行。将来的なレベル4の実現に向けた検証を行った。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "JR津山駅〜グリーンヒルズ津山間", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "津山市", refs: [1] },
      { role: "企業", name: "JR西日本", refs: [1] }
    ],
    references: [
      { id: 1, title: "津山市とJR西日本による自動運転バス実証", url: "https://www.westjr.co.jp/", date: "2025-11-01", source: "JR西日本" }
    ]
  },
  {
    id: "exp-090",
    name: { value: "東広島市 自動運転・隊列走行BRT実証実験", refs: [1] },
    location: { value: "広島県東広島市", lat: 34.426, lng: 132.744, refs: [1] },
    prefecture: { value: "広島県", refs: [1] },
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "JR西条駅と広島大学を結ぶ幹線道路「ブールバール」にて、公道での連節バス自動運転・隊列走行（BRT）の社会実装を目指した実験を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転連節EVバス", refs: [1] },
    route: { value: "JR西条駅〜広島大学東広島キャンパス", refs: [1] },
    operationType: { value: "レベル2（自動BRT）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "東広島市", refs: [1] },
      { role: "企業", name: "JR西日本", refs: [1] },
      { role: "企業", name: "ソフトバンク株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転・隊列走行BRT実証", url: "https://www.city.higashihiroshima.lg.jp/", date: "2025-11-05", source: "東広島市" }
    ]
  },
  {
    id: "exp-091",
    name: { value: "宇部市 楠こもれびの郷 自動運転サービス実証実験", refs: [1] },
    location: { value: "山口県宇部市", lat: 34.032, lng: 131.25, refs: [1] },
    prefecture: { value: "山口県", refs: [1] },
    period: { value: "過去実施", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "中山間地域での人流・物流の確保を目的として、同市の拠点施設「楠こもれびの郷」周辺で自動運転サービスを検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転車両", refs: [1] },
    route: { value: "楠こもれびの郷 周辺", refs: [1] },
    operationType: { value: "レベル2", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "宇部市", refs: [1] }
    ],
    references: [
      { id: 1, title: "中山間地域における自動運転サービス実証実験", url: "https://www.city.ube.yamaguchi.jp/", date: "2019-03-01", source: "宇部市" }
    ]
  },
  {
    id: "exp-092",
    name: { value: "鳴門市・松茂町 自動運転タクシー 実証運行", refs: [1] },
    location: { value: "徳島県鳴門市・松茂町", lat: 34.136, lng: 134.582, refs: [1] },
    prefecture: { value: "徳島県", refs: [1] },
    period: { value: "2026年2月〜3月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "ドライバー不足解消を目指し、鳴門市西部・松茂町のエリア（計27カ所）で自動運転タクシーを実証運行。NECなどのシステムと電脳交通の配車を連携。",
      refs: [1]
    },
    vehicleType: { value: "自動運転タクシー", refs: [1] },
    route: { value: "鳴門市西部・松茂町エリア一帯", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "鳴門市", refs: [1] },
      { role: "自治体", name: "松茂町", refs: [1] },
      { role: "企業", name: "NEC", refs: [1] },
      { role: "企業", name: "電脳交通", refs: [1] }
    ],
    references: [
      { id: 1, title: "徳島県 自動運転タクシー実証運行", url: "https://www.pref.tokushima.lg.jp/", date: "2026-02-01", source: "徳島県" }
    ]
  },
  {
    id: "exp-093",
    name: { value: "小豆島 自動運転バス走行実証", refs: [1] },
    location: { value: "香川県小豆島町・土庄町", lat: 34.484, lng: 134.183, refs: [1] },
    prefecture: { value: "香川県", refs: [1] },
    period: { value: "2024年9月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "「20年先の小豆島をつくるプロジェクト」の一環として、観光課題の解決に向けて土庄港からエンジェルロード間等で自動運転バスのニーズ検証を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "土庄港〜エンジェルロード界隈", refs: [1] },
    operationType: { value: "レベル2", refs: [1] },
    stakeholders: [
      { role: "推進", name: "20年先の小豆島をつくるプロジェクト", refs: [1] }
    ],
    references: [
      { id: 1, title: "小豆島 自動運転バス実証", url: "https://www.jtbcorp.jp/", date: "2024-09-01", source: "小豆島プロジェクト" }
    ]
  },
  {
    id: "exp-094",
    name: { value: "松山市 伊予鉄グループ 自動運転バス レベル4路線運行", refs: [1] },
    location: { value: "愛媛県松山市", lat: 33.841, lng: 132.766, refs: [1] },
    prefecture: { value: "愛媛県", refs: [1] },
    period: { value: "2024年12月〜・2026年以降本格運行開始", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "特定条件下での完全自動運転（レベル4）を実現する「運転席がない」バスによる本格路線運行。世界初となる踏切通過路線などでの運行も計画・実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転特定バス（レベル4仕様）", refs: [1] },
    route: { value: "松山観光港〜高浜駅、松山環状線ほか", refs: [1] },
    operationType: { value: "レベル4（定常運行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "松山市", refs: [1] },
      { role: "運行主体", name: "伊予鉄グループ", refs: [1] }
    ],
    references: [
      { id: 1, title: "伊予鉄 自動運転バス本格運行", url: "https://www.iyotetsu.co.jp/", date: "2026-01-01", source: "伊予鉄グループ" }
    ]
  },
  {
    id: "exp-095",
    name: { value: "高知市 自動運転バス実証実験", refs: [1] },
    location: { value: "高知県高知市", lat: 33.567, lng: 133.543, refs: [1] },
    prefecture: { value: "高知県", refs: [1] },
    period: { value: "2025年12月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "総務省のDX推進パッケージ事業として、JR高知駅とイオンモール高知周辺の市街地にて効率的なレベル4の実現に向けた通信システム・運行条件の検証を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "JR高知駅〜イオンモール高知周辺", refs: [1] },
    operationType: { value: "レベル4に向けた検証", refs: [1] },
    stakeholders: [
      { role: "企業", name: "NTT西日本", refs: [1] },
      { role: "企業", name: "マクニカ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "高知市内における自動運転バス実証", url: "https://www.ntt-west.co.jp/", date: "2025-12-01", source: "NTT西日本" }
    ]
  },
  {
    id: "exp-096",
    name: { value: "古賀市 AI予約制乗り合いバス「のるーと」自動運転実証", refs: [1] },
    location: { value: "福岡県古賀市", lat: 33.732, lng: 130.468, refs: [1] },
    prefecture: { value: "福岡県", refs: [1] },
    period: { value: "2026年3月〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "AI予約制乗り合いバス「のるーと」を活用した全国初の自動運転実証運行。JR古賀駅東口〜JRししぶ駅東口間でレベル2の運行を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転車両（のるーと）", refs: [1] },
    route: { value: "JR古賀駅東口〜JRししぶ駅東口", refs: [1] },
    operationType: { value: "レベル2", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "古賀市", refs: [1] }
    ],
    references: [
      { id: 1, title: "のるーと自動運転実証", url: "https://www.city.koga.fukuoka.jp/", date: "2026-03-01", source: "古賀市" }
    ]
  },
  {
    id: "exp-097",
    name: { value: "嬉野市 温泉街自動運転 実証実験", refs: [1] },
    location: { value: "佐賀県嬉野市", lat: 33.102, lng: 129.983, refs: [1] },
    prefecture: { value: "佐賀県", refs: [1] },
    period: { value: "継続中（秋季等）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "嬉野温泉駅から温泉街を巡るルートにて、ハンドルやアクセル・ブレーキがない自動運転専用車両を用いた体験・実証実験を数年継続して実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転専用車両", refs: [1] },
    route: { value: "嬉野温泉駅〜温泉街", refs: [1] },
    operationType: { value: "レベル2相当", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "嬉野市", refs: [1] }
    ],
    references: [
      { id: 1, title: "嬉野市 自動運転車両を活用した実証", url: "https://www.city.ureshino.lg.jp/", date: "2024-11-01", source: "嬉野市" }
    ]
  },
  {
    id: "exp-098",
    name: { value: "対馬市 自動運転レベル2実証（対馬スマートシティ）", refs: [1] },
    location: { value: "長崎県対馬市", lat: 34.204, lng: 129.29, refs: [1] },
    prefecture: { value: "長崎県", refs: [1] },
    period: { value: "2022年5月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "特殊塗料「ターゲットラインペイント」を道路に塗装し、センサーで認識する技術を用いたレベル2の自動走行実証実験。低コストインフラ整備として検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "対馬市内 公道", refs: [1] },
    operationType: { value: "レベル2", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "対馬市", refs: [1] },
      { role: "企業", name: "シダックス株式会社", refs: [1] },
      { role: "研究機関", name: "明治大学 自動運転社会総合研究所", refs: [1] },
      { role: "協力", name: "日本ペイント・インダストリアルコーティングス株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "対馬市 自動運転レベル2実証実験", url: "https://www.shidax.co.jp/", date: "2022-05-19", source: "シダックス株式会社" }
    ]
  },
  {
    id: "exp-099",
    name: { value: "熊本市 熊本城周辺等 自動運転バス実証実験", refs: [1] },
    location: { value: "熊本県熊本市", lat: 32.803, lng: 130.707, refs: [1] },
    prefecture: { value: "熊本県", refs: [1] },
    period: { value: "2025年3月〜10月（第1弾・第2弾）", refs: [1, 2, 3] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "熊本市が実施する実証で、熊本城周辺ルートや南熊本駅周辺ルート等において、運転士不足対策と地域交通の維持を目的にレベル2自動運転バスの運行を段階的に実施。運行継続・再開・期間延長を経て第2弾実証まで展開している。",
      refs: [1, 2, 3]
    },
    vehicleType: { value: "自動運転バス（レベル2）", refs: [1, 2, 3] },
    route: { value: "熊本城周辺、南熊本駅周辺など市内ルート", refs: [1, 2, 3] },
    operationType: { value: "レベル2（運行継続・再開・延長を伴う段階実証）", refs: [1, 2, 3] },
    stakeholders: [
      { role: "自治体", name: "熊本市", refs: [1, 2, 3] }
    ],
    references: [
      { id: 1, title: "自動運転バスの実証運行について", url: "https://www.city.kumamoto.jp/kiji00358941/index.html", date: "2025-10-07", source: "熊本市 公式サイト" },
      { id: 2, title: "【報道資料】自動運転バスの運行継続について", url: "https://www.city.kumamoto.jp/kiji00363335/index.html", date: "2025-04-02", source: "熊本市 報道資料" },
      { id: 3, title: "【報道資料】自動運転バスの運行再開および運行期間延長について", url: "https://www.city.kumamoto.jp/kiji00364173/index.html", date: "2025-05-12", source: "熊本市 報道資料" }
    ]
  },
  {
    id: "exp-100",
    name: { value: "佐伯市 大入島 自動運転カート実証実験", refs: [1] },
    location: { value: "大分県佐伯市", lat: 32.969, lng: 131.93, refs: [1] },
    prefecture: { value: "大分県", refs: [1] },
    period: { value: "2025年1月〜2月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "佐伯市大入島にてコミュニティバスの一部に自動運転カートを使用。「路車協調システム」の検証も実施された。（事業継続は中止）",
      refs: [1]
    },
    vehicleType: { value: "自動運転電動カート", refs: [1] },
    route: { value: "大入島内", refs: [1] },
    operationType: { value: "実証実験（路車協調システム検証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "佐伯市", refs: [1] },
      { role: "車両提供等", name: "ヤマハ発動機株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "佐伯市大入島 自動運転実験", url: "https://www.city.saiki.oita.jp/", date: "2025-01-09", source: "佐伯市" }
    ]
  },
  {
    id: "exp-101",
    name: { value: "西都市 妻エリア・西都原古墳群 自動運転実証実験", refs: [1] },
    location: { value: "宮崎県西都市", lat: 32.108, lng: 131.399, refs: [1] },
    prefecture: { value: "宮崎県", refs: [1] },
    period: { value: "2026年2月〜3月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "妻エリアの周遊と西都原古墳群への観光ルートを行き来する、小型バスタイプと乗用車タイプの2台を用いた将来のレベル4実装を見据えた検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転小型バス・乗用車", refs: [1] },
    route: { value: "妻エリア〜西都原古墳群等", refs: [1] },
    operationType: { value: "レベル4を見据えた実証", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "西都市", refs: [1] },
      { role: "協力", name: "NTTビジネスソリューションズ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "西都市 自動運転実証実験", url: "https://www.city.saito.lg.jp/", date: "2026-02-12", source: "西都市" }
    ]
  },
  {
    id: "exp-102",
    name: { value: "南さつま市 自動運転EVバス 実証実験", refs: [1] },
    location: { value: "鹿児島県南さつま市", lat: 31.416, lng: 130.316, refs: [1] },
    prefecture: { value: "鹿児島県", refs: [1] },
    period: { value: "継続中（2026年1月等）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "路線バスの減便や運転手不足に対応するため、将来的な遠隔監視による自動運転（レベル4）を目指し、システムが交差点判断等を行うレベル2実証を継続。",
      refs: [1]
    },
    vehicleType: { value: "自動運転小型EVバス", refs: [1] },
    route: { value: "南さつま市内", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "南さつま市", refs: [1] }
    ],
    references: [
      { id: 1, title: "南さつま市 自動運転バス実証", url: "https://www.city.minamisatsuma.lg.jp/", date: "2026-01-01", source: "南さつま市" }
    ]
  },
  {
    id: "exp-103",
    name: { value: "豊見城市 生活路線バス（105番） 自動運転EVバス実証運行", refs: [1] },
    location: { value: "沖縄県豊見城市", lat: 26.166, lng: 127.653, refs: [1] },
    prefecture: { value: "沖縄県", refs: [1] },
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "市民の生活路線である105番「豊見城市内一周線」の一部にて自動運転EVバスを運行。将来のレベル4達成による持続可能な地域交通を目指す。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "豊見城市内 105番路線一部", refs: [1] },
    operationType: { value: "将来レベル4達成に向けた検証", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "豊見城市", refs: [1] }
    ],
    references: [
      { id: 1, title: "豊見城市 105番路線 自動運転実証", url: "https://www.city.tomigusuku.lg.jp/", date: "2024-01-01", source: "豊見城市" }
    ]
  },
  {
    id: "exp-104",
    name: { value: "境町 新型車両MiCa導入・ルート拡充（第4期）", refs: [1] },
    location: { value: "茨城県境町（新ルート含む全域）", lat: 36.148, lng: 139.792, refs: [1] },
    prefecture: { value: "茨城県", refs: [1] },
    period: { value: "2024年4月〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "2020年から国内初の定常運行を続ける境町において、2024年にエストニア製の新型車両「MiCa」を導入。従来のARMAに加え複数台体制での運行を実現し、走行ルートもさらに拡大。信号協調やインフラ連携による安全性向上を図っている。",
      refs: [1]
    },
    vehicleType: { value: "Auve Tech MiCa", refs: [1] },
    route: { value: "境町内循環ルート（第4期拡充エリア含む）", refs: [1] },
    operationType: { value: "レベル2（定常運行）、将来のレベル4実装に向けた検証", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "茨城県境町", refs: [1] },
      { role: "運行管理・システム", name: "BOLDLY株式会社", refs: [1] },
      { role: "車両提供", name: "マクニカ株式会社", refs: [1] },
      { role: "車両製造", name: "Auve Tech（エストニア）", refs: [1] }
    ],
    references: [
      { id: 1, title: "境町、新型自動運転バス「MiCa」を導入しルート拡大", url: "https://boldly.jp/news/2024/04/", date: "2024-04-01", source: "BOLDLY株式会社" }
    ]
  },
  {
    id: "exp-105",
    name: { value: "永平寺町 始まりの実証（産総研・パナソニック共同）", refs: [1, 2] },
    location: { value: "福井県永平寺町（永平寺参ろーど）", lat: 36.092, lng: 136.355, refs: [1] },
    prefecture: { value: "福井県", refs: [1] },
    period: { value: "2017年10月〜11月", refs: [1, 2] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "国内屈指の導入実績を持つ永平寺町における最初の本格実証。廃線跡を活用した専用道で、パナソニック製の電動カートを使用。一人の遠隔監視者が複数台を管理する技術の基礎を確立した。",
      refs: [1, 2]
    },
    vehicleType: { value: "パナソニック製電動カート", refs: [1] },
    route: { value: "永平寺参ろーど 約1.4km", refs: [1] },
    operationType: { value: "レベル2（遠隔監視型、最初期検証）", refs: [1] },
    stakeholders: [
      { role: "研究開発", name: "国立研究開発法人 産業技術総合研究所（産総研）", refs: [1] },
      { role: "車両提供", name: "パナソニック株式会社", refs: [1] },
      { role: "自治体", name: "福井県永平寺町", refs: [2] }
    ],
    references: [
      { id: 1, title: "永平寺町における自動走行実証実験の開始", url: "https://www.aist.go.jp/aist_j/news/pr20171013.html", date: "2017-10-13", source: "産総研 プレスリリース" },
      { id: 2, title: "永平寺町自動運転のあゆみ", url: "https://www.town.eiheiji.lg.jp/", date: "2023-01-01", source: "永平寺町" }
    ]
  },
  {
    id: "exp-106",
    name: { value: "前橋市 5G連携・顔認証等 高度化実証", refs: [1] },
    location: { value: "群馬県前橋市（JR前橋駅〜中央前橋駅）", lat: 36.389, lng: 139.071, refs: [1] },
    prefecture: { value: "群馬県", refs: [1] },
    period: { value: "2022年度〜2023年度", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "2018年から実証を続ける前橋市の第3フェーズ。ローカル5G等を活用した高精度な遠隔監視や、マイナンバーカード・顔認証と連携した決済システムの検証を行い、社会実装に向けた利便性を追求した。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス（大型・中型）", refs: [1] },
    route: { value: "JR前橋駅〜中央前橋駅シャトルルート 約1km", refs: [1] },
    operationType: { value: "レベル2（5G連携・高度技術検証）", refs: [1] },
    stakeholders: [
      { role: "事業全体", name: "前橋市", refs: [1] },
      { role: "技術協力", name: "群馬大学(CRANTS)", refs: [1] },
      { role: "システム", name: "日本電気株式会社（NEC）", refs: [1] }
    ],
    references: [
      { id: 1, title: "前橋市、5Gと顔認証を活用した自動運転バス実証の結果", url: "https://www.city.maebashi.gunma.jp/", date: "2024-03-31", source: "前橋市" }
    ]
  },
  {
    id: "exp-107",
    name: { value: "柏の葉キャンパス 導入初期公道走行試験（2019）", refs: [1] },
    location: { value: "千葉県柏市（柏の葉キャンパス周辺）", lat: 35.895, lng: 139.953, refs: [1] },
    prefecture: { value: "千葉県", refs: [1] },
    period: { value: "2019年11月〜2020年3月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "柏の葉キャンパス周辺での長期実証の第一段階。一般公道を実際にバスが走行し、技術的な安全性と住民の受容性を調査。現在のCooL4プロジェクトへと繋がる原点となった。",
      refs: [1]
    },
    vehicleType: { value: "先進モビリティ製自動運転システム搭載バス", refs: [1] },
    route: { value: "柏の葉キャンパス駅〜東京大学柏キャンパス 約2.5km", refs: [1] },
    operationType: { value: "レベル2（初期公道検証）", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "東京大学", refs: [1] },
      { role: "システム", name: "先進モビリティ株式会社", refs: [1] },
      { role: "自治体", name: "千葉県柏市", refs: [1] }
    ],
    references: [
      { id: 1, title: "柏の葉キャンパス周辺における自動運転バス実証（2019年度）", url: "https://www.kashiwanoha-smartcity.com/", date: "2019-11-01", source: "柏の葉スマートシティ" }
    ]
  },
  {
    id: "exp-108",
    name: { value: "福山市 レベル4実装に向けた公道実証プロジェクト", refs: [1, 2] },
    location: { value: "広島県福山市", lat: 34.485, lng: 133.362, refs: [1] },
    prefecture: { value: "広島県", refs: [1] },
    period: { value: "2021年度〜継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "都市部における自動運転サービスの早期実装を目指。中型バスを用いた公道実証を毎年繰り返し実施。ルート上の信号情報との連携や、駐停車車両を回避する高度なAI技術の検証を行っている。",
      refs: [1, 2]
    },
    vehicleType: { value: "自動運転中型バス", refs: [1] },
    route: { value: "福山市内中心部 公道路線", refs: [1] },
    operationType: { value: "レベル2〜レベル4に向けた段階的実証", refs: [2] },
    stakeholders: [
      { role: "事業主体", name: "広島県福山市", refs: [1] },
      { role: "技術支援", name: "マクニカ株式会社", refs: [2] },
      { role: "運行協力", name: "中国バス", refs: [2] }
    ],
    references: [
      { id: 1, title: "福山市 自動運転実証の取り組みについて", url: "https://www.city.fukuyama.hiroshima.jp/", date: "2024-01-01", source: "福山市" },
      { id: 2, title: "マクニカ、福山市で自動運転バス実証を支援", url: "https://www.macnica.co.jp/news/2023/", date: "2023-11-01", source: "マクニカ株式会社" }
    ]
  },
  {
    id: "exp-109",
    name: { value: "中部国際空港 常時運行に向けた空港内・周辺実証", refs: [1] },
    location: { value: "愛知県常滑市（中部国際空港周辺）", lat: 34.862, lng: 136.812, refs: [1] },
    prefecture: { value: "愛知県", refs: [1] },
    period: { value: "2022年〜継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "空港アクセス向上と空港内作業の自動化を目指し、制限区域および空港島内一般道での実証を複数回実施。特に、大型・中型バスによる多人数輸送における、GNSSが届きにくいエリアでの精度検証を行っている。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス、空港用特殊車両", refs: [1] },
    route: { value: "中部国際空港内および空港島周辺", refs: [1] },
    operationType: { value: "レベル2〜（段階的実証）", refs: [1] },
    stakeholders: [
      { role: "支援", name: "愛知県", refs: [1] },
      { role: "システム", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "愛知県 自動運転社会実装プロジェクト：中部国際空港", url: "https://www.pref.aichi.jp/", date: "2024-01-01", source: "愛知県" }
    ]
  },
  {
    id: "exp-110",
    name: { value: "福岡市 大学キャンパス・ウォーターフロント実証", refs: [1] },
    location: { value: "福岡県福岡市（九州大学伊都キャンパス・博多港周辺）", lat: 33.595, lng: 130.222, refs: [1] },
    prefecture: { value: "福岡県", refs: [1] },
    period: { value: "2023年度〜2024年", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "広大な九州大学伊都キャンパス内での学生移動と、観光ニーズの高いウォーターフロント地区での回遊性向上を目的とした実証。段階的に実装エリアを拡大しており、MaaS連携による予約システムの検証も行っている。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス「ARMA」等", refs: [1] },
    route: { value: "九大伊都キャンパス内、博多港周辺エリア", refs: [1] },
    operationType: { value: "レベル2（MaaS連携実証）", refs: [1] },
    stakeholders: [
      { role: "事業協力", name: "九州大学", refs: [1] },
      { role: "自治体", name: "福岡市", refs: [1] },
      { role: "運行・システム", name: "BOLDLY株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "福岡市、九州大学等での自動運転バス実証について", url: "https://www.city.fukuoka.lg.jp/", date: "2024-03-01", source: "福岡市" }
    ]
  },
  {
    id: "exp-111",
    name: { value: "佐賀市 市街地回遊性向上実走調査", refs: [1] },
    location: { value: "佐賀県佐賀市（SAGAサンライズパーク周辺）", lat: 33.275, lng: 130.298, refs: [1] },
    prefecture: { value: "佐賀県", refs: [1] },
    period: { value: "2023年〜2024年", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "SAGAサンライズパークの開業に合わせ、周辺の賑わい創出と二次交通解消を目指した実証。2024年の本格稼働に向け、ルート上の課題抽出と乗客満足度の調査を主体としたプレ実証を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "SAGAサンライズパーク〜佐賀駅周辺", refs: [1] },
    operationType: { value: "レベル2（導入前実証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "佐賀市", refs: [1] },
      { role: "運行協力", name: "佐賀市交通局", refs: [1] }
    ],
    references: [
      { id: 1, title: "佐賀市 自動運転バス実証走行と体験乗車会の結果", url: "https://www.city.saga.lg.jp/main/110918.html", date: "2024-01-01", source: "佐賀市" }
    ]
  },
  {
    id: "exp-112",
    name: { value: "陸前高田市 まちなか再生エリア 利便性検証（2024）", refs: [1] },
    location: { value: "岩手県陸前高田市（市街地・アバッセ周辺）", lat: 39.015, lng: 141.628, refs: [1] },
    prefecture: { value: "岩手県", refs: [1] },
    period: { value: "2024年度（予定合含む）", refs: [1] },
    status: { value: "実施中・一部計画中", refs: [1] },
    description: {
      value: "震災復興公園に加え、再建された市街地エリアでの日常移動を支えるモビリティとして、NAVYA ARMA等を用いた実証を実施。観光ガイド同乗による回遊性向上と住民の買い物支援のハイブリッドモデルを目指す。",
      refs: [1]
    },
    vehicleType: { value: "NAVYA ARMA", refs: [1] },
    route: { value: "陸前高田市中心市街地", refs: [1] },
    operationType: { value: "レベル2（中心市街地実証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "陸前高田市", refs: [1] },
      { role: "運行管理", name: "BOLDLY株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "陸前高田市における自動運転バスの新たな実証実験", url: "https://www.city.rikuzentakata.iwate.jp/", date: "2024-03-01", source: "陸前高田市" }
    ]
  },
  {
    id: "exp-113",
    name: { value: "北九州市 響灘・東田地区 複数拠点実証", refs: [1] },
    location: { value: "福岡県北九州市（若松区・八幡東区）", lat: 33.912, lng: 130.812, refs: [1] },
    prefecture: { value: "福岡県", refs: [1] },
    period: { value: "2022年〜継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "響灘地区の工業地帯と、環境ミュージアム等がある東田地区（スマートシティ拠点）の2拠点において、地域交通の持続性を検証。将来的なレベル4遠隔監視システムとの統合も見越し、複数年度にわたる実証活動を展開している。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス「ARMA」等", refs: [1] },
    route: { value: "響灘地区・東田地区 各拠点ルート", refs: [1] },
    operationType: { value: "レベル2（複数拠点展開）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "北九州市", refs: [1] },
      { role: "技術協力", name: "アイサンテクノロジー株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "北九州市 自動運転プロジェクト公表資料", url: "https://www.city.kitakyushu.lg.jp/", date: "2024-01-01", source: "北九州市" }
    ]
  },
  {
    id: "exp-114",
    name: { value: "都営バス 新木場駅前〜日本科学未来館 自動運転実証", refs: [1] },
    location: { value: "東京都江東区（新木場駅前〜日本科学未来館）", lat: 35.65, lng: 139.79, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2026年3月1日〜3月13日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "東京都交通局が、既存の都営バス路線の一部を活用して大型バスによる自動運転実証を実施。予約制の無料乗車で運用し、自動運転レベル2（運転手同乗）で技術・運行課題を検証した。",
      refs: [1]
    },
    vehicleType: { value: "いすゞ ERGA（大型バス）", refs: [1] },
    route: { value: "新木場駅前〜日本科学未来館（片道約30分）", refs: [1] },
    operationType: { value: "レベル2（運転手同乗）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "東京都", refs: [1] },
      { role: "運行主体", name: "東京都交通局", refs: [1] },
      { role: "車両提供", name: "いすゞ自動車", refs: [1] }
    ],
    references: [
      { id: 1, title: "都営バスで自動運転の実証実験を行います", url: "https://www.metro.tokyo.lg.jp/information/press/2026/01/2026012306", date: "2026-01-23", source: "東京都 報道発表資料" }
    ]
  },
  {
    id: "exp-115",
    name: { value: "彦根市 Shiga Smart Access 自動運転バス実証運行", refs: [1] },
    location: { value: "滋賀県彦根市（彦根駅〜市立病院・くすのきセンター）", lat: 35.275, lng: 136.259, refs: [1] },
    prefecture: { value: "滋賀県", refs: [1] },
    period: { value: "2026年1月31日〜2月16日（一般運行は2月2日〜）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "滋賀県の自動運転チャレンジ事業として、彦根市中心部でレベル2相当の自動運転EVバス実証を実施。持続可能な地域交通の社会実装に向け、営業運行を見据えた運行条件や需要を検証した。",
      refs: [1]
    },
    vehicleType: { value: "NAVYA EVO（自動運転EVバス）", refs: [1] },
    route: { value: "彦根駅〜彦根市立病院〜くすのきセンター", refs: [1] },
    operationType: { value: "レベル2相当（実証運行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "滋賀県", refs: [1] },
      { role: "自治体", name: "彦根市", refs: [1] },
      { role: "協力企業", name: "NTT西日本、NTTビジネスソリューションズ株式会社、マクニカ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "Shiga Smart Access滋賀県自動運転チャレンジ事業 自動運転バスの実証運行を開始します！", url: "https://www.pref.shiga.lg.jp/kensei/koho/e-shinbun/oshirase/347560.html", date: "2026-01-13", source: "滋賀県" }
    ]
  },
  {
    id: "exp-116",
    name: { value: "弥彦村 自動運転バス「MiCa」定常運行", refs: [1] },
    location: { value: "新潟県西蒲原郡弥彦村", lat: 37.703, lng: 138.824, refs: [1] },
    prefecture: { value: "新潟県", refs: [1] },
    period: { value: "2024年1月〜（通年運行）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "弥彦村内において、エストニアAuve Tech社の新型自動運転EV「MiCa」を用いた通年運行を実施。観光地における移動の高度化と、住民の生活交通の維持を目的としている。BOLDLYが運行管理を担当。",
      refs: [1]
    },
    vehicleType: { value: "Auve Tech MiCa", refs: [1] },
    route: { value: "弥彦村内 循環ルート", refs: [1] },
    operationType: { value: "レベル2（定常運行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "弥彦村", refs: [1] },
      { role: "運行管理", name: "BOLDLY株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "弥彦村で自動運転バス「MiCa」による通年運行を開始", url: "https://www.softbank.jp/drive/press/2024/20240130_01/", date: "2024-01-30", source: "ソフトバンク プレスリリース" }
    ]
  },
  {
    id: "exp-117",
    name: { value: "横須賀市 大型路線バス自動運転実証", refs: [1] },
    location: { value: "神奈川県横須賀市（YRP周辺）", lat: 35.219, lng: 139.689, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2025年12月〜2026年2月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "ソフトバンク、京浜急行バス、横須賀市が実施した大型路線バスの実証実験。YRP野比駅と横須賀リサーチパーク（YRP）を結ぶ既存路線を走行。将来のレベル4実用化や隊列走行技術の導入を見据えた技術検証を行った。",
      refs: [1]
    },
    vehicleType: { value: "大型路線バス", refs: [1] },
    route: { value: "YRP野比駅〜横須賀リサーチパーク（YRP）", refs: [1] },
    operationType: { value: "レベル2（将来のレベル4・隊列走行を見据えた検証）", refs: [1] },
    stakeholders: [
      { role: "事業主体・技術検証", name: "ソフトバンク株式会社", refs: [1] },
      { role: "運行主体", name: "京浜急行バス株式会社", refs: [1] },
      { role: "自治体", name: "横須賀市", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転レベル4の実用化に向け大型路線バスによる実証を開始", url: "https://www.softbank.jp/corp/news/press/sbkk/2025/20251216_01/", date: "2025-12-16", source: "ソフトバンク プレスリリース" }
    ]
  },
  {
    id: "exp-118",
    name: { value: "慶應義塾大学SFC 交通理解AI実証実験", refs: [1] },
    location: { value: "神奈川県藤沢市（慶應SFCキャンパス内）", lat: 35.388, lng: 139.428, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2024年10月〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "ソフトバンクが開発した「交通理解マルチモーダルAI」の実証実験。キャンパス内を走行する自動運転車が予期せぬ状況に遭遇した際、車外のAIサーバーが状況を判断して遠隔サポートする仕組みを検証。完全無人化に向けたエッジAIの有効性を確認している。",
      refs: [1]
    },
    vehicleType: { value: "自動運転車両", refs: [1] },
    route: { value: "慶應義塾大学 湘南藤沢キャンパス（SFC）構内", refs: [1] },
    operationType: { value: "レベル4の無人化に向けたAI遠隔監視・サポート検証", refs: [1] },
    stakeholders: [
      { role: "技術開発・実施主体", name: "ソフトバンク株式会社", refs: [1] },
      { role: "協力", name: "慶應義塾大学", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転向け「交通理解マルチモーダルAI」を開発し、SFCで実証を開始", url: "https://www.softbank.jp/corp/news/press/sbkk/2024/20241105_01/", date: "2024-11-05", source: "ソフトバンク プレスリリース" }
    ]
  },
  {
    id: "exp-119",
    name: { value: "浜松自動運転やらまいかプロジェクト", refs: [1, 2] },
    location: { value: "静岡県浜松市（庄内地区等）", lat: 34.757, lng: 137.648, refs: [1] },
    prefecture: { value: "静岡県", refs: [1] },
    period: { value: "2016年〜（継続的・段階的に実施）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "浜松市、スズキ、遠州鉄道、BOLDLY等が連携して進めるプロジェクト。スズキの小型車をベースとした自動運転車両を用い、スマートフォン予約連動や車内HMIを活用した利便性の高いモビリティサービスを検証している。BOLDLYの「Dispatcher」による運行管理を採用。",
      refs: [1, 2]
    },
    vehicleType: { value: "スズキ ソリオ（自動運転仕様）", refs: [2] },
    route: { value: "浜松市庄内地区等 路線網（片道約9km等）", refs: [1, 2] },
    operationType: { value: "レベル2（Dispatcherによる遠隔監視・運行管理）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "浜松市", refs: [1] },
      { role: "車両提供・技術協力", name: "スズキ株式会社", refs: [1, 2] },
      { role: "運行主体", name: "遠州鉄道株式会社", refs: [1, 2] },
      { role: "運行管理システム", name: "BOLDLY株式会社", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "浜松自動運転やらまいかプロジェクト 実証実験の開始について", url: "https://www.softbank.jp/drive/press/2023/20231128_01/", date: "2023-11-28", source: "BOLDLY ニュースリリース" },
      { id: 2, title: "浜松市、自動運転実証の第4回実験を開始", url: "https://prtimes.jp/main/html/rd/p/000000318.000039535.html", date: "2023-12-25", source: "PR TIMES" }
    ]
  },
  {
    id: "exp-120",
    name: { value: "富士市 新富士駅〜富士駅 自動運転バス実証運行", refs: [1] },
    location: { value: "静岡県富士市（新富士駅〜富士駅）", lat: 35.157, lng: 138.655, refs: [1] },
    prefecture: { value: "静岡県", refs: [1] },
    period: { value: "2025年度（令和7年度）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "富士市が公共交通課題の解決に向けて実施した自動運転バス実証。新富士駅と富士駅を結ぶ区間で、社会受容性や運行面の課題を検証した。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "新富士駅〜富士駅", refs: [1] },
    operationType: { value: "レベル2（実証運行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "富士市", refs: [1] },
      { role: "技術協力", name: "アイサンテクノロジー株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バスの実証運行について", url: "https://www.city.fuji.shizuoka.jp/1040050000/p000978.html", date: "2026-01-27", source: "富士市" }
    ]
  }
];
