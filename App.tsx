
import React, { useState, useEffect, useCallback } from 'react';
import { CALCULATORS } from './constants';
import { CalculatorType } from './types';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import BasicCalculator from './components/calculators/BasicCalculator';
import ScientificCalculator from './components/calculators/ScientificCalculator';
import LoanCalculator from './components/calculators/LoanCalculator';
import SimpleInterestCalculator from './components/calculators/SimpleInterestCalculator';
import CompoundInterestCalculator from './components/calculators/CompoundInterestCalculator';
import AgeCalculator from './components/calculators/AgeCalculator';
import BmiCalculator from './components/calculators/BmiCalculator';
import CurrencyConverter from './components/calculators/CurrencyConverter';
import UnitConverter from './components/calculators/UnitConverter';
import DiscountCalculator from './components/calculators/DiscountCalculator';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(() => {
    const savedCalc = localStorage.getItem('activeCalculator');
    return (savedCalc as CalculatorType) || CalculatorType.BASIC;
  });
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem('activeCalculator', activeCalculator);
  }, [activeCalculator]);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate initial load
    return () => clearTimeout(timer);
  }, [activeCalculator]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const handleSetCalculator = useCallback((calc: CalculatorType) => {
    setIsLoading(true);
    setActiveCalculator(calc);
    setSidebarOpen(false); // Close sidebar on selection
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case CalculatorType.BASIC: return <BasicCalculator />;
      case CalculatorType.SCIENTIFIC: return <ScientificCalculator />;
      case CalculatorType.LOAN: return <LoanCalculator />;
      case CalculatorType.SIMPLE_INTEREST: return <SimpleInterestCalculator />;
      case CalculatorType.COMPOUND_INTEREST: return <CompoundInterestCalculator />;
      case CalculatorType.AGE: return <AgeCalculator />;
      case CalculatorType.BMI: return <BmiCalculator />;
      case CalculatorType.CURRENCY: return <CurrencyConverter />;
      case CalculatorType.UNIT: return <UnitConverter />;
      case CalculatorType.DISCOUNT: return <DiscountCalculator />;
      default: return <BasicCalculator />;
    }
  };

  const activeCalculatorName = CALCULATORS.find(c => c.id === activeCalculator)?.name || 'Calculator';

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Sidebar 
        activeCalculator={activeCalculator} 
        setActiveCalculator={handleSetCalculator}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleTheme={toggleTheme} 
          theme={theme}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          calculatorName={activeCalculatorName}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className={`transition-opacity duration-300 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {renderCalculator()}
            </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
