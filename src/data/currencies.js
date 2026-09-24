export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', name: 'India (INR)', rate: 1, flag: '🇮🇳' },
  USD: { code: 'USD', symbol: '$', name: 'USA / International (USD)', rate: 0.012, flag: '🇺🇸' },
  AED: { code: 'AED', symbol: 'AED ', name: 'UAE / Middle East (AED)', rate: 0.044, flag: '🇦🇪' },
  GBP: { code: 'GBP', symbol: '£', name: 'United Kingdom (GBP)', rate: 0.0095, flag: '🇬🇧' },
  EUR: { code: 'EUR', symbol: '€', name: 'Europe (EUR)', rate: 0.011, flag: '🇪🇺' },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canada (CAD)', rate: 0.016, flag: '🇨🇦' }
};

export const PLANS_DATA = [
  {
    id: 'starter',
    badge: 'QUICK INSIGHT',
    title: {
      en: 'Focused Consultation',
      hi: 'संक्षिप्त परामर्श'
    },
    tagline: {
      en: 'A focused 15-minute conversation about your concerns',
      hi: 'आपकी चिंताओं पर 15 मिनट की केंद्रित बातचीत'
    },
    baseInr: 399,
    baseUsd: 19,
    duration: '15 Mins',
    format: {
      en: 'Live phone or WhatsApp audio call',
      hi: 'लाइव फोन या WhatsApp ऑडियो कॉल'
    },
    features: {
      en: [
        'Time-based consultation; discuss your relevant concerns',
        'Birth chart and transit overview',
        'Practical guidance and remedies',
        'No per-question limit'
      ],
      hi: [
        'समय-आधारित परामर्श; संबंधित विषयों पर चर्चा',
        'कुंडली और ग्रह गोचर का संक्षिप्त विश्लेषण',
        'व्यावहारिक मार्गदर्शन और उपाय',
        'प्रश्नों की अलग से कोई सीमा नहीं'
      ]
    },
    cta: {
      en: 'Book 15-Min Session',
      hi: '15-मिनट सेशन बुक करें'
    },
    popular: false
  },
  {
    id: 'deep',
    badge: 'MOST POPULAR',
    title: {
      en: 'Complete Kundli & Remedies Session',
      hi: 'विस्तृत कुंडली व अचूक उपाय सेशन'
    },
    tagline: {
      en: 'Comprehensive 45-min one-on-one session for life clarity',
      hi: 'जीवन, करियर व प्रेम की संपूर्ण स्पष्टता हेतु 45 मिनट का सेशन'
    },
    baseInr: 1199,
    baseUsd: 49,
    duration: '45 Mins',
    format: {
      en: 'Live Phone / WhatsApp Audio Call',
      hi: 'लाइव फोन कॉल / WhatsApp ऑडियो कॉल'
    },
    features: {
      en: [
        'Full D1 Birth Chart & D9 Navamsha analysis',
        'Current Vimshottari Mahadasha & Antardasha',
        'In-depth Love, Marriage or Career guidance',
        'Dosha check (Manglik, Sade Sati, Rahu/Ketu)',
        'Customized Lal Kitab & Gemstone Remedies',
        '45-minute private conversation with Pandit Ashutosh Chamoli',
        'Full audio recording provided afterwards'
      ],
      hi: [
        'लग्न चक्र (D1) व नवांश (D9) का संपूर्ण अध्ययन',
        'वर्तमान विंशोत्तरी महादशा व अंतर्दशा का प्रभाव',
        'प्रेम, विवाह, करियर या व्यापार का गहन समाधान',
        'दोष विश्लेषण (मांगलिक, साढ़ेसाती, कालसर्प आदि)',
        'लाल किताब के अचूक व व्यावहारिक सिद्ध उपाय',
        'पंडित आशुतोष चमोली से 45 मिनट की निजी बातचीत',
        'सेशन की संपूर्ण ऑडियो रिकॉर्डिंग उपलब्ध'
      ]
    },
    cta: {
      en: 'Book 45-Min Session',
      hi: '45-मिनट सेशन बुक करें'
    },
    popular: true
  },
  {
    id: 'vip',
    badge: 'ROYAL VIP GUIDANCE',
    title: {
      en: 'Extended Kundli & Milan Session',
      hi: 'विस्तृत कुंडली और मिलान सेशन'
    },
    tagline: {
      en: 'A longer 75-minute session for two charts and detailed guidance',
      hi: 'दो कुंडलियों और विस्तृत मार्गदर्शन के लिए 75 मिनट का सेशन'
    },
    baseInr: 2499,
    baseUsd: 89,
    duration: '75 Mins',
    format: {
      en: 'VIP Video Call or Private Phone Call',
      hi: 'VIP वीडियो कॉल अथवा फोन कॉल'
    },
    features: {
      en: [
        'Dual Chart Reading (Self + Partner/Child)',
        'Next 24 Months Month-by-Month prediction',
        'Kundli Milan / Gun Milan & Marital Harmony',
        'Personalized Vedic Mantra & Yantra guidance',
        'Favorable Gemstone, Rudraksha & Metal advice',
        '75-minute time-based consultation',
        'Discuss relevant questions during the session; no per-question limit'
      ],
      hi: [
        'दो कुंडलियों का गहन अध्ययन (स्वयं + जीवनसाथी/संतान)',
        'आगामी 24 महीनों का माहवार सूक्ष्म भविष्यफल',
        'कुंडली मिलान, गुण मिलान व दांपत्य सुख के उपाय',
        'सिद्ध वैदिक मंत्र, यंत्र व रत्न/रुद्राक्ष मार्गदर्शन',
        '75 मिनट का समय-आधारित परामर्श',
        'सेशन में संबंधित सवालों पर चर्चा; सवालों की अलग सीमा नहीं'
      ]
    },
    cta: {
      en: 'Claim VIP Session',
      hi: 'VIP सेशन प्राप्त करें'
    },
    popular: false
  }
];
