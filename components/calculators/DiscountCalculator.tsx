
import React, { useState } from 'react';
import Card from '../ui/Card';

const DiscountCalculator: React.FC = () => {
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [result, setResult] = useState<{ finalPrice: number; savedAmount: number } | null>(null);

    const calculateDiscount = (e: React.FormEvent) => {
        e.preventDefault();
        const p = parseFloat(price);
        const d = parseFloat(discount);

        if (p > 0 && d >= 0) {
            const savedAmount = (p * d) / 100;
            const finalPrice = p - savedAmount;
            setResult({ finalPrice, savedAmount });
        }
    };

    return (
        <Card title="Discount Calculator" icon="fa-solid fa-tags">
            <form onSubmit={calculateDiscount} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">Original Price (₹)</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Discount (%)</label>
                    <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Calculate</button>
            </form>

            {result && (
                <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center space-y-2">
                    <p className="text-lg">Final Price: <span className="font-bold text-green-500">₹{result.finalPrice.toFixed(2)}</span></p>
                    <p className="text-lg">You Saved: <span className="font-bold text-red-500">₹{result.savedAmount.toFixed(2)}</span></p>
                </div>
            )}
        </Card>
    );
};

export default DiscountCalculator;
