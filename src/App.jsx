import { useEffect, useState } from 'react'

import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ThemeProvider } from './components/theme-provider'
import { Provider } from 'react-redux'
import { store } from './store'
import { Toaster } from "@/components/ui/sonner"
function App() {

  useEffect(()=>{
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
          console.log("Permission notifications:", permission);
      });
    }
    AOS.init({
      duration: 1500, // Durée de l'animation
      easing: 'ease-in-out', // Easing de l'animation
      once: false, // L'animation se déclenche une seule fois
    })
  },[])

  return (
    <>
      <Provider store={store}>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <RouterProvider router={router}/>
        </ThemeProvider>
      </Provider>
      <Toaster />
    </>
  )
}

export default App
