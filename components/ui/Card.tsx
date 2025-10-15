
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon: string;
}

const Card: React.FC<CardProps> = ({ title, children, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <i className={`${icon} text-3xl text-indigo-500 mr-4`}></i>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
