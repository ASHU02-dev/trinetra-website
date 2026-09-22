import React from 'react';
import { Sparkles, Check, Clock, PhoneCall, Shield } from 'lucide-react';
import { PLANS_DATA, CURRENCIES } from '../data/currencies';

export default function PricingPlans({ lang, currency, setCurrency, onSelectPlan }) {
  const formatPrice = (plan) => {
    if (currency.code === 'INR') {
      return `${currency.symbol}${plan.baseInr.toLocaleString('en-IN')}`;
    }
    const approx = Math.round(plan.baseInr * currency.rate);
    return `${currency.symbol}${approx}`;
  };

  return (
    <section id="pricing" style={{ padding: '100px 20px', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-editorial">
            {lang === 'hi' ? 'स्पष्ट एवं पारदर्शी शुल्क' : 'TRANSPARENT CONSULTATION TIERS'}
          </span>
          <h2 className="font-serif">
            {lang === 'hi' ? 'सटीक परामर्श योजनाएं' : 'Private Consultation Tiers'}
          </h2>
          <p>
            {lang === 'hi' 
              ? 'प्रत्येक सत्र में 100% व्यक्तिगत समय, सूक्ष्म जन्म चक्र वाचन व व्यावहारिक लाल किताब उपाय सम्मिलित हैं।' 
              : 'Direct, focused private sessions with Acharya Ji. Choose the consultation tier that aligns with your situation.'}
          </p>

          {/* Currency Switcher */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '16px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-line)'
            }}
          >
            <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
              {lang === 'hi' ? 'मुद्रा:' : 'Currency:'}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {Object.values(CURRENCIES).map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCurrency(c)}
                  style={{
                    background: currency.code === c.code ? 'var(--gold-primary)' : 'transparent',
                    color: currency.code === c.code ? '#080A0E' : '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '28px',
            alignItems: 'stretch'
          }}
        >
          {PLANS_DATA.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className="glass-card"
                style={{
                  padding: '40px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isPopular ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-card)',
                  background: isPopular ? 'rgba(16, 20, 30, 0.92)' : 'var(--bg-surface)',
                  boxShadow: isPopular ? '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(200, 165, 91, 0.12)' : 'none',
                  position: 'relative'
                }}
              >
                {/* Popular Tag */}
                {isPopular && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'linear-gradient(135deg, #DFBF7A 0%, #C8A55B 100%)',
                      color: '#080A0E',
                      padding: '5px 18px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '10px',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    MOST SOUGHT-AFTER
                  </div>
                )}

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--gold-light)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {plan.badge}
                  </div>

                  <h3 className="font-serif" style={{ fontSize: '22px', marginBottom: '6px', color: '#FFF' }}>
                    {lang === 'hi' ? plan.title.hi : plan.title.en}
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '22px', minHeight: '38px', lineHeight: 1.6 }}>
                    {lang === 'hi' ? plan.tagline.hi : plan.tagline.en}
                  </p>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '18px' }}>
                    <span className="font-serif text-gold-gradient" style={{ fontSize: '46px', fontWeight: 800, lineHeight: 1 }}>
                      {formatPrice(plan)}
                    </span>
                    <span style={{ color: 'var(--text-subtle)', fontSize: '13px' }}>
                      / {lang === 'hi' ? 'सत्र' : 'session'}
                    </span>
                  </div>

                  {/* Duration & Format */}
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '12px 14px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '10px',
                      marginBottom: '26px',
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-line)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} color="var(--gold-primary)" />
                      <span>{plan.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <PhoneCall size={14} color="var(--gold-primary)" />
                      <span>{lang === 'hi' ? plan.format.hi : plan.format.en}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                    {(lang === 'hi' ? plan.features.hi : plan.features.en).map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div 
                          style={{
                            marginTop: '3px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: 'rgba(200, 165, 91, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Check size={11} color="var(--gold-primary)" strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={isPopular ? "btn-gold" : "btn-obsidian"}
                  style={{ width: '100%', padding: '13px' }}
                >
                  <span>{lang === 'hi' ? plan.cta.hi : plan.cta.en}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div 
          style={{
            marginTop: '45px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            color: 'var(--text-subtle)',
            fontSize: '13px'
          }}
        >
          <Shield size={15} color="var(--gold-primary)" />
          <span>
            {lang === 'hi' 
              ? '100% गोपनीय व व्यक्तिगत परामर्श • कोई भी प्रश्न अनुत्तरित नहीं रहता।' 
              : '100% Sacred Confidentiality Guarantee • Individual Focus with Respect for Privacy.'}
          </span>
        </div>

      </div>
    </section>
  );
}
