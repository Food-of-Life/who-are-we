import Image from 'next/image';
import Motion from '../components/Motion';
import Tasting from '../components/Tasting';
import PhotoStory from '../components/PhotoStory';
import Contact from '../components/Contact';

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE;

const missionSlides = [
  { title: 'A new connection', text: 'We want to bring people together over dinner because passing a plate is an easy way to start a conversation. A question about what’s on the table can lead to a story about what’s going on in someone’s life. Sometimes, hearing how another person got through something gives you a different way to think about what you’re going through yourself.', photo: 'made-with-care.jpg' },
  { title: 'Discover something about yourself', text: 'Some dishes carry memories we rarely talk about. A bite might remind you of a kitchen you haven’t been in for years. Then someone across the table tells you what that same dish meant in their home. We hope you hear a different story, share a little of yours if you feel like it, and by the end of dinner there’s something new to remember about that flavor: who you shared it with tonight.', photo: 'shared-plates.jpg' },
  { title: 'What you carry home', text: 'When someone pulls up another chair and passes you a plate, you know there’s room for you. We want that feeling to stay with you long after the last bite. We hope you carry it to the next table you sit at, and remember how much it can mean to make room for someone else.', photo: 'dessert.jpg' },
];

export default function Home() {
  const formEnabled = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM && process.env.CONTACT_TO);
  return <>
    <Motion/>
    <header className="bar">
      <a className="monogram" href="#home" aria-label="Food of Life home">FoL.</a>
      <button className="menu-toggle" type="button" aria-controls="main-nav" aria-expanded="false">Menu</button>
      <nav id="main-nav" aria-label="Main navigation">
        <a href="#about">Mission</a><a href="#host">The host</a><a href="#projects">Projects</a><a href="#contact">Partnerships</a>
      </nav>
    </header>
    <main>
      <section className="hero" id="home">
        <div className="hero-backdrop" aria-hidden="true"><Image src="/food/made-with-care.jpg" alt="" fill sizes="100vw" preload/></div>
        <div className="hero-caption"><span>Baltimore, Maryland</span><span>Culinary events</span></div>
        <div className="hero-center">
          <span className="star" aria-hidden="true">✳</span>
          <h1><span>Food</span><span>of Life.</span></h1>
          <p>Intimate dinners built around familiar food, new flavors, and the stories we share.</p>
        </div>
        <div className="hero-bottom"><a href="#about">Our mission <span className="arrow arrow-down" aria-hidden="true"/></a><a href="#contact">Partner with us <span className="arrow arrow-diagonal" aria-hidden="true"/></a></div>
      </section>
      <section className="mission-feature" id="about">
        <p className="label">Our mission</p>
        <div className="mission-statement">
          <h2><span>Who</span>{' '}<span>are we?</span></h2>
          <p>We bring people from all walks of life to the same table. A dish that carries a difficult memory can take on new meaning when you share it with someone new. Over dinner, strangers can become friends, and a familiar flavor can become part of a memory you’ll want to keep.</p>
          <PhotoStory title="Our mission" buttonLabel="Learn more" slides={missionSlides}/>
        </div>
      </section>
      <section className="editorial text-panel host-panel" id="host">
        <p className="label">The host</p>
        <div className="host-copy" data-reveal><h2>Who am I?</h2><p>I’m Jesse, a chef and host in Baltimore. I love to cook, but I love bringing people together even more. I believe life is meant to be shared. It can be hard to say what we’ve been carrying, but over the right meal, with someone willing to listen, a little light can reach the parts of ourselves we usually keep tucked away.</p></div>
        <div className="host-portrait" data-reveal>
          <Image src="/food/jesse-headshot.jpg" alt="Jesse, chef and host of Food of Life" fill sizes="(max-width: 680px) 240px, 360px"/>
        </div>
      </section>
      <Tasting/>
      <section className="contact" id="contact">
        <p className="label">Brand partnerships</p>
        <h2 data-reveal>Let’s set<br/>the table.</h2>
        <p>Partner with us on the next dinner.</p>
        <a className="deck-button" href="/food/partnership-preview.pdf">
          <span className="arrow arrow-diagonal" aria-hidden="true"/>
          <span>View Made With Care deck</span>
        </a>
        <address className="sponsor-details">
          <span>Email {email && <a href={'mailto:' + email}>{email}</a>}</span>
          <span>Phone {phone && <a href={'tel:' + phone.replace(/[^+0-9]/g, '')}>{phone}</a>}</span>
        </address>
        <Contact enabled={formEnabled}/>
      </section>
    </main>
    <footer><span>Food of Life · Baltimore, MD</span><a href="#home">Back to top <span className="arrow arrow-up" aria-hidden="true"/></a></footer>
  </>;
}
