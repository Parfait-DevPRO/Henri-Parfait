import { useEffect, useRef, useState } from 'react';
import '../src/App.css';
import Icon from '../src/components/Icon';
import { handleTilt, resetTilt } from '../src/utils/tilt';
import CardCarousel from '../src/components/CardCarousel';

const competences = [
  { nom: 'Développement Web', niveau: 'Avancé', icone: 'web', pourcentage: 90 }, { nom: 'Développement IoT', niveau: 'Intermédiaire', icone: 'cpu', pourcentage: 75 },
  { nom: 'Ingénierie des données', niveau: 'Intermédiaire', icone: 'database', pourcentage: 70 }, { nom: 'Système embarqué', niveau: 'Intermédiaire', icone: 'cpu', pourcentage: 70 },
  { nom: 'Développement Mobile', niveau: 'Intermédiaire', icone: 'mobile', pourcentage: 70 }, { nom: 'Cybersécurité', niveau: 'Intermédiaire', icone: 'shield', pourcentage: 60 },
  { nom: 'IA & Machine Learning', niveau: 'Intermédiaire', icone: 'ai', pourcentage: 60 }, { nom: 'DevOps', niveau: 'Intermédiaire', icone: 'settings', pourcentage: 70 },
];

const tools = [
  { name: 'Wifi', category: 'Réseaux', detail: 'Connexion sans fil', icon: 'wifi', localIcon: 'wifi' }, { name: 'Bluetooth', category: 'Réseaux', detail: 'Communication sans fil', icon: 'bluetooth', fallbackIcon: 'bluetooth' },
  { name: 'LoRaWAN', category: 'Réseaux', detail: 'IoT longue portée', icon: 'lora', fallbackIcon: 'network' },
  { name: 'Docker', category: 'Outils', detail: 'DevOps', icon: 'docker' }, { name: 'Jenkins', category: 'Outils', detail: 'DevOps', icon: 'jenkins' },
  { name: 'GitHub', category: 'Outils', detail: 'DevOps', icon: 'github', darkLogo: true }, { name: 'GitHub Actions', category: 'Outils', detail: 'CI/CD', icon: 'githubactions' },
  { name: 'Grafana', category: 'Outils', detail: 'Monitoring', icon: 'grafana' }, { name: 'Render', category: 'Outils', detail: 'Déploiement', icon: 'render', fallbackIcon: 'web', darkLogo: true },
  { name: 'Vercel', category: 'Outils', detail: 'Déploiement', icon: 'vercel', fallbackIcon: 'web', darkLogo: true }, { name: 'SaaS', category: 'Outils', detail: 'Cloud', icon: 'saas', fallbackIcon: 'cloud' }, { name: 'PaaS', category: 'Outils', detail: 'Cloud', icon: 'paas', fallbackIcon: 'cloud' },
  { name: 'Arduino', category: 'Microcontrôleur', detail: 'IoT', icon: 'arduino' }, { name: 'ESP32', category: 'Microcontrôleur', detail: 'IoT', icon: 'espressif' },
  { name: 'Raspberry Pi', category: 'Microcontrôleur', detail: 'IoT', icon: 'raspberrypi' },
  { name: 'Linux', category: 'Outils', detail: 'Ubuntu & Kali', icon: 'linux' }, { name: 'Git', category: 'Outils', detail: 'DevOps', icon: 'git' },
  { name: 'HTML', category: 'Langage', detail: 'Web', icon: 'html5' }, { name: 'CSS', category: 'Langage', detail: 'Web', icon: 'css3', fallbackIcon: 'web' },
  { name: 'JavaScript', category: 'Langage', detail: 'Web', icon: 'javascript' }, { name: 'C', category: 'Langage', detail: 'Programmation', icon: 'c' },
  { name: 'C++', category: 'Langage', detail: 'Programmation', icon: 'cplusplus' }, { name: 'Python', category: 'Langage', detail: 'Programmation', icon: 'python' },
  { name: 'Java', category: 'Langage', detail: 'Programmation', icon: 'java', fallbackIcon: 'coffee' },
  { name: 'React', category: 'Framework', detail: 'Frontend', icon: 'react' }, { name: 'Node.js', category: 'Framework', detail: 'Backend', icon: 'nodedotjs' },
  { name: 'FastAPI', category: 'Framework', detail: 'Backend', icon: 'fastapi' }, { name: 'Spring Boot', category: 'Framework', detail: 'Backend', icon: 'springboot' },
  { name: 'Android', category: 'Framework', detail: 'Mobile', icon: 'android' }, { name: 'Flutter', category: 'Framework', detail: 'Mobile', icon: 'flutter' },
  { name: 'MySQL', category: 'Base de données', detail: 'SQL', icon: 'mysql' }, { name: 'PostgreSQL', category: 'Base de données', detail: 'SQL', icon: 'postgresql' },
  { name: 'MongoDB', category: 'Base de données', detail: 'NoSQL', icon: 'mongodb' }, { name: 'SQLite', category: 'Base de données', detail: 'SQL embarqué', icon: 'sqlite' },
  { name: 'Hadoop', category: 'Big Data', detail: 'Traitement distribué', icon: 'apachehadoop' }, { name: 'Apache Spark', category: 'Big Data', detail: 'Calcul distribué', icon: 'apachespark' },
  { name: 'Nmap', category: 'Cybersécurité', detail: 'Audit réseau', icon: 'nmap', fallbackIcon: 'shield' }, { name: 'Wireshark', category: 'Cybersécurité', detail: 'Analyse réseau', icon: 'wireshark' },
  { name: 'Kali Linux', category: 'Cybersécurité', detail: 'Tests de sécurité', icon: 'kalilinux' }, { name: 'Metasploit', category: 'Cybersécurité', detail: 'Tests de pénétration', icon: 'metasploit' },
  { name: 'Social Engineering', category: 'Cybersécurité', detail: 'Sensibilisation', icon: 'hackthebox' },
  { name: 'Machine Learning', category: 'IA', detail: 'Apprentissage automatique', icon: 'scikitlearn', fallbackIcon: 'ai' }, { name: 'Deep Learning', category: 'IA', detail: 'Réseaux neuronaux', icon: 'pytorch', fallbackIcon: 'ai' },
  { name: 'PyTorch', category: 'IA', detail: 'Modèles IA', icon: 'pytorch', fallbackIcon: 'ai' }, { name: 'TensorFlow', category: 'IA', detail: 'Modèles IA', icon: 'tensorflow', fallbackIcon: 'ai' },
  { name: 'OpenCV', category: 'IA', detail: 'Vision par ordinateur', icon: 'opencv', fallbackIcon: 'eye' },
];

const toolCategories = ['Outils', 'Langage', 'Framework', 'Base de données', 'Big Data', 'Cybersécurité', 'Réseaux', 'Microcontrôleur', 'IA'];

const logoUrl = (icon) => `https://cdn.simpleicons.org/${icon}`;

function ToolLogo({ tool }) {
  const [failed, setFailed] = useState(false);
  if (tool.localIcon) return <Icon name={tool.localIcon} size={28} strokeWidth={1.8} className="tool-logo-fallback" />;
  if (tool.name === 'Java') return failed
    ? <Icon name="coffee" size={28} strokeWidth={1.8} className="tool-logo-fallback" />
    : <img className="tool-java-logo" src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" alt="Logo officiel Java" width="72" height="28" loading="lazy" onError={() => setFailed(true)} />;
  return failed && tool.fallbackIcon
    ? <Icon name={tool.fallbackIcon} size={28} strokeWidth={1.8} className="tool-logo-fallback" />
    : <img className={tool.darkLogo ? 'dark-theme-logo' : ''} src={logoUrl(tool.icon)} alt={`${tool.name} logo`} width="28" height="28" loading="lazy" onError={() => setFailed(true)} />;
}

export default function Competences() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setAnimate(true); }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return <section id="competences" data-reveal="section" className="section-alt competences-section" ref={sectionRef}>
    <div className="competences-container">
      <h2 className="section-title gradient-text">Mes compétences</h2>
      <CardCarousel label="Carrousel des compétences" items={competences} renderItem={(c, i) => <article key={c.nom} className="card-modern skill-card" data-reveal data-reveal-delay="80" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
        <div className="skill-card-top"><h3 className="skill-card-title-green"><Icon name={c.icone} size={23} strokeWidth={2} /><span>{c.nom}</span></h3></div>
        <div className="skill-card-content"><p className="skill-level">{c.niveau} · {c.pourcentage}%</p><div className="skill-stars" role="img" aria-label={`Niveau ${c.niveau}, ${Math.round(c.pourcentage / 20)} étoiles sur 5`}>{[1, 2, 3, 4, 5].map(star => <span key={star} className={star <= Math.round(c.pourcentage / 20) ? 'is-filled' : ''}>★</span>)}</div>
        <div className="skill-progress-meta"><span>Maîtrise</span><span>{c.pourcentage >= 85 ? 'Très bonne' : c.pourcentage >= 70 ? 'Bonne' : 'En progression'}</span></div><div className="skill-bar"><div className={`skill-bar-fill${animate ? ' animate' : ''}`} style={{ width: `${c.pourcentage}%`, transitionDelay: `${i * .1}s` }} /></div><a className="carousel-action-button skill-more" href="#contact">Voir plus <Icon name="arrow" size={18}/></a></div>
      </article>} />
      <h3 className="tools-title">Outils et technologies</h3>
      <div className="tools-groups">{toolCategories.map(category => <div className="tools-category-row" key={category}>
        <h4>{category}</h4>
        <div className="tools-grid">{tools.filter(tool => tool.category === category).map((tool, i) => <div key={tool.name} className={`tool-card tool-card-logo${tool.name === 'Java' ? ' java-tool-card' : ''}`} data-reveal style={{ animation: `reveal .4s ${.15 + i * .04}s ease both` }}>
          <ToolLogo tool={tool} />
          <span className="tool-name">{tool.name}</span>
        </div>)}</div>
      </div>)}</div>
    </div>
  </section>;
}
