import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">UniStay</h3>
            <p className="text-gray-300 text-sm">
              Making student housing search simple and reliable. Find your perfect home away from home.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>Email: support@unistay.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 University Ave, College Town</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>About Us</p>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>Help Center</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 UniStay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;