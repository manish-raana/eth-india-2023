import React from 'react'
import Create from './components/landing/create'
import Hero from './components/landing/hero'
import Nav from './components/landing/nav'

const Main = () => {
  return (
    <div className='min-h-screen flex flex-col bg-[#f2e8cf]'>
    <Nav />
    <Hero />
    <Create />
    </div>
  )
}

export default Main