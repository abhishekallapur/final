import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Brain, Cpu, Shield, Database, Star, ArrowRight, CheckCircle, Users, Trophy, Clock, Award, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/Footer';

const ProjectTopics = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = ['All', 'Web Development', 'Mobile Applications', 'AI & Machine Learning', 'IoT Projects', 'Cybersecurity', 'Data Science'];

  const projects = [
    {
      title: "E-commerce Platform",
      category: "Web Development",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      description: "Complete e-commerce platform with payment integration, user authentication, and admin dashboard.",
      icon: Monitor,
      color: "blue",
      duration: "10-15 days",
      popular: true
    },
    {
      title: "Social Media Application",
      category: "Web Development", 
      technologies: ["Vue.js", "Laravel", "MySQL"],
      description: "Full-featured social media app with real-time messaging, posts, and user profiles.",
      icon: Monitor,
      color: "blue",
      duration: "12-18 days"
    },
    {
      title: "Android Native Applications",
      category: "Mobile Applications",
      technologies: ["React Native", "Flutter", "Android Studio"],
      description: "Native and cross-platform mobile app development for Android and iOS platforms.",
      icon: Smartphone,
      color: "orange",
      duration: "15-20 days"
    },
    {
      title: "iOS Native Applications",
      category: "Mobile Applications",
      technologies: ["React Native", "Flutter", "Xcode"],
      description: "Native iOS applications with modern UI/UX and seamless performance.",
      icon: Smartphone,
      color: "orange",
      duration: "15-20 days"
    },
    {
      title: "Image Recognition System",
      category: "AI & Machine Learning",
      technologies: ["Python", "TensorFlow", "OpenCV"],
      description: "Computer vision system for image classification and object detection.",
      icon: Brain,
      color: "purple",
      duration: "20-25 days"
    },
    {
      title: "Natural Language Processing",
      category: "AI & Machine Learning",
      technologies: ["Python", "NLTK", "Scikit-learn"],
      description: "Text analysis and sentiment analysis using advanced NLP techniques.",
      icon: Brain,
      color: "purple",
      duration: "18-22 days"
    },
    {
      title: "Smart Home Automation",
      category: "IoT Projects",
      technologies: ["Arduino", "Raspberry Pi", "ESP32"],
      description: "IoT-based smart home system with mobile app control and sensor integration.",
      icon: Cpu,
      color: "green",
      duration: "12-16 days"
    },
    {
      title: "Industrial Automation",
      category: "IoT Projects",
      technologies: ["Arduino", "Raspberry Pi", "MQTT"],
      description: "Industrial monitoring and automation system with real-time data visualization.",
      icon: Cpu,
      color: "green",
      duration: "18-25 days"
    },
    {
      title: "Network Security Tools",
      category: "Cybersecurity",
      technologies: ["Python", "Wireshark", "Kali Linux"],
      description: "Security tools for network monitoring, vulnerability assessment, and penetration testing.",
      icon: Shield,
      color: "red",
      duration: "15-20 days"
    },
    {
      title: "Encryption Systems",
      category: "Cybersecurity",
      technologies: ["Java", "C++", "Cryptography"],
      description: "Advanced encryption and decryption systems for secure data transmission.",
      icon: Shield,
      color: "red",
      duration: "12-18 days"
    },
    {
      title: "Interactive Data Dashboards",
      category: "Data Science",
      technologies: ["Python", "Pandas", "Plotly"],
      description: "Real-time data visualization dashboards with interactive charts and analytics.",
      icon: Database,
      color: "indigo",
      duration: "10-14 days"
    },
    {
      title: "Big Data Processing",
      category: "Data Science",
      technologies: ["Python", "Apache Spark", "Hadoop"],
      description: "Large-scale data processing and analysis systems for business intelligence.",
      icon: Database,
      color: "indigo",
      duration: "20-30 days"
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getColorClasses = (color: string, isPopular: boolean = false) => {
    const baseClasses = "transition-all duration-300 hover:shadow-2xl transform hover:scale-105";
    const colors = {
      blue: `${baseClasses} border-blue-200 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 ${isPopular ? 'ring-2 ring-blue-400 shadow-xl' : ''}`,
      orange: `${baseClasses} border-orange-200 hover:border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100`,
      purple: `${baseClasses} border-purple-200 hover:border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100`,
      green: `${baseClasses} border-green-200 hover:border-green-300 bg-gradient-to-br from-green-50 to-green-100`,
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
              <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors hover:scale-105 transform text-sm lg:text-base">Services</Link>
              <Link to="/project-topics" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1 text-sm lg:text-base">Project Topics</Link>
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
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/project-topics" 
                className="block py-2 text-blue-600 font-semibold border-b-2 border-blue-600"
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
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Project Topics</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Explore our extensive collection of project ideas across different technology domains with cutting-edge solutions
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200 shadow-md hover:shadow-lg'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={index} className={`${getColorClasses(project.color, project.popular)} relative overflow-hidden`}>
                {project.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <project.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <span className="text-sm text-gray-500 font-medium">{project.category}</span>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm rounded-full font-medium border border-blue-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white/50 p-3 rounded-lg">
                      <span className="text-sm text-gray-600 font-medium">🕒 {project.duration}</span>
                      <Link to="/contact">
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                          Get Started →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Project CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 mx-4 my-16 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Have a Different Project Idea?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Don't see your project type listed? We work on custom projects across all technology domains.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all px-8 py-4">
              Submit Your Custom Project Idea
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectTopics;
