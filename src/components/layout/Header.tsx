import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2.5">
                    {/* AssurConnect SVG Logo */}
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 2L4 8v10c0 8.5 6 16 14 18 8-2 14-9.5 14-18V8L18 2z" fill="#10b981" />
                        <path d="M18 2L4 8v10c0 8.5 6 16 14 18 8-2 14-9.5 14-18V8L18 2z" fill="url(#shieldGrad)" />
                        <path d="M11 18c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
                        <path d="M13.5 18c0-2.49 2.02-4.5 4.5-4.5s4.5 2.01 4.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
                        <circle cx="18" cy="18" r="2" fill="white" />
                        <defs>
                            <linearGradient id="shieldGrad" x1="4" y1="2" x2="32" y2="36" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#0f766e" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="text-xl font-bold">
                        <span className="text-slate-900">Assur</span><span className="text-emerald-500">Connect</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Accueil</Link>
                    <div className="relative group">
                        <button className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-1">
                            Assurances
                        </button>
                        <div className="absolute top-full right-0 w-48 bg-white border border-slate-100 rounded-lg shadow-lg py-2 hidden group-hover:block">
                            <Link to="/auto" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600">Auto</Link>
                            <Link to="/habitation" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600">Habitation</Link>
                            <Link to="/sante" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600">Santé</Link>
                            <Link to="/animaux" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600">Animaux</Link>
                            <Link to="/rc-pro" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600">RC Pro</Link>
                        </div>
                    </div>
                    <Link to="/mentions-legales" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Mentions Légales</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="hidden md:inline-flex" onClick={() => (window as any).LeadService?.exportToCSV()}>
                        Admin (Export CSV)
                    </Button>
                    <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        <Link to="/auto">Devis Gratuit</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
