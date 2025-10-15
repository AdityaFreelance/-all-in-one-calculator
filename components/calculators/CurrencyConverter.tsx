
import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';

const rates = {
  "USD": 1,
  "EUR": 0.92,
  "JPY": 157.32,
  "GBP": 0.79,
  "AUD": 1.50,
  "CAD": 1.37,
  "CHF": 0.90,
  "CNY": 7.25,
  "INR": 83.54,
};

const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState('1');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');

    const convertedAmount = useMemo(() => {
        const fromRate = rates[fromCurrency as keyof typeof rates];
        const toRate = rates[toCurrency as keyof typeof rates];
        const value = parseFloat(amount);

        if (isNaN(value) || !fromRate || !toRate) return 0;

        return (value / fromRate) * toRate;
    }, [amount, fromCurrency, toCurrency]);

    return (
        <Card title="Currency Converter" icon="fa-solid fa-money-bill-transfer">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium">Amount</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">From</label>
                        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                            {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">To</label>
                        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                           {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                    <p className="text-xl font-semibold">Converted Amount:</p>
                    <p className="text-3xl font-bold text-green-500">
                        {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        1 {fromCurrency} = {(rates[toCurrency as keyof typeof rates] / rates[fromCurrency as keyof typeof rates]).toFixed(4)} {toCurrency}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default CurrencyConverter;
