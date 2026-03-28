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
      { role: "運行管理・事業主体", name: "Boldly株式会社（旧SBドライブ株式会社）", refs: [1, 2] },
      { role: "車両提供", name: "ソフトバンク株式会社（Navya ARMAの日本販売代理）", refs: [2] },
      { role: "車両製造", name: "Navya（フランス）", refs: [2, 3] },
      { role: "自治体・運行依頼", name: "茨城県境町", refs: [1] },
      { role: "事業連携", name: "マクニカ株式会社", refs: [3] }
    ],
    references: [
      { id: 1, title: "境町、全国で初めて自動運転バスを路線バスとして運行開始", url: "https://www.softbank.jp/corp/news/press/sbkk/2020/20201025_01/", date: "2020-10-25", source: "ソフトバンク プレスリリース" },
      { id: 2, title: "Boldly、境町での自動運転バス運行1周年", url: "https://boldly.jp/news/2021/11/", date: "2021-11-25", source: "Boldly株式会社" },
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
      { role: "協力機関", name: "東京都（道路使用許可）", refs: [1] },
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
      { role: "運行管理", name: "Boldly株式会社（旧SBドライブ株式会社）", refs: [1, 2] },
      { role: "自治体・事業主体", name: "北海道上士幌町", refs: [1] },
      { role: "出資・支援", name: "ソフトバンク株式会社", refs: [2] },
      { role: "協力企業", name: "マクニカ株式会社", refs: [2] },
      { role: "実験支援", name: "北海道運輸局", refs: [3] }
    ],
    references: [
      { id: 1, title: "上士幌町で自動運転バスの実証実験を開始", url: "https://boldly.jp/news/2019/10/", date: "2019-10-01", source: "Boldly株式会社" },
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
      { role: "支援", name: "経済産業省、国土交通省（RoAD to the L4）", refs: [2] }
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
  }
];
