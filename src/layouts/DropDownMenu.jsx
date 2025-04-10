import React from "react";
import {
  ChevronUp,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

import logo from '../images/liv1.jpg'
import { useLogoutMutation } from "../api/authApi";
export default function DropDownMenu() {
  const navigate = useNavigate();
  const [logout ,{ isLoading , }] = useLogoutMutation();
  const handleLogout = async ()=>{  
    
    try{
      await logout().unwrap()
        navigate("/login")
     
    }catch(err){
      console.log("erreru de déconnexion : ", err);
      
    }
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* <Button className="h-12 w-12 flex items-center justify-center rounded-full"> */}
            {/* <User size={40} /> */}
            {/* <img src={logo} className="w-full" alt="" /> */}
            {/* <h2 className="mb-2 flex items-center px-4 text-lg font-semibold tracking-tight shadow border rounded-md p-3 hover:bg-blue-500 hover:cursor-pointer hover:text-white">    
          <User size={25} className="mr-2" />
            <span className='mr-1'>{user.name} {user.familyName}</span><ChevronUp />
          </h2> */}
          {/* </Button> */}
          <Button
            className="h-12 w-12 border-primary border-2 flex items-center justify-center rounded-full"
            style={{
              backgroundImage: `url(${logo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Remove any additional content if you only want the background image */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>

          </DropdownMenuGroup>
         
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>handleLogout()}>
            <LogOut className="mr-2 h-4 w-4 text-red-500 sty" />
            <span className=" text-red-500">Deconnexion</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
