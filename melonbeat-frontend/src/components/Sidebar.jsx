import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { NavLinks } from "./NavLinks";
import { useState } from "react";
import logo from "../assets/whiteLogo.svg";

export const Sidebar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <div className="bg-black flex-col hidden md:flex px-4 py-10 w-60">
        <img alt="MelOnBeat White Logo" className="h-8 object-contain" src={logo} />
        <NavLinks />
      </div>
      <div className="absolute md:hidden right-4 top-6">
        {mobileMenu ? (
          <div className="cursor-pointer w-6" onClick={() => setMobileMenu(false)}>
            <XMarkIcon />
          </div>
        ) : (
          <div className="cursor-pointer w-6" onClick={() => setMobileMenu(true)}>
            <Bars3Icon />
          </div>
        )}
      </div>
      <div
        className={`absolute bg-black h-screen md:hidden p-6 top-0 transition-all w-2/3 z-10 ${
          mobileMenu ? "left-0" : "-left-full"
        }`}>
        <img alt="MelOnBeat White Logo" className="h-8 object-contain w-full" src={logo} />
        <NavLinks handleClick={() => setMobileMenu(false)} />
      </div>
    </>
  );
};
