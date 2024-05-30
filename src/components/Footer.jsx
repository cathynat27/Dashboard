import {
  faInstagramSquare,
  faFacebookSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Footer() {
  return (
    <footer className="py-3 px-6 flex items-center border-t border-gray-300 bg-gray-200 text-sm text-gray-500">
      <div className="flex-1">
        &copy; {new Date().getFullYear()} Mobiklinic. All rights reserved.
      </div>
      <div className="space-x-4 text-2xl text-gray-700 cursor-pointer">
        <a
          href="https://www.facebook.com/mobiklinicUganda"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebookSquare} />
        </a>
        <a
          href="https://www.instagram.com/mobiklinic_foundation/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagramSquare} />
        </a>
        <a
          href="https://twitter.com/klinicuganda"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitterSquare} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
