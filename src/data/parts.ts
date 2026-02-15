import type { Part } from '../types/part'

export const parts: Part[] = [
  {
    id: 'neo-brushless-motor',
    name: 'NEO Brushless Motor',
    category: '电机',
    brand: 'REV Robotics',
    price: '$40.00',
    description:
      'NEO 无刷电机是 FRC 中最受欢迎的驱动电机之一。采用无刷设计，效率高、寿命长，适用于底盘驱动、机械臂等多种应用场景。内置霍尔传感器，可通过 Spark MAX 控制器直接读取转速和位置反馈，简化接线和编程。',
    purchaseUrl: 'https://www.revrobotics.com/rev-21-1650/',
    specs: [
      { label: '功率', value: '406W' },
      { label: '空载转速', value: '5676 RPM' },
      { label: '失速扭矩', value: '2.6 N·m' },
      { label: '失速电流', value: '105A' },
      { label: '重量', value: '0.425 kg' },
    ],
  },
  {
    id: 'falcon-500',
    name: 'Falcon 500',
    category: '电机',
    brand: 'VEX / WCP',
    price: '$49.99',
    description:
      'Falcon 500 是一款集成电机控制器的高性能无刷电机，内部集成了 Talon FX 控制器，无需外接电调。功率密度极高，广泛用于竞赛底盘、射球机构和攀爬装置。内置编码器提供精确的位置和速度反馈，支持 CAN 总线通信。',
    purchaseUrl: 'https://store.ctr-electronics.com/falcon-500-powered-by-talon-fx/',
    specs: [
      { label: '功率', value: '783W' },
      { label: '空载转速', value: '6380 RPM' },
      { label: '失速扭矩', value: '4.69 N·m' },
      { label: '失速电流', value: '257A' },
      { label: '重量', value: '0.545 kg（含控制器）' },
    ],
  },
  {
    id: 'kraken-x60',
    name: 'Kraken X60',
    category: '电机',
    brand: 'WCP',
    price: '$54.99',
    description:
      'Kraken X60 是 WCP 推出的新一代高性能无刷电机，采用 FOC（磁场定向控制）技术，在低速高扭矩场景下表现优异。集成 TalonFX 控制器，支持 CAN FD 高速通信协议，适合需要精确控制的应用场景。',
    purchaseUrl: 'https://wcproducts.com/products/kraken',
    specs: [
      { label: '功率', value: '848W' },
      { label: '空载转速', value: '6000 RPM' },
      { label: '失速扭矩', value: '7.09 N·m' },
      { label: '失速电流', value: '366A' },
      { label: '重量', value: '0.559 kg' },
    ],
  },
  {
    id: 'roborio-2',
    name: 'roboRIO 2.0',
    category: '控制器',
    brand: 'NI (National Instruments)',
    price: '$499.00',
    description:
      'roboRIO 2.0 是 FRC 机器人的核心控制器，由 NI 专为 FIRST 赛事设计。搭载双核 ARM Cortex-A9 处理器，运行 Linux 实时操作系统，支持 Java、C++ 和 LabVIEW 编程。提供丰富的 I/O 接口，包括 DIO、AIO、PWM、CAN、SPI、I2C 和 USB。',
    purchaseUrl: 'https://www.ni.com/en/shop/model/roborio-2.html',
    specs: [
      { label: '处理器', value: 'Dual-Core ARM Cortex-A9 @ 667MHz' },
      { label: '内存', value: '512MB DDR3, 4GB eMMC' },
      { label: '通信接口', value: 'CAN, SPI, I2C, USB 3.0, Ethernet' },
      { label: '数字 I/O', value: '10 DIO, 4 PWM' },
      { label: '重量', value: '0.34 kg' },
    ],
  },
  {
    id: 'spark-max',
    name: 'SPARK MAX Motor Controller',
    category: '控制器',
    brand: 'REV Robotics',
    price: '$75.00',
    description:
      'SPARK MAX 是 REV Robotics 推出的智能电机控制器，支持有刷和无刷电机。内置 PID 控制器，支持位置、速度和电流闭环控制。通过 CAN 总线或 PWM 信号控制，与 NEO 电机配合使用效果最佳。配备 REV Hardware Client 软件，可方便地进行参数配置和固件更新。',
    purchaseUrl: 'https://www.revrobotics.com/rev-11-2158/',
    specs: [
      { label: '输入电压', value: '5.5V - 24V' },
      { label: '持续电流', value: '60A' },
      { label: '峰值电流', value: '100A（2秒）' },
      { label: '通信协议', value: 'CAN 2.0B, PWM' },
      { label: '重量', value: '0.113 kg' },
    ],
  },
  {
    id: 'talon-fx',
    name: 'Talon FX (v6)',
    category: '控制器',
    brand: 'CTR Electronics',
    price: '$79.99',
    description:
      'Talon FX 是 CTR Electronics 推出的旗舰级电机控制器，通常集成于 Falcon 500 和 Kraken X60 电机中。支持 CAN FD 高速总线，内置高精度编码器和加速度计。Phoenix 6 软件框架提供先进的运动控制功能，包括 Motion Magic 和轨迹跟踪。',
    purchaseUrl: 'https://store.ctr-electronics.com/',
    specs: [
      { label: '输入电压', value: '6V - 28V' },
      { label: '持续电流', value: '60A' },
      { label: '通信协议', value: 'CAN FD, CAN 2.0' },
      { label: '编码器分辨率', value: '2048 CPR' },
      { label: '重量', value: '含于电机总重' },
    ],
  },
  {
    id: 'navx2',
    name: 'navX2-MXP',
    category: '传感器',
    brand: 'Kauai Labs',
    price: '$59.99',
    description:
      'navX2-MXP 是 FRC 中广泛使用的惯性测量单元（IMU），提供九轴运动数据（陀螺仪、加速度计、磁力计）。可用于机器人姿态估计、路径跟踪和自动平衡。直接插入 roboRIO 的 MXP 扩展口，即插即用，无需额外接线。',
    purchaseUrl: 'https://www.kauailabs.com/store/index.php?route=product/product&product_id=56',
    specs: [
      { label: '自由度', value: '9 轴（3轴陀螺仪 + 3轴加速度计 + 3轴磁力计）' },
      { label: '陀螺仪精度', value: '±0.5°/min 漂移' },
      { label: '更新频率', value: '200Hz（SPI）/ 60Hz（I2C）' },
      { label: '接口', value: 'MXP SPI, I2C, USB' },
      { label: '重量', value: '0.028 kg' },
    ],
  },
  {
    id: 'limelight-3',
    name: 'Limelight 3',
    category: '传感器',
    brand: 'Limelight Vision',
    price: '$399.00',
    description:
      'Limelight 3 是专为 FRC 设计的智能视觉处理器，内置高性能摄像头和 AI 加速芯片。支持 AprilTag 检测、目标追踪、颜色识别和神经网络推理。通过 NetworkTables 与机器人代码无缝集成，提供目标位置、距离和角度等关键数据，是自动瞄准和自主导航的核心传感器。',
    purchaseUrl: 'https://limelightvision.io/',
    specs: [
      { label: '处理器', value: 'Dual-Core ARM + AI 加速器' },
      { label: '摄像头', value: '1280x960, 90fps' },
      { label: '视场角', value: '水平 63.3°, 垂直 49.7°' },
      { label: '延迟', value: '<25ms 端到端' },
      { label: '重量', value: '0.076 kg' },
    ],
  },
  {
    id: 'aluminum-extrusion-2x2',
    name: '2"x2" 铝型材',
    category: '结构件',
    brand: 'Various',
    price: '$15.00/ft',
    description:
      '2x2 英寸铝合金型材是 FRC 机器人结构搭建的基础材料。采用 6061-T6 铝合金，强度高、重量轻、易加工。标准 T 槽设计，可配合各种连接件快速搭建机器人框架。表面阳极氧化处理，耐腐蚀性好，广泛用于底盘、超结构和机构支架。',
    specs: [
      { label: '材质', value: '6061-T6 铝合金' },
      { label: '截面尺寸', value: '2" x 2" (50.8mm x 50.8mm)' },
      { label: '壁厚', value: '1/8" (3.175mm)' },
      { label: '线密度', value: '约 0.84 lb/ft (1.25 kg/m)' },
    ],
  },
  {
    id: 'double-acting-cylinder',
    name: '双作用气缸',
    category: '气动',
    brand: 'SMC',
    price: '$29.99',
    description:
      '双作用气缸是 FRC 气动系统中最常用的执行元件，利用压缩空气驱动活塞实现往复直线运动。双作用设计意味着伸出和缩回都由气压驱动，响应速度快、力量大。适用于抓取、推射、锁定等需要快速切换状态的机构，通过电磁阀控制气路方向实现动作切换。',
    specs: [
      { label: '缸径', value: '3/4" (19mm)' },
      { label: '行程', value: '可选 4"/6"/8"/12"' },
      { label: '工作压力', value: '最大 60 PSI (FRC 规则限制)' },
      { label: '推力（@60PSI）', value: '约 17 lbs (75.6N)' },
      { label: '接口', value: '1/8" NPT' },
    ],
  },
  {
    id: 'power-distribution-hub',
    name: 'Power Distribution Hub (PDH)',
    category: '电子元件',
    brand: 'REV Robotics',
    price: '$139.99',
    description:
      'REV Power Distribution Hub 是 FRC 机器人的电力分配核心，将电池电力分配给所有电子元件。提供 20 个高电流端口和 6 个低电流端口，每个端口都有独立的电流监测功能。通过 CAN 总线与 roboRIO 通信，可在代码中实时读取各通道电流和总电压，便于诊断和保护。',
    purchaseUrl: 'https://www.revrobotics.com/rev-11-1850/',
    specs: [
      { label: '输入电压', value: '12V DC' },
      { label: '高电流端口', value: '20 个 (40A 断路器)' },
      { label: '低电流端口', value: '6 个 (15A/20A)' },
      { label: '通信接口', value: 'CAN 2.0B' },
      { label: '重量', value: '0.34 kg' },
    ],
  },
  {
    id: 'can-wire-bundle',
    name: 'CAN 线束套件',
    category: '线材连接',
    brand: 'Various',
    price: '$9.99',
    description:
      'CAN 总线线束套件包含预压接的 CAN 通信线缆，用于连接 roboRIO、电机控制器、传感器等 CAN 设备。采用双绞线设计，有效抑制电磁干扰，确保通信稳定。套件通常包含多种长度的线缆和终端电阻，方便根据机器人布局灵活组网。',
    specs: [
      { label: '线规', value: '22 AWG 双绞线' },
      { label: '套件内容', value: '多种长度线缆 + 120Ω 终端电阻' },
      { label: '连接器', value: 'Weidmuller / Wago / JST' },
      { label: '通信速率', value: '1 Mbps (CAN 2.0B)' },
    ],
  },
]
