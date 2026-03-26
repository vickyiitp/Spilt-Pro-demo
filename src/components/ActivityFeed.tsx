"use client";

import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Expense } from "@/types";
import { Receipt, Users } from "lucide-react";

interface ActivityFeedProps {
  expenses: Expense[];
}

export default function ActivityFeed({ expenses }: ActivityFeedProps) {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
        <Receipt size={48} className="mb-4 opacity-20" />
        <p>No activity yet.</p>
        <p className="text-sm">Expenses will show up here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Recent Activity</h3>
      <div className="space-y-3">
        {expenses.map((expense, idx) => (
          <motion.div
            key={expense.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600">
              <Receipt size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                    {expense.description}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Paid by <span className="font-medium">{expense.paidBy}</span>
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  ₹{expense.amount}
                </p>
              </div>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Users size={12} /> {expense.participants.length} Split
                </span>
                <span>{formatDistanceToNow(expense.createdAt)} ago</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
