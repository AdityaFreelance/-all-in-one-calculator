
import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';

const units = {
  length: { name: 'Length', base: 'meter', units: { meter: 1, kilometer: 1000, centimeter: 0.01, mile: 1609.34, foot: 0.3048, inch: 0.0254 } },
  weight: { name: 'Weight', base: 'gram', units: { gram: 1, kilogram: 1000, milligram: 0.001, pound: 453.592, ounce: 28.3495 } },
  temperature: { name: 'Temperature', base: 'celsius', units: { celsius: 1, fahrenheit: 1, kelvin: 1 } },
};

type Category = keyof typeof units;

const UnitConverter: React.FC = () => {
    const [category, setCategory] = useState<Category>('length');
    const [fromUnit, setFromUnit] = useState('meter');
    const [toUnit, setToUnit] = useState('kilometer');
    const [value, setValue] = useState('1');

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value as Category;
        setCategory(newCategory);
        setFromUnit(Object.keys(units[newCategory].units)[0]);
        setToUnit(Object.keys(units[newCategory].units)[1]);
        setValue('1');
    };

    const convertedValue = useMemo(() => {
        const val = parseFloat(value);
        if (isNaN(val)) return '';

        const currentCategory = units[category];
        if (category === 'temperature') {
            if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return (val * 9/5) + 32;
            if (fromUnit === 'fahrenheit' && toUnit === 'celsius') return (val - 32) * 5/9;
            if (fromUnit === 'celsius' && toUnit === 'kelvin') return val + 273.15;
            if (fromUnit === 'kelvin' && toUnit === 'celsius') return val - 273.15;
            if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') return (val - 32) * 5/9 + 273.15;
            if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') return (val - 273.15) * 9/5 + 32;
            return val;
        } else {
            const fromFactor = currentCategory.units[fromUnit as keyof typeof currentCategory.units];
            const toFactor = currentCategory.units[toUnit as keyof typeof currentCategory.units];
            const valueInBase = val * fromFactor;
            return valueInBase / toFactor;
        }

    }, [value, fromUnit, toUnit, category]);

    const unitOptions = Object.keys(units[category].units);
    
    return (
        <Card title="Unit Converter" icon="fa-solid fa-ruler-combined">
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select value={category} onChange={handleCategoryChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                       {Object.keys(units).map(cat => <option key={cat} value={cat}>{units[cat as Category].name}</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium">From</label>
                        <input type="number" value={value} onChange={e => setValue(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                        <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md">
                           {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">To</label>
                        <input type="text" value={convertedValue.toLocaleString()} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm" />
                        <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md">
                           {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default UnitConverter;
