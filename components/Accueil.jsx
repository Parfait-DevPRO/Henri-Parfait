import { useEffect, useState } from 'react';
import profil from '../src/assets/profil.png';
import Icon from '../src/components/Icon';

export default function Accueil() {
  const domaines = ['Développement web & mobile', 'Cybersécurité', 'IoT', 'DevOps', 'Intelligence Artificielle', 'Systèmes embarqués'];
  const [domaineIndex, setDomaineIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setDomaineIndex(index => (index + 1) % domaines.length), 2600);
    return () => window.clearInterval(timer);
  }, [domaines.length]);

  return <section id="accueil" className="hero-section">
    <div className="container hero-container">
      <div className="hero-copy">
        <div className="hero-badges"><span className="badge"><span className="status-dot"/> Disponible pour collaborer</span></div>
        <p className="hero-kicker">Bonjour, je suis</p>
        <h1 className="hero-title">Henri Parfait <span>RANOMENJANAHARY</span></h1>
        <p className="hero-role hero-role-animated" key={domaines[domaineIndex]}>{domaines[domaineIndex]}</p>
        <p className="hero-description">Je conçois et développe des solutions numériques innovantes, du web aux systèmes IoT et embarqués connectés, en intégrant le DevOps, l’intelligence artificielle et la cybersécurité pour créer des produits fiables, performants et évolutifs.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projets">Découvrir mes projets <Icon name="arrow" size={17}/></a>
          <a className="btn btn-light" href="#contact">Me contacter</a>
        </div>
        <a className="hero-cv-link" href="/cv/mon-cv.pdf" download><Icon name="download" size={16}/> Télécharger mon CV</a>
      </div>
      <div className="hero-visual">
        <div className="hero-photo-frame"><img src={profil} alt="Portrait de Henri Parfait Ranomenjanahary"/></div>
        <div className="hero-floating-card"><strong>Solutions numériques</strong><small>Web · IoT · IA</small></div>
        <div className="hero-stats">
          <div className="hero-stat"><strong>10+</strong><span>Projets réalisés</span></div>
          <div className="hero-stat"><strong>3+</strong><span>Années d’apprentissage</span></div>
          <div className="hero-stat"><strong>7</strong><span>Domaines explorés</span></div>
        </div>
      </div>
    </div>
  </section>;
}
