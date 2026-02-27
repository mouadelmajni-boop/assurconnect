import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Home, CheckCircle, ShieldCheck, Clock, ThumbsUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { LogoCarousel } from "@/components/home/LogoCarousel";
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
    housingType: z.string().min(1, "Type de logement requis"),
    surface: z.string().min(1, "Surface requise"),
    status: z.string().min(1, "Statut requis"),
    consent: z.boolean().refine((val) => val === true, "Vous devez accepter les conditions"),
});

type FormData = z.infer<typeof formSchema>;

export default function HomeInsurance() {
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
            type: 'habitation',
            data: data,
        });

        setSubmitted(true);
        window.scrollTo(0, 0);
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <Helmet>
                    <title>Confirmation - Assurance Habitation | AssurConnect</title>
                </Helmet>
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Demande reçue !</h2>
                    <p className="text-slate-600 mb-8">
                        Merci {watch('firstName')}. Votre demande de devis habitation a bien été enregistrée.
                        Un conseiller va vous recontacter rapidement.
                    </p>
                    <Button onClick={() => window.location.href = '/'} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                        Retour à l'accueil
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <Helmet>
                <title>Devis Assurance Habitation (MRH) | Comparateur AssurConnect</title>
                <meta name="description" content="Protégez votre logement au meilleur prix. Comparez les assurances habitation (MRH) pour locataire et propriétaire." />
            </Helmet>

            {/* Hero Section */}
            <div className="relative w-full h-72 md:h-96 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80&auto=format&fit=crop"
                    alt="Assurance Habitation"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-4">
                                <Home className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-300 text-sm font-medium">Assurance Habitation</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Protégez votre chez-vous</h1>
                            <p className="text-slate-300 text-base md:text-lg mb-6">
                                Locataire ou propriétaire, trouvez une assurance MRH complète qui couvre incendie, dégât des eaux, vol et responsabilité civile au <strong className="text-blue-400">meilleur prix</strong>.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                                    <span className="text-white text-sm">Locataire & Propriétaire</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    <span className="text-white text-sm">Attestation immédiate</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <ThumbsUp className="w-4 h-4 text-blue-400" />
                                    <span className="text-white text-sm">Devis gratuit & rapide</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LogoCarousel />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">

                    <Card className="border-slate-200 shadow-xl">
                        <CardHeader className="bg-slate-900 text-white rounded-t-xl py-6">
                            <CardTitle className="text-xl">Votre Logement</CardTitle>
                            <CardDescription className="text-slate-300">
                                Informations nécessaires pour calculer votre prime.
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

                                <div className="space-y-2">
                                    <Label htmlFor="zipCode">Code Postal du logement</Label>
                                    <Input id="zipCode" placeholder="75001" {...register("zipCode")} />
                                    {errors.zipCode && <p className="text-red-500 text-xs">{errors.zipCode.message}</p>}
                                </div>

                                <div className="border-t border-slate-100 my-6"></div>

                                {/* Housing Info */}
                                <div className="space-y-2">
                                    <Label htmlFor="housingType">Type de logement</Label>
                                    <Select onValueChange={(val) => setValue("housingType", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="appartement">Appartement</SelectItem>
                                            <SelectItem value="maison">Maison</SelectItem>
                                            <SelectItem value="studio">Studio</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.housingType && <p className="text-red-500 text-xs">{errors.housingType.message}</p>}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="surface">Surface (m²)</Label>
                                        <Input id="surface" type="number" placeholder="50" {...register("surface")} />
                                        {errors.surface && <p className="text-red-500 text-xs">{errors.surface.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Votre statut</Label>
                                        <Select onValueChange={(val) => setValue("status", val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionnez..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="locataire">Locataire</SelectItem>
                                                <SelectItem value="proprietaire_occupant">Propriétaire Occupant</SelectItem>
                                                <SelectItem value="proprietaire_non_occupant">Propriétaire Non Occupant (PNO)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
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

                                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 text-lg" disabled={isSubmitting}>
                                    {isSubmitting ? "Envoi en cours..." : "Comparer les offres"}
                                </Button>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
