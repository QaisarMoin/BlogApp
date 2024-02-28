import React from "react";

function Logo({ width = "100px", className = "" }) {
  return (
    <div className={`text-center py-1 ${className}`}>
      By <span className="text-bold text-2xl"> Mohd Qaisar Moin</span>{" "}
    </div>
  );
}

export default Logo;
