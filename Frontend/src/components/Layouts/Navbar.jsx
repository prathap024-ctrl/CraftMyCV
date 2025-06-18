"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, closeSidebar } from "../../Store/Slice/Sidebar/index";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  const { isSignedIn } = useAuth();

  const menuList = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    ...(isSignedIn
      ? [
          { name: "Dashboard", path: "/dashboard" },
        ]
      : []),
  ];

  return (
    <nav className="fixed top-0 w-full bg-transparent backdrop-blur-2xl shadow-2xl z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-accent">
          CraftMyCV
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 items-center text-white text-sm sm:text-base cursor-pointer">
          {menuList.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="hover:underline underline-offset-4"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Sign In */}
        <div className="hidden md:block space-x-4">
          <SignedOut>
            <Link to={"/sign-in"}>
              <Button variant="outline" className="text-black">
                Sign In
              </Button>
            </Link>
            <Link to={"/sign-up"}>
              <Button variant="outline" className="text-black">
                Sign Up
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={() => dispatch(toggleSidebar())}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden text-white"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black text-white w-64">
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-8 cursor-pointer">
              <SignedOut>
                <Link to={"/sign-in"}>
                  <Button variant="outline" className="text-black">
                    Sign In
                  </Button>
                </Link>
                <Link to={"/sign-up"}>
                  <Button variant="outline" className="text-black">
                    Sign Up
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>

              {menuList.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => dispatch(closeSidebar())}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
