"use client";

import { SignUp } from "@clerk/clerk-react";
import React from "react";

const SignUpPage = () => {
  return (
    <>
      <div className="h-screen">
        <div>
          <Link to={"/"} className="flex p-4 text-white">
            <ArrowLeft /> CraftMyCV
          </Link>
        </div>
        <div className="flex justify-center items-center h-[80%]">
          <SignUp />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
