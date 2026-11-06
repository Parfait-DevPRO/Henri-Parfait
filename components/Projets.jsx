import React, { useState } from 'react';
import '../src/App.css';
import Icon from '../src/components/Icon';
import { handleTilt, resetTilt } from '../src/utils/tilt';
import useReveal from '../src/hooks/useReveal';
import CardCarousel from '../src/components/CardCarousel';

const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/+$/, '');

const projets = [
  { annee: '2026', titre: 'Lognex-Analytics', techs: ['Jenkins', 'Docker', 'Grafana', 'Kubernetes (K8s)'], cat: 'DevOps', desc: 'Projet DevOps pour visualiser les logs avec Grafana et automatiser le pipeline CI/CD.', github: { name: 'Lognex_devops', url: 'https://github.com/Parfait-DevPRO/Lognex_devops' }},
  { annee: '2026', titre: 'Fromazy_AI', techs: ['FastAPI', 'TensorFlow', 'Streamlit'], cat: 'IA', desc: 'Application d’intelligence artificielle qui analyse la qualité d’un fromage et prédit s’il est encore propre à la consommation.', github: { name: 'fromage_ai', url: 'https://github.com/Parfait-DevPRO/fromage_ai' }},
  { annee: '2026', titre: 'Plateforme web de gestion agricole intelligente', techs: ['FastAPI', 'React', 'PostgreSQL'], cat: 'Web', desc: 'Application web permettant de piloter des actionneurs à distance et en temps réel.', github: { name: 'gestion-agriculture-intelligent', url: 'https://github.com/Parfait-DevPRO/SmartAgricole' }},
  { titre: 'Site vitrine Spray_Info', techs: ['ReactJS', 'TypeScript', 'JavaScript'], cat: 'Web', desc: 'Site vitrine de Spray_Info, à Fianarantsoa.', github: { name: 'site_vitrine_Spray_Info', url: 'https://github.com/Parfait-DevPRO/site_vitrine_Spray_Info' }},
  { annee: '2026', titre: 'Système de contrôle et de surveillance agricole', techs: ['ESP32', 'React + FastAPI', 'PostgreSQL'], cat: 'IoT', desc: 'Système agricole connecté avec arrosage automatique, gestion de l’eau et surveillance en temps réel.', github: { name: 'controle-surveillance-agriculture', url: 'https://github.com/Parfait-DevPRO/smartagri' }},
  { annee: '2025', titre: 'Système automatique de surveillance piscicole', techs: ['ESP32', 'IoT', 'Capteurs'], cat: 'IoT', desc: 'Système embarqué de surveillance en temps réel des paramètres de l’eau : pH, température et oxygène.', github: { name: 'iot_tilapia_farm', url: 'https://github.com/Parfait-DevPRO/iot_tilapia_farm' } },
  { annee: '2025', titre: 'Application de gestion de la paie', techs: ['Java', 'Swing', 'SQLite'], cat: 'Desktop', desc: 'Application de bureau pour gérer la paie des employés et générer des rapports automatiquement.', downloadId: 'gestion-paie', github: { name: 'gestion_paie', url: 'https://github.com/Parfait-DevPRO/gestion_paie' } },
  { annee: '2025', titre: 'Application Mobile de surveillance piscicole', techs: ['Android', 'Java', 'SQLite'], cat: 'Mobile', desc: 'Système de surveillance piscicole, piloté depuis une application Android avec authentification.', downloadId: 'tilapia_farm', github: { name: 'Tilapia_Farm intelligent', url: 'https://github.com/Parfait-DevPRO/Tilapia_farm' } },
  { annee: '2024', titre: 'Réseau Social Universitaire', techs: ['Flutter', 'SpringBoot', 'PostgreSQL'], cat: 'Mobile', desc: 'Application Android qui gère les communications sur le campus universitaire.', downloadId: 'Reseau_Social_Universitaire', github: { name: 'Reseau-Social-Universitaire', url: 'https://github.com/Parfait-DevPRO/Reseau-Social-Universitaire' } },
  { annee: '2023', titre: 'Affichage de lettres sur matrice LED', techs: ['ESP32', 'Android', 'WiFi'], cat: 'IoT', desc: 'Affichage sur matrice LED, contrôlé sans fil depuis un smartphone via Bluetooth.', github: { name: 'ecran-matrice-lettres', url: 'https://github.com/Parfait-DevPRO/ecran-matrice-lettres' } },
  { annee: '2023', titre: 'Capacimètre Arduino', techs: ['Arduino', 'Condensateur', 'kit Arduino'], cat: 'Électronique', desc: 'Instrument de mesure de capacité du condensateur avec affichage LCD et haute précision.', github: { name: 'capacimetre', url: 'https://github.com/Parfait-DevPRO/capacimetre' } },
  { annee: '2022', titre: 'Étude d’un circuit RC', techs: ['Électronique', 'Simulation'], cat: 'Électronique', desc: 'Analyse et simulation de circuits RC pour étudier leur comportement.', github: { name: 'etude-circuit-rc', url: 'https://github.com/Parfait-DevPRO/etude-circuit-rc' } },
];

const categories = ['Tous', 'IA', 'DevOps', 'IoT', 'Mobile', 'Web', 'Électronique','Desktop'];

const catColors = {
  IoT: { bg: 'color-mix(in srgb, var(--cyan) 10%, transparent)', text: 'var(--cyan)', border: 'color-mix(in srgb, var(--cyan) 28%, transparent)' },
  Mobile: { bg: 'color-mix(in srgb, var(--accent) 10%, transparent)', text: 'var(--accent)', border: 'color-mix(in srgb, var(--accent) 28%, transparent)' },
  Web: { bg: 'color-mix(in srgb, var(--primary) 10%, transparent)', text: 'var(--primary)', border: 'color-mix(in srgb, var(--primary) 28%, transparent)' },
  Électronique: { bg: 'color-mix(in srgb, var(--primary-container) 16%, transparent)', text: 'var(--primary-dark)', border: 'color-mix(in srgb, var(--primary-container) 36%, transparent)' },
};

const liveUrls = {
  Lognex_devops: 'https://lognex-analytics.vercel.app/',
  'gestion-agriculture-intelligent': 'https://smart-agricole.vercel.app/',
  fromage_ai: 'https://fromageai-fklprupbpa94t8jycnhvmw.streamlit.app/',
  site_vitrine_Spray_Info: 'https://site-vitrine-spray-info.vercel.app/',
};

const categoryIcons = { IA: 'ai', DevOps: 'cloud', Web: 'web', IoT: 'cpu', Mobile: 'mobile', Desktop: 'chart', 'Électronique': 'cpu' };

export default function Projets() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [titleRef, titleVisible] = useReveal();

  const filtered = activeFilter === 'Tous' ? projets : projets.filter(p => p.cat === activeFilter);

  return (
    <section id="projets" data-reveal="section" className="section-dark" style={{ padding: '6rem 2rem', minHeight: '60vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 ref={titleRef} className={`section-title gradient-text reveal${titleVisible ? ' is-visible' : ''}`}>Projets Académiques</h2>

        {/* Filter tabs */}
        <div style={{
          display: 'flex', gap: '0.6rem', justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: '3rem',
        }}>
            {categories.map(cat => (
            <button
              key={cat}
              className={`project-filter${activeFilter === cat ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '0.5rem 1.4rem', borderRadius: 'calc(var(--radius) + 8px)',
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1rem',
                  cursor: 'pointer', transition: 'all 0.25s',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
            >{cat}</button>
          ))}
        </div>

        <CardCarousel label="Carrousel des projets" items={filtered} renderItem={(p) => {
          return <article className="card-modern project-showcase-card" data-reveal key={p.titre}>
            <div className="project-card-topline"><div className="project-card-meta"><span className="project-type-icon" title={p.cat}><Icon name={categoryIcons[p.cat] || 'sparkles'} size={24} /></span><span className="project-type-label">{p.cat}</span></div><h3 className="project-card-title">{p.titre}</h3></div>
            <div className="project-card-content"><p>{p.desc}</p><div className="project-tech-list">{p.techs.map((t, idx) => <span key={t + idx} className="tech-tag">{t}</span>)}</div>
              <div className="project-card-actions"><button className="carousel-action-button" onClick={() => window.open(p.github.url, '_blank', 'noopener,noreferrer')}><Icon name="github" size={18}/> GitHub</button>{liveUrls[p.github.name] && <button className="carousel-action-button secondary" onClick={() => window.open(liveUrls[p.github.name], '_blank', 'noopener,noreferrer')}>Live mode</button>}{p.downloadId && <a className="carousel-action-button secondary" style={{ textDecoration: 'none' }} href={`${apiBase}/api/download/${p.downloadId}`}>Test</a>}</div>
            </div>
          </article>;
        }} />
        {/* Count */}
        <p style={{
          textAlign: 'center', color: 'var(--text-muted)', fontSize: '1rem',
          marginTop: '2.5rem',
        }}>
          {filtered.length} projet{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
        </p>
      </div>
    </section>
  );
}
