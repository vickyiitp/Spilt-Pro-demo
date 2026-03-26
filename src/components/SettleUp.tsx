"use client";

import { motion } from "framer-motion";
import { IndianRupee, Send, CheckCircle2 } from "lucide-react";
import { generateUPILink } from "@/utils/generateUPILink";

interface Transaction {
  from: string;
  to: string;
  amount: number;
}

interface SettleUpProps {
  transactions: Transaction[];
  onSettle: (from: string, to: string, amount: number) => void;
  upiMap: Record<string, string>; // name -> VPA
}

export default function SettleUp({ transactions, onSettle, upiMap }: SettleUpProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
        <CheckCircle2 size={48} className="mb-4 text-green-500 opacity-50" />
        <p className="font-semibold text-gray-900 dark:text-white">All settled up!</p>
        <p className="text-sm">No pending balances.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Suggested Settlements</h3>
      <div className="space-y-3">
        {transactions.map((tx, idx) => {
          const upiId = upiMap[tx.to];
          const upiLink = upiId ? generateUPILink(upiId, tx.to, tx.amount) : null;

          return (
            <motion.div
              key={`${tx.from}-${tx.to}-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {tx.from[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Pays</span>
                    <span className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">₹{tx.amount}</span>
                  </div>
                </div>
                
                <div className="text-gray-300">
                  <Send size={20} />
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">To</span>
                    <span className="font-bold text-gray-900 dark:text-white">{tx.to}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                    {tx.to[0]}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {upiLink ? (
                  <a
                    href={upiLink}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-center transition-all shadow-md shadow-green-100 flex items-center justify-center gap-2"
                  >
                    <IndianRupee size={16} /> Pay Now
                  </a>
                ) : (
                  <button disabled className="flex-1 bg-gray-100 text-gray-400 py-3 rounded-xl font-medium cursor-not-allowed">
                    UPI ID missing for {tx.to}
                  </button>
                )}
                <button
                  onClick={() => onSettle(tx.from, tx.to, tx.amount)}
                  className="px-4 bg-gray-50 hover:bg-gray-100 text-gray-600 py-3 rounded-xl font-medium border border-gray-200 transition-all"
                >
                  Mark Settled
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
