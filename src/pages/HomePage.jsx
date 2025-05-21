import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Link as LinkIcon, Copy, Check, Loader2, BarChart2, Edit3, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  // Custom slug state is removed as per new requirement
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please enter a URL to shorten.' });
      return;
    }
    setIsLoading(true);
    setShortenedUrl(null);

    try {
      // Pass null or undefined for customSlug as it's no longer user-provided
      const { data, error } = await supabase.functions.invoke('create-short-url', {
        body: JSON.stringify({ originalUrl, customSlug: null }), 
      });

      if (error) throw error;
      
      if (data.error) { // Error from within the function logic
        toast({ variant: 'destructive', title: 'Error', description: data.error });
      } else {
        const clickableUrl = `${window.location.origin}/s/${data.full_short_url}`;
        setShortenedUrl({
          display: data.full_short_url,
          clickable: clickableUrl,
          original: data.original_url,
          clicks: data.click_count === null ? 0 : data.click_count // Ensure clicks is not null
        });
        toast({ title: 'Success!', description: 'URL shortened successfully.' });
        setOriginalUrl('');
        // customSlug reset is removed
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to shorten URL.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortenedUrl?.clickable) {
      navigator.clipboard.writeText(shortenedUrl.clickable);
      setCopied(true);
      toast({ title: 'Copied!', description: 'Shortened URL copied to clipboard.' });
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 space-y-12 py-8" // Added container and px-4 for consistency
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
    >
      <motion.section variants={itemVariants} className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          <span className="gradient-text">Shorten Your Links,</span> Amplify Your Reach.
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Create short, memorable links with CIPHERTECH. Perfect for sharing on social media, emails, and more. Our system automatically generates a unique code for your link.
        </p>
      </motion.section>

      <motion.section variants={itemVariants}>
        <Card className="max-w-2xl mx-auto glassmorphic shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center flex items-center justify-center gradient-text">
              <LinkIcon className="mr-3 h-8 w-8" /> Create Short Link
            </CardTitle>
            <CardDescription className="text-center text-gray-400 pt-1">
              Enter your long URL. We'll generate a unique short link for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="originalUrl" className="block text-sm font-medium text-purple-300 mb-1">
                  Long URL <span className="text-red-500">*</span>
                </label>
                <Input
                  id="originalUrl"
                  type="url"
                  placeholder="https://example.com/very/long/url/to/shorten"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  required
                  className="text-lg p-3 bg-slate-800/60 border-purple-500/50 focus:ring-purple-500 focus:border-purple-500 text-gray-100 placeholder-gray-500"
                />
              </div>
              {/* Removed Custom Slug Input Field */}
              <Button
                type="submit"
                className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 hover-glow disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                ) : (
                  <LinkIcon className="mr-2 h-6 w-6" />
                )}
                Shorten URL
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.section>

      {shortenedUrl && (
        <motion.section
          variants={itemVariants}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto glassmorphic shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center gradient-text">Your Shortened URL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 p-3 bg-slate-800/70 rounded-md border border-purple-500/50">
                <a
                  href={shortenedUrl.clickable}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-green-400 hover:text-green-300 truncate flex-grow"
                  title={shortenedUrl.clickable}
                >
                  {shortenedUrl.display}
                </a>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="text-gray-300 hover:text-purple-300">
                  {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </Button>
                <a href={shortenedUrl.clickable} target="_blank" rel="noopener noreferrer" title="Open link in new tab">
                   <Button variant="ghost" size="icon" className="text-gray-300 hover:text-purple-300">
                     <ExternalLink className="h-5 w-5" />
                   </Button>
                </a>
              </div>
              <p className="text-sm text-gray-400">
                Original: <span className="text-gray-300 truncate block max-w-xs sm:max-w-md md:max-w-lg">{shortenedUrl.original}</span>
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <BarChart2 className="h-4 w-4 mr-2 text-purple-400" />
                Clicks: <span className="text-gray-200 ml-1">{shortenedUrl.clicks}</span>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      )}

      <motion.section variants={itemVariants} className="grid md:grid-cols-3 gap-8 text-center">
        {[
          { icon: <Edit3 className="h-12 w-12 mx-auto mb-4 text-purple-400" />, title: "Automatic & Unique", description: "We generate a unique, random code for your short link." },
          { icon: <BarChart2 className="h-12 w-12 mx-auto mb-4 text-purple-400" />, title: "Analytics", description: "Track the number of clicks your shortened URLs receive." },
          { icon: <LinkIcon className="h-12 w-12 mx-auto mb-4 text-purple-400" />, title: "Reliable", description: "Fast and dependable redirection to your original content." },
        ].map((feature, index) => (
          <motion.div key={index} variants={itemVariants} className="glassmorphic p-6 rounded-lg shadow-xl">
            {feature.icon}
            <h3 className="text-2xl font-semibold mb-2 gradient-text">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </motion.section>
    </motion.div>
  );
};

export default HomePage;