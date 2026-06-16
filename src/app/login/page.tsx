import { login } from './actions'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111114]">
      {/* Dynamic Background Elements */}
      <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[50%] rounded-full bg-[#99E2C6]/10 blur-[120px]" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[70%] w-[50%] rounded-full bg-[#60A5FA]/10 blur-[120px]" />
      
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="h-16 w-16 mb-4 rounded-3xl bg-gradient-to-br from-[#99E2C6] to-[#60A5FA] text-[#111114] flex items-center justify-center font-black text-3xl shadow-[0_0_40px_rgba(153,226,198,0.3)]">
            S
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-md">
            SuperGlow
          </h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
            Cloud ERP System
          </p>
        </div>

        <div className="rounded-[32px] border border-white/[0.05] bg-[#1A1A1F] p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <h2 className="mb-6 text-xl font-bold text-white relative z-10">Sign In to Workspace</h2>
          
          {searchParams?.message && (
            <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
              {searchParams.message}
            </div>
          )}

          <form action={login} className="space-y-5 relative z-10">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#94A3B8]" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@superglow.com"
                className="w-full rounded-2xl border border-white/[0.05] bg-[#111114] px-4 py-3.5 text-white placeholder:text-[#94A3B8]/50 focus:border-[#99E2C6]/50 focus:outline-none focus:ring-1 focus:ring-[#99E2C6]/50 transition-all"
              />
            </div>
            
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#94A3B8]" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/[0.05] bg-[#111114] px-4 py-3.5 text-white placeholder:text-[#94A3B8]/50 focus:border-[#99E2C6]/50 focus:outline-none focus:ring-1 focus:ring-[#99E2C6]/50 transition-all"
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-gradient-to-r from-[#99E2C6] to-[#60A5FA] px-4 py-3.5 text-sm font-black text-[#111114] hover:shadow-[0_0_20px_rgba(153,226,198,0.3)] hover:scale-[1.02] focus:outline-none transition-all active:scale-[0.98]"
            >
              Sign in to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
