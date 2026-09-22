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
      en: '1 Urgent Question Session',
      hi: '1 त्वरित प्रश्न परामर्श'
    },
    tagline: {
      en: 'Immediate clarity on your single most pressing doubt',
      hi: 'आपकी सबसे जरूरी उलझन का तुरंत समाधान'
    },
    baseInr: 599,
    baseUsd: 19,
    duration: '15-20 Mins',
    format: {
      en: 'WhatsApp Audio Note / Detailed Text',
      hi: 'WhatsApp ऑडियो संदेश / विस्तृत विवरण'
    },
    features: {
      en: [
        'Single focused question analysis',
        'Direct Lagna & transit insight',
        'Quick practical remedy (Upay)',
        'Delivery within 2-4 hours',
        '1 follow-up question allowed'
      ],
      hi: [
        'एक मुख्य प्रश्न का सटीक विश्लेषण',
        'लग्न व ग्रह गोचर आधारित उत्तर',
        'एक सरल व अचूक वैदिक उपाय',
        '2 से 4 घंटे के भीतर उत्तर',
        '1 फॉलो-अप सवाल पूछने की अनुमति'
      ]
    },
    cta: {
      en: 'Ask 1 Question Now',
      hi: 'अभी 1 प्रश्न पूछें'
    },
    popular: false
  },
  {
    id: 'deep',
    badge: '⭐ MOST POPULAR • 82% SEEKERS CHOOSE THIS',
    title: {
      en: 'Complete Kundli & Remedies Session',
      hi: 'विस्तृत कुंडली व अचूक उपाय सेशन'
    },
    tagline: {
      en: 'Comprehensive 45-min one-on-one session for life clarity',
      hi: 'जीवन, करियर व प्रेम की संपूर्ण स्पष्टता हेतु 45 मिनट का सेशन'
    },
    baseInr: 1499,
    baseUsd: 49,
    duration: '40-45 Mins',
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
        'Direct personal conversation with Acharya',
        'Full audio recording provided afterwards'
      ],
      hi: [
        'लग्न चक्र (D1) व नवांश (D9) का संपूर्ण अध्ययन',
        'वर्तमान विंशोत्तरी महादशा व अंतर्दशा का प्रभाव',
        'प्रेम, विवाह, करियर या व्यापार का गहन समाधान',
        'दोष विश्लेषण (मांगलिक, साढ़ेसाती, कालसर्प आदि)',
        'लाल किताब के अचूक व व्यावहारिक सिद्ध उपाय',
        'आचार्य जी से सीधे फोन पर 45 मिनट बातचीत',
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
      en: 'VIP Lifetime & Couple Kundli Reading',
      hi: 'VIP लाइफटाइम व युगल कुंडली परामर्श'
    },
    tagline: {
      en: 'Holistic 2-chart matching, yearly roadmap & 30-day WhatsApp access',
      hi: '2 कुंडलियों का विश्लेषण, 1 साल का भविष्यफल व 30 दिन का सीधा संपर्क'
    },
    baseInr: 2999,
    baseUsd: 89,
    duration: '75-90 Mins',
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
        '30 Days Priority WhatsApp follow-up support',
        'Emergency remedy guidance anytime'
      ],
      hi: [
        'दो कुंडलियों का गहन अध्ययन (स्वयं + जीवनसाथी/संतान)',
        'आगामी 24 महीनों का माहवार सूक्ष्म भविष्यफल',
        'कुंडली मिलान, गुण मिलान व दांपत्य सुख के उपाय',
        'सिद्ध वैदिक मंत्र, यंत्र व रत्न/रुद्राक्ष मार्गदर्शन',
        '30 दिनों तक WhatsApp पर प्राथमिकता के साथ सपोर्ट',
        'भविष्य में किसी भी निर्णय पर त्वरित मार्गदर्शन'
      ]
    },
    cta: {
      en: 'Claim VIP Session',
      hi: 'VIP सेशन प्राप्त करें'
    },
    popular: false
  }
];
