import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HomeSec = () => {
  return (
    <div className="h-screen text-white">
      <div className="flex flex-col items-center justify-center h-full">
        <div>
          <h3 className="font-bold text-center">Welcome to</h3>
          <h1 className="text-3xl text-center underline mt-2">
            Ai Resume Analyzer and Builder
          </h1>
          <p className="text-center mt-5 max-w-[75%] mx-auto">
            An AI Resume Analyzer and Builder helps users optimize and create
            professional resumes by analyzing content, formatting, and job
            relevance using artificial intelligence.
          </p>
        </div>
        <div className="flex justify-center mt-5">
          <Link to={"/analyzer"}>
            <button className="bg-blue-700 rounded-full text-white px-4 py-2 hover:underline flex gap-2 cursor-pointer">
              Analyze Now <ArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeSec;
