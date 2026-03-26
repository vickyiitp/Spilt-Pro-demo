"use client";

import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BalanceCardProps {
  type: "owe" | "owed";
  amount: number;
}

export default function BalanceCard({ type, amount }: BalanceCardProps) {
  const isOwe = type === "owe";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 shadow-md transition-all",
        isOwe 
          ? "bg-red-50 border border-red-100 dark:bg-red-900/10 dark:border-red-800"
          : "bg-green-50 border border-green-100 dark:bg-green-900/10 dark:border-green-800"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn(
            "text-sm font-medium mb-1",
            isOwe ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
          )}>
            {isOwe ? "You Owe" : "You Are Owed"}
          </p>
          <p className={cn(
            "text-3xl font-bold",
            isOwe ? "text-red-700 dark:text-red-300" : "text-green-700 dark:text-green-300"
          )}>
            ₹{amount.toFixed(2)}
          </p>
        </div>
        <div className={cn(
          "p-2 rounded-full",
          isOwe ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
        )}>
          {isOwe ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
        </div>
      </div>
      
      {/* Decorative background circle */}
      <div className={cn(
        "absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10",
        isOwe ? "bg-red-500" : "bg-green-500"
      )} />
    </motion.div>
  );
}
