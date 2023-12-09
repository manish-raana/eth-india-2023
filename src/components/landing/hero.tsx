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
<<<<<<< HEAD
      className='min-h-screen flex flex-col items-center justify-center relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200 via-fuchsia-600 to-orange-600'
      style={{ zIndex: 2 }} // Set a higher z-index for the Hero component
=======
      className="min-h-screen flex flex-col items-center justify-center relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200 via-fuchsia-600 to-orange-600"
>>>>>>> 300279d36b5dd1d2a89b08df3ca2de4622f6e88b
    >
      <div className="absolute inset-0 bg-noise"></div>
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
<<<<<<< HEAD
       variants={wordVariants}
       className='mt-8 bg-white text-fuchsia-600 py-2 z-100 px-4 rounded-full font-bold'
       whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
       whileTap={{ scale: 0.95 }}
       style={{ cursor: 'pointer' }}
=======
        variants={wordVariants}
        className="mt-8 bg-white text-fuchsia-600  py-2 px-4 rounded-full font-bold"
>>>>>>> 300279d36b5dd1d2a89b08df3ca2de4622f6e88b
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

export default Hero;
