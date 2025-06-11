import React from "react";
import { cn } from "@/lib/utils";

const Analyzer = () => {
  return (
    <div className="min-h-screen">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      
    </div>
  );
};

export default Analyzer;
