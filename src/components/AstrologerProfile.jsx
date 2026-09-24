import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AstrologerProfile({ lang, onBookClick }) {
  return (
    <section className="pandit-intro">
      <div className="container pandit-intro-inner">
        <div>
          <span className="badge-editorial">{lang === 'hi' ? 'परामर्शदाता' : 'YOUR CONSULTANT'}</span>
          <h2 className="font-serif">Pandit Ashutosh Chamoli</h2>
          <p>{lang === 'hi' ? 'वैदिक कुंडली पठन, हवन और व्यावहारिक उपायों के लिए समय-आधारित परामर्श।' : 'Time-based consultations for Vedic Kundli readings, havan and practical remedies.'}</p>
        </div>
        <button type="button" className="btn-obsidian" onClick={onBookClick}>
          {lang === 'hi' ? 'सेशन चुनें' : 'Choose a session'} <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
