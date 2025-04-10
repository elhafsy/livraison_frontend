import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from '../../hooks/use-toast';

import { useGetInfoClientQuery, useRegisterInfoClientMutation } from '../../api/client/clientApi';
import { useGetUserQuery } from '../../api/authApi';


import { 
  DASHBOARD_ADMIN_ROUTE,
  DASHBOARD_CLIENT_ROUTE,
  DASHBOARD_LIVREUR_ROUTE,
  REGISTERINFO_ROUTE
} from '../../router';


const formSchema = z.object({
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  phoneNumber: z.string().min(10, "Le numéro de téléphone doit être valide"),
  city: z.string().min(2, "La ville doit contenir au moins 2 caractères"),
  postalCode: z.string().min(5, "Le code postal doit contenir au moins 5 caractères"),
  defaultPaymentMethod: z.string(),
});

const paymentMethods = [
  { id: "1", name: "Carte de crédit" },
  { id: "2", name: "PayPal" },
  { id: "3", name: "Virement bancaire" },
  { id: "4", name: "Espèces à la livraison" }
];

export default function RegisterInfo() {
  const navigate = useNavigate()
  const { toast } = useToast();

  const [registerinfoClient, {isLoading : isSubmitting }] = useRegisterInfoClientMutation()
  const {data:user, isLoading : userLoading, isError : userError} = useGetUserQuery()
  const {data : client, isError : clientError, isLoading : clientLoading, error : clientFetchError } = useGetInfoClientQuery()
  

  

  

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      phoneNumber: '',
      city: '',
      postalCode: '',
      defaultPaymentMethod: '',
    },
  });



  useEffect(() => {
    if (userLoading || clientLoading) return;

    if (userError || !user) {
      navigate("/login",{replace:true});
      return
    }
    switch (user.role) {
        case "ADMIN":
          navigate(DASHBOARD_ADMIN_ROUTE, {replace : true});
          break;
        case "CLIENT":
          if(!clientError && clientFetchError?.status !== 404 && window.location.pathname === REGISTERINFO_ROUTE){
            
            navigate(DASHBOARD_CLIENT_ROUTE, {replace : true})
          }
          
          break;
        case "LIVREUR":
          navigate(DASHBOARD_LIVREUR_ROUTE, {replace : true});
          break;
        default:
          navigate("/login",{replace:true});
          break;
      }

  }, [user, userError, clientError, clientFetchError, clientLoading,userLoading, navigate]);
  

  if (userLoading || userError || !user || clientLoading ) {
    return null;
  }


  const onSubmit = async (values) => {

    try {
      await registerinfoClient({...values}).unwrap();
      
      toast({
        title: "Informations enregistrées",
        description: "Les informations du client ont été mises à jour avec succès.",
        variant: "success",
      });

      navigate(DASHBOARD_CLIENT_ROUTE)
      
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      if(error.status === 400 && error.data){
        Object.entries(error.data).forEach(([field, message]) => {
          form.setError(field, {
            type: 'manual',
            message: message
          });
        });
        toast({
          title: "Erreur de validation",
          description: "Veuillez corriger les erreurs dans le formulaire.",
          variant: "destructive",
        });
      }else{
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'enregistrement des informations.",
          variant: "destructive",
        });
      }

    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Informations du client</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="123 rue de Paris" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="0612345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ville</FormLabel>
                <FormControl>
                  <Input placeholder="Paris" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code postal</FormLabel>
                <FormControl>
                  <Input placeholder="75001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defaultPaymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Méthode de paiement par défaut</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une méthode de paiement" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {paymentMethods.map((method, key) => (
                      <SelectItem key={key} value={method.name}>{method.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-5">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader className="mx-2 my-2 animate-spin" />
              ) : (
                "Enregistrer les informations"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}