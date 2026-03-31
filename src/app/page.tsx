"use client";

import { useSplitMate } from "@/hooks/useSplitMate";
import BalanceCard from "@/components/BalanceCard";
import ActivityFeed from "@/components/ActivityFeed";
import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { Plus, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const { expenses, balances, users, addUser, isLoaded } = useSplitMate();
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  if (!isLoaded) return null;

  const userBalance = balances["You"] || 0;
  
  // Total Owed TO you (positive balances of others that you are involved in)
  // Actually, simplified: users with positive balance are owed, negative owe.
  // For "You":
  const youOwe = userBalance < 0 ? Math.abs(userBalance) : 0;
  const youAreOwed = userBalance > 0 ? userBalance : 0;

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;
    addUser(newUserName.trim());
    setNewUserName("");
    setShowAddUser(false);
  };

  return (
    <div className="space-y-8 pb-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">SplitMate</h1>
          <p className="text-gray-500 font-medium">Simplify your splits.</p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button 
            onClick={() => setShowAddUser(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-100 dark:shadow-none transition-colors flex items-center gap-1"
          >
            <Users size={12} /> {users.length} Active
          </button>
        </div>
      </header>

      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleAddUser} 
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl w-full max-w-sm"
          >
            <h3 className="text-xl font-bold mb-4">Add Roommate</h3>
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full pl-4 pr-4 py-3 mb-4 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={() => setShowAddUser(false)} 
                className="flex-1 py-3 text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-xl"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold"
              >
                Add User
              </button>
            </div>
          </motion.form>
        </div>
      )}

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
