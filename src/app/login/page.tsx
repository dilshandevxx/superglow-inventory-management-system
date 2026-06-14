import { login } from './actions'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
      {/* Dynamic Background Elements */}
      <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[70%] w-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
      
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
            SUPERGLOW
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Trade Center Cloud ERP System
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="mb-6 text-2xl font-semibold text-white">Sign In</h2>
          
          {searchParams?.message && (
            <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
              {searchParams.message}
            </div>
          )}

          <form action={login} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@superglow.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all active:scale-[0.98]"
            >
              Sign in to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
