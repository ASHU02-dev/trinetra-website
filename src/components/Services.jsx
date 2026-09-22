import React from 'react';
import { Heart, Briefcase, ShieldAlert, Plane, Sparkles, Hash, ArrowRight } from 'lucide-react';

export default function Services({ content, onSelectService }) {
  const iconMap = {
    Heart: <Heart size={22} color="var(--gold-primary)" />,
    Briefcase: <Briefcase size={22} color="var(--gold-primary)" />,
    ShieldAlert: <ShieldAlert size={22} color="var(--gold-primary)" />,
    Plane: <Plane size={22} color="var(--gold-primary)" />,
    Sparkles: <Sparkles size={22} color="var(--gold-primary)" />,
    Hash: <Hash size={22} color="var(--gold-primary)" />
  };

  return (
    <section id="services" style={{ padding: '100px 20px', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-editorial">
            {content.services.badge}
          </span>
          <h2 className="font-serif">
            {content.services.title}
          </h2>
          <p>
            {content.services.subtitle}
          </p>
        </div>

        {/* 3x2 Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {content.services.items.map((service) => (
            <div 
              key={service.id} 
              className="glass-card" 
              style={{
                padding: '38px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div 
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: 'var(--gold-subtle)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}
                >
                  {iconMap[service.icon] || <Sparkles size={22} color="var(--gold-primary)" />}
                </div>

                <div 
                  style={{
                    fontSize: '11px',
                    color: 'var(--gold-light)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}
                >
                  {service.highlight}
                </div>

                <h3 
                  className="font-serif"
                  style={{
                    fontSize: '20px',
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    lineHeight: 1.3
                  }}
                >
                  {service.title}
                </h3>

                <p 
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    marginBottom: '26px'
                  }}
                >
                  {service.desc}
                </p>
              </div>

              <button
                onClick={() => onSelectService(service)}
                className="btn-obsidian"
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: '12px 20px',
                  fontSize: '13px'
                }}
              >
                <span>Book This Consultation</span>
                <ArrowRight size={15} color="var(--gold-primary)" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
