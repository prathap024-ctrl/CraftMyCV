import React from "react";

const Navbar = () => {
  const menuList = [
    { name: "Home", path: "/" },
    { name: "Ai Resume Analyzer", path: "/analyzer" },
    { name: "Ai Resume Builder", path: "/builder" },
  ];
  return (
    <div className="">
      <nav className="w-full flex justify-between items-center p-4 bg-blue-950 text-white z-50 fixed top-0 border-b shadow-lg rounded-b-xl">
        <h1 className="text-2xl font-bold">Ai Resume Analyzer and Builder</h1>
        <ul className="flex space-x-4">
          {menuList.map((item, index) => (
            <li key={index}>
              <a href={item.path} className="hover:text-gray-400">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
