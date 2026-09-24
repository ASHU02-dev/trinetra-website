import React, { useState } from 'react';
import { ArrowRight, CalendarDays, Flame, Heart, MapPin, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';

const WHATSAPP_NUMBER = '917590077820';

const offerings = [
  {
    id: 'shuddhi-havan',
    title: 'Shuddhi Havan',
    hindi: 'शुद्धि हवन',
    description: 'A traditional fire ritual for a calm, prayerful start at home or at the temple.',
    descriptionHi: 'घर या मंदिर में शांति और शुभ संकल्प के लिए पारंपरिक अग्नि अनुष्ठान।',
    icon: Flame,
  },
  {
    id: 'shatru-nashak-havan',
    title: 'Shatru Nashak Havan',
    hindi: 'शत्रु नाशक हवन',
    description: 'Ask about a sankalp for courage, peace and protection. Ritual details are confirmed before booking.',
    descriptionHi: 'साहस, शांति और संरक्षण के संकल्प के लिए पूछें। बुकिंग से पहले विधि की पुष्टि होगी।',
    icon: ShieldCheck,
  },
  {
    id: 'grah-dosh-puja',
    title: 'Grah Dosh Shanti Puja',
    hindi: 'ग्रह दोष शांति पूजा',
    description: 'Share your concern and birth details so the team can suggest a suitable puja or consultation.',
    descriptionHi: 'अपनी चिंता और जन्म विवरण साझा करें; टीम उपयुक्त पूजा या परामर्श सुझाएगी।',
    icon: Sparkles,
  },
  {
    id: 'kaal-sarp-puja',
    title: 'Kaal Sarp Dosh Puja',
    hindi: 'काल सर्प दोष पूजा',
    description: 'Request a kundli review and check which ritual format and date may be available for you.',
    descriptionHi: 'कुंडली समीक्षा और आपके लिए उपयुक्त पूजा विधि व तारीख की उपलब्धता पूछें।',
    icon: Sparkles,
  },
];

export default function PujaAvailability({ lang = 'en' }) {
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState('online');
  const [form, setForm] = useState({ name: '', phone: '', city: '', state: '', date: '' });
  const isHindi = lang === 'hi';

  const openAvailability = (service) => {
    setSelected(service);
    setMode('online');
  };

  const closeAvailability = () => setSelected(null);

  const submitAvailability = (event) => {
    event.preventDefault();
    const message = [
      'Namaste Trinetra ji 🙏',
      'Please check All India puja / havan availability for me.',
      `Service: ${selected.title}`,
      `Mode: ${mode === 'online' ? 'Online' : 'Offline / in-person'}`,
      `Name: ${form.name}`,
      `WhatsApp: ${form.phone}`,
      `City: ${form.city}, ${form.state}`,
      `Preferred date: ${form.date || 'Flexible'}`,
      'Please confirm serviceability, available time, inclusions and total price before I book. I understand this is an availability enquiry, not a confirmed booking.',
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    closeAvailability();
  };

  const copy = isHindi ? {
    badge: 'पूजा • हवन • अखिल भारत',
    title: 'घर बैठे ऑनलाइन या अपने शहर में पूजा बुक करें',
    intro: 'भारत के किसी भी शहर से उपलब्धता पूछें। पहले शहर, तारीख, विधि और पूरी कीमत की पुष्टि होगी—फिर बुकिंग आगे बढ़ेगी।',
    online: 'ऑनलाइन पूजा',
    onlineNote: 'लाइव या संकल्प पूजा • अखिल भारत',
    offline: 'ऑफलाइन पूजा',
    offlineNote: 'आपके शहर में पंडित उपलब्धता पूछें',
    havan: 'हवन और दोष शांति सेवाएं',
    check: 'WhatsApp पर उपलब्धता पूछें',
    lakshmi: 'माँ लक्ष्मी पूजा और धन मार्गदर्शन',
    lakshmiText: 'माँ लक्ष्मी पूजन और कुंडली आधारित धन-संबंधी उपाय पूछें। धन लाभ की गारंटी नहीं दी जाती।',
    consultation: 'पूजा और कुंडली परामर्श पूछें',
    modalTitle: 'उपलब्धता पूछें',
    city: 'शहर *',
    state: 'राज्य *',
    preferredDate: 'पसंदीदा तारीख',
    name: 'आपका नाम *',
    phone: 'WhatsApp नंबर *',
    modeLabel: 'पूजा का तरीका',
    send: 'WhatsApp पर उपलब्धता पूछें',
    note: 'यह केवल उपलब्धता की पूछताछ है। टीम की पुष्टि के बाद ही बुकिंग पक्की होगी।',
    close: 'बंद करें',
  } : {
    badge: 'PUJA • HAVAN • ALL INDIA',
    title: 'Book online from anywhere or ask for a visit in your city',
    intro: 'Send an enquiry from any Indian state. The team checks city, date, ritual format and the full price before you decide to book.',
    online: 'Online Puja',
    onlineNote: 'Live or sankalp puja • All India',
    offline: 'Offline Puja',
    offlineNote: 'Ask for a priest in your city',
    havan: 'Havan and dosha-shanti services',
    check: 'Check availability on WhatsApp',
    lakshmi: 'Lakshmi Puja & wealth guidance',
    lakshmiText: 'Ask about Lakshmi Puja and kundli-based guidance for financial well-being. No financial outcome is guaranteed.',
    consultation: 'Ask about puja or kundli guidance',
    modalTitle: 'Check puja availability',
    city: 'City *',
    state: 'State *',
    preferredDate: 'Preferred date',
    name: 'Your name *',
    phone: 'WhatsApp number *',
    modeLabel: 'Puja format',
    send: 'Ask availability on WhatsApp',
    note: 'This is an enquiry only. Your booking is confirmed after the team replies.',
    close: 'Close',
  };

  return (
    <>
      <section id="puja-havan" className="puja-section">
        <div className="container">
          <div className="section-header">
            <span className="badge-editorial">{copy.badge}</span>
            <h2 className="font-serif">{copy.title}</h2>
            <p>{copy.intro}</p>
          </div>

          <div className="puja-service-layout">
            <div className="puja-service-copy">
              <div className="puja-mode-pills">
                <div className="puja-mode-pill"><Sparkles size={17} /><span><strong>{copy.online}</strong><small>{copy.onlineNote}</small></span></div>
                <div className="puja-mode-pill"><MapPin size={17} /><span><strong>{copy.offline}</strong><small>{copy.offlineNote}</small></span></div>
              </div>

              <h3 className="font-serif puja-subheading">{copy.havan}</h3>
              <div className="puja-offering-grid">
                {offerings.map(({ id, title, hindi, description, icon: Icon }) => (
                  <article className="glass-card puja-offering-card" key={id}>
                    <div className="puja-offering-icon"><Icon size={20} /></div>
                    <div className="puja-offering-kicker">{isHindi ? hindi : 'VEDIC RITUAL'}</div>
                    <h4 className="font-serif">{title}</h4>
                    <p>{isHindi ? descriptionHi : description}</p>
                    <button type="button" className="btn-obsidian" onClick={() => openAvailability({ title, id })}>
                      <span>{copy.check}</span><ArrowRight size={15} />
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <div className="puja-visual-stack">
              <figure className="puja-photo-card glass-card">
                <img src="/images/shuddhi-havan.jpg" alt="Illustrative visual of a traditional havan kund prepared for Shuddhi Havan" loading="lazy" />
                <figcaption><span>Shuddhi Havan</span><small>Illustrative visual</small></figcaption>
              </figure>
              <figure className="puja-photo-card lakshmi-photo-card glass-card">
                <img src="/images/lakshmi-puja.jpg" alt="Illustrative devotional visual of Lakshmi for puja information" loading="lazy" />
                <figcaption><span>{copy.lakshmi}</span><small>Illustrative visual</small></figcaption>
              </figure>
              <div className="glass-card lakshmi-guidance-card">
                <Heart size={19} color="var(--gold-primary)" />
                <div><h3 className="font-serif">{copy.lakshmi}</h3><p>{copy.lakshmiText}</p></div>
                <button type="button" className="btn-gold" onClick={() => openAvailability({ title: 'Lakshmi Puja & Kundli Wealth Guidance', id: 'lakshmi-guidance' })}>{copy.consultation}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selected && (
        <div className="modal-overlay" onClick={closeAvailability} role="presentation">
          <div className="modal-content puja-modal" role="dialog" aria-modal="true" aria-labelledby="puja-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="puja-modal-close" onClick={closeAvailability} aria-label={copy.close}>×</button>
            <span className="badge-editorial">ALL INDIA ENQUIRY</span>
            <h3 id="puja-modal-title" className="font-serif text-gold-gradient">{copy.modalTitle}</h3>
            <p className="puja-modal-service">{selected.title}</p>
            <form onSubmit={submitAvailability} className="puja-availability-form">
              <label>{copy.modeLabel}<select className="input-bespoke" value={mode} onChange={(event) => setMode(event.target.value)}><option value="online">{copy.online}</option><option value="offline">{copy.offline}</option></select></label>
              <div className="puja-form-row">
                <label>{copy.city}<input className="input-bespoke" required value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} autoComplete="address-level2" /></label>
                <label>{copy.state}<input className="input-bespoke" required value={form.state} onChange={(event) => setForm({ ...form, state: event.target.value })} autoComplete="address-level1" /></label>
              </div>
              <label>{copy.preferredDate}<input className="input-bespoke" type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label>
              <label>{copy.name}<input className="input-bespoke" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} autoComplete="name" /></label>
              <label>{copy.phone}<input className="input-bespoke" required type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} autoComplete="tel" /></label>
              <button type="submit" className="btn-gold puja-submit"><MessageCircle size={17} />{copy.send}</button>
              <p className="puja-modal-note"><CalendarDays size={14} />{copy.note}</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
