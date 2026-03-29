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
    BARAJA: {
      id: "baraja",
      name: "Baraja",
      nameJa: "Baraja",
      country: "🇦🇺 オーストラリア",
      url: "https://www.baraja.com/",
      notes: "Spectrum-Scan™で波長可変レーザーを使うソリッドステートLiDAR専業。",
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
    MECHANICAL: {
      id: "mechanical", label: "Mechanical Spinning", labelJa: "機械式回転",
      icon: "rotate_right",
      descriptionJa: "モーターで光学ユニット全体を物理回転させる方式。360°全周囲スキャンが可能で、点群密度が高い。LiDAR黎明期から実用化されており、技術成熟度が最も高い。",
      pros: ["360°全周囲スキャン", "高い点群密度", "技術成熟度が高い", "長距離性能に優れる"],
      cons: ["可動部による耐久性・耐振動の課題", "大型・重量増", "量産コスト高", "高速回転による騒音"],
    },
    MECHANICAL_2D: {
      id: "mechanical-2d", label: "Mechanical 2D Scanner", labelJa: "機械式2Dスキャナ",
      icon: "radar",
      descriptionJa: "単一または少数のレーザーを水平面内で回転させ、2次元の距離マップを生成する方式。産業・安全用途で広く普及しており、信頼性・コスト面で優れる。",
      pros: ["低コスト", "高信頼性・長寿命", "産業規格対応が充実", "軽量・コンパクト"],
      cons: ["垂直FOVなし（2Dのみ）", "3D点群は取得不可", "回転部の摩耗"],
    },
    MEMS: {
      id: "mems", label: "MEMS Solid-State", labelJa: "MEMSソリッドステート",
      icon: "memory",
      descriptionJa: "MEMS（微小電気機械システム）ミラーを高速振動させてレーザーをスキャンする方式。外部に大きな可動部がなく、半導体製造プロセスで製造できるため量産性に優れる。",
      pros: ["可動部が微小（耐振動）", "半導体量産プロセス適用可", "小型・軽量", "低消費電力"],
      cons: ["FOVが限定的（前方監視中心）", "ミラー共振周波数に依存", "スキャンパターンの柔軟性が低い"],
    },
    FLASH: {
      id: "flash", label: "Flash LiDAR", labelJa: "フラッシュ式",
      icon: "bolt",
      descriptionJa: "広角のレーザー光を一度に照射し、2Dセンサアレイで反射光を面で受光する方式。カメラと同様の動作原理で、フレームレートが高くリアルタイム性に優れる。",
      pros: ["可動部なし（完全ソリッドステート）", "高フレームレート", "小型・堅牢", "短距離での高解像度"],
      cons: ["長距離性能が限定的", "コスト高（大型アレイ）", "クロストーク・多重反射の影響"],
    },
    FMCW: {
      id: "fmcw", label: "FMCW / 4D LiDAR", labelJa: "FMCW / 4D LiDAR",
      icon: "graphic_eq",
      descriptionJa: "周波数変調連続波（FMCW）を使い、距離だけでなく各点の相対速度（ドップラー効果）を同時計測する次世代方式。ToF方式と異なり、コヒーレント検波により高いSNR、太陽光耐性、速度情報取得が特長。",
      pros: ["距離＋速度を同時計測（4D）", "太陽光・干渉に強い", "アイセーフ波長（1550nm）との親和性", "高SNR"],
      cons: ["処理回路が複雑・高コスト", "技術の成熟度が比較的低い", "大規模量産はまだ限定的"],
    },
    OPA: {
      id: "opa", label: "OPA Solid-State", labelJa: "OPAソリッドステート",
      icon: "settings_input_antenna",
      descriptionJa: "光フェーズドアレイ（OPA）技術を利用し、光の位相を電気的に制御してビームを任意方向に操向する方式。完全ソリッドステートながら任意点スキャンが可能。",
      pros: ["完全ソリッドステート", "任意点への高速ビーム操向", "超小型化・チップ集積の可能性"],
      cons: ["製造難易度が高い", "現状は性能・コストで課題", "商用量産例が少ない"],
    },
    HYBRID: {
      id: "hybrid", label: "Hybrid Solid-State", labelJa: "ハイブリッドソリッドステート",
      icon: "tune",
      descriptionJa: "機械式回転部分とソリッドステート素子を組み合わせた方式。回転ミラーにより広いFOVを確保しつつ、内部はソリッドステート化でコンパクト・低コストを実現する。",
      pros: ["広いFOV（機械式に近い）", "ソリッドステートよりコスト抑制", "量産実績あり"],
      cons: ["完全ソリッドステートより可動部が残る", "大型・重量が増す場合がある"],
    },
    NON_REPETITIVE: {
      id: "non-repetitive", label: "Non-Repetitive Scan", labelJa: "非反復走査（Livox式）",
      icon: "scatter_plot",
      descriptionJa: "Livoxが独自開発した走査方式。通常の均一ラスタースキャンと異なり、時間経過とともにランダムに異なる点を照射し続けることで、積分時間を長くするほど点群が均一・高密度になる特性を持つ。",
      pros: ["長い積分時間で高密度化", "低コストで高性能", "独自の点群パターンで特定用途に最適"],
      cons: ["フレームごとの点群分布が異なる（高速物体に注意）", "従来のLiDAR向けアルゴリズムとの互換性"],
    },
    SIPM: {
      id: "sipm", label: "SiPM Solid-State", labelJa: "SiPMソリッドステート",
      icon: "sensors",
      descriptionJa: "シリコン光電子増倍管（SiPM）を受光素子に用いる方式。単一光子レベルの感度を持ち、微弱な反射光でも検出可能。長距離・高感度性能が期待される次世代技術。",
      pros: ["単光子レベルの超高感度", "長距離検知の可能性", "低ノイズ", "シリコン製造プロセス適用可"],
      cons: ["温度特性の管理が必要", "高速読み出し回路が複雑", "商用量産はまだ限定的"],
    },
    CAMERA_LIDAR: {
      id: "camera-lidar", label: "Camera-LiDAR Fusion", labelJa: "カメラ・LiDAR融合",
      icon: "camera_enhance",
      descriptionJa: "LiDARとカメラを光学的・ハードウェアレベルで融合させたセンサモジュール。距離情報と色・テクスチャ情報を同一光軸で取得し、ソフトウェアフュージョンより精度・低遅延を実現。",
      pros: ["距離＋色情報の同時取得", "ハードウェアレベルの高精度融合", "開発工数削減"],
      cons: ["個別センサより設計制約大", "片方の故障が全体に影響"],
    },
    SOFTWARE: {
      id: "software", label: "Software / Fusion", labelJa: "ソフトウェア・融合処理",
      icon: "code",
      descriptionJa: "LiDAR単体センサではなく、カメラ・ミリ波レーダー・既存LiDAR等のデータをソフトウェアで融合・処理するプラットフォーム型製品。ハードウェアに依存せず任意のセンサ構成に対応。",
      pros: ["ハードウェア非依存", "既存センサの活用", "柔軟なシステム構成", "コスト削減"],
      cons: ["専用ハードウェアより遅延が生じる場合", "センサ品質に依存"],
    },
    SPECTRUM_SCAN: {
      id: "spectrum-scan", label: "Spectrum-Scan", labelJa: "Spectrum-Scan",
      icon: "auto_fix_high",
      descriptionJa: "Barajaが開発した、波長可変レーザーとプリズム光学を使うソリッドステート走査方式。fast axis の機械回転を使わず、ソフトウェアで解像度やビーム操向を柔軟に制御できる。",
      pros: ["fast axis がソリッドステート", "高解像度をソフトウェアで調整可能", "干渉耐性が高い", "車載・産業の高耐久要求に適合"],
      cons: ["専用の光学・制御設計が必要", "採用製品がまだ少ない", "一般的なToF/MEMSより独自性が強い"],
    },
  };

  // ─────────────────────────────────────────────
  // CAT: カテゴリ定義
  // ─────────────────────────────────────────────
  const CAT = {
    AUTO_LONG: {
      id: "auto-long", label: "Automotive Long-Range", labelJa: "車載 長距離（前方監視）",
      icon: "directions_car",
      typicalRange: "150〜300 m",
      descriptionJa: "高速道路走行時の前方障害物検知、AEB（自動緊急ブレーキ）、ACC（アダプティブクルーズコントロール）向け。長距離・高精度が求められ、ADAS Level 2+〜Level 3の主要センサ。",
    },
    AUTO_SHORT: {
      id: "auto-short", label: "Automotive Short-Range", labelJa: "車載 短距離（死角検知）",
      icon: "visibility",
      typicalRange: "〜50 m",
      descriptionJa: "車両周囲の死角・近接領域をカバーする短距離センサ。駐車支援、交差点での歩行者検知、360°サラウンドビューに活用。広いFOVと近距離の高解像度が特徴。",
    },
    INDUSTRIAL: {
      id: "industrial", label: "Industrial / Safety", labelJa: "産業 / 安全スキャナ",
      icon: "factory",
      typicalRange: "〜30 m",
      descriptionJa: "工場・倉庫・物流施設でのAGV/AMRの安全停止、人検知、エリア監視に使用。IEC 61496等の機能安全規格（Safety Integrity Level）対応が求められる。",
    },
    ROBOTICS: {
      id: "robotics", label: "Robotics / Mapping / AMR", labelJa: "ロボット / マッピング",
      icon: "smart_toy",
      typicalRange: "〜100 m",
      descriptionJa: "移動ロボット（AMR）のSLAM（同時位置推定・地図生成）、屋内外マッピング、ドローン、自律配送ロボット向け。軽量・高密度点群・ROS対応が重視される。",
    },
    RESEARCH: {
      id: "research", label: "Research & Development", labelJa: "研究開発・プロトタイプ",
      icon: "science",
      typicalRange: "用途次第",
      descriptionJa: "大学・研究機関・自動車OEM・Tier1の開発現場向け。高精度・高密度を優先し、コスト・サイズより性能を重視。自動運転データセット収集やアルゴリズム検証に活用される。",
    },
    SOFTWARE: {
      id: "software", label: "Software / Fusion Platform", labelJa: "ソフトウェアプラットフォーム",
      icon: "code",
      typicalRange: "センサ依存",
      descriptionJa: "LiDAR単体ではなく、複数センサのデータを統合するソフトウェアレイヤー製品。カメラ・ミリ波レーダー・LiDARを融合し、知覚精度向上やコスト最適化を実現するプラットフォーム。",
    },
  };

  // ─────────────────────────────────────────────
  // WAVE: 波長定義
  // ─────────────────────────────────────────────
  const WAVE = {
    NM905: {
      id: "905nm", label: "905 nm",
      colorHex: "#f97316",
      eyeSafety: "低出力ではClass 1取得可能だが、高出力化に制限あり",
      detectorType: "シリコン APD / SPAD",
      descriptionJa: "LiDAR市場で最も広く普及している近赤外波長。シリコン系フォトディテクタ（APD/SPAD）で受光でき、コスト・量産性に優れる。レンズや光学部品も豊富。高出力化するとアイセーフティ確保が難しくなるため、出力に制限がある。",
    },
    NM940: {
      id: "940nm", label: "940 nm",
      colorHex: "#e11d48",
      eyeSafety: "Class 1相当（905nmより太陽光干渉が少ない）",
      detectorType: "シリコン APD / SPAD（940nm最適化品）",
      descriptionJa: "905nmの近傍波長。太陽光スペクトルの940nm帯は大気中の水蒸気吸収により比較的弱いため、太陽光による雑音（バックグラウンドノイズ）を低減しやすい利点がある。",
    },
    NM1550: {
      id: "1550nm", label: "1550 nm", note: "eye-safe",
      colorHex: "#7c3aed",
      eyeSafety: "Class 1 アイセーフ（高出力でも安全）",
      detectorType: "InGaAs APD / Ge-on-Si",
      descriptionJa: "光通信（光ファイバー）で標準的に使われる波長帯。目の網膜に到達する前に角膜・水晶体で吸収されるため、高出力でもアイセーフティ（Class 1）を達成しやすい。高出力化により長距離性能を大幅に向上できる。受光素子にInGaAsが必要でコスト高だが、自動車グレードへの適用が進んでいる。",
    },
    UNKNOWN: {
      id: "unknown", label: "非公開 / 不明",
      colorHex: "#6b7280",
      eyeSafety: "不明",
      detectorType: "不明",
      descriptionJa: "メーカーが波長を公開していない、または確認できていない製品。競合他社への情報開示を避けるため非公開としているケースや、研究開発段階で未確定のケースがある。",
    },
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
