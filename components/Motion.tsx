'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function Motion() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.bar nav a'));
    const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
    const toggleMenu = () => menu?.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') !== 'true'));
    const closeMenu = () => menu?.setAttribute('aria-expanded', 'false');
    menu?.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', closeMenu));
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menu.focus();
      }
    };
    window.addEventListener('keydown', onEscape);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        for (const link of links) {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        }
      }
    }, { rootMargin: '-15% 0px -65% 0px' });
    links.forEach(link => {
      const section = document.getElementById(link.hash.slice(1));
      if (section) observer.observe(section);
    });
    const animations = gsap.matchMedia();
    gsap.registerPlugin(ScrollTrigger);
    animations.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis();
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.from('.hero h1 span, .hero-center p', { y: 32, opacity: 0, duration: .75, stagger: .09, ease: 'power3.out' });
      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.mission-statement', start: 'top 87%', once: true },
      })
        .from('.mission-statement h2 span', {
          x: index => index === 0 ? -48 : 48,
          opacity: 0,
          stagger: .18,
          duration: .85,
        })
        .fromTo('.mission-statement h2 span:last-child',
          { textShadow: '0 0 16px #e0d3be80' },
          { textShadow: '0 0 16px #e0d3be00', duration: .9 },
          .3,
        )
        .from('.mission-statement > p, .mission-statement > button', {
          y: 18,
          opacity: 0,
          stagger: .12,
          duration: .65,
        }, .48);
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
        gsap.from(element, { opacity: 0, y: 28, duration: .7, scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
      });
      return () => { gsap.ticker.remove(tick); lenis.destroy(); };
    });
    animations.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const cursor = document.querySelector<HTMLElement>('.project-cursor');
      const move = (event: PointerEvent) => {
        if (!cursor) return;
        const target = (event.target as Element).closest<HTMLElement>('[data-cursor]');
        cursor.toggleAttribute('data-visible', Boolean(target));
        gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: .18, overwrite: true });
      };
      window.addEventListener('pointermove', move);
      return () => { window.removeEventListener('pointermove', move); cursor?.removeAttribute('data-visible'); };
    });
    return () => {
      animations.revert();
      observer.disconnect();
      menu?.removeEventListener('click', toggleMenu);
      links.forEach(link => link.removeEventListener('click', closeMenu));
      window.removeEventListener('keydown', onEscape);
    };
  }, []);
  return <div className="project-cursor" aria-hidden="true">VIEW</div>;
}
