export interface Expense {
  id: string;
  amount: number;
  description: string;
  paidBy: string; // User Name
  participants: string[]; // List of User Names
  createdAt: number;
}

export interface UserBalance {
  name: string;
  netBalance: number;
}

export type Balances = Record<string, number>;
