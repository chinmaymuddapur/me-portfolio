import { useEffect, useRef, useState } from 'react';
import CustomCursor from './CustomCursor';
import ParticleField from './ParticleField';
import MorphBlob from './MorphBlob';
import ScrambleText from './ScrambleText';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';
import CountUp from './CountUp';
import useReveal from './useReveal';
import CinematicIntro from './CinematicIntro';
import RotatingSubtitle from './RotatingSubtitle';
import MouseGlow from './MouseGlow';
import ContactForm from './ContactForm';
import FloatingIcons from './FloatingIcons';
import RoboticsBackground from './RoboticsBackground';
import MobileMenu from './MobileMenu';
import './portfolio.css';

/* ─── PERSONAL DATA ─────────────────────────────────── */
const PROJECTS = [
  {
    tag: 'Health Tech',
    title: 'AI Health Monitor',
    desc: 'Real-time pulse and breathing analysis system using MPU6050 sensor, ESP32, and LCD visualization for intelligent health tracking.',
    tech: ['ESP32', 'MPU6050', 'C++', 'Sensors'],
    color: '#5227FF',
  },
  {
    tag: 'Robotics',
    title: 'ESP32 Robot Control',
    desc: 'Wireless robot control system with sensor integration and embedded communication protocols for autonomous navigation.',
    tech: ['ESP32', 'Arduino', 'IoT', 'Embedded'],
    color: '#FF9FFC',
  },
  {
    tag: 'AI Assistant',
    title: 'Jarvis AI System',
    desc: 'Voice-controlled intelligent assistant with automation capabilities and natural interaction patterns inspired by futuristic interfaces.',
    tech: ['AI', 'Voice', 'Automation', 'Python'],
    color: '#B497CF',
  },
  {
    tag: 'Autonomous',
    title: 'SLAM Robotics',
    desc: 'Exploration in simultaneous localization and mapping for autonomous robot navigation and intelligent spatial awareness.',
    tech: ['SLAM', 'Computer Vision', 'Robotics', 'AI'],
    color: '#5227FF',
  },
  {
    tag: 'IoT',
    title: 'Smart Sensor Network',
    desc: 'Distributed sensor system with real-time data processing and intelligent decision-making for smart environments.',
    tech: ['IoT', 'ESP32', 'Sensors', 'Cloud'],
    color: '#FF9FFC',
  },
  {
    tag: 'Innovation',
    title: 'Future Tech Lab',
    desc: 'Experimental prototypes exploring the intersection of AI, robotics, and human-centered design for next-gen experiences.',
    tech: ['R&D', 'Prototyping', 'AI', 'UX'],
    color: '#B497CF',
  },
];

const SKILLS = [
  { name: 'Arduino & ESP32', pct: 95, icon: '⚡' },
  { name: 'Embedded Systems', pct: 92, icon: '🔧' },
  { name: 'Robotics', pct: 90, icon: '🤖' },
  { name: 'C/C++', pct: 88, icon: '💻' },
  { name: 'Sensor Integration', pct: 94, icon: '📡' },
  { name: 'IoT Systems', pct: 87, icon: '🌐' },
  { name: 'Computer Vision', pct: 82, icon: '👁️' },
  { name: 'AI Tools & Workflows', pct: 85, icon: '🧠' },
  { name: 'Wireless Communication', pct: 89, icon: '📶' },
  { name: 'Automation Systems', pct: 91, icon: '⚙️' },
  { name: 'Real-time Monitoring', pct: 88, icon: '📊' },
  { name: 'UI/UX Thinking', pct: 83, icon: '✨' },
];

const TECH_STACK = [
  { name: 'Arduino IDE', category: 'Development', icon: '🔷' },
  { name: 'PlatformIO', category: 'Development', icon: '🔶' },
  { name: 'VS Code', category: 'Development', icon: '💙' },
  { name: 'Git & GitHub', category: 'Version Control', icon: '🔀' },
  { name: 'Python', category: 'AI/ML', icon: '🐍' },
  { name: 'React', category: 'Frontend', icon: '⚛️' },
  { name: 'HTML/CSS/JS', category: 'Web', icon: '🌐' },
  { name: 'C/C++', category: 'Programming', icon: '💻' },
];

const JOURNEY = [
  {
    year: '2022',
    title: 'The Spark',
    desc: 'Discovered the world of robotics and embedded systems. Built first Arduino project and fell in love with making things move.',
  },
  {
    year: '2023',
    title: 'Deep Dive',
    desc: 'Explored ESP32, sensor integration, and wireless communication. Started building intelligent systems that could sense and respond.',
  },
  {
    year: '2024',
    title: 'AI Awakening',
    desc: 'Merged robotics with AI. Experimented with computer vision, voice assistants, and autonomous decision-making systems.',
  },
  {
    year: '2025',
    title: 'Innovation Lab',
    desc: 'Built health monitoring systems, SLAM robots, and futuristic interfaces. Focused on human-centered intelligent technology.',
  },
  {
    year: '2026',
    title: 'Future Vision',
    desc: 'Building towards a future where AI and robotics seamlessly integrate into human life. Exploring startup ideas and next-gen experiences.',
  },
];

/* ─── WORK CARD BG ─────────────────────────────────── */
function ProjectCardBg({ color }) {
  return (
    <div
      className="work-card-bg"
      style={{
        background: `radial-gradient(ellipse at 30% 40%, ${color}55 0%, transparent 65%), linear-gradient(135deg, #0a0618 0%, #05030f 100%)`,
      }}
    />
  );
}

/* ─── GLASSMORPHIC CARD ─────────────────────────────── */
function GlassCard({ children, className = '', delay = 0 }) {
  return (
    <div
      className={`reveal reveal-delay-${delay}`}
      style={{
        background: 'rgba(82,39,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(82,39,255,0.15)',
        borderRadius: '4px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, transform 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,159,252,0.4)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(82,39,255,0.15)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </div>
  );
}

/* ─── SKILL CARD ─────────────────────────────────────── */
function SkillCard({ name, pct, icon }) {
  const ref = useRef(null);
  const fillRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => {
            if (fillRef.current) fillRef.current.style.width = pct + '%';
          }, 100);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={ref} style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.2rem' }}>{icon}</span>
          <span style={{ fontSize: '0.9rem', letterSpacing: '0.05em', fontWeight: 500 }}>{name}</span>
        </div>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.85rem', color: 'var(--pink)' }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: '3px', background: 'rgba(82,39,255,0.15)', position: 'relative', overflow: 'hidden', borderRadius: '2px' }}>
        <div
          ref={fillRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 0,
            background: 'linear-gradient(90deg, var(--purple), var(--pink))',
            transition: 'width 1.4s cubic-bezier(0.16,1,0.3,1)',
            boxShadow: '0 0 12px rgba(255,159,252,0.6)',
          }}
        />
      </div>
    </div>
  );
}

/* ─── TECH BADGE ─────────────────────────────────────── */
function TechBadge({ name, category, icon, delay = 0 }) {
  return (
    <div
      className={`reveal reveal-delay-${delay}`}
      style={{
        background: 'rgba(82,39,255,0.06)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(82,39,255,0.2)',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s',
        cursor: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,159,252,0.5)';
        e.currentTarget.style.background = 'rgba(82,39,255,0.12)';
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,159,252,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(82,39,255,0.2)';
        e.currentTarget.style.background = 'rgba(82,39,255,0.06)';
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <span style={{ fontSize: '2rem' }}>{icon}</span>
      <span style={{ fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: 'var(--white)' }}>{name}</span>
      <span
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(240,238,255,0.4)',
        }}
      >
        {category}
      </span>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────── */
export default function ChinmayPortfolio() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [scrambleTrigger, setScrambleTrigger] = useState(true);
  useReveal();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const triggerScramble = () => {
    setScrambleTrigger(false);
    setTimeout(() => setScrambleTrigger(true), 50);
  };

  return (
    <>
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

      <div className="portfolio">
        <CustomCursor />
        <MouseGlow />
        <FloatingIcons count={window.innerWidth < 768 ? 6 : 12} />
        <RoboticsBackground />

        {/* Grid lines decoration */}
        <div className="grid-lines" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        {/* ── NAV ── */}
        <nav className={`nav ${navScrolled ? 'scrolled' : ''}`}>
          <a href="#" className="nav-logo">
            <span>✦</span> CHINMAY
          </a>
          <ul className="nav-links">
            {['About', 'Projects', 'Skills', 'Journey', 'Contact'].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`}>{l}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" style={{ textDecoration: 'none' }} className="desktop-cta">
            <MagneticButton className="btn-primary" strength={0.4}>
              <span>Get in Touch →</span>
            </MagneticButton>
          </a>
          <MobileMenu />
        </nav>

        {/* ── HERO ── */}
        <section className="hero-section" id="hero">
          <ParticleField count={window.innerWidth < 768 ? 30 : 60} />

          {/* Morphing blob background */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              opacity: 0.1,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <MorphBlob size={800} color1="#5227FF" color2="#FF9FFC" />
          </div>

          <div className="hero-content">
            <p className="hero-eyebrow">Engineering Student — Robotics & AI Enthusiast</p>
            <h1 className="hero-title">
              <span className="line">Building</span>
              <span className="line accent" data-text="Intelligent" onMouseEnter={triggerScramble}>
                <ScrambleText text="Intelligent" trigger={scrambleTrigger} speed={30} />
              </span>
              <span className="line">Systems.</span>
            </h1>
            <p className="hero-sub" style={{ maxWidth: '560px' }}>
              <RotatingSubtitle />
              <br />
              <span style={{ opacity: 0.7, fontSize: '0.95rem' }}>
                Creating futuristic technology experiences through AI, robotics, and embedded systems.
              </span>
            </p>
            <div className="hero-cta">
              <a href="#projects" style={{ textDecoration: 'none' }}>
                <MagneticButton className="btn-primary">
                  <span>View Projects</span>
                </MagneticButton>
              </a>
              <a href="mailto:chinmaymuddapur04@gmail.com" style={{ textDecoration: 'none' }}>
                <MagneticButton className="btn-outline">
                  <span>Get in Touch</span>
                </MagneticButton>
              </a>
            </div>
          </div>

          <div className="scroll-indicator">
            <span>Explore</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="section" id="about">
          <p className="section-label reveal">About Me</p>
          <h2 className="section-title reveal reveal-delay-1">
            Engineering the
            <br />
            <span style={{ color: 'var(--purple)' }}>Future of Tech.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <GlassCard delay={2}>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(240,238,255,0.75)', marginBottom: '20px' }}>
                  I'm <strong style={{ color: 'var(--white)', fontWeight: 600 }}>Chinmay Muddapur</strong>, an ECE
                  undergraduate from Bengaluru passionate about building intelligent systems that bridge the gap between
                  humans and technology.
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(240,238,255,0.75)', marginBottom: '20px' }}>
                  My journey started with a simple Arduino board and evolved into creating{' '}
                  <strong style={{ color: 'var(--pink)' }}>health monitoring systems</strong>,{' '}
                  <strong style={{ color: 'var(--pink)' }}>autonomous robots</strong>, and{' '}
                  <strong style={{ color: 'var(--pink)' }}>AI-powered assistants</strong>. I specialize in ESP32,
                  embedded systems, sensor integration, and wireless communication protocols.
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(240,238,255,0.75)' }}>
                  I believe the future belongs to those who combine{' '}
                  <strong style={{ color: 'var(--lavender)' }}>creativity with engineering</strong> — building not just
                  functional systems, but experiences that feel alive, intelligent, and human-centered. From voice
                  assistants to real-time monitoring systems, I'm exploring the intersection of robotics, AI, and
                  futuristic interfaces.
                </p>
              </GlassCard>

              <div style={{ marginTop: '40px' }}>
                <GlassCard delay={3}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px', color: 'var(--pink)' }}>
                    🎯 Current Focus
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.95rem', lineHeight: 2, color: 'rgba(240,238,255,0.65)' }}>
                    <li>→ Building advanced robotics prototypes with ESP32</li>
                    <li>→ Exploring SLAM and autonomous navigation systems</li>
                    <li>→ Developing AI-powered embedded solutions</li>
                    <li>→ Designing futuristic human-tech interfaces</li>
                    <li>→ Experimenting with voice assistant development</li>
                    <li>→ Learning modern web technologies (React, UI/UX)</li>
                  </ul>
                </GlassCard>
              </div>
            </div>

            <div>
              <div style={{ display: 'grid', gap: '2px' }}>
                {[
                  { num: 25, suffix: '+', label: 'Projects Built' },
                  { num: 5, suffix: '+', label: 'Tech Stacks' },
                  { num: 3, suffix: 'yrs', label: 'Experience' },
                  { num: 100, suffix: '%', label: 'Passion' },
                ].map((s, i) => (
                  <TiltCard key={i} className={`stat-card reveal reveal-delay-${i + 2}`} intensity={6}>
                    <div className="stat-number">
                      <CountUp end={s.num} suffix={s.suffix} duration={2200} />
                    </div>
                    <div className="stat-label">{s.label}</div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section className="section" id="projects">
          <p className="section-label reveal">Featured Work</p>
          <h2 className="section-title reveal reveal-delay-1">
            Projects that
            <br />
            <span style={{ color: 'var(--pink)' }}>push boundaries.</span>
          </h2>
          <div className="work-grid">
            {PROJECTS.map((p, i) => (
              <TiltCard key={i} className={`work-card reveal reveal-delay-${(i % 3) + 1}`} intensity={8}>
                <ProjectCardBg color={p.color} />
                <div className="work-card-arrow">↗</div>
                <div className="work-card-inner">
                  <p className="work-card-tag">{p.tag}</p>
                  <h3 className="work-card-title">{p.title}</h3>
                  <p className="work-card-desc">{p.desc}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '0.65rem',
                          padding: '3px 8px',
                          background: 'rgba(255,159,252,0.1)',
                          border: '1px solid rgba(255,159,252,0.2)',
                          borderRadius: '2px',
                          color: 'var(--pink)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section className="section" id="skills" style={{ paddingTop: 0 }}>
          <p className="section-label reveal">Technical Arsenal</p>
          <h2 className="section-title reveal reveal-delay-1">
            Skills &<br />
            <span style={{ color: 'var(--lavender)' }}>Expertise.</span>
          </h2>
          <GlassCard delay={2}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 60px' }}>
              {SKILLS.map((s, i) => (
                <SkillCard key={i} name={s.name} pct={s.pct} icon={s.icon} />
              ))}
            </div>
          </GlassCard>
        </section>

        {/* ── TECH STACK ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <p className="section-label reveal">Tools & Technologies</p>
          <h2 className="section-title reveal reveal-delay-1">
            Tech
            <br />
            <span style={{ color: 'var(--purple)' }}>Stack.</span>
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
            }}
          >
            {TECH_STACK.map((tech, i) => (
              <TechBadge key={i} name={tech.name} category={tech.category} icon={tech.icon} delay={(i % 4) + 1} />
            ))}
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <p className="section-label reveal">Academic Background</p>
          <h2 className="section-title reveal reveal-delay-1">
            Education &<br />
            <span style={{ color: 'var(--pink)' }}>Learning.</span>
          </h2>
          <TiltCard className="reveal reveal-delay-2" intensity={6}>
            <div
              style={{
                background: 'rgba(82,39,255,0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(82,39,255,0.2)',
                borderRadius: '8px',
                padding: '48px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative corner accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, rgba(82,39,255,0.15), transparent)',
                  borderRadius: '0 0 0 100%',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    background: 'rgba(255,159,252,0.1)',
                    border: '1px solid rgba(255,159,252,0.3)',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--pink)',
                    marginBottom: '20px',
                  }}
                >
                  Undergraduate
                </div>

                <h3
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    marginBottom: '12px',
                    color: 'var(--white)',
                    lineHeight: 1.2,
                  }}
                >
                  Bachelor of Engineering
                </h3>

                <p
                  style={{
                    fontSize: '1.3rem',
                    color: 'var(--lavender)',
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}
                >
                  Electronics & Communication Engineering
                </p>

                <p
                  style={{
                    fontSize: '1rem',
                    color: 'rgba(240,238,255,0.5)',
                    marginBottom: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>📍</span>
                  Bengaluru, India
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    paddingTop: '24px',
                    borderTop: '1px solid rgba(82,39,255,0.2)',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'rgba(240,238,255,0.4)',
                        marginBottom: '8px',
                      }}
                    >
                      Focus Areas
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(240,238,255,0.7)', lineHeight: 1.6 }}>
                      Embedded Systems, Robotics, IoT, AI Integration
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'rgba(240,238,255,0.4)',
                        marginBottom: '8px',
                      }}
                    >
                      Interests
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(240,238,255,0.7)', lineHeight: 1.6 }}>
                      Human-Tech Interaction, Future AI Interfaces
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </section>

        {/* ── JOURNEY ── */}
        <section className="section" id="journey" style={{ paddingTop: 0 }}>
          <p className="section-label reveal">My Path</p>
          <h2 className="section-title reveal reveal-delay-1">
            The
            <br />
            <span style={{ color: 'var(--purple)' }}>Journey.</span>
          </h2>

          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'linear-gradient(to bottom, rgba(82,39,255,0.3), rgba(255,159,252,0.3))',
                transform: 'translateX(-50%)',
              }}
            />

            {JOURNEY.map((j, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: i % 2 === 0 ? '1fr 80px 1fr' : '1fr 80px 1fr',
                  gap: '32px',
                  marginBottom: '60px',
                  alignItems: 'center',
                }}
              >
                {i % 2 === 0 ? (
                  <>
                    <GlassCard>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px', color: 'var(--white)' }}>
                        {j.title}
                      </h3>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(240,238,255,0.6)' }}>{j.desc}</p>
                    </GlassCard>
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          margin: '0 auto',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--purple), var(--pink))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: '#fff',
                          boxShadow: '0 0 30px rgba(255,159,252,0.5)',
                        }}
                      >
                        {j.year}
                      </div>
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          margin: '0 auto',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--pink), var(--lavender))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: '#fff',
                          boxShadow: '0 0 30px rgba(180,151,207,0.5)',
                        }}
                      >
                        {j.year}
                      </div>
                    </div>
                    <GlassCard>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px', color: 'var(--white)' }}>
                        {j.title}
                      </h3>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(240,238,255,0.6)' }}>{j.desc}</p>
                    </GlassCard>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT / CTA ── */}
        <section className="cta-section" id="contact">
          <div className="cta-bg-orb orb1" />
          <div className="cta-bg-orb orb2" />
          <div className="cta-content">
            <h2 className="cta-title reveal">
              <span className="outline-text">Let's Build</span>
              <br />
              The Future.
            </h2>
            <p className="cta-sub reveal reveal-delay-1">
              Open to collaborations, projects, and conversations about robotics, AI, and futuristic tech.
            </p>

            <div className="hero-cta reveal reveal-delay-2" style={{ justifyContent: 'center', marginBottom: '60px' }}>
              <a href="mailto:chinmaymuddapur04@gmail.com" style={{ textDecoration: 'none' }}>
                <MagneticButton className="btn-outline">
                  <span>chinmaymuddapur04@gmail.com</span>
                </MagneticButton>
              </a>
            </div>

            {/* Contact Form */}
            <div className="reveal reveal-delay-3" style={{ marginBottom: '48px' }}>
              <ContactForm />
            </div>

            {/* Social Links */}
            <div
              className="reveal reveal-delay-4"
              style={{ display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
            >
              {[
                { name: 'GitHub', icon: '⚡', url: 'https://github.com/chinmaymuddapur' },
                { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/chinmay-muddapur-441a3a320?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
                { name: 'Instagram', icon: '📸', url: 'https://www.instagram.com/chinmaymuddapur04?igsh=MWVwN3J5d2NpbjA4MA==' },
                { name: 'Email', icon: '✉️', url: 'mailto:chinmaymuddapur04@gmail.com' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('http') ? '_blank' : '_self'}
                  rel={social.url.startsWith('http') ? 'noopener noreferrer' : ''}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: 'rgba(82,39,255,0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(82,39,255,0.2)',
                    borderRadius: '4px',
                    color: 'rgba(240,238,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,159,252,0.5)';
                    e.currentTarget.style.background = 'rgba(82,39,255,0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(82,39,255,0.2)';
                    e.currentTarget.style.background = 'rgba(82,39,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{social.icon}</span>
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div>
            <span className="footer-copy">© 2025 Chinmay Muddapur — Crafted with passion</span>
            <p style={{ fontSize: '0.7rem', color: 'rgba(240,238,255,0.2)', marginTop: '8px', fontFamily: 'Space Mono, monospace' }}>
              Robotics Developer • AI Enthusiast • ECE Undergrad
            </p>
          </div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="https://github.com/chinmaymuddapur" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/chinmay-muddapur-441a3a320?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/chinmaymuddapur04?igsh=MWVwN3J5d2NpbjA4MA==" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </footer>
      </div>
    </>
  );
}
