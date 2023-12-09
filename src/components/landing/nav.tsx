import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/threedots.png';

interface NavItemProps {
  href: string;
  label: string;
}

const Nav: React.FC = () => {
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } },
  };
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.5 } },
  };

  return (
    <motion.div>
<<<<<<< HEAD
      <nav
        className="bg-white pl-2 pr-4 py-1 rounded-full fixed top-4 mx-auto max-w-[600px] z-50 left-1/2 transform -translate-x-1/2"
      >
=======
      <nav className="bg-white px-8 py-2 rounded-full fixed top-4 mx-auto max-w-[600px] z-50 left-1/2 transform -translate-x-1/2">
>>>>>>> 300279d36b5dd1d2a89b08df3ca2de4622f6e88b
        <div className="max-w-full gap-8 mx-auto flex justify-between items-center">
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-row items-center justify-center"
          >
            <img src={logo} alt="" height={40} width={40} />
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="ml-2 flex items-center text-black font-semibold text-lg"
            >
              <h2 className="text-2xl">Dot3</h2>
            </motion.div>
          </motion.div>

<<<<<<< HEAD
          <div className="flex pl-8 space-x-4 text-black">
=======
          <div className="flex  space-x-4 text-black">
>>>>>>> 300279d36b5dd1d2a89b08df3ca2de4622f6e88b
            <NavItem href="#home" label="Home" />
            <NavItem href="#about" label="About" />
            <NavItem href="#contact" label="Contact" />
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

const NavItem: React.FC<NavItemProps> = ({ href, label }) => {
  return (
    <a
      href={href}
      className="text-black hover:text-fuchsia-400 transition duration-300"
    >
      {label}
    </a>
  );
};

export default Nav;
