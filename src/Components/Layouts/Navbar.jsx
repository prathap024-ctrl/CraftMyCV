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

const Navbar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  const menuList = [
    { name: "Home", path: "/" },
    { name: "Analyze", path: "/analyzer" },
    { name: "Create", path: "/build" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-transparent backdrop-blur-2xl text-white z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          CraftMyCV
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 items-center text-sm sm:text-base">
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
        <Link to="/sign-in" className="hidden sm:block">
          <Button variant="outline" className="text-black">
            Sign In
          </Button>
        </Link>

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
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-8">
              {menuList.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => dispatch(closeSidebar())}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/sign-in" onClick={() => dispatch(closeSidebar())}>
                <Button variant="outline" className="text-black w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
