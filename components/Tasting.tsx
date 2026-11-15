'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

const slides = [
  { title: 'Around one table', text: 'A tasting for family and friends to slow down and share a meal.', photo: 'made-with-care.jpg' },
  { title: 'Familiar dishes, new flavors', text: 'Familiar ingredients meet flavors guests might be trying for the first time.', photo: 'shared-plates.jpg' },
  { title: 'A sweet finish', text: 'One last bite and a little more time to talk.', photo: 'dessert.jpg' },
];

export default function Tasting() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [story, setStory] = useState({ index: 0, direction: 1 });
  const slide = slides[story.index];
  const advance = (direction: number) => setStory(current => ({
    index: (current.index + direction + slides.length) % slides.length,
    direction,
  }));

  return <section className="hero featured-hero" id="projects">
    <div className="hero-backdrop" aria-hidden="true"><Image src="/food/made-with-care.jpg" alt="" fill sizes="100vw"/></div>
    <div className="hero-caption"><span>Featured tasting</span><span>Concept imagery</span></div>
    <div className="hero-center" data-reveal>
      <h2>A Night<br/>of Flavor.</h2>
      <p>A curated tasting for family and friends.</p>
      <button className="explore-event" type="button" aria-haspopup="dialog" onClick={() => {
        setStory({ index: 0, direction: 1 });
        dialog.current?.showModal();
      }}>Explore the event <span aria-hidden="true">↗</span></button>
    </div>
    <dialog className="event-dialog" ref={dialog} aria-label="A Night of Flavor photo story" onKeyDown={event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        advance(event.key === 'ArrowLeft' ? -1 : 1);
      }
    }}>
      <div className="event-story">
        <div key={story.index} className="tasting-slide" data-direction={story.direction}>
          <Image src={'/food/' + slide.photo} alt="" fill sizes="100vw"/>
          <div className="tasting-copy">
            <p className="label">A Night of Flavor · Concept imagery</p>
            <h2>{slide.title}</h2>
            <p>{slide.text}</p>
          </div>
        </div>
        <button className="close-story" type="button" autoFocus onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button>
        <div className="tasting-controls">
          <button type="button" onClick={() => advance(-1)} aria-label="Previous slide">←</button>
          <span aria-live="polite" className="sr-only">Slide {story.index + 1} of {slides.length}. {slide.title}</span>
          <span aria-hidden="true">{story.index + 1} / {slides.length}</span>
          <button type="button" onClick={() => advance(1)} aria-label="Next slide">→</button>
        </div>
      </div>
    </dialog>
  </section>;
}
