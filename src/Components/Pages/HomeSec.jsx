import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HomeSec = () => {
  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-blue-900 to-blue-600 px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div>
          <h3 className="font-bold text-lg sm:text-xl">Welcome to</h3>
          <h1 className="text-2xl sm:text-3xl underline mt-2 font-semibold">
            AI Resume Analyzer and Builder
          </h1>
          <p className="mt-5 text-sm sm:text-base max-w-xl mx-auto">
            An AI Resume Analyzer and Builder helps users optimize and create
            professional resumes by analyzing content, formatting, and job
            relevance using artificial intelligence.
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <Link to={"/analyzer"}>
            <button className="bg-blue-700 rounded-full text-white px-5 py-2 text-sm sm:text-base hover:underline flex items-center gap-2">
              Analyze Now <ArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeSec;
