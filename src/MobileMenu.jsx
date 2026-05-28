import { useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = ['About', 'Projects', 'Skills', 'Journey', 'Contact'];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        style={{
          display: 'none',
          position: 'relative',
          width: '40px',
          height: '40px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1001,
        }}
        className="mobile-menu-btn"
        aria-label="Toggle menu"
      >
        <span
          style={{
            position: 'absolute',
            width: '24px',
            height: '2px',
            background: 'var(--white)',
            left: '50%',
            transform: `translateX(-50%) ${isOpen ? 'rotate(45deg)' : 'translateY(-8px)'}`,
            transition: 'all 0.3s',
            top: '50%',
          }}
        />
        <span
          style={{
            position: 'absolute',
            width: '24px',
            height: '2px',
            background: 'var(--white)',
            left: '50%',
            transform: 'translateX(-50%)',
            transition: 'all 0.3s',
            opacity: isOpen ? 0 : 1,
            top: '50%',
          }}
        />
        <span
          style={{
            position: 'absolute',
            width: '24px',
            height: '2px',
            background: 'var(--white)',
            left: '50%',
            transform: `translateX(-50%) ${isOpen ? 'rotate(-45deg)' : 'translateY(8px)'}`,
            transition: 'all 0.3s',
            top: '50%',
          }}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5,3,15,0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.3s',
        }}
      >
        {menuItems.map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setIsOpen(false)}
            style={{
              fontSize: '1.8rem',
              fontWeight: 600,
              color: 'var(--white)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ${i * 0.1}s`,
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--pink)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--white)';
            }}
          >
            {item}
          </a>
        ))}

        {/* Contact Button in Menu */}
        <a
          href="mailto:chinmaymuddapur04@gmail.com"
          onClick={() => setIsOpen(false)}
          style={{
            marginTop: '20px',
            padding: '14px 32px',
            background: 'linear-gradient(135deg, var(--purple), var(--pink))',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '0.95rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textDecoration: 'none',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.4s 0.5s',
          }}
        >
          Get in Touch →
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
