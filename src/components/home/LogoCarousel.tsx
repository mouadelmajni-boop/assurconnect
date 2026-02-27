
const partners = [
    {
        name: "AXA",
        logoUrl: "/logos/axa.png",
        fallbackText: "AXA",
    },
    {
        name: "Solly Azar",
        logoUrl: "/logos/solly_azar.png",
        fallbackText: "Solly Azar",
    },
    {
        name: "Néoliane",
        logoUrl: "/logos/neoliane.png",
        fallbackText: "Néoliane",
    },
    {
        name: "Cofidis",
        logoUrl: "/logos/cofidis.jpg",
        fallbackText: "Cofidis",
    },
    {
        name: "Maxance",
        logoUrl: "/logos/maxance.jpg",
        fallbackText: "Maxance",
    },
    {
        name: "AssuréO",
        logoUrl: "/logos/assureo.png",
        fallbackText: "AssuréO",
    },
    {
        name: "Active Assurances",
        logoUrl: "/logos/active_assurances.jpg",
        fallbackText: "Active Assurances",
    },
    {
        name: "April",
        logoUrl: "/logos/april.png",
        fallbackText: "April",
    },
    {
        name: "Assu 2000",
        logoUrl: "/logos/assu2000.png",
        fallbackText: "Assu 2000",
    },
    {
        name: "FMA Assurances",
        logoUrl: "/logos/fma.png",
        fallbackText: "FMA",
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
            <div className="flex items-center justify-center h-16 w-40 opacity-100 group-hover:scale-110 transition-all duration-500">
                <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-12 max-w-[130px] w-auto h-auto object-contain"
                    onError={(e) => {
                        // Hide the entire container to prevent blank spaces
                        const target = e.currentTarget;
                        const container = target.closest('.group') as HTMLElement;
                        if (container) {
                            container.style.display = 'none';
                        } else {
                            target.style.display = 'none';
                        }
                    }}
                />
            </div>
            <div className="h-0.5 w-0 group-hover:w-3/4 bg-emerald-400 transition-all duration-500 mt-2 opacity-100 rounded-full"></div>
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
