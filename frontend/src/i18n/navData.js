const AR_ROUTES = ['/about', '/services', '/contact', '/europcar', '/chauffeur-service', '/leasing', '/careers', '/partner', '/goldcar', '/truckline', '/autocare', '/used-cars', '/sustainability', '/media', '/leadership', '/faq', '/downloads', '/businesses', '/portal/corporate', '/portal/driver'];

export const toArPath = (p) => (p === '/' ? '/ar' : AR_ROUTES.includes(p) ? `/ar${p}` : '/ar');
export const toEnPath = (p) => p.replace(/^\/ar/, '') || '/';
const arHref = (href) => (href === '/' ? '/ar' : AR_ROUTES.includes(href) ? `/ar${href}` : href);

// Brand tiles shared by mega menu, mobile accordion and footer (7 brands; Emirates Taxi is folded into Chauffeur)
const brandsEn = [
  { id: 'europcar', label: 'Europcar UAE', desc: 'Daily, monthly & long-term car rental', href: '/europcar', logo: '/europcar-logo.png', img: '/brand/hero-dubai-sedan.jpg' },
  { id: 'goldcar', label: 'Goldcar UAE', desc: 'Smart-value airport & city car hire', href: '/goldcar', logo: '/goldcar-logo.png', img: '/brand/goldcar-keys.jpg' },
  { id: 'chauffeur', label: 'Eurogulf Premium Chauffeur', desc: 'Executive, VIP & airport chauffeur service', href: '/chauffeur-service', img: '/brand/chauffeur-door.jpg' },
  { id: 'coaches', label: 'Royal Limousine Coaches', desc: 'Luxury bus & coach transportation', href: '/royal-limousine', img: '/brand/egmg-coach-highway.jpg' },
  { id: 'truckline', label: 'Truckline Transport', desc: 'Vans, trucks & chiller fleet leasing', href: '/truckline', img: '/brand/truckline-truck.jpg' },
  { id: 'autocare', label: 'Eurogulf Auto Garage', desc: 'A-grade workshops, repair & fleet care', href: '/autocare', img: '/brand/autocare-workshop.jpg' },
  { id: 'used-cars', label: 'Eurogulf Used Cars', desc: 'Certified ex-fleet pre-owned vehicles', href: '/used-cars', img: '/brand/handover-couple.jpg' },
];

const en = {
  navLinks: [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about', dropdownId: 'about' },
    { id: 'our-brands', label: 'Our Brands', href: '/businesses', dropdownId: 'brands' },
    { id: 'for-business', label: 'For Business', href: '/services', dropdownId: 'business' },
    { id: 'for-you', label: 'For You', href: '/services#personal', dropdownId: 'personal' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ],
  aboutLinks: [
    { label: 'Who We Are', href: '/about', sub: 'Our story since 1976' },
    { label: 'Leadership', href: '/leadership' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Media Center', href: '/media' },
    { label: 'Careers', href: '/careers' },
    { label: 'Partner With Us', href: '/partner' },
  ],
  brandsLinks: brandsEn,
  businessLinks: [
    { label: 'Corporate Operational Leasing', href: '/leasing', sub: 'Long-term fleet with full maintenance' },
    { label: 'Staff & Corporate Transportation', href: '/royal-limousine', sub: 'Buses, coaches & shuttle routes' },
    { label: 'Fleet Management', href: '/dubai-municipality', sub: 'Telematics & managed operations' },
    { label: 'Commercial Vehicle Leasing', href: '/truckline', sub: 'Vans, trucks & chiller units' },
    { label: 'VIP, Events & Delegations', href: '/chauffeur-service', sub: 'Managed chauffeur logistics' },
    { label: 'Fleet Workshop & Auto Care', href: '/autocare', sub: 'Maintenance contracts' },
  ],
  personalLinks: [
    { label: 'Rent a Car', href: '/europcar', sub: 'Daily, weekly & monthly' },
    { label: 'Book a Chauffeur', href: '/book-chauffeur', sub: 'Hourly, point-to-point' },
    { label: 'Airport Transfers', href: '/chauffeur-service', sub: 'DXB, DWC, AUH & SHJ' },
    { label: 'Monthly Car Rental', href: '/monthly-car-rental-dubai', sub: 'Flexible subscriptions' },
    { label: 'Buy Certified Pre-Owned', href: '/used-cars', sub: 'Ex-fleet, inspected' },
  ],
  supportLinks: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ & Help Center', href: '/faq' },
    { label: 'Download Center', href: '/downloads' },
    { label: 'Corporate Client Portal', href: '/portal/corporate' },
    { label: 'Driver / Partner Portal', href: '/portal/driver' },
  ],
  labels: {
    getQuote: 'Get a Quote',
    phone: '800 364',
    call: 'Call 800 364',
    whatsapp: 'WhatsApp',
    aboutHeader: 'About Eurogulf',
    brandsHeader: 'Our Brands',
    businessHeader: 'For Business',
    personalHeader: 'For You',
    supportHeader: 'Support',
    viewAllBrands: 'View all brands',
    langLabel: 'عربي',
    quoteHref: '/contact',
    menu: 'Menu',
    close: 'Close',
    tagline: 'WE MOVE YOU!',
  },
  footer: {
    about: "The UAE's most diversified mobility group since 1976: car rental, leasing, chauffeur, bus & coach, commercial fleet, workshops and pre-owned sales, under one trusted name.",
    tagline: 'WE MOVE YOU!',
    groupHeader: 'Group',
    groupLinks: [
      { label: 'About Us', href: '/about' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Media Center', href: '/media' },
      { label: 'Careers', href: '/careers' },
      { label: 'Partner With Us', href: '/partner' },
    ],
    brandsHeader: 'Our Brands',
    solutionsHeader: 'Solutions',
    supportHeader: 'Support',
    contactHeader: 'Contact',
    phone: '800 364 (Toll-Free)',
    email: 'wemoveyou@eurogulf.ae',
    location: 'Europcar Head Office, Al Quoz Industrial Area 1, Dubai, UAE',
    whatsapp: 'Chat on WhatsApp',
    rights: '© 2026 Eurogulf Mobility Group. All rights reserved.',
    iso: 'ISO 9001:2015 · ISO 10002:2014 Certified',
  },
};

const arLinks = (items) => items.map((l) => ({ ...l, href: arHref(l.href) }));

const brandsAr = arLinks([
  { id: 'europcar', label: 'يوروبكار الإمارات', desc: 'تأجير يومي وشهري وطويل الأمد', href: '/europcar', logo: '/europcar-logo.png', img: '/brand/hero-dubai-sedan.jpg' },
  { id: 'goldcar', label: 'جولدكار الإمارات', desc: 'تأجير ذكي بأفضل قيمة من المطارات والمدن', href: '/goldcar', logo: '/goldcar-logo.png', img: '/brand/goldcar-keys.jpg' },
  { id: 'chauffeur', label: 'يوروجلف بريميوم شوفير', desc: 'خدمة سائق خاص تنفيذية وVIP ونقل المطارات', href: '/chauffeur-service', img: '/brand/chauffeur-door.jpg' },
  { id: 'coaches', label: 'رويال ليموزين للحافلات', desc: 'نقل فاخر بالحافلات والكوتشات', href: '/royal-limousine', img: '/brand/egmg-coach-highway.jpg' },
  { id: 'truckline', label: 'تراكلاين ترانسبورت', desc: 'تأجير الفانات والشاحنات ووحدات التبريد', href: '/truckline', img: '/brand/truckline-truck.jpg' },
  { id: 'autocare', label: 'يوروجلف أوتو جراج', desc: 'ورش من الفئة أ وصيانة الأساطيل', href: '/autocare', img: '/brand/autocare-workshop.jpg' },
  { id: 'used-cars', label: 'يوروجلف للسيارات المستعملة', desc: 'سيارات مستعملة معتمدة من أسطولنا', href: '/used-cars', img: '/brand/handover-couple.jpg' },
]);

const ar = {
  navLinks: [
    { id: 'home', label: 'الرئيسية', href: '/ar' },
    { id: 'about', label: 'عن المجموعة', href: '/ar/about', dropdownId: 'about' },
    { id: 'our-brands', label: 'علاماتنا التجارية', href: '/ar/businesses', dropdownId: 'brands' },
    { id: 'for-business', label: 'للشركات', href: '/ar/services', dropdownId: 'business' },
    { id: 'for-you', label: 'للأفراد', href: '/ar/services', dropdownId: 'personal' },
    { id: 'contact', label: 'اتصل بنا', href: '/ar/contact' },
  ],
  aboutLinks: arLinks([
    { label: 'من نحن', href: '/about', sub: 'قصتنا منذ ١٩٧٦' },
    { label: 'القيادة', href: '/leadership' },
    { label: 'الاستدامة', href: '/sustainability' },
    { label: 'المركز الإعلامي', href: '/media' },
    { label: 'الوظائف', href: '/careers' },
    { label: 'شراكة معنا', href: '/partner' },
  ]),
  brandsLinks: brandsAr,
  businessLinks: arLinks([
    { label: 'التأجير التشغيلي للشركات', href: '/leasing', sub: 'أسطول طويل الأمد مع صيانة كاملة' },
    { label: 'نقل الموظفين والشركات', href: '/royal-limousine', sub: 'حافلات وكوتشات ومسارات مكوكية' },
    { label: 'إدارة الأساطيل', href: '/dubai-municipality', sub: 'تتبع وعمليات مُدارة' },
    { label: 'تأجير المركبات التجارية', href: '/truckline', sub: 'فانات وشاحنات ووحدات تبريد' },
    { label: 'الفعاليات والوفود وVIP', href: '/chauffeur-service', sub: 'لوجستيات سائق خاص مُدارة' },
    { label: 'ورشة الأسطول والعناية بالسيارات', href: '/autocare', sub: 'عقود صيانة' },
  ]),
  personalLinks: arLinks([
    { label: 'استأجر سيارة', href: '/europcar', sub: 'يومي وأسبوعي وشهري' },
    { label: 'احجز سائقاً خاصاً', href: '/chauffeur-service', sub: 'بالساعة أو من نقطة إلى نقطة' },
    { label: 'نقل المطارات', href: '/chauffeur-service', sub: 'دبي وآل مكتوم وأبوظبي والشارقة' },
    { label: 'التأجير الشهري', href: '/europcar', sub: 'اشتراكات مرنة' },
    { label: 'اشترِ سيارة مستعملة معتمدة', href: '/used-cars', sub: 'من أسطولنا، مفحوصة' },
  ]),
  supportLinks: arLinks([
    { label: 'اتصل بنا', href: '/contact' },
    { label: 'الأسئلة الشائعة ومركز المساعدة', href: '/faq' },
    { label: 'مركز التحميل', href: '/downloads' },
    { label: 'بوابة عملاء الشركات', href: '/portal/corporate' },
    { label: 'بوابة السائقين والشركاء', href: '/portal/driver' },
  ]),
  labels: {
    getQuote: 'احصل على عرض سعر',
    phone: '800 364',
    call: 'اتصل 800 364',
    whatsapp: 'واتساب',
    aboutHeader: 'عن يوروجلف',
    brandsHeader: 'علاماتنا التجارية',
    businessHeader: 'للشركات',
    personalHeader: 'للأفراد',
    supportHeader: 'الدعم',
    viewAllBrands: 'عرض جميع العلامات',
    langLabel: 'EN',
    quoteHref: '/ar/contact',
    menu: 'القائمة',
    close: 'إغلاق',
    tagline: 'نحن ننقلك!',
  },
  footer: {
    about: 'مجموعة التنقل الأكثر تنوعاً في الإمارات منذ عام ١٩٧٦: تأجير السيارات، التأجير التشغيلي، السائق الخاص، الحافلات، الأساطيل التجارية، الورش، والسيارات المستعملة تحت اسم واحد موثوق.',
    tagline: 'نحن ننقلك!',
    groupHeader: 'المجموعة',
    groupLinks: arLinks([
      { label: 'من نحن', href: '/about' },
      { label: 'القيادة', href: '/leadership' },
      { label: 'الاستدامة', href: '/sustainability' },
      { label: 'المركز الإعلامي', href: '/media' },
      { label: 'الوظائف', href: '/careers' },
      { label: 'شراكة معنا', href: '/partner' },
    ]),
    brandsHeader: 'علاماتنا التجارية',
    solutionsHeader: 'الحلول',
    supportHeader: 'الدعم',
    contactHeader: 'تواصل معنا',
    phone: '800 364 (خط مجاني)',
    email: 'wemoveyou@eurogulf.ae',
    location: 'المكتب الرئيسي ليوروبكار، القوز الصناعية ١، دبي، الإمارات',
    whatsapp: 'تحدث معنا عبر واتساب',
    rights: '© ٢٠٢٦ مجموعة يوروجلف للتنقل. جميع الحقوق محفوظة.',
    iso: 'معتمدة وفق ISO 9001:2015 و ISO 10002:2014',
  },
};

export const getNavData = (isAr) => (isAr ? ar : en);
