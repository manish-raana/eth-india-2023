import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './gradienttext.css'

import { createClient } from '@supabase/supabase-js'
import Loader from '../Loader';





const Search = () => {
    const supabaseUrl = 'https://fqieqvhbzjfvgxfbtnnf.supabase.co'
    const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
    console.log(supabaseKey)
    const supabase = createClient(supabaseUrl, supabaseKey)

    const [inp, setInp]=useState('vitalik');
    const [isLoading, setIsLoading] = useState(false);

    const [ensData, setData]=useState([])

  useEffect(() => {
     searchENSData('vitalik');
   },[])
  async function searchENSData (searchKeyword) {
          setIsLoading(true);
            try {
                // event.preventDefault();
              // Use a case-insensitive ILIKE query to search for the keyword in the 'ENS' column
              const { data: matchingENSData, error } = await supabase
                .from('ens-twitter-data')
                .select('*')
                .ilike('ENS', `%${searchKeyword}%`);
          
              if (error) {
                console.error('Error fetching data:', error.message);
                return null;
              }
              console.log(matchingENSData)
              setData(matchingENSData)
              return matchingENSData;
            } catch (error) {
              console.error('Error:', error.message);
              return null;
            } finally
            {
              setIsLoading(false);
            }
          }




  const wordVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };


  const gradVariants = {
    // Define your animation variants here
    initial: {
      rotate: 0, // Initial rotation angle
      transition: {
        duration: 1, // Duration of the animation in seconds
        ease: 'linear', // Linear easing for smooth rotation
      },
    },
    animate: {
      rotate: 360, // Final rotation angle
      transition: {
        duration: 1, // Duration of the animation in seconds
        ease: 'linear', // Linear easing for smooth rotation
        loop: Infinity, // Repeat the animation indefinitely
      },
    },
  };

  return (
    <motion.div className="min-h-screen pt-24 flex flex-col items-center justify-center relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200 via-fuchsia-600 to-orange-600">
      <motion.h1
        variants={wordVariants}
        className="text-9xl text-white font-bold mb-6 text-center"
      >
        <motion.span variants={wordVariants}>Web3</motion.span>{' '}
        <motion.span variants={wordVariants}>Social</motion.span> <br />{' '}
        <motion.span
          variants={gradVariants}
          className="animated-text"
          initial="initial"
          animate="animate"
        >
          Graph
        </motion.span>
      </motion.h1>

      <div className="bg-white  max-w-screen-xl bg-opacity-30 p-8 rounded-lg shadow-lg  mx-auto w-full">
        {/* Search Bar */}

        <div class="flex items-center">
          <label for="voice-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              value={inp}
              onChange={(e) => {
                setInp(e.target.value);
              }}
              id="voice-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search up DOTTTs"
              required
            />
            <button
              type="button"
              class="flex absolute inset-y-0 right-0 items-center pr-3"
            ></button>
          </div>
          <button
            onClick={() => searchENSData(inp)}
            class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium hover:bg-white transition ease-in-out rounded-lg border focus:ring-4 focus:outline-none"
          >
            <svg
              class="mr-2 -ml-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            Search
          </button>
        </div>

        {ensData.length > 0 ? (
          ensData.map((item) => (
            <Social name={item.ENS} avatar={item.avatar} key={item.name} handle={item.handle}/>
          ))
        ) : (
          <p>No matching items found.</p>
        )}
        <div className='flex items-center justify-center mt-5'>
          <Loader isLoading={isLoading} />
        </div>
      </div>
    </motion.div>
  );
};

export default Search;




const Social = ({ name, avatar, handle }) => {
    return (
      <div className="w-full mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="w-12 h-12  rounded-full justify-center shadow-lg"
              src={avatar}
              alt="Bonnie image"
            />
            <h5 className="text-xl ml-4 font-medium text-gray-900 dark:text-white">
              {name}
            </h5>
          </div>
          <div className="flex">
          <button
  href="#"
  className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${/* Add your condition here */ true ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={true}
>
  Add friend
</button>


            <a
              href={`http://twitter.com/${handle}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
            >
              Message
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  