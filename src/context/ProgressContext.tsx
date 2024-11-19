import React, { createContext, useContext, useState } from 'react';

type ProgressContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <ProgressContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}; 