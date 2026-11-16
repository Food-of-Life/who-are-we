import Image from 'next/image';
import PhotoStory from './PhotoStory';

const slides = [
  { title: 'Around one table', text: 'A tasting for family and friends to slow down and share a meal.', photo: 'made-with-care.jpg' },
  { title: 'Familiar dishes, new flavors', text: 'Familiar ingredients meet flavors guests might be trying for the first time.', photo: 'shared-plates.jpg' },
  { title: 'A sweet finish', text: 'One last bite and a little more time to talk.', photo: 'dessert.jpg' },
];

export default function Tasting() {
  return <section className="hero featured-hero" id="projects">
    <div className="hero-backdrop" aria-hidden="true"><Image src="/food/made-with-care.jpg" alt="" fill sizes="100vw"/></div>
    <div className="hero-caption"><span>Featured tasting</span><span>Concept imagery</span></div>
    <div className="hero-center" data-reveal>
      <h2>A Night<br/>of Flavor.</h2>
      <p>A curated tasting for family and friends.</p>
      <PhotoStory title="A Night of Flavor" buttonLabel="Explore the event" slides={slides}/>
    </div>
  </section>;
}
