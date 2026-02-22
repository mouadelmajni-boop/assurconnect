import { Helmet } from "react-helmet-async";

export default function MentionsLegales() {
    return (
        <div className="bg-slate-50 py-12 min-h-screen">
            <Helmet>
                <title>Mentions Légales | AssurConnect</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Mentions Légales</h1>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-8 text-slate-700">

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">1. Éditeur du site</h2>
                        <p>
                            Le site <strong>AssurConnect</strong> est édité par :<br />
                            <strong>AssurConnect SARL</strong><br />
                            Au capital de 10 000 €<br />
                            RCS Paris B 123 456 789<br />
                            Siège social : 123 Avenue des Champs-Élysées, 75008 Paris<br />
                            Directeur de la publication : Jean Directeur
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">2. Hébergement</h2>
                        <p>
                            Le site est hébergé par :<br />
                            <strong>Vercel Inc.</strong><br />
                            340 S Lemon Ave #4133 Walnut, CA 91789, USA
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">3. Propriété intellectuelle</h2>
                        <p>
                            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">4. Responsabilité</h2>
                        <p>
                            Les informations fournies sur AssurConnect le sont à titre indicatif.
                            L'éditeur ne saurait garantir l'exactitude, la complétude, l'actualité des informations diffusées sur le site.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
