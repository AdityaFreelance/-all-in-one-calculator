
import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LoanCalculator: React.FC = () => {
    const [amount, setAmount] = useState('100000');
    const [rate, setRate] = useState('8.5');
    const [tenure, setTenure] = useState('5');
    const [result, setResult] = useState<{ emi: number; totalInterest: number; totalPayment: number } | null>(null);

    const calculateEMI = (e: React.FormEvent) => {
        e.preventDefault();
        const p = parseFloat(amount);
        const r = parseFloat(rate) / 12 / 100;
        const n = parseFloat(tenure) * 12;

        if (p > 0 && r > 0 && n > 0) {
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const totalPayment = emi * n;
            const totalInterest = totalPayment - p;
            setResult({ emi, totalInterest, totalPayment });
        }
    };
    
    const chartData = useMemo(() => {
        if (!result) return [];
        return [
            { name: 'Principal Amount', value: parseFloat(amount) },
            { name: 'Total Interest', value: result.totalInterest },
        ];
    }, [result, amount]);

    const COLORS = ['#4f46e5', '#f43f5e'];

    return (
        <Card title="Loan / EMI Calculator" icon="fa-solid fa-hand-holding-dollar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <form onSubmit={calculateEMI} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Amount (₹)</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Annual Interest Rate (%)</label>
                        <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Tenure (Years)</label>
                        <input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Calculate</button>
                </form>

                {result && (
                    <div className="text-center space-y-4">
                        <div className="w-full h-64">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                        {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => `₹${value.toFixed(2)}`} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-2">
                            <p className="text-lg">Monthly EMI: <span className="font-bold text-green-500">₹{result.emi.toFixed(2)}</span></p>
                            <p className="text-lg">Total Interest: <span className="font-bold text-red-500">₹{result.totalInterest.toFixed(2)}</span></p>
                            <p className="text-lg">Total Payment: <span className="font-bold text-indigo-500">₹{result.totalPayment.toFixed(2)}</span></p>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default LoanCalculator;
