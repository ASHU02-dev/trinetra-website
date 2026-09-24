import React, { useState } from 'react';
import { X, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { PLANS_DATA } from '../data/currencies';

export default function BookingModal({ 
  isOpen, 
  onClose, 
  initialPlan, 
  initialService, 
  currency, 
  lang 
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlan?.id || 'deep');
  const [topic, setTopic] = useState(initialService?.title || 'Love & Relationship Guidance');
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    dob: '',
    tob: '12:00',
    place: ''
  });

  const selectedPlan = PLANS_DATA.find(p => p.id === selectedPlanId) || PLANS_DATA[1];

  const formatPrice = (plan) => {
    if (currency.code === 'INR') return `₹${plan.baseInr.toLocaleString('en-IN')}`;
    const approx = Math.round(plan.baseInr * currency.rate);
    return `${currency.symbol}${approx}`;
  };

  const handleInputChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleConfirmAndWhatsApp = (e) => {
    e.preventDefault();

    const planTitle = lang === 'hi' ? selectedPlan.title.hi : selectedPlan.title.en;
    const priceText = formatPrice(selectedPlan);

    const message = `✨ TRINETRA PRIVATE CONSULTATION REQUEST ✨\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 Client Name: ${clientData.name || 'Seeker'}\n` +
      `📱 Contact: ${clientData.phone || 'N/A'}\n` +
      `📅 Birth Coordinates: ${clientData.dob || 'Not provided'} | ${clientData.tob} | ${clientData.place || 'Not provided'}\n` +
      `🎯 Topic / Area: ${topic}\n` +
      `💎 Selected Plan: ${planTitle} (${priceText})\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Pandit Ashutosh Chamoli ji, please confirm my appointment schedule.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/917590077820?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--gold-subtle)',
            border: '1px solid var(--border-line)',
            color: 'var(--text-primary)',
            padding: '7px',
            borderRadius: '50%',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Title */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <span className="badge-editorial" style={{ marginBottom: '8px' }}>
            {lang === 'hi' ? 'निजी परामर्श बुकिंग' : 'PRIVATE ADVISORY'}
          </span>
          <h3 className="font-serif text-gold-gradient" style={{ fontSize: '22px', marginTop: '6px' }}>
            {lang === 'hi' ? 'परामर्श का समय चुनें' : 'Schedule Your Consultation'}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            {lang === 'hi' 
              ? `चरण ${step} / 2: परामर्श योजना व विवरण` 
              : `Step ${step} of 2: Select consultation tier & coordinates`}
          </p>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '22px' }}>
          <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: 'var(--gold-primary)' }} />
          <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: step === 2 ? 'var(--gold-primary)' : 'var(--border-line)' }} />
        </div>

        {step === 1 ? (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
                {lang === 'hi' ? 'परामर्श का मुख्य विषय चुनें' : 'Primary Consultation Focus'}
              </label>
              <select 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)}
                className="input-bespoke"
              >
                <option value="Love, Breakup & Marriage Clarity">Love, Breakup & Marriage Clarity (प्रेम व विवाह)</option>
                <option value="Career, Job Switch & Business Yoga">Career, Job Switch & Business Yoga (करियर व व्यापार)</option>
                <option value="Kundli Dosha & Lal Kitab Remedies">Kundli Dosha & Lal Kitab Remedies (दोष निवारण व उपाय)</option>
                <option value="Foreign Settlement & PR Yoga">Foreign Settlement & PR Yoga (विदेश योग व सैटलमेंट)</option>
                <option value="Kundli Milan & Marital Compatibility">Kundli Milan & Gun Milan (कुंडली मिलान)</option>
                <option value="Complete Life Reading & Future Roadmap">Complete Life Reading (संपूर्ण जीवन भविष्यफल)</option>
              </select>
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', fontWeight: 600 }}>
                {lang === 'hi' ? 'परामर्श योजना (Tier)' : 'Select Consultation Tier'}
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {PLANS_DATA.map((p) => {
                  const isChosen = selectedPlanId === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPlanId(p.id)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: isChosen ? '1px solid var(--gold-primary)' : '1px solid var(--border-line)',
                        background: isChosen ? 'var(--gold-subtle)' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: '0.2s'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: isChosen ? 'var(--gold-primary)' : 'var(--text-primary)' }}>
                            {lang === 'hi' ? p.title.hi : p.title.en}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-subtle)', marginTop: '2px' }}>
                          {p.duration} • {lang === 'hi' ? p.format.hi : p.format.en}
                        </div>
                      </div>

                      <div className="font-serif text-gold-gradient" style={{ fontSize: '18px', fontWeight: 800 }}>
                        {formatPrice(p)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="btn-gold" 
              style={{ width: '100%', padding: '13px' }}
            >
              <span>{lang === 'hi' ? 'आगे बढ़ें (जन्म विवरण) →' : 'Continue to Birth Coordinates →'}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmAndWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block', fontWeight: 500 }}>
                {lang === 'hi' ? 'आपका नाम *' : 'Your Full Name *'}
              </label>
              <input 
                type="text" 
                name="name" 
                placeholder="e.g. Vikram Sharma" 
                value={clientData.name} 
                onChange={handleInputChange} 
                className="input-bespoke" 
                required 
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block', fontWeight: 500 }}>
                {lang === 'hi' ? 'व्हाट्सएप नंबर (देश कोड सहित) *' : 'WhatsApp Number (with country code) *'}
              </label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="+91 98765 43210" 
                value={clientData.phone} 
                onChange={handleInputChange} 
                className="input-bespoke" 
                required 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block', fontWeight: 500 }}>
                  {lang === 'hi' ? 'जन्म तिथि' : 'Date of Birth'}
                </label>
                <input 
                  type="date" 
                  name="dob" 
                  value={clientData.dob} 
                  onChange={handleInputChange} 
                  className="input-bespoke" 
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block', fontWeight: 500 }}>
                  {lang === 'hi' ? 'जन्म समय' : 'Birth Time'}
                </label>
                <input 
                  type="time" 
                  name="tob" 
                  value={clientData.tob} 
                  onChange={handleInputChange} 
                  className="input-bespoke" 
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block', fontWeight: 500 }}>
                {lang === 'hi' ? 'जन्म स्थान (शहर / देश)' : 'Birth Place (City, Country)'}
              </label>
              <input 
                type="text" 
                name="place" 
                placeholder="e.g. Mumbai, India / London, UK" 
                value={clientData.place} 
                onChange={handleInputChange} 
                className="input-bespoke" 
              />
            </div>

            <p className="consultation-limit-note">{lang === 'hi' ? `यह ${selectedPlan.duration} का समय-आधारित सेशन है। इस समय में अपने संबंधित विषय पूछें; प्रश्नों की अलग सीमा नहीं है।` : `This is a ${selectedPlan.duration} time-based session. Discuss your relevant concerns during the session; there is no per-question limit.`}</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="btn-obsidian"
                style={{ padding: '12px 18px', fontSize: '13px' }}
              >
                ← Back
              </button>

              <button 
                type="submit" 
                className="btn-gold" 
                style={{ flex: 1, padding: '13px', fontSize: '13px' }}
              >
                <MessageCircle size={16} />
                <span>{lang === 'hi' ? 'WhatsApp पर पुष्टि करें' : 'Confirm on WhatsApp'}</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '4px' }}>
              <ShieldCheck size={13} color="var(--gold-primary)" />
              <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                {lang === 'hi' ? 'निजी परामर्श; आपकी जानकारी को गोपनीय रखा जाता है' : 'Private consultation; your details are handled confidentially.'}
              </span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
