import { useState } from 'react';

export default function ContactForm() {
  const [focused, setFocused] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Message sent! (Demo only)');
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '14px 18px',
    background: 'rgba(82,39,255,0.05)',
    border: `1px solid ${focused === field ? 'rgba(255,159,252,0.5)' : 'rgba(82,39,255,0.2)'}`,
    borderRadius: '4px',
    color: 'var(--white)',
    fontSize: '0.95rem',
    fontFamily: 'Space Grotesk, sans-serif',
    outline: 'none',
    transition: 'all 0.3s',
    backdropFilter: 'blur(10px)',
    boxShadow: focused === field ? '0 0 20px rgba(255,159,252,0.15)' : 'none',
  });

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'rgba(82,39,255,0.03)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(82,39,255,0.15)',
        borderRadius: '8px',
        padding: '48px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '0.85rem',
            letterSpacing: '0.05em',
            color: 'rgba(240,238,255,0.7)',
            textTransform: 'uppercase',
          }}
        >
          Your Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused(null)}
          style={inputStyle('name')}
          placeholder="John Doe"
          required
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '0.85rem',
            letterSpacing: '0.05em',
            color: 'rgba(240,238,255,0.7)',
            textTransform: 'uppercase',
          }}
        >
          Email Address
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
          style={inputStyle('email')}
          placeholder="john@example.com"
          required
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '0.85rem',
            letterSpacing: '0.05em',
            color: 'rgba(240,238,255,0.7)',
            textTransform: 'uppercase',
          }}
        >
          Message
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          style={{
            ...inputStyle('message'),
            minHeight: '140px',
            resize: 'vertical',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
          placeholder="Tell me about your project or idea..."
          required
        />
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(135deg, var(--purple), var(--pink))',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          fontSize: '0.95rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          cursor: 'none',
          transition: 'all 0.3s',
          boxShadow: '0 4px 20px rgba(255,159,252,0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 30px rgba(255,159,252,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,159,252,0.3)';
        }}
      >
        Send Message →
      </button>
    </form>
  );
}
