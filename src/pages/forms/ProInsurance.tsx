import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Briefcase, CheckCircle, ShieldCheck, Clock, ThumbsUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { LeadService } from "@/lib/leads";

const formSchema = z.object({
    lastName: z.string().min(2, "Le nom est requis"),
    firstName: z.string().min(2, "Le prénom est requis"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(10, "Numéro de téléphone invalide"),
    companyName: z.string().min(2, "Nom de l'entreprise requis"),
    activity: z.string().min(2, "Activité requise"),
    turnover: z.string().min(1, "Chiffre d'affaires requis"),
    workforce: z.string().min(1, "Effectif requis"),
    consent: z.boolean().refine((val) => val === true, "Vous devez accepter les conditions"),
});

type FormData = z.infer<typeof formSchema>;

export default function ProInsurance() {
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            consent: false,
        },
    });

    const onSubmit = async (data: FormData) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        LeadService.save({
            type: 'rc-pro',
            data: data,
        });

        setSubmitted(true);
        window.scrollTo(0, 0);
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <Helmet>
                    <title>Confirmation - RC Pro | AssurConnect</title>
                </Helmet>
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-indigo-100">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Demande reçue !</h2>
                    <p className="text-slate-600 mb-8">
                        Merci {watch('firstName')}. Votre demande de devis RC Pro a bien été enregistrée.
                        Un conseiller pro va vous recontacter.
                    </p>
                    <Button onClick={() => window.location.href = '/'} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
                        Retour à l'accueil
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <Helmet>
                <title>Devis Assurance Responsabilité Civile Professionnelle (RC Pro) | AssurConnect</title>
                <meta name="description" content="Protégez votre activité avec une RC Pro adaptée. Devis gratuit pour indépendants, TPE et PME." />
            </Helmet>

            {/* Hero Section */}
            <div className="relative w-full h-72 md:h-96 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80&auto=format&fit=crop"
                    alt="Assurance Professionnelle"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-4 py-1.5 mb-4">
                                <Briefcase className="w-4 h-4 text-indigo-400" />
                                <span className="text-indigo-300 text-sm font-medium">Assurance Pro / RC Pro</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Protégez votre activité professionnelle</h1>
                            <p className="text-slate-300 text-base md:text-lg mb-6">
                                Indépendant, artisan, consultant ou gérant de TPE/PME — notre RC Pro vous protège contre les dommages causés à vos clients. Devis adapté à <strong className="text-indigo-400">votre secteur</strong>.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                                    <span className="text-white text-sm">RC Pro & Décennale</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <Clock className="w-4 h-4 text-indigo-400" />
                                    <span className="text-white text-sm">Devis sous 24h</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <ThumbsUp className="w-4 h-4 text-indigo-400" />
                                    <span className="text-white text-sm">TNS & PME bienvenus</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">

                    <Card className="border-slate-200 shadow-xl">
                        <CardHeader className="bg-slate-900 text-white rounded-t-xl py-6">
                            <CardTitle className="text-xl">Votre Entreprise</CardTitle>
                            <CardDescription className="text-slate-300">
                                Parlez-nous de votre activité.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8 pt-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                {/* Personal Info */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Nom</Label>
                                        <Input id="lastName" placeholder="Dupont" {...register("lastName")} />
                                        {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Prénom</Label>
                                        <Input id="firstName" placeholder="Jean" {...register("firstName")} />
                                        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="jean.dupont@entreprise.com" {...register("email")} />
                                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <Input id="phone" type="tel" placeholder="06 12 34 56 78" {...register("phone")} />
                                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 my-6"></div>

                                {/* Company Info */}
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Nom de l'entreprise (ou Raison Sociale)</Label>
                                    <Input id="companyName" placeholder="Ma Société SAS" {...register("companyName")} />
                                    {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="activity">Activité principale</Label>
                                    <Input id="activity" placeholder="Ex: Consultant informatique, Boulangerie..." {...register("activity")} />
                                    {errors.activity && <p className="text-red-500 text-xs">{errors.activity.message}</p>}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="turnover">Chiffre d'Affaires prévisionnel (€)</Label>
                                        <Select onValueChange={(val) => setValue("turnover", val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionnez..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0_50k">&lt; 50 000 €</SelectItem>
                                                <SelectItem value="50_150k">50k - 150k €</SelectItem>
                                                <SelectItem value="150_500k">150k - 500k €</SelectItem>
                                                <SelectItem value="500k_plus">&gt; 500 000 €</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.turnover && <p className="text-red-500 text-xs">{errors.turnover.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="workforce">Effectif</Label>
                                        <Select onValueChange={(val) => setValue("workforce", val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionnez..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="solo">Solo (TNS)</SelectItem>
                                                <SelectItem value="1_5">1 - 5 salariés</SelectItem>
                                                <SelectItem value="5_10">5 - 10 salariés</SelectItem>
                                                <SelectItem value="10_plus">10+ salariés</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.workforce && <p className="text-red-500 text-xs">{errors.workforce.message}</p>}
                                    </div>
                                </div>

                                <div className="flex items-start space-x-2 pt-4">
                                    <Checkbox
                                        id="consent"
                                        onCheckedChange={(checked) => setValue("consent", checked as boolean)}
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                            htmlFor="consent"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            J'accepte d'être recontacté(e) pour recevoir mon devis gratuit.
                                        </label>
                                        <p className="text-xs text-slate-500">
                                            Vos données sont sécurisées.
                                        </p>
                                    </div>
                                </div>
                                {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

                                <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-6 text-lg" disabled={isSubmitting}>
                                    {isSubmitting ? "Envoi en cours..." : "Voir les tarifs"}
                                </Button>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
