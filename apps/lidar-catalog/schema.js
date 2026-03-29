// LiDARカタログ スキーマ定義
// UMD形式: ブラウザ（グローバル変数）と Node.js（module.exports）の両方で動作する
//
// 設計方針:
//   - data.js は必ずこのファイルの定数を参照する（文字列リテラルで enum 値を書かない）
//   - タイポすると undefined になりバリデーションで即検出される
//   - 表示名の変更はここ1箇所のみ

(function (exports) {

  // ─────────────────────────────────────────────
  // M: メーカー定義
  // ─────────────────────────────────────────────
  const M = {
    AEVA: {
      id: "aeva",
      name: "Aeva",
      nameJa: "Aeva",
      country: "🇺🇸 アメリカ",
      url: "https://www.aeva.com/",
      notes: "元Appleエンジニア創業。FMCWパイオニア。NikonとZFが出資。",
    },
    DENSO: {
      id: "denso",
      name: "Denso",
      nameJa: "株式会社デンソー",
      country: "🇯🇵 日本",
      url: "https://www.denso.com/",
      notes: "トヨタグループの主要サプライヤー。Aevaとの共同FMCW開発あり。",
    },
    HESAI: {
      id: "hesai",
      name: "Hesai Technology",
      nameJa: "禾賽科技",
      country: "🇨🇳 中国",
      url: "https://www.hesaitech.com/",
      notes: "グローバルシェアトップクラス。理想汽車・小米EV・Lotusなどに採用。",
    },
    HOKUYO: {
      id: "hokuyo",
      name: "Hokuyo Automatic",
      nameJa: "北陽電機株式会社",
      country: "🇯🇵 日本",
      url: "https://www.hokuyo-aut.co.jp/",
      notes: "産業・ロボット向け2Dレーザースキャナのパイオニア。ROS対応が充実。",
    },
    INNOVIZ: {
      id: "innoviz",
      name: "Innoviz Technologies",
      nameJa: "Innovizテクノロジーズ",
      country: "🇮🇱 イスラエル",
      url: "https://innoviz.tech/",
      notes: "BMW・VW (CARIAD) と大型量産契約。MEMSソリッドステートLiDAR専業。",
    },
    KOITO: {
      id: "koito",
      name: "Koito Manufacturing",
      nameJa: "株式会社小糸製作所",
      country: "🇯🇵 日本",
      url: "https://www.koito.co.jp/",
      notes: "自動車照明世界最大手。2025年1月にCepton（米）を買収しLiDAR統合を推進。",
    },
    KYOCERA: {
      id: "kyocera",
      name: "Kyocera",
      nameJa: "京セラ株式会社",
      country: "🇯🇵 日本",
      url: "https://www.kyocera.co.jp/",
      notes: "セラミックMEMSミラーを活用したカメラ・LiDAR融合センサを開発。",
    },
    LEDDARTECH: {
      id: "leddartech",
      name: "LeddarTech",
      nameJa: "LeddarTech",
      country: "🇨🇦 カナダ",
      url: "https://leddartech.com/",
      notes: "センサフュージョンソフトウェア（LeddarVision）へ事業転換済み。",
    },
    LIVOX: {
      id: "livox",
      name: "Livox Technology",
      nameJa: "Livox Technology（大疆关联）",
      country: "🇨🇳 中国",
      url: "https://www.livoxtech.com/",
      notes: "DJI関連会社。独自の非反復走査で低コスト・高密度化を実現。XPengに採用。",
    },
    LUMINAR: {
      id: "luminar",
      name: "Luminar Technologies",
      nameJa: "ルミナーテクノロジーズ",
      country: "🇺🇸 アメリカ",
      url: "https://www.luminartech.com/",
      notes: "1550nm波長・長距離特化。Volvo EX90・Mercedes等と量産契約。",
    },
    OUSTER: {
      id: "ouster",
      name: "Ouster",
      nameJa: "Ouster（Velodyne統合）",
      country: "🇺🇸 アメリカ",
      url: "https://ouster.com/",
      notes: "デジタルLiDAR（SPAD+VCSEL）。2023年Velodyne Lidarと合併。",
    },
    PIONEER: {
      id: "pioneer",
      name: "Pioneer Smart Sensing Innovations",
      nameJa: "パイオニアスマートセンシングイノベーションズ（PSSP）",
      country: "🇯🇵 日本",
      url: "https://www.pioneer-pssp.co.jp/",
      notes: "パイオニアの自動運転事業を継承。2025年末にCarUX Holdingに移行。",
    },
    QUANERGY: {
      id: "quanergy",
      name: "Quanergy Solutions",
      nameJa: "Quanergy（再編後）",
      country: "🇺🇸 アメリカ",
      url: "https://quanergy.com/",
      notes: "2022年末にChapter 11申請。現在はセキュリティ・産業IoT特化で再建中。",
    },
    ROBOSENSE: {
      id: "robosense",
      name: "RoboSense",
      nameJa: "速腾聚创（RoboSense）",
      country: "🇨🇳 中国",
      url: "https://www.robosense.ai/en",
      notes: "深圳拠点。世界初の量産MEMSカーグレードLiDAR（M1）メーカー。BYD・Lotus等に採用。",
    },
    SICK: {
      id: "sick",
      name: "SICK AG",
      nameJa: "SICK AG",
      country: "🇩🇪 ドイツ",
      url: "https://www.sick.com/",
      notes: "産業用センサの老舗大手。AGV/AMR・FA・安全スキャナで圧倒的シェア。",
    },
    SEYOND: {
      id: "seyond",
      name: "Seyond",
      nameJa: "Seyond（旧Innovusion）",
      country: "🇺🇸🇨🇳 アメリカ/中国",
      url: "https://www.seyond.com/",
      notes: "旧称Innovusion。NIO ET7に標準搭載。1550nm長距離LiDAR専業。",
    },
    TOSHIBA: {
      id: "toshiba",
      name: "Toshiba Corporation",
      nameJa: "株式会社東芝",
      country: "🇯🇵 日本",
      url: "https://www.global.toshiba/",
      notes: "独自SiPMセンサによるソリッドステートLiDARを開発中。2025年度商用化目標。",
    },
    VALEO: {
      id: "valeo",
      name: "Valeo",
      nameJa: "ヴァレオ",
      country: "🇫🇷 フランス",
      url: "https://www.valeo.com/",
      notes: "SCALA1（2017）で世界初の量産車載LiDARを実現。Audi A8・Honda Legend等に採用。",
    },
    VELODYNE: {
      id: "velodyne",
      name: "Velodyne Lidar",
      nameJa: "Velodyne Lidar（Ouster統合）",
      country: "🇺🇸 アメリカ",
      url: "https://velodynelidar.com/",
      notes: "LiDAR産業を創出した老舗。2023年Ousterと合併。製品はOuster傘下で継続サポート。",
    },
  };

  // ─────────────────────────────────────────────
  // SCAN: 走査方式定義
  // ─────────────────────────────────────────────
  const SCAN = {
    MECHANICAL:      { id: "mechanical",      label: "Mechanical Spinning",   labelJa: "機械式回転" },
    MECHANICAL_2D:   { id: "mechanical-2d",   label: "Mechanical 2D Scanner", labelJa: "機械式2Dスキャナ" },
    MEMS:            { id: "mems",            label: "MEMS Solid-State",      labelJa: "MEMSソリッドステート" },
    FLASH:           { id: "flash",           label: "Flash LiDAR",           labelJa: "フラッシュ式" },
    FMCW:            { id: "fmcw",            label: "FMCW / 4D LiDAR",       labelJa: "FMCW / 4D LiDAR" },
    OPA:             { id: "opa",             label: "OPA Solid-State",        labelJa: "OPAソリッドステート" },
    HYBRID:          { id: "hybrid",          label: "Hybrid Solid-State",     labelJa: "ハイブリッドソリッドステート" },
    NON_REPETITIVE:  { id: "non-repetitive",  label: "Non-Repetitive Scan",   labelJa: "非反復走査（Livox式）" },
    SIPM:            { id: "sipm",            label: "SiPM Solid-State",       labelJa: "SiPMソリッドステート" },
    CAMERA_LIDAR:    { id: "camera-lidar",    label: "Camera-LiDAR Fusion",   labelJa: "カメラ・LiDAR融合" },
    SOFTWARE:        { id: "software",        label: "Software / Fusion",      labelJa: "ソフトウェア・融合処理" },
  };

  // ─────────────────────────────────────────────
  // CAT: カテゴリ定義
  // ─────────────────────────────────────────────
  const CAT = {
    AUTO_LONG:  { id: "auto-long",  label: "Automotive Long-Range",        labelJa: "車載 長距離（前方監視）" },
    AUTO_SHORT: { id: "auto-short", label: "Automotive Short-Range",       labelJa: "車載 短距離（死角検知）" },
    INDUSTRIAL: { id: "industrial", label: "Industrial / Safety",          labelJa: "産業 / 安全スキャナ" },
    ROBOTICS:   { id: "robotics",   label: "Robotics / Mapping / AMR",     labelJa: "ロボット / マッピング" },
    RESEARCH:   { id: "research",   label: "Research & Development",       labelJa: "研究開発・プロトタイプ" },
    SOFTWARE:   { id: "software",   label: "Software / Fusion Platform",   labelJa: "ソフトウェアプラットフォーム" },
  };

  // ─────────────────────────────────────────────
  // WAVE: 波長定義
  // ─────────────────────────────────────────────
  const WAVE = {
    NM905:    { id: "905nm",  label: "905 nm" },
    NM940:    { id: "940nm",  label: "940 nm" },
    NM1550:   { id: "1550nm", label: "1550 nm", note: "eye-safe" },
    UNKNOWN:  { id: "unknown", label: "非公開 / 不明" },
  };

  // ─────────────────────────────────────────────
  // SRC_TYPE: 参考文献ソース種別定義
  //   エージェントが一次情報優先度を判定するために使用する
  // ─────────────────────────────────────────────
  const SRC_TYPE = {
    PRODUCT_PAGE:   "product-page",    // メーカー公式製品ページ（最優先）
    DATASHEET:      "datasheet",       // 公式データシートPDF
    SPEC_SHEET:     "spec-sheet",      // スペック表（PDFまたはHTML）
    PRESS_RELEASE:  "press-release",   // メーカー公式プレスリリース
    NEWS:           "news",            // ニュース記事・第三者報道
    PATENT:         "patent",          // 特許文書
    OTHER:          "other",           // その他
  };

  exports.M = M;
  exports.SCAN = SCAN;
  exports.CAT = CAT;
  exports.WAVE = WAVE;
  exports.SRC_TYPE = SRC_TYPE;

})(typeof module !== "undefined" ? module.exports : this);
