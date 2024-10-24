import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isRegional, setIsRegional] = useState(() => {
    const savedState = localStorage.getItem('isRegional');
    return savedState ? JSON.parse(savedState) : false;
  });

  const toggleLanguage = () => {
    const newIsRegional = !isRegional;
    setIsRegional(newIsRegional);
    localStorage.setItem('isRegional', JSON.stringify(newIsRegional));
  };

  return (
    <LanguageContext.Provider value={{ isRegional, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
