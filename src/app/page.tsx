"use client";

import { useSplitMate } from "@/hooks/useSplitMate";
import BalanceCard from "@/components/BalanceCard";
import ActivityFeed from "@/components/ActivityFeed";
import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { Plus, Users } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { expenses, balances, users, isLoaded } = useSplitMate();

  if (!isLoaded) return null;

  const userBalance = balances["You"] || 0;
  
  // Total Owed TO you (positive balances of others that you are involved in)
  // Actually, simplified: users with positive balance are owed, negative owe.
  // For "You":
  const youOwe = userBalance < 0 ? Math.abs(userBalance) : 0;
  const youAreOwed = userBalance > 0 ? userBalance : 0;

  return (
    <div className="space-y-8 pb-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">SplitMate</h1>
          <p className="text-gray-500 font-medium">Simplify your splits.</p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-100 dark:shadow-none">
            {users.length} Active
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        <BalanceCard type="owed" amount={youAreOwed} />
        <BalanceCard type="owe" amount={youOwe} />
      </div>

      <ActivityFeed expenses={expenses} />
      
      {expenses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-800 text-center"
        >
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
            <Plus size={24} />
          </div>
          <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-1">Add your first expense</h4>
          <p className="text-sm text-blue-700/70 dark:text-blue-400/70 mb-4">Splitting with roommates has never been easier.</p>
          <Link 
            href="/add"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-blue-200 dark:shadow-none transition-transform active:scale-95"
          >
            Get Started
          </Link>
        </motion.div>
      )}
    </div>
  );
}
