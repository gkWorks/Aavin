import './index.css'
import React from 'react';
import Header from './Components/Header'
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <>
       <Header />
       <NavBar />
       <main > {/* Adjust margin-top to ensure content doesn't overlap */}
       <HomePage /> {/* Add HomePage component here */}
        {/* Add your page content here */}
      </main>
      <Footer  /> 
    </>
  )
}

export default App
