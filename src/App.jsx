import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import VedicKundli from './components/VedicKundli';
import KundliMilan from './components/KundliMilan';
import HoroscopeSection from './components/HoroscopeSection';
import AstrologerProfile from './components/AstrologerProfile';
import PricingPlans from './components/PricingPlans';
import Testimonials from './components/Testimonials';
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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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

      {/* Hero Section */}
      <Hero
        content={content}
        onBookClick={() => handleOpenBooking(PLANS_DATA[1])}
      />

      {/* Core Services */}
      <Services
        content={content}
        onSelectService={(service) => handleOpenBooking(PLANS_DATA[1], service)}
      />

      {/* High-Precision Vedic Kundli Generator Engine */}
      <VedicKundli
        lang={lang}
        onBookWithKundli={() => handleOpenBooking(PLANS_DATA[1])}
      />

      {/* Authentic Ashta Koota Kundli Milan (36 Gunas) */}
      <KundliMilan
        lang={lang}
        onBookMilan={() => handleOpenBooking(PLANS_DATA[2])}
      />

      {/* Planetary Transits & Daily Horoscope */}
      <HoroscopeSection
        lang={lang}
      />

      {/* Astrologer Authority & Sadhana Bio */}
      <AstrologerProfile
        content={content}
        onBookClick={() => handleOpenBooking(PLANS_DATA[1])}
      />

      {/* Pricing Tiers with Multi-Currency */}
      <PricingPlans
        lang={lang}
        currency={currency}
        setCurrency={setCurrency}
        onSelectPlan={(plan) => handleOpenBooking(plan)}
      />

      {/* Verified Reviews */}
      <Testimonials
        content={content}
        lang={lang}
      />

      {/* Frequently Asked Questions */}
      <FAQ
        content={content}
        lang={lang}
      />

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
