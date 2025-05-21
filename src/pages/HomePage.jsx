import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Link2, Copy, Check, BarChart3, AlertTriangle, Zap } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';

    const generateShortCode = (length = 6) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    const HomePage = () => {
      const [originalUrl, setOriginalUrl] = useState('');
      const [shortUrl, setShortUrl] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [copied, setCopied] = useState(false);
      const [error, setError] = useState('');
      const { toast } = useToast();

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
        setShortUrl('');
        
        try {
          let shortCode = generateShortCode();
          let unique = false;
          let attempts = 0;
          const maxAttempts = 5;

          // Ensure short_code is unique
          while (!unique && attempts < maxAttempts) {
            const { data: existing, error: checkError } = await supabase
              .from('urls')
              .select('short_code')
              .eq('short_code', shortCode)
              .single();

            if (checkError && checkError.code !== 'PGRST116') { // PGRST116: Row not found, which is good
              throw checkError;
            }
            if (!existing) {
              unique = true;
            } else {
              shortCode = generateShortCode(); // Regenerate if exists
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
            setShortUrl(`${currentBaseUrl}/${data.short_code}`);
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

      const handleCopy = () => {
        if (!shortUrl) return;
        navigator.clipboard.writeText(shortUrl).then(() => {
          setCopied(true);
          toast({ description: "Short URL copied to clipboard!" });
          setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
          toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy URL." });
        });
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-2xl"
          >
            <Card className="bg-slate-800/60 backdrop-blur-md border-purple-600/50 shadow-2xl shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="text-3xl text-center font-semibold text-purple-300 flex items-center justify-center">
                  <Link2 className="w-8 h-8 mr-3 text-purple-400" />
                  Create Your Short Link
                </CardTitle>
                <CardDescription className="text-center text-purple-400/80 pt-1">
                  Enter your long URL below to generate a compact version.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Input
                      type="url"
                      placeholder="https://your-long-url.com/goes/here"
                      value={originalUrl}
                      onChange={(e) => setOriginalUrl(e.target.value)}
                      className="text-lg p-4 bg-slate-700/50 border-purple-500/70 focus:ring-purple-500 focus:border-purple-500 text-gray-100 placeholder-gray-500"
                      aria-label="Enter long URL"
                    />
                    {error && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-400 flex items-center pt-1"
                      >
                        <AlertTriangle className="w-4 h-4 mr-1" /> {error}
                      </motion.p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-transparent border-t-white rounded-full mr-2"
                      ></motion.div>
                    ) : (
                      <Link2 className="w-5 h-5 mr-2" />
                    )}
                    {isLoading ? 'Shortening...' : 'Shorten URL'}
                  </Button>
                </form>
                
                {shortUrl && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8 p-6 bg-slate-700/70 rounded-lg border border-purple-500/50"
                  >
                    <p className="text-sm text-purple-300 mb-1">Your shortened URL:</p>
                    <div className="flex items-center justify-between space-x-3">
                      <a 
                        href={shortUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-lg text-green-400 hover:text-green-300 truncate font-medium"
                        aria-label="Shortened URL"
                      >
                        {shortUrl}
                      </a>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCopy}
                        className="border-purple-400 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300"
                        aria-label="Copy short URL"
                      >
                        {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="flex-col items-center text-center pt-6 border-t border-purple-600/30">
                <div className="flex items-center text-purple-400">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  <p className="text-sm">Analytics coming soon!</p>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div 
            className="mt-16 text-center max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <h2 className="text-3xl font-semibold text-purple-300 mb-6">Why CIPHERTECH?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-slate-800/50 rounded-xl border border-purple-500/30 shadow-lg">
                <Zap className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-purple-200 mb-2">Lightning Fast</h3>
                <p className="text-sm text-purple-300/80">Quick redirections and a snappy interface ensure a seamless experience.</p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-xl border border-purple-500/30 shadow-lg">
                <Link2 className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-purple-200 mb-2">Unique & Memorable</h3>
                <p className="text-sm text-purple-300/80">Generate short, custom links that are easy to remember and share.</p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-xl border border-purple-500/30 shadow-lg">
                <BarChart3 className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-purple-200 mb-2">Track Performance</h3>
                <p className="text-sm text-purple-300/80">Gain insights with basic analytics for your shortened URLs (coming soon).</p>
              </div>
            </div>
          </motion.div>
        </div>
      );
    };

    export default HomePage;