import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Send, Mail, MessageSquare, User } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea'; 
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';

    const ContactPage = () => {
      const [formData, setFormData] = useState({ name: '', email: '', message: '' });
      const [isLoading, setIsLoading] = useState(false);
      const [errors, setErrors] = useState({});
      const { toast } = useToast();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
          setErrors(prev => ({ ...prev, [name]: null }));
        }
      };

      const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) {
          newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Email is invalid.";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required.";
        else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters long.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
          toast({ variant: "destructive", title: "Validation Error", description: "Please check the form for errors." });
          return;
        }

        setIsLoading(true);
        
        try {
          const { error } = await supabase
            .from('contact_messages')
            .insert([
              { name: formData.name, email: formData.email, message: formData.message }
            ]);

          if (error) throw error;

          setFormData({ name: '', email: '', message: '' });
          toast({ title: "Message Sent!", description: "Thank you for your feedback. We'll get back to you if needed." });

        } catch (err) {
          console.error("Error submitting contact form:", err);
          toast({ variant: "destructive", title: "Submission Error", description: err.message || "Could not send message. Please try again." });
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div className="max-w-2xl mx-auto py-12 px-4">
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
                  <Mail className="w-12 h-12 text-white" />
                </motion.div>
                <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
                  Get In Touch
                </CardTitle>
                <CardDescription className="text-purple-300/90 text-lg mt-2">
                  Have questions, feedback, or a brilliant idea? We'd love to hear from you!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-purple-300 flex items-center"><User className="w-4 h-4 mr-2"/>Full Name</Label>
                    <Input 
                      type="text" 
                      name="name" 
                      id="name" 
                      placeholder="John Doe" 
                      value={formData.name} 
                      onChange={handleChange}
                      className={`bg-slate-700/50 border-purple-500/70 focus:ring-purple-500 focus:border-purple-500 text-gray-100 ${errors.name ? 'border-red-500' : ''}`} 
                    />
                    {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-purple-300 flex items-center"><Mail className="w-4 h-4 mr-2"/>Email Address</Label>
                    <Input 
                      type="email" 
                      name="email" 
                      id="email" 
                      placeholder="you@example.com" 
                      value={formData.email} 
                      onChange={handleChange}
                      className={`bg-slate-700/50 border-purple-500/70 focus:ring-purple-500 focus:border-purple-500 text-gray-100 ${errors.email ? 'border-red-500' : ''}`} 
                    />
                    {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-purple-300 flex items-center"><MessageSquare className="w-4 h-4 mr-2"/>Your Message</Label>
                    <Textarea 
                      name="message" 
                      id="message" 
                      rows="5" 
                      placeholder="Tell us what's on your mind..." 
                      value={formData.message} 
                      onChange={handleChange}
                      className={`bg-slate-700/50 border-purple-500/70 focus:ring-purple-500 focus:border-purple-500 text-gray-100 resize-none ${errors.message ? 'border-red-500' : ''}`} 
                    />
                    {errors.message && <p className="text-sm text-red-400">{errors.message}</p>}
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full text-lg py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-transparent border-t-white rounded-full mr-2"
                      ></motion.div>
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </motion.form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default ContactPage;