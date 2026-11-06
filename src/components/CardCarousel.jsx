import { useEffect, useRef, useState } from 'react';

export default function CardCarousel({ items, renderItem, label }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = () => {
    const track = trackRef.current;
    if (!track?.children.length) return 1;
    const step = track.children[0].getBoundingClientRect().width + 20;
    return Math.max(1, Math.round(track.clientWidth / step));
  };
  const pageCount = Math.ceil(items.length / visibleCount());
  const activePage = Math.min(pageCount - 1, Math.floor(activeIndex / visibleCount()));
  const goToPage = (page) => {
    const index = Math.min(items.length - 1, Math.max(0, page * visibleCount()));
    trackRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    setActiveIndex(index);
  };
  const update = () => {
    const track = trackRef.current;
    if (!track?.children.length) return;
    const step = track.children[0].getBoundingClientRect().width + 20;
    setActiveIndex(Math.min(items.length - 1, Math.round(track.scrollLeft / step)));
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
      else entry.target.classList.remove('is-visible');
    }), { threshold: 0.12 });
    track.querySelectorAll('[data-reveal]').forEach((item) => observer.observe(item));
    setActiveIndex(0);
    track.scrollLeft = 0;
    return () => observer.disconnect();
  }, [items]);

  return <div className="card-carousel" aria-label={label}>
    <button className="carousel-arrow carousel-prev" aria-label="Cartes précédentes" onClick={() => goToPage(activePage - 1)} disabled={activePage === 0}>‹</button>
    <div className="carousel-track" ref={trackRef} onScroll={update}>{items.map((item, index) => <div className="carousel-slide" key={item.nom || item.titre || item.name || index}>{renderItem(item, index)}</div>)}</div>
    <button className="carousel-arrow carousel-next" aria-label="Cartes suivantes" onClick={() => goToPage(activePage + 1)} disabled={activePage >= pageCount - 1}>›</button>
    <div className="carousel-dots" aria-label="Pages du carrousel">{Array.from({ length: pageCount }, (_, page) => <button key={page} className={`carousel-dot${activePage === page ? ' active' : ''}`} aria-label={`Afficher la page ${page + 1}`} aria-current={activePage === page ? 'true' : undefined} onClick={() => goToPage(page)} />)}</div>
  </div>;
}
