import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="md:hidden flex justify-center -mt-2 border-b border-neutral-700 pb-4 pt-5">
      <img className="h-5 my-3" src={logo} alt="logo" />
    </div>
  );
};

export default Header;
