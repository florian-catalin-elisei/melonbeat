import { links } from "../data/links";
import { NavLink } from "react-router-dom";

export const NavLinks = ({ handleClick }) => {
  return (
    <div className="mt-4">
      {links.map((link) => (
        <NavLink
          className="flex font-medium items-center my-8 text-gray-400 text-sm"
          key={link.name}
          onClick={() => handleClick && handleClick()}
          to={link.to}>
          <link.icon className="mr-2 w-6" />
          <div className="hover:font-semibold hover:text-white">{link.name}</div>
        </NavLink>
      ))}
    </div>
  );
};
