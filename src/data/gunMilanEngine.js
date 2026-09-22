// Vedic Ashta Koota Matching Logic (36 Gunas)
export const RASHIS = [
  { id: 0, nameEn: "Mesh (Aries)", nameHi: "मेष", lord: "Mars", varna: "Kshatriya", vashya: "Chatushpad", gana: "Deva", nadi: "Adi" },
  { id: 1, nameEn: "Vrishabh (Taurus)", nameHi: "वृषभ", lord: "Venus", varna: "Vaishya", vashya: "Chatushpad", gana: "Manushya", nadi: "Madhya" },
  { id: 2, nameEn: "Mithun (Gemini)", nameHi: "मिथुन", lord: "Mercury", varna: "Shudra", vashya: "Dwipada", gana: "Deva", nadi: "Antya" },
  { id: 3, nameEn: "Kark (Cancer)", nameHi: "कर्क", lord: "Moon", varna: "Brahmin", vashya: "Jalchar", gana: "Deva", nadi: "Adi" },
  { id: 4, nameEn: "Simha (Leo)", nameHi: "सिंह", lord: "Sun", varna: "Kshatriya", vashya: "Vanchar", gana: "Manushya", nadi: "Madhya" },
  { id: 5, nameEn: "Kanya (Virgo)", nameHi: "कन्या", lord: "Mercury", varna: "Vaishya", vashya: "Dwipada", gana: "Deva", nadi: "Antya" },
  { id: 6, nameEn: "Tula (Libra)", nameHi: "तुला", lord: "Venus", varna: "Shudra", vashya: "Dwipada", gana: "Manushya", nadi: "Antya" },
  { id: 7, nameEn: "Vrishchik (Scorpio)", nameHi: "वृश्चिक", lord: "Mars", varna: "Brahmin", vashya: "Keeta", gana: "Rakshasa", nadi: "Madhya" },
  { id: 8, nameEn: "Dhanu (Sagittarius)", nameHi: "धनु", lord: "Jupiter", varna: "Kshatriya", vashya: "Chatushpad", gana: "Deva", nadi: "Adi" },
  { id: 9, nameEn: "Makar (Capricorn)", nameHi: "मकर", lord: "Saturn", varna: "Vaishya", vashya: "Jalchar", gana: "Manushya", nadi: "Adi" },
  { id: 10, nameEn: "Kumbh (Aquarius)", nameHi: "कुंभ", lord: "Saturn", varna: "Shudra", vashya: "Dwipada", gana: "Rakshasa", nadi: "Madhya" },
  { id: 11, nameEn: "Meen (Pisces)", nameHi: "मीन", lord: "Jupiter", varna: "Brahmin", vashya: "Jalchar", gana: "Deva", nadi: "Antya" }
];

export function calculateGunMilan(boyRashiIndex, girlRashiIndex) {
  const b = RASHIS[boyRashiIndex % 12];
  const g = RASHIS[girlRashiIndex % 12];

  // 1. Varna (Max 1)
  const varnaRank = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1 };
  const varnaScore = varnaRank[b.varna] >= varnaRank[g.varna] ? 1 : 0;

  // 2. Vashya (Max 2)
  let vashyaScore = b.vashya === g.vashya ? 2 : 1;
  if ((b.vashya === "Vanchar" && g.vashya === "Chatushpad") || (g.vashya === "Vanchar" && b.vashya === "Chatushpad")) {
    vashyaScore = 0.5;
  }

  // 3. Tara (Max 3)
  const diff = Math.abs(boyRashiIndex - girlRashiIndex);
  const taraScore = diff % 3 === 0 ? 3 : diff % 2 === 0 ? 1.5 : 2;

  // 4. Yoni (Max 4)
  const yoniScore = (boyRashiIndex + girlRashiIndex) % 2 === 0 ? 4 : 2;

  // 5. Graha Maitri (Max 5)
  let maitriScore = 3;
  if (b.lord === g.lord) {
    maitriScore = 5;
  } else if ((b.lord === "Sun" && g.lord === "Moon") || (b.lord === "Moon" && g.lord === "Jupiter")) {
    maitriScore = 4.5;
  } else if ((b.lord === "Saturn" && g.lord === "Sun") || (b.lord === "Mars" && g.lord === "Mercury")) {
    maitriScore = 1;
  }

  // 6. Gana (Max 6)
  let ganaScore = 5;
  if (b.gana === g.gana) {
    ganaScore = 6;
  } else if (b.gana === "Rakshasa" || g.gana === "Rakshasa") {
    ganaScore = b.gana === g.gana ? 6 : 1;
  }

  // 7. Bhakoot (Max 7)
  const rashiDist = (girlRashiIndex - boyRashiIndex + 12) % 12 + 1;
  let bhakootScore = 7;
  let bhakootDosha = false;
  if ([2, 12, 6, 8, 9, 5].includes(rashiDist)) {
    bhakootScore = 0;
    bhakootDosha = true;
  }

  // 8. Nadi (Max 8)
  let nadiScore = 8;
  let nadiDosha = false;
  if (b.nadi === g.nadi) {
    nadiScore = 0;
    nadiDosha = true;
  }

  const totalGunas = varnaScore + vashyaScore + taraScore + yoniScore + maitriScore + ganaScore + bhakootScore + nadiScore;

  let verdictEn = "Average Match";
  let verdictHi = "सामान्य मिलान";
  let verdictColor = "#E5A93C"; // yellow

  if (totalGunas >= 28) {
    verdictEn = "Excellent Divine Union (Uttam)";
    verdictHi = "अति उत्तम व सुखद दांपत्य योग";
    verdictColor = "#22C55E"; // green
  } else if (totalGunas >= 18) {
    verdictEn = "Favorable Compatibility (Madhyam)";
    verdictHi = "शुभ व अनुकूल संबंध (मध्यम)";
    verdictColor = "#38BDF8"; // blue
  } else {
    verdictEn = "Sensitive Match (Dosha Present)";
    verdictHi = "सावधानी अपेक्षित (दोष निवारण आवश्यक)";
    verdictColor = "#EF4444"; // red
  }

  return {
    boyRashi: b,
    girlRashi: g,
    totalGunas: Math.round(totalGunas * 10) / 10,
    maxGunas: 36,
    verdictEn,
    verdictHi,
    verdictColor,
    nadiDosha,
    bhakootDosha,
    breakdown: [
      { nameEn: "Varna (Spiritual Compatibility)", nameHi: "वर्ण (आत्मिक सामंजस्य)", score: varnaScore, max: 1 },
      { nameEn: "Vashya (Mutual Attraction & Control)", nameHi: "वश्य (पारस्परिक आकर्षण)", score: vashyaScore, max: 2 },
      { nameEn: "Tara (Destiny & Longevity)", nameHi: "तारा (भाग्य व आरोग्य)", score: taraScore, max: 3 },
      { nameEn: "Yoni (Intimacy & Emotional Bond)", nameHi: "योनि (शारीरिक व मानसिक सुख)", score: yoniScore, max: 4 },
      { nameEn: "Graha Maitri (Mental Harmony)", nameHi: "ग्रह मैत्री (वैचारिक तालमेल)", score: maitriScore, max: 5 },
      { nameEn: "Gana (Temperament & Ego)", nameHi: "गण (स्वभाव व प्रवृत्ति)", score: ganaScore, max: 6 },
      { nameEn: "Bhakoot (Family Happiness & Wealth)", nameHi: "भकूट (संतान व आर्थिक समृद्धि)", score: bhakootScore, max: 7, hasDosha: bhakootDosha },
      { nameEn: "Nadi (Health & Genetic Lineage)", nameHi: "नाड़ी (स्वास्थ्य व वंश वृद्धि)", score: nadiScore, max: 8, hasDosha: nadiDosha }
    ]
  };
}
