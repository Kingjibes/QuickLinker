import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import RedirectHandler from '@/components/RedirectHandler'; 
import AdminPage from '@/pages/AdminPage'; // Import AdminPage
import PricingPage from '@/pages/PricingPage'; // Import PricingPage

const App = () => {
  // Basic admin check, replace with actual auth logic later
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; 

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="pricing" element={<PricingPage />} /> 
          {/* Basic Admin Route, protect properly later */}
          <Route path="admin" element={isAdmin ? <AdminPage /> : <Navigate to="/" />} />
        </Route>
        <Route path="/s/:shortCode" element={<RedirectHandler />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;