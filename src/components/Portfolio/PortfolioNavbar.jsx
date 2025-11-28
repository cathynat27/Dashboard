import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PortfolioNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Projects", id: "projects" },
    { label: "Activities", id: "activities" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-around h-16 md:h-20">
          {/* Logo and Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-brrounded-lg flex items-center justify-center">
              
                <img 
                src="logo.png"
                alt="logo"
                 />
              
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg md:text-xl font-bold text-gray-800">
                Mobiklinic
              </h1>
              <p className="text-xs text-sky-600 font-medium">
                Healthcare Innovation
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                whileHover={{ color: "#2563eb" }}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* Right Side CTA
          <div className="hidden md:flex items-center gap-4">
            
          {/* <Link
            to="/auth/login"
            className="px-4 py-2 bg-sky-500 text-white rounded-md font-medium hover:bg-sky-600 transition-colors"
          >
            Sign In
          </Link> 

            
            
          </div> */}

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-gray-800 block"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-gray-800 block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-gray-800 block"
            />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-gray-50 border-t border-gray-200"
        >
          <div className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                whileHover={{ x: 5 }}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-700 font-medium hover:text-blue-600 py-2 text-left transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2 flex flex-col gap-2">
              <Link
                to="/auth/login"
                className="text-gray-700 font-medium hover:text-blue-600 py-2 transition-colors"
              >
                Sign In
              </Link>
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg font-semibold w-full">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default PortfolioNavbar;
