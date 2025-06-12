"use client";

import { SignIn } from "@clerk/clerk-react";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <>
      <div className="h-screen">
        <div>
          <Link to={"/"} className="flex p-4 text-white">
            <ArrowLeft /> CraftMyCV
          </Link>
        </div>
        <div className="flex justify-center items-center h-[80%]">
          <SignIn />
        </div>
      </div>
    </>
  );
};

export default SignInPage;
