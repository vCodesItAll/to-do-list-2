import { useState, useEffect } from 'react';
export default function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
  
    useEffect(() => {
      const body = document.body;
      const cardHeaders = document.querySelectorAll(".card-header");
      if (isDarkMode) {
        body.classList.add("dark-mode");
        cardHeaders.forEach((header) => {
          header.classList.add("bg-dark", "text-white");
        });
      } else {
        body.classList.remove("dark-mode");
        cardHeaders.forEach((header) => {
          header.classList.remove("bg-dark", "text-white");
        });
      }
    }, [isDarkMode]);
  
    return (
      <button id="dark-mode-toggle" className={darkMode ? 'dark-mode' : 'light-mode'} onClick={onClick}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    );
  }