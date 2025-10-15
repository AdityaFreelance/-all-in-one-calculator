
import React from 'react';
import { CALCULATORS } from '../../constants';
import { CalculatorType } from '../../types';

interface SidebarProps {
  activeCalculator: CalculatorType;
  setActiveCalculator: (calc: CalculatorType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCalculator, setActiveCalculator, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`fixed lg:relative inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-xl w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400">Calculators</h2>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          <ul>
            {CALCULATORS.map((calc) => (
              <li key={calc.id}>
                <button
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`w-full text-left flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
                    activeCalculator === calc.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <i className={`${calc.icon} w-6 text-center text-lg`}></i>
                  <span className="ml-3 font-medium">{calc.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
