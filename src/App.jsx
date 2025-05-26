import React, { useEffect } from 'react';
    import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import Layout from '@/components/layout/Layout';
    import HomePage from '@/pages/HomePage';
    import AboutPage from '@/pages/AboutPage';
    import ContactPage from '@/pages/ContactPage';
    import NotFoundPage from '@/pages/NotFoundPage';
    import { supabase } from '@/lib/supabaseClient';
    import { useToast } from "@/components/ui/use-toast";
    import { motion } from 'framer-motion';


    const RedirectHandler = () => {
      const { shortCode } = useParams();
      const navigate = useNavigate();
      const { toast } = useToast();

      useEffect(() => {
        const fetchUrlAndRedirect = async () => {
          if (!shortCode) {
            navigate('/');
            return;
          }

          try {
            const { data: urlData, error: urlError } = await supabase
              .from('urls')
              .select('original_url, id')
              .eq('short_code', shortCode)
              .single();

            if (urlError || !urlData) {
              console.error('Error fetching URL or URL not found:', urlError);
              toast({
                variant: "destructive",
                title: "Redirect Failed",
                description: "Short URL not found or an error occurred.",
              });
              navigate('/404', { replace: true });
              return;
            }
            
            
            const { error: analyticsError } = await supabase.from('url_analytics').insert({
                url_id: urlData.id,
                user_agent: navigator.userAgent,
              });

            if (analyticsError) {
              console.warn("Failed to log analytics:", analyticsError.message);
            }
            
            window.location.href = urlData.original_url;


          } catch (error) {
            console.error('Unexpected error during redirect:', error);
            toast({
              variant: "destructive",
              title: "Redirect Error",
              description: "An unexpected error occurred while redirecting.",
            });
            navigate('/404', { replace: true });
          }
        };

        fetchUrlAndRedirect();
      }, [shortCode, navigate, toast]);

      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-gray-100">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full mb-4"
            ></motion.div>
            <p className="text-xl text-purple-300">Redirecting you...</p>
        </div>
      );
    };


    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
            <Route path="/404" element={<Layout><NotFoundPage /></Layout>} />
            <Route path="/:shortCode" element={<RedirectHandler />} />
            <Route path="*" element={<Layout><NotFoundPage /></Layout>} /> 
          </Routes>
          <Toaster />
        </Router>
      );
    }

    export default App;
