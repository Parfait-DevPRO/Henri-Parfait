import React from 'react';
import Icon from '../src/components/Icon';

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/RANOMENJANAHARY-Henri-Parfait', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/Parfait-DevPRO', icon: 'github' },
  { label: 'Email', href: 'mailto:parfaitranomenjanahary@gmail.com', icon: 'mail' },
];

const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#competences', label: 'Compétences' },
  { href: '#projets', label: 'Projets' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: '4rem 2rem 2rem',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem', marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 800,
              fontSize: '1.8rem', letterSpacing: 2, marginBottom: '1rem',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>H.P</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, margin: '0 0 1.5rem 0', maxWidth: 220 }}>
              Développeur passionné par l'IA, la Cybersécurité et l'IoT. Disponible pour de nouveaux projets.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: 38, height: 38, borderRadius: '50%',
                    border: '1px solid var(--border)',
                    background: 'transparent', color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem',
                    transition: 'all 0.25s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor='var(--primary)'; e.currentTarget.style.color='var(--primary)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.transform='none'; }}
                ><Icon name={s.icon} size={18} strokeWidth={1.8} /></a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Navigation</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {navLinks.map(l => (
                <a key={l.href} href={l.href} style={{
                  color: 'var(--text-muted)', textDecoration: 'none', fontSize: '1rem',
                  transition: 'color 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.color='var(--primary)'}
                onMouseOut={e => e.currentTarget.style.color='var(--text-muted)'}
                >{l.label}</a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                <span className="footer-contact-icon"><Icon name="mail" size={18} strokeWidth={1.8} /></span>
                <a href="mailto:parfaitranomenjanahary@gmail.com" style={{ color: 'var(--text-muted)', textDecoration: 'none', lineHeight: 1.2 }}
                  onMouseOver={e => e.currentTarget.style.color='var(--primary)'}
                  onMouseOut={e => e.currentTarget.style.color='var(--text-muted)'}
                >parfaitranomenjanahary@gmail.com</a>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Tsiroanomandidy, Madagascar</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Tel: +261 38 90 252 94 / +261 33 21 055 94</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span style={{ width:7,height:7,borderRadius:'50%',background:'var(--primary)',display:'inline-block',boxShadow:'0 0 8px color-mix(in srgb, var(--primary) 30%, transparent)' }} />
                <span style={{ color: 'var(--primary)', fontSize: '0.95rem', fontWeight: 500 }}>Disponible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border)', margin: '0 0 1.5rem' }} />

        {/* Bottom */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Henri Parfait RANOMENJANAHARY — Tous droits réservés
          </span>
        </div>
      </div>
    </footer>
  );
}
