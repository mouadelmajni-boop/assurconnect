import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Car, CheckCircle, ShieldCheck, Clock, ThumbsUp } from "lucide-react";
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
    zipCode: z.string().min(5, "Code postal invalide"),
    birthDate: z.string().min(1, "Date de naissance requise"),
    vehicleType: z.string().min(1, "Type de véhicule requis"),
    licenseDate: z.string().min(1, "Date de permis requise"),
    bonusMalus: z.string().min(1, "Bonus/Malus requis"),
    situation: z.string().min(1, "Situation requise"),
    consent: z.boolean().refine((val) => val === true, "Vous devez accepter les conditions"),
});

type FormData = z.infer<typeof formSchema>;

export default function AutoInsurance() {
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
            type: 'auto',
            data: data,
        });

        setSubmitted(true);
        window.scrollTo(0, 0);
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <Helmet>
                    <title>Confirmation - Assurance Auto | AssurConnect</title>
                </Helmet>
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-emerald-100">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Demande reçue !</h2>
                    <p className="text-slate-600 mb-8">
                        Merci {watch('firstName')}. Votre demande de devis auto a bien été enregistrée.
                        Un conseiller va vous recontacter rapidement pour vous proposer les meilleures offres.
                    </p>
                    <Button onClick={() => window.location.href = '/'} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                        Retour à l'accueil
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <Helmet>
                <title>Devis Assurance Auto Pas Cher | Comparateur AssurConnect</title>
                <meta name="description" content="Comparez les assurances auto et économisez jusqu'à 30%. Devis gratuit en ligne pour tous profils : jeune conducteur, malussé, résilié." />
            </Helmet>

            {/* Hero Section */}
            <div className="relative w-full h-72 md:h-96 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80&auto=format&fit=crop"
                    alt="Assurance Auto"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 mb-4">
                                <Car className="w-4 h-4 text-emerald-400" />
                                <span className="text-emerald-300 text-sm font-medium">Assurance Auto</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Roulez en toute sérénité</h1>
                            <p className="text-slate-300 text-base md:text-lg mb-6">
                                Comparez en 2 minutes les meilleures offres d'assurance auto adaptées à votre profil et à votre véhicule. Économisez jusqu'à <strong className="text-emerald-400">30%</strong> sur votre prime.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                    <span className="text-white text-sm">Tous profils acceptés</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <Clock className="w-4 h-4 text-emerald-400" />
                                    <span className="text-white text-sm">Réponse en 24h</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <ThumbsUp className="w-4 h-4 text-emerald-400" />
                                    <span className="text-white text-sm">Devis 100% gratuit</span>
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
                            <CardTitle className="text-xl">Vos informations</CardTitle>
                            <CardDescription className="text-slate-300">
                                Tous les champs sont obligatoires pour un devis précis.
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
                                        <Input id="email" type="email" placeholder="jean.dupont@email.com" {...register("email")} />
                                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <Input id="phone" type="tel" placeholder="06 12 34 56 78" {...register("phone")} />
                                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="birthDate">Date de naissance</Label>
                                        <Input id="birthDate" type="date" {...register("birthDate")} />
                                        {errors.birthDate && <p className="text-red-500 text-xs">{errors.birthDate.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zipCode">Code Postal</Label>
                                        <Input id="zipCode" placeholder="75001" {...register("zipCode")} />
                                        {errors.zipCode && <p className="text-red-500 text-xs">{errors.zipCode.message}</p>}
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 my-6"></div>

                                {/* Driving Info */}
                                <div className="space-y-2">
                                    <Label htmlFor="vehicleType">Type de véhicule</Label>
                                    <Select onValueChange={(val) => setValue("vehicleType", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="citadine">Citadine</SelectItem>
                                            <SelectItem value="berline">Berline</SelectItem>
                                            <SelectItem value="suv">SUV / 4x4</SelectItem>
                                            <SelectItem value="sportive">Voiture de sport</SelectItem>
                                            <SelectItem value="utilitaire">Utilitaire</SelectItem>
                                            <SelectItem value="sans_permis">Voiture sans permis</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.vehicleType && <p className="text-red-500 text-xs">{errors.vehicleType.message}</p>}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="licenseDate">Date d'obtention du permis</Label>
                                        <Input id="licenseDate" type="date" {...register("licenseDate")} />
                                        {errors.licenseDate && <p className="text-red-500 text-xs">{errors.licenseDate.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bonusMalus">Bonus / Malus</Label>
                                        <Select onValueChange={(val) => setValue("bonusMalus", val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Coefficient..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0.50">0.50 (Max Bonus)</SelectItem>
                                                <SelectItem value="0.60">0.60</SelectItem>
                                                <SelectItem value="0.70">0.70</SelectItem>
                                                <SelectItem value="0.80">0.80</SelectItem>
                                                <SelectItem value="0.90">0.90</SelectItem>
                                                <SelectItem value="1.00">1.00 (Neutre)</SelectItem>
                                                <SelectItem value="1.25">1.25 (Malus)</SelectItem>
                                                <SelectItem value="driver_novice">Jeune conducteur</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.bonusMalus && <p className="text-red-500 text-xs">{errors.bonusMalus.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="situation">Situation du véhicule</Label>
                                    <Select onValueChange={(val) => setValue("situation", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Vous êtes..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="proprietaire">Propriétaire</SelectItem>
                                            <SelectItem value="locataire_loa_lld">Locataire (LOA / LLD)</SelectItem>
                                            <SelectItem value="conducteur_secondaire">Conducteur secondaire</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.situation && <p className="text-red-500 text-xs">{errors.situation.message}</p>}
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
                                            Vos données sont sécurisées et utilisées uniquement pour votre devis.
                                        </p>
                                    </div>
                                </div>
                                {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

                                <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-6 text-lg" disabled={isSubmitting}>
                                    {isSubmitting ? "Envoi en cours..." : "Recevoir mon devis gratuit"}
                                </Button>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
