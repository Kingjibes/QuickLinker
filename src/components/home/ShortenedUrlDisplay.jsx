import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Copy, Check, QrCode } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import QRCode from 'qrcode.react';
    import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      DialogFooter,
      DialogClose,
    } from "@/components/ui/dialog";

    const ShortenedUrlDisplay = ({ shortUrlData }) => {
      const [copied, setCopied] = useState(false);
      const { toast } = useToast();
      const [isQrModalOpen, setIsQrModalOpen] = useState(false);

      if (!shortUrlData || !shortUrlData.full_short_url) return null;

      const { full_short_url } = shortUrlData;

      const handleCopy = () => {
        navigator.clipboard.writeText(full_short_url).then(() => {
          setCopied(true);
          toast({ description: "Short URL copied to clipboard!" });
          setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
          toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy URL." });
        });
      };

      return (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: '2rem' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          <div className="p-6 bg-slate-700/70 rounded-lg border border-purple-500/50">
            <p className="text-sm text-purple-300 mb-2">Your shortened URL:</p>
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-3">
              <a 
                href={full_short_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg text-green-400 hover:text-green-300 truncate font-medium block"
                aria-label="Shortened URL"
              >
                {full_short_url}
              </a>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="border-purple-400 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300"
                  aria-label="Copy short URL"
                >
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </Button>
                <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-purple-400 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300"
                      aria-label="Show QR Code"
                    >
                      <QrCode className="w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-purple-600 text-gray-100 max-w-xs sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle className="text-purple-400 text-2xl">Scan QR Code</DialogTitle>
                      <DialogDescription className="text-purple-300/80">
                        Scan this code to open {full_short_url}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center p-4 my-4 bg-white rounded-md">
                      <QRCode value={full_short_url} size={192} level="H" bgColor="#FFFFFF" fgColor="#0F172A" />
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary" className="bg-purple-600 hover:bg-purple-700 text-white">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </motion.div>
      );
    };

    export default ShortenedUrlDisplay;
