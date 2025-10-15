
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 text-center text-sm p-3 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 shrink-0">
      Developed by Aditya Kumar Singh | Portfolio: 
      <a href="https://adityafreelance.github.io/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
        https://adityafreelance.github.io/
      </a> | Contact: +91-9198005474 | +91-8545845171
    </footer>
  );
};

export default Footer;
