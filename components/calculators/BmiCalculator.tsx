
import React, { useState } from 'react';
import Card from '../ui/Card';

const BmiCalculator: React.FC = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

    const calculateBMI = (e: React.FormEvent) => {
        e.preventDefault();
        const w = parseFloat(weight);
        const h = parseFloat(height) / 100; // convert cm to m

        if (w > 0 && h > 0) {
            const bmi = w / (h * h);
            let category = '';
            let color = '';
            if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-500'; }
            else if (bmi >= 18.5 && bmi <= 24.9) { category = 'Normal weight'; color = 'text-green-500'; }
            else if (bmi >= 25 && bmi <= 29.9) { category = 'Overweight'; color = 'text-yellow-500'; }
            else { category = 'Obesity'; color = 'text-red-500'; }
            setResult({ bmi, category, color });
        }
    };

    return (
        <Card title="BMI Calculator" icon="fa-solid fa-weight-scale">
            <form onSubmit={calculateBMI} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">Weight (kg)</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Height (cm)</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Calculate BMI</button>
            </form>

            {result && (
                <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center space-y-2">
                    <p className="text-lg">Your BMI is: <span className="font-bold text-indigo-500">{result.bmi.toFixed(2)}</span></p>
                    <p className={`text-lg font-semibold ${result.color}`}>{result.category}</p>
                </div>
            )}
        </Card>
    );
};

export default BmiCalculator;
