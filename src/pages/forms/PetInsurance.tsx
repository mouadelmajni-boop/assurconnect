import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dog, CheckCircle, ShieldCheck, Clock, ThumbsUp } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { LeadService } from "@/lib/leads";

const formSchema = z.object({
    lastName: z.string().min(2, "Le nom est requis"),
    firstName: z.string().min(2, "Le prénom est requis"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(10, "Numéro de téléphone invalide"),
    zipCode: z.string().min(5, "Code postal invalide"),
    animalType: z.string().min(1, "Type d'animal requis"),
    breed: z.string().min(2, "Race requise"),
    age: z.string().min(1, "Âge requis"),
    medicalHistory: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, "Vous devez accepter les conditions"),
});

type FormData = z.infer<typeof formSchema>;

export default function PetInsurance() {
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
            type: 'animaux',
            data: data,
        });

        setSubmitted(true);
        window.scrollTo(0, 0);
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <Helmet>
                    <title>Confirmation - Assurance Animaux | AssurConnect</title>
                </Helmet>
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-amber-100">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Demande reçue !</h2>
                    <p className="text-slate-600 mb-8">
                        Merci {watch('firstName')}. Votre demande de devis pour votre animal a bien été enregistrée.
                        Un conseiller va vous recontacter rapidement.
                    </p>
                    <Button onClick={() => window.location.href = '/'} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                        Retour à l'accueil
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <Helmet>
                <title>Devis Assurance Animaux (Chien/Chat) | AssurConnect</title>
                <meta name="description" content="Assurez la santé de votre chien ou chat. Remboursement des frais vétérinaires jusqu'à 100%." />
            </Helmet>

            {/* Hero Section */}
            <div className="relative w-full h-72 md:h-96 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1400&q=80&auto=format&fit=crop"
                    alt="Assurance Animaux"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-full px-4 py-1.5 mb-4">
                                <Dog className="w-4 h-4 text-amber-400" />
                                <span className="text-amber-300 text-sm font-medium">Assurance Animaux</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Prenez soin de votre compagnon</h1>
                            <p className="text-slate-300 text-base md:text-lg mb-6">
                                Chien, chat ou NAC — les frais vétérinaires peuvent être élevés. Avec notre assurance animaux, couvrez les soins, opérations et urgences jusqu'à <strong className="text-amber-400">100% des frais</strong>.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                                    <span className="text-white text-sm">Frais vétérinaires couverts</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <Clock className="w-4 h-4 text-amber-400" />
                                    <span className="text-white text-sm">Prise en charge rapide</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <ThumbsUp className="w-4 h-4 text-amber-400" />
                                    <span className="text-white text-sm">Chien, Chat & NAC</span>
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
                            <CardTitle className="text-xl">Votre Animal</CardTitle>
                            <CardDescription className="text-slate-300">
                                Informations sur votre compagnon.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8 pt-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                {/* Personal Info */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Nom du propriétaire</Label>
                                        <Input id="lastName" placeholder="Dupont" {...register("lastName")} />
                                        {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Prénom du propriétaire</Label>
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
                                    <Label htmlFor="zipCode">Code Postal</Label>
                                    <Input id="zipCode" placeholder="75001" {...register("zipCode")} />
                                    {errors.zipCode && <p className="text-red-500 text-xs">{errors.zipCode.message}</p>}
                                </div>

                                <div className="border-t border-slate-100 my-6"></div>

                                {/* Animal Info */}
                                <div className="space-y-2">
                                    <Label htmlFor="animalType">Type d'animal</Label>
                                    <Select onValueChange={(val) => setValue("animalType", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chien, Chat..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="chien">Chien</SelectItem>
                                            <SelectItem value="chat">Chat</SelectItem>
                                            <SelectItem value="nac">NAC (Lapin, etc.)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.animalType && <p className="text-red-500 text-xs">{errors.animalType.message}</p>}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="breed">Race</Label>
                                        <Input id="breed" placeholder="Ex: Labrador" {...register("breed")} />
                                        {errors.breed && <p className="text-red-500 text-xs">{errors.breed.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="age">Âge (années)</Label>
                                        <Input id="age" type="number" placeholder="3" {...register("age")} />
                                        {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="medicalHistory">Antécédents médicaux (Optionnel)</Label>
                                    <Textarea
                                        id="medicalHistory"
                                        placeholder="Maladies chroniques, opérations passées..."
                                        {...register("medicalHistory")}
                                    />
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

                                <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 text-lg" disabled={isSubmitting}>
                                    {isSubmitting ? "Envoi en cours..." : "Protéger mon animal"}
                                </Button>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
