'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

type Slide = { title: string; text: string; photo: string; alt?: string };

export default function PhotoStory({ title, buttonLabel, slides, conceptImagery = true }: {
  title: string;
  buttonLabel: string;
  slides: Slide[];
  conceptImagery?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [story, setStory] = useState({ index: 0, direction: 1 });
  const slide = slides[story.index];
  const advance = (direction: number) => setStory(current => ({
    index: (current.index + direction + slides.length) % slides.length,
    direction,
  }));

  return <>
      <button className="explore-event" type="button" aria-haspopup="dialog" onClick={() => {
        setStory({ index: 0, direction: 1 });
        dialog.current?.showModal();
      }}>{buttonLabel} <span className="arrow arrow-diagonal" aria-hidden="true"/></button>
    <dialog className="event-dialog" ref={dialog} aria-label={title + " photo story"} onKeyDown={event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        advance(event.key === 'ArrowLeft' ? -1 : 1);
      }
    }}>
      <div className="event-story">
        <div key={story.index} className="tasting-slide" data-direction={story.direction}>
          <Image src={'/food/' + slide.photo} alt={slide.alt ?? ""} fill sizes="100vw"/>
          <div className="tasting-copy">
            <p className="label">{title}{conceptImagery && " · Concept imagery"}</p>
            <h2>{slide.title}</h2>
            {slide.text && <p>{slide.text}</p>}
          </div>
        </div>
        <button className="close-story" type="button" autoFocus onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button>
        <div className="tasting-controls">
          <button type="button" onClick={() => advance(-1)} aria-label="Previous slide"><span className="arrow arrow-left" aria-hidden="true"/></button>
          <span aria-live="polite" className="sr-only">Slide {story.index + 1} of {slides.length}. {slide.title}</span>
          <span aria-hidden="true">{story.index + 1} / {slides.length}</span>
          <button type="button" onClick={() => advance(1)} aria-label="Next slide"><span className="arrow arrow-right" aria-hidden="true"/></button>
        </div>
      </div>
    </dialog>
  </>;
}
