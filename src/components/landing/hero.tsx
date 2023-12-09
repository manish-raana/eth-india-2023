import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={textVariants}
      className="min-h-screen flex flex-col items-center justify-center relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200 via-fuchsia-600 to-orange-600"
    >
     
      <motion.h1
        variants={wordVariants}
        className="text-9xl text-white font-bold mb-6 text-center"
      >
        <motion.span variants={wordVariants}>Forget</motion.span>{' '}
        <motion.span variants={wordVariants}>LinkTree,</motion.span> <br />{' '}
        <motion.span variants={wordVariants}>Welcome </motion.span> To{' '}
        <motion.span variants={wordVariants}>DOTTT</motion.span>
      </motion.h1>
      <motion.p
        variants={wordVariants}
        className="text-xl text-white text-center"
      >
        Your personalized space on the web. Showcase everything in one place.
      </motion.p>
      <motion.button
        variants={wordVariants}
        className="mt-8 bg-white text-fuchsia-600  py-2 px-4 rounded-full font-bold"
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

export default Hero;
