"use client";

import { SignUp } from "@clerk/clerk-react";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <>
      <div className="h-[150vh]">
        <div>
          <Link to={"/"} className="flex p-4 text-white">
            <ArrowLeft /> CraftMyCV
          </Link>
        </div>
        <div className="flex justify-center items-center h-[125vh]">
          <SignUp />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
