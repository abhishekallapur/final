import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, FileText, Search, BookOpen, MessageSquare, Shield, Star, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/Footer';

const Services = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: Monitor,
      title: "College Projects",
      description: "Complete project development for web applications, mobile apps, and software solutions with full documentation.",
      features: ["Source code & documentation", "Project presentation", "Technical support", "Testing & debugging", "Deployment guidance"],
      price: "Starting from $299",
      duration: "7-14 days",
      color: "blue",
      popular: true
    },
    {
      icon: FileText,
      title: "IEEE Papers",
      description: "Professional IEEE format papers with proper citations, methodology, and research standards.",
      features: ["IEEE format compliance", "Peer review process", "Publication guidance", "Literature review", "Research methodology"],
      price: "Starting from $199",
      duration: "5-10 days",
      color: "green"
    },
    {
      icon: Search,
      title: "Research Papers",
      description: "Comprehensive research documentation with proper references and academic formatting.",
      features: ["Literature review", "Data analysis", "Citations & references", "Statistical analysis", "Plagiarism check"],
      price: "Starting from $149",
      duration: "3-7 days",
      color: "purple"
    },
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Complete project documentation including technical specifications and user manuals.",
      features: ["Technical documentation", "User guide", "API documentation", "System architecture", "Installation guide"],
      price: "Starting from $99",
      duration: "2-5 days",
      color: "orange"
    },
    {
      icon: Shield,
      title: "References & Citations",
      description: "Proper academic referencing in APA, MLA, IEEE, and other required formats.",
      features: ["Multiple citation styles", "Bibliography creation", "Reference verification", "Format compliance", "Academic standards"],
      price: "Starting from $49",
      duration: "1-3 days",
      color: "red"
    },
    {
      icon: MessageSquare,
      title: "Consultation",
      description: "One-on-one guidance and support throughout your project development process.",
      features: ["Project planning", "Progress reviews", "24/7 support", "Expert guidance", "Technical mentoring"],
      price: "Starting from $79/hour",
      duration: "Immediate",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string, isPopular: boolean = false) => {
    const baseClasses = "transition-all duration-300 hover:shadow-2xl transform hover:scale-105";
    const colors = {
      blue: `${baseClasses} border-blue-200 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 ${isPopular ? 'ring-2 ring-blue-400 shadow-xl' : ''}`,
      green: `${baseClasses} border-green-200 hover:border-green-300 bg-gradient-to-br from-green-50 to-green-100`,
      purple: `${baseClasses} border-purple-200 hover:border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100`,
      orange: `${baseClasses} border-orange-200 hover:border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100`,
      red: `${baseClasses} border-red-200 hover:border-red-300 bg-gradient-to-br from-red-50 to-red-100`,
      indigo: `${baseClasses} border-indigo-200 hover:border-indigo-300 bg-gradient-to-br from-indigo-50 to-indigo-100`
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AcademicPro
              </span>
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
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors hover:scale-105 transform text-sm lg:text-base">Home</Link>
              <Link to="/services" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1 text-sm lg:text-base">Services</Link>
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
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="block py-2 text-blue-600 font-semibold border-b-2 border-blue-600"
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

      {/* Header */}
      <section className="py-12 md:py-16 lg:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Our Services</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive academic services to help you succeed in your college projects and research work with professional excellence
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-6 md:py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`${getColorClasses(service.color, service.popular)} relative overflow-hidden`}>
                {service.popular && (
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </div>
                )}
                <CardHeader className="p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-3 md:mb-4">
                    <div className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <service.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">What's Included:</h4>
                      <ul className="space-y-1 md:space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-xs md:text-sm text-gray-600 flex items-center">
                            <span className="text-green-500 mr-2 md:mr-3 font-bold">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs md:text-sm bg-white/50 p-2 md:p-3 rounded-lg">
                      <span className="font-bold text-blue-600 text-base md:text-lg">{service.price}</span>
                      <span className="text-gray-600 font-medium">🕒 {service.duration}</span>
                    </div>
                    
                    <Link to="/contact">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-sm md:text-base py-2 md:py-3">
                        Get Started →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 mx-4 my-8 md:my-12 lg:my-16 rounded-2xl md:rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Need a Custom Solution?</h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 md:mb-8 leading-relaxed">
            Don't see exactly what you need? We offer custom academic services tailored to your specific requirements.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all px-6 md:px-8 py-3 md:py-4 text-sm md:text-base">
              Contact Us for Custom Quote
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
