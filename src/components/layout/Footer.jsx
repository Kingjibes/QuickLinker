import React from 'react';
    import { Link } from 'react-router-dom';
    import { Github, Linkedin, Twitter, Link2 } from 'lucide-react';

    const Footer = () => {
      const currentYear = new Date().getFullYear();

      return (
        <footer className="bg-slate-900/50 border-t border-purple-500/20 text-gray-400 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <Link to="/" className="flex items-center space-x-2 mb-3">
                  <Link2 className="h-7 w-7 text-purple-400" />
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
                    CIPHERTECH
                  </span>
                </Link>
                <p className="text-sm">Shorten URLs, expand possibilities. Secure and fast URL shortening service by HACKERPRO.</p>
              </div>
              
              <div>
                <p className="text-lg font-semibold text-purple-300 mb-3">Quick Links</p>
                <ul className="space-y-2">
                  <li><Link to="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
                  <li><Link to="/about" className="hover:text-purple-400 transition-colors">About</Link></li>
                  <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <p className="text-lg font-semibold text-purple-300 mb-3">Connect</p>
                <div className="flex space-x-4">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Github className="h-6 w-6" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
                <p className="text-sm mt-4">Created by HACKERPRO</p>
              </div>
            </div>

            <div className="border-t border-purple-500/20 pt-8 text-center text-sm">
              <p>&copy; {currentYear} CIPHERTECH. All rights reserved.</p>
              <p className="mt-1">A HACKERPRO Project</p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;