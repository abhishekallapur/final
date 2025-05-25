
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                AcademicPro
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Your trusted partner for professional academic project services. We help students achieve excellence in their college projects and research work.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-blue-400 hover:bg-blue-500 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-blue-700 hover:bg-blue-800 rounded-full transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-pink-600 hover:bg-pink-700 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-300">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-300 transition-colors"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-300 transition-colors"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/project-topics" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-300 transition-colors"></span>
                  Project Topics
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-300 transition-colors"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-300">Our Services</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">College Projects</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">IEEE Papers</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Research Papers</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Documentation</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">References & Citations</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Consultation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-300">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>devprojectera@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>+91 7676832037</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>Mangalore, Karnataka, India</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-blue-300">Stay Updated</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:border-blue-400 text-sm"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 ProjectEra. All rights reserved. | Built with ❤️ for students worldwide
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
