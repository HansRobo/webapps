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
      { role: "車両提供", name: "ソフトバンク株式会社", refs: [2] },
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
      { role: "運行主体・システム", name: "Boldly株式会社、株式会社セネック、マクニカ株式会社", refs: [1] },
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
      { role: "運行・システム", name: "WILLER株式会社、株式会社ティアフォー、Boldly株式会社", refs: [1] },
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
  }
];
