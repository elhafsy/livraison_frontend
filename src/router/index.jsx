import { createBrowserRouter, Navigate } from "react-router-dom"
import LayoutAdmin from "../layouts/admin/LayoutAdmin"
import DashboardAdmin from "../pages/admin/DashboardAdmin"
import LayoutClient from "../layouts/client/LayoutClient"
import DashboardClient from "../pages/client/DashboardClient"
import LayoutLivreur from "../layouts/livreur/LayoutLivreur"
import Login from "../pages/auth/Login"
import GuestLayout from "../layouts/GuestLayout"
import NotFound from "../pages/NotFound"
import DashboardLivreur from "../pages/livreur/DashboardLivreur"
import DeliveryLandingPage from "../pages/Home/DeliveryLandingPage"
import Register from "../pages/auth/Register"
import Inscriptions from "../pages/admin/Inscriptions"
import RegisterInfo from "../pages/client/RegisterInfo"
import ChatLayout from "../layouts/chat/ChatLayout"


export const DASHBOARD_ADMIN_ROUTE = '/admin/dashboard'
export const DASHBOARD_CLIENT_ROUTE = '/client/dashboard'
export const DASHBOARD_LIVREUR_ROUTE = '/livreur/dashboard'
export const INSCRIPTIONS_ROUTE = '/inscriptions'
export const REGISTERINFO_ROUTE = '/client/registerinfo'

export const router = createBrowserRouter([
    {
        element: <LayoutAdmin/>,
        children:[
            {
                path:DASHBOARD_ADMIN_ROUTE,
                element: <DashboardAdmin/>
            },
            {
                path:INSCRIPTIONS_ROUTE,
                element: <Inscriptions/>
            },
            
        ]
    },
    {
        element: <LayoutClient/>,
        children:[
            {
                path:DASHBOARD_CLIENT_ROUTE,
                element: <DashboardClient/>
            },
            {
                path:REGISTERINFO_ROUTE,
                element:<RegisterInfo/>
            },
        ]
    },
    {
        element: <LayoutLivreur/>,
        children:[
            {
                path:DASHBOARD_LIVREUR_ROUTE,
                element: <DashboardLivreur/>
            },
        ]
    },
    {
        path : "/chat/:id?",
        element  : <ChatLayout/>
    },
    {
        element: <GuestLayout/>,
        children:[
            {
                path:'/login',
                element: <Login/>
            },
            {
                path:'/register',
                element: <Register/>
            },
            {
                path:"/",
                element: <DeliveryLandingPage/>
            }
        ]
    },
    {
        path:'*',
        element: <NotFound/>
    }
    
])