
export enum CalculatorType {
  BASIC = 'basic',
  SCIENTIFIC = 'scientific',
  LOAN = 'loan',
  SIMPLE_INTEREST = 'simple_interest',
  COMPOUND_INTEREST = 'compound_interest',
  AGE = 'age',
  BMI = 'bmi',
  CURRENCY = 'currency',
  UNIT = 'unit',
  DISCOUNT = 'discount',
}

export interface Calculator {
  id: CalculatorType;
  name: string;
  icon: string;
}
