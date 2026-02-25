
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Car,
    Home as HomeIcon,
    Heart,
    Dog,
    Briefcase,
    ShieldCheck,
    PiggyBank,
    UserCheck,
    Clock,
    Star,
    ChevronDown,
    Search,
    Handshake,
    Rocket
} from "lucide-react";
import { LogoCarousel } from "@/components/home/LogoCarousel";

// --- Components ---

const AnimatedCounter = ({ value, label, duration = 2 }: { value: number, label: string, duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        const range = end - start;
        let startTime: number | null = null;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * range + start));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [value, duration]);

    return (
        <div className="flex flex-col items-center p-6 text-white">
            <div className="text-4xl lg:text-5xl font-extrabold text-emerald-400 mb-2">
                {count.toLocaleString()}{label === "€" || label === "%" ? label : "+"}
            </div>
            <div className="text-slate-300 font-medium text-center">{label}</div>
        </div>
    );
};

const ProductCard = ({
    icon, title, desc, link, imageUrl, color
}: {
    icon: React.ReactNode, title: string, desc: string,
    link: string, imageUrl: string, color: string
}) => {
    const navigate = useNavigate();
    return (
        <motion.div
            onClick={() => navigate(link)}
            whileHover={{ y: -10 }}
            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
        >
            {/* Photo */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-70 group-hover:opacity-80 transition-opacity duration-500`} />

                {/* Icon Badge */}
                <div className="absolute top-4 left-4 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-2.5">
                    {icon}
                </div>
            </div>

            {/* Content */}
            <div className="bg-white px-5 py-5 flex flex-col gap-3">
                <h3 className="font-bold text-lg text-slate-800">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>
                <button className={`w-full mt-1 py-2.5 px-4 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg ${color.includes('emerald') ? 'bg-emerald-500' : color.includes('blue') ? 'bg-blue-500' : color.includes('rose') ? 'bg-rose-500' : color.includes('amber') ? 'bg-amber-500' : 'bg-indigo-500'}`}>
                    Demander un devis →
                </button>
            </div>
        </motion.div>
    );
};


const FeatureBlock = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors"
    >
        <div className="mb-4">{icon}</div>
        <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{desc}</p>
    </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left font-bold text-slate-800 py-2 hover:text-emerald-600 transition-colors"
            >
                {question}
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="py-4 text-slate-600 leading-relaxed">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ReviewCard = ({ name, rating, text }: { name: string, rating: number, text: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
    >
        <div className="flex gap-1 mb-4">
            {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
        </div>
        <p className="text-slate-600 mb-6 italic">"{text}"</p>
        <div className="font-bold text-slate-900">{name}</div>
    </motion.div>
);

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-50">
            {/* 1) Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 text-white pt-20 pb-32 lg:pt-32 lg:pb-48">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8 text-center lg:text-left"
                        >
                            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                                Comparez les meilleures assurances et <span className="text-emerald-400 italic">économisez jusqu’à 30%</span>
                            </h1>
                            <p className="text-xl text-slate-300 font-light">
                                Devis gratuit – Sans engagement – Réponse rapide
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Button
                                    size="lg"
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-6 px-8 text-lg rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                                    onClick={() => navigate('/auto')}
                                >
                                    Obtenir mon devis gratuit
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-slate-600 text-slate-900 bg-transparent text-white hover:bg-slate-800 hover:text-white font-semibold py-6 px-8 text-lg rounded-xl transition-all"
                                    onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Voir nos assurances
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="hidden lg:block relative"
                        >
                            <div className="relative w-full aspect-square max-w-lg mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-2xl opacity-20 transform rotate-3"></div>
                                <motion.div
                                    whileHover={{ rotate: 0 }}
                                    className="absolute inset-0 bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl flex items-center justify-center overflow-hidden transform -rotate-2 transition-transform duration-500"
                                >
                                    <div className="absolute inset-0 bg-slate-800/50 z-10"></div>
                                    <div className="z-20 text-center p-8">
                                        <ShieldCheck className="w-24 h-24 text-emerald-400 mx-auto mb-4" />
                                        <h3 className="text-2xl font-bold text-white mb-2">Protection Complète</h3>
                                        <p className="text-slate-400">Votre sérénité est notre priorité.</p>
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-2xl"></div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2) Section Chiffres Clés (Stats) */}
            <section className="bg-slate-800 py-12 relative z-20 -mt-10 mx-6 rounded-3xl shadow-xl overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <AnimatedCounter value={10000} label="Clients Satisfaits" />
                        <AnimatedCounter value={15} label="Partenaires Assureurs" />
                        <AnimatedCounter value={250} label="€ d'Économie Moyenne" />
                        <AnimatedCounter value={30} label="% d'Économie" />
                    </div>
                </div>
                {/* Animated background lines */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-emerald-400" />
                    <div className="absolute top-0 left-2/4 w-px h-full bg-emerald-400 opacity-50" />
                    <div className="absolute top-0 left-3/4 w-px h-full bg-emerald-400" />
                </div>
            </section>

            {/* 3) Section Nos Produits d'Assurance */}
            <section id="products" className="py-20 lg:py-32 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Nos Solutions d'Assurance</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Découvrez une gamme complète de protections adaptées à vos besoins et à votre budget.</p>
                    </div>

                    {/* Row 1: 3 cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <ProductCard
                            icon={<Car className="w-7 h-7 text-white" />}
                            title="Assurance Auto"
                            desc="Roulez en toute sérénité. Tous profils acceptés : jeune conducteur, malussé, résilié. Économisez jusqu'à 30% sur votre prime actuelle."
                            link="/auto"
                            imageUrl="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80&auto=format&fit=crop"
                            color="from-emerald-900 via-emerald-800/60 to-transparent"
                        />
                        <ProductCard
                            icon={<HomeIcon className="w-7 h-7 text-white" />}
                            title="Assurance Habitation"
                            desc="Protégez votre logement contre le vol, incendie et dégât des eaux. Attestation disponible immédiatement."
                            link="/habitation"
                            imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop"
                            color="from-blue-900 via-blue-800/60 to-transparent"
                        />
                        <ProductCard
                            icon={<Heart className="w-7 h-7 text-white" />}
                            title="Mutuelle Santé"
                            desc="Remboursements optique, dentaire et hospitalisation adaptés à votre situation familiale et à vos besoins réels."
                            link="/sante"
                            imageUrl="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop"
                            color="from-rose-900 via-rose-800/60 to-transparent"
                        />
                    </div>

                    {/* Row 2: 2 wider cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <ProductCard
                            icon={<Dog className="w-7 h-7 text-white" />}
                            title="Assurance Animaux"
                            desc="Couvrez les frais vétérinaires de votre chien, chat ou NAC jusqu'à 100% des dépenses. Prise en charge rapide."
                            link="/animaux"
                            imageUrl="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80&auto=format&fit=crop"
                            color="from-amber-900 via-amber-800/60 to-transparent"
                        />
                        <ProductCard
                            icon={<Briefcase className="w-7 h-7 text-white" />}
                            title="RC Professionnelle"
                            desc="Indépendants, artisans, consultants et TPE/PME : protégez votre activité avec une RC Pro sur mesure."
                            link="/rc-pro"
                            imageUrl="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&auto=format&fit=crop"
                            color="from-indigo-900 via-indigo-800/60 to-transparent"
                        />
                    </div>
                </div>
            </section>

            {/* 4) Section Comment ça marche ? (Visual Steps) */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-16">Comment ça marche ?</h2>
                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-slate-100 z-0" />

                        {[
                            { icon: <Search className="w-8 h-8" />, title: "Comparez", desc: "Remplissez notre formulaire en 2 minutes pour voir les meilleures offres.", step: 1 },
                            { icon: <Handshake className="w-8 h-8" />, title: "Choisissez", desc: "Sélectionnez le contrat qui correspond parfaitement à vos besoins et budget.", step: 2 },
                            { icon: <Rocket className="w-8 h-8" />, title: "Économisez", desc: "Validez votre contrat en ligne et commencez à économiser immédiatement.", step: 3 }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                className="relative z-10 flex flex-col items-center"
                            >
                                <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl">
                                    {item.icon}
                                </div>
                                <div className="absolute -top-2 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 max-w-xs">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5) Section Compagnies Partenaires */}
            <section className="py-16 bg-slate-50 border-y border-slate-100 overflow-hidden">
                <div className="container mx-auto px-6 text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Plus de 50 partenaires de confiance</h2>
                    <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest opacity-60 font-semibold italic">Nous comparons pour vous en toute indépendance</p>
                </div>
                <LogoCarousel />
            </section>

            {/* 6) Section Pourquoi Nous Choisir ? */}
            <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-outfit uppercase">Pourquoi AssurConnect ?</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureBlock
                            icon={<PiggyBank className="w-8 h-8 text-emerald-400" />}
                            title="Comparaison gratuite"
                            desc="Un service 100% gratuit et sans engagement pour trouver la meilleure offre."
                        />
                        <FeatureBlock
                            icon={<UserCheck className="w-8 h-8 text-blue-400" />}
                            title="Conseiller dédié"
                            desc="Des experts basés en France pour vous accompagner dans votre choix."
                        />
                        <FeatureBlock
                            icon={<ShieldCheck className="w-8 h-8 text-purple-400" />}
                            title="Économies garanties"
                            desc="En moyenne, nos clients économisent 250€ sur leurs contrats annuels."
                        />
                        <FeatureBlock
                            icon={<Clock className="w-8 h-8 text-amber-400" />}
                            title="Souscription rapide"
                            desc="Obtenez votre contrat par email en quelques minutes après validation."
                        />
                    </div>
                </div>
            </section>

            {/* 7) Section FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Questions fréquentes</h2>
                    <div className="space-y-2">
                        <FAQItem
                            question="Le service AssurConnect est-il gratuit ?"
                            answer="Oui, notre service de comparaison est 100% gratuit pour vous. Nous sommes rémunérés par nos partenaires assureurs sans aucun impact sur le prix final de votre contrat."
                        />
                        <FAQItem
                            question="Quels documents sont nécessaires pour souscrire ?"
                            answer="Selon le type d'assurance, il vous faudra généralement une pièce d'identité, un RIB, et potentiellement votre dernier relevé d'information pour l'assurance auto."
                        />
                        <FAQItem
                            question="En combien de temps reçois-je mes devis ?"
                            answer="C'est instantané ! Dès que vous validez notre formulaire, vous accédez aux meilleures offres disponibles sur le marché."
                        />
                        <FAQItem
                            question="Comment sont protégées mes données ?"
                            answer="La sécurité de vos données est notre priorité. Toutes vos informations sont cryptées et traitées conformément à la réglementation européenne (RGPD)."
                        />
                    </div>
                </div>
            </section>

            {/* 8) Section Avis Clients */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Ce que disent nos clients</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <ReviewCard
                            name="Sophie M."
                            rating={5}
                            text="Service impeccable ! J'ai économisé 250€ sur mon assurance auto en quelques clics."
                        />
                        <ReviewCard
                            name="Thomas D."
                            rating={5}
                            text="Très bon suivi, mon conseiller a été très réactif et m'a trouvé ma mutuelle idéale."
                        />
                        <ReviewCard
                            name="Julie L."
                            rating={5}
                            text="Simple, rapide et efficace. Je recommande vivement pour l'assurance habitation."
                        />
                    </div>
                </div>
            </section>

            {/* 9) Final CTA Section */}
            <section className="py-20 bg-emerald-500 text-white text-center relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-3xl lg:text-5xl font-extrabold mb-6">Prêt à économiser ?</h2>
                    <p className="text-xl mb-10 text-emerald-50 max-w-2xl mx-auto">Rejoignez des milliers de Français qui font confiance à AssurConnect pour leurs assurances.</p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Button
                            size="lg"
                            className="bg-white text-emerald-600 hover:bg-slate-100 font-bold py-8 px-12 text-xl rounded-2xl shadow-2xl transition-all"
                            onClick={() => navigate('/auto')}
                        >
                            Démarrer mon comparatif gratuit
                        </Button>
                    </motion.div>
                </div>
                {/* Decorative background circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/10 rounded-full blur-[120px] z-0" />
            </section>
        </div>
    );
}

