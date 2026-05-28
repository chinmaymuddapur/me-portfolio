import { useEffect, useRef, useState } from 'react';
import CustomCursor from './CustomCursor';
import ParticleField from './ParticleField';
import MorphBlob from './MorphBlob';
import ScrambleText from './ScrambleText';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';
import CountUp from './CountUp';
import useReveal from './useReveal';
import './portfolio.css';

/* ─── DATA ─────────────────────────────────── */
const WORKS = [
  { tag: 'Brand Identity', title: 'Nexus Studio', desc: 'Full visual identity system for a Web3 creative collective.', color: '#5227FF' },
  { tag: 'Web Design', title: 'Aura Finance', desc: 'Motion-first dashboard for a DeFi analytics platform.', color: '#FF9FFC' },
  { tag: 'Motion', title: 'Orbit Agency', desc: '3D brand film and interactive microsite launch.', color: '#B497CF' },
  { tag: 'Product', title: 'Pulse Health', desc: 'End-to-end UX for a next-gen health tracking app.', color: '#5227FF' },
  { tag: 'Web3', title: 'Void NFT', desc: 'Generative art platform with real-time minting experience.', color: '#FF9FFC' },
  { tag: 'Campaign', title: 'Echo Records', desc: 'Immersive album launch with spatial audio web experience.', color: '#B497CF' },
];

const SERVICES = [
  { num: '01', name: 'Brand Identity', tags: ['Strategy', 'Visual', 'Motion'] },
  { num: '02', name: 'Web Experiences', tags: ['Design', 'Dev', '3D'] },
  { num: '03', name: 'Motion Design', tags: ['Film', 'UI', 'Generative'] },
  { num: '04', name: 'Product Design', tags: ['UX', 'Research', 'Systems'] },
  { num: '05', name: 'Creative Direction', tags: ['Art Dir', 'Concept', 'Campaign'] },
];

const SKILLS = [
  { name: 'Creative Direction', pct: 97 },
  { name: 'Motion Design', pct: 94 },
  { name: 'Web Development', pct: 91 },
  { name: 'Brand Strategy', pct: 88 },
  { name: '3D & Spatial', pct: 85 },
  { name: 'UI/UX Design', pct: 96 },
];

const PROCESS = [
  { num: '01', title: 'Discover', text: 'Deep-dive into your world. We map your audience, competitors, and the white space only you can own.', icon: '🔭' },
  { num: '02', title: 'Conceive', text: 'Wild ideas, ruthlessly filtered. We generate 100 directions and keep the one that makes you nervous.', icon: '⚡' },
  { num: '03', title: 'Craft', text: 'Pixel-perfect execution with obsessive attention to motion, hierarchy, and feel.', icon: '✦' },
  { num: '04', title: 'Launch', text: 'We ship fast, measure everything, and iterate until the numbers match the vision.', icon: '🚀' },
];

const TESTIMONIALS = [
  { quote: 'They didn\'t just design our brand — they built our entire visual universe. Unreal output.', name: 'Zara Okonkwo', role: 'CEO, Nexus Studio', initials: 'ZO' },
  { quote: 'The most forward-thinking creative team I\'ve worked with. Every pixel has a reason.', name: 'Marcus Chen', role: 'Founder, Aura Finance', initials: 'MC' },
  { quote: 'Delivered a website that made our investors stop mid-sentence. That\'s the power of this team.', name: 'Priya Sharma', role: 'CPO, Pulse Health', initials: 'PS' },
];

const MARQUEE_ITEMS = ['Brand Identity', 'Motion Design', 'Web Experiences', 'Creative Direction', '3D & Spatial', 'Product Design', 'Brand Identity', 'Motion Design', 'Web Experiences', 'Creative Direction', '3D & Spatial', 'Product Design'];

/* ─── WORK CARD BG (canvas gradient) ─────── */
function WorkCardBg({ color }) {
  return (
    <div
      className="work-card-bg"
      style={{
        background: `radial-gradient(ellipse at 30% 40%, ${color}55 0%, transparent 65%), linear-gradient(135deg, #0a0618 0%, #05030f 100%)`,
      }}
    />
  );
}

/* ─── FLOATING BADGE ─────────────────────── */
function FloatingBadge() {
  return (
    <div className="floating-badge">
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" stroke="rgba(255,159,252,0.25)" strokeWidth="1" />
        <circle cx="60" cy="60" r="46" stroke="rgba(82,39,255,0.3)" strokeWidth="0.5" />
        <path
          id="textCircle"
          d="M 60,60 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          fill="none"
        />
        <text fontSize="9" fill="rgba(240,238,255,0.5)" letterSpacing="3.5" fontFamily="Space Mono, monospace">
          <textPath href="#textCircle">AVAILABLE FOR WORK • 2025 • OPEN TO COLLAB •</textPath>
        </text>
        <circle cx="60" cy="60" r="8" fill="#5227FF" />
        <circle cx="60" cy="60" r="4" fill="#FF9FFC" />
      </svg>
    </div>
  );
}

/* ─── SKILL BARS ─────────────────────────── */
function SkillBar({ name, pct }) {
  const ref = useRef(null);
  const fillRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => {
          if (fillRef.current) fillRef.current.style.width = pct + '%';
        }, 100);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" ref={fillRef} />
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────── */
export default function Portfolio() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [scrambleTrigger, setScrambleTrigger] = useState(true);
  useReveal();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Re-trigger scramble on hover
  const triggerScramble = () => {
    setScrambleTrigger(false);
    setTimeout(() => setScrambleTrigger(true), 50);
  };

  return (
    <div className="portfolio">
      <CustomCursor />

      {/* Grid lines decoration */}
      <div className="grid-lines" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => <span key={i} />)}
      </div>

      {/* ── NAV ── */}
      <nav className={`nav ${navScrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo">
          <span>✦</span> VOID.STUDIO
        </a>
        <ul className="nav-links">
          {['Work', 'Services', 'About', 'Process', 'Contact'].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <MagneticButton className="btn-primary" strength={0.4}>
          <span>Let's Talk →</span>
        </MagneticButton>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section" id="hero">
        <ParticleField count={70} />

        {/* Morphing blob background */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.12, pointerEvents: 'none', zIndex: 0 }}>
          <MorphBlob size={700} color1="#5227FF" color2="#FF9FFC" />
        </div>

        <FloatingBadge />

        <div className="hero-content">
          <p className="hero-eyebrow">Creative Agency — Est. 2025</p>
          <h1 className="hero-title">
            <span className="line">We Build</span>
            <span className="line accent" data-text="Godly" onMouseEnter={triggerScramble}>
              <ScrambleText text="Godly" trigger={scrambleTrigger} speed={35} />
            </span>
            <span className="line">Brands.</span>
          </h1>
          <p className="hero-sub">
            A boutique creative studio obsessed with the intersection of art, technology, and culture.
          </p>
          <div className="hero-cta">
            <MagneticButton className="btn-primary">
              <span>View Our Work</span>
            </MagneticButton>
            <MagneticButton className="btn-outline">
              <span>Our Process</span>
            </MagneticButton>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span className="marquee-item" key={i}>
              <span className="dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── WORK ── */}
      <section className="section" id="work">
        <p className="section-label reveal">Selected Work</p>
        <h2 className="section-title reveal reveal-delay-1">
          Projects that<br />
          <span style={{ color: 'var(--purple)' }}>move people.</span>
        </h2>
        <div className="work-grid">
          {WORKS.map((w, i) => (
            <TiltCard key={i} className={`work-card reveal reveal-delay-${(i % 3) + 1}`} intensity={8}>
              <WorkCardBg color={w.color} />
              <div className="work-card-arrow">↗</div>
              <div className="work-card-inner">
                <p className="work-card-tag">{w.tag}</p>
                <h3 className="work-card-title">{w.title}</h3>
                <p className="work-card-desc">{w.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" id="services" style={{ paddingTop: 0 }}>
        <p className="section-label reveal">What We Do</p>
        <h2 className="section-title reveal reveal-delay-1">
          Our<br />
          <span style={{ color: 'var(--pink)' }}>Capabilities.</span>
        </h2>
        <div className="services-list">
          {SERVICES.map((s, i) => (
            <div className={`service-item reveal reveal-delay-${i + 1}`} key={i}>
              <span className="service-num">{s.num}</span>
              <span className="service-name">{s.name}</span>
              <div className="service-tags">
                {s.tags.map(t => <span className="service-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT / STATS ── */}
      <section className="section" id="about">
        <div className="about-grid">
          <div className="about-text">
            <p className="section-label reveal">About the Studio</p>
            <h2 className="section-title reveal reveal-delay-1" style={{ marginBottom: 32 }}>
              We don't<br />
              <span style={{ color: 'var(--lavender)' }}>follow trends.</span>
            </h2>
            <p className="reveal reveal-delay-2">
              <strong>VOID.STUDIO</strong> is a boutique creative agency built for brands that refuse to be ordinary. We combine strategic thinking with obsessive craft to create identities, experiences, and campaigns that actually matter.
            </p>
            <p className="reveal reveal-delay-3">
              Every project starts with a single question: <strong>what would make this impossible to ignore?</strong> Then we build backwards from there.
            </p>
          </div>
          <div className="about-stats">
            {[
              { num: 120, suffix: '+', label: 'Projects Shipped' },
              { num: 98, suffix: '%', label: 'Client Retention' },
              { num: 40, suffix: '+', label: 'Awards Won' },
              { num: 5, suffix: 'yrs', label: 'In the Game' },
            ].map((s, i) => (
              <TiltCard key={i} className={`stat-card reveal reveal-delay-${i + 1}`} intensity={6}>
                <div className="stat-number">
                  <CountUp end={s.num} suffix={s.suffix} />
                </div>
                <div className="stat-label">{s.label}</div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-label reveal">Expertise</p>
        <h2 className="section-title reveal reveal-delay-1">
          Skills &<br />
          <span style={{ color: 'var(--purple)' }}>Mastery.</span>
        </h2>
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <SkillBar key={i} name={s.name} pct={s.pct} />
          ))}
        </div>
      </section>

      {/* ── PROCESS (horizontal scroll) ── */}
      <section className="hscroll-section" id="process">
        <div className="hscroll-label">
          <p className="section-label reveal">How We Work</p>
          <h2 className="section-title reveal reveal-delay-1">
            The<br />
            <span style={{ color: 'var(--pink)' }}>Process.</span>
          </h2>
        </div>
        <div className="hscroll-track">
          {PROCESS.map((p, i) => (
            <TiltCard key={i} className="hscroll-card" intensity={6}>
              <div className="hscroll-card-num">{p.num}</div>
              <h3 className="hscroll-card-title">{p.title}</h3>
              <p className="hscroll-card-text">{p.text}</p>
              <div className="hscroll-card-icon">{p.icon}</div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" id="testimonials">
        <p className="section-label reveal">Social Proof</p>
        <h2 className="section-title reveal reveal-delay-1">
          What clients<br />
          <span style={{ color: 'var(--lavender)' }}>actually say.</span>
        </h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <TiltCard key={i} className={`testimonial-card reveal reveal-delay-${i + 1}`} intensity={5}>
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{t.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" id="contact">
        <div className="cta-bg-orb orb1" />
        <div className="cta-bg-orb orb2" />
        <div className="cta-content">
          <h2 className="cta-title reveal">
            <span className="outline-text">Ready to</span><br />
            Go Godly?
          </h2>
          <p className="cta-sub reveal reveal-delay-1">
            We take on 3 new clients per quarter. Spots are limited — let's see if we're a fit.
          </p>
          <div className="hero-cta reveal reveal-delay-2" style={{ justifyContent: 'center' }}>
            <MagneticButton className="btn-primary" strength={0.5}>
              <span>Start a Project →</span>
            </MagneticButton>
            <MagneticButton className="btn-outline">
              <span>hello@void.studio</span>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="footer-copy">© 2025 VOID.STUDIO — All rights reserved</span>
        <div className="footer-links">
          {['Twitter', 'Instagram', 'Dribbble', 'LinkedIn'].map(l => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
