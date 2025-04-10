import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavbarClient from './NavbarClient'
import { useGetUserQuery } from '../../api/authApi'
import { DASHBOARD_ADMIN_ROUTE, DASHBOARD_CLIENT_ROUTE, DASHBOARD_LIVREUR_ROUTE, REGISTERINFO_ROUTE } from '../../router'
import { useGetInfoClientQuery } from '../../api/client/clientApi'

export default function LayoutClient() {
  const navigate = useNavigate()
  const {data:user, isLoading : userLoading, isError : userError} = useGetUserQuery()
  const {data : client, isError : clientError, isLoading : clientLoading, error : clientFetchError } = useGetInfoClientQuery()


  useEffect(() => {
    console.log(client);
    
    if (userLoading || clientLoading) return;
    if (userError || !user) {
      navigate("/login",{replace:true});
      return
    } else {
      switch (user.role) {
        case "ADMIN":
          navigate(DASHBOARD_ADMIN_ROUTE, {replace : true});
          break;
        case "CLIENT":
          if(clientError && clientFetchError?.status === 404 && location.pathname !== REGISTERINFO_ROUTE){
            
            navigate(REGISTERINFO_ROUTE, {replace : true})
          }
          
          break;
        case "LIVREUR":
          navigate(DASHBOARD_LIVREUR_ROUTE, {replace : true});
          break;
        default:
          navigate("/login",{replace:true});
          break;
      }
    }
  }, [user, userError, clientError, clientFetchError, clientLoading,userLoading, navigate, location.pathname]);
  

  if (userLoading || userError || !user) {
    return null;
  }
  return (
    <>
        <header>
            <NavbarClient/>
        </header>
        <div className="p-4 relative top-11">
        <div className="p-10  rounded-l  rounded-lg ">
            <Outlet />
        </div>
        </div>
    </>
  )
}
