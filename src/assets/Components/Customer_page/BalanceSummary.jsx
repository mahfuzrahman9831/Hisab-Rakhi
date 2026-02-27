import { useCustomers } from "../../../Context/CustomerContext";

export default function BalanceSummary() {

  const { customers } = useCustomers();

  // 🔴 Total You'll Get (positive balances)
  const totalGet = customers
    .filter(c => c.balance > 0)
    .reduce((sum, c) => sum + c.balance, 0);

  // 🟢 Total You'll Give (negative balances)
  const totalGive = customers
    .filter(c => c.balance < 0)
    .reduce((sum, c) => sum + Math.abs(c.balance), 0);

  return (
    <div className="flex gap-3 px-4 pb-4 pt-4">

      {/* Total You'll Get */}
      <div className="flex-1 flex flex-col gap-1 rounded-xl p-4 bg-red-50 border border-red-100">
        <p className="text-[10px] uppercase tracking-wider font-bold text-red-500/70">
          Total You'll Get
        </p>
        <p className="text-lg font-bold text-red-600 leading-tight">
          ৳{totalGet.toLocaleString("en-BD")}
        </p>
      </div>

      {/* Total You'll Give */}
      <div className="flex-1 flex flex-col gap-1 rounded-xl p-4 bg-green-50 border border-green-100">
        <p className="text-[10px] uppercase tracking-wider font-bold text-green-500/70">
          Total You'll Give
        </p>
        <p className="text-lg font-bold text-green-600 leading-tight">
          ৳{totalGive.toLocaleString("en-BD")}
        </p>
      </div>

    </div>
  );
}