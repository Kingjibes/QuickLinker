import React from 'react';
    import { motion } from 'framer-motion';
    import { Zap, Link2, BarChart3, ShieldCheck, Globe, Settings } from 'lucide-react';

    const featureVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.15,
          duration: 0.5,
          ease: "easeOut"
        }
      })
    };

    const features = [
      {
        icon: Zap,
        title: "Lightning Fast",
        description: "Quick redirections and a snappy interface ensure a seamless experience."
      },
      {
        icon: Link2,
        title: "Unique & Memorable",
        description: "Generate short, custom links that are easy to remember and share."
      },
      {
        icon: BarChart3,
        title: "Track Performance",
        description: "Gain insights with detailed analytics for your shortened URLs (coming soon)."
      },
      {
        icon: ShieldCheck,
        title: "Secure & Reliable",
        description: "Built with security in mind to protect your links and data."
      },
      {
        icon: Globe,
        title: "Globally Accessible",
        description: "Share your links with anyone, anywhere in the world, effortlessly."
      },
      {
        icon: Settings,
        title: "Advanced Options",
        description: "Future features include custom aliases and link management tools."
      }
    ];

    const WhyCipherTech = () => {
      return (
        <motion.div 
          className="mt-16 text-center w-full max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-semibold text-purple-300 mb-10"
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 }}}}
          >
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">CIPHERTECH</span>?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                custom={index}
                variants={featureVariants}
                className="p-6 bg-slate-800/50 rounded-xl border border-purple-500/30 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <feature.icon className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-purple-200 mb-2">{feature.title}</h3>
                <p className="text-sm text-purple-300/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    };

    export default WhyCipherTech;
