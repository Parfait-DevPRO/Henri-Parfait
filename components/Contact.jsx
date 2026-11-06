import { useState } from 'react';
import '../src/App.css';
import Icon from '../src/components/Icon';
import { handleTilt, resetTilt } from '../src/utils/tilt';
import useReveal from '../src/hooks/useReveal';

const infos = [
  { icon: 'mail', label: 'Email', value: 'parfaitranomenjanahary@gmail.com', href: 'mailto:parfaitranomenjanahary@gmail.com' },
  { icon: 'map', label: 'Localisation', value: 'Tsiroanomandidy, Madagascar', href: 'https://maps.app.goo.gl/haENMB1QPrLezemb8' },
  { icon: 'linkedin', label: 'LinkedIn', value: 'LinkedIn', href: 'https://linkedin.com/in/ranomenjanahary-henri-parfait-7a6072320' },
  { icon: 'github', label: 'GitHub', value: 'GitHub', href: 'https://github.com/Parfait-DevPRO' },
];

export default function Contact() {
  const [titleRef, titleVisible] = useReveal();
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Erreur lors de l'envoi du message.");
        setLoading(false);
        return;
      }
      setSent(true);
      setForm({ nom: '', email: '', sujet: '', message: '' });
    } catch (err) {
      console.error(err);
      setErrorMessage("Impossible de contacter le serveur. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-reveal="section" className="section-dark" style={{ padding: '6rem 2rem', minHeight: '60vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 ref={titleRef} className={`section-title gradient-text reveal${titleVisible ? ' is-visible' : ''}`}>Contactez-moi</h2>
        <p style={{
          textAlign: 'center', color: 'var(--text-muted)', maxWidth: 500,
          margin: '0 auto 4rem', lineHeight: 1.7, fontSize: '1.05rem',
        }}>
          Vous avez un projet en tête ou souhaitez collaborer ? N'hésitez pas à me contacter !
        </p>

        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {/* Contact info */}
          <div style={{ animation: 'reveal 0.6s ease both' }}>
            <h3 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.2rem',
              color: 'var(--text)', marginBottom: '1.5rem',
            }}>Informations de contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {infos.map(info => (
                <a key={info.label} className="contact-info-card" data-reveal data-reveal-delay="80" href={info.href || '#'} target={info.href ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1.4rem 1.4rem', textDecoration: 'none',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)', transition: 'all 0.25s', cursor: info.href ? 'pointer' : 'default',
                  }}
                  onMouseOver={e => { if(info.href) { e.currentTarget.style.borderColor='var(--outline)'; e.currentTarget.style.background='var(--bg3)'; }}}
                  onMouseOut={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--surface)'; }}
                >
                  <span className="contact-info-icon" style={{
                    width: 40, height: 40,
                    background: 'color-mix(in srgb, var(--primary) 12%, transparent)', borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon name={info.icon} size={22} strokeWidth={1.8} />
                  </span>
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.92rem', fontWeight: 500, marginBottom: 2 }}>{info.label}</div>
                    <div style={{ color: 'var(--text)', fontSize: '1rem', fontWeight: 500 }}>{info.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="contact-availability" data-reveal data-reveal-delay="80" style={{
              padding: '1.2rem', borderRadius: 'var(--radius)',
              background: 'color-mix(in srgb, var(--primary) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--primary) 18%, transparent)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ width:8,height:8,borderRadius:'50%',background:'var(--primary)',boxShadow:'0 0 8px color-mix(in srgb, var(--primary) 30%, transparent)' }} />
                <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem' }}>Disponible pour de nouveaux projets</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                Ouvert aux opportunités de stage, alternance ou collaboration sur des projets innovants.
              </p>
            </div>
          </div>

          {/* Form */}
          <div style={{ animation: 'reveal 0.6s 0.1s ease both' }}>
            {sent ? (
              <div className="card-modern" data-reveal data-reveal-delay="80" style={{
                padding: '3rem 2.5rem', textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
              }}>
                <Icon name="check" className="contact-success-icon" size={48} strokeWidth={3} />
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: 'var(--primary)', margin: 0 }}>Message envoyé !</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>Je vous répondrai dans les plus brefs délais.</p>
                <button className="btn-secondary" onClick={() => setSent(false)} style={{ marginTop: '1rem' }}>Envoyer un autre message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-modern contact-form" data-reveal data-reveal-delay="80" onMouseMove={handleTilt} onMouseLeave={resetTilt} style={{
                padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem',
              }}>
                {errorMessage && <div className="contact-error-message" role="alert"><Icon name="close" size={22} strokeWidth={3} /><span>{errorMessage}</span></div>}
                <div className="contact-fields-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, display: 'block', marginBottom: 6 }}>Nom *</label>
                    <input
                      type="text" name="nom" value={form.nom} onChange={handleChange}
                      placeholder="Votre nom" required className="form-input"
                    />
                  </div>
                  <div>
                    <label style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, display: 'block', marginBottom: 6 }}>Email *</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="votre@email.com" required className="form-input"
                    />
                  </div>
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, display: 'block', marginBottom: 6 }}>Sujet *</label>
                  <input
                    type="text" name="sujet" value={form.sujet} onChange={handleChange}
                    placeholder="Objet de votre message" required className="form-input"
                  />
                </div>
                <div>
                  <label style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, display: 'block', marginBottom: 6 }}>Message *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Décrivez votre projet ou votre demande..." required rows={5}
                    className="form-input message-input" style={{ resize: 'vertical', minHeight: 170 }}
                  />
                </div>
                <button type="submit" disabled={loading} style={{
                  background: loading ? 'color-mix(in srgb, var(--primary) 30%, transparent)' : 'linear-gradient(135deg, var(--primary), var(--primary-container))',
                  color: 'var(--on-primary)', border: 'none', borderRadius: 'calc(var(--radius) + 2px)',
                  padding: '0.95rem 2rem', fontFamily: 'Inter, sans-serif',
                  fontWeight: 600, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: loading ? 'none' : '0 4px 20px color-mix(in srgb, var(--primary) 25%, transparent)',
                }}
                onMouseOver={e => { if(!loading) e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseOut={e => { e.currentTarget.style.transform='none'; }}
                >
                  {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
