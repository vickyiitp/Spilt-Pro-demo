/**
 * Generates a UPI deep link for mobile payments.
 * Format: upi://pay?pa={vpa}&pn={name}&am={amount}&cu=INR
 */
export const generateUPILink = (vpa: string, name: string, amount: number): string => {
  const encodedName = encodeURIComponent(name);
  return `upi://pay?pa=${vpa}&pn=${encodedName}&am=${amount.toFixed(2)}&cu=INR&tn=SplitMate%20Settle%20Up`;
};
