export default function MonthlyOverview() {
  return (
    <section className="px-4 pt-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          Monthly Overview
          <span className="text-xs font-normal opacity-60">
            মাসিক চিত্র
          </span>
        </h3>
        <span className="text-xs font-bold text-green-600">
          Total: ৳ 74,000
        </span>
      </div>

      {/* Chart Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-48 flex items-end justify-between gap-2 overflow-hidden">

        {/* Jan */}
        <div className="group relative flex-1 h-full flex flex-col justify-end">
          <div className="w-full bg-green-500/20 rounded-t-lg h-[40%] transition-all group-hover:bg-green-500/30"></div>
          <span className="text-[8px] text-center mt-2 opacity-50 uppercase font-bold">
            Jan
          </span>
        </div>

        {/* Feb */}
        <div className="group relative flex-1 h-full flex flex-col justify-end">
          <div className="w-full bg-green-500/40 rounded-t-lg h-[60%] transition-all group-hover:bg-green-500/50"></div>
          <span className="text-[8px] text-center mt-2 opacity-50 uppercase font-bold">
            Feb
          </span>
        </div>

        {/* Mar */}
        <div className="group relative flex-1 h-full flex flex-col justify-end">
          <div className="w-full bg-green-500/20 rounded-t-lg h-[35%] transition-all group-hover:bg-green-500/30"></div>
          <span className="text-[8px] text-center mt-2 opacity-50 uppercase font-bold">
            Mar
          </span>
        </div>

        {/* Apr */}
        <div className="group relative flex-1 h-full flex flex-col justify-end">
          <div className="w-full bg-green-500/60 rounded-t-lg h-[85%] transition-all group-hover:bg-green-500/70"></div>
          <span className="text-[8px] text-center mt-2 opacity-50 uppercase font-bold">
            Apr
          </span>
        </div>

        {/* May */}
        <div className="group relative flex-1 h-full flex flex-col justify-end">
          <div className="w-full bg-green-500/40 rounded-t-lg h-[55%] transition-all group-hover:bg-green-500/50"></div>
          <span className="text-[8px] text-center mt-2 opacity-50 uppercase font-bold">
            May
          </span>
        </div>

        {/* Jun (Active Month) */}
        <div className="group relative flex-1 h-full flex flex-col justify-end">
          <div className="w-full bg-green-500 rounded-t-lg h-[100%] transition-all"></div>
          <span className="text-[8px] text-center mt-2 opacity-70 font-bold uppercase text-green-600">
            Jun
          </span>
        </div>

      </div>
    </section>
  );
}