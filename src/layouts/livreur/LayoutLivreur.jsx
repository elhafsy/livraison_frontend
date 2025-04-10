import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavbarLivreur from './NavbarLivreur'
import { useGetUserQuery } from '../../api/authApi'
import { DASHBOARD_ADMIN_ROUTE, DASHBOARD_CLIENT_ROUTE } from '../../router'

export default function LayoutLivreur() {
  const navigate = useNavigate()
  const {data:user, isLoading, isError} = useGetUserQuery()

  useEffect(() => {
    if (isLoading) return;
    if (isError || !user) {
      navigate("/login",{replace:true});
      return
    } else {
      switch (user.role) {
        case "ADMIN":
          navigate(DASHBOARD_ADMIN_ROUTE, {replace : true});
          break;
        case "CLIENT":
          navigate(DASHBOARD_CLIENT_ROUTE, {replace : true});
          break;
        case "LIVREUR":
          break;
        default:
          navigate("/login",{replace:true});
          break;
      }
    }
  }, [user, isError,isLoading, navigate]);
  

  if (isLoading || isError || !user) {
    return null;
  }
  return (
    <>
        <header>
            <NavbarLivreur/>
        </header>
        <div className="p-4 relative top-11">
          <div className="p-10  rounded-l  rounded-lg ">
            <Outlet />
          </div>
        </div>
    </>
  )
}
