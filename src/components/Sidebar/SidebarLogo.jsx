import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/logo.png";

function SidebarLogo({ icon, text, ...props }) {
  return (
    <div className="relative flex items-center justify-between font-semibold text-3xl text-sky-600 mb-5 p-9">
      <Link to="/" className="flex items-center">
        <img src={Logo} className="w-10 mr-2" alt="Logo" />
        {text}
      </Link>
      <button
        onClick={props.toggle}
        className="border border-sky-300 text-xl font-medium py-2 px-4 block md:hidden"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export default SidebarLogo;
