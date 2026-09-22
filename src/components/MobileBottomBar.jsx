import React from 'react';
import { MessageCircle, Compass, Sparkles } from 'lucide-react';

export default function MobileBottomBar({ lang, onBookClick }) {
  const handleDirectWhatsApp = () => {
    const text = "Hello TRINETRA 🙏 I want to book a private consultation with Acharya Ji. Please guide me.";
    window.open(`https://wa.me/917590077820?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* Floating Desktop WhatsApp Button */}
      <a 
        href={`https://wa.me/917590077820?text=${encodeURIComponent("Hello TRINETRA 🙏 I want to enquire about consultation.")}`}
        target="_blank" 
        rel="noreferrer"
        className="whatsapp-floating"
        title="Chat with Astrologer on WhatsApp"
      >
        <MessageCircle size={22} />
        <span>{lang === 'hi' ? 'व्हाट्सएप परामर्श' : 'Chat on WhatsApp'}</span>
      </a>

      {/* Sticky Mobile 2-Button Bar */}
      <div className="mobile-bottom-bar">
        <button
          onClick={handleDirectWhatsApp}
          style={{
            background: '#25D366',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          <MessageCircle size={17} />
          <span>{lang === 'hi' ? 'व्हाट्सएप चैट' : 'WhatsApp Chat'}</span>
        </button>

        <button
          onClick={onBookClick}
          style={{
            background: 'linear-gradient(135deg, #7F0909 0%, #D4AF37 100%)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          <Sparkles size={16} />
          <span>{lang === 'hi' ? 'सेशन बुक करें' : 'Book Session'}</span>
        </button>
      </div>
    </>
  );
}
