import React from 'react';
    import { motion } from 'framer-motion';
    import { Link2, AlertTriangle } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { BarChart3 } from 'lucide-react';

    const UrlShortenerForm = ({ originalUrl, setOriginalUrl, handleSubmit, isLoading, error }) => {
      return (
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
            </CardContent>
            <CardFooter className="flex-col items-center text-center pt-6 border-t border-purple-600/30">
              <div className="flex items-center text-purple-400">
                <BarChart3 className="w-5 h-5 mr-2" />
                <p className="text-sm">Detailed click-through rates, geographic data, and referral sources coming soon!</p>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default UrlShortenerForm;
