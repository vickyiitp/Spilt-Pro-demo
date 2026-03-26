"use client";

import { useSplitMate } from "@/hooks/useSplitMate";
import SettleUp from "@/components/SettleUp";
import { getMinimalTransactions } from "@/utils/calculateBalances";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, UserPlus, X, CreditCard } from "lucide-react";
import { useState } from "react";

export default function SettlePage() {
  const { balances, settleTransaction, users, addUser, upiMap, isLoaded } = useSplitMate();
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserUpi, setNewUserUpi] = useState("");

  if (!isLoaded) return null;

  const transactions = getMinimalTransactions(balances);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName) return;
    addUser(newUserName, newUserUpi);
    setNewUserName("");
    setNewUserUpi("");
    setShowAddUser(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Settle Up</h1>
          <p className="text-gray-500 font-medium">Clear your debts.</p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl hover:bg-blue-200 transition-colors"
        >
          <UserPlus size={24} />
        </button>
      </header>

      <AnimatePresence>
        {showAddUser && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAddUser} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900 dark:text-white">Add New Roommate</h3>
                <button type="button" onClick={() => setShowAddUser(false)} className="text-gray-400">
                  <X size={20} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Name (e.g. Rahul)"
                className="w-full p-3 bg-gray-50 dark:bg-gray-950 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={newUserName}
                required
                onChange={e => setNewUserName(e.target.value)}
              />
              <input
                type="text"
                placeholder="UPI ID (optional)"
                className="w-full p-3 bg-gray-50 dark:bg-gray-950 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={newUserUpi}
                onChange={e => setNewUserUpi(e.target.value)}
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 dark:shadow-none"
              >
                Add Roommate
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gray-100 dark:bg-gray-900/50 p-2 rounded-4xl">
        <SettleUp 
          transactions={transactions} 
          upiMap={upiMap} 
          onSettle={settleTransaction}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Roommates</h3>
        <div className="grid grid-cols-2 gap-3">
          {users.map(user => (
            <div key={user} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold mb-2">
                {user[0]}
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{user}</span>
              <span className="text-[10px] text-gray-400 truncate w-full px-2">
                {upiMap[user] || "No UPI ID"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
