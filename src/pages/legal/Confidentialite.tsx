import { Helmet } from "react-helmet-async";

export default function Confidentialite() {
    return (
        <div className="bg-slate-50 py-12 min-h-screen">
            <Helmet>
                <title>Politique de Confidentialité | AssurConnect</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Politique de Confidentialité</h1>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-8 text-slate-700">

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">1. Collecte des données</h2>
                        <p>
                            Nous collectons les données que vous nous transmettez via nos formulaires de demande de devis
                            (nom, prénom, email, téléphone, détails sur votre situation) afin de vous fournir les services demandés.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">2. Utilisation des données</h2>
                        <p>
                            Vos données sont utilisées pour :
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>L'établissement de devis d'assurance personnalisés.</li>
                            <li>La mise en relation avec nos partenaires assureurs.</li>
                            <li>La gestion de notre relation client.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">3. Transmission aux tiers</h2>
                        <p>
                            Dans le cadre de votre demande de comparaison, vos données peuvent être transmises à nos partenaires assureurs
                            afin qu'ils puissent étudier votre dossier et vous proposer une offre.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">4. Vos droits</h2>
                        <p>
                            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données.
                            Pour exercer ces droits, vous pouvez nous contacter à : dpo@assurcompar.com
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">5. Cookies</h2>
                        <p>
                            Nous utilisons des cookies pour améliorer votre expérience utilisateur et réaliser des statistiques de visites.
                            Vous pouvez configurer vos préférences via notre bandeau cookie.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
