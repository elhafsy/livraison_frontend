import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader, Package } from "lucide-react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRegisterMutation } from '../../api/authApi';


const formSchema = z.object({
  nom: z.string().min(2),
  email: z.string().min(2).max(50),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"], // Cela affiche le message sur le champ "confirmPassword"
});

// Validation du formulaire avec zod
export default function Register() {
  // const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Ajout de l'état pour le message de succès
  const navigate = useNavigate();
  const [registerUser, {isLoading, error}] = useRegisterMutation()


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { setError, formState: { isSubmitting } } = form;

  const onSubmit = async (values) => {
    try{
      const res = await registerUser({
        nom:values.nom, email:values.email, password:values.password
      }).unwrap()
      console.log("Insritpiuuon réussie : ", res);
      setRegistrationSuccess(true)
      // navigate("/login")
      
    }catch(err){
      console.log(err);
      if(err.data && err.data){
        setError("email",{type:"manual",message:err.data})
      }
    }
    // setIsLoading(true);
    // await LoginApi.register(values.nom, values.email, values.password)
    //   .then(res => {
    //     console.log(res);
    //     setRegistrationSuccess(true); // Mise à jour de l'état pour afficher le message de succès
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     const response = err.response;
    //     setIsLoading(false);
    //     // Gérer les erreurs ici si nécessaire
    //   });
  };

  if (registrationSuccess) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <Card className="bg-white p-6 rounded-lg shadow-md">
          <CardContent>
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-semibold text-green-600">Votre compte a été créé avec succès !</h2>
              <p className="text-gray-600 mt-4">Il est en attente de validation.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div data-aos="fade-right" className="flex flex-col lg:flex-row items-center gap-6 p-4 h-screen">
      {/* Section Brand - Delivery App Theme */}
      <div className="flex flex-col justify-center items-center lg:w-2/3 bg-gradient-to-br from-green-600 to-emerald-700 p-8 relative rounded-lg">
        <div className="absolute inset-0 opacity-20 bg-[url('/pattern.png')] bg-repeat"></div>
        <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
          <img
            src="liv1.jpg"
            className="h-48 md:w-64 md:h-64 rounded-lg shadow-xl object-contain block mx-auto mb-8"
            alt="delivery-app-logo"
          />
          
          <div className="flex flex-col md:flex-row justify-between gap-4 w-full mb-8">
            {/* Cards pour les services */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white flex-1">
              <CardContent className="p-4 flex flex-col items-center">
                <Package className="h-8 w-8 mb-2" />
                <p className="text-center text-sm font-medium">Inscription Facile</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white w-full">
            <CardContent className="p-6">
              <p className="text-center font-medium">
                Rejoignez-nous maintenant pour une expérience de livraison rapide et fluide.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Register Form Section */}
      <div className="flex flex-col justify-center items-center lg:w-1/3 dark:bg-gray-900 p-4 rounded-lg shadow-lg">
        <div className="text-2xl font-bold inline-flex items-center text-gray-900 dark:text-white mb-6">
          <span className="border-b-4 border-green-600 font-mono italic">
            Express
          </span>{" "}
          <span className="text-green-600 ms-2 font-mono italic border-b-4 border-gray-900 dark:border-white">
            Delivery
          </span>
        </div>

        <Form {...form}>
          <Card className="w-full max-w-md shadow-xl border-green-100 dark:border-green-900/30">
            <CardHeader className="space-y-1 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-t-lg">
              <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-white">S'inscrire</CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                Créez un compte pour commencer à utiliser notre service
              </CardDescription>
              <Separator className="my-2 bg-green-200 dark:bg-green-800" />
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Nom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="votre nom"
                          className="h-10 focus-visible:ring-green-500 dark:border-gray-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="votre@email.com"
                          className="h-10 focus-visible:ring-green-500 dark:border-gray-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="h-10 focus-visible:ring-green-500 dark:border-gray-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Confirmer le mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirmez votre mot de passe"
                          className="h-10 focus-visible:ring-green-500 dark:border-gray-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  type="submit"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      <span>Inscription...</span>
                    </div>
                  ) : (
                    "S'inscrire"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Form>
      </div>
    </div>
  );
}
