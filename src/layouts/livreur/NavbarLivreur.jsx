import React from 'react'
import { Menu, Truck, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';
import { DASHBOARD_LIVREUR_ROUTE } from '../../router';

export default function NavbarLivreur() {
  const location = useLocation()
  return (
    <nav className="w-full border-b backdrop-blur-sm fixed shadow dark:border-b z-40">
      <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-bold flex items-center"><Truck/>Delivry</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-4 mr-4">
            <Link to={DASHBOARD_LIVREUR_ROUTE}
              className={`${DASHBOARD_LIVREUR_ROUTE == location.pathname && 'bg-primary text-white'} rounded-md px-3 py-2 text-sm font-medium hover:bg-primary hover:text-white`}
              >
              Dashboard
            </Link>

          </div>
          <div className="flex-shrink-0">
            <DropDownMenu />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <div className="mr-2">
            <DropDownMenu />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-6">
                <Link to={DASHBOARD_LIVREUR_ROUTE} className={`${DASHBOARD_LIVREUR_ROUTE == location.pathname && 'bg-primary text-white'} rounded-md px-3 py-2 text-sm font-medium hover:bg-primary hover:text-white`}>
                  Dashboard
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}