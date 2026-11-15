import Image from 'next/image';
import Motion from '../components/Motion';
import Tasting from '../components/Tasting';
import Contact from '../components/Contact';

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE;

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
        <div className="hero-caption"><span>Baltimore, Maryland</span><span>Independent culinary events</span></div>
        <div className="hero-center">
          <span className="star" aria-hidden="true">✳</span>
          <h1><span>Food</span><span>of Life.</span></h1>
          <p>Intimate dinners built around familiar food, new flavors, and the stories we share.</p>
        </div>
        <div className="hero-bottom"><a href="#about">Our mission ↓</a><a href="#contact">Partner with us ↗</a></div>
      </section>
      <section className="editorial text-panel" id="about">
        <p className="label">Our mission</p>
        <div data-reveal><h2>Who are we?</h2><p>We host intimate dinners in Baltimore that bring friends and strangers together over familiar dishes and new flavors.</p></div>
      </section>
      <section className="editorial text-panel" id="host">
        <p className="label">The host</p>
        <div data-reveal><h2>Who am I?</h2><p>I’m Jesse, a Baltimore cook and host. I build menus around the dishes and stories that bring people together.</p></div>
      </section>
      <Tasting/>
      <section className="contact" id="contact">
        <p className="label">Brand partnerships</p>
        <h2 data-reveal>Let’s set<br/>the table.</h2>
        <p>Partner with us on the next dinner.</p>
        <a className="deck-button" href="/food/partnership-preview.pdf">
          <span aria-hidden="true">↗</span>
          <span>View Made With Care deck</span>
        </a>
        {(email || phone) && <address className="sponsor-details">
          {email && <a href={'mailto:' + email}>{email}</a>}
          {phone && <a href={'tel:' + phone.replace(/[^+0-9]/g, '')}>{phone}</a>}
        </address>}
        <Contact enabled={formEnabled}/>
      </section>
    </main>
    <footer><span>Food of Life · Baltimore, MD</span><a href="#home">Back to top ↑</a></footer>
  </>;
}
