import { useEffect, useState } from 'react';
import Icon from '../src/components/Icon';

const links = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#competences', label: 'Compétences' },
  { href: '#projets', label: 'Projets' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#accueil');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('portfolio-theme-v2') === 'dark');
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme-v2', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  const navigate = (href) => { setActive(href); setOpen(false); };
  const toggleTheme = () => setDarkMode(current => !current);
  return <>
    <nav className={`site-nav${scrolled ? ' site-nav-scrolled' : ''}`} aria-label="Navigation principale">
      <div className="nav-inner">
        <a className="brand-mark" href="#accueil">H.P</a>
        <div className="nav-desktop">
          {links.map(link => <a key={link.href} className={`nav-link${active === link.href ? ' active' : ''}`} href={link.href} onClick={() => navigate(link.href)}>{link.label}</a>)}
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={darkMode ? 'Activer le mode clair' : 'Activer le mode sombre'} title={darkMode ? 'Mode clair' : 'Mode sombre'}><Icon name={darkMode ? 'sun' : 'moon'} size={20}/></button>
          <a className="btn btn-primary nav-contact" href="#contact">Me contacter</a>
        </div>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}><Icon name={open ? 'close' : 'menu'} size={24}/></button>
      </div>
    </nav>
    {open && <div className="mobile-nav" style={{ display: 'flex' }}>
      {links.map(link => <a key={link.href} href={link.href} onClick={() => navigate(link.href)}>{link.label}</a>)}
      <button className="theme-toggle mobile-theme-toggle" type="button" onClick={toggleTheme}><Icon name={darkMode ? 'sun' : 'moon'} size={20}/><span>{darkMode ? 'Mode clair' : 'Mode sombre'}</span></button>
      <a className="btn btn-primary" href="#contact" onClick={() => setOpen(false)}>Me contacter</a>
    </div>}
  </>;
}
