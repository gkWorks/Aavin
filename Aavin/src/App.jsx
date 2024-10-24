import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './TranslateBtn/LanguageContext';
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
import Parlours from './Pages/Parlours';
import Form from './Pages/Form';
import Enquiry from './Pages/Enquiry';
import Aboutpage from './Pages/AboutPage/Aboutpage';
import Gallery from './Pages/GalleryPage/Gallery';
import Achievement from './Pages/AchievementPage/Activement';
import Dashboard from './Dashboard/Dashboard';
import Dhome from './DashBoardPages/Dhome';
import Dtender from './DashBoardPages/Dtender';
import Dforms from './DashBoardPages/Dforms';
import Dproduct from './DashBoardPages/Dproduct';
import Dmilk from './DashBoardPages/Dmilk';
import DiceCream from './DashBoardPages/DiceCream';
import Dabout from './DashBoardPages/Dabout';
import Dachievement from './DashBoardPages/Dachievement';
import Dgallery from './DashBoardPages/Dgallery';


function Layout() {
  const location = useLocation(); // Get the current location
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
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
          <Route path="/parlours" element={<Parlours />} />
          {/* Main Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/dhome" element={<Dhome />} />
            <Route path="/dashboard/dtender" element={<Dtender />} />
            <Route path="/dashboard/dforms" element={<Dforms />} />
            <Route path="/dashboard/dproduct" element={<Dproduct />} />
            <Route path="/dashboard/dmilk" element={<Dmilk />} />
            <Route path="/dashboard/diceCream" element={<DiceCream />} />
            <Route path="/dashboard/dabout" element={<Dabout/>} />
            <Route path="/dashboard/dachievement" element={<Dachievement/>} />
            <Route path="/dashboard/dgallery" element={<Dgallery/>} />
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
      <LanguageProvider>
        <Layout />
        </LanguageProvider>
    </Router>
  );
}

export default App;
