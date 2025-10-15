
import { Calculator, CalculatorType } from './types';

export const CALCULATORS: Calculator[] = [
  { id: CalculatorType.BASIC, name: 'Basic Calculator', icon: 'fa-solid fa-calculator' },
  { id: CalculatorType.SCIENTIFIC, name: 'Scientific Calculator', icon: 'fa-solid fa-flask' },
  { id: CalculatorType.LOAN, name: 'Loan / EMI Calculator', icon: 'fa-solid fa-hand-holding-dollar' },
  { id: CalculatorType.SIMPLE_INTEREST, name: 'Simple Interest', icon: 'fa-solid fa-percent' },
  { id: CalculatorType.COMPOUND_INTEREST, name: 'Compound Interest', icon: 'fa-solid fa-chart-line' },
  { id: CalculatorType.AGE, name: 'Age Calculator', icon: 'fa-solid fa-cake-candles' },
  { id: CalculatorType.BMI, name: 'BMI Calculator', icon: 'fa-solid fa-weight-scale' },
  { id: CalculatorType.CURRENCY, name: 'Currency Converter', icon: 'fa-solid fa-money-bill-transfer' },
  { id: CalculatorType.UNIT, name: 'Unit Converter', icon: 'fa-solid fa-ruler-combined' },
  { id: CalculatorType.DISCOUNT, name: 'Discount Calculator', icon: 'fa-solid fa-tags' },
];
