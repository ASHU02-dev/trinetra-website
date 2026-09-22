import React, { useState } from 'react';
import { Moon, Sparkles, MessageCircle, Heart, Briefcase, Coins } from 'lucide-react';
import { RASHIFAL_DATA } from '../data/rashifal';

export default function HoroscopeSection({ lang }) {
  const [selectedSign, setSelectedSign] = useState(RASHIFAL_DATA[0]);

  const handleWhatsAppHoroscope = () => {
    const name = lang === 'hi' ? selectedSign.nameHi : selectedSign.nameEn;
    const text = `✨ TRINETRA DAILY HOROSCOPE CONSULTATION ✨\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `♈ Rashi: ${name} (${selectedSign.symbol})\n` +
      `🪐 Ruler: ${selectedSign.ruler}\n` +
      `🔮 Cosmic Vibe: ${selectedSign.vibe}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Acharya Ji, please provide a detailed personalized transit forecast and remedies for my chart.`;
    window.open(`https://wa.me/917590077820?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="horoscope" style={{ padding: '100px 20px', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-editorial">
            <Moon size={13} color="var(--gold-primary)" />
            {lang === 'hi' ? 'दैनिक व मासिक गोचर' : 'COSMIC TRANSITS & HOROSCOPE'}
          </span>
          <h2 className="font-serif">
            {lang === 'hi' ? 'दैनिक राशि फल' : 'Planetary Transit Predictions'}
          </h2>
          <p>
            {lang === 'hi' 
              ? 'वर्तमान ग्रह गोचर अनुसार अपनी राशि चुनें और प्रेम, करियर व धन की स्थिति का सूक्ष्म आंकलन जानें।' 
              : 'Select your zodiac sign to reveal current planetary transit influences on your emotional state, professional growth, and material prosperity.'}
          </p>
        </div>

        {/* 12 Signs Selector Pills */}
        <div 
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '32px',
            justifyContent: 'flex-start'
          }}
          className="horoscope-scrollbar"
        >
          {RASHIFAL_DATA.map((sign) => {
            const isSelected = selectedSign.id === sign.id;
            return (
              <button
                key={sign.id}
                onClick={() => setSelectedSign(sign)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  borderRadius: 'var(--radius-pill)',
                  background: isSelected 
                    ? 'linear-gradient(135deg, #DFBF7A 0%, #C8A55B 100%)' 
                    : 'rgba(255,255,255,0.03)',
                  border: isSelected ? '1px solid #FFF' : '1px solid var(--border-line)',
                  color: isSelected ? '#080A0E' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s'
                }}
              >
                <span style={{ fontSize: '15px' }}>{sign.symbol}</span>
                <span>{lang === 'hi' ? sign.nameHi : sign.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Sign Detailed Card */}
        <div className="glass-card" style={{ padding: '40px 36px', maxWidth: '920px', margin: '0 auto' }}>
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              borderBottom: '1px solid var(--border-line)',
              paddingBottom: '20px',
              marginBottom: '26px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'var(--gold-subtle)',
                  border: '1px solid var(--gold-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  color: 'var(--gold-light)'
                }}
              >
                {selectedSign.symbol}
              </div>
              <div>
                <h3 className="font-serif text-gold-gradient" style={{ fontSize: '26px', lineHeight: 1.2 }}>
                  {lang === 'hi' ? selectedSign.nameHi : selectedSign.nameEn}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {selectedSign.vibe}
                </p>
              </div>
            </div>

            {/* Quick Specs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-line)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block' }}>{lang === 'hi' ? 'स्वामी ग्रह' : 'Ruler'}</span>
                <span style={{ fontSize: '12px', color: 'var(--gold-light)', fontWeight: 600 }}>{selectedSign.ruler}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-line)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block' }}>{lang === 'hi' ? 'शुभ रंग' : 'Color'}</span>
                <span style={{ fontSize: '12px', color: 'var(--gold-light)', fontWeight: 600 }}>{selectedSign.luckyColor}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-line)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-subtle)', display: 'block' }}>{lang === 'hi' ? 'शुभ अंक' : 'Number'}</span>
                <span style={{ fontSize: '12px', color: 'var(--gold-light)', fontWeight: 600 }}>{selectedSign.luckyNumber}</span>
              </div>
            </div>
          </div>

          {/* Today's Prediction Text */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '13px', color: 'var(--gold-light)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              {lang === 'hi' ? 'गोचर फल एवं वैदिक सलाह' : 'Cosmic Alignment & Guidance'}
            </h4>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.85)' }}>
              {lang === 'hi' ? selectedSign.predictionHi : selectedSign.predictionEn}
            </p>
          </div>

          {/* Cosmic Score Meters */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '32px'
            }}
          >
            {/* Love */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-light)', fontSize: '13px', fontWeight: 600 }}>
                  <Heart size={14} color="var(--gold-primary)" />
                  <span>{lang === 'hi' ? 'प्रेम व संबंध' : 'Love & Relations'}</span>
                </div>
                <span style={{ fontWeight: 700, color: '#FFF', fontSize: '13px' }}>{selectedSign.loveScore}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${selectedSign.loveScore}%`, height: '100%', background: 'var(--gold-primary)' }} />
              </div>
            </div>

            {/* Career */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-light)', fontSize: '13px', fontWeight: 600 }}>
                  <Briefcase size={14} color="var(--gold-primary)" />
                  <span>{lang === 'hi' ? 'करियर व व्यवसाय' : 'Career Momentum'}</span>
                </div>
                <span style={{ fontWeight: 700, color: '#FFF', fontSize: '13px' }}>{selectedSign.careerScore}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${selectedSign.careerScore}%`, height: '100%', background: 'var(--gold-primary)' }} />
              </div>
            </div>

            {/* Wealth */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-light)', fontSize: '13px', fontWeight: 600 }}>
                  <Coins size={14} color="var(--gold-primary)" />
                  <span>{lang === 'hi' ? 'आर्थिक स्थिरता' : 'Wealth & Finance'}</span>
                </div>
                <span style={{ fontWeight: 700, color: '#FFF', fontSize: '13px' }}>{selectedSign.wealthScore}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${selectedSign.wealthScore}%`, height: '100%', background: 'var(--gold-primary)' }} />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleWhatsAppHoroscope}
              className="btn-gold"
              style={{ padding: '13px 30px' }}
            >
              <MessageCircle size={15} />
              <span>
                {lang === 'hi' 
                  ? `${selectedSign.nameHi} राशि का व्यक्तिगत फलादेश जानें` 
                  : `Consult Acharya for ${selectedSign.nameEn} Personalized Transit`}
              </span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
