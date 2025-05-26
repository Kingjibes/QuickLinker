import React from 'react';
    import { motion } from 'framer-motion';
    import { Link2, Clock, ExternalLink } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';

    const TimeAgo = ({ dateString }) => {
      const date = new Date(dateString);
      const now = new Date();
      const seconds = Math.round((now - date) / 1000);
      const minutes = Math.round(seconds / 60);
      const hours = Math.round(minutes / 60);
      const days = Math.round(hours / 24);

      if (seconds < 60) return `${seconds} sec ago`;
      if (minutes < 60) return `${minutes} min ago`;
      if (hours < 24) return `${hours} hr ago`;
      return `${days} day(s) ago`;
    };
    
    const RecentLinks = ({ recentLinks }) => {
      const { toast } = useToast();

      const handleCopyLink = (url) => {
        navigator.clipboard.writeText(url);
        toast({ description: "Link copied to clipboard!"});
      };

      if (!recentLinks || recentLinks.length === 0) {
        return (
          <motion.div 
            className="w-full max-w-2xl mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8 bg-slate-800/40 rounded-lg border border-purple-500/30">
              <Link2 className="w-12 h-12 text-purple-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-purple-300 mb-2">No Recent Links Yet</h3>
              <p className="text-purple-400/70">Shorten a URL to see it appear here!</p>
            </div>
          </motion.div>
        );
      }

      return (
        <motion.div 
          className="w-full max-w-2xl mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-purple-300 mb-4 flex items-center">
            <Clock className="w-7 h-7 mr-2 text-purple-400" /> Your Recent Links
          </h2>
          <div className="space-y-3">
            {recentLinks.map((link, index) => (
              <motion.div
                key={link.short_code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-slate-800/60 p-4 rounded-lg border border-purple-500/40 shadow-md hover:shadow-purple-500/20 transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <a 
                      href={link.full_short_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-green-400 hover:text-green-300 transition-colors break-all"
                    >
                      {link.full_short_url}
                    </a>
                    <p className="text-xs text-purple-400/70 truncate max-w-xs sm:max-w-md md:max-w-lg" title={link.original_url}>
                      Original: {link.original_url}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                     <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleCopyLink(link.full_short_url)}
                        className="text-purple-300 hover:text-purple-100"
                        aria-label="Copy short link"
                      >
                       Copy
                      </Button>
                      <a 
                        href={link.full_short_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Open short link in new tab"
                      >
                        <Button variant="outline" size="sm" className="border-purple-400 text-purple-300 hover:bg-purple-500/20 hover:text-purple-100">
                          <ExternalLink className="w-4 h-4 mr-1 sm:mr-0" /> <span className="sm:hidden ml-1">Open</span>
                        </Button>
                      </a>
                  </div>
                </div>
                <p className="text-xs text-purple-500/80 mt-2 text-right"><TimeAgo dateString={link.created_at} /></p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    };

    export default RecentLinks;
