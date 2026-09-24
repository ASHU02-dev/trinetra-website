import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PujaAvailability from './components/PujaAvailability';
import Services from './components/Services';
import VedicKundli from './components/VedicKundli';
import KundliMilan from './components/KundliMilan';
import HoroscopeSection from './components/HoroscopeSection';
import AstrologerProfile from './components/AstrologerProfile';
import PricingPlans from './components/PricingPlans';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import BookingModal from './components/BookingModal';

import { CONTENT } from './data/languages';
import { CURRENCIES, PLANS_DATA } from './data/currencies';

export default function App() {
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState(CURRENCIES.INR);
  const [theme, setTheme] = useState('midnight'); // 'midnight' or 'ivory'
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(PLANS_DATA[1]);
  const [selectedService, setSelectedService] = useState(null);
  const [page, setPage] = useState(() => {
    const route = window.location.hash.replace(/^#\/?/, '') || 'home';
    return route === 'puja-havan' ? 'home' : route;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const syncPage = () => {
      const route = window.location.hash.replace(/^#\/?/, '') || 'home';
      setPage(route === 'puja-havan' ? 'home' : route);
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (route === 'puja-havan') window.setTimeout(() => document.getElementById('puja-havan')?.scrollIntoView(), 50);
    };
    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);

  const content = CONTENT[lang] || CONTENT.en;

  const handleOpenBooking = (plan = null, service = null) => {
    if (plan) setSelectedPlan(plan);
    if (service) setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="app-root">
      {/* Top Navbar with Theme Toggle */}
      <Navbar
        lang={lang}
        setLang={setLang}
        currency={currency}
        setCurrency={setCurrency}
        theme={theme}
        setTheme={setTheme}
        content={content}
        onBookClick={() => handleOpenBooking(PLANS_DATA[1])}
      />

      {page === 'home' && <>
        <Hero content={content} onBookClick={() => handleOpenBooking(PLANS_DATA[1])} />
        <PujaAvailability lang={lang} />
        <Services content={content} onSelectService={(service) => handleOpenBooking(PLANS_DATA[1], service)} />
        <section className="tools-directory"><div className="container"><span className="badge-editorial">FREE VEDIC TOOLS</span><h2 className="font-serif">Choose a free tool</h2><div className="tools-directory-grid">
          <a className="tool-directory-card featured" href="#/kundli"><strong>Free Kundli</strong><span>Birth chart and planetary details</span><b>Open Kundli →</b></a>
          <a className="tool-directory-card featured" href="#/milan"><strong>Free Kundli Milan</strong><span>Compatibility and guna matching</span><b>Open Milan →</b></a>
          <a className="tool-directory-card" href="#/rashifal"><strong>Aaj ka Rashifal</strong><span>Daily guidance for all 12 signs</span><b>Read today’s forecast →</b></a>
        </div></div></section>
        <section className="roots-note"><div className="container"><p><strong>Pandit Ashutosh Chamoli</strong> · {lang === 'hi' ? 'उत्तराखंड की परंपरा और माँ धारी देवी से प्रेरित। यह केवल आध्यात्मिक संदर्भ है; किसी मंदिर या संस्थान से आधिकारिक संबद्धता का दावा नहीं।' : 'Inspired by Uttarakhand traditions and Maa Dhari Devi. This is a spiritual reference only; no official temple or institute affiliation is claimed.'}</p><a href="#/consultation">{lang === 'hi' ? 'परामर्श विवरण →' : 'Consultation details →'}</a></div></section>
        <AstrologerProfile lang={lang} onBookClick={() => handleOpenBooking(PLANS_DATA[1])} />
      </>}

      {page === 'kundli' && <VedicKundli lang={lang} onBookWithKundli={() => handleOpenBooking(PLANS_DATA[1])} />}
      {page === 'milan' && <KundliMilan lang={lang} onBookMilan={() => handleOpenBooking(PLANS_DATA[2])} />}
      {page === 'rashifal' && <HoroscopeSection lang={lang} />}
      {page === 'consultation' && <>
        <PricingPlans lang={lang} currency={currency} setCurrency={setCurrency} onSelectPlan={(plan) => handleOpenBooking(plan)} />
        <FAQ content={content} lang={lang} />
      </>}

      {/* Global Footer */}
      <Footer
        lang={lang}
        content={content}
        onBookClick={() => handleOpenBooking(PLANS_DATA[1])}
      />

      {/* Sticky Mobile Conversion Bar & Floating WhatsApp */}
      <MobileBottomBar
        lang={lang}
        onBookClick={() => handleOpenBooking(PLANS_DATA[1])}
      />

      {/* 2-Step Interactive Booking Drawer */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialPlan={selectedPlan}
        initialService={selectedService}
        currency={currency}
        lang={lang}
      />
    </div>
  );
}
