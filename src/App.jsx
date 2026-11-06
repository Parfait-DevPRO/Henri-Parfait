import './App.css';
import './responsive.css';
import Navigation from '../components/Navigation';
import Accueil from '../components/Accueil';
import Competences from '../components/Competences';
import Projets from '../components/Projets';
import Apropos from '../components/Apropos';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    items.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <Accueil />
        <Competences />
        <Projets />
        <Apropos />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
