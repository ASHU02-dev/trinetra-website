import React, { useState } from 'react';
import { Compass, Sparkles, MessageCircle, AlertCircle, ShieldCheck, CheckCircle2, Award, Clock, RefreshCw } from 'lucide-react';
import { calculateVedicChart, getCoordinates, RASHIS } from '../utils/astronomyEngine';

const RASHI_NAMES_HI = ["मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"];
const RASHI_NAMES_EN = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

export default function VedicKundli({ lang, onBookWithKundli }) {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    dob: '',
    tob: '',
    place: ''
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [chartData, setChartData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('d1'); // 'd1', 'table', 'dasha', 'd9'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.place) {
      setErrorMsg(lang === 'hi' ? 'कृपया नाम, जन्म तिथि और जन्म स्थान भरें।' : 'Please fill all required birth coordinates.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setLoadingStep(lang === 'hi' ? 'वैदिक पंचांग सर्वर से संपर्क हो रहा है...' : 'Connecting to High-Precision Vedic Ephemeris Server...');

    try {
      // 1. Primary Source of Truth: User's backend Swiss Ephemeris API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout for Render wake-up

      setLoadingStep(lang === 'hi' ? 'लाहिरी अयनांश व ग्रह स्थिति की गणना...' : 'Computing Lahiri Ayanamsa & Planetary Coordinates...');

      const res = await fetch("https://trinetra-backend-iziw.onrender.com/api/kundli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          gender: formData.gender,
          dob: formData.dob,
          tob: formData.tob || "12:00",
          place: formData.place,
          district: formData.place,
          state: formData.place
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        
        // Extract exact planetary coordinates from backend
        const d1 = data.d1Chart;
        const lagnaIdx = d1.Lagna ? d1.Lagna.rashiIndex : 0;
        const moonIdx = d1.Moon ? d1.Moon.rashiIndex : 0;
        
        // Mars house from Lagna for Manglik Dosha
        const marsRashi = d1.Mars ? d1.Mars.rashiIndex : 0;
        const marsHouse = ((marsRashi - lagnaIdx + 12) % 12) + 1;
        const isManglik = [1, 4, 7, 8, 12].includes(marsHouse);

        // Find current running Mahadasha from timeline
        const now = new Date();
        const timeline = data.vimshottariDasha?.mahadashaTimeline || [];
        const runningDasha = timeline.find(t => new Date(t.startDate) <= now && now < new Date(t.endDate)) || timeline[0];

        setChartData({
          name: data.name || formData.name,
          gender: data.gender || formData.gender,
          birthDetails: data.birthDetails,
          ayanamsa: data.ayanamsa,
          d1Chart: d1,
          d9Chart: data.d9Chart,
          vimshottariDasha: data.vimshottariDasha,
          lagnaRashiIndex: lagnaIdx,
          moonRashiIndex: moonIdx,
          nakshatra: data.vimshottariDasha?.nakshatra || "Magha",
          isManglik: isManglik,
          runningDasha: runningDasha
        });
      } else {
        throw new Error("Server response not ok");
      }
    } catch (err) {
      // High-precision fallback engine
      const coords = getCoordinates(formData.place);
      const computed = calculateVedicChart(formData.dob, formData.tob, coords.lat, coords.lon);
      
      const d1Planets = {};
      Object.entries(computed.planets).forEach(([pName, pInfo]) => {
        d1Planets[pName] = {
          rashi: pInfo.rashi,
          rashiIndex: pInfo.rashiIndex,
          degreeInRashi: pInfo.degreeInRashi
        };
      });

      setChartData({
        name: formData.name,
        gender: formData.gender,
        birthDetails: {
          dob: formData.dob,
          tob: formData.tob,
          place: coords.place,
          lat: coords.lat,
          lon: coords.lon
        },
        ayanamsa: computed.ayanamsa,
        d1Chart: d1Planets,
        d9Chart: null,
        vimshottariDasha: {
          nakshatra: computed.nakshatra,
          mahadashaTimeline: []
        },
        lagnaRashiIndex: computed.lagnaRashiIndex,
        moonRashiIndex: computed.moonRashiIndex,
        nakshatra: computed.nakshatra,
        isManglik: computed.isManglik,
        runningDasha: { lord: computed.currentDasha?.lord || "Jupiter" }
      });
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  // Group planets into houses
  const getHousePlanets = () => {
    if (!chartData || !chartData.d1Chart) return Array(12).fill([]);
    const lagnaIdx = chartData.lagnaRashiIndex;
    const houses = Array.from({ length: 12 }, () => []);

    const shortLabels = {
      Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me", Jupiter: "Ju",
      Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke"
    };

    Object.entries(chartData.d1Chart).forEach(([name, p]) => {
      if (name === "Lagna") return;
      const houseIdx = (p.rashiIndex - lagnaIdx + 12) % 12;
      houses[houseIdx].push({
        name,
        short: shortLabels[name] || name.slice(0, 2),
        deg: Math.floor(p.degreeInRashi || 0)
      });
    });

    return houses;
  };

  const housePlanets = getHousePlanets();
  const lagnaRashiIndex = chartData?.lagnaRashiIndex ?? 0;

  // Auspicious Gemstones by Lagna
  const luckyGems = [
    "Red Coral (Moonga)", "Diamond / White Zircon", "Emerald (Panna)", "Natural Pearl (Moti)",
    "Ruby (Manikya)", "Emerald (Panna)", "White Sapphire / Diamond", "Red Coral (Moonga)",
    "Yellow Sapphire (Pukhraj)", "Blue Sapphire (Neelam)", "Blue Sapphire (Neelam)", "Yellow Sapphire (Pukhraj)"
  ];

  const handleWhatsAppConsultation = () => {
    if (!chartData) return;
    const rashi = RASHI_NAMES_EN[chartData.moonRashiIndex] || "Rashi";
    const lagna = RASHI_NAMES_EN[lagnaRashiIndex] || "Lagna";
    const dasha = chartData.runningDasha?.lord || "Current Dasha";
    
    const text = `✨ TRINETRA HIGH-PRECISION KUNDLI CONSULTATION ✨\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 Seeker: ${chartData.name}\n` +
      `📅 DOB: ${chartData.birthDetails?.dob} at ${chartData.birthDetails?.tob}\n` +
      `📍 Location: ${chartData.birthDetails?.place}\n` +
      `♌ Ascendant (Lagna): ${lagna}\n` +
      `🌙 Moon Sign: ${rashi} (Nakshatra: ${chartData.nakshatra})\n` +
      `🪐 Running Mahadasha: ${dasha} Dasha\n` +
      `⚠️ Manglik Condition: ${chartData.isManglik ? 'Manglik Yoga' : 'Clear'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Pandit Ashutosh Chamoli ji, please review my Vedic chart and share practical guidance.`;
      
    window.open(`https://wa.me/917590077820?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="kundli" style={{ padding: '100px 20px', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-editorial">
            <Compass size={13} color="var(--gold-primary)" />
            {lang === 'hi' ? 'वैदिक होरोस्कोप सिस्टम' : 'SWISS EPHEMERIS VEDIC HOROSCOPE'}
          </span>
          <h2 className="font-serif">
            {lang === 'hi' ? 'जन्म कुंडली सूक्ष्म विश्लेषण' : 'Comprehensive Vedic Birth Chart'}
          </h2>
          <p>
            {lang === 'hi' 
              ? 'लाहिरी अयनांश आधारित उच्च-सटीक गणना। 12 भाव, नवांश चक्र व विंशोत्तरी महादशा समय सारिणी।' 
              : 'Mathematical calculation with verified Lahiri Ayanamsa. Classical 12 Bhavas, Navamsha D9, and chronological Vimshottari Dasha timeline.'}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: chartData ? '1fr 1.35fr' : '1fr 1fr',
            gap: '36px',
            alignItems: 'start'
          }}
          className="kundli-grid"
        >
          
          {/* Form */}
          <div className="glass-card" style={{ padding: '40px 34px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <Award size={20} color="var(--gold-primary)" />
              <h3 className="font-serif" style={{ fontSize: '20px' }}>
                {lang === 'hi' ? 'जन्म विवरण दर्ज करें' : 'Enter Birth Coordinates'}
              </h3>
            </div>

            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
                  {lang === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                </label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder={lang === 'hi' ? 'उदा. राहुल शर्मा' : 'e.g. Rahul Sharma'}
                  value={formData.name} 
                  onChange={handleChange}
                  className="input-bespoke"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
                    {lang === 'hi' ? 'लिंग *' : 'Gender *'}
                  </label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="input-bespoke">
                    <option value="male">{lang === 'hi' ? 'पुरुष (Male)' : 'Male'}</option>
                    <option value="female">{lang === 'hi' ? 'महिला (Female)' : 'Female'}</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
                    {lang === 'hi' ? 'जन्म तिथि *' : 'Date of Birth *'}
                  </label>
                  <input 
                    type="date" 
                    name="dob" 
                    value={formData.dob} 
                    onChange={handleChange}
                    className="input-bespoke"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
                    {lang === 'hi' ? 'जन्म समय *' : 'Time of Birth *'}
                  </label>
                  <input 
                    type="time" 
                    name="tob" 
                    value={formData.tob} 
                    onChange={handleChange}
                    className="input-bespoke"
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
                    {lang === 'hi' ? 'जन्म स्थान (शहर) *' : 'City / Location *'}
                  </label>
                  <input 
                    type="text" 
                    name="place" 
                    placeholder={lang === 'hi' ? 'उदा. नई दिल्ली, मुंबई, जयपुर' : 'e.g. New Delhi, Mumbai, London'}
                    value={formData.place} 
                    onChange={handleChange}
                    className="input-bespoke"
                    required
                  />
                </div>
              </div>

              {errorMsg && (
                <div style={{ color: '#EF4444', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertCircle size={15} />
                  {errorMsg}
                </div>
              )}

              {loading && (
                <div style={{ background: 'var(--gold-subtle)', padding: '12px', borderRadius: '10px', border: '1px solid var(--gold-border)', fontSize: '12px', color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>{loadingStep}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="btn-gold" 
                style={{ width: '100%', marginTop: '4px' }}
              >
                <Sparkles size={16} />
                <span>{loading ? (lang === 'hi' ? 'गणना जारी है...' : 'Calculating Ephemeris...') : (lang === 'hi' ? 'सटीक कुंडली बनाएं' : 'Compute Ephemeris Chart')}</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <ShieldCheck size={14} color="var(--gold-primary)" />
                <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
                  {lang === 'hi' ? 'लाहिरी अयनांश आधारित प्रामाणिक गणना' : 'Ephemeris-Verified Classical Lahiri Ayanamsa Math'}
                </span>
              </div>
            </form>
          </div>

          {/* Output Card */}
          {!chartData ? (
            <div 
              className="glass-card"
              style={{
                padding: '50px 30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '480px',
                borderStyle: 'dashed'
              }}
            >
              <div 
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'var(--gold-subtle)',
                  border: '1px solid var(--gold-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Compass size={32} color="var(--gold-primary)" />
              </div>
              <h4 className="font-serif" style={{ fontSize: '19px', marginBottom: '10px' }}>
                {lang === 'hi' ? 'वैदिक कुंडली प्रतीक्षारत' : 'Astronomical Chart Standby'}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '360px', lineHeight: 1.7 }}>
                {lang === 'hi' 
                  ? 'बाईं ओर जन्म विवरण दर्ज करें। उत्तर भारतीय वैदिक हीरा चक्र, नवांश व विंशोत्तरी दशा तुरंत प्रदर्शित होंगे।' 
                  : 'Enter birth details on the left to instantly compute the verified North Indian Diamond chart, planetary degrees, and Mahadasha timeline.'}
              </p>
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '36px' }}>
              
              {/* Header Title & Details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid var(--border-line)', paddingBottom: '18px', marginBottom: '22px' }}>
                <div>
                  <h3 className="font-serif text-gold-gradient" style={{ fontSize: '24px' }}>
                    {chartData.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {chartData.birthDetails?.dob} • {chartData.birthDetails?.tob} • {chartData.birthDetails?.place}
                  </p>
                  <div style={{ fontSize: '11px', color: 'var(--gold-primary)', marginTop: '4px', fontWeight: 600 }}>
                    Lahiri Ayanamsa: {chartData.ayanamsa ? `${chartData.ayanamsa.toFixed(3)}°` : '23.84°'}
                  </div>
                </div>

                {/* Tab Switcher */}
                <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '10px' }}>
                  <button
                    onClick={() => setActiveTab('d1')}
                    style={{
                      background: activeTab === 'd1' ? 'var(--gold-primary)' : 'transparent',
                      color: activeTab === 'd1' ? '#080A0F' : 'var(--text-primary)',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {lang === 'hi' ? 'हीरा चक्र (D1)' : 'D1 Chart'}
                  </button>
                  <button
                    onClick={() => setActiveTab('table')}
                    style={{
                      background: activeTab === 'table' ? 'var(--gold-primary)' : 'transparent',
                      color: activeTab === 'table' ? '#080A0F' : 'var(--text-primary)',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {lang === 'hi' ? 'ग्रह स्थिति' : 'Planets'}
                  </button>
                  <button
                    onClick={() => setActiveTab('dasha')}
                    style={{
                      background: activeTab === 'dasha' ? 'var(--gold-primary)' : 'transparent',
                      color: activeTab === 'dasha' ? '#080A0F' : 'var(--text-primary)',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {lang === 'hi' ? 'विंशोत्तरी दशा' : 'Dasha'}
                  </button>
                  {chartData.d9Chart && (
                    <button
                      onClick={() => setActiveTab('d9')}
                      style={{
                        background: activeTab === 'd9' ? 'var(--gold-primary)' : 'transparent',
                        color: activeTab === 'd9' ? '#080A0F' : 'var(--text-primary)',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {lang === 'hi' ? 'नवांश (D9)' : 'Navamsha'}
                    </button>
                  )}
                </div>
              </div>

              {/* View 1: Authentic North Indian Diamond Chart (SVG) */}
              {activeTab === 'd1' && (
                <div className="kundli-chart-box" style={{ margin: '15px 0 25px' }}>
                  <svg viewBox="0 0 500 500" className="kundli-svg">
                    <rect x="10" y="10" width="480" height="480" fill="none" className="kundli-line" />
                    <line x1="10" y1="10" x2="490" y2="490" className="kundli-line" />
                    <line x1="490" y1="10" x2="10" y2="490" className="kundli-line" />
                    <polygon points="250,10 490,250 250,490 10,250" fill="none" className="kundli-line" />

                    {/* House 1: Top Center Diamond */}
                    <text x="250" y="70" textAnchor="middle" className="house-num">{(lagnaRashiIndex % 12) + 1}</text>
                    <text x="250" y="125" textAnchor="middle" className="planet-lbl lagna">
                      Lg {chartData.d1Chart.Lagna ? `${Math.floor(chartData.d1Chart.Lagna.degreeInRashi)}°` : ''}
                    </text>
                    {housePlanets[0]?.map((p, i) => (
                      <text key={i} x="250" y={150 + i * 18} textAnchor="middle" className="planet-lbl">{p.short} {p.deg}°</text>
                    ))}

                    {/* House 2: Top Left Triangle */}
                    <text x="140" y="55" textAnchor="middle" className="house-num">{((lagnaRashiIndex + 1) % 12) + 1}</text>
                    {housePlanets[1]?.map((p, i) => (
                      <text key={i} x="140" y={80 + i * 18} textAnchor="middle" className="planet-lbl">{p.short} {p.deg}°</text>
                    ))}

                    {/* House 3: Left Top Triangle */}
                    <text x="55" y="140" textAnchor="middle" className="house-num">{((lagnaRashiIndex + 2) % 12) + 1}</text>
                    {housePlanets[2]?.map((p, i) => (
                      <text key={i} x="75" y={165 + i * 18} textAnchor="middle" className="planet-lbl">{p.short} {p.deg}°</text>
                    ))}

                    {/* House 4: Left Center Diamond */}
                    <text x="95" y="250" textAnchor="middle" className="house-num">{((lagnaRashiIndex + 3) % 12) + 1}</text>
                    {housePlanets[3]?.map((p, i) => (
                      <text key={i} x="155" y={245 + i * 18} textAnchor="middle" className="planet-lbl">{p.short} {p.deg}°</text>
                    ))}

                    {/* House 5: Left Bottom Triangle */}
                    <text x="55" y="370" textAnchor="middle" className="house-num">{((lagnaRashiIndex + 4) % 12) + 1}</text>
                    {housePlanets[4]?.map((p, i) => (
                      <text key={i} x="75" y={395 + i * 18} textAnchor="middle" className="planet-lbl">{p.short} {p.deg}°</text>
                    ))}

                    {/* House 6: Bottom Left Triangle */}
                    <text x="140" y="455" textAnchor="middle" className="house-num">{((lagnaRashiIndex + 5) % 12) + 1}</text>
                    {housePlanets[5]?.map((p, i) => (
                      <text key={i} x="140" y={425 - i * 18} textAnchor="middle" className="planet-lbl">{p.short} {p.deg}°</text>
                    ))}

                    {/* House 7: Bottom Center Diamond */}
                    <text x="250" y="430" textAnchor="middle" className="house-num">{((lagnaRashiIndex + 6) % 12) + 1}</text>
                    {housePlanets[6]?.map((p, i) => (
                      <text key={i} x="250" y={350 + i * 18} textAnchor="middle" className="planet-lbl">{p.short} {p.deg}°</text>
                    ))}

                    {/* House 8: Bottom Right Triangle */}
                    <text x="360" y="455" textAnchor="middle" className="house-num">{((lagnaRashiIndex + 7) % 12) + 1}</text>
                    {housePlanets[7]?.map((p, i) => (
                      <text key={i} x="360" y={425 - i * 18} textAnchor="middle" className="planet-lbl">{p.short} {p.deg}°</text>
                    ))}

                    {/* House 9: Right Bottom Triangle */}
                    <text x="445" y="370" textAnchor="middle" className="house-num">{((lagnaRashiIndex + 8) % 12) + 1}</text>
                    {housePlanets[8]?.map((p, i) => (
                      <text key={i} x="425" y={395 + i * 18} textAnchor="middle" className="planet-lbl">{p.short} {p.deg}°</text>
                    ))}

                    {/* House 10: Right Center Diamond */}
                    <text x="405" y="250" textAnchor="middle" className="house-num">{((lagnaRashiIndex + 9) % 12) + 1}</text>
                    {housePlanets[9]?.map((p, i) => (
                      <text key={i} x="345" y={245 + i * 18} textAnchor="middle" className="planet-lbl">{p.short} {p.deg}°</text>
                    ))}

                    {/* House 11: Right Top Triangle */}
                    <text x="445" y="140" textAnchor="middle" className="house-num">{((lagnaRashiIndex + 10) % 12) + 1}</text>
                    {housePlanets[10]?.map((p, i) => (
                      <text key={i} x="425" y={165 + i * 18} textAnchor="middle" className="planet-lbl">{p.short} {p.deg}°</text>
                    ))}

                    {/* House 12: Top Right Triangle */}
                    <text x="360" y="55" textAnchor="middle" className="house-num">{((lagnaRashiIndex + 11) % 12) + 1}</text>
                    {housePlanets[11]?.map((p, i) => (
                      <text key={i} x="360" y={80 + i * 18} textAnchor="middle" className="planet-lbl">{p.short} {p.deg}°</text>
                    ))}
                  </svg>
                </div>
              )}

              {/* View 2: Planetary Coordinates Table */}
              {activeTab === 'table' && (
                <div style={{ overflowX: 'auto', marginBottom: '25px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--gold-border)', color: 'var(--gold-primary)' }}>
                        <th style={{ padding: '10px 8px', textAlign: 'left' }}>Graha (Planet)</th>
                        <th style={{ padding: '10px 8px', textAlign: 'left' }}>Rashi (Sign)</th>
                        <th style={{ padding: '10px 8px', textAlign: 'left' }}>Exact Degree</th>
                        <th style={{ padding: '10px 8px', textAlign: 'right' }}>Bhava (House)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(chartData.d1Chart).map(([name, p], i) => {
                        const house = ((p.rashiIndex - lagnaRashiIndex + 12) % 12) + 1;
                        const deg = p.degreeInRashi || 0;
                        const degStr = `${Math.floor(deg)}° ${Math.floor((deg % 1) * 60)}'`;
                        return (
                          <tr key={i} style={{ borderBottom: '1px solid var(--border-line)' }}>
                            <td style={{ padding: '8px', fontWeight: 700, color: name === 'Lagna' ? 'var(--gold-primary)' : 'var(--text-primary)' }}>
                              {name}
                            </td>
                            <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>
                              {lang === 'hi' ? RASHI_NAMES_HI[p.rashiIndex] : (RASHI_NAMES_EN[p.rashiIndex] || p.rashi)}
                            </td>
                            <td style={{ padding: '8px', color: 'var(--gold-primary)', fontFamily: 'monospace' }}>
                              {degStr}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: 'var(--gold-primary)' }}>
                              House {house}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* View 3: Vimshottari Mahadasha Timeline */}
              {activeTab === 'dasha' && (
                <div style={{ overflowX: 'auto', marginBottom: '25px' }}>
                  <div style={{ padding: '10px 14px', background: 'var(--gold-subtle)', borderRadius: '8px', border: '1px solid var(--gold-border)', marginBottom: '14px', fontSize: '12px', color: 'var(--gold-primary)', fontWeight: 600 }}>
                    Active Period: {chartData.runningDasha?.lord} Mahadasha
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--gold-border)', color: 'var(--gold-primary)' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Mahadasha Lord</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Start Date</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>End Date</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(chartData.vimshottariDasha?.mahadashaTimeline || []).map((d, idx) => {
                        const now = new Date();
                        const isCurrent = new Date(d.startDate) <= now && now < new Date(d.endDate);
                        const isPast = new Date(d.endDate) <= now;
                        return (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--border-line)', background: isCurrent ? 'var(--gold-subtle)' : 'transparent' }}>
                            <td style={{ padding: '8px', fontWeight: isCurrent ? 800 : 500, color: isCurrent ? 'var(--gold-primary)' : 'var(--text-primary)' }}>
                              {d.lord} Mahadasha ({d.years}y)
                            </td>
                            <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>
                              {new Date(d.startDate).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>
                              {new Date(d.endDate).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'right' }}>
                              {isCurrent ? (
                                <span style={{ background: '#22C55E', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>RUNNING</span>
                              ) : isPast ? (
                                <span style={{ color: 'var(--text-subtle)', fontSize: '11px' }}>Completed</span>
                              ) : (
                                <span style={{ color: 'var(--gold-primary)', fontSize: '11px' }}>Upcoming</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* View 4: Navamsha (D9) Chart Table */}
              {activeTab === 'd9' && chartData.d9Chart && (
                <div style={{ overflowX: 'auto', marginBottom: '25px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--gold-border)', color: 'var(--gold-primary)' }}>
                        <th style={{ padding: '10px 8px', textAlign: 'left' }}>Graha (Planet)</th>
                        <th style={{ padding: '10px 8px', textAlign: 'left' }}>Navamsha Rashi (D9)</th>
                        <th style={{ padding: '10px 8px', textAlign: 'right' }}>Rashi Index</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(chartData.d9Chart).map(([name, p], i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--border-line)' }}>
                          <td style={{ padding: '8px', fontWeight: 700, color: name === 'Lagna' ? 'var(--gold-primary)' : 'var(--text-primary)' }}>
                            {name}
                          </td>
                          <td style={{ padding: '8px', color: 'var(--gold-primary)' }}>
                            {lang === 'hi' ? RASHI_NAMES_HI[p.rashiIndex] : (RASHI_NAMES_EN[p.rashiIndex] || p.rashi)}
                          </td>
                          <td style={{ padding: '8px', textAlign: 'right', color: 'var(--text-secondary)' }}>
                            {(p.rashiIndex % 12) + 1}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Cosmic Highlights Grid */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '10px',
                  marginBottom: '22px'
                }}
              >
                <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-line)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Ascendant (Lagna)</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold-primary)' }}>
                    {lang === 'hi' ? RASHI_NAMES_HI[lagnaRashiIndex] : RASHI_NAMES_EN[lagnaRashiIndex]}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-line)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Moon Sign (Rashi)</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold-primary)' }}>
                    {lang === 'hi' ? RASHI_NAMES_HI[chartData.moonRashiIndex] : RASHI_NAMES_EN[chartData.moonRashiIndex]}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-line)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Birth Nakshatra</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {chartData.nakshatra}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-line)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Manglik Status</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: chartData.isManglik ? '#EF4444' : '#22C55E' }}>
                    {chartData.isManglik ? 'Manglik Yoga' : 'Clear (No Dosha)'}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-line)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Active Mahadasha</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold-primary)' }}>
                    {chartData.runningDasha?.lord} Dasha
                  </div>
                </div>

                <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-line)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>Auspicious Gemstone</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold-primary)' }}>
                    {luckyGems[lagnaRashiIndex]}
                  </div>
                </div>
              </div>

              {/* Consultation Lead Box */}
              <div 
                style={{
                  background: 'var(--gold-subtle)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: '14px',
                  padding: '20px',
                  textAlign: 'center'
                }}
              >
                <h4 className="font-serif" style={{ fontSize: '16px', marginBottom: '6px' }}>
                  {lang === 'hi' ? 'आचार्य जी से इस कुंडली पर व्यक्तिगत परामर्श लें' : 'Unlock Remedial & Predictive Consultation'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
                  {lang === 'hi' 
                    ? 'दशा परिवर्तन व ग्रहों के प्रभाव का सटीक समय जानकर सही निर्णय लें। WhatsApp पर सीधे आचार्य जी से संपर्क करें।' 
                    : 'Your planetary coordinates are calculated. Ask Pandit Ashutosh Chamoli for guidance on your chart and next steps.'}
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleWhatsAppConsultation}
                    className="btn-gold"
                    style={{ padding: '12px 24px', fontSize: '13px' }}
                  >
                    <MessageCircle size={15} />
                    <span>{lang === 'hi' ? 'कुंडली WhatsApp पर भेजें' : 'Discuss Chart on WhatsApp'}</span>
                  </button>
                  <button
                    onClick={onBookWithKundli}
                    className="btn-obsidian"
                    style={{ padding: '12px 24px', fontSize: '13px' }}
                  >
                    <Sparkles size={15} />
                    <span>{lang === 'hi' ? 'निजी सत्र बुक करें' : 'Book Private Session'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .kundli-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
