"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, IndianRupee, FileText, User as UserIcon } from "lucide-react";
import { Expense } from "@/types";

interface ExpenseFormProps {
  users: string[];
  onSubmit: (expense: Omit<Expense, "id" | "createdAt">) => void;
  onCancel: () => void;
}

export default function ExpenseForm({ users, onSubmit, onCancel }: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paidBy, setPaidBy] = useState(users[0] || "");
  const [participants, setParticipants] = useState<string[]>(users);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !paidBy || participants.length === 0) return;

    onSubmit({
      amount: parseFloat(amount),
      description,
      paidBy,
      participants,
    });
  };

  const toggleParticipant = (user: string) => {
    setParticipants(prev => 
      prev.includes(user) 
        ? prev.filter(u => u !== user)
        : [...prev, user]
    );
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Expense</h2>
        <button type="button" onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Amount */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <IndianRupee size={20} />
          </div>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            required
            autoFocus
            className="w-full pl-10 pr-4 py-4 text-2xl font-bold bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FileText size={20} />
          </div>
          <input
            type="text"
            placeholder="What was it for?"
            required
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Paid By */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Paid by</label>
          <div className="flex flex-wrap gap-2">
            {users.map(user => (
              <button
                key={user}
                type="button"
                onClick={() => setPaidBy(user)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  paidBy === user 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {user}
              </button>
            ))}
          </div>
        </div>

        {/* Split Between */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Split between</label>
          <div className="grid grid-cols-2 gap-2">
            {users.map(user => (
              <button
                key={user}
                type="button"
                onClick={() => toggleParticipant(user)}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  participants.includes(user)
                    ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/10 dark:text-green-400"
                    : "border-gray-100 bg-gray-50 text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserIcon size={16} />
                  <span className="text-sm font-medium truncate">{user}</span>
                </div>
                {participants.includes(user) && (
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <Plus size={12} className="text-white rotate-45" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none transition-all mt-4"
      >
        Save Expense
      </motion.button>
    </motion.form>
  );
}
