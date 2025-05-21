import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; 
import { useToast } from '@/components/ui/use-toast';
import { Send, Mail, User, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from('contact_messages').insert([
        { name, email, message },
      ]);

      if (error) throw error;

      toast({
        title: 'Message Sent!',
        description: "Thanks for reaching out. We'll get back to you soon.",
      });
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error Sending Message',
        description: error.message || 'Could not send your message. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div 
      className="max-w-2xl mx-auto py-12 px-4"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="text-center mb-10">
        <Mail className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text">
          Get In Touch
        </h1>
        <p className="text-lg text-gray-300 mt-3">
          Have questions, feedback, or just want to say hello? Drop us a message!
        </p>
      </div>

      <div className="glassmorphic p-8 rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-purple-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-10 text-lg p-3 bg-slate-800/60 border-purple-500/50 focus:ring-purple-500 focus:border-purple-500 text-gray-100 placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 text-lg p-3 bg-slate-800/60 border-purple-500/50 focus:ring-purple-500 focus:border-purple-500 text-gray-100 placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-purple-300 mb-1">
              Message
            </label>
            <div className="relative">
               <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-purple-400" />
              <Textarea
                id="message"
                placeholder="Your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="pl-10 text-lg p-3 bg-slate-800/60 border-purple-500/50 focus:ring-purple-500 focus:border-purple-500 text-gray-100 placeholder-gray-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full text-lg py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 hover-glow disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              <Send className="mr-2 h-5 w-5" />
            )}
            Send Message
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;