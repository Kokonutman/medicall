import React, { useState, useEffect } from 'react';

const prompts = [
  "What are the symptoms of seasonal allergies?",
  "How can I manage my diabetes better?",
  "What should I do for a persistent cough?",
  "Can you explain my blood test results?",
  "What are the side effects of my medication?",
  "How often should I get a health checkup?",
  "What's the best treatment for insomnia?",
  "How can I lower my blood pressure naturally?"
];

export default function PromptTextBox() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPrompt = prompts[currentPromptIndex];
    
    if (isTyping) {
      // Typing forward
      if (charIndex < currentPrompt.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentPrompt.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 50); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, wait 3 seconds
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
        return () => clearTimeout(timeout);
      }
    } else {
      // Typing backward (erasing)
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentPrompt.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 30); // Erasing speed (faster than typing)
        return () => clearTimeout(timeout);
      } else {
        // Finished erasing, move to next prompt
        setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % prompts.length);
        setIsTyping(true);
      }
    }
  }, [currentPromptIndex, charIndex, isTyping]);

  return (
    <div 
      className="mx-4 mt-4 p-4 rounded-lg pointer-events-none select-none min-h-[60px] flex items-center"
      style={{ backgroundColor: '#081221' }}
    >
      <div className="w-full">
        <p className="text-gray-400 text-lg leading-relaxed">
          {displayedText}
        </p>
      </div>
    </div>
  );
}