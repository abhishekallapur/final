import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Trophy, Clock, Star, Award, Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center">
              <img src="/pp.png" alt="ProjectEra Logo" className="h-10 w-auto mr-2" />
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-1">ProjectEra</span>
            </div>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link to="/" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1 text-sm lg:text-base">Home</Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors hover:scale-105 transform text-sm lg:text-base">Services</Link>
              <Link to="/project-topics" className="text-gray-700 hover:text-blue-600 transition-colors hover:scale-105 transform text-sm lg:text-base">Project Topics</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors hover:scale-105 transform text-sm lg:text-base">Contact</Link>
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-sm lg:text-base">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>
            <div className="flex-1 px-4 py-2 space-y-4">
              <Link 
                to="/" 
                className="block py-2 text-blue-600 font-medium border-b-2 border-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/project-topics" 
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Project Topics
              </Link>
              <Link 
                to="/contact" 
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative">
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium">
              <Star className="h-3 w-3 md:h-4 md:w-4 mr-1.5 md:mr-2" />
              Trusted by Students
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Get professional help with 
              <Link to="/project-topics">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300 cursor-pointer"> college projects</span>
              </Link>, 
              IEEE papers, and research documents.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Quality work delivered on time. We build major/minor college projects for students in CS, IT, Mechanical, ECE, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link to="/services">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
            <img 
              src="/lovable-uploads/7d9df712-dff9-4ca7-99e7-a80e4e812f10.png" 
              alt="Students collaborating on projects" 
              className="rounded-2xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500 w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all transform hover:scale-105">
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2">98%</div>
              <div className="text-sm md:text-base text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all transform hover:scale-105">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1 md:mb-2">24/7</div>
              <div className="text-sm md:text-base text-gray-600">Support Available</div>
            </div>
            <div className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-all transform hover:scale-105">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1 md:mb-2">5+ Years</div>
              <div className="text-sm md:text-base text-gray-600">Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Why Choose AcademicPro?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Professional academic services with guaranteed quality and student-focused approach</p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Quality Guaranteed</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">All projects undergo rigorous quality checks and testing to ensure excellence and academic standards.</p>
            </div>
            
            <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">On-Time Delivery</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">We respect deadlines and deliver projects when promised, helping you meet your academic schedule.</p>
            </div>
            
            <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Expert Team</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">Experienced developers and researchers across all domains with proven academic expertise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Ready to Get Started?</h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 md:mb-8 leading-relaxed">Submit your project requirements and get a detailed proposal within 24 hours</p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              Submit Your Requirements
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
