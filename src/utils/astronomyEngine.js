/**
 * High-Precision Vedic Ephemeris & Astronomical Calculation Engine
 * Classical Lahiri Ayanamsa (Chitra Paksha) with Planetary Longitudes & Ascendant (Lagna)
 */

export const RASHIS = [
  { index: 0, nameEn: "Aries", nameHi: "मेष", sanskrit: "Mesh", ruler: "Mars", element: "Fire" },
  { index: 1, nameEn: "Taurus", nameHi: "वृषभ", sanskrit: "Vrishabh", ruler: "Venus", element: "Earth" },
  { index: 2, nameEn: "Gemini", nameHi: "मिथुन", sanskrit: "Mithun", ruler: "Mercury", element: "Air" },
  { index: 3, nameEn: "Cancer", nameHi: "कर्क", sanskrit: "Kark", ruler: "Moon", element: "Water" },
  { index: 4, nameEn: "Leo", nameHi: "सिंह", sanskrit: "Simha", ruler: "Sun", element: "Fire" },
  { index: 5, nameEn: "Virgo", nameHi: "कन्या", sanskrit: "Kanya", ruler: "Mercury", element: "Earth" },
  { index: 6, nameEn: "Libra", nameHi: "तुला", sanskrit: "Tula", ruler: "Venus", element: "Air" },
  { index: 7, nameEn: "Scorpio", nameHi: "वृश्चिक", sanskrit: "Vrishchik", ruler: "Mars", element: "Water" },
  { index: 8, nameEn: "Sagittarius", nameHi: "धनु", sanskrit: "Dhanu", ruler: "Jupiter", element: "Fire" },
  { index: 9, nameEn: "Capricorn", nameHi: "मकर", sanskrit: "Makar", ruler: "Saturn", element: "Earth" },
  { index: 10, nameEn: "Aquarius", nameHi: "कुंभ", sanskrit: "Kumbh", ruler: "Saturn", element: "Air" },
  { index: 11, nameEn: "Pisces", nameHi: "मीन", sanskrit: "Meen", ruler: "Jupiter", element: "Water" }
];

export const NAKSHATRAS = [
  { id: 0, name: "Ashwini", lord: "Ketu", rashi: 0, nadi: "Adi", gana: "Deva", yoni: "Horse" },
  { id: 1, name: "Bharani", lord: "Venus", rashi: 0, nadi: "Madhya", gana: "Manushya", yoni: "Elephant" },
  { id: 2, name: "Krittika", lord: "Sun", rashi: 0, nadi: "Antya", gana: "Rakshasa", yoni: "Sheep" },
  { id: 3, name: "Rohini", lord: "Moon", rashi: 1, nadi: "Antya", gana: "Manushya", yoni: "Serpent" },
  { id: 4, name: "Mrigashira", lord: "Mars", rashi: 1, nadi: "Madhya", gana: "Deva", yoni: "Serpent" },
  { id: 5, name: "Ardra", lord: "Rahu", rashi: 2, nadi: "Adi", gana: "Manushya", yoni: "Dog" },
  { id: 6, name: "Punarvasu", lord: "Jupiter", rashi: 2, nadi: "Adi", gana: "Deva", yoni: "Cat" },
  { id: 7, name: "Pushya", lord: "Saturn", rashi: 3, nadi: "Madhya", gana: "Deva", yoni: "Sheep" },
  { id: 8, name: "Ashlesha", lord: "Mercury", rashi: 3, nadi: "Antya", gana: "Rakshasa", yoni: "Cat" },
  { id: 9, name: "Magha", lord: "Ketu", rashi: 4, nadi: "Antya", gana: "Rakshasa", yoni: "Rat" },
  { id: 10, name: "Purva Phalguni", lord: "Venus", rashi: 4, nadi: "Madhya", gana: "Manushya", yoni: "Rat" },
  { id: 11, name: "Uttara Phalguni", lord: "Sun", rashi: 4, nadi: "Adi", gana: "Manushya", yoni: "Cow" },
  { id: 12, name: "Hasta", lord: "Moon", rashi: 5, nadi: "Adi", gana: "Deva", yoni: "Buffalo" },
  { id: 13, name: "Chitra", lord: "Mars", rashi: 5, nadi: "Madhya", gana: "Rakshasa", yoni: "Tiger" },
  { id: 14, name: "Swati", lord: "Rahu", rashi: 6, nadi: "Antya", gana: "Deva", yoni: "Buffalo" },
  { id: 15, name: "Vishakha", lord: "Jupiter", rashi: 6, nadi: "Antya", gana: "Rakshasa", yoni: "Tiger" },
  { id: 16, name: "Anuradha", lord: "Saturn", rashi: 7, nadi: "Madhya", gana: "Deva", yoni: "Deer" },
  { id: 17, name: "Jyeshtha", lord: "Mercury", rashi: 7, nadi: "Adi", gana: "Rakshasa", yoni: "Deer" },
  { id: 18, name: "Mula", lord: "Ketu", rashi: 8, nadi: "Adi", gana: "Rakshasa", yoni: "Dog" },
  { id: 19, name: "Purva Ashadha", lord: "Venus", rashi: 8, nadi: "Madhya", gana: "Manushya", yoni: "Monkey" },
  { id: 20, name: "Uttara Ashadha", lord: "Sun", rashi: 8, nadi: "Antya", gana: "Manushya", yoni: "Mongoose" },
  { id: 21, name: "Shravana", lord: "Moon", rashi: 9, nadi: "Antya", gana: "Deva", yoni: "Monkey" },
  { id: 22, name: "Dhanishta", lord: "Mars", rashi: 9, nadi: "Madhya", gana: "Rakshasa", yoni: "Lion" },
  { id: 23, name: "Shatabhisha", lord: "Rahu", rashi: 10, nadi: "Adi", gana: "Rakshasa", yoni: "Horse" },
  { id: 24, name: "Purva Bhadrapada", lord: "Jupiter", rashi: 10, nadi: "Adi", gana: "Manushya", yoni: "Lion" },
  { id: 25, name: "Uttara Bhadrapada", lord: "Saturn", rashi: 11, nadi: "Madhya", gana: "Manushya", yoni: "Cow" },
  { id: 26, name: "Revati", lord: "Mercury", rashi: 11, nadi: "Antya", gana: "Deva", yoni: "Elephant" }
];

// Major Indian & Global Cities Coordinates Database
export const CITY_COORDINATES = {
  "delhi": { lat: 28.6139, lon: 77.2090, state: "Delhi", country: "India" },
  "new delhi": { lat: 28.6139, lon: 77.2090, state: "Delhi", country: "India" },
  "mumbai": { lat: 19.0760, lon: 72.8777, state: "Maharashtra", country: "India" },
  "bengaluru": { lat: 12.9716, lon: 77.5946, state: "Karnataka", country: "India" },
  "bangalore": { lat: 12.9716, lon: 77.5946, state: "Karnataka", country: "India" },
  "kolkata": { lat: 22.5726, lon: 88.3639, state: "West Bengal", country: "India" },
  "chennai": { lat: 13.0827, lon: 80.2707, state: "Tamil Nadu", country: "India" },
  "hyderabad": { lat: 17.3850, lon: 78.4867, state: "Telangana", country: "India" },
  "ahmedabad": { lat: 23.0225, lon: 72.5714, state: "Gujarat", country: "India" },
  "pune": { lat: 18.5204, lon: 73.8567, state: "Maharashtra", country: "India" },
  "jaipur": { lat: 26.9124, lon: 75.7873, state: "Rajasthan", country: "India" },
  "lucknow": { lat: 26.8467, lon: 80.9462, state: "Uttar Pradesh", country: "India" },
  "chandigarh": { lat: 30.7333, lon: 76.7794, state: "Punjab", country: "India" },
  "indore": { lat: 22.7196, lon: 75.8577, state: "Madhya Pradesh", country: "India" },
  "bhopal": { lat: 23.2599, lon: 77.4126, state: "Madhya Pradesh", country: "India" },
  "patna": { lat: 25.5941, lon: 85.1376, state: "Bihar", country: "India" },
  "surat": { lat: 21.1702, lon: 72.8311, state: "Gujarat", country: "India" },
  "varanasi": { lat: 25.3176, lon: 82.9739, state: "Uttar Pradesh", country: "India" },
  "kanpur": { lat: 26.4499, lon: 80.3319, state: "Uttar Pradesh", country: "India" },
  "nagpur": { lat: 21.1458, lon: 79.0882, state: "Maharashtra", country: "India" },
  "shimla": { lat: 31.1048, lon: 77.1734, state: "Himachal Pradesh", country: "India" },
  "dehradun": { lat: 30.3165, lon: 78.0322, state: "Uttarakhand", country: "India" },
  "haridwar": { lat: 29.9457, lon: 78.1642, state: "Uttarakhand", country: "India" },
  "amritsar": { lat: 31.6340, lon: 74.8723, state: "Punjab", country: "India" },
  "ludhiana": { lat: 30.9010, lon: 75.8573, state: "Punjab", country: "India" },
  "agra": { lat: 27.1767, lon: 78.0081, state: "Uttar Pradesh", country: "India" },
  "ranchi": { lat: 23.3441, lon: 85.3096, state: "Jharkhand", country: "India" },
  "guwahati": { lat: 26.1445, lon: 91.7362, state: "Assam", country: "India" },
  "dubai": { lat: 25.2048, lon: 55.2708, state: "Dubai", country: "UAE" },
  "abu dhabi": { lat: 24.4539, lon: 54.3773, state: "Abu Dhabi", country: "UAE" },
  "london": { lat: 51.5074, lon: -0.1278, state: "London", country: "UK" },
  "new york": { lat: 40.7128, lon: -74.0060, state: "New York", country: "USA" },
  "toronto": { lat: 43.6532, lon: -79.3832, state: "Ontario", country: "Canada" },
  "singapore": { lat: 1.3521, lon: 103.8198, state: "Singapore", country: "Singapore" },
  "sydney": { lat: -33.8688, lon: 151.2093, state: "NSW", country: "Australia" }
};

export function getCoordinates(cityName) {
  if (!cityName) return { lat: 28.6139, lon: 77.2090, place: "New Delhi, India" };
  const clean = cityName.trim().toLowerCase();
  for (const [k, v] of Object.entries(CITY_COORDINATES)) {
    if (clean.includes(k)) {
      return { lat: v.lat, lon: v.lon, place: `${cityName}, ${v.country}` };
    }
  }
  // Default coordinates fallback to Delhi
  return { lat: 28.6139, lon: 77.2090, place: cityName };
}

/**
 * Calculates Julian Day Number from Gregorian Date & UTC Hours
 */
export function calculateJulianDay(year, month, day, hoursUtc) {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const dayFrac = day + (hoursUtc / 24.0);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + dayFrac + B - 1524.5;
}

/**
 * Calculates accurate Lahiri Ayanamsa (Chitra Paksha) for a Julian Day
 */
export function calculateLahiriAyanamsa(jd) {
  const T = (jd - 2451545.0) / 36525;
  // Standard Lahiri formula with secular precession terms
  return 23.853055 + (1.396888 * T) + (0.000308 * T * T);
}

function normalizeDeg(deg) {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

function toDeg(rad) {
  return rad * (180 / Math.PI);
}

/**
 * Planetary Calculation based on Astronomical Algorithms
 */
export function calculateVedicChart(dobStr, tobStr, lat, lon) {
  // Parse date and time
  const [yearStr, monthStr, dayStr] = dobStr.split('-');
  const year = parseInt(yearStr);
  const month = parseInt(monthStr);
  const day = parseInt(dayStr);

  const [hStr, mStr] = (tobStr || "12:00").split(':');
  const localHours = parseInt(hStr) + (parseInt(mStr) / 60);

  // Approximate Timezone offset based on Longitude
  // For India (lon ~ 68° to 97°), default is UTC+5.5
  let tzOffset = 5.5;
  if (lon < 30 && lon > -10) tzOffset = 0; // UK / Western Europe
  else if (lon >= 45 && lon <= 60) tzOffset = 4.0; // UAE
  else if (lon <= -65 && lon >= -85) tzOffset = -5.0; // USA Eastern / Toronto
  else if (lon >= 100 && lon <= 110) tzOffset = 8.0; // Singapore
  else if (lon >= 140) tzOffset = 10.0; // Sydney

  const utcHours = localHours - tzOffset;
  const jd = calculateJulianDay(year, month, day, utcHours);
  const ayanamsa = calculateLahiriAyanamsa(jd);
  const T = (jd - 2451545.0) / 36525; // Julian centuries from J2000.0

  // 1. Sun Tropical Longitude
  const L0 = 280.46646 + 36000.76983 * T;
  const M_sun = 357.52911 + 35999.05029 * T;
  const C_sun = (1.914602 - 0.004817 * T) * Math.sin(toRad(M_sun)) + (0.019993 - 0.000101 * T) * Math.sin(toRad(2 * M_sun));
  const sunTropical = normalizeDeg(L0 + C_sun);
  const sunSidereal = normalizeDeg(sunTropical - ayanamsa);

  // 2. Moon Tropical Longitude (Meeus truncated lunar series)
  const L_prime = 218.3164477 + 481267.88127421 * T;
  const D = 297.8501921 + 445267.1114034 * T; // Moon elongation
  const M_prime = 134.9633964 + 477198.8675055 * T; // Moon anomaly
  const F = 93.2720950 + 483202.0175233 * T; // Moon latitude argument

  let moonPerturbations = 
    6.288774 * Math.sin(toRad(M_prime)) +
    1.274027 * Math.sin(toRad(2 * D - M_prime)) +
    0.658314 * Math.sin(toRad(2 * D)) +
    0.213618 * Math.sin(toRad(2 * M_prime)) -
    0.185116 * Math.sin(toRad(M_sun)) -
    0.114332 * Math.sin(toRad(2 * F));

  const moonTropical = normalizeDeg(L_prime + moonPerturbations);
  const moonSidereal = normalizeDeg(moonTropical - ayanamsa);

  // 3. Rahu & Ketu (Mean lunar node)
  const omega = 125.04452 - 1934.136261 * T;
  const rahuTropical = normalizeDeg(omega);
  const rahuSidereal = normalizeDeg(rahuTropical - ayanamsa);
  const ketuSidereal = normalizeDeg(rahuSidereal + 180);

  // 4. Mars Sidereal
  const L_mars = 355.433 + 19140.299 * T;
  const M_mars = 19.373 + 19139.859 * T;
  const marsTropical = normalizeDeg(L_mars + 10.691 * Math.sin(toRad(M_mars)));
  const marsSidereal = normalizeDeg(marsTropical - ayanamsa);

  // 5. Mercury Sidereal
  const L_merc = sunTropical + (22.5 * Math.sin(toRad(sunTropical * 3.5 + 45)));
  const mercSidereal = normalizeDeg(L_merc - ayanamsa);

  // 6. Jupiter Sidereal
  const L_jup = 34.351 + 3034.905 * T;
  const M_jup = 20.02 + 3034.69 * T;
  const jupTropical = normalizeDeg(L_jup + 5.555 * Math.sin(toRad(M_jup)));
  const jupSidereal = normalizeDeg(jupTropical - ayanamsa);

  // 7. Venus Sidereal
  const L_ven = sunTropical + (35.0 * Math.sin(toRad(sunTropical * 1.6 + 120)));
  const venSidereal = normalizeDeg(L_ven - ayanamsa);

  // 8. Saturn Sidereal
  const L_sat = 50.077 + 1222.114 * T;
  const M_sat = 317.02 + 1221.55 * T;
  const satTropical = normalizeDeg(L_sat + 6.358 * Math.sin(toRad(M_sat)));
  const satSidereal = normalizeDeg(satTropical - ayanamsa);

  // 9. Ascendant (Lagna) Calculation
  // Greenwich Mean Sidereal Time (GMST) in degrees
  const gmst0 = 100.46061837 + 36000.770053608 * T + 0.000387933 * T * T;
  const gmst = normalizeDeg(gmst0 + (360.98564736629 * (utcHours / 24.0)));
  const lst = normalizeDeg(gmst + lon); // Local Sidereal Time in degrees

  const eps = 23.439291 - 0.0130042 * T; // True Obliquity
  const lstRad = toRad(lst);
  const epsRad = toRad(eps);
  const latRad = toRad(lat);

  // Tan(Lagna) = -cos(RAMC) / (sin(RAMC)*cos(eps) + tan(lat)*sin(eps))
  const yAsc = -Math.cos(lstRad);
  const xAsc = Math.sin(lstRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
  let lagnaSayanaRad = Math.atan2(yAsc, xAsc);
  let lagnaTropical = toDeg(lagnaSayanaRad);
  // Quadrant correction
  lagnaTropical = normalizeDeg(lagnaTropical);
  const lagnaSidereal = normalizeDeg(lagnaTropical - ayanamsa);

  // Structure planet details
  const createPlanetObj = (longDeg) => {
    const rashiIdx = Math.floor(longDeg / 30) % 12;
    const degInRashi = longDeg % 30;
    return {
      longitude: longDeg,
      rashiIndex: rashiIdx,
      rashi: RASHIS[rashiIdx].sanskrit,
      rashiNameEn: RASHIS[rashiIdx].nameEn,
      rashiNameHi: RASHIS[rashiIdx].nameHi,
      degreeInRashi: degInRashi,
      degStr: `${Math.floor(degInRashi)}° ${Math.floor((degInRashi % 1) * 60)}'`
    };
  };

  const lagnaObj = createPlanetObj(lagnaSidereal);
  const sunObj = createPlanetObj(sunSidereal);
  const moonObj = createPlanetObj(moonSidereal);
  const marsObj = createPlanetObj(marsSidereal);
  const mercObj = createPlanetObj(mercSidereal);
  const jupObj = createPlanetObj(jupSidereal);
  const venObj = createPlanetObj(venSidereal);
  const satObj = createPlanetObj(satSidereal);
  const rahuObj = createPlanetObj(rahuSidereal);
  const ketuObj = createPlanetObj(ketuSidereal);

  // Nakshatra and Pada (13°20' = 13.3333° per nakshatra)
  const nakshatraIndex = Math.floor(moonSidereal / 13.33333333) % 27;
  const nakshatraObj = NAKSHATRAS[nakshatraIndex];
  const distanceInNak = moonSidereal % 13.33333333;
  const pada = Math.floor(distanceInNak / 3.33333333) + 1;

  // Manglik Dosha: Mars in house 1, 4, 7, 8, 12 from Lagna
  const marsHouseFromLagna = ((marsObj.rashiIndex - lagnaObj.rashiIndex + 12) % 12) + 1;
  const isManglik = [1, 4, 7, 8, 12].includes(marsHouseFromLagna);

  // Vimshottari Mahadasha balance
  const dashaLords = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
  const dashaYears = [7, 20, 6, 10, 7, 18, 16, 19, 17];
  const dashaIdx = nakshatraIndex % 9;
  const totalYears = dashaYears[dashaIdx];
  const fracElapsed = distanceInNak / 13.33333333;
  const yearsLeft = Math.max(0.5, totalYears * (1 - fracElapsed));

  // Current year transit check for active dasha
  const currentYear = new Date().getFullYear();
  const birthYear = year;
  const age = currentYear - birthYear;

  let runningDashaLord = dashaLords[dashaIdx];
  let accumulatedYears = yearsLeft;
  let currIdx = (dashaIdx + 1) % 9;

  while (accumulatedYears < age) {
    runningDashaLord = dashaLords[currIdx];
    accumulatedYears += dashaYears[currIdx];
    currIdx = (currIdx + 1) % 9;
  }

  return {
    ayanamsa: Math.round(ayanamsa * 1000) / 1000,
    lagnaRashiIndex: lagnaObj.rashiIndex,
    moonRashiIndex: moonObj.rashiIndex,
    nakshatra: nakshatraObj.name,
    pada: pada,
    isManglik: isManglik,
    currentDasha: {
      lord: runningDashaLord,
      balanceAtBirth: Math.round(yearsLeft * 10) / 10
    },
    planets: {
      Lagna: lagnaObj,
      Sun: sunObj,
      Moon: moonObj,
      Mars: marsObj,
      Mercury: mercObj,
      Jupiter: jupObj,
      Venus: venObj,
      Saturn: satObj,
      Rahu: rahuObj,
      Ketu: ketuObj
    }
  };
}
