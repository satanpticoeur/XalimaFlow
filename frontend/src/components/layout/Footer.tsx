// frontend/src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card py-10 text-center text-muted-foreground text-sm">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} XalimaFlow. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <Link to="/privacy" className="hover:underline text-foreground/80 transition-colors duration-200">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline text-foreground/80 transition-colors duration-200">Terms of Service</Link>
          <Link to="/contact" className="hover:underline text-foreground/80 transition-colors duration-200">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;