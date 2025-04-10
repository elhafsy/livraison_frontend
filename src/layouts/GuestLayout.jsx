import React from 'react'
import { Outlet } from 'react-router-dom'
import { ModeToggle } from '../components/mode-toggle'

export default function GuestLayout() {
  return (
    <>
        <div className="relative">
          <div className="">
            <p className="absolute top-2 right-2 z-10">
              <ModeToggle />
            </p>
            <Outlet />
          </div>
        </div>
    </>
  )
}
