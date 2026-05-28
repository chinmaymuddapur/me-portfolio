import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

export default function ScrambleText({ text, trigger = true, speed = 40, className = '' }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    clearInterval(frameRef.current);
    frameRef.current = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      if (iteration >= text.length) clearInterval(frameRef.current);
      iteration += 0.5;
    }, speed);
    return () => clearInterval(frameRef.current);
  }, [text, trigger, speed]);

  return <span className={`scramble ${className}`}>{display}</span>;
}
