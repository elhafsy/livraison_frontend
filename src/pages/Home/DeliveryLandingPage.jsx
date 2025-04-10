import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, Clock, ShieldCheck, Star, ChevronRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../../components/mode-toggle";


const DeliveryLandingPage = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/pattern.png')] bg-repeat"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
            
              <Badge data-aos="fade-down-left" className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 text-sm">Nouveau Service de Livraison</Badge>
              <h1 data-aos="fade-right" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Express Delivery</h1>
              <p data-aos="fade-right" className="text-xl md:text-2xl font-light max-w-lg">
                Livraison ultra-rapide de vos produits préférés. Commandez en quelques clics et suivez votre colis en temps réel.
              </p>
              <div  data-aos="fade-left" className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-white text-green-700 hover:bg-gray-100 font-medium text-base px-8 py-6">
                  Télécharger l'app
                </Button>
                <Button  onClick={()=>navigate('/login')}   className="border-white text-white dark:text-black hover:bg-white/20 font-medium text-base px-8 py-6">
                  <User className="mr-2 h-5 w-5" />
                  <span>Se connecter</span>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="liv1.jpg" 
                alt="Application de livraison" 
                className="max-w-full h-auto rounded-xl shadow-2xl border-4 border-white/20"
                data-aos="fade-up"
             />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div data-aos="fade-right" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Notre Service de Livraison</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez pourquoi des milliers de clients nous font confiance pour leurs besoins de livraison quotidiens.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card data-aos="fade-right" className="border-green-100 dark:border-green-900/30 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Livraison Rapide</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Livraison garantie en moins de 30 minutes pour les commandes locales. Suivi en temps réel.
              </p>
            </CardContent>
          </Card>

          <Card data-aos="fade-right" className="border-green-100 dark:border-green-900/30 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Large Sélection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Des milliers de produits disponibles à la livraison : repas, courses, médicaments et plus encore.
              </p>
            </CardContent>
          </Card>

          <Card data-aos="fade-right" className="border-green-100 dark:border-green-900/30 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Service Fiable</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Livraison assurée quelles que soient les conditions. Service client disponible 24h/24, 7j/7.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
        <div data-aos="zoom-in" className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Rejoignez Notre Équipe</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Nous offrons des opportunités flexibles pour devenir livreur partenaire et gagner un revenu complémentaire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
            <video 
                src="vidliv.mp4" 
                alt="Partenaire de livraison" 
                className="rounded-xl shadow-xl w-full h-auto" 
                autoPlay
                muted
                controls
            />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Opportunités pour les Livreurs</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Horaires Flexibles</h4>
                    <p className="text-gray-600 dark:text-gray-400">Travaillez quand vous voulez, avec des horaires totalement flexibles.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Revenus Attractifs</h4>
                    <p className="text-gray-600 dark:text-gray-400">Gagnez jusqu'à 25€/heure pendant les heures de pointe.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Application Intuitive</h4>
                    <p className="text-gray-600 dark:text-gray-400">Notre application optimise vos itinéraires pour maximiser vos revenus.</p>
                  </div>
                </div>
              </div>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white font-medium text-base px-6 py-5 mt-4">
                Devenir Partenaire
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Login / Call to Action */}
      <section data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="py-16 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à commander ?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Créez un compte ou connectez-vous pour profiter de nos services de livraison rapide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white dark:bg-primary text-green-700 hover:bg-gray-100 font-medium text-lg px-8 py-6">
              Créer un compte
            </Button>
            <Button className="border-white dark:text-green-700 text-white hover:bg-white/20 font-medium text-lg px-8 py-6">
              <User className="mr-2 h-5 w-5" />
              <span>Se connecter</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div data-aos="fade-up"
                data-aos-anchor-placement="center-bottom">
              <h3 className="text-white text-lg font-bold mb-4">Express Delivery</h3>
              <p>Votre service de livraison rapide et fiable. Disponible 24h/24, 7j/7.</p>
            </div>
            <div data-aos="fade-up"
                data-aos-anchor-placement="center-bottom">
              <h4 className="text-white text-base font-bold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Devenir Livreur</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contactez-nous</a></li>
              </ul>
            </div>
            <div data-aos="fade-up"
                  data-aos-anchor-placement="center-bottom">
              <h4 className="text-white text-base font-bold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de cookies</a></li>
              </ul>
            </div>
            <div data-aos="fade-up"
                  data-aos-anchor-placement="center-bottom">
              <h4 className="text-white text-base font-bold mb-4">Téléchargez l'application</h4>
              <div className="flex flex-col space-y-2">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/app-store.png" alt="App Store" className="h-10" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/play-store.png" alt="Google Play" className="h-10" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-center">
            <p>© 2025 Express Delivery. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeliveryLandingPage;