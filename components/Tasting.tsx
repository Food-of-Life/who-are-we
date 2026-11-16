import Image from 'next/image';
import PhotoStory from './PhotoStory';

const slides = [
  { title: 'A toast together', text: 'A moment shared over dinner.', photo: '39', alt: 'Two guests clinking glasses' },
  { title: 'Food to share', text: 'A dish finished with fresh herbs.', photo: '34', alt: 'Herb-garnished food in a gold serving dish' },
  { title: 'Familiar flavors', text: 'A golden baked dish from the tasting.', photo: '35', alt: 'A golden baked dish beside white flowers' },
  { title: 'A glass raised', text: '', photo: '37', alt: 'A guest raising a glass beside the buffet' },
  { title: 'Between bites', text: '', photo: '38', alt: 'Guests chatting in the lounge' },
  { title: 'Around one table', text: '', photo: '40', alt: 'Two guests smiling over dinner plates' },
  { title: 'An evening with friends', text: '', photo: '42', alt: 'Guests with plates near the seating area' },
  { title: 'One more photo', text: '', photo: '44', alt: 'Six guests posing together' },
].map(slide => ({ ...slide, photo: 'night-of-flavor/' + slide.photo + '.jpg' }));

const eventMetrics = [
  { value: 30, label: 'Guests attended' },
  { value: 7, label: 'Dishes created' },
  { value: 5, label: 'Dishes served' },
  { value: 2, label: 'Appetizers' },
];

export default function Tasting() {
  return <section className="hero featured-hero" id="projects">
    <div className="hero-backdrop" aria-hidden="true"><Image src="/food/night-of-flavor/40.jpg" alt="" fill sizes="100vw"/></div>
    <div className="hero-caption"><span>Featured tasting</span><span>{slides.length} event photos</span></div>
    <div className="hero-center" data-reveal>
      <h2>A Night<br/>of Flavor.</h2>
      <p>A private, invitation-only tasting for family and friends.</p>
      <dl className="tasting-metrics" aria-label="Event metrics">
        {eventMetrics.map(({ value, label }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <PhotoStory title="A Night of Flavor" buttonLabel="Explore the event" slides={slides} conceptImagery={false}/>
    </div>
  </section>;
}
