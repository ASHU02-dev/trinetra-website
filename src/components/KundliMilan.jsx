import React, { useState } from 'react';
import { Heart, Sparkles, MessageCircle, AlertTriangle, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { NAKSHATRAS } from '../utils/astronomyEngine';
import { calculateAuthenticGunMilan } from '../utils/vedicMilanEngine';

export default function KundliMilan({ lang, onBookMilan }) {
  const [matchMode, setMatchMode] = useState('nakshatra'); // 'nakshatra' or 'birth'

  // Mode A: Direct Nakshatra & Pada selection
  const [boyName, setBoyName] = useState('');
  const [boyNakshatra, setBoyNakshatra] = useState(3); // Rohini
  const [boyPada, setBoyPada] = useState(1);

  const [girlName, setGirlName] = useState('');
  const [girlNakshatra, setGirlNakshatra] = useState(4); // Mrigashira
  const [girlPada, setGirlPada] = useState(2);

  // Mode B: Birth coordinates
  const [bDob, setBDob] = useState('1994-08-12');
  const [bTob, setBTob] = useState('08:45');
  const [bCity, setBCity] = useState('New Delhi');

  const [gDob, setGDob] = useState('1996-11-20');
  const [gTob, setGTob] = useState('14:30');
  const [gCity, setGCity] = useState('Jaipur');

  const [loading, setLoading] = useState(false);
  const [milanResult, setMilanResult] = useState(null);

  const handleCompute = async (e) => {
    e.preventDefault();
    if (matchMode === 'nakshatra') {
      const res = calculateAuthenticGunMilan(
        parseInt(boyNakshatra),
        parseInt(boyPada),
        parseInt(girlNakshatra),
        parseInt(girlPada)
      );
      setMilanResult(res);
    } else {
      setLoading(true);
      try {
        // Query backend for both individuals to extract exact Moon nakshatras
        const [bRes, gRes] = await Promise.all([
          fetch("https://trinetra-backend-iziw.onrender.com/api/kundli", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: boyName || "Partner 1", gender: "male", dob: bDob, tob: bTob, place: bCity, district: bCity, state: bCity })
          }),
          fetch("https://trinetra-backend-iziw.onrender.com/api/kundli", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: girlName || "Partner 2", gender: "female", dob: gDob, tob: gTob, place: gCity, district: gCity, state: gCity })
          })
        ]);

        const bData = await bRes.json();
        const gData = await gRes.json();

        const bNakIdx = bData.vimshottariDasha?.nakshatraIndex ?? 0;
        const gNakIdx = gData.vimshottariDasha?.nakshatraIndex ?? 3;

        // Calculate pada from positionInNakshatra if available or degree
        const bPos = bData.vimshottariDasha?.positionInNakshatra ?? 1;
        const gPos = gData.vimshottariDasha?.positionInNakshatra ?? 1;
        const bPada = Math.min(4, Math.max(1, Math.floor(bPos) + 1));
        const gPada = Math.min(4, Math.max(1, Math.floor(gPos) + 1));

        const res = calculateAuthenticGunMilan(bNakIdx, bPada, gNakIdx, gPada);
        setMilanResult(res);
      } catch (err) {
        // Fallback to direct calculation
        const res = calculateAuthenticGunMilan(parseInt(boyNakshatra), parseInt(boyPada), parseInt(girlNakshatra), parseInt(girlPada));
        setMilanResult(res);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleConsultWhatsApp = () => {
    if (!milanResult) return;
    const bLabel = boyName || (lang === 'hi' ? "वर" : "Partner 1");
    const gLabel = girlName || (lang === 'hi' ? "वधू" : "Partner 2");

    const text = `✨ TRINETRA ASHTA KOOTA KUNDLI MILAN ✨\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 ${bLabel}: ${milanResult.boy.nakshatra} (Pada ${milanResult.boy.pada}) • ${milanResult.boy.rashi}\n` +
      `👤 ${gLabel}: ${milanResult.girl.nakshatra} (Pada ${milanResult.girl.pada}) • ${milanResult.girl.rashi}\n` +
      `⭐ Total Matched: ${milanResult.totalGunas} / 36 Gunas\n` +
      `💎 Verdict: ${milanResult.verdictEn}\n` +
      `⚠️ Nadi Dosha: ${milanResult.nadiDosha ? (milanResult.nadiParihar ? 'Present (Cancelled / Parihar)' : 'Active') : 'No Dosha'}\n` +
      `⚠️ Bhakoot Dosha: ${milanResult.bhakootDosha ? (milanResult.bhakootParihar ? 'Present (Cancelled / Parihar)' : 'Active') : 'No Dosha'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Acharya Ji, please evaluate our marriage compatibility and guide us on wedding dates & remedies.`;

    window.open(`https://wa.me/917590077820?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="milan" style={{ padding: '100px 20px', position: 'relative', background: 'var(--gold-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-editorial">
            <Heart size={13} color="var(--gold-primary)" />
            {lang === 'hi' ? '36 गुण वैदिक मिलान' : 'AUTHENTIC ASHTA KOOTA MATCHING'}
          </span>
          <h2 className="font-serif">
            {lang === 'hi' ? 'विवाह व कुंडली गुण मिलान (36 Gunas)' : 'Sacred 36 Gunas Compatibility'}
          </h2>
          <p>
            {lang === 'hi' 
              ? 'बृहत पाराशर होरा शास्त्र सम्मत 8 कूट: वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट व नाड़ी। नाड़ी व भकूट दोष के प्रामाणिक परिहार सहित।' 
              : 'Authentic Parashari Ashta Koota algorithm: Varna, Vashya, Tara, Yoni (14 animals), Graha Maitri, Gana, Bhakoot & Nadi with verified classical dosha cancellations.'}
          </p>

          {/* Mode Switcher */}
          <div style={{ display: 'inline-flex', gap: '8px', background: 'var(--bg-card)', padding: '4px', borderRadius: '12px', marginTop: '18px', border: '1px solid var(--border-line)' }}>
            <button
              onClick={() => setMatchMode('nakshatra')}
              style={{
                background: matchMode === 'nakshatra' ? 'var(--gold-primary)' : 'transparent',
                color: matchMode === 'nakshatra' ? '#080A0F' : 'var(--text-primary)',
                border: 'none',
                padding: '7px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {lang === 'hi' ? 'नक्षत्र व चरण अनुसार' : 'By Nakshatra & Pada'}
            </button>
            <button
              onClick={() => setMatchMode('birth')}
              style={{
                background: matchMode === 'birth' ? 'var(--gold-primary)' : 'transparent',
                color: matchMode === 'birth' ? '#080A0F' : 'var(--text-primary)',
                border: 'none',
                padding: '7px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {lang === 'hi' ? 'जन्म विवरण अनुसार' : 'By Date of Birth'}
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: milanResult ? '1fr 1.35fr' : '1fr 1fr',
            gap: '36px',
            alignItems: 'start'
          }}
          className="milan-grid"
        >
          
          {/* Form */}
          <div className="glass-card" style={{ padding: '38px 32px' }}>
            <form onSubmit={handleCompute} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* Partner 1 (Boy) */}
              <div style={{ background: 'var(--bg-input)', padding: '18px', borderRadius: '14px', border: '1px solid var(--border-line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>
                  <span>♂</span> {lang === 'hi' ? 'वर (Boy / Partner 1)' : 'Partner 1 (Boy / Groom)'}
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
                    {lang === 'hi' ? 'नाम' : 'Name'}
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Vikram" 
                    value={boyName} 
                    onChange={(e) => setBoyName(e.target.value)} 
                    className="input-bespoke"
                  />
                </div>

                {matchMode === 'nakshatra' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
                        {lang === 'hi' ? 'जन्म नक्षत्र *' : 'Birth Nakshatra *'}
                      </label>
                      <select value={boyNakshatra} onChange={(e) => setBoyNakshatra(e.target.value)} className="input-bespoke">
                        {NAKSHATRAS.map((n) => (
                          <option key={n.id} value={n.id}>{n.id + 1}. {n.name} ({n.nadi} Nadi)</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
                        {lang === 'hi' ? 'चरण (Pada) *' : 'Pada (1-4) *'}
                      </label>
                      <select value={boyPada} onChange={(e) => setBoyPada(e.target.value)} className="input-bespoke">
                        <option value={1}>Pada 1 (चरण 1)</option>
                        <option value={2}>Pada 2 (चरण 2)</option>
                        <option value={3}>Pada 3 (चरण 3)</option>
                        <option value={4}>Pada 4 (चरण 4)</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '8px' }}>
                    <input type="date" value={bDob} onChange={(e) => setBDob(e.target.value)} className="input-bespoke" required />
                    <input type="time" value={bTob} onChange={(e) => setBTob(e.target.value)} className="input-bespoke" required />
                    <input type="text" placeholder="City" value={bCity} onChange={(e) => setBCity(e.target.value)} className="input-bespoke" required />
                  </div>
                )}
              </div>

              {/* Partner 2 (Girl) */}
              <div style={{ background: 'var(--bg-input)', padding: '18px', borderRadius: '14px', border: '1px solid var(--border-line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>
                  <span>♀</span> {lang === 'hi' ? 'वधू (Girl / Partner 2)' : 'Partner 2 (Girl / Bride)'}
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
                    {lang === 'hi' ? 'नाम' : 'Name'}
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ananya" 
                    value={girlName} 
                    onChange={(e) => setGirlName(e.target.value)} 
                    className="input-bespoke"
                  />
                </div>

                {matchMode === 'nakshatra' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
                        {lang === 'hi' ? 'जन्म नक्षत्र *' : 'Birth Nakshatra *'}
                      </label>
                      <select value={girlNakshatra} onChange={(e) => setGirlNakshatra(e.target.value)} className="input-bespoke">
                        {NAKSHATRAS.map((n) => (
                          <option key={n.id} value={n.id}>{n.id + 1}. {n.name} ({n.nadi} Nadi)</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
                        {lang === 'hi' ? 'चरण (Pada) *' : 'Pada (1-4) *'}
                      </label>
                      <select value={girlPada} onChange={(e) => setGirlPada(e.target.value)} className="input-bespoke">
                        <option value={1}>Pada 1 (चरण 1)</option>
                        <option value={2}>Pada 2 (चरण 2)</option>
                        <option value={3}>Pada 3 (चरण 3)</option>
                        <option value={4}>Pada 4 (चरण 4)</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '8px' }}>
                    <input type="date" value={gDob} onChange={(e) => setGDob(e.target.value)} className="input-bespoke" required />
                    <input type="time" value={gTob} onChange={(e) => setGTob(e.target.value)} className="input-bespoke" required />
                    <input type="text" placeholder="City" value={gCity} onChange={(e) => setGCity(e.target.value)} className="input-bespoke" required />
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%' }}>
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>{lang === 'hi' ? 'गणना जारी है...' : 'Accessing Ephemeris...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>{lang === 'hi' ? '36 गुण वैदिक मिलान करें' : 'Compute 36 Gunas Compatibility'}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Result Card */}
          {!milanResult ? (
            <div 
              className="glass-card"
              style={{
                padding: '50px 30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '440px',
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
                <Heart size={30} color="var(--gold-primary)" />
              </div>
              <h4 className="font-serif" style={{ fontSize: '19px', marginBottom: '10px' }}>
                {lang === 'hi' ? 'गुण मिलान प्रतीक्षारत' : 'Ashta Koota Matrix Standby'}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '360px', lineHeight: 1.7 }}>
                {lang === 'hi' 
                  ? 'दोनों पक्षों के जन्म नक्षत्र अथवा जन्म विवरण दर्ज करें। 8 कूटों का प्रामाणिक स्कोर व नाड़ी-भकूट दोष विश्लेषण प्राप्त करें।' 
                  : 'Enter coordinates on the left to generate the complete 36-point Ashta Koota matrix with verified classical dosha cancellations.'}
              </p>
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '36px' }}>
              
              {/* Score Banner */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  borderBottom: '1px solid var(--border-line)',
                  paddingBottom: '20px',
                  marginBottom: '22px'
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Total Ashta Koota Score
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                    <span className="font-serif text-gold-gradient" style={{ fontSize: '48px', fontWeight: 800, lineHeight: 1 }}>
                      {milanResult.totalGunas}
                    </span>
                    <span style={{ fontSize: '18px', color: 'var(--text-subtle)' }}>
                      / 36 Gunas
                    </span>
                  </div>
                </div>

                <div 
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    background: `${milanResult.verdictColor}18`,
                    border: `1px solid ${milanResult.verdictColor}`,
                    color: milanResult.verdictColor,
                    fontWeight: 700,
                    fontSize: '13px'
                  }}
                >
                  {lang === 'hi' ? milanResult.verdictHi : milanResult.verdictEn}
                </div>
              </div>

              {/* Coordinates recap */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                <div style={{ background: 'var(--bg-input)', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-line)', fontSize: '12px' }}>
                  <span style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>Partner 1: </span>
                  <span style={{ color: 'var(--text-primary)' }}>{milanResult.boy.nakshatra} (P-{milanResult.boy.pada}) • {milanResult.boy.rashi}</span>
                </div>
                <div style={{ background: 'var(--bg-input)', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-line)', fontSize: '12px' }}>
                  <span style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>Partner 2: </span>
                  <span style={{ color: 'var(--text-primary)' }}>{milanResult.girl.nakshatra} (P-{milanResult.girl.pada}) • {milanResult.girl.rashi}</span>
                </div>
              </div>

              {/* Dosha Status Alerts */}
              {(milanResult.nadiDosha || milanResult.bhakootDosha) && (
                <div 
                  style={{
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    fontSize: '13px',
                    lineHeight: 1.6
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EF4444', fontWeight: 700, marginBottom: '4px' }}>
                    <AlertTriangle size={16} />
                    <span>Classical Planetary Condition:</span>
                  </div>
                  {milanResult.nadiDosha && (
                    <div>
                      • <strong>Nadi Dosha:</strong> {milanResult.nadiParihar 
                        ? 'Cancelled via Classical Parihar (Different Nakshatras/Rashis cancel the affliction).' 
                        : 'Active (Requires Maha Mrityunjaya mantra & gold charity remedy).'}
                    </div>
                  )}
                  {milanResult.bhakootDosha && (
                    <div>
                      • <strong>Bhakoot Dosha:</strong> {milanResult.bhakootParihar 
                        ? 'Cancelled via Classical Parihar (Friendly / Same Rashi Lords).' 
                        : 'Active (Consult astrologer for planetary pacification).'}
                    </div>
                  )}
                </div>
              )}

              {/* 8 Kootas Detailed Table */}
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--gold-border)', color: 'var(--gold-primary)' }}>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Koota (कूट)</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Significance</th>
                      <th style={{ padding: '8px', textAlign: 'center' }}>Score</th>
                      <th style={{ padding: '8px', textAlign: 'right' }}>Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    {milanResult.kootas.map((k) => (
                      <tr key={k.id} style={{ borderBottom: '1px solid var(--border-line)' }}>
                        <td style={{ padding: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {k.nameEn} ({k.nameHi})
                        </td>
                        <td style={{ padding: '8px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                          {k.desc}
                        </td>
                        <td style={{ padding: '8px', textAlign: 'center', fontWeight: 700, color: k.score === 0 ? '#EF4444' : 'var(--gold-primary)' }}>
                          {k.score}
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--text-subtle)' }}>
                          {k.max}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Box */}
              <div 
                style={{
                  background: 'var(--gold-subtle)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: '14px',
                  padding: '20px',
                  textAlign: 'center'
                }}
              >
                <h4 className="font-serif" style={{ fontSize: '15px', marginBottom: '6px' }}>
                  {lang === 'hi' ? 'दांपत्य सुख व दोष निवारण हेतु आचार्य जी से परामर्श लें' : 'Comprehensive Marital Analysis by Acharya Ji'}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  Gun Milan represents only 30% of marital compatibility. The 7th house strength, Jupiter, and Venus transit determine long-term harmony.
                </p>
                <button
                  onClick={handleConsultWhatsApp}
                  className="btn-gold"
                  style={{ width: '100%', padding: '12px 20px', fontSize: '13px' }}
                >
                  <MessageCircle size={15} />
                  <span>{lang === 'hi' ? 'कुंडली मिलान WhatsApp पर डिस्कस करें' : 'Discuss This Match with Astrologer on WhatsApp'}</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .milan-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
