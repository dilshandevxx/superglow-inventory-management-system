import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 min-h-[60vh] animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-xl bg-[#4ade80]/20 animate-pulse"></div>
        <Loader2 className="h-12 w-12 text-[#4ade80] animate-spin relative z-10" />
      </div>
      <h2 className="mt-6 text-xl font-bold text-white tracking-wide">Loading Module...</h2>
      <p className="mt-2 text-sm text-slate-400">Fetching data from secure servers</p>
    </div>
  );
}
