"use client"
import { ArrowLeft } from "lucide-react";
import { SignupForm } from "../../Components/SignupForm";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <>
      <div className="w-full">
        <Link
          to={"/"}
          className="flex items-center text-white gap-2 font-medium md:px-10 md:py-10 px-2 py-10"
        >
          <ArrowLeft /> CraftMyCV
        </Link>
        <div className="w-full max-w-sm h-auto mx-auto p-6 md:pt-10 pt-10">
          <SignupForm />
        </div>
      </div>
    </>
  );
}
