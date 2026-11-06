import { useEffect, useRef, useState } from 'react';

export default function CardCarousel({ items, renderItem, label }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const getVisibleCount = () => {
    const track = trackRef.current;
    if (!track?.children.length) return 1;
    const slideWidth = track.children[0].getBoundingClientRect().width;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    return Math.max(1, Math.floor((track.clientWidth + gap) / (slideWidth + gap)));
  };
  const pageCount = Math.ceil(items.length / visibleCount);
  const activePage = Math.max(0, Math.min(pageCount - 1, Math.floor(activeIndex / visibleCount)));
  const goToPage = (page) => {
    const index = Math.min(items.length - 1, Math.max(0, page * visibleCount));
    trackRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    setActiveIndex(index);
  };
  const update = () => {
    const track = trackRef.current;
    if (!track?.children.length) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const step = track.children[0].getBoundingClientRect().width + gap;
    setActiveIndex(Math.min(items.length - 1, Math.round(track.scrollLeft / step)));
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const updateVisibleCount = () => setVisibleCount(getVisibleCount());
    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(updateVisibleCount) : null;
    resizeObserver?.observe(track);
    window.addEventListener('resize', updateVisibleCount);
    updateVisibleCount();

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
        else entry.target.classList.remove('is-visible');
      }), { threshold: 0.12 })
      : null;
    track.querySelectorAll('[data-reveal]').forEach((item) => observer?.observe(item));
    setActiveIndex(0);
    track.scrollLeft = 0;
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateVisibleCount);
      observer?.disconnect();
    };
  }, [items]);

  return <div className="card-carousel" aria-label={label}>
    <button className="carousel-arrow carousel-prev" aria-label="Cartes précédentes" onClick={() => goToPage(activePage - 1)} disabled={activePage === 0}>‹</button>
    <div className="carousel-track" ref={trackRef} onScroll={update}>{items.map((item, index) => <div className="carousel-slide" key={item.nom || item.titre || item.name || index}>{renderItem(item, index)}</div>)}</div>
    <button className="carousel-arrow carousel-next" aria-label="Cartes suivantes" onClick={() => goToPage(activePage + 1)} disabled={activePage >= pageCount - 1}>›</button>
    <div className="carousel-dots" aria-label="Pages du carrousel">{Array.from({ length: pageCount }, (_, page) => <button key={page} className={`carousel-dot${activePage === page ? ' active' : ''}`} aria-label={`Afficher la page ${page + 1}`} aria-current={activePage === page ? 'true' : undefined} onClick={() => goToPage(page)} />)}</div>
  </div>;
}
