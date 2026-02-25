
const partners = [
    {
        name: "AXA",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/AXA_Logo.svg/1024px-AXA_Logo.svg.png",
        fallbackText: "AXA",
    },
    {
        name: "Allianz",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Allianz.svg/1024px-Allianz.svg.png",
        fallbackText: "Allianz",
    },
    {
        name: "Generali",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Generali_logo_2016.svg/1024px-Generali_logo_2016.svg.png",
        fallbackText: "Generali",
    },
    {
        name: "Swiss Life",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Swiss_Life_logo.svg/1024px-Swiss_Life_logo.svg.png",
        fallbackText: "Swiss Life",
    },
    {
        name: "Malakoff Humanis",
        logoUrl: "https://www.malakoffhumanis.com/medias/Malakoff-Humanis-logo.svg",
        fallbackText: "Malakoff Humanis",
    },
    {
        name: "April",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/April_Logo_2022.svg/1024px-April_Logo_2022.svg.png",
        fallbackText: "April",
    },
    {
        name: "Néoliane",
        logoUrl: "https://www.neoliane.fr/wp-content/uploads/2021/06/logo_neoliane.png",
        fallbackText: "Néoliane",
    },
    {
        name: "ECA Assurances",
        logoUrl: "https://www.eca-assurances.fr/assets/img/logo-eca.png",
        fallbackText: "ECA",
    },
    {
        name: "Groupama",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Logo_Groupama_2016.svg/1024px-Logo_Groupama_2016.svg.png",
        fallbackText: "Groupama",
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
