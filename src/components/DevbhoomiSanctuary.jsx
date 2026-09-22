import React from 'react';
import { Shield, Sparkles, Flame, Eye, Compass, HeartHandshake, ArrowRight, Award } from 'lucide-react';

export default function DevbhoomiSanctuary({ lang, onBookWithDeity }) {
  return (
    <section id="devbhoomi" style={{ padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Ambient background glow */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, var(--gold-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-editorial">
            <Flame size={13} color="var(--gold-primary)" />
            {lang === 'hi' ? 'सिद्ध पीठ व देवभूमि परंपरा' : 'DEVBHOOMI SIDDHA HERITAGE'}
          </span>
          <h2 className="font-serif">
            {lang === 'hi' ? (
              <>माँ धारी देवी एवं भगवान काल भैरव <br /><span className="text-gold-gradient">सिद्ध कृपा व आध्यात्मिक कवच</span></>
            ) : (
              <>Sacred Sanctorum Blessings of <br /><span className="text-gold-gradient">Maa Dhari Devi & Lord Kaal Bhairav</span></>
            )}
          </h2>
          <p>
            {lang === 'hi' 
              ? 'उत्तराखंड की पावन देवभूमि स्थित माँ धारी देवी (चार धाम रक्षक) और काल चक्र के स्वामी भगवान काल भैरव के दिव्य आशीर्वाद से संचालित — जहाँ हर कुंडली विश्लेषण और उपाय शास्त्रसम्मत, प्रामाणिक और अचूक होता है।'
              : 'Rooted in the consecrated heights of Devbhoomi Uttarakhand and the cosmic guardianship of Mahakal. Every chart analysis and Vedic remedy at TRINETRA is anchored in sacred sanctum protocols.'}
          </p>
        </div>

        {/* Quick Vedic Tools Ribbon (Astro Arun Pandit Style High-Converting Strip) */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            marginBottom: '48px'
          }}
        >
          <a 
            href="#kundli" 
            className="glass-card"
            style={{
              padding: '18px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--gold-subtle)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Compass size={20} color="var(--gold-primary)" />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '15px' }}>
                {lang === 'hi' ? 'निःशुल्क वैदिक कुंडली' : 'Free Janam Kundli'}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
                {lang === 'hi' ? 'लाहिरी अयनांश गणना' : 'Ephemeris Exact'}
              </div>
            </div>
          </a>

          <a 
            href="#milan" 
            className="glass-card"
            style={{
              padding: '18px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--gold-subtle)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeartHandshake size={20} color="var(--gold-primary)" />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '15px' }}>
                {lang === 'hi' ? '36 गुण कुंडली मिलान' : '36 Gunas Milan'}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
                {lang === 'hi' ? 'भकूट व नाड़ी परिहार' : 'Ashta Koota Matching'}
              </div>
            </div>
          </a>

          <a 
            href="#horoscope" 
            className="glass-card"
            style={{
              padding: '18px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--gold-subtle)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Eye size={20} color="var(--gold-primary)" />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '15px' }}>
                {lang === 'hi' ? 'दैनिक ग्रह गोचर' : 'Planetary Transits'}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
                {lang === 'hi' ? '12 राशि फल व उपाय' : '12 Rashi Forecast'}
              </div>
            </div>
          </a>

          <div 
            onClick={() => onBookWithDeity && onBookWithDeity('Lal Kitab & Devbhoomi Siddha Remedies')}
            className="glass-card"
            style={{
              padding: '18px',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--gold-subtle)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} color="var(--gold-primary)" />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '15px' }}>
                {lang === 'hi' ? 'दोष निवारण व अनुष्ठान' : 'Dosha Nivaran & Rituals'}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
                {lang === 'hi' ? 'मांगलिक, साढ़ेसाती, कालसर्प' : 'Manglik & Sade Sati'}
              </div>
            </div>
          </div>
        </div>

        {/* Two Majestic Consecrated Portals */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '48px'
          }}
        >
          
          {/* Portal 1: Maa Dhari Devi */}
          <div 
            className="glass-card"
            style={{
              padding: '0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Deity Temple Image with Vignette */}
            <div style={{ position: 'relative', height: '240px', width: '100%', overflow: 'hidden' }}>
              <img 
                src="/images/dhari_devi_mandir.jpg" 
                alt="Maa Dhari Devi Sacred Temple Sanctum" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, var(--bg-card) 0%, rgba(5, 8, 17, 0.3) 60%, transparent 100%)'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span 
                  style={{
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFE599',
                    border: '1px solid var(--gold-border)',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  {lang === 'hi' ? 'अधिष्ठात्री शक्ति पीठ' : 'SUPREME SHAKTI PEETH'}
                </span>
                <span style={{ fontSize: '11px', color: '#FFF', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
                  📍 Kalyasaur, Alaknanda
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <h3 className="font-serif text-gold-gradient" style={{ fontSize: '24px', marginBottom: '10px' }}>
                  {lang === 'hi' ? 'माँ धारी देवी — चार धाम रक्षक' : 'Maa Dhari Devi — Guardian of Destiny'}
                </h3>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
                  {lang === 'hi'
                    ? 'अलकनंदा के मध्य स्थित माँ धारी देवी की शक्ति असंभव बाधाओं को दूर करने और प्रारब्ध को अनुकूल करने के लिए जानी जाती है। TRINETRA के परामर्श इसी सिद्ध आशीर्वाद से अभिमंत्रित हैं।'
                    : 'The consecrated guardian deity of Uttarakhand. Revered for dissolving deep karmic blockages, restoring family harmony, and protecting seekers during turbulent planetary transits.'}
                </p>

                {/* Specific Blessings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-primary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }} />
                    <span>{lang === 'hi' ? 'विवाह में अकारण विलंब व वैवाहिक क्लेश निवारण' : 'Marriage Obstacle & Relationship Harmony'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-primary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }} />
                    <span>{lang === 'hi' ? 'मातृ ऋण, पितृ दोष व कुल देवी कृपा संधान' : 'Ancestral Grace & Matru Rin Shanti'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-primary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }} />
                    <span>{lang === 'hi' ? 'जीवन के सबसे कठिन समय में अमोघ संरक्षण' : 'Absolute Life Direction in Critical Crisis'}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onBookWithDeity && onBookWithDeity('Maa Dhari Devi Sankalp Consultation')}
                className="btn-gold" 
                style={{ width: '100%', padding: '13px 20px', fontSize: '13px' }}
              >
                <span>{lang === 'hi' ? 'माँ धारी देवी संकल्प परामर्श बुक करें' : 'Book Dhari Devi Guidance Session'}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Portal 2: Bhagwan Kaal Bhairav */}
          <div 
            className="glass-card"
            style={{
              padding: '0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Deity Temple Image with Vignette */}
            <div style={{ position: 'relative', height: '240px', width: '100%', overflow: 'hidden' }}>
              <img 
                src="/images/kaal_bhairav_divine.jpg" 
                alt="Lord Kaal Bhairav Temple Sanctum" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, var(--bg-card) 0%, rgba(5, 8, 17, 0.3) 60%, transparent 100%)'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span 
                  style={{
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFE599',
                    border: '1px solid var(--gold-border)',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  {lang === 'hi' ? 'काल चक्रेश्वर महाकाल स्वरूप' : 'LORD OF TIME & KARMIC JUSTICE'}
                </span>
                <span style={{ fontSize: '11px', color: '#FFF', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
                  🔱 Fearless Protection
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <h3 className="font-serif text-gold-gradient" style={{ fontSize: '24px', marginBottom: '10px' }}>
                  {lang === 'hi' ? 'भगवान काल भैरव — काल चक्र व भय मुक्ति' : 'Lord Kaal Bhairav — Master of Time & Karma'}
                </h3>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
                  {lang === 'hi'
                    ? 'काल भैरव समय और ग्रहों की उग्र चाल (शनि साढ़ेसाती, राहु-केतु महादशा) के सर्वोच्च नियंता हैं। उनकी कृपा साधक को हर प्रकार के मानसिक भय, शत्रु बाधा और दुर्भाग्य से मुक्त करती है।'
                    : 'The supreme master of cosmic timing and fierce karmic transits. Invocations of Lord Kaal Bhairav neutralize severe planetary afflictions, court/business disputes, and negative astral energies.'}
                </p>

                {/* Specific Blessings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-primary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }} />
                    <span>{lang === 'hi' ? 'शनि साढ़ेसाती, ढैया व राहु-केतु ग्रह पीड़ा शांति' : 'Sade Sati, Rahu-Ketu & Shani Mahadasha Relief'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-primary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }} />
                    <span>{lang === 'hi' ? 'व्यापारिक रुकावट, शत्रु बाधा व नजर दोष निवारण' : 'Business Stagnation & Evil Eye Cleansing'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-primary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }} />
                    <span>{lang === 'hi' ? 'मानसिक अशांति व अज्ञात भय का समूल नाश' : 'Eradication of Anxiety, Fear & Panic'}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onBookWithDeity && onBookWithDeity('Kaal Bhairav Protection Consultation')}
                className="btn-gold" 
                style={{ width: '100%', padding: '13px 20px', fontSize: '13px' }}
              >
                <span>{lang === 'hi' ? 'काल भैरव रक्षा परामर्श बुक करें' : 'Book Kaal Bhairav Protection Reading'}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

        </div>

        {/* Institutional Authority Bar (Astro Arun Pandit Benchmark) */}
        <div 
          className="glass-card"
          style={{
            padding: '24px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gold-subtle)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={24} color="var(--gold-primary)" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)' }}>
                {lang === 'hi' ? '100% प्रामाणिक व गोपनीय वैदिक परंपरा' : '100% Authentic & Confidential Vedic Sanctuary'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {lang === 'hi' ? 'ना कोई अंधविश्वास, ना कोई भय — केवल विशुद्ध खगोलीय गणित और अचूक शास्त्रसम्मत उपाय।' : 'No superstition, no fear-mongering — purely mathematical celestial science and proven Shastriya remedies.'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--gold-primary)', fontWeight: 700 }}>
              {lang === 'hi' ? 'सीधे व्हाट्सएप पर बात करें:' : 'Instant Acharya Consultation:'}
            </span>
            <a 
              href="https://wa.me/917590077820?text=Namaste%20Acharya%20Ji%20%F0%9F%99%8F%20I%20seek%20guidance%20blessed%20by%20Devbhoomi%20Sanctorum." 
              target="_blank" 
              rel="noreferrer" 
              className="btn-gold"
              style={{ padding: '10px 22px', fontSize: '13px' }}
            >
              <span>+91 75900 77820</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
