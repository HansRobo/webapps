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
    period: { value: "2024年11月〜（継続中）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "経済産業省と国土交通省が推進する「RoAD to the L4」プロジェクトの一環。ひたちBRT専用道路で運行する中型バスが国内で初めてレベル4の認可を取得。また、総務省の事業としてローカル5Gなどを活用した狭隘道路や交差点での通信・遠隔監視の検証も行われている。",
      refs: [1, 2, 3]
    },
    vehicleType: { value: "中型バス（自動運転システム搭載、ティアフォー製）", refs: [1, 2] },
    route: { value: "ひたちBRT専用道 および JR大甕駅周辺の一般道", refs: [1, 2] },
    operationType: { value: "レベル4（特定自動運行）、レベル2（実証検証）", refs: [1] },
    stakeholders: [
      { role: "実証事業主体", name: "みちのりホールディングス、茨城交通", refs: [2] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [2] },
      { role: "通信システム検証", name: "日本電気株式会社（NEC）", refs: [2] },
      { role: "自治体", name: "茨城県日立市", refs: [1] },
      { role: "支援", name: "経済産業省、国土交通省、総務省", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "日立市における自動運転レベル4認可取得について", url: "https://www.hitachi.lg.jp/", date: "2024-11-26", source: "日立市" },
      { id: 2, title: "総務省事業として日立市における自動運転実証を開始", url: "https://jpn.nec.com/press/", date: "2024-12-01", source: "NEC プレスリリース" },
      { id: 3, title: "自動運転レベル4等先進モビリティサービス研究開発・社会実装プロジェクト", url: "https://www.meti.go.jp/", date: "2024-11-01", source: "経済産業省" }
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
      { role: "参画企業", name: "自動運転トラック開発事業者", refs: [1] }
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
    description: {
      value: "新産業創造・発信拠点「羽田イノベーションシティ」内における自動運転バスの定常運行実証。民間事業のショーケースとして国内最多の実績を重ねており、NAVYA ARMAによるレベル4運行や、AuveTech MiCaによるレベル2運行を実施している。",
      refs: [1, 2]
    },
    vehicleType: { value: "NAVYA ARMA（レベル4）、AuveTech MiCa（レベル2）", refs: [1] },
    route: { value: "羽田イノベーションシティ内の研究開発施設・カンファレンスルーム・公園を結ぶ循環ルート（約0.8〜1km）", refs: [1] },
    operationType: { value: "レベル2（運転士乗車）および レベル4（特定自動運行）", refs: [1, 2] },
    stakeholders: [
      { role: "事業主体", name: "羽田みらい開発株式会社", refs: [1] },
      { role: "運行主体・システム", name: "BOLDLY株式会社、株式会社セネック、マクニカ株式会社", refs: [1] },
      { role: "自治体", name: "大田区", refs: [1, 2] }
    ],
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
    period: { value: "2025年12月予定", refs: [1] },
    status: { value: "計画中", refs: [1] },
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
    period: { value: "2025年11月〜12月予定", refs: [1] },
    status: { value: "計画中", refs: [1] },
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
    name: { value: "八丈島スマートモビリティ 自動運転バス実証（先進モビリティ）", refs: [1] },
    location: { value: "東京都八丈島（八丈島空港〜底土港）", lat: 33.116, lng: 139.782, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2024年7月〜8月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "八丈島スマートモビリティサービス実証事業の一環。夏の繁忙期における空港や港を含む中心市街地の回遊性の向上を目的として、八丈島坂下地域で運行実証を実施。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス（先進モビリティ自動運転システム搭載）", refs: [1] },
    route: { value: "八丈島坂下地域（八丈島空港〜底土港）", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "自動運転システム", name: "先進モビリティ株式会社", refs: [1] },
      { role: "自治体", name: "東京都八丈町", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転システムの実験事例：東京都八丈島", url: "https://www.as-mobi.com/case/", date: "2024-01-01", source: "先進モビリティ株式会社" }
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
    period: { value: "過去実施〜", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "広大な公園内の移動手段確保や震災伝承活動として、パークガイドが同乗し震災遺構を巡る自動運転グリーンスローモビリティの走行実証が行われた。",
      refs: [1]
    },
    vehicleType: { value: "小型EVバス「GSM8」など", refs: [1] },
    route: { value: "高田松原津波復興祈念公園内および周辺市街地", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "陸前高田市", refs: [1] }
    ],
    references: [
      { id: 1, title: "岩手県の実証実験事例", url: "https://jidounten-lab.com/", date: "2023-01-01", source: "自動運転ラボ" }
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
    period: { value: "2024年3月〜2025年4月", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "2025年大阪・関西万博への来場者輸送を見据え、大型EVバスを用いた自動運転実証を実施。GPS信号が届きにくい場所でも走行可能なターゲットラインペイント技術などを活用している。",
      refs: [1, 2]
    },
    vehicleType: { value: "大型EVバス（自動運転システム搭載）", refs: [1] },
    route: { value: "舞洲・夢洲エリア（万博会場周辺）", refs: [1] },
    operationType: { value: "レベル2〜（将来的なレベル4を目指す）", refs: [1] },
    stakeholders: [
      { role: "運行主体", name: "Osaka Metro", refs: [1] },
      { role: "技術協力", name: "日本ペイント（ターゲットラインペイント）", refs: [2] }
    ],
    references: [
      { id: 1, title: "万博に向けた自動運転実証実験の実施について", url: "https://www.osakametro.co.jp/", date: "2024-03-01", source: "Osaka Metro" },
      { id: 2, title: "ターゲットラインペイントを活用した自動運転実証", url: "https://www.nipponpaint-industrial.com/", date: "2024-03-01", source: "日本ペイント・インダストリアルコーティング" }
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
    period: { value: "2024年3月〜（通年運行）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "北陸新幹線小松駅と小松空港を繋ぐルートで、自動運転レベル2による通年運行を開始。2025年3月にはレベル4車両認可を取得し、順次レベル4走行へ移行予定。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "小松駅〜小松空港", refs: [1] },
    operationType: { value: "通年運行（レベル4認可取得済み）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "小松市", refs: [1] },
      { role: "協力企業", name: "BOLDLY株式会社", refs: [1] },
      { role: "協力機関", name: "株式会社ティアフォー", refs: [1] }
    ],
    references: [
      { id: 1, title: "小松市 自動運転バス レベル4認可", url: "https://www.city.komatsu.lg.jp/", date: "2025-03-28", source: "小松市" }
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
    period: { value: "継続中", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "将来の自動運転レベル4（完全自動運転）を見据え、地域の周遊性向上や社会実装に向けた課題抽出を目的として実施。万博に向けた技術検証とも連携。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "森之宮エリア", refs: [1] },
    operationType: { value: "レベル2以上（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "運行主体", name: "Osaka Metro", refs: [1] },
      { role: "自治体", name: "大阪市", refs: [1] }
    ],
    references: [
      { id: 1, title: "森之宮エリアにおける自動運転バス実証実験", url: "https://www.osakametro.co.jp/", date: "2024-01-01", source: "Osaka Metro" }
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
    period: { value: "2025年3月〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "熊本城周辺ルート、および南熊本エリア等の循環ルートにおいて、運転士不足解消等を目指しレベル2自動運転バスの実証実験を実施。2027年本格導入目標。",
      refs: [1]
    },
    vehicleType: { value: "自動運転バス", refs: [1] },
    route: { value: "熊本城周辺、南熊本エリアなど", refs: [1] },
    operationType: { value: "レベル2", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "熊本市", refs: [1] }
    ],
    references: [
      { id: 1, title: "熊本市 自動運転バス実証", url: "https://www.city.kumamoto.jp/", date: "2025-03-01", source: "熊本市" }
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
  }
];
