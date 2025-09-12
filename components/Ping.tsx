import React from "react";

const Ping = () => {
  return (
    <div className="absolute -top-2 -right-2">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-600"></span>
      </span>
    </div>
  );
};

export default Ping;
