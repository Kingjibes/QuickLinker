import React from 'react';
    import { motion } from 'framer-motion';
    import { Info, UserCircle, Zap } from 'lucide-react';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

    const AboutPage = () => {
      return (
        <div className="max-w-4xl mx-auto py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-slate-800/60 backdrop-blur-md border-purple-600/50 shadow-xl shadow-purple-500/15">
              <CardHeader className="text-center">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness:150 }}
                  className="inline-block p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 shadow-lg"
                >
                  <Info className="w-12 h-12 text-white" />
                </motion.div>
                <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
                  About CIPHERTECH URL Shortener
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-300/90 space-y-6 text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Welcome to CIPHERTECH URL Shortener, your go-to solution for transforming long, unwieldy web addresses into concise, shareable links. In a digital world overflowing with information, a short and memorable link can make all the difference in capturing attention and simplifying communication.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="p-6 bg-slate-700/40 rounded-lg border border-purple-500/40"
                >
                  <h2 className="text-2xl font-semibold text-purple-300 mb-3 flex items-center">
                    <Zap className="w-7 h-7 mr-2 text-purple-400" /> Our Mission
                  </h2>
                  <p>
                    Our mission is to provide a fast, reliable, and user-friendly URL shortening service that empowers individuals, businesses, and creators to share information more effectively. We believe in the power of simplicity and strive to make link management an effortless task.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="p-6 bg-slate-700/40 rounded-lg border border-purple-500/40"
                >
                  <h2 className="text-2xl font-semibold text-purple-300 mb-3 flex items-center">
                    <UserCircle className="w-7 h-7 mr-2 text-purple-400" /> About the Creator
                  </h2>
                  <p>
                    CIPHERTECH URL Shortener is a project by <strong className="text-purple-200">HACKERPRO</strong>, a passionate developer dedicated to crafting innovative and practical web solutions. With a focus on clean design, robust functionality, and excellent user experience, HACKERPRO aims to contribute tools that make the digital landscape more accessible and efficient.
                  </p>
                  <p className="mt-3">
                    This platform is built with modern technologies to ensure scalability, security, and performance, reflecting HACKERPRO's commitment to quality and cutting-edge development practices.
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-center pt-4"
                >
                  Thank you for choosing CIPHERTECH. We're excited to help you make your links shorter and your sharing simpler!
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default AboutPage;