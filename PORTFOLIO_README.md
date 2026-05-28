# Chinmay Muddapur - Premium Futuristic Portfolio

A cinematic, premium portfolio website showcasing robotics, AI, and embedded systems expertise.

## 🎨 Design Philosophy

**"Tony Stark meets minimalist futuristic engineering"**

- Premium glassmorphism effects
- Cinematic animations
- Smooth scroll interactions
- Magnetic hover physics
- Particle constellation backgrounds
- Morphing blob animations
- Custom cursor with glow tracking

## ✨ Key Features

### 🎬 Cinematic Intro Animation
- Gas cloud particles with swirl physics
- Holographic energy effects
- Smooth 3.5s intro sequence
- Dissolves into hero section

### 🎯 Interactive Elements
- **Magnetic Buttons** - Follow cursor with spring physics
- **3D Tilt Cards** - Perspective tilt with specular shine
- **Scramble Text** - Hero title scrambles on hover
- **Rotating Subtitle** - Cycles through 5 role descriptions
- **Mouse Glow** - Ambient light follows cursor
- **Particle Field** - 60 connected particles with mouse repulsion

### 📱 Sections

1. **Hero** - Cinematic landing with animated background
2. **About** - Personal story with glassmorphic cards
3. **Projects** - 6 featured projects with tech stacks
4. **Skills** - 10 animated skill bars with icons
5. **Journey** - Interactive timeline (2021-2025)
6. **Contact** - Premium glassmorphic form + social links

## 🛠️ Tech Stack

- **React 19** - Latest React features
- **Vite** - Lightning-fast dev server
- **Three.js** - 3D morphing blob
- **Canvas API** - Particle systems & intro animation
- **CSS3** - Advanced animations & glassmorphism
- **Space Grotesk & Space Mono** - Premium typography

## 🎨 Color Palette

```css
--purple: #5227FF    /* Primary brand */
--pink: #FF9FFC      /* Accent highlights */
--lavender: #B497CF  /* Secondary accent */
--white: #f0eeff     /* Text */
--dark: #05030f      /* Background */
```

## 🚀 Performance

- Smooth 60fps animations
- Optimized particle systems
- Lazy-loaded components
- Responsive across all devices
- Reduced motion support
- Mobile-optimized (custom cursor disabled on touch)

## 📐 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🎭 Animation Timing

- Intro: 3.5s
- Scroll reveals: 0.8s cubic-bezier
- Hover transitions: 0.3s
- Skill bars: 1.4s ease-out
- Count-up: 2.2s

## 🔧 Customization

### Update Personal Info
Edit `ChinmayPortfolio.jsx`:
- `PROJECTS` array - Add/edit projects
- `SKILLS` array - Modify skills & percentages
- `JOURNEY` array - Update timeline events

### Change Colors
Edit `index.css` CSS variables:
```css
:root {
  --purple: #5227FF;
  --pink: #FF9FFC;
  --lavender: #B497CF;
}
```

### Adjust Animations
- Intro duration: `CinematicIntro.jsx` → `DURATION`
- Particle count: `<ParticleField count={60} />`
- Blob size: `<MorphBlob size={800} />`

## 📦 Components

- `CinematicIntro.jsx` - Gas particle intro animation
- `CustomCursor.jsx` - Magnetic cursor system
- `ParticleField.jsx` - Connected particle constellation
- `MorphBlob.jsx` - Organic shape-shifting background
- `ScrambleText.jsx` - Text scramble effect
- `MagneticButton.jsx` - Magnetic hover physics
- `TiltCard.jsx` - 3D perspective tilt
- `CountUp.jsx` - Animated number counter
- `RotatingSubtitle.jsx` - Role rotation animation
- `MouseGlow.jsx` - Ambient cursor glow
- `ContactForm.jsx` - Glassmorphic contact form

## 🎯 Best Practices

✅ Keep existing color palette
✅ Maintain animation timing consistency
✅ Test on mobile devices
✅ Optimize images before adding
✅ Use semantic HTML
✅ Ensure accessibility (ARIA labels)

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

Personal portfolio - All rights reserved © 2025 Chinmay Muddapur

---

**Built with passion for robotics, AI, and futuristic technology.**
