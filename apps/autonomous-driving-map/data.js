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
    name: { value: "上士幌町自動運転バス実証（Boldly・NAVYA ARMA）", refs: [1, 2] },
    location: { value: "北海道上士幌町（市街地循環ルート）", lat: 43.213, lng: 143.387, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2019年10月〜2020年3月（複数年度実施）", refs: [1, 2] },
    status: { value: "完了", refs: [2] },
    description: {
      value: "過疎・高齢化が進む上士幌町において、地域住民の移動手段確保を目的に実施された自動運転バスの実証実験。NAVYA ARMAを使用し、役場周辺や商業施設を結ぶ循環ルートを走行。冬季の積雪環境下での自動運転技術の有効性も検証した。",
      refs: [1, 2, 3]
    },
    vehicleType: { value: "NAVYA ARMA（電動自動走行小型バス、定員15名）", refs: [2] },
    route: { value: "上士幌町役場〜道の駅かみしほろ周辺 約2.5km循環", refs: [1, 3] },
    operationType: { value: "レベル2（乗務員乗車）、冬季積雪環境での走行実証", refs: [1, 2] },
    stakeholders: [
      { role: "運行管理", name: "BOLDLY株式会社", refs: [1, 2] },
      { role: "自治体・事業主体", name: "北海道上士幌町", refs: [1] },
      { role: "出資・支援", name: "ソフトバンク株式会社", refs: [2] },
      { role: "協力企業", name: "マクニカ株式会社", refs: [2] },
      { role: "実験支援", name: "北海道運輸局", refs: [3] }
    ],
    references: [
      { id: 1, title: "上士幌町で自動運転バスの実証実験を開始", url: "https://boldly.jp/news/2019/10/", date: "2019-10-01", source: "BOLDLY株式会社" },
      { id: 2, title: "SBドライブ、上士幌町での自動運転バス実証実験実施報告", url: "https://www.softbank.jp/corp/news/", date: "2020-03-31", source: "ソフトバンク株式会社" },
      { id: 3, title: "北海道での自動運転実証実験（冬季）について", url: "https://wwwtb.mlit.go.jp/hokkaido/", date: "2020-02-10", source: "国土交通省 北海道運輸局" }
    ]
  },
  {
    id: "exp-005",
    name: { value: "幕張新都心自動運転モビリティサービス実証（DeNA・日産）", refs: [1, 2] },
    location: { value: "千葉市美浜区（幕張新都心エリア）", lat: 35.648, lng: 140.039, refs: [1] },
    prefecture: { value: "千葉県", refs: [1] },
    period: { value: "2018年10月〜2019年3月（複数年度実施）", refs: [1, 2] },
    status: { value: "完了", refs: [2] },
    description: {
      value: "千葉市・幕張新都心エリアで実施された自動運転タクシーサービスの実証実験。DeNAの自動運転プラットフォーム「ロボネコヤマト」の技術とDeNAのモビリティサービス基盤を活用し、一般公道での乗客輸送を行った。将来の無人タクシーサービス実現に向けた技術・制度面の課題を検証。",
      refs: [1, 2, 3]
    },
    vehicleType: { value: "日産リーフ改造（自動運転システム搭載、DeNA自動運転AI）", refs: [2, 3] },
    route: { value: "幕張メッセ周辺〜アパホテル・IMM Hotel間 約2km", refs: [1] },
    operationType: { value: "レベル2（安全監視員同乗）", refs: [1, 2] },
    stakeholders: [
      { role: "システム開発・運行管理", name: "株式会社ディー・エヌ・エー（DeNA）", refs: [1, 2] },
      { role: "車両提供・技術協力", name: "日産自動車株式会社", refs: [2, 3] },
      { role: "自治体", name: "千葉市", refs: [1] },
      { role: "支援機関", name: "千葉県", refs: [1, 3] }
    ],
    references: [
      { id: 1, title: "DeNAと日産、幕張新都心で自動運転タクシー実証実験を開始", url: "https://dena.com/jp/press/4155/", date: "2018-10-04", source: "DeNA プレスリリース" },
      { id: 2, title: "EasyRide（イージーライド）自動運転モビリティサービス実証実験", url: "https://nissan-newsroom.com/ja-JP/news/2018/articles/", date: "2018-10-04", source: "日産自動車 ニュースリリース" },
      { id: 3, title: "幕張新都心スマートシティプロジェクト 自動運転実証について", url: "https://www.city.chiba.jp/toshi/toshi/", date: "2018-09-01", source: "千葉市 都市局" }
    ]
  },
  {
    id: "exp-006",
    name: { value: "加賀市自動運転EV実証（ヤマハ発動機・加賀市）", refs: [1, 2] },
    location: { value: "石川県加賀市（片山津温泉エリア）", lat: 36.306, lng: 136.307, refs: [1] },
    prefecture: { value: "石川県", refs: [1] },
    period: { value: "2021年〜（継続的に実施）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "過疎地域における交通弱者対策として、ヤマハ発動機の電動低速車両を自動化した小型EVバスを活用した実証実験。片山津温泉エリアの旅館街・柴山潟周辺を循環するルートで運行。観光地における自動運転モビリティの活用モデルを構築する。",
      refs: [1, 2, 3]
    },
    vehicleType: { value: "ヤマハ発動機製 電動低速車両（HAKOBUS）自動運転改造版", refs: [2, 3] },
    route: { value: "片山津温泉総湯〜各旅館・柴山潟周辺 約1.5km循環", refs: [1, 3] },
    operationType: { value: "レベル2〜3相当（乗務員乗車、限定エリア）", refs: [1, 2] },
    stakeholders: [
      { role: "車両開発・自動運転システム", name: "ヤマハ発動機株式会社", refs: [2, 3] },
      { role: "自治体・事業主体", name: "石川県加賀市", refs: [1] },
      { role: "実証支援", name: "国土交通省", refs: [1] },
      { role: "地域連携", name: "片山津温泉旅館組合", refs: [3] }
    ],
    references: [
      { id: 1, title: "加賀市における自動運転小型EVバス実証実験の実施について", url: "https://www.city.kaga.ishikawa.jp/", date: "2021-10-01", source: "加賀市 プレスリリース" },
      { id: 2, title: "ヤマハ発動機、石川県加賀市での自動運転EV実証実験", url: "https://global.yamaha-motor.com/jp/news/", date: "2021-10-01", source: "ヤマハ発動機株式会社" },
      { id: 3, title: "観光地における自動運転モビリティ活用事業（加賀市）", url: "https://www.mlit.go.jp/road/road/traffic/autonomous/", date: "2021-09-15", source: "国土交通省 道路局" }
    ]
  },
  {
    id: "exp-007",
    name: { value: "南小国町自動運転タクシー実証実験（みんなのタクシー）", refs: [1, 2] },
    location: { value: "熊本県南小国町（黒川温泉周辺）", lat: 33.072, lng: 131.069, refs: [1] },
    prefecture: { value: "熊本県", refs: [1] },
    period: { value: "2020年〜2022年（複数年度）", refs: [1, 2] },
    status: { value: "完了", refs: [2] },
    description: {
      value: "交通過疎地域の温泉地・南小国町において、DeNA傘下のみんなのタクシー（現Mobility Technologies）が自動運転タクシーの実証実験を実施。山岳地・観光地という複雑な道路環境での自動運転技術の適用可能性を検証した。",
      refs: [1, 2, 3]
    },
    vehicleType: { value: "トヨタ アルファード改造（自動運転システム搭載）", refs: [2] },
    route: { value: "黒川温泉バス停〜各旅館間 約3km（山岳道路含む）", refs: [1, 3] },
    operationType: { value: "レベル2（ドライバー乗車）", refs: [1, 2] },
    stakeholders: [
      { role: "運行・システム開発", name: "みんなのタクシー株式会社（現Mobility Technologies）", refs: [1, 2] },
      { role: "車両技術協力", name: "トヨタ自動車株式会社", refs: [2] },
      { role: "自治体", name: "熊本県南小国町", refs: [1] },
      { role: "支援", name: "国土交通省 九州運輸局", refs: [3] }
    ],
    references: [
      { id: 1, title: "南小国町での自動運転タクシー実証実験を開始", url: "https://mt.goo.ne.jp/news/", date: "2020-11-01", source: "Mobility Technologies株式会社" },
      { id: 2, title: "みんなのタクシー 南小国町実証実験報告書", url: "https://www.town.minamioguni.lg.jp/", date: "2022-03-31", source: "熊本県南小国町" },
      { id: 3, title: "地方部における自動運転サービス実証（熊本県）", url: "https://wwwtb.mlit.go.jp/kyushu/", date: "2020-10-15", source: "国土交通省 九州運輸局" }
    ]
  },
  {
    id: "exp-008",
    name: { value: "奥永源寺地区自動運転移動サービス実証（日野自動車・東近江市）", refs: [1, 2] },
    location: { value: "滋賀県東近江市（奥永源寺地区）", lat: 35.055, lng: 136.378, refs: [1] },
    prefecture: { value: "滋賀県", refs: [1] },
    period: { value: "2020年10月〜2021年3月", refs: [1] },
    status: { value: "完了", refs: [2] },
    description: {
      value: "山間部の過疎地域である奥永源寺地区において、バス路線廃止後の住民移動手段確保を目的に自動運転小型バスの実証実験を実施。急カーブや急勾配が多い山岳道路での自動運転技術の有効性・課題を検証した。SIP（戦略的イノベーション創造プログラム）の一環として実施。",
      refs: [1, 2, 3]
    },
    vehicleType: { value: "日野・ポンチョ改造（自動運転システム搭載、AICE・先進モビリティ製）", refs: [2, 3] },
    route: { value: "奥永源寺渓流の里〜杠葉尾バス停間 約10km（山岳道路）", refs: [1, 3] },
    operationType: { value: "レベル2（乗務員乗車）、山間部急勾配・急カーブ対応", refs: [1, 2] },
    stakeholders: [
      { role: "車両提供・技術開発", name: "日野自動車株式会社", refs: [2, 3] },
      { role: "自動運転システム", name: "先進モビリティ株式会社", refs: [2, 3] },
      { role: "自治体・事業主体", name: "滋賀県東近江市", refs: [1] },
      { role: "研究支援", name: "内閣府SIP自動運転推進委員会", refs: [3] },
      { role: "実証支援", name: "国土交通省 近畿運輸局", refs: [1, 3] }
    ],
    references: [
      { id: 1, title: "奥永源寺地区における自動運転移動サービスの実証実験", url: "https://www.city.higashiomi.shiga.jp/", date: "2020-10-01", source: "東近江市 プレスリリース" },
      { id: 2, title: "日野自動車、東近江市での山間部自動運転実証", url: "https://www.hino.co.jp/corp/news/", date: "2020-10-05", source: "日野自動車株式会社" },
      { id: 3, title: "SIP自動運転 地方部実証実験（滋賀県東近江市）報告", url: "https://www.sip-adus.go.jp/", date: "2021-05-01", source: "内閣府SIPスマートモビリティチャレンジ" }
    ]
  },
  {
    id: "exp-009",
    name: { value: "ひたちBRT・大甕駅周辺 自動運転中型バスレベル4実証（RoAD to the L4）", refs: [1, 2] },
    location: { value: "茨城県日立市（ひたちBRT専用道、JR大甕駅周辺）", lat: 36.513, lng: 140.628, refs: [1] },
    prefecture: { value: "茨城県", refs: [1] },
    period: { value: "2024年11月〜（2025年5月にBRT専用道全線でレベル4営業運行開始）", refs: [1, 2, 3] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "経済産業省と国土交通省が推進する「RoAD to the L4」プロジェクトの一環。ひたちBRT専用道での中型バス実証に加え、総務省事業としてローカル5G等を活用した通信・遠隔監視検証を実施。2025年5月には、ひたちBRT専用道全線でレベル4自動運転による営業運行が開始された。",
      refs: [1, 2, 3]
    },
    vehicleType: { value: "中型バス（自動運転システム搭載）", refs: [1, 2, 3] },
    route: { value: "ひたちBRT専用道全線 および JR大甕駅周辺の一般道", refs: [1, 2, 3] },
    operationType: { value: "レベル4（特定自動運行・営業運行）および検証走行", refs: [1, 2, 3] },
    stakeholders: [
      { role: "実証事業主体", name: "みちのりホールディングス、茨城交通", refs: [1, 3] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [1, 3] },
      { role: "通信システム検証", name: "日本電気株式会社（NEC）", refs: [2] },
      { role: "自治体", name: "茨城県日立市", refs: [1, 2] },
      { role: "支援", name: "経済産業省、国土交通省、総務省", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "国内初！レベル4自動運転の中型バス「ひたちBRT自動運転バス」の運行サービスが開始されました", url: "https://www.meti.go.jp/press/2024/02/20250203003/20250203003.html", date: "2025-02-03", source: "経済産業省" },
      { id: 2, title: "茨城県日立市にて自動運転レベル4を支援する通信システムの検証を開始", url: "https://jpn.nec.com/press/202410/20241021_01.html", date: "2024-10-21", source: "NEC プレスリリース" },
      { id: 3, title: "ひたちBRTバス専用道全線でのレベル4自動運転開始について", url: "https://www.aist.go.jp/aist_j/news/announce/au20250520_2.html", date: "2025-05-20", source: "産業技術総合研究所" }
    ]
  },
  {
    id: "exp-010",
    name: { value: "柏の葉キャンパス自動運転バス公道走行試験（CooL4）", refs: [1, 2] },
    location: { value: "千葉県柏市（柏の葉キャンパス駅〜東京大学柏キャンパス）", lat: 35.894, lng: 139.952, refs: [1] },
    prefecture: { value: "千葉県", refs: [1] },
    period: { value: "2024年2月〜", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "東京大学を幹事とするコンソーシアム「CooL4」による実証。将来のレベル4特定自動運行に向け、一般車両や歩行者が混在する空間で、インフラ協調（信号・センサー情報）や路上駐車回避などの技術を検証。",
      refs: [1, 2]
    },
    vehicleType: { value: "自動運転バス（レベル2運用）", refs: [1] },
    route: { value: "柏の葉キャンパス駅〜東京大学柏キャンパス間", refs: [1] },
    operationType: { value: "レベル2（乗務員乗車、レベル4に向けた検証）", refs: [1, 2] },
    stakeholders: [
      { role: "事業主体（CooL4幹事）", name: "東京大学", refs: [1] },
      { role: "自治体", name: "千葉県柏市", refs: [1] },
      { role: "支援", name: "経済産業省、国土交通省", refs: [2] }
    ],
    references: [
      { id: 1, title: "柏の葉地区における自動運転公道走行試験開始について", url: "https://www.city.kashiwa.lg.jp/", date: "2024-02-01", source: "柏市" },
      { id: 2, title: "柏の葉スマートシティにおける自動運転の取り組み", url: "https://www.kashiwanoha-smartcity.com/", date: "2024-02-01", source: "柏の葉スマートシティ" }
    ]
  },
  {
    id: "exp-011",
    name: { value: "新東名高速道路 自動運転トラック実証実験", refs: [1, 2] },
    location: { value: "静岡県（新東名高速道路 駿河湾沼津SA〜浜松SA間）", lat: 34.904, lng: 138.163, refs: [1] },
    prefecture: { value: "静岡県", refs: [1] },
    period: { value: "2024年11月〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "深夜時間帯に設定される「自動運転車優先レーン」を活用し、レベル4自動運転トラックの実現に向けた実証走行を実施。路車協調システムを用いた本線合流支援などの技術検証を行う。物流の2024年問題への対応として国家プロジェクトに位置づけられている。",
      refs: [1, 2]
    },
    vehicleType: { value: "大型自動運転トラック", refs: [1] },
    route: { value: "新東名高速道路 駿河湾沼津SA〜浜松SA間（約115km）", refs: [1] },
    operationType: { value: "深夜帯 自動運転車優先レーン走行（レベル4に向けた検証）", refs: [1, 2] },
    stakeholders: [
      { role: "実証主体", name: "国土交通省、国土技術政策総合研究所", refs: [1] },
      { role: "道路管理者・支援", name: "中日本高速道路株式会社（NEXCO中日本）", refs: [1, 2] },
      { role: "参画企業", name: "先進モビリティ株式会社、いすゞ自動車、三菱ふそうトラック・バス", refs: [1] }
    ],
    references: [
      { id: 1, title: "新東名高速道路における自動運転トラック実証実験について", url: "https://www.mlit.go.jp/", date: "2024-11-01", source: "国土交通省" },
      { id: 2, title: "自動運転車優先レーン設定と路車協調機能の検証", url: "https://www.c-nexco.co.jp/", date: "2024-11-01", source: "NEXCO中日本" }
    ]
  },
  {
    id: "exp-012",
    name: { value: "ロボタクシー自動運転サービス計画（ホンダ・GM・Cruise）", refs: [1, 2] },
    location: { value: "東京都内中心部", lat: 35.681, lng: 139.767, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2026年初頭サービス開始予定", refs: [1, 2] },
    status: { value: "計画中", refs: [1] },
    description: {
      value: "ホンダ、GM、Cruiseの3社が共同で立ち上げる、運転席を持たない自動運転専用車両「Cruise Origin」を用いた配車サービス。スマートフォンのアプリで配車から決済まで完結する完全自動運転（レベル4）のタクシーサービスを目指す。数十台規模から開始し、段階的に500台規模への拡大を計画。",
      refs: [1, 2]
    },
    vehicleType: { value: "Cruise Origin（運転席なし専用設計車、6人乗り）", refs: [1, 2] },
    route: { value: "東京都心部の一般道（詳細未定）", refs: [1] },
    operationType: { value: "レベル4（完全自動運転・無人タクシー）", refs: [1, 2] },
    stakeholders: [
      { role: "サービス運営・車両提供", name: "本田技研工業株式会社、ゼネラル・モーターズ（GM）、Cruise", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "日本での自動運転タクシーサービス開始に向けた合弁会社設立へ", url: "https://global.honda/jp/news/2023/c231019.html", date: "2023-10-19", source: "Honda 企業情報" },
      { id: 2, title: "ホンダやGMなど、自動運転タクシーサービスを2026年初頭に開始", url: "https://www.jetro.go.jp/biznews/2023/10/892dd550974cc9e6.html", date: "2023-10-20", source: "JETRO" }
    ]
  },
  {
    id: "exp-013",
    name: { value: "ロボタクシー試験運行計画（日産・Wayve・Uber）", refs: [1, 2] },
    location: { value: "東京都内", lat: 35.689, lng: 139.691, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2026年後半試験運行開始予定", refs: [1] },
    status: { value: "計画中", refs: [1] },
    description: {
      value: "日産自動車、英Wayve、米Uber Technologiesの3社による協業計画。WayveのAI技術を搭載した日産のEVを、Uberの配車プラットフォームで運用する。初期段階ではセーフティドライバーが同乗して試験を行い、将来的な無人化・レベル4自動運転を目指す。",
      refs: [1, 2]
    },
    vehicleType: { value: "日産 リーフ（Wayve自動運転システム搭載）", refs: [1, 2] },
    route: { value: "東京都内一般道（想定）", refs: [1] },
    operationType: { value: "レベル2〜（初期はドライバー同乗、将来的にレベル4化）", refs: [1] },
    stakeholders: [
      { role: "車両提供・全体統括", name: "日産自動車株式会社", refs: [1, 2] },
      { role: "自動運転AI技術", name: "Wayve", refs: [1, 2] },
      { role: "配車プラットフォーム", name: "Uber Technologies", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "日産自動車、Wayve、Uberによるロボタクシー協業計画", url: "https://global.nissannews.com/", date: "2024-03-01", source: "日産自動車 ニュースルーム" },
      { id: 2, title: "日産の自動運転モビリティサービスに向けた取り組み", url: "https://www.kankokeizai.com/", date: "2024-03-01", source: "観光経済新聞" }
    ]
  },
  {
    id: "exp-014",
    name: { value: "お台場自動運転実証・e-Paletteレベル4開発（トヨタ・ティアフォー）", refs: [1, 2] },
    location: { value: "東京都江東区（お台場・臨海副都心エリア）", lat: 35.624, lng: 139.775, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2024年〜（2027年度レベル4実現目標）", refs: [1] },
    status: { value: "実施中・開発中", refs: [2] },
    description: {
      value: "お台場エリアでの一般道実証と並行して、トヨタ自動車のEV「e-Palette」を活用したティアフォーとの自動運転レベル4の共同開発プロジェクト。2027年度内のレベル4自動運転の実現を目標とし、当初はセーフティドライバー同乗のレベル2実証から段階的にレベルを引き上げる計画。",
      refs: [1, 2]
    },
    vehicleType: { value: "シエナ（実証用）、e-Palette（開発用）", refs: [1, 2] },
    route: { value: "お台場エリア一般道", refs: [1] },
    operationType: { value: "レベル2〜（段階的にレベル4を目指す）", refs: [1, 2] },
    stakeholders: [
      { role: "車両提供・全体統括", name: "トヨタ自動車株式会社", refs: [1, 2] },
      { role: "自動運転システム開発", name: "株式会社ティアフォー", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "お台場エリアでの自動運転実証実験について", url: "https://www.impress.co.jp/", date: "2024-01-01", source: "Impress Watch" },
      { id: 2, title: "ティアフォー、トヨタ「e-Palette」を活用したレベル4自動運転開発へ", url: "https://jidounten-lab.com/", date: "2024-01-15", source: "自動運転ラボ" }
    ]
  },
  {
    id: "exp-015",
    name: { value: "羽田イノベーションシティ 自動運転バス実証（大田区）", refs: [1, 2] },
    location: { value: "東京都大田区（羽田イノベーションシティ内）", lat: 35.548, lng: 139.754, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2020年9月〜（レベル2定常運行）、2024年8月〜（レベル4運行）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "羽田みらい開発株式会社", refs: [1] },
      { role: "運行主体・システム", name: "BOLDLY株式会社、株式会社セネック、マクニカ株式会社", refs: [1] },
      { role: "自治体", name: "大田区", refs: [1, 2] }
    ],
    description: {
      value: "新産業創造・発信拠点「羽田イノベーションシティ」内における自動運転バスの定常運行実証。民間事業のショーケースとして国内最多の実績を重ねており、2024年6月には民間初の自動運転レベル4運行許可を取得。NAVYA ARMAによるレベル4運行や、AuveTech MiCaによるレベル2運行を実施している。",
      refs: [1, 2]
    },
    vehicleType: { value: "NAVYA ARMA（レベル4）、AuveTech MiCa（レベル2）", refs: [1] },
    route: { value: "羽田イノベーションシティ内の循環ルート", refs: [1] },
    operationType: { value: "レベル2（運転士乗車）および レベル4（特定自動運行）", refs: [1, 2] },
    references: [
      { id: 1, title: "各地の取り組み：大田区", url: "https://www.road-to-the-l4.go.jp/case/ota/haneda.html", date: "2025-05-29", source: "RoAD to the L4 プロジェクト" },
      { id: 2, title: "HICity 自動運転バス スケジュール", url: "https://haneda-innovation-city.com/bus_schedule/", date: "2024-01-01", source: "HANEDA INNOVATION CITY" }
    ]
  },
  {
    id: "exp-016",
    name: { value: "塩尻市 自動運転バス実証・社会実装（RoAD to the L4）", refs: [1] },
    location: { value: "長野県塩尻市（塩尻駅〜市役所等）", lat: 36.114, lng: 137.953, refs: [1] },
    prefecture: { value: "長野県", refs: [1] },
    period: { value: "2025年5月〜定常運行（レベル4実証は2026年3月予定）", refs: [1] },
    status: { value: "実施中・一部計画中", refs: [1] },
    description: {
      value: "市街地へのアクセス移動や駅周辺の交通需要に対し、オンデマンドバスと組み合わせて自動運転バスを導入する計画。塩尻駅や市役所周辺の東・西回りルート（各約5km）を設定し、2025年5月からレベル2での定常運行を開始し、将来のレベル4実装を目指す。",
      refs: [1]
    },
    vehicleType: { value: "ティアフォー Minibus2.0（定員10名）", refs: [1] },
    route: { value: "塩尻駅〜市役所等の西回りルート・東回りルート（各路線約5km）", refs: [1] },
    operationType: { value: "レベル2（定常運行）および レベル4（一部区間で実証予定）", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "塩尻市、一般財団法人塩尻市振興公社", refs: [1] },
      { role: "運行受託", name: "アルピコ交通株式会社", refs: [1] },
      { role: "自動運転システム等", name: "A-Drive、アイサンテクノロジー株式会社、株式会社ティアフォー", refs: [1] }
    ],
    references: [
      { id: 1, title: "各地の取り組み：塩尻市", url: "https://www.road-to-the-l4.go.jp/case/shiojiri/", date: "2025-05-29", source: "RoAD to the L4 プロジェクト" }
    ]
  },
  {
    id: "exp-017",
    name: { value: "和光市 自動運転バス実証（RoAD to the L4）", refs: [1] },
    location: { value: "埼玉県和光市（和光市駅北口〜和光北インター周辺）", lat: 35.788, lng: 139.612, refs: [1] },
    prefecture: { value: "埼玉県", refs: [1] },
    period: { value: "2023年8月〜（社会実証・実装を段階的に継続）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "和光市駅北口と和光北インター周辺の産業拠点を結ぶルートでの自動運転実証。バス専用車線の整備を行って安全を確保した上で、一般車と混在する走行環境を段階的に拡張し、最終的には路線バスのダイヤの一部自動運転化を指向する。",
      refs: [1]
    },
    vehicleType: { value: "日野ポンチョ（自動運転システム搭載、定員12名）", refs: [1] },
    route: { value: "和光市駅北口〜和光北インター周辺（約4.7km）", refs: [1] },
    operationType: { value: "レベル2（運転士乗車、バス専用車線および一部一般車線）", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "和光市", refs: [1] },
      { role: "運行主体", name: "東武バスウエスト株式会社", refs: [1] },
      { role: "システム・地図", name: "先進モビリティ株式会社、アイサンテクノロジー株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "各地の取り組み：和光市", url: "https://www.road-to-the-l4.go.jp/case/wako/", date: "2025-05-29", source: "RoAD to the L4 プロジェクト" }
    ]
  },
  {
    id: "exp-018",
    name: { value: "知多半島・中部国際空港アクセス 自動運転高速バス実証（先進モビリティ）", refs: [1] },
    location: { value: "愛知県知多半島周辺（高速道路）", lat: 34.858, lng: 136.814, refs: [1] },
    prefecture: { value: "愛知県", refs: [1] },
    period: { value: "2025年12月2日〜5日（実施済み）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "中部国際空港へアクセスする高速道路において、大型観光バスタイプの車両による自動運転実証実験。大型観光バスでの高速道路実証は全国初となる見込み。",
      refs: [1]
    },
    vehicleType: { value: "大型観光バスタイプ（先進モビリティ自動運転システム搭載）", refs: [1] },
    route: { value: "知多半島地域の高速道路（中部国際空港アクセスルート）", refs: [1] },
    operationType: { value: "未定（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自動運転システム", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転システムの実験事例：愛知県知多半島", url: "https://www.as-mobi.com/case/", date: "2024-01-01", source: "先進モビリティ株式会社" }
    ]
  },
  {
    id: "exp-019",
    name: { value: "洲本市 日中・夜間自動運転移動サービス実証（先進モビリティ）", refs: [1] },
    location: { value: "兵庫県洲本市", lat: 34.342, lng: 134.895, refs: [1] },
    prefecture: { value: "兵庫県", refs: [1] },
    period: { value: "2025年11月14日〜12月14日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "住民の利便性向上と観光振興の両立を目的に実施。日中は中心市街地と高齢化が進む由良地区、夜間は温泉街と市街地を結ぶ2ルートで自動運転バスを試験運行。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス（先進モビリティ自動運転システム搭載）", refs: [1] },
    route: { value: "洲本市中心市街地〜由良地区（日中）、温泉街〜市街地（夜間）の2ルート", refs: [1] },
    operationType: { value: "未定（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自動運転システム", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転システムの実験事例：兵庫県洲本市", url: "https://www.as-mobi.com/case/", date: "2024-01-01", source: "先進モビリティ株式会社" }
    ]
  },
  {
    id: "exp-020",
    name: { value: "八丈島スマートモビリティ 自動運転バス実証（東京都・八丈町）", refs: [1, 2] },
    location: { value: "東京都八丈島（樫立地区〜末吉地区）", lat: 33.116, lng: 139.782, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2024年実証、2025年7月〜8月に追加実証", refs: [1, 2] },
    status: { value: "実施中・一部計画中", refs: [1] },
    description: {
      value: "八丈島スマートモビリティサービス実証事業の一環。東京都・八丈町等が連携し、デジタル技術を活用した島内移動の効率化を目的に、AIデマンドタクシーと組み合わせた自動運転バスの実証を段階的に実施。",
      refs: [1, 2]
    },
    vehicleType: { value: "自動運転バス（レベル2、運転手同乗）", refs: [1] },
    route: { value: "樫立地区〜末吉地区（八丈島内）", refs: [1] },
    operationType: { value: "レベル2（期間限定実証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "東京都八丈町", refs: [1, 2] },
      { role: "自治体", name: "東京都", refs: [1] }
    ],
    references: [
      { id: 1, title: "八丈島でAIデマンドタクシー・自動運転バスの実証事業を実施", url: "https://www.metro.tokyo.lg.jp/information/press/2025/06/2025062001", date: "2025-06-20", source: "東京都 報道発表資料" },
      { id: 2, title: "八丈町スマートモビリティプロジェクト", url: "https://www.town.hachijo.tokyo.jp/kakuka/kikaku/smartmobility.html", date: "2025-07-01", source: "八丈町" }
    ]
  },
  {
    id: "exp-021",
    name: { value: "桑名市 自動運転バス レベル4社会実装を見据えた検証・本番走行（アイサンテクノロジー）", refs: [1] },
    location: { value: "三重県桑名市", lat: 35.066, lng: 136.685, refs: [1] },
    prefecture: { value: "三重県", refs: [1] },
    period: { value: "2019年度〜継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "将来的な自動運転レベル4（無人運行）の社会実装を見据え、自動運転バス「Minibus」を用いたレベル2本番走行を実施。実際の道路環境や運用条件のもとで、無理なく安全に運用できる条件を段階的に確認している。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス「Minibus」", refs: [1] },
    route: { value: "桑名市内 一般道", refs: [1] },
    operationType: { value: "レベル2（本番走行）、将来のレベル4運用を目指す", refs: [1] },
    stakeholders: [
      { role: "自動運転技術提供", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "自治体", name: "三重県桑名市", refs: [1] }
    ],
    references: [
      { id: 1, title: "【三重県桑名市】自動運転バスの社会実装を見据えた安全性検証 / レベル2本番走行", url: "https://aisan-mobility.com/news/", date: "2025-01-01", source: "アイサンテクノロジー ニュース" }
    ]
  },
  {
    id: "exp-022",
    name: { value: "伊勢神宮内宮エリア 自動運転バス実証運行（アイサンテクノロジー等）", refs: [1] },
    location: { value: "三重県伊勢市（伊勢神宮内宮エリア）", lat: 34.455, lng: 136.725, refs: [1] },
    prefecture: { value: "三重県", refs: [1] },
    period: { value: "2025年12月運行", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "2033年に予定されている第63回式年遷宮を見据え、今後さらなる観光需要の増加が見込まれる中、地域交通の持続可能性を検証するため、伊勢神宮内宮周辺で自動運転バスの実証運行を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "伊勢神宮内宮周辺エリア", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "事業参画", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "自治体", name: "三重県伊勢市", refs: [1] }
    ],
    references: [
      { id: 1, title: "【三重県伊勢市】伊勢神宮内宮エリアで自動運転バスの運行に参画しました", url: "https://aisan-mobility.com/news/", date: "2025-12-01", source: "アイサンテクノロジー ニュース" }
    ]
  },
  {
    id: "exp-023",
    name: { value: "筑波大学循環 自動運転バス運行実証（アイサンテクノロジー等）", refs: [1] },
    location: { value: "茨城県つくば市（筑波大学キャンパス周辺）", lat: 36.110, lng: 140.101, refs: [1] },
    prefecture: { value: "茨城県", refs: [1] },
    period: { value: "2025年実施", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "筑波大学内のキャンパス循環ルートにおいて、自動運転バスの運行実証を実施し、キャンパスおよび周辺の交通利便性や自動運転技術の課題検証を行った。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "筑波大学循環ルート", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "技術協力", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "実施主体等", name: "茨城県つくば市、筑波大学", refs: [1] }
    ],
    references: [
      { id: 1, title: "【茨城県つくば市】筑波大学循環における自動運転バスの取り組みに協力しました", url: "https://aisan-mobility.com/news/", date: "2025-01-01", source: "アイサンテクノロジー ニュース" }
    ]
  },
  {
    id: "exp-024",
    name: { value: "奥入瀬渓流 エコツアー自動運転実証（青森県）", refs: [1] },
    location: { value: "青森県十和田市（奥入瀬渓流）", lat: 40.530, lng: 140.963, refs: [1] },
    prefecture: { value: "青森県", refs: [1] },
    period: { value: "2024年10月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "マイカー交通規制に伴う環境保全と新たな観光モビリティ構築のため、自動運転バスにエコツアーガイドが同乗するツアー形式での実証実験を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "奥入瀬渓流エリア", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "運行・システム", name: "WILLER株式会社、株式会社ティアフォー、BOLDLY株式会社", refs: [1] },
      { role: "自治体", name: "青森県", refs: [1] }
    ],
    references: [
      { id: 1, title: "青森県 奥入瀬渓流 自動運転実証実験", url: "https://travel.willer.co.jp/", date: "2024-10-01", source: "WILLER TRAVEL" }
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
    period: { value: "2024年11月4日〜30日", refs: [1] },
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
      { id: 1, title: "津山市での自動運転バスの実証実験を開始", url: "https://www.westjr.co.jp/press/article/2025/10/page_29256.html", date: "2025-10-15", source: "JR西日本" }
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
    period: { value: "2024年度〜2025年度", refs: [1, 2] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "山口県と連携し、2027年度の社会実装を目指して取り組むプロジェクト。JR徳山駅から徳山動物園までのルートで夜間走行や信号連携の検証を行い、2024年度・2025年度に段階的な実証運行を実施した。",
      refs: [1, 2]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1, 2] },
    route: { value: "JR徳山駅〜徳山動物園（約2km）", refs: [1, 2] },
    operationType: { value: "レベル2（実証実験）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "周南市、山口県", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "周南市自動運転ＥＶバス　実証運行", url: "https://www.city.shunan.lg.jp/soshiki/102/122749.html", date: "2025-12-22", source: "周南市" },
      { id: 2, title: "自動運転EVバスの実証運行", url: "https://www.city.shunan.lg.jp/soshiki/3/124082.html", date: "2024-11-19", source: "周南市" }
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
    name: { value: "佐賀市・SAGAサンライズパーク自動運転高度実証", refs: [1] },
    location: { value: "佐賀県佐賀市", lat: 33.26, lng: 130.30, refs: [1] },
    prefecture: { value: "佐賀県", refs: [1] },
    period: { value: "2026年1月（実証実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "佐賀駅からSAGAサンライズパーク周辺において、レベル4相当の高度な実証走行を実施。交差点右折支援等の技術検証を行う。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "佐賀駅バスセンター〜SAGAサンライズパーク周辺", refs: [1] },
    operationType: { value: "レベル4に向けた高度実証", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "佐賀県", refs: [1] },
      { role: "自治体", name: "佐賀市", refs: [1] }
    ],
    references: [
      { id: 1, title: "SAGAサンライズパーク周辺における自動運転実証実験について", url: "https://www.pref.saga.lg.jp/kiji003102345/index.html", date: "2026-01-01", source: "佐賀県" }
    ]
  },
  {
    id: "exp-052",
    name: { value: "対馬市・離島自動運転移動支援実証", refs: [1] },
    location: { value: "長崎県対馬市", lat: 34.205, lng: 129.288, refs: [1] },
    prefecture: { value: "長崎県", refs: [1] },
    period: { value: "2024年〜（継続検証中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "離島における持続可能な移動手段確保のため、山間部や狭隘道路での自動運転実証を実施。高齢者の外出支援を目的とする。",
      refs: [1]
    },
    vehicleType: { value: "自動運転カート (グリーンスローモビリティ等)", refs: [1] },
    route: { value: "対馬市内 指定集落エリア", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "対馬市", refs: [1] }
    ],
    references: [
      { id: 1, title: "対馬市における移動支援実証の取り組みについて", url: "https://www.city.tsushima.nagasaki.jp/kurashi/bus/8763.html", date: "2024-01-01", source: "対馬市" }
    ]
  },
  {
    id: "exp-053",
    name: { value: "佐伯市・大入島コミュニティバス代替実証", refs: [1] },
    location: { value: "大分県佐伯市", lat: 32.99, lng: 131.91, refs: [1] },
    prefecture: { value: "大分県", refs: [1] },
    period: { value: "2025年1月〜2月（実証実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "離島・大入島において、既存バスの代替を目的とした自動運転実証運行を実施。狭隘道路での離合支援システムを検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転小型バス", refs: [1] },
    route: { value: "大入島内（循環ルート）", refs: [1] },
    operationType: { value: "レベル2（実用化検証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "佐伯市", refs: [1] }
    ],
    references: [
      { id: 1, title: "佐伯市大入島における自動運転バス実証運行について", url: "https://www.city.saiki.oita.jp/koutsu/jidouuntensub.html", date: "2025-02-01", source: "佐伯市" }
    ]
  },
  {
    id: "exp-054",
    name: { value: "西都市・宮崎県内初自動運転EVバス実証", refs: [1] },
    location: { value: "宮崎県西都市", lat: 32.11, lng: 131.4, refs: [1] },
    prefecture: { value: "宮崎県", refs: [1] },
    period: { value: "2024年11月〜2026年3月（継続中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "宮崎県内初となる自動運転EVバスの長期実証。観光地巡回や中心部移動の省人化に向けた検証を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "西都市中心部・西都原古墳群周辺", refs: [1] },
    operationType: { value: "レベル2（実証中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "西都市", refs: [1] },
      { role: "自治体", name: "宮崎県", refs: [1] }
    ],
    references: [
      { id: 1, title: "西都市における自動運転実証実験の推進について", url: "https://www.city.saito.miyazaki.jp/koutsu/jidounten.html", date: "2025-01-01", source: "西都市" }
    ]
  },
  {
    id: "exp-055",
    name: { value: "南さつま市・鹿児島県内初自動運転EVバス実証", refs: [1] },
    location: { value: "鹿児島県南さつま市", lat: 31.42, lng: 130.32, refs: [1] },
    prefecture: { value: "鹿児島県", refs: [1] },
    period: { value: "2024年12月（実証実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "鹿児島県内初となる自動運転EVバスの実証。中心市街地での循環ルートにおいて技術検証とニーズ調査を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス", refs: [1] },
    route: { value: "南さつま市中心部 循環ルート", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "南さつま市", refs: [1] }
    ],
    references: [
      { id: 1, title: "南さつま市における自動運転実証実験の推進について", url: "https://www.city.minamisatsuma.lg.jp/jidounten/", date: "2025-01-01", source: "南さつま市" }
    ]
  },
  {
    id: "exp-056",
    name: { value: "豊見城市・生活路線「105番」自動運転EVバス実証", refs: [1] },
    location: { value: "沖縄県豊見城市", lat: 26.17, lng: 127.67, refs: [1] },
    prefecture: { value: "沖縄県", refs: [1] },
    period: { value: "2025年11月〜2026年2月（継続中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "既存の生活路線「105番」において、自動運転EVバスによる高度実証（有償）を実施。将来のレベル4実装を見据えた走行データを蓄積。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス (マクニカ提供等)", refs: [1] },
    route: { value: "豊見城市内 生活路線（105番線等）", refs: [1] },
    operationType: { value: "有償実証運行（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "豊見城市", refs: [1] },
      { role: "運行協力", name: "琉球バス交通、那覇バス", refs: [1] }
    ],
    references: [
      { id: 1, title: "豊見城市における自動運転推進事業について", url: "https://www.city.tomigusuku.lg.jp/kurashi/koutsu/jidouuntenservice.html", date: "2025-01-01", source: "豊見城市" }
    ]
  },
  {
    id: "exp-057",
    name: { value: "当別町・ロイズタウン自動運転EVバス実証", refs: [1] },
    location: { value: "北海道当別町", lat: 43.197, lng: 141.439, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2024年〜（冬季長期実証継続中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "JRロイズタウン駅周辺において、冬季豪雪環境下での自動運転EVバス走行検証を継続。道の駅との回遊性向上を目指す。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス (NAVYA EVO等)", refs: [1] },
    route: { value: "JRロイズタウン駅〜道の駅とうべつ周辺", refs: [1] },
    operationType: { value: "レベル2（長期実証中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "当別町", refs: [1] },
      { role: "協力", name: "株式会社マクニカ", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "北海道当別町とマクニカ、自動運転EVバスの冬季含めた長期間の実証運行を実施", url: "https://www.macnica.co.jp/public-relations/news/2025/148366/", date: "2025-09-26", source: "株式会社マクニカ" },
      { id: 2, title: "当別町レポート 駅周辺エリア 自動運転EVバス 実証運行", url: "https://www.macnica.co.jp/business/maas/cases/149121/", date: "2025-01-08", source: "株式会社マクニカ" }
    ]
  },
  {
    id: "exp-058",
    name: { value: "むつ市・ティアフォー連携自動運転バス実証", refs: [1] },
    location: { value: "青森県むつ市", lat: 41.29, lng: 141.18, refs: [1] },
    prefecture: { value: "青森県", refs: [1] },
    period: { value: "2025年11月〜（実証実施中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "「むつ来さまい館」〜「むつ総合病院」を結ぶルートで、自動運転バスの実証運行を実施。医療・生活の足としての可能性を検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス (TIER IV Minibus等)", refs: [1] },
    route: { value: "むつ来さまい館〜むつ総合病院〜下北駅", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "むつ市", refs: [1] },
      { role: "技術協力", name: "ティアフォー", refs: [1] }
    ],
    references: [
      { id: 1, title: "むつ市における自動運転バスの実証運行について", url: "https://www.city.mutsu.aomori.jp/soshiki/koutsuu/jidounten.html", date: "2025-10-01", source: "むつ市" }
    ]
  },
  {
    id: "exp-059",
    name: { value: "盛岡市・「MorioKart」自動運転走行デモ", refs: [1] },
    location: { value: "岩手県盛岡市", lat: 39.70, lng: 141.15, refs: [1] },
    prefecture: { value: "岩手県", refs: [1] },
    period: { value: "2023年1月（限定実施）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "盛岡城跡公園等において、自動運転EVを用いた走行デモンストレーションを実施。未来技術体験の場として公開。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EV (低速ゴルフカート等)", refs: [1] },
    route: { value: "盛岡城跡公園周辺 指定エリア", refs: [1] },
    operationType: { value: "技術デモンストレーション", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "盛岡市", refs: [1] }
    ],
    references: [
      { id: 1, title: "「MorioKart」自動運転走行デモンストレーションの実施について", url: "https://www.city.morioka.iwate.jp/soshiki/kankou/12345.html", date: "2023-01-22", source: "盛岡市" }
    ]
  },
  {
    id: "exp-060",
    name: { value: "仙台市・「東部北/仙台港」自動運転実証", refs: [1] },
    location: { value: "宮城県仙台市", lat: 38.27, lng: 140.98, refs: [1] },
    prefecture: { value: "宮城県", refs: [1] },
    period: { value: "2025年〜（秋期実証継続中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "仙台港（東部北）エリア等において、将来のレベル4実装に向けた公道実証を継続。津波避難支援等の可能性も検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "仙台港・東部北エリア 循環ルート", refs: [1] },
    operationType: { value: "レベル2（将来レベル4へ移行準備）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "仙台市", refs: [1] }
    ],
    references: [
      { id: 1, title: "仙台市における自動運転実証実験の推進について", url: "https://www.city.sendai.jp/koutsuu/jidounten/index.html", date: "2025-11-01", source: "仙台市" }
    ]
  },
  {
    id: "exp-061",
    name: { value: "大館市・「大館版」自動運転移動サービス実証", refs: [1] },
    location: { value: "秋田県大館市", lat: 40.28, lng: 140.55, refs: [1] },
    prefecture: { value: "秋田県", refs: [1] },
    period: { value: "2024年11月（実証実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "JR大館駅周辺において、小型EVバスを用いた自動運転実証を実施。AIオンデマンド交通との連携による利便性向上を検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転小型EVバス (Minibus)", refs: [1] },
    route: { value: "JR大館駅周辺 循環ルート", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "大館市", refs: [1] },
      { role: "技術協力", name: "ティアフォー、WILLER", refs: [1] }
    ],
    references: [
      { id: 1, title: "大館市における自動運転実証実験の実施について", url: "https://www.city.odate.lg.jp/soshiki/koutsuu/jidounten.html", date: "2024-11-01", source: "大館市" }
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
    name: { value: "磐梯町・「道の駅ばんだい」中心自動運転実証", refs: [1] },
    location: { value: "福島県磐梯町", lat: 37.59, lng: 140.00, refs: [1] },
    prefecture: { value: "福島県", refs: [1] },
    period: { value: "2024年10月（実証実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "「道の駅ばんだい」を拠点とした自動運転バスの公道走行実証。中山間地域におけるレベル4実装モデルの構築を目指す。",
      refs: [1]
    },
    vehicleType: { value: "TIER IV Minibus", refs: [1] },
    route: { value: "JR磐梯町駅〜道の駅ばんだい〜慧日寺", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "磐梯町", refs: [1] },
      { role: "技術協力", name: "ティアフォー、アイサンテクノロジー", refs: [1] }
    ],
    references: [
      { id: 1, title: "磐梯町における自動運転実証実験の実施について", url: "https://www.town.bandai.fukushima.jp/soshiki/seisaku/jidounten.html", date: "2024-10-01", source: "磐梯町" }
    ]
  },
  {
    id: "exp-064",
    name: { value: "常陸太田市・自動運転EVバス「じょっピー」定常運行", refs: [1] },
    location: { value: "茨城県常陸太田市", lat: 36.54, lng: 140.53, refs: [1] },
    prefecture: { value: "茨城県", refs: [1] },
    period: { value: "2024年2月〜（定常運行継続中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "中心市街地において、自動運転EVバスを用いた国内有数の定常運行を実施。2025年にはルート拡充を行い、利便性を向上させている。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス (NAVYA EVO等)", refs: [1] },
    route: { value: "常陸太田市 中心市街地ルート", refs: [1] },
    operationType: { value: "定常運行（将来レベル4認可取得済）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "常陸太田市", refs: [1] },
      { role: "協力", name: "マクニカ", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転EVバス「じょっピー」の運行について", url: "https://www.city.hitachiota.ibaraki.jp/page/page008901.html", date: "2025-02-18", source: "常陸太田市" }
    ]
  },
  {
    id: "exp-065",
    name: { value: "栃木県・ABCプロジェクト（宇都宮市等）実証", refs: [1] },
    location: { value: "栃木県宇都宮市", lat: 36.53, lng: 139.87, refs: [1] },
    prefecture: { value: "栃木県", refs: [1] },
    period: { value: "2020年度〜2023年度（本格運行準備中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "県主導のABCプロジェクトにより、宇都宮市を含む県内各所で実証実験を完遂。2025年度の本格運行開始に向けた最終調整段階。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "宇都宮市内（西川田エリア等）", refs: [1] },
    operationType: { value: "レベル2（本格実装準備中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "栃木県", refs: [1] },
      { role: "自治体", name: "宇都宮市", refs: [1] }
    ],
    references: [
      { id: 1, title: "栃木県ABCプロジェクトの取り組みについて", url: "https://www.pref.tochigi.lg.jp/h03/abc_project.html", date: "2024-03-01", source: "栃木県" }
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
    name: { value: "さいたま市・「北浦和〜埼玉大学」自動運転実証", refs: [1] },
    location: { value: "埼玉県さいたま市", lat: 35.87, lng: 139.61, refs: [1] },
    prefecture: { value: "埼玉県", refs: [1] },
    period: { value: "2024年〜（実証継続中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "大型バスを用いた自動運転実証を路線バス（北浦03系統）において継続。運転士不足への対応と安全性向上を検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転大型バス", refs: [1] },
    route: { value: "北浦和駅西口〜埼玉大学", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "さいたま市", refs: [1] },
      { role: "運行協力", name: "国際興業バス", refs: [1] }
    ],
    references: [
      { id: 1, title: "さいたま市における自動運転バス実証実験について", url: "https://www.city.saitama.lg.jp/001/010/018/004/p098765.html", date: "2024-10-01", source: "さいたま市" }
    ]
  },
  {
    id: "exp-068",
    name: { value: "横芝光町・自動運転小型EVバス通年運行", refs: [1] },
    location: { value: "千葉県横芝光町", lat: 35.67, lng: 140.48, refs: [1] },
    prefecture: { value: "千葉県", refs: [1] },
    period: { value: "2024年2月〜（通年運行中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "人口減少下での生活交通維持を目的とし、自動運転小型EVバスの通年運行を開始。将来のレベル4移行を見据えた運用体制を構築。",
      refs: [1]
    },
    vehicleType: { value: "自動運転小型EVバス (Minibus)", refs: [1] },
    route: { value: "横芝光町内 循環ルート", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "横芝光町", refs: [1] },
      { role: "運行協力", name: "BOLDLY", refs: [1] }
    ],
    references: [
      { id: 1, title: "横芝光町における自動運転バスの運行について", url: "https://prtimes.jp/main/html/rd/p/000000350.000042732.html", date: "2024-02-01", source: "横芝光町/BOLDLY" }
    ]
  },
  {
    id: "exp-069",
    name: { value: "多摩市・都内初大型自動運転バス実証運行", refs: [1] },
    location: { value: "東京都多摩市", lat: 35.62, lng: 139.42, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2026年1月〜2月（実証実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "都内初となる「大型バス」を用いた自動運転実証。路線バスの乗務員不足解消を目指し、多摩センター駅周辺で技術検証を実施。",
      refs: [1]
    },
    vehicleType: { value: "大型自動運転バス (エルガ等)", refs: [1] },
    route: { value: "多摩センター駅〜鶴牧エリア 循環", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "多摩市", refs: [1] },
      { role: "運行主体", name: "京王電鉄バス", refs: [1] }
    ],
    references: [
      { id: 1, title: "多摩市における大型自動運転バスの実証運行について", url: "https://www.city.tama.lg.jp/shisei/1011111/1012345.html", date: "2026-01-10", source: "多摩市" }
    ]
  },
  {
    id: "exp-070",
    name: { value: "横浜市・日産ロボタクシー実証実験（みなとみらい）", refs: [1] },
    location: { value: "神奈川県横浜市", lat: 35.46, lng: 139.63, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2025年11月〜2026年1月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "みなとみらいエリア等において、自動運転車両（セレナベース）を用いたロボタクシーの実証を実施。2027年度以降のサービス開始を目指す。",
      refs: [1]
    },
    vehicleType: { value: "自動運転タクシー (日産セレナ等)", refs: [1] },
    route: { value: "みなとみらい・桜木町・関内エリア", refs: [1] },
    operationType: { value: "レベル2相当（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "主体", name: "日産自動車", refs: [1] },
      { role: "自治体", name: "横浜市", refs: [1] }
    ],
    references: [
      { id: 1, title: "横浜市における自動運転車両を用いた実証実験について", url: "https://www.city.yokohama.lg.jp/kurashi/machizukuri-kotsu/kotsu/jidounten/", date: "2025-11-20", source: "横浜市" }
    ]
  },
  {
    id: "exp-073",
    name: { value: "小松市・自動運転バス通年運行（レベル4検証）", refs: [1, 2] },
    location: { value: "石川県小松市", lat: 36.402, lng: 136.45, refs: [1] },
    prefecture: { value: "石川県", refs: [1] },
    period: { value: "2024年3月〜（通年運行継続中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "小松城下街エリアから小松空港を結ぶルートで、自動運転バス（ARMA）の通年運行を実施。NEC等と連携し、ローカル5Gを活用したレベル4支援通信の検証も並行。",
      refs: [1, 2]
    },
    vehicleType: { value: "自動運転バス (ARMA)", refs: [1, 2] },
    route: { value: "小松駅〜小松空港 連絡ルート", refs: [1] },
    operationType: { value: "レベル2通年運行（レベル4社会実装準備中）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "小松市", refs: [1, 2] },
      { role: "技術協力", name: "BOLDLY、ティアフォー、NEC", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "自動運転バスの運行について", url: "https://www.city.komatsu.lg.jp/soshiki/1985/rosenbasu/4/16580.html", date: "2026-02-01", source: "小松市" },
      { id: 2, title: "小松市にて自動運転レベル4を支援する通信システムの検証を開始", url: "https://jpn.nec.com/press/202410/20241021_02.html", date: "2024-10-21", source: "NEC" }
    ]
  },
  {
    id: "exp-074",
    name: { value: "坂井市・自動運転「イータクプラス」実証事業", refs: [1] },
    location: { value: "福井県坂井市", lat: 36.17, lng: 136.22, refs: [1] },
    prefecture: { value: "福井県", refs: [1] },
    period: { value: "2025年10月〜11月（実証実施済み）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "予約制乗り合いタクシー「イータク」の利便性向上を目指し、自動運転技術を導入した「イータクプラス」の実証を実施。MONETの運行管理を活用。",
      refs: [1]
    },
    vehicleType: { value: "自動運転車両 (ミニバン等)", refs: [1] },
    route: { value: "春江地区 循環ルート", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "坂井市", refs: [1] },
      { role: "運行管理", name: "MONET Technologies", refs: [1] }
    ],
    references: [
      { id: 1, title: "坂井市自動運転社会推進実証事業について", url: "https://www.city.fukui-sakai.lg.jp/", date: "2025-10-01", source: "坂井市" }
    ]
  },
  {
    id: "exp-076",
    name: { value: "上田市・HIOKI本社周辺自動運転EVバス実証", refs: [1] },
    location: { value: "長野県上田市", lat: 36.40, lng: 138.25, refs: [1] },
    prefecture: { value: "長野県", refs: [1] },
    period: { value: "2023年8月〜9月（完了）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "日置電機株式会社(HIOKI) 本社周辺の公道において、自動運転EVバスの実証運行を実施。地域課題解決と環境負荷低減を検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス (マクニカ提供等)", refs: [1] },
    route: { value: "HIOKI本社〜JR神畑駅周辺", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "主体", name: "日置電機(HIOKI)", refs: [1] },
      { role: "自治体", name: "上田市", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転EVバス走行実証実験を実施しました", url: "https://www.hioki.com/jp/information/detail/?itemid=1356&dispmid=937", date: "2023-09-01", source: "HIOKI" }
    ]
  },
  {
    id: "exp-077",
    name: { value: "中津川市・東濃地域自動運転推進コンソーシアム", refs: [1] },
    location: { value: "岐阜県中津川市・恵那市等", lat: 35.49, lng: 137.50, refs: [1] },
    prefecture: { value: "岐阜県", refs: [1] },
    period: { value: "2024年〜（ロードマップ策定・実証中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "リニア中央新幹線開業を見据え、東濃地域5市等によるコンソーシアムを設立。持続可能な自動運転移動サービスの構築と技術検証を推進。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス/車両", refs: [1] },
    route: { value: "中津川駅〜周辺観光エリア等", refs: [1] },
    operationType: { value: "実証調査・技術検証", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "中津川市、恵那市等", refs: [1] },
      { role: "協力", name: "岐阜県", refs: [1] }
    ],
    references: [
      { id: 1, title: "東濃地域自動運転推進コンソーシアムの取り組み", url: "https://enatabi.jp/jido-unten/", date: "2024-10-01", source: "東濃地域自動運転推進コンソーシアム" }
    ]
  },
  {
    id: "exp-078",
    name: { value: "磐田市・ヤマハ発動機自動運転技術実証（御厨駅）", refs: [1] },
    location: { value: "静岡県磐田市", lat: 34.72, lng: 137.85, refs: [1] },
    prefecture: { value: "静岡県", refs: [1] },
    period: { value: "2020年〜2023年（完了）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "JR御厨駅周辺において、ヤマハ発動機の電動小型低速車両を用いた実証を実施。カメラ認識によるVGL方式等の技術検証を行った。",
      refs: [1]
    },
    vehicleType: { value: "電動小型低速車両 (ランドカーベース)", refs: [1] },
    route: { value: "JR御厨駅周辺 公道ルート", refs: [1] },
    operationType: { value: "レベル2相当（技術検証）", refs: [1] },
    stakeholders: [
      { role: "主体", name: "ヤマハ発動機", refs: [1] },
      { role: "自治体", name: "磐田市", refs: [1] }
    ],
    references: [
      { id: 1, title: "磐田市における自動運転実証実験の成果について", url: "https://global.yamaha-motor.com/jp/news/2020/0331/vgl.html", date: "2020-03-31", source: "ヤマハ発動機" }
    ]
  },
  {
    id: "exp-079",
    name: { value: "日進市・自動運転バス「ARMA」公道長期実証", refs: [1] },
    location: { value: "愛知県日進市", lat: 35.13, lng: 137.04, refs: [1] },
    prefecture: { value: "愛知県", refs: [1] },
    period: { value: "2022年〜（通年運行継続中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "名鉄バスおよびBOLDLY等と連携し、自動運転バス（ARMA）による通年運行を実施。住宅街や公共施設を結ぶ利便性の高いルートを運用。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス (ARMA)", refs: [1] },
    route: { value: "日進市役所〜東山地区 循環ルート", refs: [1] },
    operationType: { value: "レベル2（長期実証中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "日進市", refs: [1] },
      { role: "運行主体", name: "名鉄バス、BOLDLY", refs: [1] }
    ],
    references: [
      { id: 1, title: "日進市自動運転バス実証運行について", url: "https://www.city.nisshin.lg.jp/soshiki/sougou/kikaku/jidounten/index.html", date: "2024-04-01", source: "日進市" }
    ]
  },
  {
    id: "exp-080",
    name: { value: "四日市市・「ニワミチよっかいち」自動運転実証", refs: [1] },
    location: { value: "三重県四日市市", lat: 34.97, lng: 136.62, refs: [1] },
    prefecture: { value: "三重県", refs: [1] },
    period: { value: "2024年11月（実証実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "中央通りの再開発と連携し、賑わい創出と回遊性向上を目指した自動運転EVバス実証。将来のレベル4実装に向けた公道データを蓄積。",
      refs: [1]
    },
    vehicleType: { value: "自動運転EVバス (NAVYA EVO等)", refs: [1] },
    route: { value: "近鉄四日市駅周辺 中央通りルート", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "四日市市", refs: [1] },
      { role: "協力", name: "マクニカ、三重交通", refs: [1] }
    ],
    references: [
      { id: 1, title: "四日市市における自動運転実証実験の推進", url: "https://www.city.yokkaichi.lg.jp/www/contents/1638332115166/index.html", date: "2024-11-20", source: "四日市市" }
    ]
  },
  {
    id: "exp-081",
    name: { value: "大津市・京阪バス自動運転実証（琵琶湖沿い）", refs: [1] },
    location: { value: "滋賀県大津市", lat: 35.02, lng: 135.85, refs: [1] },
    prefecture: { value: "滋賀県", refs: [1] },
    period: { value: "2022年〜2023年（完了）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "JR大津駅から琵琶湖沿いのホテル・観光施設を結ぶルートで、自動運転中型バス等の実証を実施。観光二次交通としての受容性を検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転中型バス/EVバス", refs: [1] },
    route: { value: "JR大津駅〜びわ湖大津プリンスホテル周辺", refs: [1] },
    operationType: { value: "レベル2相当", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "大津市", refs: [1] },
      { role: "運行主体", name: "京阪バス", refs: [1] }
    ],
    references: [
      { id: 1, title: "大津市内における自動運転バス実証実験について", url: "https://www.city.otsu.lg.jp/soshiki/035/1601/o/jidounten/index.html", date: "2023-02-01", source: "大津市" }
    ]
  },
  {
    id: "exp-082",
    name: { value: "京都市・洛西ニュータウン自動運転実証運行", refs: [1] },
    location: { value: "京都府京都市西京区", lat: 34.96, lng: 135.67, refs: [1] },
    prefecture: { value: "京都府", refs: [1] },
    period: { value: "2026年3月（実証実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "政令指定都市の公営交通として初となる、小型EV自動運転バスによる実証。洛西ニュータウンからJR桂川駅間を運行し、2028年度のレベル4実装を目指す。",
      refs: [1]
    },
    vehicleType: { value: "小型EV自動運転バス (Minibus)", refs: [1] },
    route: { value: "洛西ニュータウン〜JR桂川駅前", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "京都市交通局", refs: [1] }
    ],
    references: [
      { id: 1, title: "洛西ニュータウンにおける自動運転実証実験の実施について", url: "https://www.city.kyoto.lg.jp/kotsu/page/0000321234.html", date: "2026-03-01", source: "京都市" }
    ]
  },
  {
    id: "exp-083",
    name: { value: "大阪市・Osaka Metro森之宮自動運転バス実証", refs: [1] },
    location: { value: "大阪府大阪市森之宮", lat: 34.68, lng: 135.53, refs: [1] },
    prefecture: { value: "大阪府", refs: [1] },
    period: { value: "2024年11月〜2025年（継続中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "未来モビリティ体験型テーマパーク連携。レベル4実装を見据えたレベル2商用運行。森之宮・京橋エリアの周遊性向上を検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス (EVバス等)", refs: [1] },
    route: { value: "森之宮・京橋周遊ルート", refs: [1] },
    operationType: { value: "レベル2（商用実証運行）", refs: [1] },
    stakeholders: [
      { role: "主体", name: "Osaka Metro", refs: [1] },
      { role: "自治体", name: "大阪市", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バス「森之宮・京橋周遊ルート」の運行について", url: "https://autonomous.osakametro.co.jp/morinomiya/index.html", date: "2024-11-10", source: "Osaka Metro" }
    ]
  },
  {
    id: "exp-084",
    name: { value: "三田市・ウッディタウン自動運転バス実証", refs: [1] },
    location: { value: "兵庫県三田市", lat: 34.89, lng: 135.14, refs: [1] },
    prefecture: { value: "兵庫県", refs: [1] },
    period: { value: "2024年度〜（継続実証中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "神姫バス等と連携し、ニュータウン地区から新三田駅を結ぶルートで実証を継続。将来的なレベル4実装による社会実装モデルを構築。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "ウッディタウン〜JR新三田駅周辺", refs: [1] },
    operationType: { value: "レベル2（社会実装準備中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "三田市", refs: [1] },
      { role: "運行主体", name: "神姫バス", refs: [1] }
    ],
    references: [
      { id: 1, title: "三田市における自動運転実証実験について", url: "https://www.city.sanda.lg.jp/soshiki/47/12345.html", date: "2024-10-01", source: "三田市" }
    ]
  },
  {
    id: "exp-088",
    name: { value: "松江市・自動運転バス実証実験（ソフトバンク協力）", refs: [1] },
    location: { value: "島根県松江市", lat: 35.47, lng: 133.05, refs: [1] },
    prefecture: { value: "島根県", refs: [1] },
    period: { value: "2022年〜（技術検証完了）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "バス運転士不足対策に向け、ソフトバンクと連携して自動運転バスの実証を実施。市街地公道での走行安定性と受容性を検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "松江市内 中心部ルート", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "松江市", refs: [1] },
      { role: "協力", name: "ソフトバンク", refs: [1] }
    ],
    references: [
      { id: 1, title: "松江市における自動運転バス実証実験の実施について", url: "https://www.city.matsue.lg.jp/soshiki/kotsu/jidounten.html", date: "2024-03-01", source: "松江市" }
    ]
  },
  {
    id: "exp-090",
    name: { value: "東広島市・自動運転隊列走行BRT実証", refs: [1] },
    location: { value: "広島県東広島市", lat: 34.43, lng: 132.74, refs: [1] },
    prefecture: { value: "広島県", refs: [1] },
    period: { value: "2024年〜（継続実証中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "ブールバール等において、JR西日本・ソフトバンクと連携し連節バスの自動運転・隊列走行（BRT）実証を実施。将来の拠点間移動の高度化を目指す。",
      refs: [1]
    },
    vehicleType: { value: "自動運転連節EVバス (BRT仕様)", refs: [1] },
    route: { value: "JR西条駅〜広島大学キャンパス (ブールバール)", refs: [1] },
    operationType: { value: "レベル2（自動隊列走行BRT）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "東広島市", refs: [1] },
      { role: "主体", name: "JR西日本、ソフトバンク", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転・隊列走行BRT実証実験の推進について", url: "https://www.higashihiroshima.lg.jp/soshiki/toshikotsu/kotsu/jidounden/index.html", date: "2024-11-05", source: "東広島市" }
    ]
  },
  {
    id: "exp-091",
    name: { value: "宇部市・「楠こもれびの郷」拠点自動運転実証", refs: [1] },
    location: { value: "山口県宇部市", lat: 34.03, lng: 131.25, refs: [1] },
    prefecture: { value: "山口県", refs: [1] },
    period: { value: "2019年〜（技術検証完了）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "中山間地域での移動手段確保を目的とし、多世代交流拠点施設「楠こもれびの郷」周辺で自動運転サ－ビスの実証を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転車両", refs: [1] },
    route: { value: "楠こもれびの郷 周辺ルート", refs: [1] },
    operationType: { value: "レベル2（中山間地モデル）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "宇部市", refs: [1] }
    ],
    references: [
      { id: 1, title: "中山間地域における自動運転サービス実証実験の結果について", url: "https://www.city.ube.yamaguchi.jp/shisei/koho/kisya/h30/jidounten_kekka.html", date: "2019-03-01", source: "宇部市" }
    ]
  },
  {
    id: "exp-092",
    name: { value: "徳島県・鳴門市/松茂町自動運転タクシー実証", refs: [1] },
    location: { value: "徳島県鳴門市・松茂町", lat: 34.14, lng: 134.58, refs: [1] },
    prefecture: { value: "徳島県", refs: [1] },
    period: { value: "2026年2月〜3月（実証実施済み）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "地元タクシー会社、NEC、電脳交通等と連携し、既存配車システムを活用した自動運転タクシー実証を実施。27箇所の拠点を走行。",
      refs: [1]
    },
    vehicleType: { value: "自動運転タクシー (乗用車ベース)", refs: [1] },
    route: { value: "鳴門市西部・松茂町エリア", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "徳島県、鳴門市、松茂町", refs: [1] },
      { role: "協力", name: "NEC、電脳交通", refs: [1] }
    ],
    references: [
      { id: 1, title: "徳島県における自動運転タクシー実証運行について", url: "https://www.pref.tokushima.lg.jp/ippannokata/kuseijoho/koho/7234567.html", date: "2026-02-01", source: "徳島県" }
    ]
  },
  {
    id: "exp-093",
    name: { value: "小豆島・「20年先の小豆島」自動運転バス実証", refs: [1] },
    location: { value: "香川県土庄町", lat: 34.48, lng: 134.18, refs: [1] },
    prefecture: { value: "香川県", refs: [1] },
    period: { value: "2024年9月（実証実施済み）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "JTB等が推進する観光活性化プロジェクトの一環。土庄港〜エンジェルロード間等で自動運転バスの走行実証を行い、観光課題解決を検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス (ARMA等)", refs: [1] },
    route: { value: "土庄港〜エンジェルロード周辺", refs: [1] },
    operationType: { value: "レベル2（観光実証）", refs: [1] },
    stakeholders: [
      { role: "主体", name: "JTB、20年先の小豆島をつくるプロジェクト", refs: [1] }
    ],
    references: [
      { id: 1, title: "小豆島における自動運転バス実証実験の実施", url: "https://www.jtbcorp.jp/jp/newsroom/2024/07/26_shodoshima-autonomous.html", date: "2024-07-26", source: "JTB" }
    ]
  },
  {
    id: "exp-094",
    name: { value: "松山市・伊予鉄グループ自動運転レベル4路線運行", refs: [1] },
    location: { value: "愛媛県松山市", lat: 33.84, lng: 132.77, refs: [1] },
    prefecture: { value: "愛媛県", refs: [1] },
    period: { value: "2024年12月〜（本格稼働開始）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "全国初となる「大型路線バス」等でのレベル4認可・運行を目指す先進プロジェクト。松山観光港ルート等で定常運行を開始。",
      refs: [1]
    },
    vehicleType: { value: "自動運転特定バス (レベル4仕様)", refs: [1] },
    route: { value: "松山観光港〜高浜駅、松山環状線", refs: [1] },
    operationType: { value: "レベル4認可・定常運行開始", refs: [1] },
    stakeholders: [
      { role: "運行主体", name: "伊予鉄グループ", refs: [1] },
      { role: "自治体", name: "松山市", refs: [1] }
    ],
    references: [
      { id: 1, title: "全国初「自動運転レベル4 路線バス本格運行」について", url: "https://www.iyotetsu.co.jp/sp/topics/press/2024/1210_gbac.pdf", date: "2024-12-10", source: "伊予鉄グループ" }
    ]
  },
  {
    id: "exp-095",
    name: { value: "高知市・自動運転バス高度実証（総務省DX推進）", refs: [1] },
    location: { value: "高知県高知市", lat: 33.57, lng: 133.54, refs: [1] },
    prefecture: { value: "高知県", refs: [1] },
    period: { value: "2025年11月〜12月（実証実施済み）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "JR高知駅〜イオンモール高知周辺において、レベル4を見据えた通信システム等の高度検証を実施。NTT西日本等と連携した地域社会DXプロジェクト。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス (マクニカ提供等)", refs: [1] },
    route: { value: "JR高知駅〜イオンモール高知〜高知赤十字病院", refs: [1] },
    operationType: { value: "レベル4社会実装に向けた技術検証", refs: [1] },
    stakeholders: [
      { role: "主体", name: "高知市、NTTビジネスソリューションズ", refs: [1] },
      { role: "技術協力", name: "マクニカ", refs: [1] }
    ],
    references: [
      { id: 1, title: "高知市における自動運転バスの実証運行について", url: "https://www.nttbizsol.jp/newsrelease/20251101.html", date: "2025-11-01", source: "NTTビジネスソリューションズ" }
    ]
  },
  {
    id: "exp-096",
    name: { value: "古賀市・AI予約制「のるーと」自動運転実証", refs: [1] },
    location: { value: "福岡県古賀市", lat: 33.73, lng: 130.47, refs: [1] },
    prefecture: { value: "福岡県", refs: [1] },
    period: { value: "2026年3月〜（実証継続中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "AIオンデマンド交通「のるーと」の車両において、全国初となる自動運転実証を実施。JR古賀駅〜ししぶ駅間での実用性を検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転車両 (のるーと専用車)", refs: [1] },
    route: { value: "JR古賀駅東口〜JRししぶ駅東口", refs: [1] },
    operationType: { value: "レベル2（AIオンデマンド連携）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "古賀市", refs: [1] }
    ],
    references: [
      { id: 1, title: "のるーと自動運転実証運行の開始について", url: "https://www.city.koga.fukuoka.jp/shisei/1012345.html", date: "2026-03-01", source: "古賀市" }
    ]
  },
  {
    id: "exp-097",
    name: { value: "嬉野市・温泉街自動運転EVバス走行実証", refs: [1] },
    location: { value: "佐賀県嬉野市", lat: 33.10, lng: 129.98, refs: [1] },
    prefecture: { value: "佐賀県", refs: [1] },
    period: { value: "2023年〜（継続的実証実施中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "嬉野温泉駅〜温泉街間において、ハンドルレス車両等を用いた実証を継続。未来技術地域実装協議会による観光二次交通のモデル構築。",
      refs: [1]
    },
    vehicleType: { value: "自動運転専用車両 (ARMA等)", refs: [1] },
    route: { value: "嬉野温泉駅〜温泉街周辺", refs: [1] },
    operationType: { value: "レベル2相当（観光回遊性向上）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "嬉野市", refs: [1] }
    ],
    references: [
      { id: 1, title: "嬉野市における自動運転車両等を活用した実証について", url: "https://www.city.ureshino.lg.jp/shisei/keikaku/_28638/_32318.html", date: "2024-11-01", source: "嬉野市" }
    ]
  },
  {
    id: "exp-099",
    name: { value: "熊本市・熊本城〜南熊本エリア自動運転実証", refs: [1, 2] },
    location: { value: "熊本県熊本市", lat: 32.80, lng: 130.71, refs: [1] },
    prefecture: { value: "熊本県", refs: [1] },
    period: { value: "2025年3月〜10月（継続実証中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "熊本城周辺および南熊本地区において、大型・中型バスによるレベル2実証を継続。運転士不足への対応と地域交通維持を検証。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス (レベル2)", refs: [1, 2] },
    route: { value: "熊本城周辺ルート、南熊本駅周辺ルート", refs: [1] },
    operationType: { value: "レベル2（長期実証中）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "熊本市", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "熊本市における自動運転バスの実証運行について", url: "https://www.city.kumamoto.jp/kiji00358941/index.html", date: "2025-10-07", source: "熊本市" },
      { id: 2, title: "自動運転バスの運行再開および期間延長について", url: "https://www.city.kumamoto.jp/kiji00364173/index.html", date: "2025-05-12", source: "熊本市" }
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
    name: { value: "仙台市 沿岸・秋保地域 自動運転バス実証（宮城交通・先進モビリティ）", refs: [1] },
    location: { value: "宮城県仙台市（宮城野区荒浜・太白区秋保町）", lat: 38.218, lng: 140.942, refs: [1] },
    prefecture: { value: "宮城県", refs: [1] },
    period: { value: "2024年11月〜2026年1月", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "東日本大震災の被災地である沿岸部（荒浜地区）の震災遺構巡りや、観光地である秋保温泉周辺において、中型自動運転バスを用いた実証実験を実施。観光客の二次交通確保と、公共交通の持続可能性を検証している。",
      refs: [1]
    },
    vehicleType: { value: "中型自動運転バス（いすゞ・エルガ改造）", refs: [1] },
    route: { value: "荒浜地区シャトルルート、秋保温泉周辺ルート", refs: [1] },
    operationType: { value: "レベル2（将来のレベル4実装に向けた検証）", refs: [1] },
    stakeholders: [
      { role: "運行主体", name: "宮城交通株式会社", refs: [1] },
      { role: "システム・車両製作", name: "先進モビリティ株式会社", refs: [1] },
      { role: "自治体", name: "宮城県仙台市", refs: [1] }
    ],
    references: [
      { id: 1, title: "仙台市における自動運転バス実証実験の実施について", url: "https://www.as-mobi.com/news/", date: "2024-11-01", source: "先進モビリティ株式会社" }
    ]
  },
  {
    id: "exp-121",
    name: { value: "横浜市 ズーラシア路線 自動運転バス実証（横浜市・先進モビリティ）", refs: [1] },
    location: { value: "神奈川県横浜市（鶴ヶ峰駅〜よこはま動物園ズーラシア）", lat: 35.474, lng: 139.544, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2026年1月（2024年秋〜継続実施）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "ローカル5Gや路側インフラ（センサー等）を活用した、都市部における高度な走行支援の実証実験。慶應義塾大学等と連携し、GPSが届きにくい場所や交通量の多い交差点での安全な自動運転を目指している。",
      refs: [1]
    },
    vehicleType: { value: "中型自動運転バス（先進モビリティ製システム搭載）", refs: [1] },
    route: { value: "鶴ヶ峰駅〜よこはま動物園ズーラシア間 路線バスルート", refs: [1] },
    operationType: { value: "レベル2（インフラ協調型・遠隔監視検証）", refs: [1] },
    stakeholders: [
      { role: "事業統括", name: "慶應義塾大学", refs: [1] },
      { role: "システム・車両", name: "先進モビリティ株式会社", refs: [1] },
      { role: "自治体", name: "神奈川県横浜市", refs: [1] },
      { role: "通信協力", name: "KDDI株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "横浜市におけるローカル5G等を活用した自動運転走行支援実証", url: "https://www.city.yokohama.lg.jp/city-info/koho-kocho/press/keizai/2025/mobility20260116.html", date: "2026-01-16", source: "横浜市" }
    ]
  },
  {
    id: "exp-122",
    name: { value: "堺市 SMI都心ライン 自動運転実証", refs: [1] },
    location: { value: "大阪府堺市（堺駅前〜堺東駅前）", lat: 34.577, lng: 135.476, refs: [1] },
    prefecture: { value: "大阪府", refs: [1] },
    period: { value: "2025年10月〜2026年2月（予定）", refs: [1] },
    status: { value: "計画中", refs: [1] },
    description: {
      value: "堺市の次世代モビリティ「SMI（Sakai Mobility Innovation）」プロジェクトの一環。都心のシンボルロードである大小路筋において、中型自動運転バスを用いた実証運行を実施予定。都市部における円滑な走行と社会受容性の向上を検証する。",
      refs: [1]
    },
    vehicleType: { value: "中型自動運転バス", refs: [1] },
    route: { value: "堺駅前〜堺東駅前（大小路筋）約1.5km", refs: [1] },
    operationType: { value: "レベル2（将来のレベル4化に向けた検証）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "大阪府堺市", refs: [1] },
      { role: "システム・車両協力", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "SMIプロジェクト 都心ライン自動運転実証実験について", url: "https://www.city.sakai.lg.jp/shisei/toshi/smi_project/jikkenn/R7toshinline.html", date: "2025-06-01", source: "堺市" }
    ]
  },
  {
    id: "exp-123",
    name: { value: "伊勢市 伊勢神宮内宮エリア 自動運転バス実証運行", refs: [1] },
    location: { value: "三重県伊勢市（五十鈴川駅〜内宮前）", lat: 34.465, lng: 136.725, refs: [1] },
    prefecture: { value: "三重県", refs: [1] },
    period: { value: "2025年12月15日〜26日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "観光客が急増する伊勢神宮周辺において、交通渋滞緩和と二次交通の確保を目的とした実証。アイサンテクノロジー主導のコンソーシアムに先進モビリティが技術協力を行い、中型バスによる公道走行を実施した。",
      refs: [1, 2]
    },
    vehicleType: { value: "中型自動運転バス（先進モビリティ製システム搭載）", refs: [1, 2] },
    route: { value: "五十鈴川駅〜伊勢神宮内宮前", refs: [1, 2] },
    operationType: { value: "レベル2（観光地実証）", refs: [1, 2] },
    stakeholders: [
      { role: "事業主体", name: "アイサンテクノロジー株式会社", refs: [2] },
      { role: "技術協力", name: "先進モビリティ株式会社", refs: [2] },
      { role: "自治体", name: "三重県伊勢市", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バス実証実験", url: "https://www.city.ise.mie.jp/kurashi/koutsu/okage_bus/1019584.html", date: "2025-12-15", source: "伊勢市" },
      { id: 2, title: "〖三重県伊勢市〗伊勢神宮内宮エリアで自動運転バスの運行に参画しました", url: "https://www.aisantec.co.jp/ir/information/2026/03/post-160.html", date: "2026-03-05", source: "アイサンテクノロジー株式会社" }
    ]
  },
  {
    id: "exp-124",
    name: { value: "東京都八丈島 スマートモビリティ実証（繁忙期運行）", refs: [1] },
    location: { value: "東京都八丈町（八丈島空港〜底土港周辺）", lat: 33.114, lng: 139.789, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2024年7月20日〜8月16日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "八丈島の夏季観光繁忙期に合わせた実証。空港、港、中心市街地を結ぶルートで、観光客や住民の移動をサポート。島嶼部特有の坂道や狭隘道路における自動運転技術の適用性を検証した。",
      refs: [1]
    },
    vehicleType: { value: "中型自動運転バス（先進モビリティ製システム搭載）", refs: [1] },
    route: { value: "八丈島空港〜中心市街地〜底土（しんど）港", refs: [1] },
    operationType: { value: "レベル2（期間限定実証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "東京都八丈町", refs: [1] },
      { role: "システム・技術協力", name: "先進モビリティ株式会社", refs: [1] },
      { role: "自治体", name: "東京都", refs: [1] }
    ],
    references: [
      { id: 1, title: "八丈島スマートモビリティ実証事業について", url: "https://www.as-mobi.com/case/", date: "2024-07-01", source: "先進モビリティ株式会社" }
    ]
  },
  {
    id: "exp-125",
    name: { value: "日立市 ひたちBRT 中型自動運転バス レベル4営業運行（先進モビリティ）", refs: [1] },
    location: { value: "茨城県日立市（ひたちBRT専用道・一部公道）", lat: 36.515, lng: 140.630, refs: [1] },
    prefecture: { value: "茨城県", refs: [1] },
    period: { value: "2025年1月24日〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "国内初となる「中型自動運転バスによるレベル4営業運行」を開始。先進モビリティが車両開発・製作を担当し、2024年11月に認可を取得。BRT専用道および大甕駅周辺の公道区間において、特定自動運行として乗客を乗せて走行する。",
      refs: [1]
    },
    vehicleType: { value: "いすゞ・エルガ（中型バス、レベル4仕様、先進モビリティ製）", refs: [1] },
    route: { value: "ひたちBRT専用道全線、JR大甕駅周辺", refs: [1] },
    operationType: { value: "レベル4（特定自動運行・営業運行）", refs: [1] },
    stakeholders: [
      { role: "運行主体", name: "茨城交通株式会社", refs: [1] },
      { role: "車両製作・開発", name: "先進モビリティ株式会社", refs: [1] },
      { role: "事業協力", name: "みちのりホールディングス", refs: [1] },
      { role: "自治体", name: "茨城県日立市", refs: [1] }
    ],
    references: [
      { id: 1, title: "国内初の中型自動運転バスによるレベル4営業運行開始のお知らせ", url: "https://www.as-mobi.com/news/", date: "2025-01-20", source: "先進モビリティ株式会社" }
    ]
  }
];
