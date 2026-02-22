
const partners = [
    {
        name: "AXA",
        logoUrl: "https://logo.clearbit.com/axa.com",
        fallbackText: "AXA",
    },
    {
        name: "Allianz",
        logoUrl: "https://logo.clearbit.com/allianz.com",
        fallbackText: "Allianz",
    },
    {
        name: "Generali",
        logoUrl: "https://logo.clearbit.com/generali.com",
        fallbackText: "Generali",
    },
    {
        name: "Swiss Life",
        logoUrl: "https://logo.clearbit.com/swisslife.com",
        fallbackText: "Swiss Life",
    },
    {
        name: "Malakoff Humanis",
        logoUrl: "https://logo.clearbit.com/malakoffhumanis.com",
        fallbackText: "Malakoff Humanis",
    },
    {
        name: "Solly Azar",
        logoUrl: "https://logo.clearbit.com/sollyazar.com",
        fallbackText: "Solly Azar",
    },
    {
        name: "Néoliane",
        logoUrl: "https://logo.clearbit.com/neoliane.fr",
        fallbackText: "Néoliane",
    },
    {
        name: "ECA Assurances",
        logoUrl: "https://logo.clearbit.com/eca-assurances.fr",
        fallbackText: "ECA",
    },
    {
        name: "AFPS",
        logoUrl: "https://logo.clearbit.com/afps.fr",
        fallbackText: "AFPS",
    },
];

interface LogoItemProps {
    partner: typeof partners[0];
    index: number;
}

const LogoItem = ({ partner, index }: LogoItemProps) => {
    return (
        <div
            key={index}
            className="flex flex-col items-center justify-center mx-12 min-w-[160px] group transition-all duration-300"
        >
            <div className="flex items-center justify-center h-16 w-40 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500">
                <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-14 max-w-[140px] w-auto h-auto object-contain"
                    onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                    }}
                />
                {/* Fallback text if logo fails to load */}
                <span
                    className="hidden text-xl font-black tracking-tighter text-slate-600"
                    style={{ display: 'none' }}
                >
                    {partner.fallbackText}
                </span>
            </div>
            <div className="h-0.5 w-0 group-hover:w-3/4 bg-blue-400 transition-all duration-500 mt-2 opacity-50 rounded-full"></div>
        </div>
    );
};

export const LogoCarousel = () => {
    const duplicatedPartners = [...partners, ...partners, ...partners];

    return (
        <div className="relative w-full overflow-hidden bg-white py-12">
            {/* Background Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white pointer-events-none"></div>

            {/* Side Fade Overlays */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div>

            <div className="flex animate-marquee whitespace-nowrap items-center py-4">
                {duplicatedPartners.map((partner, index) => (
                    <LogoItem key={index} partner={partner} index={index} />
                ))}
            </div>

            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
};
