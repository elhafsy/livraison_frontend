// import React from 'react'
// import { Menu, Truck, X } from 'lucide-react';
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Link, useLocation } from 'react-router-dom';
// import { DASHBOARD_ADMIN_ROUTE, INSCRIPTIONS_ROUTE } from '../../router';
// import DropDownMenu from '../DropDownMenu';

// export default function NavbarAdmin() {
//   const location = useLocation()
//   return (
//     <nav className="w-full border-b backdrop-blur-sm fixed shadow dark:border-b z-40">
//       <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
//         {/* Logo */}
//         <div className="flex items-center">
//           <span className="text-xl font-bold flex items-center"><Truck/>Delivry</span>
//         </div>
        
//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center space-x-6">
//           <div className="flex items-center space-x-4 mr-4">
//             <Link to={DASHBOARD_ADMIN_ROUTE}
//               className={`${DASHBOARD_ADMIN_ROUTE == location.pathname && 'bg-primary text-white'} rounded-md px-3 py-2 text-sm font-medium hover:bg-primary hover:text-white`}
//               >
//               Dashboard
//             </Link>
//             <Link to={INSCRIPTIONS_ROUTE}
//               className={`${INSCRIPTIONS_ROUTE == location.pathname && 'bg-primary text-white'} rounded-md px-3 py-2 text-sm font-medium hover:bg-primary hover:text-white`}
//             >
//               Inscriptions
//             </Link>
//           </div>
//           <div className="flex-shrink-0">
//             <DropDownMenu />
//           </div>
//         </div>
        
//         {/* Mobile Navigation */}
//         <div className="md:hidden flex items-center">
//           <div className="mr-2">
//             <DropDownMenu />
//           </div>
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <Menu className="h-6 w-6" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right">
//               <div className="flex flex-col space-y-4 mt-6">
//                 <Link to={DASHBOARD_ADMIN_ROUTE} className={`${DASHBOARD_ADMIN_ROUTE == location.pathname && 'bg-primary text-white'} rounded-md px-3 py-2 text-sm font-medium hover:bg-primary hover:text-white`}>
//                   Dashboard
//                 </Link>
//                 <Link to={INSCRIPTIONS_ROUTE} className={`${INSCRIPTIONS_ROUTE == location.pathname && 'bg-primary text-white'} rounded-md px-3 py-2 text-sm font-medium hover:bg-primary hover:text-white`}>
//                   Inscriptions
//                 </Link>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   )
// }



import React, { useState } from 'react';
import { Menu, Truck, X, Bell } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useLocation } from 'react-router-dom';
import { DASHBOARD_ADMIN_ROUTE, INSCRIPTIONS_ROUTE } from '../../router';
import DropDownMenu from '../DropDownMenu';
import { useGetAllNotificationsQuery, useMarkAllAsReadMutation, useMarkAsReadMutation } from '../../api/notifications/notificationApi';
import { useSelector } from 'react-redux';

export default function NavbarAdmin({user}) {
  const location = useLocation();
  
  const {data:notifications} = useGetAllNotificationsQuery(user.id)
  const [markAsRead] = useMarkAsReadMutation()
  const [markAllAsRead] = useMarkAllAsReadMutation()
  console.log(notifications);
  
  const handleReadNotification = (id) => {
      markAsRead(id)
  };
  const handleReadAllNotification = () =>{
    markAllAsRead()
  }

  return (
    <nav className="w-full border-b backdrop-blur-sm fixed shadow dark:border-b z-40">
      <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-bold flex items-center"><Truck className="mr-2"/>Delivry</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-4 mr-4">
            <Link to={DASHBOARD_ADMIN_ROUTE}
              className={`${DASHBOARD_ADMIN_ROUTE == location.pathname && 'bg-primary text-white'} rounded-md px-3 py-2 text-sm font-medium hover:bg-primary hover:text-white`}
              >
              Dashboard
            </Link>
            <Link to={INSCRIPTIONS_ROUTE}
              className={`${INSCRIPTIONS_ROUTE == location.pathname && 'bg-primary text-white'} rounded-md px-3 py-2 text-sm font-medium hover:bg-primary hover:text-white`}
            >
              Inscriptions
            </Link>
          </div>
          
          {/* Notification Icon */}
          <div className="relative mr-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications?.length > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                      {notifications?.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Notifications</h4>
                    {notifications?.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={()=>handleReadAllNotification()}
                        className="text-xs text-blue-500 hover:text-blue-700"
                      >
                        Tout marquer comme lu
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="max-h-80 overflow-auto">
                  {notifications != undefined ? (
                    notifications?.map((notification) => (
                      <div 
                        key={notification.id}
                        onClick={() => handleReadNotification(notification.id)}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${notification.read ? '' : 'bg-blue-50'}`}
                      >
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium">{notification.title}</h5>
                          <span className="text-xs text-gray-500">{notification.createdAt}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Aucune notification
                    </div>
                  )}
                </div>
                
                <div className="p-2 border-t text-center">
                  <Button variant="ghost" size="sm" className="text-sm text-blue-500 hover:text-blue-700 w-full">
                    Voir toutes les notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex-shrink-0">
            <DropDownMenu />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          {/* Notification Icon for Mobile */}
          <div className="relative mr-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications?.length > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                      {/* {notificationCount} */}
                      {notifications?.length} 
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Notifications</h4>
                    {notifications?.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={()=>handleReadAllNotification()}
                        className="text-xs text-blue-500 hover:text-blue-700"
                      >
                        Tout marquer comme lu
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="max-h-80 overflow-auto">
                  {notifications != undefined > 0 ? (
                    notifications?.map((notification) => (
                      <div 
                        key={notification.id}
                        onClick={() => handleReadNotification(notification.id)}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${notification.read ? '' : 'bg-blue-50'}`}
                      >
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium">{notification.title}</h5>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Aucune notification
                    </div>
                  )}
                </div>
                
                <div className="p-2 border-t text-center">
                  <Button variant="ghost" size="sm" className="text-sm text-blue-500 hover:text-blue-700 w-full">
                    Voir toutes les notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
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
                <Link to={DASHBOARD_ADMIN_ROUTE} className={`${DASHBOARD_ADMIN_ROUTE == location.pathname && 'bg-primary text-white'} rounded-md px-3 py-2 text-sm font-medium hover:bg-primary hover:text-white`}>
                  Dashboard
                </Link>
                <Link to={INSCRIPTIONS_ROUTE} className={`${INSCRIPTIONS_ROUTE == location.pathname && 'bg-primary text-white'} rounded-md px-3 py-2 text-sm font-medium hover:bg-primary hover:text-white`}>
                  Inscriptions
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}