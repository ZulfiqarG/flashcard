/*We are creating the header of our website in this file, which features a image of Almabetter log.*/

import React from "react";
import logo from "../image/BrandLogo.png";

const Header = () => {
  return (
    <div className=" shadow-lg shadow-zinc-400 bg-white  ">
      <img className=" pt-2 pb-2 ml-4  sm:w-auto  h-10 w-10"src={logo} alt="logo" />
    </div>
  );
};

export default Header;
