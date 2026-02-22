import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">AssurConnect</h4>
                        <p className="text-sm">Votre comparateur d'assurance de confiance. Trouvez la meilleure protection au meilleur prix.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Assurances</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/auto" className="hover:text-emerald-400 transition">Auto</Link></li>
                            <li><Link to="/habitation" className="hover:text-emerald-400 transition">Habitation</Link></li>
                            <li><Link to="/sante" className="hover:text-emerald-400 transition">Santé</Link></li>
                            <li><Link to="/animaux" className="hover:text-emerald-400 transition">Animaux</Link></li>
                            <li><Link to="/rc-pro" className="hover:text-emerald-400 transition">RC Pro</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Légal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/mentions-legales" className="hover:text-emerald-400 transition">Mentions légales</Link></li>
                            <li><Link to="/confidentialite" className="hover:text-emerald-400 transition">Politique de confidentialité</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> 01 23 45 67 89</li>
                            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> contact@assurcompar.fr</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center text-sm">
                    &copy; {new Date().getFullYear()} AssurConnect. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
