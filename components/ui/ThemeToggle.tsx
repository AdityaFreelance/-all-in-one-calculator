
import React from 'react';

interface ThemeToggleProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme, theme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center transition duration-300 focus:outline-none shadow"
    >
      <div
        className={`w-6 h-6 relative rounded-full transition duration-500 transform ${
          theme === 'dark' ? 'bg-gray-800 translate-x-7' : 'bg-yellow-400 translate-x-1'
        } p-1 text-white flex items-center justify-center`}
      >
        {theme === 'dark' ? (
          <i className="fas fa-moon text-xs text-yellow-300"></i>
        ) : (
          <i className="fas fa-sun text-xs text-white"></i>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
