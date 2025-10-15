import React, { useState, useEffect, useCallback } from 'react';
import Card from '../ui/Card';

// This is a simplified version. A full implementation would require a more robust parsing engine than eval().
const ScientificCalculator: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [isRadians, setIsRadians] = useState(true);

    const factorial = (n: number): number => {
        if (n < 0) return NaN;
        if (n === 0) return 1;
        return n * factorial(n - 1);
    };

    const handleInput = useCallback((value: string) => {
        if (display === 'Error') {
            setDisplay(value);
            return;
        }
        setDisplay(prev => (prev === '0' && value !== '.') ? value : prev + value);
    }, [display]);

    const handleFunction = useCallback((func: string) => {
        try {
            let currentVal = parseFloat(display);
            let result;
            switch(func) {
                case 'sin': result = isRadians ? Math.sin(currentVal) : Math.sin(currentVal * Math.PI / 180); break;
                case 'cos': result = isRadians ? Math.cos(currentVal) : Math.cos(currentVal * Math.PI / 180); break;
                case 'tan': result = isRadians ? Math.tan(currentVal) : Math.tan(currentVal * Math.PI / 180); break;
                case 'log': result = Math.log10(currentVal); break;
                case 'ln': result = Math.log(currentVal); break;
                case 'sqrt': result = Math.sqrt(currentVal); break;
                case 'x!': result = factorial(currentVal); break;
                case '1/x': result = 1 / currentVal; break;
                case 'π': setDisplay(String(Math.PI)); return;
                case 'e': setDisplay(String(Math.E)); return;
                default: result = currentVal;
            }
            if (isNaN(result) || !isFinite(result)) {
                setDisplay('Error');
            } else {
                setDisplay(String(result));
            }
        } catch {
            setDisplay('Error');
        }
    }, [display, isRadians]);
    
    const calculateResult = useCallback(() => {
        try {
            // A more robust solution would use a math expression parser library instead of eval
            // This is for demonstration purposes.
            // eslint-disable-next-line no-eval
            const result = eval(display.replace('^', '**'));
            setDisplay(String(result));
        } catch (error) {
            setDisplay('Error');
        }
    }, [display]);

    const clearDisplay = useCallback(() => setDisplay('0'), []);
    const backspace = useCallback(() => setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0'), []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();
            const { key } = event;

            if (/\d/.test(key) || ['(', ')'].includes(key)) {
                handleInput(key);
            } else if (['+', '-', '*', '/', '^', '%'].includes(key)) {
                handleInput(` ${key} `);
            } else if (key === '.') {
                handleInput('.');
            } else if (key === 'Enter' || key === '=') {
                calculateResult();
            } else if (key === 'Backspace') {
                backspace();
            } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                clearDisplay();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleInput, calculateResult, backspace, clearDisplay]);

    const buttons = [
        'sin', 'cos', 'tan', 'log', 'C',
        'ln', 'sqrt', 'x!', '1/x', '⌫',
        '(', ')', '^', 'π', '/',
        '7', '8', '9', 'e', '*',
        '4', '5', '6', '%', '-',
        '1', '2', '3', '=', '+',
        '0', '.',
    ];

    const getButtonHandler = (label: string) => {
        if (!isNaN(parseInt(label)) || label === '.') return () => handleInput(label);
        if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'x!', '1/x', 'π', 'e'].includes(label)) return () => handleFunction(label);
        if (['/', '*', '-', '+', '^', '%', '(', ')'].includes(label)) return () => handleInput(label === '^' ? '^' : ` ${label} `);
        if (label === '=') return calculateResult;
        if (label === 'C') return clearDisplay;
        if (label === '⌫') return backspace;
        return () => {};
    };
    
    return (
        <Card title="Scientific Calculator" icon="fa-solid fa-flask">
            <div className="bg-gray-200 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <p className="text-right text-3xl font-mono break-all">{display}</p>
            </div>
            <div className="flex justify-end mb-2">
                 <button onClick={() => setIsRadians(!isRadians)} className="px-3 py-1 text-sm rounded-md bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200">
                    {isRadians ? 'RAD' : 'DEG'}
                </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {buttons.map((btn) => {
                    const isEquals = btn === '=';
                    const isZero = btn === '0';
                    const isOperator = ['/', '*', '-', '+', '^', '%'].includes(btn);
                    const isFunction = ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'x!', '1/x'].includes(btn);
                    const isClear = btn === 'C' || btn === '⌫';

                    let className = 'text-white text-lg font-bold p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 ';
                    if (isEquals) className += 'bg-green-500 hover:bg-green-600 row-span-2';
                    else if (isZero) className += 'col-span-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500';
                    else if (isOperator) className += 'bg-indigo-500 hover:bg-indigo-600';
                    else if (isFunction) className += 'bg-gray-500 hover:bg-gray-600 text-sm';
                    else if (isClear) className += 'bg-red-500 hover:bg-red-600';
                    else className += 'bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500';
                    
                    return (
                        <button key={btn} onClick={getButtonHandler(btn)} className={className}>
                            {btn}
                        </button>
                    );
                })}
            </div>
        </Card>
    );
};

export default ScientificCalculator;