import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Link2, BarChart3, Zap } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';
    import UrlShortenerForm from '@/components/home/UrlShortenerForm';
    import ShortenedUrlDisplay from '@/components/home/ShortenedUrlDisplay';
    import RecentLinks from '@/components/home/RecentLinks';
    import WhyCipherTech from '@/components/home/WhyCipherTech';

    const HomePage = () => {
      const [originalUrl, setOriginalUrl] = useState('');
      const [shortUrlData, setShortUrlData] = useState(null); 
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState('');
      const [recentLinks, setRecentLinks] = useState([]);
      const { toast } = useToast();

      useEffect(() => {
        const storedLinks = JSON.parse(localStorage.getItem('ciphertech_recent_links')) || [];
        setRecentLinks(storedLinks);
      }, []);

      const addRecentLink = (linkData) => {
        setRecentLinks(prevLinks => {
          const updatedLinks = [linkData, ...prevLinks.filter(link => link.short_code !== linkData.short_code)].slice(0, 5);
          localStorage.setItem('ciphertech_recent_links', JSON.stringify(updatedLinks));
          return updatedLinks;
        });
      };
      
      const generateShortCode = (length = 6) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      };

      const isValidUrl = (url) => {
        try {
          new URL(url);
          return true;
        } catch (_) {
          return false;
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!originalUrl) {
          setError('Please enter a URL to shorten.');
          toast({ variant: "destructive", title: "Input Error", description: "URL field cannot be empty." });
          return;
        }
        if (!isValidUrl(originalUrl)) {
          setError('Please enter a valid URL (e.g., https://example.com).');
          toast({ variant: "destructive", title: "Invalid URL", description: "The URL format is incorrect." });
          return;
        }

        setIsLoading(true);
        setShortUrlData(null);
        
        try {
          let shortCode = generateShortCode();
          let unique = false;
          let attempts = 0;
          const maxAttempts = 5;

          while (!unique && attempts < maxAttempts) {
            const { data: existing, error: checkError } = await supabase
              .from('urls')
              .select('short_code')
              .eq('short_code', shortCode)
              .single();

            if (checkError && checkError.code !== 'PGRST116') {
              throw checkError;
            }
            if (!existing) {
              unique = true;
            } else {
              shortCode = generateShortCode();
            }
            attempts++;
          }

          if (!unique) {
            throw new Error("Could not generate a unique short code. Please try again.");
          }
          
          const { data, error: insertError } = await supabase
            .from('urls')
            .insert([{ original_url: originalUrl, short_code: shortCode }])
            .select()
            .single();

          if (insertError) {
            throw insertError;
          }

          if (data) {
            const currentBaseUrl = window.location.origin;
            const newShortUrl = `${currentBaseUrl}/${data.short_code}`;
            const newLinkData = { 
              original_url: data.original_url, 
              short_code: data.short_code, 
              full_short_url: newShortUrl,
              created_at: new Date().toISOString() 
            };
            setShortUrlData(newLinkData);
            addRecentLink(newLinkData);
            setOriginalUrl(''); // Clear input field
            toast({ title: "Success!", description: "Your shortened URL has been created." });
          } else {
             throw new Error("Failed to create short URL. No data returned.");
          }

        } catch (err) {
          console.error("Error shortening URL:", err);
          setError(`Failed to shorten URL: ${err.message}`);
          toast({ variant: "destructive", title: "Error", description: err.message || "Could not shorten URL. Please try again." });
        } finally {
          setIsLoading(false);
        }
      };


      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                Shorten. Share. Shine.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-300 max-w-2xl mx-auto">
              Transform long, cumbersome links into short, memorable URLs. Perfect for sharing and tracking.
            </p>
          </motion.div>

          <UrlShortenerForm
            originalUrl={originalUrl}
            setOriginalUrl={setOriginalUrl}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
          
          {shortUrlData && (
            <ShortenedUrlDisplay shortUrlData={shortUrlData} />
          )}
          
          <RecentLinks recentLinks={recentLinks} />
          
          <WhyCipherTech />

        </div>
      );
    };

    export default HomePage;
