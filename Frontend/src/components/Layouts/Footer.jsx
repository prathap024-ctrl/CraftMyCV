"use client";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-transparent text-white py-4 text-center text-sm sm:text-base">
      <p className="w-2/3 mx-auto">
        © {currentYear} CraftMyCV — A product of{" "}
        <span className="font-semibold">PaprFlare</span>. <br />
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
