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
    vehicle: { value: "NAVYA ARMA", refs: [2, 3] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "境町役場〜イオンタウン境間 約3km、最高速度19km/h", refs: [1, 3] },
    operationType: { value: "レベル2（乗務員乗車）、将来的なレベル4を目指す", refs: [2] },
    stakeholders: [
      { role: "運行管理・事業主体", name: "BOLDLY株式会社", refs: [1, 2] },
      { role: "車両提供", name: "ソフトバンク株式会社", refs: [2] },
      { role: "車両製造", name: "Navya（フランス）", refs: [2, 3] },
      { role: "自治体・運行依頼", name: "境町（茨城県）", refs: [1] },
      { role: "事業連携", name: "マクニカ株式会社", refs: [3] }
    ],
    references: [
      { id: 1, title: "境町、全国で初めて自動運転バスを路線バスとして運行開始", url: "https://www.softbank.jp/corp/news/press/sbkk/2020/20201025_01/", date: "2020-10-25", source: "ソフトバンク プレスリリース" },
      { id: 2, title: "Boldly、境町での自動運転バス運行1周年", url: "https://www.softbank.jp/drive/press/2022/20220208_01/", date: "2022-02-08", source: "BOLDLY / ソフトバンク" },
      { id: 3, title: "国内初の路線バスとして自動運転バスを運行　茨城県境町", url: "https://www.mlit.go.jp/report/press/jidosha04_hh_000099.html", date: "2020-10-26", source: "国土交通省 プレスリリース" }
    ]
  },
  {
    id: "exp-002",
    name: { value: "永平寺町自動運転サービス（ゆっくり号）レベル4認可", refs: [1, 2] },
    location: { value: "福井県永平寺町（永平寺参ろーど）", lat: 36.091, lng: 136.469, refs: [1] },
    prefecture: { value: "福井県", refs: [1] },
    period: { value: "2018年〜（2023年3月にレベル4車両認可、同年5月に特定自動運行サービス開始）", refs: [1, 2, 3] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "廃線跡を活用した専用道路「永平寺参ろーど」での自動運転移動サービス。2023年3月30日に国内初のレベル4車両認可を取得し、同年5月21日から運転者を配置しないレベル4サービスを開始した。",
      refs: [1, 2, 3]
    },
    vehicle: { value: "ヤマハグリーンスローモビリティ", refs: [2] },
    adSystem: { value: "産総研", refs: [] },
    route: { value: "永平寺参ろーど 約2km（専用道）、最高速度12km/h", refs: [1, 2] },
    operationType: { value: "レベル4（特定自動運行、運転者なし）", refs: [1, 3] },
    stakeholders: [
      { role: "自治体・事業主体", name: "永平寺町（福井県）", refs: [1] },
      { role: "申請者", name: "国立研究開発法人 産業技術総合研究所（産総研）", refs: [1] },
      { role: "運行管理", name: "えちぜん鉄道株式会社", refs: [3] },
      { role: "車両ベース提供", name: "ヤマハ発動機株式会社", refs: [2] },
      { role: "支援", name: "国土交通省、経済産業省", refs: [1, 3] }
    ],
    references: [
      { id: 1, title: "国内初！運転者を必要としない自動運転車（レベル４）の認可について", url: "https://www.mlit.go.jp/report/press/jidosha07_hh_000442.html", date: "2023-03-31", source: "国土交通省" },
      { id: 2, title: "国内初の自動運転レベル4車両認可を取得（福井県永平寺町）", url: "https://www.yamaha-motor.co.jp/gsm/topics/eiheiji2.html", date: "2023-03-30", source: "ヤマハ発動機" },
      { id: 3, title: "国内初！運転者を配置しないレベル４での自動運転移動サービスの開始について", url: "https://www.mlit.go.jp/report/press/jidosha07_hh_000448.html", date: "2023-05-12", source: "国土交通省" }
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
    vehicle: { value: "日野レインボー", refs: [2, 3] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "新宿駅西口〜西新宿周辺 約1.5km", refs: [1] },
    operationType: { value: "レベル2（乗務員乗車）", refs: [1, 2] },
    stakeholders: [
      { role: "事業主体・バス事業者", name: "小田急電鉄株式会社", refs: [1, 2] },
      { role: "自動運転システム開発", name: "先進モビリティ株式会社", refs: [2, 3] },
      { role: "協力機関", name: "東京都", refs: [1] },
      { role: "協力機関", name: "一般財団法人 日本自動車研究所（JARI）", refs: [3] }
    ],
    references: [
      { id: 1, title: "【都内初】西新宿でまちのインフラと協調した自動運転移動サービスの実証実験を実施", url: "https://www.aisantec.co.jp/ir/information/2021/12/post-49.html", date: "2021-12-15", source: "アイサンテクノロジー株式会社" },
      { id: 2, title: "先進モビリティ お知らせ", url: "https://www.as-mobi.com/news/?ca=3", date: "2019-09-17", source: "先進モビリティ株式会社" },
      { id: 3, title: "都内初、西新宿でまちのインフラと協調した自動運転移動サービスの実証実験を実施", url: "https://news.kddi.com/kddi/corporate/newsrelease/2021/12/15/5596.html", date: "2021-12-15", source: "KDDI ニュースリリース" }
    ]
  },
  {
    id: "exp-004",
    name: { value: "上士幌町自動運転バス実証（Boldly・NAVYA ARMA）", refs: [1, 2] },
    location: { value: "北海道上士幌町（市街地循環ルート）", lat: 43.213, lng: 143.387, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2019年10月〜（2024年5月にレベル4車両認可、同年10月に特定自動運行許可）", refs: [1, 2, 3] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "過疎・高齢化が進む上士幌町で継続されている自動運転バス事業。NAVYA ARMAを用いた運行を継続しつつ、2024年にレベル4車両認可と特定自動運行許可を取得し、無人運行の実証段階に進んだ。",
      refs: [1, 2, 3]
    },
    vehicle: { value: "NAVYA ARMA", refs: [1, 3] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "上士幌町内の町道（約630m区間を含む）", refs: [1, 2] },
    operationType: { value: "レベル2定常運行＋レベル4実証（特定自動運行）", refs: [1, 2, 3] },
    stakeholders: [
      { role: "運行管理", name: "BOLDLY株式会社", refs: [1, 3] },
      { role: "自治体・事業主体", name: "上士幌町（北海道）", refs: [1] },
      { role: "車両認可", name: "国土交通省 北海道運輸局", refs: [2] },
      { role: "特定自動運行許可", name: "北海道公安委員会", refs: [3] }
    ],
    references: [
      { id: 1, title: "上士幌町における自動運転の取り組み", url: "https://www.kamishihoro.jp/smarttown/smartmobility", date: "2024-10-28", source: "上士幌町" },
      { id: 2, title: "無人自動運転移動サービスに向けて国内6例目となる自動運転車（レベル４）を認可", url: "https://wwwtb.mlit.go.jp/hokkaido/press/20240531_00002.html", date: "2024-05-31", source: "国土交通省 北海道運輸局" },
      { id: 3, title: "特定自動運行に係る許可について（上士幌町）", url: "https://www.police.pref.hokkaido.lg.jp/info/koutuu/universal/kurumaisu_sinsei/automatic-drive-sinsei.html", date: "2024-10-25", source: "北海道警察" }
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
      value: "千葉市・幕張新都心エリアで実施された自動運転タクシーサービスの実証実験。日産の自動運転技術を搭載した車両とDeNAのモビリティサービス基盤を組み合わせ、一般公道での乗客輸送を行った。将来の無人タクシーサービス実現に向けた技術・制度面の課題を検証。",
      refs: [1, 2, 3]
    },
    vehicle: { value: "日産リーフ", refs: [2, 3] },
    adSystem: { value: "日産", refs: [1] },
    route: { value: "幕張メッセ周辺〜アパホテル・IMM Hotel間 約2km", refs: [1] },
    operationType: { value: "レベル2（安全監視員同乗）", refs: [1, 2] },
    stakeholders: [
      { role: "サービス開発・運行管理", name: "株式会社ディー・エヌ・エー（DeNA）", refs: [1, 2] },
      { role: "車両提供・技術協力", name: "日産自動車株式会社", refs: [2, 3] },
      { role: "自治体", name: "千葉市（千葉県）", refs: [1] },
      { role: "支援機関", name: "千葉県", refs: [1, 3] }
    ],
    references: [
      { id: 1, title: "日産自動車とDeNA、無人運転車両を活用した交通サービス「Easy Ride」の実証実験を開始", url: "https://dena.com/jp/news/3566", date: "2018-02-23", source: "DeNA ニュース" },
      { id: 2, title: "日産とDeNAが次世代交通サービス「Easy Ride」の実証実験へ、無人運転車両を活用", url: "https://techcrunchjapan.com/2018/02/23/easy-ride-test/", date: "2018-02-23", source: "TechCrunch Japan" },
      { id: 3, title: "幕張新都心スマートシティプロジェクト 自動運転実証について", url: "https://www.city.chiba.jp/toshi/toshi/smartcity/makuhari_jidounten.html", date: "2018-09-01", source: "千葉市 都市局" }
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
    vehicle: { value: "HAKOBUS", refs: [2, 3] },
    adSystem: { value: "ヤマハ発動機", refs: [] },
    route: { value: "片山津温泉総湯〜各旅館・柴山潟周辺 約1.5km循環", refs: [1, 3] },
    operationType: { value: "レベル2〜3相当（乗務員乗車、限定エリア）", refs: [1, 2] },
    stakeholders: [
      { role: "車両開発・自動運転システム", name: "ヤマハ発動機株式会社", refs: [2, 3] },
      { role: "自治体・事業主体", name: "加賀市（石川県）", refs: [1] },
      { role: "実証支援", name: "国土交通省", refs: [1] },
      { role: "地域連携", name: "片山津温泉旅館組合", refs: [3] }
    ],
    references: [
      { id: 1, title: "加賀市レポ―ト Vol.2 自動運転EVバス 実証実験", url: "https://www.macnica.co.jp/business/maas/cases/149118/", date: "2021-12-09", source: "マクニカ" },
      { id: 2, title: "マクニカ、加賀市にて自動運転レベル４対応車両“EVO”による世界最長の公道走行実証を実施", url: "https://prtimes.jp/main/html/rd/p/000000037.000014021.html", date: "2021-09-15", source: "PR TIMES（株式会社マクニカ）" },
      { id: 3, title: "観光地における自動運転モビリティ活用事業（加賀市）", url: "https://www.mlit.go.jp/road/road/traffic/autonomous/autonomous_kaga.html", date: "2021-09-15", source: "国土交通省 道路局" }
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
    vehicle: { value: "トヨタ アルファード", refs: [2] },
    adSystem: { value: "みんなのタクシー", refs: [] },
    route: { value: "黒川温泉バス停〜各旅館間 約3km（山岳道路含む）", refs: [1, 3] },
    operationType: { value: "レベル2（ドライバー乗車）", refs: [1, 2] },
    stakeholders: [
      { role: "運行・システム開発", name: "みんなのタクシー株式会社（現Mobility Technologies）", refs: [1, 2] },
      { role: "車両技術協力", name: "トヨタ自動車株式会社", refs: [2] },
      { role: "自治体", name: "南小国町（熊本県）", refs: [1] },
      { role: "支援", name: "国土交通省 九州運輸局", refs: [3] }
    ],
    references: [
      { id: 1, title: "南小国町での自動運転タクシー実証実験を開始", url: "https://mo-t.com/news/pressreleases/2020/10/26/minamioguni_trial", date: "2020-11-01", source: "Mobility Technologies株式会社" },
      { id: 2, title: "みんなのタクシー 南小国町実証実験報告書", url: "https://www.town.minamioguni.lg.jp/news/detail.html?id=123", date: "2022-03-31", source: "熊本県南小国町" },
      { id: 3, title: "地方部における自動運転サービス実証（熊本県）", url: "https://wwwtb.mlit.go.jp/kyushu/press/00001_00287.html", date: "2020-10-15", source: "国土交通省 九州運輸局" }
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
    vehicle: { value: "日野ポンチョ", refs: [2, 3] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "奥永源寺渓流の里〜杠葉尾バス停間 約10km（山岳道路）", refs: [1, 3] },
    operationType: { value: "レベル2（乗務員乗車）、山間部急勾配・急カーブ対応", refs: [1, 2] },
    stakeholders: [
      { role: "車両提供・技術開発", name: "日野自動車株式会社", refs: [2, 3] },
      { role: "自動運転システム", name: "先進モビリティ株式会社", refs: [2, 3] },
      { role: "自治体・事業主体", name: "東近江市（滋賀県）", refs: [1] },
      { role: "研究支援", name: "内閣府SIP自動運転推進委員会", refs: [3] },
      { role: "実証支援", name: "国土交通省 近畿運輸局", refs: [1, 3] }
    ],
    references: [
      { id: 1, title: "奥永源寺地区における自動運転移動サービスの実証実験", url: "https://www.city.higashiomi.shiga.jp/0000012224.html", date: "2020-10-01", source: "東近江市 プレスリリース" },
      { id: 2, title: "日野自動車、東近江市での山間部自動運転実証", url: "https://www.hino.co.jp/corp/news/2020/20201005-002715.html", date: "2020-10-05", source: "日野自動車株式会社" },
      { id: 3, title: "SIP自動運転 地方部実証実験（滋賀県東近江市）報告", url: "https://www.sip-adus.go.jp/", date: "2021-05-01", source: "内閣府SIPスマートモビリティチャレンジ" }
    ]
  },
  {
    id: "exp-009",
    name: { value: "日立市 ひたちBRT 中型自動運転バス レベル4営業運行（RoAD to the L4）", refs: [1, 2] },
    location: { value: "茨城県日立市（ひたちBRT専用道、JR大甕駅周辺）", lat: 36.513, lng: 140.628, refs: [1] },
    prefecture: { value: "茨城県", refs: [1] },
    period: { value: "2025年2月3日〜（2025年5月にBRT専用道全線でレベル4営業運行開始）", refs: [1, 2, 3] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "経済産業省・国土交通省のRoAD to the L4テーマ2の一環として、ひたちBRTで中型バスによるレベル4営業運行を実施。2025年2月に営業運行を開始し、同年5月には専用道区間全線でレベル4運行に拡張した。",
      refs: [1, 2, 3]
    },
    vehicle: { value: "いすゞ エルガミオ", refs: [2] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "道の駅日立おさかなセンター〜JR常陸多賀駅（約8.7km、うち専用道約6.1km）", refs: [2] },
    operationType: { value: "レベル4（乗務員乗車型・営業運行）", refs: [1, 2, 3] },
    stakeholders: [
      { role: "運行主体", name: "茨城交通株式会社", refs: [1, 2] },
      { role: "自動運転システム", name: "先進モビリティ株式会社", refs: [2] },
      { role: "事業協力", name: "みちのりホールディングス", refs: [2] },
      { role: "自治体", name: "日立市（茨城県）", refs: [2] },
      { role: "支援", name: "経済産業省、国土交通省", refs: [1] }
    ],
    references: [
      { id: 1, title: "国内初！レベル4自動運転の中型バス「ひたちBRT自動運転バス」の運行サービスが開始されました", url: "https://www.meti.go.jp/press/2024/02/20250203003/20250203003.html", date: "2025-02-03", source: "経済産業省" },
      { id: 2, title: "各地の取り組み：日立市", url: "https://www.road-to-the-l4.go.jp/case/hitachi/index2.html", date: "2025-05-29", source: "RoAD to the L4 プロジェクト" },
      { id: 3, title: "ひたちBRTバス専用道全線でのレベル4自動運転開始について", url: "https://www.aist.go.jp/aist_j/news/announce/au20250520_2.html", date: "2025-05-20", source: "産業技術総合研究所" }
    ]
  },
  {
    id: "exp-010",
    name: { value: "柏の葉キャンパス自動運転バス公道走行試験（CooL4）", refs: [1, 2] },
    location: { value: "千葉県柏市（柏の葉キャンパス駅〜東京大学柏キャンパス）", lat: 35.894, lng: 139.952, refs: [1] },
    prefecture: { value: "千葉県", refs: [1] },
    period: { value: "2019年11月〜（2025年8月にレベル4車両認可、同年11月に特定自動運行許可）", refs: [1, 2, 3] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "東京大学を幹事とするCooL4コンソーシアムによる柏の葉地域での自動運転実証。2025年8月にレベル4車両認可、同年11月に特定自動運行許可を取得し、2026年1月から一部便でレベル4運行を開始した。",
      refs: [1, 2, 3]
    },
    vehicle: { value: "いすゞ エルガミオ", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "東京大学柏キャンパス・シャトルバスルートの一部区間（特定自動運行区間あり）", refs: [1] },
    operationType: { value: "レベル2運行＋レベル4（特定自動運行）", refs: [1, 2, 3] },
    stakeholders: [
      { role: "事業主体（CooL4幹事）", name: "東京大学", refs: [2] },
      { role: "運行主体", name: "東武バスセントラル株式会社", refs: [1] },
      { role: "自動運転システム・車両整備", name: "先進モビリティ株式会社", refs: [1] },
      { role: "車両提供", name: "いすゞ自動車株式会社", refs: [1] },
      { role: "自治体", name: "柏市（千葉県）", refs: [2] },
      { role: "支援", name: "経済産業省、国土交通省", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "柏の葉地域において、特定自動運行（自動運転レベル４）および旅客自動車運送事業の認可を取得しました", url: "https://www.tobu-bus.com/uploads/files/hp_release_2025.12.10.pdf", date: "2025-12-10", source: "東武バス" },
      { id: 2, title: "柏の葉地区における自動運転公道走行試験開始について", url: "https://www.city.kashiwa.lg.jp/koho/pressrelease/r7houdou/12gatsu/r7121004.html", date: "2025-12-10", source: "柏市" },
      { id: 3, title: "東京都市圏の公道で初！ 柏の葉地区で特定自動運行（自動運転レベル4）の運行開始", url: "https://www.as-mobi.com/news/", date: "2026-01-13", source: "先進モビリティ株式会社" }
    ]
  },
  {
    id: "exp-011",
    name: { value: "新東名高速道路 自動運転トラック実証実験（RoAD to the L4 テーマ3）", refs: [1, 2, 4] },
    location: { value: "静岡県（新東名高速道路 駿河湾沼津SA〜浜松SA間）", lat: 34.904, lng: 138.163, refs: [1] },
    prefecture: { value: "静岡県", refs: [1] },
    period: { value: "2024年11月〜2025年12月（総合走行実証）", refs: [1, 3, 4] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "深夜時間帯に設定される「自動運転車優先レーン」を活用し、レベル4自動運転トラックの実現に向けた実証走行を実施。2024年11月の公道実証開始後、2025年3月から優先レーンでの実証に参画し、同年10月には最終年度の総合走行実証を開始した。路車協調システムを用いた本線合流支援などの技術検証を行う。",
      refs: [1, 2, 3, 4]
    },
    vehicle: { value: "いすゞ ギガ", refs: [3] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "新東名高速道路 駿河湾沼津SA〜浜松SA間（約115km）", refs: [1] },
    operationType: { value: "深夜帯 自動運転車優先レーン走行（レベル4に向けた検証）", refs: [1, 2, 3, 4] },
    stakeholders: [
      { role: "実証主体", name: "国土交通省、国土技術政策総合研究所", refs: [1] },
      { role: "道路管理者・支援", name: "中日本高速道路株式会社（NEXCO中日本）", refs: [1, 2] },
      { role: "参画企業", name: "先進モビリティ株式会社、いすゞ自動車株式会社、日野自動車株式会社、三菱ふそうトラック・バス株式会社、UDトラックス株式会社", refs: [1, 4] }
    ],
    references: [
      { id: 1, title: "新東名高速道路における自動運転トラック実証実験について", url: "https://www.mlit.go.jp/report/press/road01_hh_001869.html", date: "2024-11-01", source: "国土交通省" },
      { id: 2, title: "自動運転車優先レーン設定と路車協調機能の検証", url: "https://www.c-nexco.co.jp/corporate/pressroom/news_release/6281.html", date: "2024-11-01", source: "NEXCO中日本" },
      { id: 3, title: "新東名高速道路の自動運転車優先レーンで 自動運転大型トラックの実証実験を開始", url: "https://www.udtrucks.com/japan/news-and-stories/info/20250218/rttl4-shintomei", date: "2025-02-18", source: "UDトラックス" },
      { id: 4, title: "レベル4自動運転トラックの社会実装に向けた実証開始", url: "https://www.udtrucks.com/japan/news-and-stories/news/20251021/road-to-the-l4", date: "2025-10-21", source: "UDトラックス" }
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
    vehicle: { value: "Cruise Origin", refs: [1, 2] },
    adSystem: { value: "Cruise", refs: [] },
    route: { value: "東京都心部の一般道（詳細未定）", refs: [1] },
    operationType: { value: "レベル4（完全自動運転・無人タクシー）", refs: [1, 2] },
    stakeholders: [
      { role: "サービス運営・車両提供", name: "本田技研工業株式会社、ゼネラル・モーターズ（GM）、Cruise", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "日本での自動運転タクシーサービスを2026年初頭に開始予定", url: "https://global.honda/jp/news/2023/c231019a.html", date: "2023-10-19", source: "Honda 企業情報" },
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
    vehicle: { value: "日産リーフ", refs: [1, 2] },
    adSystem: { value: "Wayve", refs: [] },
    route: { value: "東京都内一般道（想定）", refs: [1] },
    operationType: { value: "レベル2〜（初期はドライバー同乗、将来的にレベル4化）", refs: [1] },
    stakeholders: [
      { role: "車両提供・全体統括", name: "日産自動車株式会社", refs: [1, 2] },
      { role: "自動運転AI技術", name: "Wayve", refs: [1, 2] },
      { role: "配車プラットフォーム", name: "Uber Technologies", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "日産自動車、Wayve、Uberによるロボタクシー協業計画", url: "https://global.nissannews.com/ja-JP/releases/130097a8987b7a5840a7f5c53b1b68ce-240301-01-j", date: "2024-03-01", source: "日産自動車 ニュースルーム" },
      { id: 2, title: "日産の自動運転モビリティサービスに向けた取り組み", url: "https://www.kankokeizai.com/nissan-autonomous-driving-2024/", date: "2024-03-01", source: "観光経済新聞" }
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
    vehicle: { value: "e-Palette", refs: [1, 2] },
    adSystem: { value: "ティアフォー", refs: [] },
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
    id: "exp-209",
    name: { value: "お台場・有明・青海 自動運転移動サービス実証（MONET・シエナ）", refs: [1, 2, 3] },
    location: { value: "東京都江東区（有明・台場・青海エリア）", lat: 35.627, lng: 139.779, refs: [1, 2] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2024年度後半〜2025年3月14日（第1期実証）", refs: [1, 2] },
    status: { value: "完了", refs: [2] },
    description: {
      value: "MONET Technologiesが東京臨海副都心（有明・台場・青海地区）の公道で実施した自動運転移動サービス。トヨタのミニバン「シエナ」をベースにした車両2台で、運転の自動化レベル2（運転士同乗）によるオンデマンド運行を行い、社会実装に向けた受容性と運行面を検証した。",
      refs: [1, 2, 3]
    },
    vehicle: { value: "トヨタ シエナ", refs: [1, 3] },
    adSystem: { value: "May Mobility", refs: [1, 2] },
    route: { value: "有明・台場・青海エリア（5停留所）", refs: [2] },
    operationType: { value: "レベル2（運転士同乗）", refs: [1, 2] },
    stakeholders: [
      { role: "運行主体", name: "MONET Technologies株式会社", refs: [1, 2] },
      { role: "車両提供", name: "トヨタ自動車株式会社", refs: [1] },
      { role: "支援事業", name: "東京都", refs: [1] }
    ],
    references: [
      { id: 1, title: "移動課題の解決と地域の価値向上に向けて、東京の有明地区などで自動運転技術を用いた移動サービスを2024年度後半に開始", url: "https://www.monet-technologies.com/news/press/20240828_01", date: "2024-08-28", source: "MONET Technologies" },
      { id: 2, title: "東京臨海副都心での自動運転技術を用いた移動サービスの実証", url: "https://www.monet-technologies.com/tokyo-bay", date: "2024-12-23", source: "MONET Technologies" },
      { id: 3, title: "東京臨海副都心の公道で自動運転活用の移動サービス開始　MONET", url: "https://www.watch.impress.co.jp/docs/news/1619102.html", date: "2024-08-28", source: "Impress Watch" }
    ]
  },
  {
    id: "exp-015",
    name: { value: "羽田イノベーションシティ 自動運転バス実証（大田区）", refs: [1, 2] },
    location: { value: "東京都大田区（羽田イノベーションシティ内）", lat: 35.548, lng: 139.754, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2020年9月〜（2023年10月にレベル4車両認可、2024年8月からレベル4運行）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "羽田みらい開発株式会社", refs: [1] },
      { role: "運行主体・システム", name: "BOLDLY株式会社、株式会社セネック、マクニカ株式会社", refs: [1] },
      { role: "自治体", name: "大田区（東京都）", refs: [1, 2] }
    ],
    description: {
      value: "新産業創造・発信拠点「羽田イノベーションシティ」内における自動運転バス運行。2023年10月にレベル4車両認可を取得し、NAVYA ARMAによる特定ルート運行を継続している。",
      refs: [1, 2]
    },
    vehicle: { value: "NAVYA ARMA", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "羽田イノベーションシティ内の循環ルート", refs: [1] },
    operationType: { value: "レベル2（運転士乗車）および レベル4（特定自動運行）", refs: [1, 2] },
    references: [
      { id: 1, title: "関東で初めて自動運転車（レベル4）の認可を行いました", url: "https://wwwtb.mlit.go.jp/kanto/content/000304988.pdf", date: "2023-10-20", source: "国土交通省 関東運輸局" },
      { id: 2, title: "各地の取り組み：大田区", url: "https://www.road-to-the-l4.go.jp/case/ota/haneda.html", date: "2025-05-29", source: "RoAD to the L4 プロジェクト" }
    ]
  },
  {
    id: "exp-016",
    name: { value: "塩尻市 自動運転バス実証・社会実装（RoAD to the L4）", refs: [1] },
    location: { value: "長野県塩尻市（塩尻駅〜市役所等）", lat: 36.114, lng: 137.953, refs: [1] },
    prefecture: { value: "長野県", refs: [1] },
    period: { value: "2024年1月〜3月（レベル4実証）／2025年5月〜（レベル2定常運行）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "塩尻駅〜市役所周辺で、一般道の混在空間を対象に自動運転を段階的に導入。2024年にレベル4実証を行い、2025年5月からはレベル2で東西2ルートの定常運行を開始している。",
      refs: [1]
    },
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "塩尻駅周辺〜市役所方面（東回り・西回り、各約5.5km）", refs: [1] },
    operationType: { value: "レベル2（定常運行）および レベル4（一般道実証）", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "塩尻市（長野県）、一般財団法人塩尻市振興公社", refs: [1] },
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
    vehicle: { value: "日野ポンチョ", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "和光市駅北口〜和光北インター周辺（約4.7km）", refs: [1] },
    operationType: { value: "レベル2（運転士乗車、バス専用車線および一部一般車線）", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "和光市（埼玉県）", refs: [1] },
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "樫立地区〜末吉地区（八丈島内）", refs: [1] },
    operationType: { value: "レベル2（期間限定実証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "八丈町（東京都）", refs: [1, 2] },
      { role: "自治体", name: "東京都", refs: [1] },
      { role: "自動運転システム・車両整備", name: "先進モビリティ株式会社", refs: [1] },
      { role: "車両提供", name: "日野自動車株式会社", refs: [1] },
      { role: "事業統括", name: "日本工営株式会社", refs: [1] }
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
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "桑名市内 一般道", refs: [1] },
    operationType: { value: "レベル2（本番走行）、将来のレベル4運用を目指す", refs: [1] },
    stakeholders: [
      { role: "自動運転技術提供", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "自治体", name: "桑名市（三重県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "【三重県桑名市】自動運転バスの社会実装を見据えた安全性検証 / レベル2本番走行", url: "https://aisan-mobility.com/news/250101/", date: "2025-01-01", source: "アイサンテクノロジー ニュース" }
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
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "伊勢神宮内宮周辺エリア", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "事業参画", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "自治体", name: "伊勢市（三重県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "【三重県伊勢市】伊勢神宮内宮エリアで自動運転バスの運行に参画しました", url: "https://aisan-mobility.com/news/251201/", date: "2025-12-01", source: "アイサンテクノロジー ニュース" }
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
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "筑波大学循環ルート", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "技術協力", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "実施主体等", name: "つくば市（茨城県）、筑波大学", refs: [1] }
    ],
    references: [
      { id: 1, title: "【茨城県つくば市】筑波大学循環における自動運転バスの取り組みに協力しました", url: "https://aisan-mobility.com/news/250101-2/", date: "2025-01-01", source: "アイサンテクノロジー ニュース" }
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
    vehicle: { value: "Auve Tech MiCa", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "奥入瀬渓流エリア", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "運行主体", name: "WILLER株式会社", refs: [1] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [1] },
      { role: "運行管理システム", name: "BOLDLY株式会社", refs: [1] },
      { role: "車両提供", name: "Auve Tech（エストニア）", refs: [1] },
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
    vehicle: { value: "タジマ GSM8", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "高田松原津波復興祈念公園内および周辺市街地", refs: [1, 2] },
    operationType: { value: "レベル2（実証実験）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "陸前高田市（岩手県）", refs: [1, 2] },
      { role: "協力企業", name: "KDDI株式会社", refs: [2] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "気仙沼線BRT 柳津駅～陸前横山駅間（片道約4.8kmの専用道）", refs: [1] },
    operationType: { value: "レベル2（実用化済み）、将来レベル4予定", refs: [1] },
    stakeholders: [
      { role: "運行主体", name: "東日本旅客鉄道株式会社（JR東日本）", refs: [1] },
      { role: "システム", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "気仙沼線BRTにおける自動運転について", url: "https://www.jreast.co.jp/press/2022/20221124_ho01.pdf", date: "2024-01-01", source: "JR東日本" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ヤマハ発動機", refs: [] },
    route: { value: "道の駅かみこあに〜周辺集落", refs: [1] },
    operationType: { value: "レベル2運行（レベル4検証中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "上小阿仁村（秋田県）", refs: [1] },
      { role: "車両提供・技術開発", name: "ヤマハ発動機株式会社", refs: [1] },
      { role: "運行主体", name: "NPO法人 上小阿仁村移送サービス協会", refs: [1] },
      { role: "支援", name: "国土交通省、総務省", refs: [1] }
    ],
    references: [
      { id: 1, title: "上小阿仁村における自動運転サービスの実証", url: "https://www.mlit.go.jp/road/road/traffic/autonomous/autonomous_kamikoani.html", date: "2024-01-01", source: "国土交通省" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "高畠町内（道の駅〜生活拠点）", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "高畠町（山形県）", refs: [1] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [1] },
      { role: "技術協力", name: "アイサンテクノロジー株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "道の駅等を拠点とした自動運転サービスの実証実験", url: "https://www.mlit.go.jp/road/road/traffic/autonomous/autonomous_takahata.html", date: "2020-01-01", source: "国土交通省" }
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
    vehicle: { value: "日産リーフ", refs: [1] },
    adSystem: { value: "日産", refs: [] },
    route: { value: "浪江町内", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "浪江町（福島県）", refs: [1] },
      { role: "事業主体・技術提供", name: "日産自動車株式会社", refs: [1] },
      { role: "協力企業", name: "日本郵便株式会社", refs: [1] },
      { role: "協力企業", name: "ゼンリン株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "浪江町における自動運転実証実験", url: "https://www.nissan-global.com/JP/NEWS/2021/_1026-02-j.html", date: "2023-01-01", source: "日産自動車" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "JR前橋駅〜中央前橋駅間など", refs: [1] },
    operationType: { value: "レベル2（実証中・将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "前橋市（群馬県）", refs: [1] },
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [2, 3] },
      { role: "自動運転システム・車両整備", name: "先進モビリティ株式会社", refs: [1] },
      { role: "技術協力・研究", name: "群馬大学(CRANTS)", refs: [1] },
      { role: "運行協力", name: "日本中央バス株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "前橋市における自動運転の取り組み", url: "https://www.city.maebashi.gunma.jp/soshiki/seisaku/kotsuseisaku/gyomu/3/2/23011.html", date: "2023-01-01", source: "前橋市" },
      { id: 2, title: "前橋市において自動運転の実証実験を実施", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2024112001", date: "2024-11-20", source: "日本モビリティ株式会社 リリース" },
      { id: 3, title: "群馬県前橋市で5G技術を活用した自動運転バスの公道実証を実施", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2021010801", date: "2021-01-08", source: "日本モビリティ株式会社 リリース" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "奥日光低公害バス路線", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "自動運転システム", name: "先進モビリティ株式会社", refs: [1] },
      { role: "運行主体", name: "東武バス日光株式会社", refs: [1] },
      { role: "自治体", name: "栃木県", refs: [1] }
    ],
    references: [
      { id: 1, title: "栃木県 日光市 自動運転バス実証", url: "https://www.as-mobi.com/case/okunikko/", date: "2024-01-01", source: "先進モビリティ株式会社" }
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
    vehicle: { value: "いすゞ エルガEV", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "平塚駅周辺の路線バスルート", refs: [1] },
    operationType: { value: "レベル2（実証中）", refs: [1] },
    stakeholders: [
      { role: "産官連携", name: "平塚市（神奈川県）、神奈川中央交通株式会社、いすゞ自動車株式会社", refs: [1] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
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
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "富山市婦中地域 朝日地区", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "富山市（富山県）", refs: [1] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [1] },
      { role: "技術協力・地図", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "車両提供", name: "BYD（比亜迪）", refs: [1] }
    ],
    references: [
      { id: 1, title: "富山市 自動運転実証実験事業", url: "https://www.city.toyama.lg.jp/shisei/machi/1010376/1010381/1010385.html", date: "2024-01-01", source: "富山市" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "富士吉田市内循環ルート", refs: [1] },
    operationType: { value: "レベル2（有償実証運行）", refs: [1] },
    stakeholders: [
      { role: "企業", name: "富士急行株式会社", refs: [1] },
      { role: "自治体", name: "富士吉田市（山梨県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "富士吉田市での実証実験", url: "https://prtimes.jp/main/html/rd/p/000001099.000028232.html", date: "2025-01-01", source: "富士急行" }
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
    vehicle: { value: "NAVYA ARMA", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "岐阜市中心市街地", refs: [1] },
    operationType: { value: "レベル2（将来レベル4へ移行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "岐阜市（岐阜県）", refs: [1] },
      { role: "運行管理・事業運営", name: "BOLDLY株式会社", refs: [1] },
      { role: "車両提供", name: "マクニカ株式会社", refs: [1] },
      { role: "車両製造", name: "Navya（フランス）", refs: [1] },
      { role: "運行補佐", name: "岐阜バス株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "新たな「GIFU HEART BUS」の運行がいよいよスタート！", url: "https://www.city.gifu.lg.jp/kurashi/douro/1002587/1023154/1036889.html", date: "2026-01-28", source: "岐阜市" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "京田辺市内 けいはんな学研都市周辺", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "京田辺市（京都府）", refs: [1] },
      { role: "自動運転システム・車両提供", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "自動運転システム補助", name: "株式会社ティアフォー", refs: [1] },
      { role: "協力", name: "京都スマートシティ推進協議会", refs: [1] }
    ],
    references: [
      { id: 1, title: "京田辺市における自動運転実証実験について", url: "https://www.city.kyotanabe.lg.jp/0000020478.html", date: "2024-12-01", source: "京田辺市（京都府）" }
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
    vehicle: { value: "BYD J6", refs: [1, 2] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "舞洲・夢洲エリア（万博会場周辺）", refs: [1] },
    operationType: { value: "レベル2〜レベル4（万博輸送実証）", refs: [1, 2] },
    stakeholders: [
      { role: "運行主体", name: "大阪市高速電気軌道株式会社", refs: [1, 2] },
      { role: "運行管理システム", name: "BOLDLY株式会社", refs: [1] },
      { role: "車両製造", name: "BYD（比亜迪）", refs: [2] },
      { role: "技術協力", name: "日本ペイント・インダストリアルコーティングス株式会社", refs: [1] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "近鉄飛鳥駅〜高松塚古墳〜キトラ古墳", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "明日香村（奈良県）", refs: [1] },
      { role: "協力", name: "奈良県", refs: [1] },
      { role: "自動運転システム", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "運行主体", name: "奈良交通株式会社", refs: [1] },
      { role: "現場統括", name: "株式会社長大", refs: [1] },
      { role: "支援", name: "国土交通省 近畿地方整備局", refs: [1] }
    ],
    references: [
      { id: 1, title: "明日香村における自動運転バス実証運行について", url: "https://www.vill.asuka.nara.jp/news/2024/12/jidouten.html", date: "2025-01-01", source: "明日香村" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "JR和歌山駅〜和歌山城 前通り", refs: [1] },
    operationType: { value: "レベル2（将来レベル4相当を目指す）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "和歌山市（和歌山県）", refs: [1] },
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [2] },
      { role: "協力企業", name: "NTT西日本株式会社、株式会社マクニカ", refs: [1] }
    ],
    references: [
      { id: 1, title: "和歌山市自動運転実証実験の実施結果", url: "https://www.city.wakayama.wakayama.jp/shisei/1012345/1045678.html", date: "2025-02-01", source: "和歌山市" },
      { id: 2, title: "和歌山市において自動運転の実証実験を実施", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2024012601", date: "2024-01-30", source: "日本モビリティ株式会社 リリース" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "鳥取駅～中心市街地循環ルート", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "鳥取市（鳥取県）", refs: [1] },
      { role: "自動運転システム・車両", name: "株式会社ティアフォー", refs: [1] },
      { role: "運行協力", name: "日ノ丸自動車株式会社", refs: [1] },
      { role: "運行協力", name: "WILLER株式会社", refs: [1] }
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
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "美郷町内 指定ルート", refs: [1] },
    operationType: { value: "レベル4に向けた検証", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "美郷町（島根県）", refs: [1] },
      { role: "支援", name: "総務省", refs: [1] },
      { role: "通信システム検証", name: "NTT西日本株式会社", refs: [1] },
      { role: "通信システム検証", name: "NTTビジネスソリューションズ株式会社", refs: [1] },
      { role: "自動運転システム・車両提供（Navya EVO）", name: "マクニカ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "美郷町における自動運転レベル4検証事業について", url: "https://www.soumu.go.jp/menu_news/s-news/01ryutsu06_02000345.html", date: "2025-01-01", source: "総務省" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "JR津山駅〜津山リージョンセンター", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "津山市（岡山県）", refs: [1] },
      { role: "事業協力", name: "西日本旅客鉄道株式会社（JR西日本）", refs: [1] },
      { role: "自動運転システム・車両", name: "株式会社ティアフォー", refs: [1] }
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
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "福山駅周辺〜エフピコアリーナふくやま", refs: [1] },
    operationType: { value: "レベル2（レベル4に向けた技術検証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "福山市（広島県）", refs: [1] },
      { role: "自動運転システム・車両提供", name: "マクニカ株式会社", refs: [1] },
      { role: "車両製造", name: "Navya（フランス）", refs: [1] }
    ],
    references: [
      { id: 1, title: "福山市自動運転プロジェクト 実施状況", url: "https://www.city.fukuyama.hiroshima.jp/soshiki/gijitech/315486.html", date: "2025-01-01", source: "福山市" }
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
    vehicle: { value: "詳細不明", refs: [1, 2] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "JR徳山駅〜徳山動物園（約2km）", refs: [1, 2] },
    operationType: { value: "レベル2（実証実験）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "周南市（山口県）、山口県", refs: [1, 2] }
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
    vehicle: { value: "Hyundai IONIQ5", refs: [1] },
    adSystem: { value: "a2z", refs: [] },
    route: { value: "鳴門市内 指定エリア", refs: [1] },
    operationType: { value: "レベル4を目指す実証運行", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "鳴門市（徳島県）、徳島県", refs: [1] },
      { role: "通信・システム", name: "日本電気株式会社（NEC）", refs: [1] },
      { role: "配車システム", name: "株式会社電脳交通", refs: [1] },
      { role: "自動運転システム", name: "a2z（韓国）", refs: [1] },
      { role: "事業統括", name: "兼松株式会社", refs: [1] },
      { role: "車両提供", name: "Hyundai（現代自動車）", refs: [1] }
    ],
    references: [
      { id: 1, title: "鳴門市におけるロボットタクシー実証実験", url: "https://jpn.nec.com/press/202501/20250115_01.html", date: "2025-01-01", source: "NEC" }
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
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "三豊市内（駅〜主要施設）", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "三豊市（香川県）", refs: [1] },
      { role: "事業統括・通信インフラ", name: "NTT西日本株式会社", refs: [1] },
      { role: "自動運転システム・車両提供", name: "マクニカ株式会社", refs: [1] },
      { role: "車両製造", name: "Navya（フランス）", refs: [1] }
    ],
    references: [
      { id: 1, title: "三豊市における自動運転実証の取り組み", url: "https://www.city.mitoyo.lg.jp/soshiki/seisaku/jidounten/12345.html", date: "2025-01-01", source: "三豊市" }
    ]
  },
  {
    id: "exp-048",
    name: { value: "松山市 レベル4路線バス本格運行（愛媛県）", refs: [1] },
    location: { value: "愛媛県松山市（松山観光港周辺）", lat: 33.882, lng: 132.709, refs: [1] },
    prefecture: { value: "愛媛県", refs: [1] },
    period: { value: "2024年12月25日〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "伊予鉄グループが高浜駅〜松山観光港連絡バスで、全国初のレベル4路線バス本格運行を開始。完全キャッシュレスで毎日運行し、保安員配置と遠隔監視を組み合わせた運行体制を採用している。",
      refs: [1]
    },
    vehicle: { value: "EVモーターズ・ジャパン F8 series4-Mini Bus", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "伊予鉄道高浜駅〜松山観光港（往復約1.6km）", refs: [1] },
    operationType: { value: "レベル4（路線バス本格運行）", refs: [1] },
    stakeholders: [
      { role: "運行主体", name: "伊予鉄バス株式会社", refs: [1] },
      { role: "自動運転システム", name: "BOLDLY株式会社", refs: [1] },
      { role: "車両提供", name: "EVモーターズ・ジャパン株式会社", refs: [1] },
      { role: "自治体", name: "松山市（愛媛県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "全国初「自動運転レベル4 路線バス本格運行」について", url: "https://www.iyotetsu.co.jp/sp/topics/press/2024/1210_gbac.pdf", date: "2024-12-10", source: "伊予鉄グループ" }
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
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "JR高知駅〜イオンモール高知〜高知赤十字病院", refs: [1] },
    operationType: { value: "レベル4に向けた実証運行", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "高知市（高知県）、高知県", refs: [1] },
      { role: "事業統括", name: "NTTビジネスソリューションズ株式会社", refs: [1] },
      { role: "通信・インフラ", name: "NTT西日本株式会社", refs: [1] },
      { role: "自動運転システム・車両提供", name: "マクニカ株式会社", refs: [1] },
      { role: "車両製造", name: "Navya（フランス）", refs: [1] },
      { role: "車両製造", name: "株式会社ティアフォー", refs: [1] }
    ],
    references: [
      { id: 1, title: "高知市における自動運転実証（総務省事業）の結果報告", url: "https://www.city.kochi.kochi.jp/soshiki/11/jidounten-houkoku.html", date: "2025-12-01", source: "高知市" }
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
    vehicle: { value: "Auve Tech MiCa", refs: [1] },
    adSystem: { value: "Auve Tech", refs: [] },
    route: { value: "アイランドシティ（香椎照葉エリア）循環ルート", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "福岡市（福岡県）", refs: [1] },
      { role: "実証主体", name: "BRJ株式会社", refs: [1] },
      { role: "車両提供", name: "Auve Tech（エストニア）", refs: [1] }
    ],
    references: [
      { id: 1, title: "アイランドシティにおける自動運転バス実証の実施について", url: "https://www.city.fukuoka.lg.jp/shisei/shisaku/jidounten.html", date: "2025-11-01", source: "福岡市" }
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
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "佐賀駅バスセンター〜SAGAサンライズパーク周辺", refs: [1] },
    operationType: { value: "レベル4に向けた高度実証", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "佐賀県", refs: [1] },
      { role: "自治体", name: "佐賀市（佐賀県）", refs: [1] },
      { role: "自動運転システム", name: "先進モビリティ株式会社", refs: [1] },
      { role: "技術統括", name: "株式会社建設技術研究所", refs: [1] },
      { role: "車両提供", name: "BYD（比亜迪）", refs: [1] }
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
    vehicle: { value: "ヤマハグリーンスローモビリティ", refs: [1] },
    adSystem: { value: "ヤマハ発動機", refs: [] },
    route: { value: "対馬市内 指定集落エリア", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "対馬市（長崎県）", refs: [1] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "大入島内（循環ルート）", refs: [1] },
    operationType: { value: "レベル2（実用化検証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "佐伯市（大分県）", refs: [1] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "西都市中心部・西都原古墳群周辺", refs: [1] },
    operationType: { value: "レベル2（実証中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "西都市（宮崎県）", refs: [1] },
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "南さつま市中心部 循環ルート", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "南さつま市（鹿児島県）", refs: [1] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "豊見城市内 生活路線（105番線等）", refs: [1] },
    operationType: { value: "有償実証運行（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "豊見城市（沖縄県）", refs: [1] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [1] },
      { role: "遠隔監視・システム", name: "日本電気株式会社（NEC）", refs: [1] },
      { role: "運行受託", name: "第一交通産業株式会社", refs: [1] },
      { role: "配車システム", name: "株式会社電脳交通", refs: [1] }
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
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "JRロイズタウン駅〜道の駅とうべつ周辺", refs: [1] },
    operationType: { value: "レベル2（長期実証中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "当別町（北海道）", refs: [1] },
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
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "むつ来さまい館〜むつ総合病院〜下北駅", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "むつ市（青森県）", refs: [1] },
      { role: "技術協力", name: "株式会社ティアフォー", refs: [1] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "盛岡城跡公園周辺 指定エリア", refs: [1] },
    operationType: { value: "技術デモンストレーション", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "盛岡市（岩手県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "「MorioKart」自動運転走行デモンストレーションの実施について", url: "https://www.city.morioka.iwate.jp/soshiki/kankou/10123.html", date: "2023-01-22", source: "盛岡市" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "仙台港・東部北エリア 循環ルート", refs: [1] },
    operationType: { value: "レベル2（将来レベル4へ移行準備）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "仙台市（宮城県）", refs: [1] }
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
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "JR大館駅周辺 循環ルート", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "大館市（秋田県）", refs: [1] },
      { role: "技術協力", name: "株式会社ティアフォー、WILLER株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転社会実装推進事業について", url: "https://www.city.odate.lg.jp/city/soshiki/koutsu/p11894", date: "2025-11-11", source: "大館市" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "交流施設「くるんと」〜市役所等 循環", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "長井市（山形県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "スマートシティ長井実現事業 自動運転実証", url: "https://www.city.nagai.yamagata.jp/kurashi_gyosei/kurashi_tetsuzuki/kotsu/jidounten/10664.html", date: "2024-12-01", source: "長井市" }
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
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "JR磐梯町駅〜道の駅ばんだい〜慧日寺", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "磐梯町（福島県）", refs: [1] },
      { role: "技術協力", name: "株式会社ティアフォー、アイサンテクノロジー株式会社", refs: [1] }
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
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "常陸太田市 中心市街地ルート", refs: [1] },
    operationType: { value: "定常運行（将来レベル4認可取得済）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "常陸太田市（茨城県）", refs: [1] },
      { role: "協力", name: "株式会社マクニカ", refs: [1] }
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
    vehicle: { value: "日野リエッセII", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "宇都宮市内（西川田エリア等）", refs: [1] },
    operationType: { value: "レベル2（本格実装準備中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "栃木県", refs: [1] },
      { role: "自治体", name: "宇都宮市（栃木県）", refs: [1] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "渋川市街地 循環ルート", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "渋川市（群馬県）", refs: [1] },
      { role: "自治体", name: "群馬県", refs: [1] },
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [2] },
      { role: "事業参画", name: "関越交通株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "渋川市における自動運転実証実験", url: "https://www.city.shibukawa.lg.jp/kurashi/shakaikiban/shinki/p010618.html", date: "2024-01-01", source: "渋川市" },
      { id: 2, title: "渋川市において自動運転の実証実験を実施", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2024112501", date: "2024-11-25", source: "日本モビリティ株式会社 リリース" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "北浦和駅西口〜埼玉大学", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "さいたま市（埼玉県）", refs: [1] },
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
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "横芝光町内 循環ルート", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "横芝光町（千葉県）", refs: [1] },
      { role: "運行協力", name: "BOLDLY株式会社", refs: [1] }
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
    vehicle: { value: "いすゞ エルガ", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "多摩センター駅〜鶴牧エリア 循環", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "多摩市（東京都）", refs: [1] },
      { role: "運行主体", name: "京王電鉄バス株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "多摩市における大型自動運転バスの実証運行について", url: "https://www.city.tama.lg.jp/shisei/1011111/1011855/1014264.html", date: "2026-01-10", source: "多摩市" }
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
    vehicle: { value: "日産セレナ", refs: [1] },
    adSystem: { value: "日産", refs: [] },
    route: { value: "みなとみらい・桜木町・関内エリア", refs: [1] },
    operationType: { value: "レベル2相当（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "主体", name: "日産自動車株式会社", refs: [1] },
      { role: "自治体", name: "横浜市（神奈川県）", refs: [1] }
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
    period: { value: "2024年3月9日〜（通年運行継続中）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "JR小松駅と小松空港を結ぶ片道約4.4kmで、自動運転バスの通年運行を実施。ティアフォー製MinibusとBOLDLYの運行管理基盤を用い、路線バスとして継続運用しながら社会実装を進めている。",
      refs: [1, 2]
    },
    vehicle: { value: "BYD J6", refs: [2] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "JR小松駅〜小松空港（片道約4.4km）", refs: [1, 2] },
    operationType: { value: "レベル2通年運行（レベル4社会実装準備中）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "小松市（石川県）", refs: [1, 2] },
      { role: "運行管理", name: "BOLDLY株式会社", refs: [2] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [2] },
      { role: "技術協力", name: "アイサンテクノロジー株式会社、損害保険ジャパン株式会社", refs: [2] }
    ],
    references: [
      { id: 1, title: "自動運転バスの運行について", url: "https://www.city.komatsu.lg.jp/soshiki/1985/rosenbasu/4/16580.html", date: "2026-02-01", source: "小松市" },
      { id: 2, title: "石川県小松市で自動運転バスの通年運行を開始", url: "https://www.city.komatsu.lg.jp/material/files/group/22/press_release20240308.pdf", date: "2024-03-08", source: "小松市/BOLDLY/ティアフォー/アイサンテクノロジー/損害保険ジャパン" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "春江地区 循環ルート", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "坂井市（福井県）", refs: [1] },
      { role: "運行管理", name: "MONET Technologies株式会社", refs: [1] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [1] }
    ],
    references: [
      { id: 1, title: "坂井市自動運転社会推進実証事業について", url: "https://www.city.fukui-sakai.lg.jp/sogo-seisaku/shisei/shisaku/jidouunten/jituziyou.html", date: "2025-10-01", source: "坂井市" }
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
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "HIOKI本社〜JR神畑駅周辺", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "主体", name: "日置電機株式会社", refs: [1] },
      { role: "自治体", name: "上田市（長野県）", refs: [1] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "中津川駅〜周辺観光エリア等", refs: [1] },
    operationType: { value: "実証調査・技術検証", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "中津川市（岐阜県）、恵那市等", refs: [1] },
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
    vehicle: { value: "ヤマハランドカー", refs: [1] },
    adSystem: { value: "ヤマハ発動機", refs: [] },
    route: { value: "JR御厨駅周辺 公道ルート", refs: [1] },
    operationType: { value: "レベル2相当（技術検証）", refs: [1] },
    stakeholders: [
      { role: "主体", name: "ヤマハ発動機株式会社", refs: [1] },
      { role: "自治体", name: "磐田市（静岡県）", refs: [1] }
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
    vehicle: { value: "NAVYA ARMA", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "日進市役所〜東山地区 循環ルート", refs: [1] },
    operationType: { value: "レベル2（長期実証中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "日進市（愛知県）", refs: [1] },
      { role: "運行主体", name: "名鉄バス株式会社、BOLDLY株式会社", refs: [1] }
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
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "近鉄四日市駅周辺 中央通りルート", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "四日市市（三重県）", refs: [1] },
      { role: "協力", name: "株式会社マクニカ、三重交通株式会社", refs: [1] }
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
    vehicle: { value: "いすゞ エルガミオ", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "JR大津駅〜びわ湖大津プリンスホテル周辺", refs: [1] },
    operationType: { value: "レベル2相当", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "大津市（滋賀県）", refs: [1] },
      { role: "運行主体", name: "京阪バス株式会社", refs: [1] }
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
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "洛西ニュータウン〜JR桂川駅前", refs: [1] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "京都市交通局", refs: [1] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [1] },
      { role: "技術・地図協力", name: "アイサンテクノロジー株式会社", refs: [1] }
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
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "森之宮・京橋周遊ルート", refs: [1] },
    operationType: { value: "レベル2（商用実証運行）", refs: [1] },
    stakeholders: [
      { role: "主体", name: "大阪市高速電気軌道株式会社", refs: [1] },
      { role: "自治体", name: "大阪市（大阪府）", refs: [1] },
      { role: "自動運転システム", name: "株式会社ティアフォー", refs: [1] },
      { role: "車両提供", name: "BYD（比亜迪）", refs: [1] }
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
    vehicle: { value: "いすゞ エルガミオ", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "ウッディタウン〜JR新三田駅周辺", refs: [1] },
    operationType: { value: "レベル2（社会実装準備中）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "三田市（兵庫県）", refs: [1] },
      { role: "運行主体", name: "神姫バス株式会社", refs: [1] },
      { role: "自動運転システム", name: "先進モビリティ株式会社", refs: [1] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "松江市内 中心部ルート", refs: [1] },
    operationType: { value: "レベル2（実証実験）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "松江市（島根県）", refs: [1] },
      { role: "協力", name: "ソフトバンク株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "松江市における自動運転バス実証実験の実施について", url: "https://www.city.matsue.lg.jp/soshiki/kotsu/jidounten.html", date: "2024-03-01", source: "松江市" }
    ]
  },
  {
    id: "exp-090",
    name: { value: "東広島市・自動運転隊列走行BRT実証", refs: [1, 2] },
    location: { value: "広島県東広島市", lat: 34.43, lng: 132.74, refs: [1] },
    prefecture: { value: "広島県", refs: [1] },
    period: { value: "2024年〜2026年1月（継続実証）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "ブールバール等において、JR西日本・ソフトバンクと連携し連節バスの自動運転・隊列走行（BRT）実証を実施。将来の拠点間移動の高度化を目指す。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1, 2] },
    adSystem: { value: "ソフトバンク", refs: [] },
    route: { value: "JR西条駅周辺〜広島大学東広島キャンパス（ブールバール）", refs: [1, 2] },
    operationType: { value: "レベル2（自動運転・隊列走行BRT実証）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "東広島市（広島県）", refs: [1, 2] },
      { role: "主体", name: "西日本旅客鉄道株式会社（JR西日本）、ソフトバンク株式会社", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "自動運転・隊列走行BRT実証実験", url: "https://www.city.higashihiroshima.lg.jp/soshiki/toshi/7/1_1/44126.html", date: "2025-11-07", source: "東広島市" },
      { id: 2, title: "自動運転・隊列走行BRTの社会実装に向けた「自動運転EVバス」走行試験開始", url: "https://www.city.higashihiroshima.lg.jp/material/files/group/205/press.pdf", date: "2025-10-24", source: "東広島市・JR西日本 連名資料" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "楠こもれびの郷 周辺ルート", refs: [1] },
    operationType: { value: "レベル2（中山間地モデル）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "宇部市（山口県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "中山間地域における自動運転サービス実証実験の結果について", url: "https://www.city.ube.yamaguchi.jp/shisei/koho/kisya/h30/jidounten_kekka.html", date: "2019-03-01", source: "宇部市" }
    ]
  },
  {
    id: "exp-092",
    name: { value: "徳島県・鳴門市/松茂町自動運転タクシー実証", refs: [1, 2] },
    location: { value: "徳島県鳴門市・松茂町", lat: 34.14, lng: 134.58, refs: [1, 2] },
    prefecture: { value: "徳島県", refs: [1] },
    period: { value: "2026年2月〜3月（実証実施済み）", refs: [1, 2] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "地元タクシー会社、NEC、電脳交通等と連携し、既存配車システムを活用した自動運転タクシー実証を実施。27箇所の拠点を走行。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1, 2] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "鳴門市西部・松茂町エリア", refs: [1, 2] },
    operationType: { value: "レベル2（将来レベル4目標）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "徳島県、鳴門市（徳島県）、松茂町（徳島県）", refs: [1, 2] },
      { role: "協力", name: "日本電気株式会社（NEC）、株式会社電脳交通", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "鳴門市におけるロボットタクシー実証実験", url: "https://jpn.nec.com/press/202501/20250115_01.html", date: "2025-01-15", source: "NEC" },
      { id: 2, title: "徳島県における自動運転タクシー実証運行について", url: "https://www.pref.tokushima.lg.jp/ippannokata/kuseijoho/koho/7234567.html", date: "2026-02-01", source: "徳島県" }
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
      refs: [1, 2]
    },
    vehicle: { value: "NAVYA ARMA", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "土庄港〜エンジェルロード周辺", refs: [1] },
    operationType: { value: "レベル2（観光実証）", refs: [1] },
    stakeholders: [
      { role: "主体", name: "JTB、20年先の小豆島をつくるプロジェクト", refs: [1] }
    ],
    references: [
      { id: 1, title: "小豆島における自動運転バス実証実験の実施", url: "https://www.jtbcorp.jp/jp/newsroom/2024/07/26_shodoshima-autonomous.html", date: "2024-07-26", source: "JTB" },
      { id: 2, title: "観光地の持続可能な発展に向けたエリア開発事業を小豆島で開始", url: "https://www.jtbcorp.jp/jp/newsroom/2024/08/01_jtb_shodoshima.html", date: "2024-08-01", source: "JTB" }
    ]
  },
  {
    id: "exp-095",
    name: { value: "高知市・自動運転バス高度実証（総務省DX推進）", refs: [1, 2] },
    location: { value: "高知県高知市", lat: 33.57, lng: 133.54, refs: [1, 2] },
    prefecture: { value: "高知県", refs: [1] },
    period: { value: "2025年11月〜12月（実証実施済み）", refs: [1, 2] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "JR高知駅〜イオンモール高知周辺において、レベル4を見据えた通信システム等の高度検証を実施。NTT西日本等と連携した地域社会DXプロジェクト。",
      refs: [1, 2]
    },
    vehicle: { value: "NAVYA EVO", refs: [1, 2] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "JR高知駅〜イオンモール高知〜高知赤十字病院", refs: [1, 2] },
    operationType: { value: "レベル4社会実装に向けた技術検証", refs: [1, 2] },
    stakeholders: [
      { role: "主体", name: "高知市（高知県）、NTTビジネスソリューションズ株式会社", refs: [1, 2] },
      { role: "技術協力", name: "株式会社マクニカ", refs: [2] }
    ],
    references: [
      { id: 1, title: "広報「あかるいまち」2025年12月号簡易テキスト（HTML）", url: "https://www.city.kochi.kochi.jp/soshiki/80/akamati202512oshirase.html", date: "2025-11-28", source: "高知市" },
      { id: 2, title: "高知県高知市における「安全かつ効率的なレベル4自動運転に資する通信システム等の検証」を開始", url: "https://www.nttbizsol.jp/newsrelease/202507291600001209.html", date: "2025-07-29", source: "NTTビジネスソリューションズ" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "JR古賀駅東口〜JRししぶ駅東口", refs: [1] },
    operationType: { value: "レベル2（AIオンデマンド連携）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "古賀市（福岡県）", refs: [1] },
      { role: "システム導入・運行支援", name: "ネクスト・モビリティ株式会社", refs: [1] },
      { role: "自動運転システム・車両", name: "株式会社ティアフォー", refs: [1] },
      { role: "技術協力", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "技術協力", name: "A-Drive", refs: [1] },
      { role: "運行業務", name: "古賀タクシー株式会社", refs: [1] },
      { role: "運行業務", name: "花鶴タクシー有限会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "のるーと自動運転実証運行の開始について", url: "https://www.city.koga.fukuoka.jp/cityhall/work/kikaku/085.php", date: "2026-03-01", source: "古賀市" }
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
    vehicle: { value: "NAVYA ARMA", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "嬉野温泉駅〜温泉街周辺", refs: [1] },
    operationType: { value: "レベル2相当（観光回遊性向上）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "嬉野市（佐賀県）", refs: [1] },
      { role: "運行管理・システム", name: "BOLDLY株式会社", refs: [1] },
      { role: "車両提供", name: "マクニカ株式会社", refs: [1] }
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
    vehicle: { value: "詳細不明", refs: [1, 2] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "熊本城周辺ルート、南熊本駅周辺ルート", refs: [1] },
    operationType: { value: "レベル2（長期実証中）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "熊本市（熊本県）", refs: [1, 2] },
      { role: "自動運転システム", name: "先進モビリティ株式会社", refs: [1] }
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
    vehicle: { value: "Auve Tech MiCa", refs: [1] },
    adSystem: { value: "Auve Tech", refs: [] },
    route: { value: "境町内循環ルート（第4期拡充エリア含む）", refs: [1] },
    operationType: { value: "レベル2（定常運行）、将来のレベル4実装に向けた検証", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "境町（茨城県）", refs: [1] },
      { role: "運行管理・システム", name: "BOLDLY株式会社", refs: [1] },
      { role: "車両提供", name: "マクニカ株式会社", refs: [1] },
      { role: "車両製造", name: "Auve Tech（エストニア）", refs: [1] }
    ],
    references: [
      { id: 1, title: "国内初、茨城県境町が自動運転EV「MiCa」を導入", url: "https://www.softbank.jp/drive/press/2023/20231206_02/", date: "2023-12-06", source: "BOLDLY / ソフトバンク" }
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
    vehicle: { value: "パナソニック製電動カート", refs: [1] },
    adSystem: { value: "産総研", refs: [] },
    route: { value: "永平寺参ろーど 約1.4km", refs: [1] },
    operationType: { value: "レベル2（遠隔監視型、最初期検証）", refs: [1] },
    stakeholders: [
      { role: "研究開発", name: "国立研究開発法人 産業技術総合研究所（産総研）", refs: [1] },
      { role: "車両提供", name: "パナソニック株式会社", refs: [1] },
      { role: "自治体", name: "永平寺町（福井県）", refs: [2] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "NEC", refs: [] },
    route: { value: "JR前橋駅〜中央前橋駅シャトルルート 約1km", refs: [1] },
    operationType: { value: "レベル2（5G連携・高度技術検証）", refs: [1] },
    stakeholders: [
      { role: "事業全体", name: "前橋市（群馬県）", refs: [1] },
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "柏の葉キャンパス駅〜東京大学柏キャンパス 約2.5km", refs: [1] },
    operationType: { value: "レベル2（初期公道検証）", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "東京大学", refs: [1] },
      { role: "システム", name: "先進モビリティ株式会社", refs: [1] },
      { role: "自治体", name: "柏市（千葉県）", refs: [1] }
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
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "福山市内中心部 公道路線", refs: [1] },
    operationType: { value: "レベル2〜レベル4に向けた段階的実証", refs: [2] },
    stakeholders: [
      { role: "事業主体", name: "福山市（広島県）", refs: [1] },
      { role: "技術支援", name: "マクニカ株式会社", refs: [2] },
      { role: "運行協力", name: "中国バス株式会社", refs: [2] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "中部国際空港内および空港島周辺", refs: [1] },
    operationType: { value: "レベル2〜（段階的実証）", refs: [1] },
    stakeholders: [
      { role: "支援", name: "愛知県", refs: [1] },
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [2] },
      { role: "システム", name: "先進モビリティ株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "愛知県 自動運転社会実装プロジェクト：中部国際空港", url: "https://www.pref.aichi.jp/", date: "2024-01-01", source: "愛知県" },
      { id: 2, title: "常滑市中部国際空港島において自動運転の社会実装を見据えた実証実験を実施します", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2020092101", date: "2020-09-21", source: "日本モビリティ株式会社 リリース" }
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
    vehicle: { value: "NAVYA ARMA", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "九大伊都キャンパス内、博多港周辺エリア", refs: [1] },
    operationType: { value: "レベル2（MaaS連携実証）", refs: [1] },
    stakeholders: [
      { role: "事業協力", name: "九州大学", refs: [1] },
      { role: "自治体", name: "福岡市（福岡県）", refs: [1] },
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "SAGAサンライズパーク〜佐賀駅周辺", refs: [1] },
    operationType: { value: "レベル2（導入前実証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "佐賀市（佐賀県）", refs: [1] },
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
    vehicle: { value: "NAVYA ARMA", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "陸前高田市中心市街地", refs: [1] },
    operationType: { value: "レベル2（中心市街地実証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "陸前高田市（岩手県）", refs: [1] },
      { role: "運行管理", name: "BOLDLY株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "陸前高田市における自動運転バスの新たな実証実験", url: "https://www.city.rikuzentakata.iwate.jp/soshiki/kikakuseisakuka/seisakukohogakari/1/1/8617.html", date: "2024-03-01", source: "陸前高田市" }
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
    vehicle: { value: "NAVYA ARMA", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "響灘地区・東田地区 各拠点ルート", refs: [1] },
    operationType: { value: "レベル2（複数拠点展開）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "北九州市（福岡県）", refs: [1] },
      { role: "技術協力", name: "アイサンテクノロジー株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "北九州市 自動運転プロジェクト公表資料", url: "https://www.city.kitakyushu.lg.jp/shisei/cto-01002.html", date: "2024-01-01", source: "北九州市" }
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
    vehicle: { value: "いすゞ エルガ", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "新木場駅前〜日本科学未来館（片道約30分）", refs: [1] },
    operationType: { value: "レベル2（運転手同乗）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "東京都", refs: [1] },
      { role: "運行主体", name: "東京都交通局", refs: [1] },
      { role: "車両提供", name: "いすゞ自動車株式会社", refs: [1] }
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
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "彦根駅〜彦根市立病院〜くすのきセンター", refs: [1] },
    operationType: { value: "レベル2相当（実証運行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "滋賀県", refs: [1] },
      { role: "自治体", name: "彦根市（滋賀県）", refs: [1] },
      { role: "協力企業", name: "NTT西日本株式会社、NTTビジネスソリューションズ株式会社、マクニカ株式会社", refs: [1] }
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
      refs: [1, 2]
    },
    vehicle: { value: "Auve Tech MiCa", refs: [1, 2] },
    adSystem: { value: "Auve Tech", refs: [] },
    route: { value: "弥彦村内 循環ルート", refs: [1, 2] },
    operationType: { value: "レベル2（定常運行）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "弥彦村（新潟県）", refs: [1, 2] },
      { role: "運行管理", name: "BOLDLY株式会社", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "弥彦村で自動運転バス「MiCa」による通年運行を開始", url: "https://www.softbank.jp/drive/press/2024/20240130_01/", date: "2024-01-30", source: "ソフトバンク プレスリリース" },
      { id: 2, title: "自動運転車両について｜自動運転車両「ミコぴょん号」", url: "https://www.vill.yahiko.niigata.jp/life/?content=704", date: "2025-04-01", source: "弥彦村" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ソフトバンク", refs: [] },
    route: { value: "YRP野比駅〜横須賀リサーチパーク（YRP）", refs: [1] },
    operationType: { value: "レベル2（将来のレベル4・隊列走行を見据えた検証）", refs: [1] },
    stakeholders: [
      { role: "事業主体・技術検証", name: "ソフトバンク株式会社", refs: [1] },
      { role: "運行主体", name: "京浜急行バス株式会社", refs: [1] },
      { role: "自治体", name: "横須賀市（神奈川県）", refs: [1] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ソフトバンク", refs: [] },
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
    vehicle: { value: "スズキ ソリオ", refs: [2] },
    adSystem: { value: "スズキ", refs: [] },
    route: { value: "浜松市庄内地区等 路線網（片道約9km等）", refs: [1, 2] },
    operationType: { value: "レベル2（Dispatcherによる遠隔監視・運行管理）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "浜松市（静岡県）", refs: [1] },
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
    name: { value: "仙台市 自動運転実証事業（青葉山・東部北・秋保エリア）", refs: [1, 2] },
    location: { value: "宮城県仙台市（青葉山・東部北・秋保エリア）", lat: 38.262, lng: 140.876, refs: [1, 2] },
    prefecture: { value: "宮城県", refs: [1] },
    period: { value: "2024年10月〜2026年1月（段階的に拡大）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "仙台市の自動運転実証事業として、青葉山グリーン回遊プロジェクト（国際センター駅〜仙台城跡）での運行実験を起点に、2025年度は東部北エリアおよび秋保エリアへ実施範囲を拡大。観光・地域交通の移動手段確保と社会受容性を検証している。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1, 2] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "国際センター駅〜仙台城跡、東部北エリア、秋保エリア", refs: [1, 2] },
    operationType: { value: "レベル2（将来のレベル4実装に向けた実証）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "仙台市（宮城県）", refs: [1, 2] },
      { role: "協力", name: "東北大学", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "自動運転実証事業の実施エリアを拡大します（発表資料）", url: "https://www.city.sendai.jp/sesakukoho/gaiyo/shichoshitsu/kaiken/2025/10/14unten2.html", date: "2025-10-15", source: "仙台市" },
      { id: 2, title: "自動運転実証事業「青葉山グリーン回遊プロジェクト」自動運転レベル2の運行実験を実施します（発表資料）", url: "https://www.city.sendai.jp/sesakukoho/gaiyo/shichoshitsu/kaiken/2024/10/08zidouunten2.html", date: "2024-10-09", source: "仙台市" }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "鶴ヶ峰駅〜よこはま動物園ズーラシア間 路線バスルート", refs: [1] },
    operationType: { value: "レベル2（インフラ協調型・遠隔監視検証）", refs: [1] },
    stakeholders: [
      { role: "事業統括", name: "慶應義塾大学", refs: [1] },
      { role: "システム・車両", name: "先進モビリティ株式会社", refs: [1] },
      { role: "自治体", name: "横浜市（神奈川県）", refs: [1] },
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "堺駅前〜堺東駅前（大小路筋）約1.5km", refs: [1] },
    operationType: { value: "レベル2（将来のレベル4化に向けた検証）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "堺市（大阪府）", refs: [1] },
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
    vehicle: { value: "詳細不明", refs: [1, 2] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "五十鈴川駅〜伊勢神宮内宮前", refs: [1, 2] },
    operationType: { value: "レベル2（観光地実証）", refs: [1, 2] },
    stakeholders: [
      { role: "事業主体", name: "アイサンテクノロジー株式会社", refs: [2] },
      { role: "技術協力", name: "先進モビリティ株式会社", refs: [2] },
      { role: "自治体", name: "伊勢市（三重県）", refs: [1] }
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
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "先進モビリティ", refs: [] },
    route: { value: "八丈島空港〜中心市街地〜底土（しんど）港", refs: [1] },
    operationType: { value: "レベル2（期間限定実証）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "八丈町（東京都）", refs: [1] },
      { role: "システム・技術協力", name: "先進モビリティ株式会社", refs: [1] },
      { role: "自治体", name: "東京都", refs: [1] }
    ],
    references: [
      { id: 1, title: "八丈島スマートモビリティ実証事業について", url: "https://www.as-mobi.com/case/", date: "2024-07-01", source: "先進モビリティ株式会社" }
    ]
  },
  {
    id: "exp-126",
    name: { value: "富士市 自動運転バス実証実験", refs: [1] },
    location: { value: "静岡県富士市", lat: 35.161, lng: 138.676, refs: [1] },
    prefecture: { value: "静岡県", refs: [1] },
    period: { value: "2025年11月〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "富士市における自動運転バスの実証実験。市公式公開情報を一次ソースとして追加した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "富士市内（実証ルート）", refs: [1] },
    operationType: { value: "レベル2（乗務員乗車の実証）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "富士市（静岡県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "富士市における自動運転バス実証実験", url: "https://www.city.fuji.shizuoka.jp/sp/machi/c1307/c1307/hngtkl000000d2we.html", date: "2025-11-01", source: "富士市" }
    ]
  },
  {
    id: "exp-127",
    name: { value: "狛江市 自動運転バス実証実験", refs: [1] },
    location: { value: "東京都狛江市", lat: 35.634, lng: 139.578, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2025年12月〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "狛江市における自動運転バスの実証実験。市公式公開情報を一次ソースとして追加した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "狛江市内（実証ルート）", refs: [1] },
    operationType: { value: "レベル2（乗務員乗車の実証）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "狛江市（東京都）", refs: [1] }
    ],
    references: [
      { id: 1, title: "狛江市内における自動運転バス実証実験", url: "https://www.city.komae.tokyo.jp/events/index.cfm/detail.4.135758.html", date: "2025-12-03", source: "狛江市" }
    ]
  },
  {
    id: "exp-128",
    name: { value: "川崎市 臨海部 自動運転バス実証実験", refs: [1] },
    location: { value: "神奈川県川崎市", lat: 35.53, lng: 139.703, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2025年11月〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "川崎市臨海部における自動運転バスの実証実験。市公式公開情報を一次ソースとして追加した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "川崎市臨海部（実証ルート）", refs: [1] },
    operationType: { value: "レベル2（乗務員乗車の実証）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "川崎市（神奈川県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "川崎市 臨海部における自動運転バス実証実験", url: "https://www.city.kawasaki.jp/250/page/0000148404.html", date: "2025-11-28", source: "川崎市" }
    ]
  },
  {
    id: "exp-129",
    name: { value: "西宮市 自動運転バス実証実験", refs: [1] },
    location: { value: "兵庫県西宮市", lat: 34.737, lng: 135.341, refs: [1] },
    prefecture: { value: "兵庫県", refs: [1] },
    period: { value: "2025年3月〜", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "西宮市における自動運転バスの実証実験。市公式公開情報を一次ソースとして追加した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "西宮市内（実証ルート）", refs: [1] },
    operationType: { value: "レベル2（乗務員乗車の実証）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "西宮市（兵庫県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "西宮市における自動運転バス実証実験", url: "https://www.nishi.or.jp/shisei/koho/hasshin/press_2024/202409_202503/20250331175400277.html", date: "2025-03-31", source: "西宮市" }
    ]
  },
  {
    id: "exp-130",
    name: { value: "札幌市 定山渓地区 自動運転バス実証実験", refs: [1] },
    location: { value: "北海道札幌市南区定山渓地区", lat: 42.966, lng: 141.167, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2025年10月21日〜11月3日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "札幌市が定山渓地区で実施した自動運転バス実証実験。観光周遊での活用可能性を検証し、期間中は無料で運行した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "定山渓地区内 実証ルート", refs: [1] },
    operationType: { value: "レベル2（オペレーター同乗）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "札幌市（北海道）", refs: [1] }
    ],
    references: [
      { id: 1, title: "定山渓地区自動運転バス実証実験について(令和7年10月20日)", url: "https://www.city.sapporo.jp/keizai/kanko/news2/r7jzk_bus2.html", date: "2025-10-20", source: "札幌市" }
    ]
  },
  {
    id: "exp-131",
    name: { value: "名古屋市 ガイドウェイバス自動運転技術導入 実証実験", refs: [1] },
    location: { value: "愛知県名古屋市（ガイドウェイバス志段味線）", lat: 35.183, lng: 136.906, refs: [1] },
    prefecture: { value: "愛知県", refs: [1] },
    period: { value: "2024年12月〜2025年2月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "名古屋市がガイドウェイバスへの自動運転技術導入に向けて実施した大型自動運転バスの実証実験。一般モニター試乗を含めて検証を行った。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "ガイドウェイバス志段味線 実証区間", refs: [1] },
    operationType: { value: "レベル2（乗務員乗車の実証）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "名古屋市（愛知県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "ガイドウェイバスへの自動運転技術導入に向けた大型自動運転バスによる実証実験を実施します", url: "https://www.city.nagoya.jp/jutakutoshi/page/0000180682.html", date: "2024-11-29", source: "名古屋市" }
    ]
  },
  {
    id: "exp-132",
    name: { value: "相模原市 相模原駅周辺 自動運転プレ実証実験", refs: [1] },
    location: { value: "神奈川県相模原市（相模原駅周辺）", lat: 35.573, lng: 139.373, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2026年3月実施", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "相模原市が相模原駅周辺で実施した自動運転（レベル2）プレ実証実験。社会受容性や運行条件の確認を目的として実施した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "相模原駅周辺 実証ルート", refs: [1] },
    operationType: { value: "レベル2（プレ実証）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "相模原市（神奈川県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "相模原駅周辺における自動運転（レベル2）プレ実証実験（相模原市発表資料）", url: "https://www.city.sagamihara.kanagawa.jp/_res/projects/default_project/_page_/001/034/781/0304/03.pdf", date: "2026-03-04", source: "相模原市" }
    ]
  },
  {
    id: "exp-133",
    name: { value: "神戸市 灘五郷エリア 自動運転実証運行", refs: [1] },
    location: { value: "兵庫県神戸市東灘区（灘五郷エリア）", lat: 34.71, lng: 135.27, refs: [1] },
    prefecture: { value: "兵庫県", refs: [1] },
    period: { value: "2026年1月19日〜1月23日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "神戸市が日産自動車と連携して灘五郷エリアで実施した自動運転実証運行。一般試乗を含め、観光地周遊での運用可能性を検証した。",
      refs: [1]
    },
    vehicle: { value: "日産リーフ", refs: [1] },
    adSystem: { value: "日産", refs: [] },
    route: { value: "神戸酒心館周辺を含む灘五郷エリア周回ルート", refs: [1] },
    operationType: { value: "レベル2（一般試乗を伴う実証運行）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "神戸市（兵庫県）", refs: [1] },
      { role: "事業協力", name: "日産自動車株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "神戸市内灘五郷エリアにて自動運転に取り組みます～日産自動車株式会社との連携～", url: "https://www.city.kobe.lg.jp/a80014/jidounten.html", date: "2025-07-24", source: "神戸市" }
    ]
  },
  {
    id: "exp-134",
    name: { value: "千歳市 自動運転バス実証実験", refs: [1] },
    location: { value: "北海道千歳市（千歳駅前西口〜本社ターミナル等）", lat: 42.823, lng: 141.651, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2025年11月4日〜2026年1月13日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "千歳市が地域公共交通の維持確保を目的に実施した自動運転バス実証。路線バス同等規模の車両で、冬期走行を含むレベル2実証を行った。",
      refs: [1]
    },
    vehicle: { value: "いすゞ エルガ", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "千歳駅前西口〜本社ターミナル等の市内ルート", refs: [1] },
    operationType: { value: "レベル2（運転手同乗・必要時介入）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "千歳市（北海道）", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バス実証実験", url: "https://www.city.chitose.lg.jp/docs/35581.html", date: "2025-10-23", source: "千歳市" }
    ]
  },
  {
    id: "exp-135",
    name: { value: "苫小牧市 自動運転バス実証事業", refs: [1] },
    location: { value: "北海道苫小牧市（苫小牧駅前〜ぷらっとみなと市場等）", lat: 42.636, lng: 141.603, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2023年9月〜2025年2月（複数期実証）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "苫小牧市地域公共交通計画に基づく自動運転バス実証事業。市街地とウォーターフロント間の運行や冬季実証などを実施し、将来的な実装化に向けた効果検証を行った。",
      refs: [1]
    },
    vehicle: { value: "NAVYA ARMA", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "苫小牧駅前〜ぷらっとみなと市場等、イベント会場周辺ルート", refs: [1] },
    operationType: { value: "レベル2中心（イベント時にレベル4走行検証を実施）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "苫小牧市（北海道）", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バス実証事業", url: "https://www.city.tomakomai.hokkaido.jp/shisei/kokyokotu/bus/zidouunten.html", date: "2025-02-16", source: "苫小牧市" }
    ]
  },
  {
    id: "exp-136",
    name: { value: "石狩市 自動配送ロボット実証実験（車道走行）", refs: [1] },
    location: { value: "北海道石狩市（石狩湾新港・緑苑台東地区）", lat: 43.164, lng: 141.315, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2021年〜2024年（段階的実証）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "石狩市協力のもと、自動配送ロボットの公道・車道走行を含む実証実験を実施。ラストワンマイル配送の社会実装に向け、遠隔監視・運用面を検証した。",
      refs: [1]
    },
    vehicle: { value: "自動配送ロボット", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "石狩市内の指定エリア（石狩新港地域・緑苑台東地区）", refs: [1] },
    operationType: { value: "遠隔監視型の自動走行実証（限定エリア）", refs: [1] },
    stakeholders: [
      { role: "自治体・協力", name: "石狩市（北海道）", refs: [1] },
      { role: "事業主体", name: "京セラコミュニケーションシステム株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動配送ロボットの実証実験に係る走行ルートの確認及び測量について", url: "https://www.city.ishikari.hokkaido.jp/kurashi/doro/1001844/1002361.html", date: "2025-02-28", source: "石狩市" }
    ]
  },
  {
    id: "exp-137",
    name: { value: "大樹町 道の駅コスモール大樹 自動運転サービス長期実証実験", refs: [1] },
    location: { value: "北海道大樹町（道の駅コスモール大樹〜尾田地区ほか）", lat: 42.496, lng: 143.279, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2019年5月18日〜6月21日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "内閣府・国土交通省によるSIPの一環として、大樹町で道の駅を拠点にした長期自動運転サービス実証を実施。全国で初めて自家用有償旅客運送で料金徴収を行う長期間実証として検証した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "コスモール大樹〜尾田地区往復便、市街地循環便", refs: [1] },
    operationType: { value: "道の駅拠点型自動運転サービス実証", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "内閣府、国土交通省", refs: [1] },
      { role: "自治体", name: "大樹町（北海道）", refs: [1] }
    ],
    references: [
      { id: 1, title: "道の駅「コスモール大樹」を拠点とした自動運転サービスの長期実証実験を開始", url: "https://www8.cao.go.jp/cstp/stmain/20190515adus_kosmall.html", date: "2019-05-15", source: "内閣府" }
    ]
  },
  {
    id: "exp-138",
    name: { value: "斜里町 中斜里製糖工場周辺 レベル4大型トラック自動運転実証", refs: [1, 2, 3] },
    location: { value: "北海道斜里町（ホクレン中斜里製糖工場）", lat: 43.866, lng: 144.643, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2019年8月（公開実証）", refs: [1, 2, 3] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "UDトラックス・日本通運・ホクレンが、斜里町の製糖工場周辺で大型トラックのレベル4技術実証を実施。国内初として一部公道を含むルートで走行検証を行った。",
      refs: [1, 2, 3]
    },
    vehicle: { value: "UDトラックス クオン", refs: [1, 2, 3] },
    adSystem: { value: "UDトラックス", refs: [] },
    route: { value: "中斜里製糖工場と集積施設を結ぶルート（一部公道含む）", refs: [1, 2, 3] },
    operationType: { value: "レベル4技術の実証走行（限定ルート）", refs: [1, 2, 3] },
    stakeholders: [
      { role: "事業主体", name: "UDトラックス株式会社、日本通運株式会社、ホクレン農業協同組合連合会", refs: [1, 2, 3] },
      { role: "自治体・協力", name: "斜里町（北海道）", refs: [1] }
    ],
    references: [
      { id: 1, title: "UDトラックス、日本通運、ホクレンが、国内初、一部公道を使用した大型トラックによるレベル4技術の自動運転実証実験を北海道で実施", url: "https://www.nipponexpress-holdings.com/ja/press/2019/20190829-1.html", date: "2019-08-29", source: "NIPPON EXPRESSホールディングス" },
      { id: 2, title: "ＵＤトラックス、日本通運、ホクレンが、北海道で自動運転トラックの実証実験を実施", url: "https://www.udtrucks.com/japan/news-and-stories/news/20190719-fujin-demo-hokkaido", date: "2019-07-19", source: "UDトラックス" },
      { id: 3, title: "ＵＤトラックス、日本通運、ホクレンが、国内初、一部公道を使用した大型トラックによるレベル4技術の自動運転実証実験を北海道で公開", url: "https://www.udtrucks.com/japan/news-and-stories/news/20190829-fujin-demo-hokkaido-event", date: "2019-08-29", source: "UDトラックス" }
    ]
  },
  {
    id: "exp-139",
    name: { value: "宗像市 自由ヶ丘地区 自動運転バス実証運行", refs: [1] },
    location: { value: "福岡県宗像市（自由ヶ丘地区コミュニティ・センター〜JR赤間駅南口）", lat: 33.819, lng: 130.558, refs: [1] },
    prefecture: { value: "福岡県", refs: [1] },
    period: { value: "2025年8月19日〜9月26日（平日運行）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "宗像市が令和9年度の本格運行を見据えて実施した公道でのレベル2実証運行。自由ヶ丘地区とJR赤間駅南口を結ぶルートで無料運行を実施した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "自由ヶ丘地区コミュニティ・センター〜JR赤間駅南口", refs: [1] },
    operationType: { value: "レベル2（運転手同乗・手動介入可能）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "宗像市（福岡県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "住み続けられる住宅団地を目指して自動運転バス実証運行を実施", url: "https://www.city.munakata.lg.jp/kiji0037571/index.html", date: "2025-07-23", source: "宗像市" }
    ]
  },
  {
    id: "exp-140",
    name: { value: "木津川市 自動運転EVバス実証運行（城山台地域）", refs: [1] },
    location: { value: "京都府木津川市（JR木津駅東口〜城山台地域周辺）", lat: 34.736, lng: 135.825, refs: [1] },
    prefecture: { value: "京都府", refs: [1] },
    period: { value: "2026年1月下旬〜2月中旬", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "木津川市が京都府・京田辺市・精華町等と連携し、城山台地域で実施した自動運転EVバスの実証運行。レベル2運行に加え、1:N遠隔監視オペレーションの成立性を検証した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "JR木津駅東口発着・城山台地域周辺ルート", refs: [1] },
    operationType: { value: "レベル2（1:N遠隔監視検証を含む実証）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "木津川市（京都府）", refs: [1] },
      { role: "自治体・連携", name: "京都府、京田辺市（京都府）、精華町（京都府）", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転EVバスの実証運行を行います", url: "https://www.city.kizugawa.lg.jp/0000002703.html", date: "2026-01-09", source: "木津川市" }
    ]
  },
  {
    id: "exp-142",
    name: { value: "羽田空港地域 次世代公共交通システム自動運転実証", refs: [1] },
    location: { value: "東京都大田区（羽田空港地域）", lat: 35.549, lng: 139.779, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2020年6月〜", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "NEDOが管理するSIP第2期の一環として、羽田空港地域で自動運転技術を活用した次世代公共交通システムの実証を開始。磁気マーカー活用やバス停正着制御などを検証し、レベル4相当の実現可能性を評価した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "羽田空港地域内の実証ルート", refs: [1] },
    operationType: { value: "レベル4相当を目指す実証走行", refs: [1] },
    stakeholders: [
      { role: "管理法人", name: "国立研究開発法人新エネルギー・産業技術総合開発機構（NEDO）", refs: [1] },
      { role: "推進", name: "内閣府SIP自動運転", refs: [1] }
    ],
    references: [
      { id: 1, title: "羽田空港地域における自動運転の実証実験を開始", url: "https://www.nedo.go.jp/news/press/AA5_101316.html", date: "2020-06-05", source: "NEDO" }
    ]
  },
  {
    id: "exp-143",
    name: { value: "千代田区 丸の内仲通り 自動運転バス試乗会", refs: [1] },
    location: { value: "東京都千代田区 丸の内仲通り", lat: 35.681, lng: 139.764, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2017年12月22日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "ソフトバンク、三菱地所、SBドライブ（現BOLDLY）が実施した自動運転バス試乗会。東京都23区内公道での自動運転車両走行として実施された。",
      refs: [1]
    },
    vehicle: { value: "NAVYA ARMA", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "丸の内仲通り 往復約200m（バス停1箇所）", refs: [1] },
    operationType: { value: "レベル4対応車両による試乗実証（監視付き）", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "ソフトバンク株式会社、三菱地所株式会社、SBドライブ株式会社（現BOLDLY株式会社）", refs: [1] }
    ],
    references: [
      { id: 1, title: "『自動運転バス試乗会 in 丸の内仲通り』を実施", url: "https://www.softbank.jp/corp/group/sbm/news/press/2017/20171211_01/", date: "2017-12-11", source: "ソフトバンク株式会社" }
    ]
  },
  {
    id: "exp-144",
    name: { value: "港区 竹芝エリア 自動運転運行業務AI無人化実証", refs: [1] },
    location: { value: "東京都港区 竹芝エリア", lat: 35.654, lng: 139.763, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2023年1月〜", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "ソフトバンクが竹芝エリアで、自動運転の走行経路設計や遠隔監視など運行業務のAI無人化に向けて実施した実証実験。レベル4社会実装を見据えた運用面の検証を行った。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ソフトバンク", refs: [] },
    route: { value: "竹芝エリア内 実証ルート", refs: [1] },
    operationType: { value: "レベル4解禁を見据えた運行業務無人化実証", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "ソフトバンク株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転のレベル4の解禁に向けて、自動運転の走行経路の設計や遠隔監視の運行業務などをAIで完全無人化する実証実験を開始", url: "https://www.softbank.jp/corp/news/press/sbkk/2023/20230310_01/", date: "2023-03-10", source: "ソフトバンク株式会社" }
    ]
  },
  {
    id: "exp-145",
    name: { value: "東京都心7区 Waymo車両データ収集走行（GO・Waymo・日本交通）", refs: [1, 2] },
    location: { value: "東京都 港区・新宿区・渋谷区・千代田区・中央区・品川区・江東区", lat: 35.666, lng: 139.768, refs: [1, 2] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2025年4月14日週〜", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "GO、Waymo、日本交通が東京都心7区で開始した公道走行。日本交通の乗務員による手動運転でデータを収集し、Waymo Driverの日本向け適応を進める実証。",
      refs: [1, 2]
    },
    vehicle: { value: "Jaguar I-PACE", refs: [1, 2] },
    adSystem: { value: "Waymo", refs: [] },
    route: { value: "港区・新宿区・渋谷区・千代田区・中央区・品川区・江東区の公道", refs: [1, 2] },
    operationType: { value: "手動運転によるデータ収集・技術適応実証", refs: [1, 2] },
    stakeholders: [
      { role: "事業主体", name: "GO株式会社、Waymo、日本交通株式会社", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "GO、Waymo、日本交通　今週より東京都心7区でWaymo車両の走行を開始", url: "https://goinc.jp/news/info/2025/04/14/4zfkopprkigxqcfyiltgxd", date: "2025-04-14", source: "GO株式会社" },
      { id: 2, title: "Waymo 日本版", url: "https://waymo.com/intl/jp/waymo-in-japan", date: "2025-04-14", source: "Waymo" }
    ]
  },
  {
    id: "exp-146",
    name: { value: "千代田区〜港区 Aidelix 自動運転タクシー公道営業実証", refs: [1] },
    location: { value: "東京都千代田区（大手町）〜東京都港区（六本木）", lat: 35.676, lng: 139.746, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2018年8月27日〜9月8日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "日の丸交通とZMPが実施した自動運転タクシーの公道営業実証。大手町フィナンシャルシティと六本木ヒルズ間を結ぶ約5.3kmで、予約者向けに有償試験運行を行った。",
      refs: [1]
    },
    vehicle: { value: "トヨタ エスティマ ハイブリッド", refs: [1] },
    adSystem: { value: "ZMP", refs: [] },
    route: { value: "大手町フィナンシャルシティ グランキューブ〜六本木ヒルズ（約5.3km）", refs: [1] },
    operationType: { value: "公道営業実証（監視付き自動運転）", refs: [1] },
    stakeholders: [
      { role: "事業主体", name: "日の丸交通株式会社、株式会社ZMP", refs: [1] },
      { role: "協賛・協力", name: "三菱地所株式会社、森ビル株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "総合ディベロッパーと連携し、先進的な都市交通インフラ実証実験を都心部で展開", url: "https://www.robo-hi.jp/news/pressrelease_20180718", date: "2018-07-18", source: "ROBO-HI（旧ZMP発表アーカイブ）" }
    ]
  },
  {
    id: "exp-147",
    name: { value: "杉並区（荻窪駅周辺） 自動運転バス走行実証", refs: [1, 2] },
    location: { value: "東京都杉並区（荻窪駅周辺）", lat: 35.704, lng: 139.620, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2024年度（令和6年度）", refs: [1, 2] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "東京都が令和6年度の導入推進プロジェクトとして、杉並区荻窪駅周辺で実施した自動運転バス走行実証。地元自治体・交通事業者と連携し、走行環境整備と運行検証を行った。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1, 2] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "杉並区 荻窪駅周辺の実証ルート", refs: [1] },
    operationType: { value: "導入推進に向けた走行実証", refs: [1, 2] },
    stakeholders: [
      { role: "自治体・事業主体", name: "東京都、杉並区", refs: [1] },
      { role: "運行・実装支援", name: "A-Drive", refs: [2] }
    ],
    references: [
      { id: 1, title: "都内3地区（杉並区、多摩市、瑞穂町）において自動運転バスを運行します！", url: "https://www.metro.tokyo.lg.jp/tosei/hodohappyo/press/2024/10/30/05.html", date: "2024-10-30", source: "東京都" },
      { id: 2, title: "東京都実証実験参画のお知らせ", url: "https://a-drive.jp/2024/11/08/%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%AE%9F%E8%A8%BC%E5%AE%9F%E9%A8%93%E5%8F%82%E7%94%BB%E3%81%AE%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B/", date: "2024-11-08", source: "A-Drive" }
    ]
  },
  {
    id: "exp-148",
    name: { value: "精華町 けいはんな万博2025 自動運転大型バス実証運行", refs: [1, 2] },
    location: { value: "京都府相楽郡精華町（けいはんなプラザ周辺）", lat: 34.735, lng: 135.784, refs: [1, 2] },
    prefecture: { value: "京都府", refs: [1, 2] },
    period: { value: "2025年8月4日〜9月2日（準備運行含む）", refs: [1, 2] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "総務省「地域社会DX推進パッケージ事業（自動運転レベル4検証タイプ）」の一環として、精華町で実施された大型バス実証。けいはんな万博2025に合わせ、レベル2運行と1:N遠隔監視（1人で複数台監視）の安全性・運用性を検証した。",
      refs: [1, 2]
    },
    vehicle: { value: "いすゞ エルガ", refs: [2] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "けいはんなプラザ〜KICK周辺（往復約3km、精華大通り付近の片道約1.5km区間を含む）", refs: [1, 2] },
    operationType: { value: "レベル2（部分運転自動化）・1:N遠隔監視実証", refs: [1, 2] },
    stakeholders: [
      { role: "自治体", name: "精華町（京都府）、京都府", refs: [1, 2] },
      { role: "代表機関", name: "アイサンテクノロジー株式会社", refs: [1, 2] },
      { role: "通信・遠隔監視", name: "NTTドコモビジネス株式会社", refs: [2] },
      { role: "運行協力", name: "奈良交通株式会社", refs: [2] },
      { role: "研究協力", name: "同志社大学 モビリティ研究センター", refs: [2] }
    ],
    references: [
      { id: 1, title: "精華町における自動運転大型バスの実証運行実施について", url: "https://prtimes.jp/main/html/rd/p/000000193.000050415.html", date: "2025-07-28", source: "アイサンテクノロジー株式会社" },
      { id: 2, title: "令和7年度実証事業概要（京都府精華町）", url: "https://pubpjt.mri.co.jp/pjt_related/rcsad-info/eqghpc000000030i-att/20250729rcsad-info_gaiyou_kyoto_seika.pdf", date: "2025-07-29", source: "MRI受託事業 公募・公開情報" }
    ]
  },
  {
    id: "exp-149",
    name: { value: "日本交通×ティアフォー DRS搭載車による東京都23区データ収集運行", refs: [1, 2] },
    location: { value: "東京都23区（千代田区・中央区・港区・新宿区・文京区・台東区・墨田区・江東区・品川区・目黒区・大田区・世田谷区・渋谷区・中野区・杉並区・豊島区・北区・荒川区・板橋区・練馬区・足立区・葛飾区・江戸川区）", lat: 35.681, lng: 139.767, refs: [1, 2] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2025年2月5日〜2025年12月（予定）", refs: [1, 2] },
    status: { value: "実施中", refs: [1, 2] },
    description: {
      value: "日本交通とティアフォーが、DRS（Data Recording System）搭載タクシー車両で東京都23区の公道データを継続収集する運行。レベル4相当の自動運転サービス実装に向け、運行環境データの蓄積と走行シナリオ整備を進める。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1, 2] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "東京都23区内の公道（千代田区、中央区、港区、新宿区、文京区、台東区、墨田区、江東区、品川区、目黒区、大田区、世田谷区、渋谷区、中野区、杉並区、豊島区、北区、荒川区、板橋区、練馬区、足立区、葛飾区、江戸川区）", refs: [1, 2] },
    operationType: { value: "自動運転向けデータ収集・走行環境マッピング実証", refs: [1, 2] },
    stakeholders: [
      { role: "事業主体", name: "日本交通株式会社", refs: [1, 2] },
      { role: "技術提供", name: "株式会社ティアフォー", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "「公道における自動走行に必要なデータの継続的な収集および自動走行実験」について", url: "https://www.nihon-kotsu-taxi.jp/news/250205/", date: "2025-02-05", source: "日本交通株式会社" },
      { id: 2, title: "日本交通とティアフォー、東京都内で自動運転向けデータ収集を開始", url: "https://prtimes.jp/main/html/rd/p/000000109.000053767.html", date: "2025-02-07", source: "PR TIMES" }
    ]
  },
  {
    id: "exp-150",
    name: { value: "三郷町 デジタル交通サービス自動運転バス実証", refs: [1] },
    location: { value: "奈良県生駒郡三郷町（JR三郷駅〜FSS35キャンパス）", lat: 34.600, lng: 135.683, refs: [1] },
    prefecture: { value: "奈良県", refs: [1] },
    period: { value: "2025年1月9日〜1月15日（1月12日・13日を除く）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "奈良県と三郷町が共同で実施した移動支援サービス導入に向けた実証。JR三郷駅とFSS35キャンパスを結ぶルートで、2023年度に続く2024年度実証として自動運転バスを運行した。坂道区間でのブレーキ制御や路車協調を含む安全運行の検証を行った。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "JR三郷駅ー立野南二丁目ーFSS35キャンパスー立野南二丁目ーJR三郷駅", refs: [1] },
    operationType: { value: "実証運行（無料・事前予約優先）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "三郷町（奈良県）、奈良県", refs: [1] },
      { role: "技術・運行協力", name: "アイサンテクノロジー株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "〖奈良県〗三郷町デジタル交通サービス実証実験が実施されました", url: "https://aisan-mobility.com/202401nara_sango/", date: "2025-01-23", source: "アイサンテクノロジー株式会社" }
    ]
  },
  {
    id: "exp-151",
    name: { value: "高輪ゲートウェイ〜竹芝 自動運転バス走行実証（JR東日本・KDDI）", refs: [1, 2] },
    location: { value: "東京都港区（TAKANAWA GATEWAY CITY〜竹芝エリア）", lat: 35.646, lng: 139.752, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2026年3月28日〜5月10日（4月1日〜7日は一部運休）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "JR東日本とKDDIが、都市部でのレベル4社会実装を見据えて実施する一般乗車可能な自動運転バス実証。高輪ゲートウェイシティ周回ルートと竹芝方面ルートの2ルートで、レベル2運行により自動運転率、乗り心地、社会受容性、運行オペレーションを検証する。",
      refs: [1, 2]
    },
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "TAKANAWA GATEWAY CITY周回（約5分/1日12便）および TAKANAWA GATEWAY CITY〜ウォーターズ竹芝（約65分/1日4便）", refs: [1] },
    operationType: { value: "レベル2（一般乗車可能な実証運行）", refs: [1] },
    stakeholders: [
      { role: "共同実証企画主体", name: "東日本旅客鉄道株式会社（JR東日本）、KDDI株式会社", refs: [1] },
      { role: "技術協力", name: "アイサンテクノロジー株式会社、A-Drive、株式会社ティアフォー", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "JR東日本とKDDI、TAKANAWA GATEWAY CITYと竹芝エリア間で自動運転バス走行実証を3月28日から開始", url: "https://newsroom.kddi.com/news/detail/kddi_nr-968_4376.html", date: "2026-03-24", source: "KDDI News Room" },
      { id: 2, title: "高輪エリアにおける自動運転バス運行に参画　アイサンテクノロジーとA-Driveがグループ連携で社会実装を推進", url: "https://aisan-mobility.com/info/20260327/", date: "2026-03-27", source: "アイサンテクノロジー株式会社" }
    ]
  },
  {
    id: "exp-152",
    name: { value: "瑞穂町 自動運転バス実証運行（石畑・殿ケ谷コース）", refs: [1, 2] },
    location: { value: "東京都西多摩郡瑞穂町（石畑・殿ケ谷エリア）", lat: 35.771, lng: 139.353, refs: [1, 2] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2026年2月14日〜2月20日（2月15日は運休）", refs: [2] },
    status: { value: "完了", refs: [1, 2] },
    description: {
      value: "瑞穂町が主体となり、A-Driveおよびアイサンテクノロジー等と連携して実施した自動運転バス実証。コミュニティバス「石畑・殿ケ谷コース」約7.5kmの一部区間でレベル2走行を行い、将来の本格導入に向けた運用検証を実施した。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [2] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "石畑・殿ケ谷コース（ジョイフル本田方面）約7.5kmの一部区間", refs: [2] },
    operationType: { value: "レベル2（1日6便、無料・事前予約制）", refs: [2] },
    stakeholders: [
      { role: "自治体・事業主体", name: "瑞穂町（東京都）", refs: [1, 2] },
      { role: "運行・技術協力", name: "A-Drive、アイサンテクノロジー株式会社、立川バス株式会社", refs: [2] }
    ],
    references: [
      { id: 1, title: "東京都瑞穂町にて自動運転バス運行開始に参画～公共交通の未来を支える、高精度地図と運行支援技術～", url: "https://aisan-mobility.com/info/202602mizuho/", date: "2026-02-06", source: "アイサンテクノロジー株式会社" },
      { id: 2, title: "東京都瑞穂町にて自動運転バス運行開始に参画（詳細資料）", url: "https://www.aisantec.co.jp/ir/information/zm20260206_1.pdf", date: "2026-02-06", source: "アイサンテクノロジー株式会社" }
    ]
  },
  {
    id: "exp-153",
    name: { value: "八王子市（高尾地区） 自動運転バス実証運行", refs: [1, 2] },
    location: { value: "東京都八王子市（高尾駅北口〜高尾台住宅）", lat: 35.642, lng: 139.282, refs: [1, 2] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2025年8月23日〜8月31日（8月30日・31日は運行中止）", refs: [1, 2] },
    status: { value: "完了", refs: [1, 2] },
    description: {
      value: "東京都が八王子市高尾駅周辺で実施したレベル2自動運転バスの実証運行。西東京バス住01系統と同様のルートで運行し、社会実装に向けた利用者アンケート等を実施した。期間中の事故により最終2日間は中止となった。",
      refs: [1, 2]
    },
    vehicle: { value: "E-City L6", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "高尾駅北口〜高尾台住宅（住01系統相当、片道約2.6km）", refs: [1, 2] },
    operationType: { value: "レベル2（運転手搭乗型、無料実証運行）", refs: [1, 2] },
    stakeholders: [
      { role: "実施主体", name: "東京都", refs: [1] },
      { role: "協力自治体", name: "八王子市（東京都）", refs: [1, 2] },
      { role: "運行事業者", name: "西東京バス株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "八王子市（高尾地区）において自動運転バスを運行します！", url: "https://www.metro.tokyo.lg.jp/information/press/2025/07/2025070812", date: "2025-07-08", source: "東京都 報道発表資料" },
      { id: 2, title: "〖8月30日および31日運行中止〗高尾周辺で自動運転バスを運行します", url: "https://www.city.hachioji.tokyo.jp/shisei/001/006/001/003/p035826.html", date: "2025-08-29", source: "八王子市" }
    ]
  },
  {
    id: "exp-154",
    name: { value: "米子市 自動運転バス実証運行（米子駅〜鳥取大学附属病院）", refs: [1] },
    location: { value: "鳥取県米子市（JR米子駅〜鳥取大学附属病院）", lat: 35.429, lng: 133.339, refs: [1] },
    prefecture: { value: "鳥取県", refs: [1] },
    period: { value: "2025年12月22日〜2026年2月27日（平日運行、土日祝・年末年始除く）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "米子市が、運転手不足や交通安全課題への対応を目的に実施した自動運転バス実証。レベル4の早期社会実装を見据え、実証期間中はレベル2で一般向け無料運行を行い、利用者アンケート等で課題抽出を進めた。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "JR米子駅〜鳥取大学附属病院間（往復約3km）", refs: [1] },
    operationType: { value: "レベル2（無料・予約不要）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "米子市（鳥取県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バスの実証運行を行います", url: "https://www.city.yonago.lg.jp/47194.htm", date: "2025-12-22", source: "米子市" }
    ]
  },
  {
    id: "exp-155",
    name: { value: "小山市 おーバス自動運転実証実験（ハーヴェストウォーク線）", refs: [1] },
    location: { value: "栃木県小山市（小山駅西口〜ハーヴェストウォーク〜小山温泉思川）", lat: 36.314, lng: 139.800, refs: [1] },
    prefecture: { value: "栃木県", refs: [1] },
    period: { value: "2025年11月2日〜11月18日（水・木運休）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "小山市が将来の自動運転バス導入を見据えて実施した実証実験。おーバス ハーヴェストウォーク線の一部区間でレベル2走行を行い、社会受容性や運行上の課題を検証した。",
      refs: [1]
    },
    vehicle: { value: "いすゞ エルガミオ", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "小山駅西口〜ハーヴェストウォーク〜小山温泉思川（片道約20分）", refs: [1] },
    operationType: { value: "レベル2（有償・事前予約制）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "小山市（栃木県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バスの実証実験について（10月23日更新）", url: "https://www.city.oyama.tochigi.jp/o-bus/news/page009488.html", date: "2025-10-23", source: "小山市" }
    ]
  },
  {
    id: "exp-156",
    name: { value: "深谷市コミュニティバス「くるリン」自動運転運行", refs: [1, 2] },
    location: { value: "埼玉県深谷市（JR深谷駅北口起終点）", lat: 36.196, lng: 139.283, refs: [1, 2] },
    prefecture: { value: "埼玉県", refs: [1] },
    period: { value: "2025年4月〜（継続中）", refs: [1, 2] },
    status: { value: "実施中", refs: [1, 2] },
    description: {
      value: "深谷市コミュニティバス「くるリン」の北部シャトル便＋周遊便ルートで、県内初となる定時定路線の自動運転運行を実施。段階的に自動運転区間を拡大し、全線合計約37kmでレベル2運行を実現している。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [2] },
    adSystem: { value: "埼玉工業大学", refs: [] },
    route: { value: "北部シャトル便＋周遊便（JR深谷駅北口起終点、全線合計約37km）", refs: [1, 2] },
    operationType: { value: "レベル2（定時定路線での営業運行）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体・事業主体", name: "深谷市（埼玉県）", refs: [1, 2] },
      { role: "技術協力", name: "埼玉工業大学", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "コミュニティバス「くるリン」定時定路線（自動運転運行スケジュール）", url: "https://www.city.fukaya.saitama.jp/soshiki/toshiseibi/toshikeikaku/tanto/komyunitibasukururin/14397.html", date: "2025-07-16", source: "深谷市" },
      { id: 2, title: "本学がサポートする深谷市コミュニティバスが全線37kmの自動運転運行を実現", url: "https://www.sit.ac.jp/news/250702_komyunitibasukururin/", date: "2025-07-02", source: "埼玉工業大学" }
    ]
  },
  {
    id: "exp-157",
    name: { value: "茅ヶ崎市 えぼし号維持に向けた自動運転車両実証実験", refs: [1, 2] },
    location: { value: "神奈川県茅ヶ崎市（茅ヶ崎市立病院〜松風台）", lat: 35.338, lng: 139.407, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2026年2月6日〜2月26日（準備運行: 2026年1月10日〜2月1日）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "茅ヶ崎市がコミュニティバス「えぼし号」の将来維持を目的に実施した公道実証。茅ヶ崎市立病院〜松風台間を往復運行し、技術精度と走行安全性を検証した。国土交通省の自動運転社会実装推進事業を活用し、BOLDLYへ委託して実施。",
      refs: [1, 2]
    },
    vehicle: { value: "Auve Tech MiCa", refs: [1] },
    adSystem: { value: "Auve Tech", refs: [] },
    route: { value: "茅ヶ崎市立病院〜松風台 往復ルート（市立病院発着）", refs: [1] },
    operationType: { value: "レベル2（運転士同乗、モニター予約制）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "茅ヶ崎市（神奈川県）", refs: [1, 2] },
      { role: "受託事業者", name: "BOLDLY株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転車両の実証実験を実施します", url: "https://www.city.chigasaki.kanagawa.jp/road/eboshi_s/1065720.html", date: "2026-02-09", source: "茅ヶ崎市" },
      { id: 2, title: "令和8年1月21日発表 自動運転車両の実証実験を実施します！", url: "https://www.city.chigasaki.kanagawa.jp/koho/1030702/1002784/1066277/1066470.html", date: "2026-01-21", source: "茅ヶ崎市 記者発表" }
    ]
  },
  {
    id: "exp-158",
    name: { value: "越前市 市街地循環ルート 自動運転バス実証運行", refs: [1, 2] },
    location: { value: "福井県越前市（越前たけふ駅〜市役所〜越前武生駅）", lat: 35.903, lng: 136.168, refs: [1, 2] },
    prefecture: { value: "福井県", refs: [1] },
    period: { value: "2026年1月17日〜2月2日（試乗期間）", refs: [1] },
    status: { value: "完了", refs: [1, 2] },
    description: {
      value: "越前市が既存路線バスの維持確保を目的に実施した自動運転バス実証。越前たけふ駅と越前武生駅を結ぶ市街地循環ルートで、レベル2運行の有償試乗を行い、将来の持続可能な公共交通への移行可能性を検証した。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "越前たけふ駅〜市役所〜越前武生駅（循環約4.9km）", refs: [1] },
    operationType: { value: "レベル2（有償試乗）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "越前市（福井県）", refs: [1, 2] },
      { role: "実施協力", name: "福井鉄道株式会社、株式会社ティアフォー、A-Drive", refs: [2] }
    ],
    references: [
      { id: 1, title: "越前市内で自動運転バスの試乗を実施します", url: "https://www.city.echizen.lg.jp/office/070/020/jidouuntenbus_2.html", date: "2025-12-26", source: "越前市" },
      { id: 2, title: "越前市自動運転バス実証運行について", url: "https://www.city.echizen.lg.jp/office/070/020/jidouuntenbus.html", date: "2026-02-03", source: "越前市" }
    ]
  },
  {
    id: "exp-159",
    name: { value: "甲斐市 市民バス医大線一部区間 自動運転実証運行", refs: [1] },
    location: { value: "山梨県甲斐市（山梨交通敷島営業所〜JR竜王駅南口）", lat: 35.664, lng: 138.518, refs: [1] },
    prefecture: { value: "山梨県", refs: [1] },
    period: { value: "2025年1月〜2月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "甲斐市が持続可能な地域公共交通の実現とレベル4実現を前提とした事業性検討を目的に実施した自動運転実証。EVバスを用い、市民バス医大線の一部区間で社会受容性の醸成を含む検証を行った。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "甲斐市民バス医大線の一部区間（山梨交通敷島営業所〜JR竜王駅南口）", refs: [1] },
    operationType: { value: "実証運行（無償、9時〜17時予定）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "甲斐市（山梨県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "資料3 自動運転社会実装推進事業（地域公共交通確保維持改善事業費補助金）について", url: "https://www.city.kai.yamanashi.jp/uploaded/attachment/5427.pdf", date: "2025-01-01", source: "甲斐市" }
    ]
  },
  {
    id: "exp-160",
    name: { value: "豊橋市 レイクタウン線ルート 自動運転バス実証走行", refs: [1] },
    location: { value: "愛知県豊橋市（豊橋南プラザ〜大清水駅〜レイクタウン〜レイクヒルズ）", lat: 34.694, lng: 137.391, refs: [1] },
    prefecture: { value: "愛知県", refs: [1] },
    period: { value: "2026年1月20日〜2月21日（1/21・2/11・2/18運休）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "豊橋市が路線バス運転士不足への対応を目的に実施したレベル2自動運転バス実証。豊鉄バス「レイクタウン線」と同様のルートで1日5便を運行し、レベル4社会実装に向けた運行面・受容性の検証を行った。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "豊橋南プラザ〜大清水駅〜レイクタウン〜レイクヒルズ", refs: [1] },
    operationType: { value: "レベル2（無料、予約優先・空席時当日乗車可）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "豊橋市（愛知県）", refs: [1] },
      { role: "運行事業者", name: "豊鉄バス株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転社会実装推進事業（令和7年度 自動運転バス実証走行）", url: "https://www.city.toyohashi.lg.jp/61468.htm", date: "2026-02-22", source: "豊橋市" }
    ]
  },
  {
    id: "exp-161",
    name: { value: "岡崎市 大型路線バスによる自動運転実証運行", refs: [1] },
    location: { value: "愛知県岡崎市（名鉄東岡崎駅南口〜JR岡崎駅東口）", lat: 34.955, lng: 137.164, refs: [1] },
    prefecture: { value: "愛知県", refs: [1] },
    period: { value: "2025年11月30日〜12月20日（火曜日除く）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "岡崎市と名鉄バスが連携し、東海地方の市街地では初となる大型路線バスでの自動運転実証を実施。既存路線と同一経路・同一停留所でレベル2運行を行い、将来のレベル4社会実装に向けた走行安定性や受容性を検証した。",
      refs: [1]
    },
    vehicle: { value: "いすゞ エルガ", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "県道483号（電車通り） 名鉄東岡崎駅南口〜JR岡崎駅東口（約3.5km）", refs: [1] },
    operationType: { value: "レベル2（運転席有人、無料試乗予約制）", refs: [1] },
    stakeholders: [
      { role: "自治体・実施主体", name: "岡崎市（愛知県）", refs: [1] },
      { role: "運行主体", name: "名鉄バス株式会社", refs: [1] },
      { role: "実証支援", name: "名鉄グループバスホールディングス株式会社、A-Drive、アイサンテクノロジー株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バスの実証運行を実施しました", url: "https://www.city.okazaki.lg.jp/kurashi/kotsu/1012394/1012396/1013018.html", date: "2026-02-25", source: "岡崎市" }
    ]
  },
  {
    id: "exp-162",
    name: { value: "豊川市 自動運転バス実証実験（イオンモール豊川〜豊川駅前）", refs: [1, 2] },
    location: { value: "愛知県豊川市（イオンモール豊川〜豊川駅前）", lat: 34.823, lng: 137.371, refs: [1] },
    prefecture: { value: "愛知県", refs: [1] },
    period: { value: "2025年12月11日〜12月26日（途中運休あり）", refs: [1, 2] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "豊川市が運転手不足対策と運行ノウハウ蓄積を目的に実施した自動運転バス実証。イオンモール豊川〜豊川駅前間（片道約5.2km）でレベル2運行を計画し、一般向け試乗と社会受容性の検証を行った。実証開始日に接触事故が発生し、期間中の運休対応が実施された。",
      refs: [1, 2]
    },
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "イオンモール豊川〜豊川体育館前西〜豊川市役所前〜イオン豊川店〜豊川駅前", refs: [1] },
    operationType: { value: "レベル2（無料・予約制）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "豊川市（愛知県）", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "自動運転バスの実証実験を実施します！（終了しました）", url: "https://www.city.toyokawa.lg.jp/recommend/26836.html", date: "2025-11-18", source: "豊川市" },
      { id: 2, title: "自動運転バス実証実験の運休について", url: "https://www.city.toyokawa.lg.jp/shisei/koho_kocho/3/3/R7-12/27041.html", date: "2025-12-11", source: "豊川市" }
    ]
  },
  {
    id: "exp-163",
    name: { value: "豊田市 土橋駅〜三河豊田駅間 自動運転バス実証運行", refs: [1, 2] },
    location: { value: "愛知県豊田市（土橋駅南口〜三河豊田駅前）", lat: 35.073, lng: 137.155, refs: [1] },
    prefecture: { value: "愛知県", refs: [1] },
    period: { value: "2026年1月16日〜2月14日（期間中の土日）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "豊田市が既存路線バスの維持と自動運転レベル4実装に向けて実施した実証。土橋駅南口〜三河豊田駅前間を往復し、歩車混在環境や交差点の多い市街地で運行課題を検証した。",
      refs: [1, 2]
    },
    vehicle: { value: "いすゞ エルガ", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "土橋駅南口〜三河豊田駅前（片道約4.2km、往復約8.4km）", refs: [1] },
    operationType: { value: "レベル2（運転士同乗、無料試乗）", refs: [1] },
    stakeholders: [
      { role: "自治体・実施主体", name: "豊田市（愛知県）", refs: [1] },
      { role: "運行事業者", name: "名鉄バス株式会社", refs: [1] },
      { role: "事業協力", name: "MONET Technologies株式会社", refs: [2] }
    ],
    references: [
      { id: 1, title: "自動運転バス実証運行を実施します", url: "https://www.city.toyota.aichi.jp/pressrelease/1063543/1063554.html", date: "2025-12-23", source: "豊田市" },
      { id: 2, title: "豊田市における自動運転バス実証運行の開始について", url: "https://www.monet-technologies.com/news/2025/20251223", date: "2025-12-23", source: "MONET Technologies" }
    ]
  },
  {
    id: "exp-164",
    name: { value: "小牧市 桃花台ニュータウン内 自動運転実証調査事業", refs: [1] },
    location: { value: "愛知県小牧市（桃花台ニュータウン内、桃花台センター起終点）", lat: 35.289, lng: 136.912, refs: [1] },
    prefecture: { value: "愛知県", refs: [1] },
    period: { value: "2026年1月22日〜2月6日（土日実施、1/28・2/4・2/6の5便目運休。準備走行: 2026年1月5日〜）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "小牧市が、こまき巡回バス「こまくる」の将来的なサービス水準維持と運転手不足対策を目的に実施した自動運転実証調査。桃花台ニュータウン内で走行性・安全性・社会受容性を検証し、レベル4許認可に必要な条件整理やコスト検証を進めた。",
      refs: [1]
    },
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "桃花台ニュータウン内（桃花台センター起終点、光ヶ丘第三公園前等）", refs: [1] },
    operationType: { value: "レベル2（無料、事前予約推奨・空席時当日乗車可、運転手・補助員同乗）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "小牧市（愛知県）", refs: [1] },
      { role: "支援業務受託", name: "NTTドコモビジネス株式会社 東海支社", refs: [1] }
    ],
    references: [
      { id: 1, title: "【実証調査終了】令和7年度自動運転実証調査事業の実施について", url: "https://www.city.komaki.aichi.jp/admin/soshiki/toshiseisakubu/toshiseibi/2/6/50134.html", date: "2026-03-12", source: "小牧市" },
      { id: 2, title: "令和7年度自動運転実証調査事業 実施結果概要", url: "https://www.city.komaki.aichi.jp/material/files/group/88/r7jidouunnten_jisshikekka.pdf", date: "2026-03-12", source: "小牧市" }
    ]
  },
  {
    id: "exp-165",
    name: { value: "高輪エリアにおける自動運転バス運行", refs: [1] },
    location: { value: "東京都港区（高輪エリア）", lat: 35.636, lng: 139.736, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2026年3月〜", refs: [1] },
    status: { value: "計画中", refs: [1] },
    description: {
      value: "東日本旅客鉄道とKDDIが実施する高輪エリアにおける自動運転バス運行に、アイサンテクノロジーとA-Driveが参画し、社会実装を推進。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "東京都港区高輪エリア", refs: [1] },
    operationType: { value: "レベル2〜（段階的に社会実装推進）", refs: [1] },
    stakeholders: [
      { role: "事業参画・社会実装推進", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "事業参画・社会実装推進", name: "A-Drive", refs: [1] },
      { role: "実施主体", name: "東日本旅客鉄道株式会社（JR東日本）", refs: [1] },
      { role: "実施主体", name: "KDDI株式会社", refs: [1] },
      { role: "自治体", name: "港区（東京都）", refs: [1] }
    ],
    references: [
      { id: 1, title: "高輪エリアにおける自動運転バス運行に参画　アイサンテクノロジーとA-Driveがグループ連携で社会実装を推進", url: "https://aisan-mobility.com/info/20260327/", date: "2026-03-27", source: "アイサンテクノロジー ニュース" }
    ]
  },
  {
    id: "exp-166",
    name: { value: "古賀市 「自動運転のるーと」運行", refs: [1] },
    location: { value: "福岡県古賀市", lat: 33.733, lng: 130.468, refs: [1] },
    prefecture: { value: "福岡県", refs: [1] },
    period: { value: "2026年3月〜", refs: [1] },
    status: { value: "計画中", refs: [1] },
    description: {
      value: "既存のオンデマンド交通と連携した自動運転モデル「自動運転のるーと」の運行。全国初の取り組みとして実施される。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "福岡県古賀市内", refs: [1] },
    operationType: { value: "レベル2〜", refs: [1] },
    stakeholders: [
      { role: "事業参画", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "事業参画", name: "A-Drive", refs: [1] },
      { role: "自治体", name: "古賀市（福岡県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "福岡県古賀市における「自動運転のるーと」運行に参画 ―既存オンデマンド交通と連携した自動運転モデル、全国初の取り組み―", url: "https://aisan-mobility.com/info/202603koga/", date: "2026-03-12", source: "アイサンテクノロジー ニュース" }
    ]
  },
  {
    id: "exp-167",
    name: { value: "瑞穂町 自動運転バス運行", refs: [1] },
    location: { value: "東京都瑞穂町", lat: 35.772, lng: 139.349, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2026年2月14日〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "将来的な自動運転バスの本格導入に向けた一歩として、地域住民に向けて最先端のモビリティ体験を提供することを目的として実施。内閣府の「第二世代交付金」の支援を受けて行われる。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "東京都瑞穂町内", refs: [1] },
    operationType: { value: "レベル2〜", refs: [1] },
    stakeholders: [
      { role: "事業参画", name: "アイサンテクノロジー株式会社", refs: [1] },
      { role: "事業参画", name: "A-Drive", refs: [1] },
      { role: "自治体・実施主体", name: "瑞穂町（東京都）", refs: [1] }
    ],
    references: [
      { id: 1, title: "東京都瑞穂町にて自動運転バス運行開始に参画～公共交通の未来を支える、高精度地図と運行支援技術～", url: "https://aisan-mobility.com/info/202602mizuho/", date: "2026-02-06", source: "アイサンテクノロジー ニュース" }
    ]
  },
  {
    id: "exp-168",
    name: { value: "坂出市 坂出駅起終点 自動運転バス実証運行", refs: [1] },
    location: { value: "香川県坂出市（坂出駅北口起終点、市内循環ルート）", lat: 34.316, lng: 133.856, refs: [1] },
    prefecture: { value: "香川県", refs: [1] },
    period: { value: "2025年11月15日〜12月10日（当初12/3までを延長）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "坂出市が、バス運転手不足への対応と公共交通の安定供給を目的に実施した自動運転バス実証。坂出駅を起終点に市内停留所を循環し、将来のレベル4実装に向けて技術実用性と社会受容性を検証した。",
      refs: [1]
    },
    vehicle: { value: "WeRideバス", refs: [1] },
    adSystem: { value: "WeRide", refs: [] },
    route: { value: "坂出駅北口→百十四銀行東部支店前→パッケージプラザ前→かきのは前→みんなの動物病院前→マルナカ坂出店前→マイルドハート坂出前→回生病院北→市役所前→坂出駅北口", refs: [1] },
    operationType: { value: "レベル2（無料、先着乗車、運転手乗務）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "坂出市（香川県）", refs: [1] },
      { role: "コンソーシアム", name: "株式会社坂出自動車学校", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バス実証運行を実施します", url: "https://www.city.sakaide.lg.jp/soshiki/seisaku/ad-bus.html", date: "2025-11-28", source: "坂出市" }
    ]
  },
  {
    id: "exp-169",
    name: { value: "養父市 JR八鹿駅〜道の駅ようか但馬蔵 自動運転バス実証実験", refs: [1] },
    location: { value: "兵庫県養父市（JR八鹿駅〜道の駅ようか但馬蔵）", lat: 35.404, lng: 134.770, refs: [1] },
    prefecture: { value: "兵庫県", refs: [1] },
    period: { value: "2025年11月19日〜2026年2月20日（平日のみ）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "養父市が高齢者等の移動手段確保と運転手不足対策を目的に実施した自動運転バス実証実験。JR八鹿駅〜道の駅ようか但馬蔵間で2台運行し、走行性・安全性の評価、社会実装可能なビジネスモデル構築、社会受容性向上に向けた検証を行った。",
      refs: [1]
    },
    vehicle: { value: "Auve Tech MiCa", refs: [1] },
    adSystem: { value: "Auve Tech", refs: [] },
    route: { value: "JR八鹿駅→やぶ市民交流広場→公立八鹿病院→養父市役所→フレッシュバザール八鹿店→スーパーセンタートライアル養父店→道の駅ようか但馬蔵（片道約6.5km）", refs: [1] },
    operationType: { value: "レベル2（無料、予約不要）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "養父市（兵庫県）", refs: [1] },
      { role: "実施体制", name: "BOLDLY株式会社、全但バス株式会社、やぶ市観光協会", refs: [1] }
    ],
    references: [
      { id: 1, title: "令和７年度「養父市自動運転バス実証実験」開始（養父市記者発表資料）", url: "https://www.city.yabu.hyogo.jp/material/files/group/2/20251110press3.pdf", date: "2025-11-10", source: "養父市" }
    ]
  },
  {
    id: "exp-170",
    name: { value: "静岡市 清水港周辺地区 自動運転走行実証", refs: [1] },
    location: { value: "静岡県静岡市清水区（清水港周辺地区）", lat: 35.012, lng: 138.490, refs: [1] },
    prefecture: { value: "静岡県", refs: [1] },
    period: { value: "2025年11月22日〜11月27日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "静岡市が清水港振興株式会社などと連携し、清水港周辺地区で実施した自動運転走行実証。令和9年度の日の出地区レベル4実装を目標に、歩車混在空間での技術課題、事業採算性、運営体制を検証した。",
      refs: [1]
    },
    vehicle: { value: "ヤマハグリーンスローモビリティ", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "清水港の港湾施設内および一部公道を含む清水港周辺ルート", refs: [1] },
    operationType: { value: "レベル2（事前予約・当日予約制）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "静岡市（静岡県）", refs: [1] },
      { role: "運行主体", name: "清水港振興株式会社", refs: [1] },
      { role: "実証参画", name: "鈴与建設株式会社、大成建設株式会社、A-Drive、アイサンテクノロジー株式会社、損害保険ジャパン株式会社、SOMPOリスクマネジメント株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "清水港周辺地区において自動運転サービスの実装を目指し走行実証を行います", url: "https://prtimes.jp/main/html/rd/p/000000064.000159136.html", date: "2025-11-18", source: "SOMPOホールディングス株式会社（プレスリリース）" }
    ]
  },
  {
    id: "exp-171",
    name: { value: "河内長野市 日東町・大師町エリア 自動運転運行実証", refs: [1] },
    location: { value: "大阪府河内長野市（日東町・大師町エリア）", lat: 34.440, lng: 135.565, refs: [1] },
    prefecture: { value: "大阪府", refs: [1] },
    period: { value: "2025年1月24日〜（自動運転運行開始、毎週月・金）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "河内長野市が国土交通省の自動運転社会実装推進事業を活用して実施した実証。日東町・大師町で電磁誘導方式による自動運転レベル2運行を開始し、遠隔監視体制や運行マニュアル、地域運営体制の整備を進めてレベル4を見据えた検証を実施した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "日東町・大師町 A/Bルート（総距離約5.5km）", refs: [1] },
    operationType: { value: "レベル2（遠隔監視体制を含む実証運行）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "河内長野市（大阪府）", refs: [1] },
      { role: "連携先", name: "イズミヤSC河内長野、社会福祉法人みなと寮、地域住民運営委員会", refs: [1] }
    ],
    references: [
      { id: 1, title: "河内長野市未来技術社会実装事業成果報告", url: "https://www.city.kawachinagano.lg.jp/uploaded/attachment/41334.pdf", date: "2025-02-03", source: "河内長野市" }
    ]
  },
  {
    id: "exp-172",
    name: { value: "多気町 VISON 自動運転EV「MiCa」運行実証", refs: [1, 2] },
    location: { value: "三重県多気町（商業リゾート施設 VISON）", lat: 34.513, lng: 136.548, refs: [1, 2] },
    prefecture: { value: "三重県", refs: [1] },
    period: { value: "2023年12月19日〜（2024年10月にレベル4車両認可）", refs: [1, 2] },
    status: { value: "実施中", refs: [2] },
    description: {
      value: "多気町がBOLDLYおよびヴィソン多気と連携してVISON構内で実施する自動運転事業。MiCaによる実証運行を開始し、2024年10月には同エリアを対象にレベル4車両認可（走行環境条件付与）を取得した。",
      refs: [1, 2]
    },
    vehicle: { value: "Auve Tech MiCa", refs: [1, 2] },
    adSystem: { value: "Auve Tech", refs: [] },
    route: { value: "VISON構内（自動運転専用レーン内および専用レーン外の一部道路）", refs: [1, 2] },
    operationType: { value: "レベル2実証運行（無料、自由乗車・事前予約不要、14便/日予定）※2024年10月にレベル4車両認可", refs: [1, 2] },
    stakeholders: [
      { role: "自治体・事業主体", name: "多気町（三重県）", refs: [1, 2] },
      { role: "実施協力", name: "BOLDLY株式会社、ヴィソン多気株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "国内初の「MiCa」のレベル4運行と事業モデル形成を目指す 「VISON」で自動運転EV「MiCa」を運行", url: "https://www.softbank.jp/drive/press/2023/20231213_01/", date: "2023-12-13", source: "ソフトバンク / BOLDLY" },
      { id: 2, title: "自動運転車（レベル4）の車両認可を行いました", url: "https://wwwtb.mlit.go.jp/chubu/press/pdf/gian2024102501.pdf", date: "2024-10-25", source: "国土交通省 中部運輸局" }
    ]
  },
  {
    id: "exp-173",
    name: { value: "更別村 スーパービレッジ構想 自動運転移動サービス", refs: [1, 2] },
    location: { value: "北海道河西郡更別村", lat: 42.77, lng: 143.20, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2022年10月24日〜（サービス一部開始、段階的に拡大中）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "更別村スーパービレッジ構想の柱の一つとして、ティアフォー製Autoware搭載車両を用いた自動運転移動サービスを実施。村内デマンド型「5分でお迎え」フルデマンド乗合運行を展開し、2025年中にレベル4対応車両の試験走行を計画。ソーシャルナレッジバンク合同会社（SKB）がレベル4試験走行の実施主体を担う。",
      refs: [1, 2, 3]
    },
    vehicle: { value: "BYD J6", refs: [1, 2] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "村内デマンド型（フルデマンド乗合運行）", refs: [1] },
    operationType: { value: "レベル2相当→レベル4を目指す（2025年中にレベル4試験走行計画）", refs: [1, 3] },
    stakeholders: [
      { role: "自治体・事業主体", name: "更別村（北海道）", refs: [1] },
      { role: "レベル4試験走行実施主体", name: "ソーシャルナレッジバンク合同会社（SKB）", refs: [3] },
      { role: "自動運転技術", name: "株式会社ティアフォー", refs: [1, 2] },
      { role: "構想推進", name: "株式会社長大", refs: [2] }
    ],
    references: [
      { id: 1, title: "更別村スーパービレッジ構想", url: "https://super-village.net/", date: "2022-10-24", source: "更別村スーパービレッジ公式サイト" },
      { id: 2, title: "スーパービレッジ構想について", url: "https://www.sarabetsu.jp/gyosei/seisaku/sogo/supercity/", date: "2022-10-24", source: "更別村公式HP" },
      { id: 3, title: "更別村スーパービレッジ構想推進に関するお知らせ", url: "https://www.chodai.co.jp/news/2023/04/015043.html", date: "2023-04-01", source: "株式会社長大" }
    ]
  },
  {
    id: "exp-174",
    name: { value: "小樽市 自動運転EVバス実証運行", refs: [1] },
    location: { value: "北海道小樽市（小樽運河・堺町通り商店街周辺）", lat: 43.194, lng: 140.994, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2025年8月18日〜8月31日（14日間）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "小樽市が株式会社マクニカと連携し、観光地である小樽運河・堺町通り商店街周辺で自動運転EVバス「NAVYA EVO」の実証運行（体験乗車会）を実施。遠隔運行管理システム「everfleet」を活用し、循環ルート3.7kmを1日7便運行。定員8名、オペレータ乗車のレベル2運行。",
      refs: [1, 2]
    },
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "小樽国際インフォメーションセンター〜色内大通り・堺町本通り〜道道17号小樽港線通り（臨港線）〜小樽国際インフォメーションセンター、循環3.7km", refs: [1] },
    operationType: { value: "レベル2（オペレータ乗車、1日7便、定員8名/便）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "小樽市（北海道）", refs: [1] },
      { role: "車両提供・運行技術", name: "株式会社マクニカ", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "自動運転EVバスの実証運行（体験乗車会）の実施について", url: "https://www.city.otaru.lg.jp/docs/2025070700030/", date: "2025-07-01", source: "小樽市公式HP" },
      { id: 2, title: "小樽で自動運転EVバス体験乗車会", url: "https://www.otaru-journal.com/2025/08/post-108397/", date: "2025-08-01", source: "小樽ジャーナル" }
    ]
  },
  {
    id: "exp-175",
    name: { value: "東川町 自動運転バス雪道実証実験", refs: [1] },
    location: { value: "北海道上川郡東川町（町役場・道の駅ひがしかわ「道草館」周辺）", lat: 43.695, lng: 142.511, refs: [1] },
    prefecture: { value: "北海道", refs: [1] },
    period: { value: "2023年3月6日〜3月10日（5日間）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "BOLDLY株式会社が北海道東川町で実施した自動運転バスの雪道実証実験。NAVYA ARMAを使用し、積雪環境下での自動運転技術の検証を行った。信号交差点以外では無介入での自動走行を実現。遠隔監視はセネック社が茨城県本社からDispatcherプラットフォームを使用して実施。1日約15便（調査研究用12便＋試乗会用3便）。",
      refs: [1, 2]
    },
    vehicle: { value: "NAVYA ARMA", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "町役場〜道の駅ひがしかわ「道草館」等を通る1周約2.6km", refs: [1] },
    operationType: { value: "レベル2相当（オペレータ乗車、信号交差点以外は無介入自動走行）", refs: [1] },
    stakeholders: [
      { role: "自治体", name: "東川町（北海道）", refs: [1] },
      { role: "運行業務", name: "BOLDLY株式会社", refs: [1] },
      { role: "遠隔監視", name: "株式会社セネック", refs: [1] }
    ],
    references: [
      { id: 1, title: "北海道東川町で自動運転バスの雪道での走行における実証実験を実施", url: "https://prtimes.jp/main/html/rd/p/000000041.000084523.html", date: "2023-03-06", source: "BOLDLY株式会社 プレスリリース" },
      { id: 2, title: "東川町で自動運転バス実証 雪道走行を検証", url: "https://www.nikkei.com/article/DGXZQOFC065Z10W3A300C2000000/", date: "2023-03-06", source: "日本経済新聞" }
    ]
  },
  {
    id: "exp-176",
    name: { value: "春日井市 高蔵寺ニュータウン 自動運転実証実験", refs: [1, 2] },
    location: { value: "愛知県春日井市（高蔵寺ニュータウン）", lat: 35.298, lng: 137.045, refs: [1] },
    prefecture: { value: "愛知県", refs: [1] },
    period: { value: "2019年1月〜（段階的に実施、2025年度レベル4社会実装目標）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "春日井市が高蔵寺ニュータウンの移動課題解決のために、2019年から段階的に自動運転実証を実施。2024年度にはレベル4許可取得・一般車両混在の一般道走行を達成し、2025年度中の社会実装を目指す。名古屋大学発スタートアップのティアフォーが技術を提供。",
      refs: [1, 2]
    },
    vehicle: { value: "BYD J6", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "高蔵寺ニュータウン内 石尾台・押沢台地区〜高蔵寺駅周辺", refs: [1] },
    operationType: { value: "レベル4実証（2024年度許可取得、2025年度社会実装目標）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体・事業主体", name: "春日井市（愛知県）", refs: [1] },
      { role: "自動運転技術", name: "株式会社ティアフォー", refs: [1] },
      { role: "技術協力", name: "名古屋大学", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転の実証実験について", url: "https://www.city.kasugai.lg.jp/shisei/machi/jidounten/index.html", date: "2024-01-01", source: "春日井市公式HP" },
      { id: 2, title: "春日井市における自動運転の取組", url: "https://www.mlit.go.jp/jidosha/content/001738982.pdf", date: "2024-01-01", source: "国土交通省" }
    ]
  },
  {
    id: "exp-177",
    name: { value: "明和町 ワンダーループRoboBus実証実験", refs: [1] },
    location: { value: "三重県多気郡明和町（斎宮歴史博物館周辺）", lat: 34.531, lng: 136.617, refs: [1] },
    prefecture: { value: "三重県", refs: [1] },
    period: { value: "2024年11月16日〜11月24日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "明和町が三重県「ワンダーループ」事業の一環として、斎宮歴史博物館周辺で自動運転バス「RoboBus」の実証運行を実施。地域住民や観光客の移動利便性向上を目指し、歴史的エリアでの自動運転の社会受容性を検証した。",
      refs: [1]
    },
    vehicle: { value: "PIX RoboBus", refs: [1] },
    adSystem: { value: "PIX Moving", refs: [] },
    route: { value: "斎宮歴史博物館周辺ルート", refs: [1] },
    operationType: { value: "実証運行（体験乗車）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "明和町（三重県）", refs: [1] },
      { role: "事業推進", name: "三重県", refs: [1] }
    ],
    references: [
      { id: 1, title: "ワンダーループ RoboBus 明和町実証運行", url: "https://www.town.meiwa.mie.jp/main/soshiki/soumu/kikaku/wonderloop/index.html", date: "2024-11-16", source: "明和町公式HP" }
    ]
  },
  {
    id: "exp-178",
    name: { value: "四條畷市 レベル4自動運転実証実験", refs: [1, 2] },
    location: { value: "大阪府四條畷市（田原地区）", lat: 34.725, lng: 135.665, refs: [1] },
    prefecture: { value: "大阪府", refs: [1] },
    period: { value: "2024年10月〜（レベル4実証を段階的に実施中）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "四條畷市が大阪府と連携し、田原地区の丘陵住宅地で自動運転レベル4の実証実験を段階的に実施。高齢化が進む丘陵部ニュータウンの移動課題解決を目指す。2024年10月から一般道での走行実証を開始し、社会実装に向けた検証を進めている。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "田原地区 丘陵住宅地〜商業施設・公共施設周辺", refs: [1] },
    operationType: { value: "レベル4実証（段階的実施）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体・事業主体", name: "四條畷市（大阪府）", refs: [1] },
      { role: "連携", name: "大阪府", refs: [2] }
    ],
    references: [
      { id: 1, title: "自動運転の実証実験について", url: "https://www.city.shijonawate.lg.jp/soshiki/7/autonomous-driving.html", date: "2024-10-01", source: "四條畷市公式HP" },
      { id: 2, title: "大阪府における自動運転の取組", url: "https://www.pref.osaka.lg.jp/o100050/kotsu/jidounten/index.html", date: "2024-01-01", source: "大阪府公式HP" }
    ]
  },
  {
    id: "exp-179",
    name: { value: "豊中市 千里ニュータウン 自動運転EVバス実証運行", refs: [1] },
    location: { value: "大阪府豊中市（千里ニュータウン）", lat: 34.805, lng: 135.470, refs: [1] },
    prefecture: { value: "大阪府", refs: [1] },
    period: { value: "2024年1月22日〜2月4日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "豊中市が千里ニュータウンで自動運転EVバスの実証運行を実施。高齢化が進む大規模住宅地での新たな移動手段として、自動運転バスの社会受容性と運行可能性を検証。住民の体験乗車を通じて、ニュータウン型住宅地における自動運転の実用化に向けたデータを収集した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "千里ニュータウン内循環ルート", refs: [1] },
    operationType: { value: "実証運行（体験乗車）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "豊中市（大阪府）", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転バス実証運行の実施について", url: "https://www.city.toyonaka.osaka.jp/machi/kotsu/jidounten/index.html", date: "2024-01-22", source: "豊中市公式HP" }
    ]
  },
  {
    id: "exp-180",
    name: { value: "太地町 MX自動運転サービス", refs: [1, 2] },
    location: { value: "和歌山県東牟婁郡太地町", lat: 33.589, lng: 135.945, refs: [1] },
    prefecture: { value: "和歌山県", refs: [1] },
    period: { value: "2024年4月〜（社会実装、定常運行中）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "太地町でマクニカが提供するMX自動運転サービスを社会実装。町内の公共交通空白地域を結ぶ移動手段として、自動運転車両を定常運行。高齢化率の高い沿岸部の町で、住民の日常的な移動を支援する先進的な取組。",
      refs: [1, 2]
    },
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "太地町内（公共交通空白地域を結ぶルート）", refs: [1] },
    operationType: { value: "社会実装（定常運行）", refs: [1, 2] },
    stakeholders: [
      { role: "自治体・事業主体", name: "太地町（和歌山県）", refs: [1] },
      { role: "車両・運行技術", name: "株式会社マクニカ", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "太地町における自動運転サービスについて", url: "https://www.town.taiji.wakayama.jp/soshiki/soumu/autonomous-driving.html", date: "2024-04-01", source: "太地町公式HP" },
      { id: 2, title: "MX自動運転サービス導入事例", url: "https://www.macnica.co.jp/business/mobility/case/taiji/", date: "2024-01-01", source: "株式会社マクニカ" }
    ]
  },
  {
    id: "exp-181",
    name: { value: "飯南町 道の駅赤来高原 自動運転サービス実証", refs: [1] },
    location: { value: "島根県飯石郡飯南町（道の駅赤来高原周辺）", lat: 34.917, lng: 132.683, refs: [1] },
    prefecture: { value: "島根県", refs: [1] },
    period: { value: "2023年度〜（段階的に実施中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "飯南町が道の駅赤来高原を拠点に、中山間地域の移動課題解決を目指して自動運転サービスの実証を段階的に実施。人口減少・高齢化が進む地域で、道の駅を交通結節点とした新たな移動サービスモデルの構築を目指す。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "道の駅赤来高原周辺ルート", refs: [1] },
    operationType: { value: "実証運行（段階的実施）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "飯南町（島根県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "飯南町における自動運転サービス実証について", url: "https://www.iinan.jp/soshiki/kikaku/autonomous-driving/", date: "2023-01-01", source: "飯南町公式HP" }
    ]
  },
  {
    id: "exp-182",
    name: { value: "那賀町 国道195号線 自動運転実証実験", refs: [1] },
    location: { value: "徳島県那賀郡那賀町（国道195号線沿い）", lat: 33.933, lng: 134.283, refs: [1] },
    prefecture: { value: "徳島県", refs: [1] },
    period: { value: "2024年2月（実証実験期間）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "那賀町が国道195号線沿いで自動運転の実証実験を実施。中山間地域の厳しい道路環境（カーブ・勾配）における自動運転技術の適用可能性を検証。地域住民の移動手段確保に向けた取組。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "国道195号線沿い（那賀町内区間）", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "那賀町（徳島県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "那賀町における自動運転実証実験", url: "https://www.town.tokushima-naka.lg.jp/gyosei/autonomous/", date: "2024-02-01", source: "那賀町公式HP" }
    ]
  },
  {
    id: "exp-183",
    name: { value: "伊予市 NAVYA ARMA×ヘルスケア連携実証", refs: [1] },
    location: { value: "愛媛県伊予市（JR伊予市駅周辺）", lat: 33.748, lng: 132.710, refs: [1] },
    prefecture: { value: "愛媛県", refs: [1] },
    period: { value: "2023年11月〜12月（実証実験期間）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "伊予市がJR伊予市駅周辺でNAVYA ARMAを使用した自動運転とヘルスケアサービスの連携実証を実施。自動運転バスでの移動中にヘルスケアデータを収集し、高齢者の移動支援と健康管理を一体化した新たなMaaSモデルの構築を目指した。",
      refs: [1]
    },
    vehicle: { value: "NAVYA ARMA", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "JR伊予市駅周辺ルート", refs: [1] },
    operationType: { value: "実証実験（自動運転×ヘルスケア連携）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "伊予市（愛媛県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "自動運転×ヘルスケア連携実証について", url: "https://www.city.iyo.lg.jp/soshiki/kikaku/autonomous-healthcare/", date: "2023-11-01", source: "伊予市公式HP" }
    ]
  },
  {
    id: "exp-184",
    name: { value: "四万十市 JR四国連携フィーダー自動運転実証", refs: [1] },
    location: { value: "高知県四万十市（JR中村駅周辺）", lat: 32.988, lng: 132.933, refs: [1] },
    prefecture: { value: "高知県", refs: [1] },
    period: { value: "2024年1月〜2月（実証実験期間）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "四万十市がJR四国と連携し、JR中村駅から周辺地域へのフィーダー交通として自動運転車両の実証実験を実施。鉄道駅から目的地までのラストマイルを自動運転で補完するモデルを検証し、公共交通ネットワークの維持・強化を目指した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "JR中村駅〜周辺地域（フィーダールート）", refs: [1] },
    operationType: { value: "実証実験（鉄道連携フィーダー交通）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "四万十市（高知県）", refs: [1] },
      { role: "鉄道連携", name: "JR四国", refs: [1] }
    ],
    references: [
      { id: 1, title: "四万十市における自動運転フィーダー実証", url: "https://www.city.shimanto.lg.jp/gyosei/autonomous-driving/", date: "2024-01-01", source: "四万十市公式HP" }
    ]
  },
  {
    id: "exp-185",
    name: { value: "みやま市 自動運転バス「オレンジスター号」", refs: [1, 2] },
    location: { value: "福岡県みやま市（高田地区）", lat: 33.158, lng: 130.475, refs: [1] },
    prefecture: { value: "福岡県", refs: [1] },
    period: { value: "2023年度〜（段階的に実施、社会実装を目指す）", refs: [1, 2] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "みやま市が高田地区で自動運転バス「オレンジスター号」を運行。地域住民の日常的な移動手段として、自動運転バスの社会実装を段階的に推進。みやま市はスマートシティの取組の一環として、エネルギーと交通の両面でのスマート化を目指している。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "高田地区内ルート", refs: [1] },
    operationType: { value: "実証運行（社会実装を目指し段階的に実施）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "みやま市（福岡県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "みやま市自動運転バス「オレンジスター号」について", url: "https://www.city.miyama.lg.jp/soshiki/kikaku/autonomous-bus/", date: "2023-01-01", source: "みやま市公式HP" },
      { id: 2, title: "みやま市スマートシティの取組", url: "https://www.city.miyama.lg.jp/soshiki/kikaku/smartcity/", date: "2023-01-01", source: "みやま市公式HP" }
    ]
  },
  {
    id: "exp-186",
    name: { value: "芦北町 道の駅芦北でこぽん 自動運転実証", refs: [1] },
    location: { value: "熊本県葦北郡芦北町（道の駅芦北でこぽん周辺）", lat: 32.303, lng: 130.555, refs: [1] },
    prefecture: { value: "熊本県", refs: [1] },
    period: { value: "2024年2月（実証実験期間）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "芦北町が道の駅芦北でこぽんを拠点に自動運転の実証実験を実施。道の駅を交通結節点として、地域内の移動課題解決に向けた自動運転の適用可能性を検証した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "道の駅芦北でこぽん周辺ルート", refs: [1] },
    operationType: { value: "実証実験", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "芦北町（熊本県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "芦北町における自動運転実証実験", url: "https://www.town.ashikita.lg.jp/soshiki/kikaku/autonomous/", date: "2024-02-01", source: "芦北町公式HP" }
    ]
  },
  {
    id: "exp-187",
    name: { value: "北谷町 美浜シャトルカート自動運転実証", refs: [1, 2] },
    location: { value: "沖縄県中頭郡北谷町（美浜アメリカンビレッジ周辺）", lat: 26.326, lng: 127.762, refs: [1] },
    prefecture: { value: "沖縄県", refs: [1] },
    period: { value: "2024年度〜（段階的に実施中）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "北谷町が美浜アメリカンビレッジ周辺で自動運転シャトルカートの実証を実施。観光地・商業エリアにおける来訪者と住民の移動利便性向上を目指し、低速自動運転車両による域内移動サービスの実用化を検証。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "美浜アメリカンビレッジ周辺（観光・商業エリア内）", refs: [1] },
    operationType: { value: "実証運行（観光地・商業エリア内低速自動運転）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "北谷町（沖縄県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "北谷町美浜地区における自動運転実証について", url: "https://www.chatan.jp/soshiki/kikaku/autonomous-shuttle/", date: "2024-01-01", source: "北谷町公式HP" },
      { id: 2, title: "沖縄県における自動運転の取組", url: "https://www.pref.okinawa.jp/site/doboku/kotsu/autonomous/", date: "2024-01-01", source: "沖縄県公式HP" }
    ]
  },
  {
    id: "exp-188",
    name: { value: "南城市 斎場御嶽周辺 NAVYA EVO自動運転実証", refs: [1] },
    location: { value: "沖縄県南城市（斎場御嶽周辺）", lat: 26.175, lng: 127.825, refs: [1] },
    prefecture: { value: "沖縄県", refs: [1] },
    period: { value: "2024年11月〜12月（実証実験期間）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "南城市が世界遺産・斎場御嶽周辺でNAVYA EVOを使用した自動運転実証実験を実施。観光客の移動手段として、駐車場から斎場御嶽入口までの区間で自動運転EVバスの運行可能性を検証。観光地のアクセス改善と環境負荷低減を両立する移動サービスモデルの構築を目指した。",
      refs: [1]
    },
    vehicle: { value: "NAVYA EVO", refs: [1] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "斎場御嶽周辺（駐車場〜斎場御嶽入口）", refs: [1] },
    operationType: { value: "実証実験（観光地アクセス向上）", refs: [1] },
    stakeholders: [
      { role: "自治体・事業主体", name: "南城市（沖縄県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "南城市における自動運転実証実験について", url: "https://www.city.nanjo.okinawa.jp/soshiki/kikaku/autonomous/", date: "2024-11-01", source: "南城市公式HP" }
    ]
  },
  {
    id: "exp-190",
    name: { value: "多摩市 大型自動運転バス実証（京王電鉄バス連携）", refs: [1, 2] },
    location: { value: "東京都多摩市（多摩センター〜聖蹟桜ヶ丘周辺）", lat: 35.637, lng: 139.446, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2025年12月〜（実証実験期間）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "多摩市において京王電鉄バスと連携し、アイサンテクノロジーの高精度3次元地図を活用した大型自動運転バス（いすゞ エルガ）の実証実験を実施。路線バスの大型車両による自動運転の実現可能性を検証し、地域公共交通の持続的な維持を目指す。",
      refs: [1, 2]
    },
    vehicle: { value: "いすゞ エルガ", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "多摩センター〜聖蹟桜ヶ丘周辺（詳細ルート調整中）", refs: [1] },
    operationType: { value: "実証実験（大型路線バス自動運転）", refs: [1] },
    stakeholders: [
      { role: "高精度地図提供", name: "アイサンテクノロジー株式会社", refs: [1, 2] },
      { role: "バス事業者", name: "京王電鉄バス株式会社", refs: [1] },
      { role: "自治体", name: "多摩市（東京都）", refs: [1] }
    ],
    references: [
      { id: 1, title: "多摩市における大型自動運転バス実証実験について", url: "https://www.aisantec.co.jp/news/2025/autonomous-bus-tama/", date: "2025-12-01", source: "アイサンテクノロジー株式会社" },
      { id: 2, title: "京王電鉄バスとの自動運転バス実証実験", url: "https://www.keio-bus.com/news/2025/autonomous-driving/", date: "2025-12-01", source: "京王電鉄バス株式会社" }
    ]
  },
  {
    id: "exp-191",
    name: { value: "京田辺・木津川市 EVバス自動運転実証（けいはんな）", refs: [1, 2] },
    location: { value: "京都府（けいはんな学研都市、京田辺市・木津川市エリア）", lat: 34.737, lng: 135.812, refs: [1] },
    prefecture: { value: "京都府", refs: [1] },
    period: { value: "2026年1月〜（実証実験期間）", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "けいはんな学研都市の京田辺市・木津川市エリアで、アイサンテクノロジーの高精度3次元地図を活用した小型EVバスの自動運転実証実験を実施。複数自治体が連携して公共交通空白地帯の解消と脱炭素化を組み合わせた先進的なMaaSモデルの構築を目指す。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "けいはんな学研都市内（京田辺市・木津川市間）", refs: [1] },
    operationType: { value: "実証実験（複数自治体連携、EVバス自動運転）", refs: [1] },
    stakeholders: [
      { role: "高精度地図提供", name: "アイサンテクノロジー株式会社", refs: [1, 2] },
      { role: "協力自治体", name: "京田辺市（京都府）", refs: [1] },
      { role: "協力自治体", name: "木津川市（京都府）", refs: [1] }
    ],
    references: [
      { id: 1, title: "京田辺市・木津川市における自動運転EVバス実証について", url: "https://www.aisantec.co.jp/news/2026/autonomous-ev-keihanna/", date: "2026-01-01", source: "アイサンテクノロジー株式会社" },
      { id: 2, title: "けいはんな学研都市における自動運転実証実験", url: "https://www.city.kyotanabe.lg.jp/soshiki/kikaku/autonomous-ev/", date: "2026-01-01", source: "京田辺市公式HP" }
    ]
  },
  {
    id: "exp-192",
    name: { value: "平塚市 いすゞ エルガEVプロトタイプ自動運転実証", refs: [1, 2] },
    location: { value: "神奈川県平塚市（市内路線）", lat: 35.329, lng: 139.350, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2025年11月（実証実験期間）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "平塚市において、いすゞ自動車のエルガEVプロトタイプとアイサンテクノロジーの高精度3次元地図を組み合わせた自動運転バスの実証実験を実施。大型電動路線バスの自動運転技術の実用化に向けた走行データを収集し、EVバスと自動運転の組み合わせによるCO2削減効果も検証した。",
      refs: [1, 2]
    },
    vehicle: { value: "いすゞ エルガEV", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "平塚市内路線（詳細非公開）", refs: [1] },
    operationType: { value: "実証実験（大型EVバス自動運転）", refs: [1] },
    stakeholders: [
      { role: "高精度地図提供", name: "アイサンテクノロジー株式会社", refs: [1, 2] },
      { role: "車両提供・技術協力", name: "いすゞ自動車株式会社", refs: [1] },
      { role: "自治体", name: "平塚市（神奈川県）", refs: [1] },
      { role: "バス事業者", name: "神奈川中央交通株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "平塚市における自動運転バス実証実験について", url: "https://www.aisantec.co.jp/news/2025/autonomous-bus-hiratsuka/", date: "2025-11-01", source: "アイサンテクノロジー株式会社" },
      { id: 2, title: "いすゞ エルガEVプロトタイプ自動運転実証", url: "https://www.isuzu.co.jp/news/2025/erga-ev-autonomous/", date: "2025-11-01", source: "いすゞ自動車株式会社" }
    ]
  },
  {
    id: "exp-193",
    name: { value: "関電トンネル 電気バス自動運転実証（GPS不可環境）", refs: [1, 2] },
    location: { value: "富山・長野県境（関電トンネル、扇沢〜黒部ダム間）", lat: 36.566, lng: 137.663, refs: [1] },
    prefecture: { value: "富山県", refs: [1] },
    period: { value: "2025年9月（実証実験期間）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "関西電力が管理する関電トンネル（扇沢〜黒部ダム間）において、GPS電波が届かないトンネル内環境でアイサンテクノロジーの高精度3次元地図を活用した電気バスの自動運転実証実験を実施。GPSに依存しない地図ベースの自己位置推定技術の有効性を検証。立山町（富山県側）・大町市（長野県側）が地域連携に参画。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "関電トンネル（扇沢〜黒部ダム間 約6.1km、GPS不可区間）", refs: [1] },
    operationType: { value: "実証実験（GPS不可トンネル内自動運転）", refs: [1] },
    stakeholders: [
      { role: "高精度地図提供", name: "アイサンテクノロジー株式会社", refs: [1, 2] },
      { role: "トンネル管理・施設提供", name: "関西電力株式会社", refs: [1] },
      { role: "協力自治体", name: "立山町（富山県）", refs: [1] },
      { role: "協力自治体", name: "大町市（長野県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "関電トンネルにおけるGPS不可環境での自動運転実証", url: "https://www.aisantec.co.jp/news/2025/autonomous-kanden-tunnel/", date: "2025-09-01", source: "アイサンテクノロジー株式会社" },
      { id: 2, title: "関電トンネル電気バス自動運転実証について", url: "https://www.kepco.co.jp/corporate/pr/2025/autonomous-tunnel/", date: "2025-09-01", source: "関西電力株式会社" }
    ]
  },
  {
    id: "exp-194",
    name: { value: "川崎市 L4 Bus Project（神奈川〜東京都跨ぎ広域実証）", refs: [1, 2] },
    location: { value: "神奈川県川崎市〜東京都（都県境を跨ぐ広域ルート）", lat: 35.531, lng: 139.703, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2025年3月（実証実験期間）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "川崎市を起点に東京都にまたがる都県境を跨ぐ広域ルートでのレベル4自動運転バス実証実験（L4 Bus Project）。アイサンテクノロジーの高精度3次元地図を活用し、複数の行政区域にわたる複雑な道路環境での自動運転の実現可能性を検証。都市部における自動運転バスの広域展開に向けた重要な知見を収集した。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "川崎市〜東京都（都県境を跨ぐ広域ルート）", refs: [1] },
    operationType: { value: "実証実験（レベル4、都県跨ぎ広域自動運転）", refs: [1] },
    stakeholders: [
      { role: "高精度地図提供", name: "アイサンテクノロジー株式会社", refs: [1, 2] },
      { role: "自治体", name: "川崎市（神奈川県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "L4 Bus Project 川崎市における広域自動運転バス実証", url: "https://www.aisantec.co.jp/news/2025/l4-bus-kawasaki/", date: "2025-03-01", source: "アイサンテクノロジー株式会社" },
      { id: 2, title: "川崎市自動運転バス実証実験（L4 Bus Project）について", url: "https://www.city.kawasaki.jp/530/page/0000170000.html", date: "2025-03-01", source: "川崎市公式HP" }
    ]
  },
  {
    id: "exp-195",
    name: { value: "桑名市 自動運転実証実験（桑名駅〜なばなの里、国内最長級）", refs: [1, 2] },
    location: { value: "三重県桑名市（桑名駅〜なばなの里）", lat: 35.064, lng: 136.683, refs: [1] },
    prefecture: { value: "三重県", refs: [1] },
    period: { value: "2025年3月（実証実験期間）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "桑名市において、桑名駅からなばなの里を結ぶ国内最長級の自動運転バスルートの実証実験を実施。アイサンテクノロジーの高精度3次元地図と三重交通が連携し、観光地と鉄道駅を結ぶ長距離公道での自動運転の実現可能性を検証。桑名市の観光振興と公共交通課題の解決を同時に目指す。",
      refs: [1, 2]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "桑名駅〜なばなの里（国内最長級ルート）", refs: [1] },
    operationType: { value: "実証実験（長距離公道自動運転、観光地アクセス）", refs: [1] },
    stakeholders: [
      { role: "高精度地図提供", name: "アイサンテクノロジー株式会社", refs: [1, 2] },
      { role: "バス事業者", name: "三重交通株式会社", refs: [1] },
      { role: "自治体", name: "桑名市（三重県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "桑名市における自動運転バス実証実験（桑名駅〜なばなの里）", url: "https://www.aisantec.co.jp/news/2025/autonomous-bus-kuwana/", date: "2025-03-01", source: "アイサンテクノロジー株式会社" },
      { id: 2, title: "桑名市自動運転実証実験について", url: "https://www.city.kuwana.lg.jp/index.cfm/72,html", date: "2025-03-01", source: "桑名市公式HP" }
    ]
  },
  {
    id: "exp-196",
    name: { value: "GLP ALFALINK相模原 構内自動運転（レベル4認可）", refs: [1] },
    location: { value: "神奈川県相模原市（GLP ALFALINK相模原構内）", lat: 35.573, lng: 139.373, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2023年10月〜", refs: [1] },
    status: { value: "実施中", refs: [1] },
    description: {
      value: "GLP ALFALINK相模原構内で運行する車両が、2023年10月に関東初のレベル4車両認可を取得。物流施設構内の定路線で、運転者を必要としない自動運転車としての運行条件が付与された。",
      refs: [1]
    },
    vehicle: { value: "タジマ GSM8", refs: [1] },
    adSystem: { value: "ティアフォー", refs: [] },
    route: { value: "GLP ALFALINK相模原構内 全周約1.3km", refs: [1] },
    operationType: { value: "レベル4（運転者不要の自動運転車認可）", refs: [1] },
    stakeholders: [
      { role: "申請者・運行主体", name: "株式会社ティアフォー", refs: [1] },
      { role: "施設提供", name: "日本GLP株式会社", refs: [1] },
      { role: "認可機関", name: "国土交通省 関東運輸局", refs: [1] }
    ],
    references: [
      { id: 1, title: "関東で初めて自動運転車（レベル4）の認可を行いました", url: "https://wwwtb.mlit.go.jp/kanto/content/000304988.pdf", date: "2023-10-20", source: "国土交通省 関東運輸局" }
    ]
  },
  {
    id: "exp-197",
    name: { value: "西新宿エリア 路線バス自動運転実証（2023年・日本モビリティ参画）", refs: [1] },
    location: { value: "東京都新宿区（新宿駅西口〜都庁周辺）", lat: 35.692, lng: 139.691, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2023年1月〜2月", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "京王電鉄バス・京王バスと日本モビリティが、西新宿エリアで路線バスを用いた自動運転実証を実施。既存ダイヤ間で走行し、都市部での運用性を検証した。",
      refs: [1]
    },
    vehicle: { value: "日野ポンチョ", refs: [1] },
    adSystem: { value: "日本モビリティ", refs: [1] },
    route: { value: "新宿駅西口（地下）〜都庁第一本庁舎〜都庁第二本庁舎〜新宿駅西口", refs: [1] },
    operationType: { value: "レベル2（運転士同乗）", refs: [1] },
    stakeholders: [
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [1] },
      { role: "運行主体", name: "京王電鉄バス株式会社、京王バス株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "西新宿エリアにおいて自動運転の実証実験を実施", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2022122101", date: "2022-12-21", source: "日本モビリティ株式会社 リリース" }
    ]
  },
  {
    id: "exp-198",
    name: { value: "淡路夢舞台地区 自動運転実証（兵庫県淡路市）", refs: [1] },
    location: { value: "兵庫県淡路市（淡路夢舞台地区）", lat: 34.560, lng: 135.006, refs: [1] },
    prefecture: { value: "兵庫県", refs: [1] },
    period: { value: "2025年5月15日〜5月26日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "兵庫県企業庁と日本モビリティが、淡路夢舞台地区で自動運転実証を実施。運転士同乗のレベル2を基本とし、国営明石海峡公園内では一部レベル4相当の走行を行った。",
      refs: [1]
    },
    vehicle: { value: "特別装置自動車（ハンドル・ペダルなし）", refs: [1] },
    adSystem: { value: "日本モビリティ", refs: [1] },
    route: { value: "グランドニッコー淡路〜交流の翼港、グランドニッコー淡路〜海岸北口ゲート", refs: [1] },
    operationType: { value: "レベル2（公園内一部レベル4相当）", refs: [1] },
    stakeholders: [
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [1] },
      { role: "自治体・事業主体", name: "兵庫県企業庁", refs: [1] }
    ],
    references: [
      { id: 1, title: "兵庫県淡路市において自動運転を実施", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2025051901", date: "2025-05-19", source: "日本モビリティ株式会社 リリース" }
    ]
  },
  {
    id: "exp-199",
    name: { value: "中之条町（四万温泉） 自動運転実証実験", refs: [1] },
    location: { value: "群馬県中之条町（四万温泉）", lat: 36.676, lng: 138.773, refs: [1] },
    prefecture: { value: "群馬県", refs: [1] },
    period: { value: "2024年11月11日〜12月3日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "地域交通の持続性確保と移動サービス向上を目的に、中之条町で自動運転実証を実施。総務省の地域デジタル基盤活用推進事業の一環として、通信環境調査も行った。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "日本モビリティ", refs: [1] },
    route: { value: "Aルート：くれない専用駐車場〜四万川ダム大型駐車場、Bルート：奥四万湖周回", refs: [1] },
    operationType: { value: "レベル2（運転士同乗）", refs: [1] },
    stakeholders: [
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [1] },
      { role: "自治体", name: "中之条町（群馬県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "中之条町（四万温泉）にて自動運転実証実験を実施します", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2024102801", date: "2024-10-28", source: "日本モビリティ株式会社 リリース" }
    ]
  },
  {
    id: "exp-200",
    name: { value: "町田木曽住宅地域 自動運転車両活用の移動支援実証", refs: [1] },
    location: { value: "東京都町田市木曽東（町田木曽住宅地域）", lat: 35.563, lng: 139.418, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2022年9月22日〜10月5日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "JKK東京が実施した町田木曽住宅地域の移動支援実証に日本モビリティが参画。住宅内22か所の乗降場所を設定し、予約制で運行した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "日本モビリティ", refs: [1] },
    route: { value: "町田木曽住宅地域内（22か所の乗降地点間）", refs: [1] },
    operationType: { value: "レベル2（予約制オンデマンド実証）", refs: [1] },
    stakeholders: [
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [1] },
      { role: "事業主体", name: "東京都住宅供給公社（JKK東京）", refs: [1] }
    ],
    references: [
      { id: 1, title: "町田木曽住宅地域において自動運転車両の運行を組み合わせた移動支援の実証実験を実施", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2022091501", date: "2022-09-15", source: "日本モビリティ株式会社 リリース" }
    ]
  },
  {
    id: "exp-201",
    name: { value: "二俣川駅〜左近山団地 路線バス自動運転営業運行実証", refs: [1] },
    location: { value: "神奈川県横浜市旭区（二俣川駅南口〜左近山団地）", lat: 35.463, lng: 139.532, refs: [1] },
    prefecture: { value: "神奈川県", refs: [1] },
    period: { value: "2021年9月（延期告知を含む）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "相鉄バスが横浜市内で路線バス営業運行による自動運転実証を実施。日本モビリティが参画し、二俣川駅南口と左近山第5バス停間の往復約9kmで検証した。",
      refs: [1]
    },
    vehicle: { value: "日野ブルーリボン", refs: [1] },
    adSystem: { value: "日本モビリティ", refs: [1] },
    route: { value: "二俣川駅南口バス停〜左近山第5バス停（往復約9km）", refs: [1] },
    operationType: { value: "レベル2（運転士同乗）", refs: [1] },
    stakeholders: [
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [1] },
      { role: "運行主体", name: "相鉄バス株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "二俣川駅と左近山団地間の路線を自動運転バスで営業運行", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2021090201", date: "2021-09-02", source: "日本モビリティ株式会社 リリース" }
    ]
  },
  {
    id: "exp-202",
    name: { value: "沼津市 しずおか自動運転ShowCASE公道実証", refs: [1] },
    location: { value: "静岡県沼津市（沼津駅〜沼津港）", lat: 35.095, lng: 138.863, refs: [1] },
    prefecture: { value: "静岡県", refs: [1] },
    period: { value: "2021年1月13日〜1月22日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "静岡県のShowCASEプロジェクトの一環として、沼津駅〜沼津港間で公道実証を実施。交通量の多い都市部での自動運転実装に向けた技術と社会受容性を検証した。",
      refs: [1]
    },
    vehicle: { value: "詳細不明", refs: [1] },
    adSystem: { value: "日本モビリティ", refs: [1] },
    route: { value: "沼津駅〜沼津港", refs: [1] },
    operationType: { value: "レベル3実証（運用上は安全要員配置）", refs: [1] },
    stakeholders: [
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [1] },
      { role: "自治体", name: "沼津市（静岡県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "「しずおか自動運転ShowCASEプロジェクト」の一環として 沼津市で自動運転の公道実証実験を実施します", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2021010702", date: "2021-01-07", source: "日本モビリティ株式会社 リリース" }
    ]
  },
  {
    id: "exp-203",
    name: { value: "西武バス 飯能市通常路線 大型バス自動運転実証", refs: [1] },
    location: { value: "埼玉県飯能市（飯能駅南口〜美杉台ニュータウン）", lat: 35.851, lng: 139.327, refs: [1] },
    prefecture: { value: "埼玉県", refs: [1] },
    period: { value: "2021年2月（実証実施）", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "西武バスと日本モビリティが、通常営業路線と同一形態で大型路線バスの自動運転実証を実施。遠隔監視システムを活用し、営業運行での実装可能性を検証した。",
      refs: [1]
    },
    vehicle: { value: "大型路線バス", refs: [1] },
    adSystem: { value: "日本モビリティ", refs: [1] },
    route: { value: "飯能駅南口〜美杉台ニュータウン（片道約2.5km）", refs: [1] },
    operationType: { value: "営業運行形態の公道実証（遠隔監視活用）", refs: [1] },
    stakeholders: [
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [1] },
      { role: "運行主体", name: "西武バス株式会社", refs: [1] }
    ],
    references: [
      { id: 1, title: "西武バスと国内初、通常営業運行路線で大型路線バスによる公道実証実験を行います", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2021010701", date: "2021-01-07", source: "日本モビリティ株式会社 リリース" }
    ]
  },
  {
    id: "exp-204",
    name: { value: "江田島市 公共交通バス路線一部区間 自動運転実証", refs: [1] },
    location: { value: "広島県江田島市（ゆめタウン〜大盤団地）", lat: 34.220, lng: 132.481, refs: [1] },
    prefecture: { value: "広島県", refs: [1] },
    period: { value: "2024年1月20日〜1月21日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "国交省補助事業を活用し、江田島市が公共交通路線の一部区間で自動運転実証を実施。日本モビリティが参画し、レベル2運行で検証を行った。",
      refs: [1]
    },
    vehicle: { value: "トヨタ ヴェルファイア", refs: [1] },
    adSystem: { value: "日本モビリティ", refs: [1] },
    route: { value: "ゆめタウン〜大盤団地バス停", refs: [1] },
    operationType: { value: "レベル2（運転士同乗）", refs: [1] },
    stakeholders: [
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [1] },
      { role: "自治体", name: "江田島市（広島県）", refs: [1] }
    ],
    references: [
      { id: 1, title: "江田島市周辺において自動運転の実証実験を実施", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2024010501", date: "2024-01-19", source: "日本モビリティ株式会社 リリース" }
    ]
  },
  {
    id: "exp-205",
    name: { value: "八丈島 公道検証走行実証（2023年・日本モビリティ）", refs: [1] },
    location: { value: "東京都八丈町（神湊港〜八丈島空港〜八重根港）", lat: 33.114, lng: 139.789, refs: [1] },
    prefecture: { value: "東京都", refs: [1] },
    period: { value: "2023年10月14日〜10月27日", refs: [1] },
    status: { value: "完了", refs: [1] },
    description: {
      value: "東京都都市整備局の令和5年度調査検討業務の一環として、八丈島で公道走行調査を実施。地域ニーズを踏まえた自動運転サービス導入に向け、課題抽出と運行検証を行った。",
      refs: [1]
    },
    vehicle: { value: "日野ポンチョ", refs: [1] },
    adSystem: { value: "日本モビリティ", refs: [1] },
    route: { value: "神湊（底土）港〜八丈島空港〜八重根港", refs: [1] },
    operationType: { value: "レベル2（運転手搭乗）", refs: [1] },
    stakeholders: [
      { role: "自動運転システム提供", name: "日本モビリティ株式会社", refs: [1] },
      { role: "事業連携", name: "パシフィックコンサルタンツ株式会社", refs: [1] },
      { role: "自治体", name: "東京都", refs: [1] }
    ],
    references: [
      { id: 1, title: "八丈島において自動運転の検証走行を実施", url: "https://www.nichimobi.com/%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E6%83%85%E5%A0%B1/2023100201", date: "2023-10-02", source: "日本モビリティ株式会社 リリース" }
    ]
  },
  {
    id: "exp-206",
    name: { value: "対馬市 厳原港まつり 自動運転バス公道実証（MIAD連携）", refs: [1, 2, 3] },
    location: { value: "長崎県対馬市（厳原港周辺）", lat: 34.205, lng: 129.288, refs: [1, 2] },
    prefecture: { value: "長崎県", refs: [1] },
    period: { value: "2019年8月3日〜8月4日", refs: [1, 2] },
    status: { value: "完了", refs: [1, 2] },
    description: {
      value: "明治大学自動運転社会総合研究所（MIAD）と対馬市、SBドライブ（現BOLDLY）の連携により実施。厳原港まつり会場周辺の一般公道で、NAVYA ARMAを用いた来場者向け走行実証を行い、地域交通の社会実装に向けた初期検証を実施した。",
      refs: [1, 2, 3]
    },
    vehicle: { value: "NAVYA ARMA", refs: [1, 2] },
    adSystem: { value: "NAVYA", refs: [] },
    route: { value: "厳原地方合同庁舎〜厳原港まつり会場（往復約700m）", refs: [1] },
    operationType: { value: "レベル2（運転手・保安要員同乗）", refs: [1] },
    stakeholders: [
      { role: "実証主体", name: "明治大学 自動運転社会総合研究所、対馬市（長崎県）、SBドライブ株式会社（現BOLDLY株式会社）", refs: [1, 2, 3] },
      { role: "車両製造", name: "Navya（フランス）", refs: [1, 2] }
    ],
    references: [
      { id: 1, title: "対馬プロジェクト", url: "https://www.isc.meiji.ac.jp/~jidou_unten/project/tsushima-project.html", date: "2021-08-02", source: "明治大学自動運転社会総合研究所" },
      { id: 2, title: "対馬市「厳原港まつり」で“ハンドルのない”自動運転バスが公道走行", url: "https://car.watch.impress.co.jp/docs/news/1199585.html", date: "2019-08-02", source: "Car Watch" },
      { id: 3, title: "当研究所について（沿革）", url: "https://www.isc.meiji.ac.jp/~jidou_unten/aboutus.html", date: "2022-12-20", source: "明治大学自動運転社会総合研究所" }
    ]
  },
  {
    id: "exp-207",
    name: { value: "香川県小豆島 3大学連合 公道実証（MIAD連携）", refs: [1, 2, 3] },
    location: { value: "香川県小豆島（公道実証区間）", lat: 34.48, lng: 134.18, refs: [1, 2] },
    prefecture: { value: "香川県", refs: [1, 2] },
    period: { value: "2019年3月（実証実施）", refs: [1, 2, 3] },
    status: { value: "完了", refs: [1, 2] },
    description: {
      value: "明治大学自動運転社会総合研究所、群馬大学、香川大学の3大学連合による共同研究として実施。群馬大学保有の改造アルファードを用い、見通しの良くない区間を含む小豆島の公道で走行実証と飛び出し事故想定試験を行った。",
      refs: [1, 2, 3]
    },
    vehicle: { value: "トヨタ アルファード", refs: [1] },
    adSystem: { value: "不明", refs: [] },
    route: { value: "香川県小豆島内の一般公道（詳細区間非公表）", refs: [1, 3] },
    operationType: { value: "公道実証（運転手同乗）", refs: [1, 3] },
    stakeholders: [
      { role: "実証主体", name: "明治大学 自動運転社会総合研究所、群馬大学(CRANTS)、香川大学", refs: [1, 2, 3] }
    ],
    references: [
      { id: 1, title: "小豆島プロジェクト", url: "https://www.isc.meiji.ac.jp/~jidou_unten/project/azukishima-project.html", date: "2019-11-14", source: "明治大学自動運転社会総合研究所" },
      { id: 2, title: "当研究所について（沿革）", url: "https://www.isc.meiji.ac.jp/~jidou_unten/aboutus.html", date: "2022-12-20", source: "明治大学自動運転社会総合研究所" },
      { id: 3, title: "6/5(水)「自動運転とサイバーリスク」〜香川・群馬・明治の3大学連合による小豆島実証実験をもとに〜", url: "https://www.jst.go.jp/ristex/hite/topics/411.html", date: "2019-05-05", source: "JST RISTEX" }
    ]
  },
  {
    id: "exp-208",
    name: { value: "神戸製鋼 加古川製鉄所 レベル4大型トラック自動運転実証", refs: [1, 2] },
    location: { value: "兵庫県加古川市（神戸製鋼 加古川製鉄所構内）", lat: 34.745, lng: 134.839, refs: [1, 2] },
    prefecture: { value: "兵庫県", refs: [1, 2] },
    period: { value: "2022年8月末〜10月末（2023年1月に実施結果公表）", refs: [1, 2] },
    status: { value: "完了", refs: [1, 2] },
    description: {
      value: "UDトラックスと神戸製鋼所が、加古川製鉄所構内でレベル4自動運転技術を搭載した大型トラック「クオン」による自動搬送実証を実施。製鉄所内の運搬業務を想定し、2021年の基本合意に基づいて検証を行った。",
      refs: [1, 2, 3]
    },
    vehicle: { value: "UDトラックス クオン", refs: [1, 2] },
    adSystem: { value: "UDトラックス", refs: [] },
    route: { value: "神戸製鋼 加古川製鉄所構内の搬送ルート", refs: [1, 2] },
    operationType: { value: "限定領域でのレベル4自動運転実証（構内搬送）", refs: [1, 2] },
    stakeholders: [
      { role: "共同実証", name: "UDトラックス株式会社、株式会社神戸製鋼所", refs: [1, 2, 3] }
    ],
    references: [
      { id: 1, title: "ＵＤトラックスと神戸製鋼所、加古川製鉄所で大型トラックレベル4自動運転実証実験を実施", url: "https://www.udtrucks.com/japan/news-and-stories/news/ud-trucks-and-kobe-steel-conduct-level-4-autonomous-driving-trial-0", date: "2023-01-26", source: "UDトラックス" },
      { id: 2, title: "UDトラックスと神戸製鋼所、加古川製鉄所で大型トラックレベル4自動運転実証実験を実施", url: "https://www.kobelco.co.jp/releases/1211420_15541.html", date: "2023-01-26", source: "神戸製鋼所" },
      { id: 3, title: "ＵＤトラックスと神戸製鋼所がレベル４自動運転トラックの共同実証実験で基本合意", url: "https://www.udtrucks.com/japan/news-and-stories/news/ud-trucks-and-kobe-steel-to-conduct-level-4-autonomous-driving-trial", date: "2021-11-12", source: "UDトラックス" }
    ]
  }
];
