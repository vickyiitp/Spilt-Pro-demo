"use client";

import { useState, useEffect } from "react";
import { Expense, Balances } from "@/types";
import { calculateBalances } from "@/utils/calculateBalances";

export function useSplitMate() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [users, setUsers] = useState<string[]>(["You"]);
  const [upiMap, setUpiMap] = useState<Record<string, string>>({});

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedExpenses = localStorage.getItem("sm_expenses");
    const savedUsers = localStorage.getItem("sm_users");
    const savedUpi = localStorage.getItem("sm_upi");

    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedUpi) setUpiMap(JSON.parse(savedUpi));
    
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("sm_expenses", JSON.stringify(expenses));
  }, [expenses, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("sm_users", JSON.stringify(users));
  }, [users, isLoaded]);

  const addExpense = (newExpense: Omit<Expense, "id" | "createdAt">) => {
    const expense: Expense = {
      ...newExpense,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setExpenses(prev => [expense, ...prev]);
  };

  const removeExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const addUser = (name: string, upi?: string) => {
    if (users.includes(name)) return;
    setUsers(prev => [...prev, name]);
    if (upi) setUpiMap(prev => ({ ...prev, [name]: upi }));
  };

  const settleTransaction = (from: string, to: string, amount: number) => {
    // To settle, we add a counter-expense or just adjust balances.
    // In many splitting apps, "settling" is just another expense type.
    // For simplicity, we add an expense where "from" paid "to" the "amount".
    addExpense({
      amount,
      description: `Payment to ${to}`,
      paidBy: from,
      participants: [to],
    });
  };

  const balances = calculateBalances(expenses, users);

  return {
    expenses,
    users,
    upiMap,
    balances,
    addExpense,
    removeExpense,
    addUser,
    settleTransaction,
    isLoaded
  };
}
