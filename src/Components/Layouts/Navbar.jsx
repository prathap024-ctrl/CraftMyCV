import React from "react";

const Navbar = () => {
  const menuList = [
    { name: "Home", path: "/" },
    { name: "Ai Resume Analyzer", path: "/analyzer" },
    { name: "Ai Resume Builder", path: "/builder" },
  ];
  return (
    <div className="w-full">
      <nav className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-blue-950 text-white z-50 fixed top-0 border-b shadow-lg rounded-b-xl">
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left mb-2 sm:mb-0">
          AI Resume Analyzer and Builder
        </h1>
        <ul className="flex flex-col sm:flex-row sm:space-x-4 items-center text-sm sm:text-base">
          {menuList.map((item, index) => (
            <li key={index} className="mb-2 sm:mb-0">
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
