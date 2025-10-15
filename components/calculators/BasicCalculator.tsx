
import React, { useState } from 'react';
import Card from '../ui/Card';

const BasicCalculator: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState('');

    const handleInput = (value: string) => {
        if (display === '0' && value !== '.') {
            setDisplay(value);
            setExpression(value);
        } else {
            setDisplay(display + value);
            setExpression(expression + value);
        }
    };
    
    const handleOperator = (operator: string) => {
        if (expression.slice(-1) === ' ') return;
        setDisplay(display + ` ${operator} `);
        setExpression(expression + ` ${operator} `);
    };

    const calculateResult = () => {
        try {
            // eslint-disable-next-line no-eval
            const result = eval(expression.replace(/%/g, '/100*'));
            setDisplay(String(result));
            setExpression(String(result));
        } catch (error) {
            setDisplay('Error');
            setExpression('');
        }
    };

    const clearDisplay = () => {
        setDisplay('0');
        setExpression('');
    };

    const backspace = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
            setExpression(expression.slice(0, -1));
        } else {
            setDisplay('0');
            setExpression('');
        }
    };

    const buttons = [
        { label: 'C', handler: clearDisplay, className: 'bg-red-500 hover:bg-red-600' },
        { label: '⌫', handler: backspace, className: 'bg-gray-500 hover:bg-gray-600' },
        { label: '%', handler: () => handleOperator('%'), className: 'bg-gray-500 hover:bg-gray-600' },
        { label: '/', handler: () => handleOperator('/'), className: 'bg-indigo-500 hover:bg-indigo-600' },
        { label: '7', handler: () => handleInput('7') },
        { label: '8', handler: () => handleInput('8') },
        { label: '9', handler: () => handleInput('9') },
        { label: '*', handler: () => handleOperator('*'), className: 'bg-indigo-500 hover:bg-indigo-600' },
        { label: '4', handler: () => handleInput('4') },
        { label: '5', handler: () => handleInput('5') },
        { label: '6', handler: () => handleInput('6') },
        { label: '-', handler: () => handleOperator('-'), className: 'bg-indigo-500 hover:bg-indigo-600' },
        { label: '1', handler: () => handleInput('1') },
        { label: '2', handler: () => handleInput('2') },
        { label: '3', handler: () => handleInput('3') },
        { label: '+', handler: () => handleOperator('+'), className: 'bg-indigo-500 hover:bg-indigo-600' },
        { label: '0', handler: () => handleInput('0'), className: 'col-span-2' },
        { label: '.', handler: () => handleInput('.') },
        { label: '=', handler: calculateResult, className: 'bg-green-500 hover:bg-green-600' },
    ];
    
    return (
        <Card title="Basic Calculator" icon="fa-solid fa-calculator">
            <div className="bg-gray-200 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <p className="text-right text-3xl font-mono break-all">{display}</p>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {buttons.map((btn) => (
                    <button 
                        key={btn.label} 
                        onClick={btn.handler}
                        className={`text-white text-xl sm:text-2xl font-bold p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${btn.className || 'bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500'}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </Card>
    );
};

export default BasicCalculator;
