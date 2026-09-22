/**
 * Classical Vedic Ashta Koota Matching Engine (36 Gunas)
 * Derived from Brihat Parashara Hora Shastra & Muhurta Chintamani
 */

import { NAKSHATRAS, RASHIS } from './astronomyEngine.js';

// Yoni Enmity & Score Matrix (14 Yonis)
// Yoni types: 0:Horse, 1:Elephant, 2:Sheep, 3:Serpent, 4:Dog, 5:Cat, 6:Rat, 7:Cow, 8:Buffalo, 9:Tiger, 10:Deer, 11:Monkey, 12:Mongoose, 13:Lion
const YONI_NAMES = ["Horse", "Elephant", "Sheep", "Serpent", "Dog", "Cat", "Rat", "Cow", "Buffalo", "Tiger", "Deer", "Monkey", "Mongoose", "Lion"];

// Sworn enemy pairs (Shathru Yonis) yielding 0 points:
// Horse vs Buffalo (0 vs 8)
// Elephant vs Lion (1 vs 13)
// Sheep vs Monkey (2 vs 11)
// Serpent vs Mongoose (3 vs 12)
// Dog vs Deer (4 vs 10)
// Cat vs Rat (5 vs 6)
// Cow vs Tiger (7 vs 9)
const ENEMY_PAIRS = [
  [0, 8], [8, 0],
  [1, 13], [13, 1],
  [2, 11], [11, 2],
  [3, 12], [12, 3],
  [4, 10], [10, 4],
  [5, 6], [6, 5],
  [7, 9], [9, 7]
];

function getYoniScore(yoni1Name, yoni2Name) {
  const y1 = YONI_NAMES.indexOf(yoni1Name);
  const y2 = YONI_NAMES.indexOf(yoni2Name);
  if (y1 === y2) return 4; // Same Yoni
  for (const [a, b] of ENEMY_PAIRS) {
    if ((y1 === a && y2 === b) || (y1 === b && y2 === a)) {
      return 0; // Inimical (Sworn enemies)
    }
  }
  // Friendly or neutral
  return 2;
}

// Graha Maitri (Planetary Friendship Matrix)
// Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn
const PLANET_FRIENDS = {
  Sun: { friends: ["Moon", "Mars", "Jupiter"], neutrals: ["Mercury"], enemies: ["Venus", "Saturn"] },
  Moon: { friends: ["Sun", "Mercury"], neutrals: ["Mars", "Jupiter", "Venus", "Saturn"], enemies: [] },
  Mars: { friends: ["Sun", "Moon", "Jupiter"], neutrals: ["Venus", "Saturn"], enemies: ["Mercury"] },
  Mercury: { friends: ["Sun", "Venus"], neutrals: ["Mars", "Jupiter", "Saturn"], enemies: ["Moon"] },
  Jupiter: { friends: ["Sun", "Moon", "Mars"], neutrals: ["Saturn"], enemies: ["Mercury", "Venus"] },
  Venus: { friends: ["Mercury", "Saturn"], neutrals: ["Mars", "Jupiter"], enemies: ["Sun", "Moon"] },
  Saturn: { friends: ["Mercury", "Venus"], neutrals: ["Jupiter"], enemies: ["Sun", "Moon", "Mars"] }
};

function getGrahaMaitriScore(lord1, lord2) {
  if (lord1 === lord2) return 5;
  const p1 = PLANET_FRIENDS[lord1] || { friends: [], neutrals: [], enemies: [] };
  const p2 = PLANET_FRIENDS[lord2] || { friends: [], neutrals: [], enemies: [] };

  const rel1 = p1.friends.includes(lord2) ? "friend" : p1.neutrals.includes(lord2) ? "neutral" : "enemy";
  const rel2 = p2.friends.includes(lord1) ? "friend" : p2.neutrals.includes(lord1) ? "neutral" : "enemy";

  if (rel1 === "friend" && rel2 === "friend") return 5;
  if ((rel1 === "friend" && rel2 === "neutral") || (rel1 === "neutral" && rel2 === "friend")) return 4;
  if (rel1 === "neutral" && rel2 === "neutral") return 3;
  if ((rel1 === "friend" && rel2 === "enemy") || (rel1 === "enemy" && rel2 === "friend")) return 1;
  if ((rel1 === "neutral" && rel2 === "enemy") || (rel1 === "enemy" && rel2 === "neutral")) return 0.5;
  return 0; // Both enemies
}

// Vashya Categories
const RASHI_VASHYA = ["Chatushpada", "Chatushpada", "Dwipada", "Jalachara", "Vanachara", "Dwipada", "Dwipada", "Keeta", "Chatushpada", "Jalachara", "Dwipada", "Jalachara"];

// Varna Hierarchy: Brahmin > Kshatriya > Vaishya > Shudra
const RASHI_VARNA = [
  "Kshatriya", // Aries
  "Vaishya",   // Taurus
  "Shudra",    // Gemini
  "Brahmin",   // Cancer
  "Kshatriya", // Leo
  "Vaishya",   // Virgo
  "Shudra",    // Libra
  "Brahmin",   // Scorpio
  "Kshatriya", // Sagittarius
  "Vaishya",   // Capricorn
  "Shudra",    // Aquarius
  "Brahmin"    // Pisces
];

const VARNA_GRADE = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1 };

export function calculateAuthenticGunMilan(boyNakshatraId, boyPada, girlNakshatraId, girlPada) {
  const bNak = NAKSHATRAS[boyNakshatraId % 27];
  const gNak = NAKSHATRAS[girlNakshatraId % 27];

  // Calculate respective Moon Rashis
  // Each nakshatra = 4 padas. 9 padas = 1 rashi
  const bAbsolutePada = (boyNakshatraId * 4) + (boyPada - 1);
  const gAbsolutePada = (girlNakshatraId * 4) + (girlPada - 1);

  const bRashiIdx = Math.floor(bAbsolutePada / 9) % 12;
  const gRashiIdx = Math.floor(gAbsolutePada / 9) % 12;

  const bRashi = RASHIS[bRashiIdx];
  const gRashi = RASHIS[gRashiIdx];

  // 1. Varna Koota (Max 1 Point)
  const bVarna = RASHI_VARNA[bRashiIdx];
  const gVarna = RASHI_VARNA[gRashiIdx];
  const varnaScore = VARNA_GRADE[bVarna] >= VARNA_GRADE[gVarna] ? 1 : 0;

  // 2. Vashya Koota (Max 2 Points)
  const bVashya = RASHI_VASHYA[bRashiIdx];
  const gVashya = RASHI_VASHYA[gRashiIdx];
  let vashyaScore = 1;
  if (bVashya === gVashya) {
    vashyaScore = 2;
  } else if ((bVashya === "Vanachara" && gVashya === "Chatushpada") || (gVashya === "Vanachara" && bVashya === "Chatushpada")) {
    vashyaScore = 0.5;
  } else if (bVashya === "Dwipada" && (gVashya === "Chatushpada" || gVashya === "Jalachara")) {
    vashyaScore = 1;
  }

  // 3. Tara Koota (Max 3 Points)
  // Count from Boy to Girl mod 9 & Girl to Boy mod 9
  const bToG = ((girlNakshatraId - boyNakshatraId + 27) % 9) + 1;
  const gToB = ((boyNakshatraId - girlNakshatraId + 27) % 9) + 1;
  // Inauspicious taras: 3 (Vipat), 5 (Pratyak), 7 (Naidhana)
  const badTaras = [3, 5, 7];
  const bAuspicious = !badTaras.includes(bToG);
  const gAuspicious = !badTaras.includes(gToB);

  let taraScore = 0;
  if (bAuspicious && gAuspicious) taraScore = 3;
  else if (bAuspicious || gAuspicious) taraScore = 1.5;

  // 4. Yoni Koota (Max 4 Points)
  const yoniScore = getYoniScore(bNak.yoni, gNak.yoni);

  // 5. Graha Maitri (Max 5 Points)
  const maitriScore = getGrahaMaitriScore(bRashi.ruler, gRashi.ruler);

  // 6. Gana Koota (Max 6 Points)
  let ganaScore = 0;
  if (bNak.gana === gNak.gana) {
    ganaScore = 6;
  } else if ((bNak.gana === "Deva" && gNak.gana === "Manushya") || (bNak.gana === "Manushya" && gNak.gana === "Deva")) {
    ganaScore = 5;
  } else if (bNak.gana === "Deva" && gNak.gana === "Rakshasa") {
    ganaScore = 1;
  } else if (bNak.gana === "Rakshasa" && gNak.gana === "Deva") {
    ganaScore = 0;
  } else if (bNak.gana === "Manushya" && gNak.gana === "Rakshasa") {
    ganaScore = 0;
  } else {
    ganaScore = 0;
  }

  // 7. Bhakoot Koota (Max 7 Points)
  const rashiDist = ((gRashiIdx - bRashiIdx + 12) % 12) + 1;
  let bhakootScore = 7;
  let bhakootDosha = false;
  let bhakootParihar = false;

  // Inauspicious Bhakoot pairs: 2/12 (Dwirdwadash), 6/8 (Shadhashtak), 9/5 (Navapancham)
  if ([2, 12, 6, 8, 9, 5].includes(rashiDist)) {
    bhakootDosha = true;
    // Classical Parihar: If Rashi lords are identical (e.g. Aries-Scorpio, Taurus-Libra) or mutual friends
    if (bRashi.ruler === gRashi.ruler || maitriScore >= 4) {
      bhakootParihar = true;
      bhakootScore = 7;
    } else {
      bhakootScore = 0;
    }
  }

  // 8. Nadi Koota (Max 8 Points)
  let nadiScore = 8;
  let nadiDosha = false;
  let nadiParihar = false;

  if (bNak.nadi === gNak.nadi) {
    nadiDosha = true;
    // Classical Nadi Parihar:
    // 1. Same Rashi but different Nakshatras
    // 2. Same Nakshatra but different Rashis (e.g. Krittika 1 vs Krittika 2)
    // 3. Same Nakshatra but different Padas for Rohini, Mrigashira, Ardra, Pushya, etc.
    if (bRashiIdx === gRashiIdx && boyNakshatraId !== girlNakshatraId) {
      nadiParihar = true;
      nadiScore = 8;
    } else if (boyNakshatraId === girlNakshatraId && bRashiIdx !== gRashiIdx) {
      nadiParihar = true;
      nadiScore = 8;
    } else {
      nadiScore = 0;
    }
  }

  const totalGunas = varnaScore + vashyaScore + taraScore + yoniScore + maitriScore + ganaScore + bhakootScore + nadiScore;

  let verdictEn = "Average Match (Consultation Recommended)";
  let verdictHi = "मध्यम मिलान (ज्योतिषीय परामर्श आवश्यक)";
  let verdictColor = "#E5A93C"; // gold/amber

  if (totalGunas >= 28) {
    verdictEn = "Excellent Divine Union (Uttam)";
    verdictHi = "अति उत्तम व सुखद दांपत्य योग";
    verdictColor = "#22C55E"; // emerald green
  } else if (totalGunas >= 18) {
    verdictEn = "Auspicious & Harmonious (Shubha)";
    verdictHi = "शुभ व अनुकूल दांपत्य जीवन";
    verdictColor = "#38BDF8"; // blue
  } else {
    verdictEn = "Sensitive Match (Dosha Present — Remedies Required)";
    verdictHi = "गंभीर दोष उपस्थित (वैदिक उपाय अनिवार्य)";
    verdictColor = "#EF4444"; // crimson red
  }

  return {
    boy: {
      nakshatra: bNak.name,
      pada: boyPada,
      rashi: bRashi.nameEn,
      rashiHi: bRashi.nameHi,
      lord: bRashi.ruler,
      nadi: bNak.nadi,
      gana: bNak.gana,
      yoni: bNak.yoni
    },
    girl: {
      nakshatra: gNak.name,
      pada: girlPada,
      rashi: gRashi.nameEn,
      rashiHi: gRashi.nameHi,
      lord: gRashi.ruler,
      nadi: gNak.nadi,
      gana: gNak.gana,
      yoni: gNak.yoni
    },
    totalGunas: Math.round(totalGunas * 10) / 10,
    maxGunas: 36,
    verdictEn,
    verdictHi,
    verdictColor,
    nadiDosha,
    nadiParihar,
    bhakootDosha,
    bhakootParihar,
    kootas: [
      { id: 1, nameEn: "Varna", nameHi: "वर्ण", score: varnaScore, max: 1, desc: "Ego, spiritual hierarchy & work compatibility" },
      { id: 2, nameEn: "Vashya", nameHi: "वश्य", score: vashyaScore, max: 2, desc: "Mutual dominance & magnetic power" },
      { id: 3, nameEn: "Tara", nameHi: "तारा", score: taraScore, max: 3, desc: "Longevity, fortune & health luck" },
      { id: 4, nameEn: "Yoni", nameHi: "योनि", score: yoniScore, max: 4, desc: `Physical intimacy (${bNak.yoni} & ${gNak.yoni})` },
      { id: 5, nameEn: "Graha Maitri", nameHi: "ग्रह मैत्री", score: maitriScore, max: 5, desc: `Psychological harmony (${bRashi.ruler} & ${gRashi.ruler})` },
      { id: 6, nameEn: "Gana", nameHi: "गण", score: ganaScore, max: 6, desc: `Temperament match (${bNak.gana} & ${gNak.gana})` },
      { id: 7, nameEn: "Bhakoot", nameHi: "भकूट", score: bhakootScore, max: 7, hasDosha: bhakootDosha, parihar: bhakootParihar, desc: "Family prosperity, emotional longevity & progeny" },
      { id: 8, nameEn: "Nadi", nameHi: "नाड़ी", score: nadiScore, max: 8, hasDosha: nadiDosha, parihar: nadiParihar, desc: `Physiological, genetic & nervous resonance (${bNak.nadi} & ${gNak.nadi})` }
    ]
  };
}
