
import React, { useState } from 'react';
import Card from '../ui/Card';

const SimpleInterestCalculator: React.FC = () => {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [time, setTime] = useState('');
    const [result, setResult] = useState<{ interest: number; totalAmount: number } | null>(null);

    const calculateSI = (e: React.FormEvent) => {
        e.preventDefault();
        const p = parseFloat(principal);
        const r = parseFloat(rate);
        const t = parseFloat(time);

        if (p > 0 && r > 0 && t > 0) {
            const interest = (p * r * t) / 100;
            const totalAmount = p + interest;
            setResult({ interest, totalAmount });
        }
    };

    return (
        <Card title="Simple Interest Calculator" icon="fa-solid fa-percent">
            <form onSubmit={calculateSI} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">Principal Amount (₹)</label>
                    <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Annual Interest Rate (%)</label>
                    <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Time (Years)</label>
                    <input type="number" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Calculate</button>
            </form>

            {result && (
                <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center space-y-2">
                    <p className="text-lg">Simple Interest: <span className="font-bold text-red-500">₹{result.interest.toFixed(2)}</span></p>
                    <p className="text-lg">Total Amount: <span className="font-bold text-green-500">₹{result.totalAmount.toFixed(2)}</span></p>
                </div>
            )}
        </Card>
    );
};

export default SimpleInterestCalculator;
