import React, { useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Clock, Loader, Package, Truck } from "lucide-react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { DASHBOARD_ADMIN_ROUTE, DASHBOARD_CLIENT_ROUTE, DASHBOARD_LIVREUR_ROUTE } from '../../router';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox"
import { useGetUserQuery, useLoginMutation } from '../../api/authApi';




export default function Login() {
  const [login, {isLoading, error}] = useLoginMutation();
  const {data:user, isLoading:isLoadingForUser, isError} = useGetUserQuery({skip: !localStorage.getItem("token")})
  const navigate = useNavigate()

  const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const {
    setError,
    formState: { isSubmitting },
  } = form;
  
  useEffect(() => {
      if (isLoadingForUser || !user) return;
      if (isError ) {
        return
      } 

      const routeMap = {
        ADMIN: DASHBOARD_ADMIN_ROUTE,
        CLIENT: DASHBOARD_CLIENT_ROUTE,
        LIVREUR: DASHBOARD_LIVREUR_ROUTE,
      }
      const destinationRoute = routeMap[user.role]
      if(destinationRoute){
        navigate(destinationRoute, {replace: true})
      }
    }, [user, isError,isLoadingForUser, navigate]);
    
  



  // if (isLoading) {
  //   return <></>;
  // }

  const onSubmit = async (values)=>{
    try{
      const response = await login({username:values.email, password:values.password}).unwrap()
      const {role} = response
     
        switch (role) {
          case "ADMIN":
            navigate(DASHBOARD_ADMIN_ROUTE)
          break;
          case "CLIENT":
            navigate(DASHBOARD_CLIENT_ROUTE)
          break;
          case "LIVREUR":
            navigate(DASHBOARD_LIVREUR_ROUTE)
          break;
          default:
          break;
        }
    } catch(err){
      console.log(err);
      
      setError("email",{
        message: err.data.message || "une erreur est survenue"
      })
    }

    // if (isLoadingForUser) {
    //   return null;
    // }
 
    // await login(values.email, values.password)
    //     .then(res=>{
    //         const role = res.data.role
    //         setToken(res.data.access)
    //         switch (role) {
    //           case "ADMIN":
    //             navigate(DASHBOARD_ADMIN_ROUTE)
    //             break;
    //           case "CLIENT":
    //             navigate(DASHBOARD_CLIENT_ROUTE)
    //             break;
    //           case "LIVREUR":
    //             navigate(DASHBOARD_LIVREUR_ROUTE)
    //             break;
    //           default:
    //             break;
    //         }
    // }).catch(err=>{      
    //   const response = err.response;
    //   setError("email",{
    //     message:response.data.message
    //   })
    // })
   
  }
  return (
    <>
   <div data-aos="fade-right" className="flex flex-col lg:flex-row items-center gap-6 p-4 h-screen">
      {/* Section Brand - Delivery App Theme */}
      <div className="flex flex-col justify-center items-center lg:w-2/3 bg-gradient-to-br from-green-600 to-emerald-700 p-8 relative rounded-lg">
        <div className="absolute inset-0 opacity-20 bg-[url('/pattern.png')] bg-repeat"></div>
        <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
          <img
            src="liv1.jpg"
            className=" h-48 md:w-64 md:h-64 rounded-lg shadow-xl object-contain block mx-auto mb-8"
            alt="delivery-app-logo"
          />

          <div className="flex flex-col md:flex-row justify-between gap-4 w-full mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white flex-1">
              <CardContent className="p-4 flex flex-col items-center">
                <Truck className="h-8 w-8 mb-2" />
                <p className="text-center text-sm font-medium">Livraison Rapide</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white flex-1">
              <CardContent className="p-4 flex flex-col items-center">
                <Package className="h-8 w-8 mb-2" />
                <p className="text-center text-sm font-medium">Suivi en Direct</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white flex-1">
              <CardContent className="p-4 flex flex-col items-center">
                <Clock className="h-8 w-8 mb-2" />
                <p className="text-center text-sm font-medium">24/7 Service</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white w-full">
            <CardContent className="p-6">
              <p className="text-center font-medium">
                Livraison ultra-rapide de vos produits préférés. Commander en quelques clics et suivez votre livraison en temps réel!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col justify-center items-center lg:w-1/3  dark:bg-gray-900 p-4 rounded-lg shadow-lg">
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
              <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-white">Se connecter</CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                Accédez à votre compte de livraison
              </CardDescription>
              <Separator className="my-2 bg-green-200 dark:bg-green-800" />
            </CardHeader>

            <CardContent className="pt-6">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                      <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
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

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="text-green-600 focus-visible:ring-green-500 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600" />
                    <label htmlFor="remember" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
                      Se souvenir de moi
                    </label>
                  </div>
                  <a href="#" className="text-sm text-green-600 hover:text-green-700 hover:underline">
                    Mot de passe oublié?
                  </a>
                </div>

                <Button 
                  disabled={isSubmitting} 
                  className="w-full bg-green-600 hover:bg-green-700 text-white" 
                  type="submit"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      <span>Connexion...</span>
                    </div>
                  ) : (
                    "Se connecter"
                  )}
                </Button>

                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  Vous n'avez pas de compte?{" "}
                  <Link to={"/register"} className="text-green-600 hover:text-green-700 hover:underline font-medium">
                    S'inscrire
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </Form>
      </div>
    </div>


   </>
  )
}
