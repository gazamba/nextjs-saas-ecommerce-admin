import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "./main-nav";

const NavBar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>Store Switcher</div>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
