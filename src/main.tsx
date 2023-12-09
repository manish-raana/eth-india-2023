<<<<<<< HEAD
import React from 'react'
import Create from './components/landing/create'
import Hero from './components/landing/hero'
import Nav from './components/landing/nav'
import Search from './components/landing/search'
import Footer from './components/landing/footer'

const Main = () => {
  return (
    <div className='min-h-screen flex flex-col bg-[#f2e8cf]'>
    <Nav />
    <Hero />
    <Create />
    <Search />
    <Footer />
=======
import React from 'react';
import Create from './components/landing/create';
import Hero from './components/landing/hero';
import Nav from './components/landing/nav';

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f2e8cf]">
      <Nav />
      <Hero />
      <Create />
>>>>>>> 300279d36b5dd1d2a89b08df3ca2de4622f6e88b
    </div>
  );
};

export default Main;
