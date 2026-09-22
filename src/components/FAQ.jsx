import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ({ content, lang }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (i) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section id="faq" style={{ padding: '90px 20px', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-cosmic">
            <HelpCircle size={14} color="#D4AF37" />
            {content.faq.badge}
          </span>
          <h2 className="font-cinzel">
            {content.faq.title}
          </h2>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {content.faq.items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div 
                key={i} 
                className="glass-card" 
                style={{
                  border: isOpen ? '1px solid var(--border-gold)' : '1px solid var(--border-glass)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: '0.3s'
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 600,
                    gap: '16px'
                  }}
                >
                  <span style={{ color: isOpen ? 'var(--gold-primary)' : 'var(--text-primary)' }}>{item.q}</span>
                  {isOpen ? <ChevronUp size={20} color="var(--gold-primary)" /> : <ChevronDown size={20} color="var(--text-subtle)" />}
                </button>

                {isOpen && (
                  <div 
                    style={{
                      padding: '0 24px 22px',
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      lineHeight: 1.8,
                      borderTop: '1px solid var(--border-line)',
                      paddingTop: '16px'
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
