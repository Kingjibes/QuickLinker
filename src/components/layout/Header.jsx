import React, { useState } from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import { Menu, X, Link2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
    import { motion } from 'framer-motion';

    const Header = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      const navLinkClasses = ({ isActive }) =>
        `text-lg hover:text-purple-400 transition-colors duration-300 ${
          isActive ? 'text-purple-400 font-semibold' : 'text-gray-300'
        }`;

      const MobileNavLink = ({ to, children, closeMenu }) => (
        <NavLink
          to={to}
          onClick={closeMenu}
          className={({ isActive }) =>
            `block py-3 px-4 text-lg rounded-md transition-all duration-300 ease-in-out
             ${isActive ? 'bg-purple-600 text-white font-semibold shadow-lg' : 'text-gray-200 hover:bg-purple-800/50 hover:text-purple-300'}`
          }
        >
          {children}
        </NavLink>
      );
      
      return (
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50, delay: 0.1 }}
          className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg shadow-lg shadow-purple-500/10"
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Link2 className="h-8 w-8 text-purple-400" />
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
                CIPHERTECH
              </span>
            </Link>

            <nav className="hidden md:flex space-x-6 items-center">
              <NavLink to="/" className={navLinkClasses}>Home</NavLink>
              <NavLink to="/about" className={navLinkClasses}>About</NavLink>
              <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
            </nav>

            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-300 hover:text-purple-400">
                    <Menu className="h-7 w-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-slate-900 border-l-purple-500/50 p-0">
                  <SheetHeader className="p-6 border-b border-purple-500/30">
                    <SheetTitle className="text-2xl font-bold text-purple-400 flex items-center">
                      <Link2 className="h-7 w-7 mr-2" /> Menu
                    </SheetTitle>
                     <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-gray-400 hover:text-purple-400">
                          <X className="h-6 w-6" />
                        </Button>
                      </SheetClose>
                  </SheetHeader>
                  <div className="p-6 space-y-3">
                    <MobileNavLink to="/" closeMenu={() => setIsMenuOpen(false)}>Home</MobileNavLink>
                    <MobileNavLink to="/about" closeMenu={() => setIsMenuOpen(false)}>About</MobileNavLink>
                    <MobileNavLink to="/contact" closeMenu={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.header>
      );
    };

    export default Header;