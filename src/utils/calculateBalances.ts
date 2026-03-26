import { Expense, Balances } from '../types';

/**
 * Calculates net balances for all users based on expenses.
 * Positive balance = user is owed money
 * Negative balance = user owes money
 */
export const calculateBalances = (expenses: Expense[], users: string[]): Balances => {
  const balances: Balances = {};
  
  // Initialize balances for all users to 0
  users.forEach(user => {
    balances[user] = 0;
  });

  expenses.forEach(expense => {
    const { amount, paidBy, participants } = expense;
    if (participants.length === 0) return;

    const splitAmount = amount / participants.length;

    // The person who paid gets the full amount back (initially)
    if (balances[paidBy] !== undefined) {
      balances[paidBy] += amount;
    }

    // Each participant owes their share
    participants.forEach(participant => {
      if (balances[participant] !== undefined) {
        balances[participant] -= splitAmount;
      }
    });
  });

  return balances;
};

/**
 * Minimizes transactions to settle up.
 * Returns a list of who should pay whom and how much.
 */
export const getMinimalTransactions = (balances: Balances) => {
  const debtors: { name: string; amount: number }[] = [];
  const creditors: { name: string; amount: number }[] = [];

  Object.entries(balances).forEach(([name, amount]) => {
    if (amount < -0.01) {
      debtors.push({ name, amount: Math.abs(amount) });
    } else if (amount > 0.01) {
      creditors.push({ name, amount });
    }
  });

  const transactions: { from: string; to: string; amount: number }[] = [];

  let d = 0;
  let c = 0;

  while (d < debtors.length && c < creditors.length) {
    const amount = Math.min(debtors[d].amount, creditors[c].amount);
    
    transactions.push({
      from: debtors[d].name,
      to: creditors[c].name,
      amount: Number(amount.toFixed(2))
    });

    debtors[d].amount -= amount;
    creditors[c].amount -= amount;

    if (debtors[d].amount < 0.01) d++;
    if (creditors[c].amount < 0.01) c++;
  }

  return transactions;
};
