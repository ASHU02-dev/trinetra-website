import React from 'react';
import { Eye, Sparkles, Instagram, MessageCircle, Mail, MapPin, Shield } from 'lucide-react';

export default function Footer({ lang, content, onBookClick }) {
  return (
    <footer 
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-line)',
        padding: '70px 20px 100px',
        position: 'relative'
      }}
    >
      <div className="container">
        
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '50px'
          }}
        >
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Eye size={18} color="var(--gold-primary)" />
              </div>
              <span className="font-cinzel text-gold-gradient" style={{ fontSize: '22px', fontWeight: 800 }}>
                TRINETRA
              </span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
              {lang === 'hi' 
                ? 'प्राचीन महर्षि पाराशर वैदिक ज्योतिष, नवांश विश्लेषण व लाल किताब के अचूक उपायों द्वारा जीवन की जटिल समस्याओं का 100% गोपनीय व प्रामाणिक समाधान।' 
                : 'Dedicated to empowering human destiny through classical Parashari astrology, Jaimini wisdom, and safe Vedic remedial sciences.'}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a 
                href="https://wa.me/917590077820" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#25D366',
                  transition: '0.2s'
                }}
                title="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>

              <a 
                href="https://instagram.com/__triinetra__" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(225, 48, 108, 0.15)',
                  border: '1px solid rgba(225, 48, 108, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E1306C',
                  transition: '0.2s'
                }}
                title="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="font-cinzel text-gold-gradient" style={{ fontSize: '16px', marginBottom: '18px' }}>
              {lang === 'hi' ? 'त्वरित लिंक' : 'Spiritual Portals'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <a href="#/home" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{content.nav.services}</a>
              <a href="#/kundli" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{content.nav.kundli}</a>
              <a href="#/milan" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{content.nav.milan}</a>
              <a href="#/rashifal" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Aaj ka Rashifal</a>
              <a href="#/consultation" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{content.nav.pricing}</a>
            </div>
          </div>

          {/* Col 3: Key Consultations */}
          <div>
            <h4 className="font-cinzel text-gold-gradient" style={{ fontSize: '16px', marginBottom: '18px' }}>
              {lang === 'hi' ? 'विशेषज्ञ परामर्श' : 'Core Consultations'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <span>• Love & Inter-caste Marriage Solution</span>
              <span>• Career Delay & Job Transition Timing</span>
              <span>• Manglik & Nadi Dosha Nivaran</span>
              <span>• Foreign Settlement & Visa Combinations</span>
              <span>• Kundli Milan & Gun Milan (36 Gunas)</span>
              <span>• Certified Gemstone Prescription</span>
            </div>
          </div>

          {/* Col 4: Reach Out */}
          <div>
            <h4 className="font-cinzel text-gold-gradient" style={{ fontSize: '16px', marginBottom: '18px' }}>
              {lang === 'hi' ? 'संपर्क एवं समय' : 'Global Consultations'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={16} color="#25D366" />
                <a href="https://wa.me/917590077820" target="_blank" rel="noreferrer" style={{ color: '#FFF', textDecoration: 'none' }}>
                  +91 75900 77820
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Instagram size={16} color="#E1306C" />
                <a href="https://instagram.com/__triinetra__" target="_blank" rel="noreferrer" style={{ color: '#FFF', textDecoration: 'none' }}>
                  @__triinetra__
                </a>
              </div>

              <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '11px', color: 'var(--gold-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {lang === 'hi' ? 'परामर्श समय:' : 'Consultation Hours:'}
                </div>
                <div style={{ fontSize: '12px', color: '#FFF', marginTop: '2px' }}>
                  09:00 AM – 10:00 PM (IST)
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                  Monday through Sunday (All 7 Days)
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div 
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '25px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
            color: 'var(--text-subtle)'
          }}
        >
          <div style={{ maxWidth: '650px', lineHeight: 1.6 }}>
            {lang === 'hi'
              ? 'अस्वीकरण: ज्योतिष शास्त्र एक आध्यात्मिक व सांकेतिक मार्गदर्शक विज्ञान है। जीवन के अंतिम निर्णय आपकी अपनी स्वतंत्र इच्छा व कर्मों पर आधारित होते हैं। TRINETRA अंधविश्वास का विरोध करता है।'
              : 'Disclaimer: Vedic Astrology is a sacred spiritual and indicative science. Predictions and guidance are meant for self-empowerment and clarity. Final decisions rest with individual free will.'}
          </div>
          <div>
            © {new Date().getFullYear()} TRINETRA. All rights reserved. • astrotrinetra.in
          </div>
        </div>

      </div>
    </footer>
  );
}
