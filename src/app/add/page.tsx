"use client";

import { useSplitMate } from "@/hooks/useSplitMate";
import ExpenseForm from "@/components/ExpenseForm";
import { useRouter } from "next/navigation";

export default function AddExpensePage() {
  const { users, addExpense, isLoaded } = useSplitMate();
  const router = useRouter();

  if (!isLoaded) return null;

  return (
    <div className="py-4">
      <ExpenseForm
        users={users}
        onSubmit={(expense) => {
          addExpense(expense);
          router.push("/");
        }}
        onCancel={() => router.back()}
      />
    </div>
  );
}
