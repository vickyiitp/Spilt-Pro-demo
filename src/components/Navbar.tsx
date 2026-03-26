"use client";

import { motion } from "framer-motion";
import { List, Plus, Wallet, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", icon: <Wallet size={20} />, href: "/" },
    { label: "Add", icon: <Plus size={24} />, href: "/add", primary: true },
    { label: "Settle", icon: <ShieldCheck size={20} />, href: "/settle" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pb-safe z-50">
      <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          if (item.primary) {
            return (
              <Link key={item.href} href={item.href} className="relative -top-8 transition-transform active:scale-90">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-none border-4 border-white dark:border-gray-900">
                  {item.icon}
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {item.icon}
              <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="w-1 h-1 rounded-full bg-blue-600"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
