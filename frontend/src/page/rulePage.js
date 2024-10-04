import React, { useState } from "react";
import Sidebar from "../components/sidebar.js";
import Rule from "../components/rule.js";

const Auth = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className="z-50" />
      <div className="flex-1 overflow-y-auto relative"> {/* Main content area */}
      <button 
  onClick={toggleSidebar} 
  className="absolute top-4 left-4 z-50 md:hidden flex flex-col gap-1 items-center justify-center p-2"
>
  <div className={`w-6 h-1 bg-black transition-transform duration-300 ${isSidebarOpen ? "transform rotate-45 translate-y-1.5" : ""}`}></div>
  <div className={`w-6 h-1 bg-black transition-opacity duration-300 ${isSidebarOpen ? "opacity-0" : "opacity-100"}`}></div>
  <div className={`w-6 h-1 bg-black transition-transform duration-300 ${isSidebarOpen ? "transform -rotate-45 -translate-y-1.5" : ""}`}></div>
</button>

        <Rule className="mt-8 p-2"/>
      </div>
    </div>
  );
};

export default Auth;
