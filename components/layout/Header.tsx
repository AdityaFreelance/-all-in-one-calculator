
import React from 'react';
import ThemeToggle from '../ui/ThemeToggle';

interface HeaderProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  calculatorName: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme, toggleSidebar, calculatorName }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between z-10 shrink-0">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-500 dark:text-gray-400 focus:outline-none lg:hidden mr-4">
          <i className="fas fa-bars text-xl"></i>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white hidden sm:block">All-in-One Calculator</h1>
         <span className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 sm:hidden">{calculatorName}</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 hidden lg:block">{calculatorName}</span>
        <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      </div>
    </header>
  );
};

export default Header;
