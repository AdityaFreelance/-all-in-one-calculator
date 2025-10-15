
import React, { useState } from 'react';
import Card from '../ui/Card';

const AgeCalculator: React.FC = () => {
    const [dob, setDob] = useState('');
    const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

    const calculateAge = (e: React.FormEvent) => {
        e.preventDefault();
        const birthDate = new Date(dob);
        const today = new Date();
        
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        if(!isNaN(years)) {
            setAge({ years, months, days });
        }
    };

    return (
        <Card title="Age Calculator" icon="fa-solid fa-cake-candles">
            <form onSubmit={calculateAge} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">Date of Birth</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Calculate Age</button>
            </form>

            {age && (
                <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                    <p className="text-xl font-semibold">Your age is:</p>
                    <p className="text-2xl font-bold text-indigo-500">
                        {age.years} <span className="text-lg font-medium text-gray-600 dark:text-gray-300">Years</span>,{' '} 
                        {age.months} <span className="text-lg font-medium text-gray-600 dark:text-gray-300">Months</span>, &{' '}
                        {age.days} <span className="text-lg font-medium text-gray-600 dark:text-gray-300">Days</span>
                    </p>
                </div>
            )}
        </Card>
    );
};

export default AgeCalculator;
