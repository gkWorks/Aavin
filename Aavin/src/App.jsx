import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Aboutpage from './Pages/AboutPage/Aboutpage';
import Gallery from './Pages/GalleryPage/Gallery';
import Achievement from './Pages/AchievementPage/Activement';
import Dashboard from './Dashboard/Dashboard';
import Dhome from './DashBoardPages/Dhome';

function Layout() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      {/* Conditionally render Header and NavBar only if not in the dashboard */}
      {!isDashboardRoute && <Header />}
      {!isDashboardRoute && <NavBar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/achievements" element={<Achievement />} />
          <Route path="/dairy" element={<Dairy />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/products" element={<Products />} />
          <Route path="/tender" element={<Tender />} />
          <Route path="/form" element={<Form />} />
          <Route path="/enquiry" element={<Enquiry />} />
          
          {/* Main Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/dhome" element={<Dhome />} />
            {/* Add more dashboard-specific routes as needed */}
          </Route>
        </Routes>
      </main>
      {!isDashboardRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
