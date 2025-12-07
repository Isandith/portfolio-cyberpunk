import { useState, useEffect } from 'react';

const useScrambleText = (text: string, speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let interval: number;
    let iterations = 0;
    interval = window.setInterval(() => {
      setDisplayedText(prev =>
        text.split("").map((letter, index) => {
          if (index < iterations) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};

export default useScrambleText;
