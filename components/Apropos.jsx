import React from 'react';
import '../src/App.css';
import CuriosityIcon from '../src/assets/curiosity.webp';
import RigorIcon from '../src/assets/rigor.svg';
import CollabIcon from '../src/assets/collab.svg';
import InnovationIcon from '../src/assets/innovation.svg';
import Icon from '../src/components/Icon';
import useReveal from '../src/hooks/useReveal';
import { handleTilt, resetTilt } from '../src/utils/tilt';

const parcours = [
  { annee: '2026-2027 – présent', titre: 'Master en IA et cybersécurité', lieu: 'Université ENI de Fianarantsoa', desc: 'Études en intelligence artificielle dans le parcours Objets connectés et Cybersécurité, apprentissage automatique, IoT et sécurité des systèmes d’information.' },
  { annee: '2022 – 2025', titre: 'Licence en électronique et informatique industrielle', lieu: 'Faculté des sciences de Fianarantsoa', desc: 'Fondamentaux de l’informatique, de l’algorithmique, des réseaux, les systèmes embarqués et les internet des objets.' },
];

const valeurs = [
  { icon: CuriosityIcon, titre: 'Curiosité', desc: 'Toujours en quête de nouvelles technologies et méthodes.' },
  { icon: RigorIcon, titre: 'Rigueur', desc: 'Attention au détail et qualité dans chaque réalisation.' },
  { icon: CollabIcon, titre: 'Collaboration', desc: 'Force du travail en équipe et partage de connaissances.' },
  { icon: InnovationIcon, titre: 'Innovation', desc: 'Cherche constamment des solutions créatives aux problèmes.' },
];
const valueIconNames = ['sparkles', 'check', 'users', 'lightbulb'];

export default function Apropos() {
  const [titleRef, titleVisible] = useReveal();

  return (
    <section id="a-propos" data-reveal="section" className="section-alt" style={{ padding: '6rem 2rem', minHeight: '60vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 ref={titleRef} className={`section-title gradient-text reveal${titleVisible ? ' is-visible' : ''}`}>À propos de moi</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem', alignItems: 'start',
        }}>
          {/* Left: Bio */}
          <div style={{ animation: 'reveal 0.6s ease both' }}>
            <div className="card-modern" data-reveal data-reveal-delay="80" onMouseMove={handleTilt} onMouseLeave={resetTilt} style={{ padding: '3rem', marginBottom: '1.5rem', minHeight: 360, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 'calc(var(--radius) - 4px)', marginBottom: '1.4rem',
                background: 'linear-gradient(135deg, color-mix(in srgb, var(--primary) 20%, transparent), color-mix(in srgb, var(--accent) 16%, transparent))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', color: 'var(--primary)',
              }} className="about-icon"><Icon name="users" size={27} strokeWidth={1.8} /></div>
              <h3 style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.35rem',
                color: 'var(--text)', margin: '0 0 1.2rem 0',
              }}>Qui suis-je ?</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontSize: '1.02rem', margin: 0, flex: 1 }}>
                Passionné par l'Intelligence Artificielle, la Cybersécurité et l'Internet des Objets, je suis actuellement en Master IA & Cybersécurité. Mon parcours alliant théorie et pratique m'a permis de développer des compétences polyvalentes, du développement web au hardware embarqué.
              </p>
            </div>

            <div className="card-modern" data-reveal data-reveal-delay="80" onMouseMove={handleTilt} onMouseLeave={resetTilt} style={{ padding: '2.8rem', minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 'calc(var(--radius) - 4px)', marginBottom: '1.4rem',
                background: 'color-mix(in srgb, var(--accent) 16%, transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: 'var(--accent)',
              }} className="about-icon"><Icon name="eye" size={27} strokeWidth={1.8} /></div>
              <h3 style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.35rem',
                color: 'var(--text)', margin: '0 0 1rem 0',
              }}>Vision</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontSize: '1.02rem', margin: 0, flex: 1 }}>
                Utiliser la technologie pour améliorer la vie quotidienne et sécuriser notre avenir numérique. Mon objectif est de contribuer à des solutions à impact positif sur la société.
              </p>
            </div>
          </div>

          {/* Right: Timeline + Values */}
          <div style={{ animation: 'reveal 0.6s 0.15s ease both' }}>
            {/* Parcours */}
            <div className="card-modern" data-reveal data-reveal-delay="80" onMouseMove={handleTilt} onMouseLeave={resetTilt} style={{ padding: '2.5rem', marginBottom: '3rem' }}>
            <h3 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.1rem',
              color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em',
              margin: '0 0 1.8rem 0',
            }}> Parcours académique</h3>
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              <div className="timeline-line" />
              {parcours.map((p, i) => (
                <div key={p.annee} style={{
                  marginBottom: i < parcours.length - 1 ? '2rem' : 0,
                  animation: `reveal 0.5s ${0.3 + i * 0.1}s ease both`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                    <div className="timeline-dot"
                          style={{ width:10, height:10, background:'var(--primary)', borderRadius:'50%', border:'2px solid color-mix(in srgb, var(--primary) 18%, transparent)', boxShadow:'0 0 12px color-mix(in srgb, var(--primary) 20%, transparent)', flexShrink:0 }}
                        />
                    <span style={{ color: 'var(--primary)', fontSize: '0.95rem', fontWeight: 600 }}>{p.annee}</span>
                  </div>
                  <div style={{ paddingLeft: '1.8rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1rem', marginBottom: 4 }}>{p.titre}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.75 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            </div>

            {/* Values */}
            <h3 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.1rem',
              color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em',
              marginBottom: '1.2rem',
            }}> Mes valeurs</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {valeurs.map((v, i) => (
                <div key={v.titre} className="card-modern" data-reveal data-reveal-delay="80" onMouseMove={handleTilt} onMouseLeave={resetTilt} style={{
                  padding: '1.5rem 1.8rem',
                  animation: `reveal 0.4s ${0.5 + i * 0.08}s ease both`,
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28 }}>
                    <Icon name={valueIconNames[i]} size={22} strokeWidth={1.8} />
                  </span>
                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '1rem', marginTop: 6 }}>{v.titre}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginTop: 3 }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
