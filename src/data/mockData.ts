import { FactoryJob, NewsArticle, SiteSettings } from '../types';

export const INITIAL_FACTORIES: FactoryJob[] = [];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  general: {
    brandName: 'VTH NHÂN LỰC',
    subBrand: 'Công Ty TNHH Dịch Vụ Nhân Lực Vân Thượng Hồng',
    domain: 'vthnhanluc.com',
    hotline: '0823 166 683',
    hotlineCall: '0823166683',
    email: 'contact@vthnhanluc.com',
    workingHours: 'T2 - T7: 7:30 - 20:30 (CN trực online 24/7)',
    zaloLink: 'https://zalo.me/0823166683',
    license: 'Giấy phép cung ứng lao động Bộ LĐ-TB&XH',
    taxCode: '0317891234',
    headOfficeAddress: '793/55/24 Trần Xuân Soạn, P. Tân Hưng, Quận 7, TP. Hồ Chí Minh'
  },
  hero: {
    badge: 'CÔNG TY TNHH DỊCH VỤ NHÂN LỰC VÂN THƯỢNG HỒNG • VTHNHANLUC.COM',
    title: 'Giải Pháp Cung Ứng Nhân Lực & Việc Làm Nhà Máy Hàng Đầu',
    subtitle: 'Cầu nối tin cậy cho hàng chục ngàn lao động và các nhà máy, tập đoàn FDI tại Đồng Nai, Bình Dương, TP.HCM và các khu công nghiệp trọng điểm.',
    highlightText: 'Không thu bất kỳ khoản phí nào của người lao động • Hỗ trợ xe đưa đón tận nơi',
    stats: [
      { num: '50.000+', label: 'Lao động đã bố trí việc làm' },
      { num: '350+', label: 'Nhà máy & Doanh nghiệp tin tưởng' },
      { num: '24 Giờ', label: 'Thời gian cung ứng cấp tốc' },
      { num: '0 Đồng', label: 'Chi phí đối với người lao động' }
    ],
    pillars: [
      {
        title: 'Pháp Lý Đầy Đủ',
        desc: 'Giấy phép hoạt động Bộ LĐ-TB&XH, hợp đồng minh bạch'
      },
      {
        title: 'Thưởng Nóng Hấp Dẫn',
        desc: 'Nhiều đơn vị thưởng gia nhập hấp dẫn theo từng đợt tuyển'
      },
      {
        title: 'Hỗ Trợ Toàn Diện',
        desc: 'Có ký túc xá máy lạnh, bao ăn 2-3 bữa, xe đưa đón'
      },
      {
        title: 'Tuyển Dụng Cấp Tốc',
        desc: 'Phỏng vấn và nhận việc nhanh chóng chỉ trong 24 giờ'
      }
    ]
  },
  about: {
    badge: 'VỀ CHÚNG TÔI - VTH NHÂN LỰC',
    title: 'Đơn Vị Cung Ứng Nhân Lực & Giải Pháp Việc Làm Hàng Đầu',
    companyName: 'CÔNG TY TNHH DỊCH VỤ NHÂN LỰC VÂN THƯỢNG HỒNG (VTHNHANLUC.COM)',
    paragraph1: 'Trải qua nhiều năm xây dựng và phát triển, VTH Nhân Lực (Vân Thượng Hồng) tự hào là một trong những doanh nghiệp uy tín hàng đầu tại Đồng Nai, Bình Dương, TP.HCM và các tỉnh lân cận trong lĩnh vực cung ứng lao động, cho thuê lại lao động và gia công sản xuất trọn gói.',
    paragraph2: 'Với mạng lưới văn phòng tuyển dụng rộng khắp và đội ngũ quản lý hiện trường tận tâm, chúng tôi đã tạo dựng cầu nối vững chắc đưa hàng chục ngàn người lao động vào làm việc ổn định tại các nhà máy, tập đoàn công nghệ lớn.',
    experienceYears: '10+ Năm Đồng Hành',
    experienceSub: 'Cung ứng hơn 50.000+ nhân lực chất lượng cao trên toàn quốc',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop',
    coreValues: [
      {
        title: 'Uy Tín Hàng Đầu (Integrity)',
        desc: '100% tuân thủ pháp luật lao động, chi trả lương thưởng đúng hạn, không thu bất kỳ khoản phí nào của người lao động.'
      },
      {
        title: 'Tốc Độ Vượt Trội (Speed)',
        desc: 'Khả năng huy động và điều phối từ 100 đến 3.000 công nhân trong vòng 24 - 48 giờ đáp ứng kịp thời tiến độ khách hàng.'
      },
      {
        title: 'Đồng Hành Tận Tâm (Care)',
        desc: 'Hỗ trợ công nhân từ phương tiện đi lại, phòng trọ, ký túc xá máy lạnh đến chăm lo đời sống tinh thần dịp Lễ Tết.'
      }
    ],
    commitments: [
      'Giấy phép hoạt động cho thuê lại lao động được cấp bởi Bộ LĐ-TB&XH.',
      'Đội ngũ hơn 80+ chuyên viên tuyển dụng và quản lý onsite tại các xưởng.',
      'Hệ thống cơ sở dữ liệu hơn 100.000 hồ sơ ứng viên trải dài khắp cả nước.',
      'Chính sách bảo hiểm tai nạn lao động 24/24 và chăm sóc y tế toàn diện.'
    ]
  },
  offices: [
    {
      id: 'hcm-head',
      region: 'Trụ Sở Chính TP.HCM',
      address: '793/55/24 Trần Xuân Soạn, P. Tân Hưng, Quận 7, TP. Hồ Chí Minh',
      hotline: '0823 166 683'
    },
    {
      id: 'binh-duong',
      region: 'Chi Nhánh Bình Dương',
      address: 'Đường DT743, Gần KCN VSIP 1 & Sóng Thần, TP. Thuận An, Bình Dương',
      hotline: '0823 166 683'
    },
    {
      id: 'dong-nai',
      region: 'Chi Nhánh Đồng Nai',
      address: 'Đường Đồng Khởi, Gần KCN Amata & Biên Hòa 2, TP. Biên Hòa, Đồng Nai',
      hotline: '0823 166 683'
    },
    {
      id: 'mien-bac',
      region: 'Chi Nhánh Miền Bắc (Bắc Ninh - Bắc Giang)',
      address: 'KCN Quế Võ 3, TX. Quế Võ, Bắc Ninh & KCN Quang Châu, Việt Yên, Bắc Giang',
      hotline: '0823 166 683'
    }
  ],
  services: [
    {
      id: 'cho-thue-lao-dong',
      title: 'Cho Thuê Lại Lao Động (Labor Subleasing)',
      titleZh: '劳务派遣与外包服务',
      shortDesc: 'Cung cấp nguồn nhân lực hợp pháp theo Nghị định 145/2020/NĐ-CP, giải tỏa áp lực biên chế và pháp lý cho doanh nghiệp.',
      icon: 'Users',
      features: [
        'Đáp ứng nhanh từ 50 đến 3.000 lao động chỉ trong 24h - 48h',
        'Doanh nghiệp không phải lo thủ tục BHXH, HĐLĐ, tranh chấp lao động',
        'Linh hoạt tăng giảm số lượng công nhân theo mùa vụ đơn hàng',
        'Cán bộ nhân sự onsite của VTH Nhân Lực túc trực tại xưởng quản lý 24/7'
      ]
    },
    {
      id: 'cung-ung-lao-dong-thoi-vu',
      title: 'Cung Ứng Lao Động Thời Vụ (Temporary Staffing)',
      titleZh: '临时与季节性劳务供应',
      shortDesc: 'Giải pháp cấp thiết cho các mùa cao điểm đơn hàng xuất khẩu, xả kho cuối năm hoặc dự án ngắn hạn từ 1 đến 6 tháng.',
      icon: 'Clock',
      features: [
        'Bổ sung quân số tức thì tránh trễ hạn xuất hàng cho đối tác FDI',
        'Đội ngũ công nhân đã được huấn luyện tác phong kỷ luật và an toàn lao động',
        'Chi phí tính theo giờ công hoặc sản lượng thực tế, tối ưu hóa ngân sách',
        'Cam kết tỷ lệ đi làm đầy đủ >98% với lực lượng dự phòng sẵn sàng'
      ]
    },
    {
      id: 'gia-cong-dong-goi',
      title: 'Gia Công & Đóng Gói Sản Phẩm (Packaging & Assembly)',
      titleZh: '产品加工与包装外包',
      shortDesc: 'Nhận khoán trọn gói khâu gia công chi tiết, dán nhãn, đóng gói hộp quà, kiểm hàng QC theo đơn giá sản phẩm.',
      icon: 'PackageCheck',
      features: [
        'Doanh nghiệp chỉ cần nghiệm thu số lượng và chất lượng thành phẩm',
        'VTH Nhân Lực tự chịu trách nhiệm về nhân lực, máy đóng gói và tiến độ',
        'Đội ngũ kiểm soát chất lượng QA/QC được đào tạo tiêu chuẩn ISO',
        'Tiết kiệm đến 35% chi phí quản trị kho bãi và xưởng phụ trợ'
      ]
    },
    {
      id: 'boc-xep-kho-bai',
      title: 'Dịch Vụ Bốc Xếp & Vận Hành Kho Bãi (Material Handling)',
      titleZh: '仓储物流搬运装卸服务',
      shortDesc: 'Đội ngũ bốc xếp chuyên nghiệp, có chứng chỉ lái xe nâng, bốc dỡ container cảng biển và trung tâm logistics.',
      icon: 'Truck',
      features: [
        'Bốc dỡ hàng container 20ft, 40ft an toàn, tốc độ vượt trội',
        'Tài xế xe nâng tay, xe nâng điện, xe nâng dầu lành nghề có chứng chỉ',
        'Trang bị đầy đủ đồ bảo hộ lao động: giày mũi sắt, đai lưng, mũ bảo hộ',
        'Bảo hiểm hàng hóa 100% khi xảy ra sự cố va đập đổ vỡ'
      ]
    },
    {
      id: 'quan-ly-tien-luong-payroll',
      title: 'Quản Lý Tiền Lương & HR Outsourcing (Payroll Services)',
      titleZh: '薪酬核算与人事外包',
      shortDesc: 'Ủy thác toàn bộ nghiệp vụ chấm công, tính lương thưởng, giải trình thuế TNCN và thanh tra bảo hiểm cho chuyên gia.',
      icon: 'FileSpreadsheet',
      features: [
        'Bảo mật tuyệt đối thông tin lương và dữ liệu nội bộ của khách hàng',
        'Chi trả lương đúng ngày qua hệ thống liên kết ngân hàng điện tử',
        'Tư vấn chính sách lao động tuân thủ 100% luật hiện hành',
        'Hạn chế rủi ro phạt thuế và thanh tra lao động định kỳ'
      ]
    },
    {
      id: 'tuyen-dung-tay-nghe-cao',
      title: 'Tuyển Dụng Thợ Hàn, Thợ Cơ Khí, Kỹ Thuật Viên',
      titleZh: '技术工与工程师招聘',
      shortDesc: 'Tìm kiếm nhân tài có tay nghề: Thợ hàn 3G-6G, tiện phay CNC, kỹ thuật viên bảo trì máy, phiên dịch tiếng Trung/Hàn.',
      icon: 'Wrench',
      features: [
        'Test tay nghề thực tế trước khi gửi danh sách cho đối tác phỏng vấn',
        'Thời gian bảo hành ứng viên lên đến 60 ngày làm việc',
        'Nguồn ứng viên dồi dào từ các trường dạy nghề hàng đầu',
        'Phí dịch vụ cạnh tranh và thanh toán theo từng giai đoạn'
      ]
    }
  ],
  processSteps: [
    {
      id: 'step-1',
      num: '01',
      title: 'Khảo Sát & Tư Vấn Nhu Cầu',
      titleZh: '需求沟通与实地调研',
      desc: 'Tiếp nhận thông tin số lượng, tiêu chuẩn tay nghề, vị trí xưởng và tiến độ tuyển dụng từ khách hàng.'
    },
    {
      id: 'step-2',
      num: '02',
      title: 'Ký Kết Hợp Đồng & SLA',
      titleZh: '签订规范劳务派遣协议',
      desc: 'Thỏa thuận chi phí minh bạch, cam kết tỷ lệ đi làm >98% và phương án bảo hiểm, an toàn lao động.'
    },
    {
      id: 'step-3',
      num: '03',
      title: 'Tuyển Chọn & Đào Tạo Định Hướng',
      titleZh: '人员甄选与岗前安全培训',
      desc: 'Sàng lọc hồ sơ, kiểm tra sức khỏe, hướng dẫn nội quy nhà xưởng và tác phong công nghiệp trước khi vào ca.'
    },
    {
      id: 'step-4',
      num: '04',
      title: 'Bàn Giao & Xe Đưa Đón Tận Nơi',
      titleZh: '专车护送进厂与入职办理',
      desc: 'Bố trí xe đưa đón công nhân đến cổng nhà máy, hoàn tất thủ tục nhận thẻ và nhận đồng phục.'
    },
    {
      id: 'step-5',
      num: '05',
      title: 'Quản Lý Hiện Trường & Đồng Hành',
      titleZh: '驻厂管理与24小时持续支持',
      desc: 'Cán bộ quản lý túc trực tại xưởng để chấm công, giải quyết phát sinh, thay thế nhân sự kịp thời 24/7.'
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      name: 'Anh Trần Quốc Tuấn',
      role: 'Công nhân dây chuyền sản xuất',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
      content: 'Nhờ VTH Nhân Lực mà tôi được vào làm tại xưởng nhanh gọn trong 2 ngày. Lương tháng vừa rồi cả tăng ca tôi nhận được hơn 12 triệu. Ký túc xá sạch sẽ, cơm ca ngon miệng.',
      location: 'Quê: Tuyên Quang'
    },
    {
      id: 'test-2',
      name: 'Chị Nguyễn Thị Lan',
      role: 'Công nhân xưởng gia công đóng gói',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop',
      content: 'Tôi 48 tuổi rồi cứ tưởng khó xin việc nhà máy, may mắn được các bạn chuyên viên VTH Nhân Lực giới thiệu việc làm phù hợp. Công việc ngồi làm phòng mát mẻ, anh chị em xưởng rất hòa đồng.',
      location: 'Quê: Bắc Ninh'
    },
    {
      id: 'test-3',
      name: 'Ông Kenji Takahashi',
      role: 'Giám Đốc Sản Xuất - Nhà máy FDI',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      content: 'VTH Nhân Lực là đối tác cung ứng lao động tin cậy của chúng tôi tại Việt Nam. Khi xưởng cần gấp 300 lao động để chạy dự án xuất khẩu, họ đã điều động đầy đủ trong 48h với tác phong rất chuyên nghiệp.',
      location: 'KCN VSIP, Bình Dương'
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop',
      title: 'Đào Tạo Định Hướng & An Toàn Lao Động',
      titleZh: '岗前安全规范培训',
      caption: 'Công nhân được tập huấn kỹ năng và quy tắc an toàn trước khi vào ca sản xuất.'
    },
    {
      id: 'gal-2',
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop',
      title: 'Dây Chuyền Sản Xuất Công Nghệ Cao',
      titleZh: '现代化高科技生产车间',
      caption: 'Môi trường làm việc phòng sạch, trang thiết bị tự động hóa hiện đại.'
    },
    {
      id: 'gal-3',
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop',
      title: 'Bàn Giao Nhân Sự Tại Nhà Máy',
      titleZh: '现场交接与驻厂协调',
      caption: 'Cán bộ quản trị hiện trường đồng hành đón tiếp lao động tận cổng KCN.'
    },
    {
      id: 'gal-4',
      src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop',
      title: 'Đoàn Xe Đưa Đón & Hỗ Trợ Đời Sống',
      titleZh: '专属厂车接送与生活保障',
      caption: 'Hệ thống xe đưa đón công nhân miễn phí mỗi ngày từ ký túc xá đến xưởng.'
    }
  ],
  partners: [
    {
      id: 'partner-1',
      name: 'Tập Đoàn Foxconn Việt Nam',
      logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&auto=format&fit=crop',
      industry: 'Sản xuất linh kiện điện tử viễn thông',
      location: 'KCN Quế Võ, Bắc Ninh & KCN Quang Châu, Bắc Giang',
      workerCountProvided: '3.500+ Lao động',
      partnershipYear: '2021 - Nay',
      description: 'Đối tác chiến lược cung ứng nhân lực thời vụ và chính thức cho các đợt tăng công suất lắp ráp thiết bị di động.'
    },
    {
      id: 'partner-2',
      name: 'Luxshare - ICT Precision Co.',
      logo: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&auto=format&fit=crop',
      industry: 'Linh kiện tai nghe không dây & Cáp kết nối',
      location: 'KCN Vân Trung & KCN Quang Châu, Bắc Giang',
      workerCountProvided: '2.800+ Lao động',
      partnershipYear: '2022 - Nay',
      description: 'Cung cấp nhân sự phòng sạch, vận hành máy SMT và đóng gói kiểm định chất lượng sản phẩm.'
    },
    {
      id: 'partner-3',
      name: 'Samsung Electronics HCMC CE Complex',
      logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&auto=format&fit=crop',
      industry: 'Điện tử gia dụng & Màn hình hiển thị',
      location: 'Khu Công Nghệ Cao (SHTP), TP. Thủ Đức, TP.HCM',
      workerCountProvided: '1.900+ Lao động',
      partnershipYear: '2020 - Nay',
      description: 'Dịch vụ cho thuê lại lao động và gia công công đoạn hoàn thiện thiết bị gia dụng xuất khẩu Châu Âu.'
    },
    {
      id: 'partner-4',
      name: 'Goertek Vina Technology',
      logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop',
      industry: 'Thiết bị âm thanh thông minh & Kính VR',
      location: 'KCN Quế Võ, Bắc Ninh & KCN WHA, Nghệ An',
      workerCountProvided: '2.200+ Lao động',
      partnershipYear: '2022 - Nay',
      description: 'Cung ứng công nhân lắp ráp vi mạch âm thanh với tỷ lệ gắn bó trên 92% qua các mùa cao điểm.'
    },
    {
      id: 'partner-5',
      name: 'Nidec Precision Việt Nam',
      logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&auto=format&fit=crop',
      industry: 'Động cơ chính xác & Cơ khí chế tạo',
      location: 'Khu Công Nghệ Cao, TP.HCM & Long Bình, Đồng Nai',
      workerCountProvided: '1.200+ Lao động',
      partnershipYear: '2023 - Nay',
      description: 'Đội ngũ công nhân cơ khí, đứng máy CNC và kiểm tra chất lượng kính hiển vi có tay nghề cao.'
    },
    {
      id: 'partner-6',
      name: 'Tân Hiệp Phát & Logistics Quốc Tế',
      logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop',
      industry: 'Đồ uống tiêu dùng & Kho vận logistics',
      location: 'TX. Thuận An, Bình Dương & Chu Lai, Quảng Nam',
      workerCountProvided: '1.500+ Lao động',
      partnershipYear: '2021 - Nay',
      description: 'Dịch vụ trọn gói bốc xếp container, vận hành xe nâng và đóng pallet kho bãi xuất khẩu 24/7.'
    }
  ],
  calculator: {
    defaultBaseSalary: 5200000,
    overtimeWeekdayRate: 1.5,
    overtimeSundayRate: 2.0,
    overtimeHolidayRate: 3.0,
    nightShiftAllowancePercent: 30,
    defaultAttendanceBonus: 500000,
    defaultMealAllowance: 750000,
    defaultHousingAllowance: 500000,
    insuranceDeductionPercent: 10.5
  }
};

export const NEWS_LIST: NewsArticle[] = [
  {
    id: 'tin-1',
    title: 'Các KCN Đồng Nai, Bình Dương & Phía Bắc Đồng Loạt Tuyển Dụng Lao Động Lớn',
    titleZh: '越南平阳、同奈及各大工业区大量招聘工人',
    category: 'Thị Trường Lao Động',
    summary: 'Nhu cầu tuyển dụng công nhân sản xuất, đóng gói và vận hành máy tại các xưởng FDI đang gia tăng mạnh mẽ với nhiều chế độ đãi ngộ hấp dẫn.',
    summaryZh: '各大制造与外资企业纷纷开放大量用工岗位，待遇优厚并提供住宿支持。',
    content: 'Theo ghi nhận từ VTH Nhân Lực (Vân Thượng Hồng), nhu cầu tuyển dụng lao động phổ thông ngành linh kiện điện tử, cơ khí và bao bì đóng gói đang tăng trưởng vượt bậc...',
    date: '2026-09-25',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop',
    author: 'Ban Biên Tập VTH Nhân Lực'
  },
  {
    id: 'tin-2',
    title: 'Kinh Nghiệm Đi Phỏng Vấn Nhà Máy: Đậu Ngay 100% & Không Mất Bất Kỳ Khoản Phí Nào',
    titleZh: '工厂面试实用指南：零中介费与入职通关技巧',
    category: 'Cẩm Nang Việc Làm',
    summary: 'Những điều cần lưu ý về hồ sơ, kiểm tra mắt, test phản xạ và quy định trang phục khi phỏng vấn tại các nhà máy.',
    summaryZh: '国际化标准工厂面试所需证件、体检、色盲测试与着装规范指导。',
    content: 'Rất nhiều bạn trẻ lần đầu đi làm nhà máy thường lo lắng về vòng kiểm tra mắt và phỏng vấn. Tại VTH Nhân Lực, ứng viên luôn được cán bộ hướng dẫn cặn kẽ từng bước, không qua trung gian hay cò mồi, đảm bảo miễn phí 100%...',
    date: '2026-09-22',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop',
    author: 'Trưởng Ban Tuyển Dụng VTH'
  },
  {
    id: 'tin-3',
    title: 'Bảo Vệ Quyền Lợi Người Lao Động Thời Vụ Theo Bộ Luật Lao Động Hiện Hành',
    titleZh: '依据最新劳动法切实保障临时工与派遣工的合法权益',
    category: 'Chính Sách & Pháp Luật',
    summary: 'Quy định chi tiết về tiền lương làm thêm giờ, phụ cấp ca đêm 30% - 50% và bảo hiểm tai nạn lao động cho công nhân.',
    summaryZh: '关于加班费计算、夜班津贴30%-50%以及工伤保险的明确法律条文说明。',
    content: 'Khi hợp tác làm việc cùng các đối tác của VTH Nhân Lực, mọi quyền lợi về tiền lương, phụ cấp độc hại, ca đêm đều được tính toán minh bạch trên bảng lương chi tiết hàng tháng...',
    date: '2026-09-18',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop',
    author: 'Phòng Pháp Chế & An Toàn Lao Động'
  }
];

export const TESTIMONIALS = DEFAULT_SITE_SETTINGS.testimonials;
export const SERVICES_LIST = DEFAULT_SITE_SETTINGS.services;
export const PARTNERS_LIST = DEFAULT_SITE_SETTINGS.partners;
