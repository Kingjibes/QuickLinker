import React from 'react';
    import Header from '@/components/layout/Header';
    import Footer from '@/components/layout/Footer';
    import { motion } from 'framer-motion';

    const Layout = ({ children }) => {
      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-gray-100">
          <Header />
          <motion.main 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-grow container mx-auto px-4 py-8"
          >
            {children}
          </motion.main>
          <Footer />
        </div>
      );
    };

    export default Layout;