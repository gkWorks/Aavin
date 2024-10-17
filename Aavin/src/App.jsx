import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import 'animate.css';
import Header from './Components/Header';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import Procurement from './Pages/Procurement';
import Dairy from './Pages/Dairy';
import Marketing from './Pages/Marketing';
import Accounts from './Pages/Accounts';
import Products from './Pages/Products';
import Tender from './Pages/Tender';
import Form from './Pages/Form';
import Enquiry from './Pages/Enquiry';

function App() {
  return (
    <Router>
      <Header />
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/dairy" element={<Dairy />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/products" element={<Products />} />
          <Route path="/tender" element={<Tender />} />
          <Route path="/form" element={<Form />} />
          <Route path="/enquiry" element={<Enquiry />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
