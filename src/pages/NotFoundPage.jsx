import React from 'react';
    import { Link } from 'react-router-dom';
    import { AlertTriangle, Home } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';

    const NotFoundPage = () => {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            className="p-8 bg-slate-800/60 backdrop-blur-md border border-purple-600/50 rounded-xl shadow-2xl shadow-purple-500/20"
          >
            <AlertTriangle className="w-24 h-24 text-orange-400 mx-auto mb-6" />
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 mb-4">
              404
            </h1>
            <h2 className="text-3xl font-semibold text-purple-300 mb-3">Oops! Page Not Found.</h2>
            <p className="text-lg text-purple-400/80 mb-8 max-w-md">
              The page you're looking for seems to have ventured into the unknown. Don't worry, let's get you back on track.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg px-8 py-6">
                <Link to="/">
                  <Home className="w-5 h-5 mr-2" />
                  Go to Homepage
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      );
    };

    export default NotFoundPage;