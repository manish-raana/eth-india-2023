import React from 'react';
import './styles/App.css';
import Preview from './components/Preview';
import Profile from './components/Profile';
import Socials from './components/Socials';
import ExternalLinks from './components/ExternalLinks';
import { Routes, Route } from 'react-router-dom';
import Main from './main';
import Layout from './components/layout/Layout';

// Create a Main component
const All = () => (
  <div className="App w-full md:flex bg-gray-100">
    <div className="md:w-full md:h-[88vh] py-10 overflow-y-scroll">
      <Profile />
      <div className="divider"></div>
      <Socials />
      <div className="divider"></div>
      <ExternalLinks />
      <div className="flex justify-center md:justify-end px-5">
        <button className="mt-8 border-2 btn btn-neutral rounded-lg block w-2/3 py-2">
          Add More Link
        </button>
      </div>
    </div>
    <div className="md:w-1/2 p-10 bg-white flex items-center justify-center">
      <Preview />
    </div>
  </div>
);

// Modify App component to use Routes and define routes
function App() {
  return (
    <Routes>
      {/* Route for the current content */}
      <Route path="/" element={<Main />} />
      {/* Route for the Main component */}

      <Route path="/app" element={
      <Layout >
      <All />
      </Layout>
      } />

    </Routes>
  );
}

export default App;
