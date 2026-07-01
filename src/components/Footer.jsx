import React from "react";

function Footer() {
  return (
    <footer className="bg-neutral-950 text-gray-300 mt-auto border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black tracking-wide text-white">
              JHALA<span className="text-yellow-500"> COLLECTIONS</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Manage customers, products, orders and payments
              efficiently through a modern, responsive storefront.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2.5 text-gray-400">
              <li className="hover:text-yellow-500 cursor-pointer transition duration-200">
                Dashboard
              </li>

              <li className="hover:text-yellow-500 cursor-pointer transition duration-200">
                Products
              </li>

              <li className="hover:text-yellow-500 cursor-pointer transition duration-200">
                Customers
              </li>

              <li className="hover:text-yellow-500 cursor-pointer transition duration-200">
                Orders
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">
              Contact Us
            </h3>

            <div className="space-y-3 text-gray-400">
              <p className="flex items-center gap-2">
                <i className="ri-mail-line text-yellow-500"></i>
                admin@gmail.com
              </p>

              <p className="flex items-center gap-2">
                <i className="ri-phone-line text-yellow-500"></i>
                +91 9876543210
              </p>

              <p className="flex items-center gap-2">
                <i className="ri-map-pin-line text-yellow-500"></i>
                Rajasthan, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-900 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} JhalaCollection. All Rights Reserved.
          </p>

          <div className="flex gap-4 text-xl text-gray-400">
            <i className="ri-facebook-circle-line hover:text-yellow-500 cursor-pointer transition duration-200"></i>

            <i className="ri-instagram-line hover:text-yellow-500 cursor-pointer transition duration-200"></i>

            <i className="ri-linkedin-box-line hover:text-yellow-500 cursor-pointer transition duration-200"></i>

            <i className="ri-github-line hover:text-yellow-500 cursor-pointer transition duration-200"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;