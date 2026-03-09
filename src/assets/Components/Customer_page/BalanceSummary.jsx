import { useCustomers } from "../../../Context/CustomerContext";
import { getCustomerBalance } from "../../../utils/ledger";

export default function BalanceSummary() {

  const { customers, transactions } = useCustomers();

  let totalGet = 0;
  let totalGive = 0;

  customers.forEach((customer) => {

    const balance = getCustomerBalance(transactions, customer.id);

    if (balance > 0) {
      totalGet += balance;
    }

    if (balance < 0) {
      totalGive += Math.abs(balance);
    }

  });

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