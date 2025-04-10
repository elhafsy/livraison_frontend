import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavbarAdmin from './NavbarAdmin'
// import { useUserContext } from '../../context/UserContext';
// import LoginApi from '../../services/LoginApi';
import { DASHBOARD_ADMIN_ROUTE, DASHBOARD_CLIENT_ROUTE, DASHBOARD_LIVREUR_ROUTE } from '../../router';
import { useGetUserQuery } from '../../api/authApi';

export default function LayoutAdmin() {
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
          break;
        case "CLIENT":
          navigate(DASHBOARD_CLIENT_ROUTE, {replace : true});
          break;
        case "LIVREUR":
          navigate(DASHBOARD_LIVREUR_ROUTE, {replace : true});
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
            <NavbarAdmin user={user}/>
        </header>
        <div className="p-4 relative top-11">
          <div className="p-10  rounded-l  rounded-lg ">
            <Outlet />
          </div>
        </div>
    </>
  )
}
