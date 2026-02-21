export default function BalanceSummary() {
  return (
    <div className="flex gap-3 px-4 pb-4 pt-4">

      {/* Total You'll Get */}
      <div className="flex-1 flex flex-col gap-1 rounded-xl p-4 bg-red-50 border border-red-100">
        <p className="text-[10px] uppercase tracking-wider font-bold text-red-500/70">
          Total You'll Get
        </p>
        <p className="text-lg font-bold text-red-600 leading-tight">
          ৳45,200
        </p>
      </div>

      {/* Total You'll Give */}
      <div className="flex-1 flex flex-col gap-1 rounded-xl p-4 bg-green-50 border border-green-100">
        <p className="text-[10px] uppercase tracking-wider font-bold text-green-500/70">
          Total You'll Give
        </p>
        <p className="text-lg font-bold text-green-600 leading-tight">
          ৳12,800
        </p>
      </div>

    </div>
  );
}