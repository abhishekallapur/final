import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Upload, CheckCircle, Clock, FileText, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    college: '',
    projectType: '',
    projectTitle: '',
    projectDescription: '',
    deadline: '',
    budget: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, or DOCX file.",
          variant: "destructive"
        });
        return;
      }

      if (selectedFile.size > maxSize) {
        toast({
          title: "File too large",
          description: "File size must be less than 10MB.",
          variant: "destructive"
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('project-files')
      .upload(fileName, file);

    if (error) {
      console.error('File upload error:', error);
      toast({
        title: "File upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive"
      });
      return null;
    }

    return `https://vehvecxeforxrvghhmlp.supabase.co/storage/v1/object/public/project-files/${data.path}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let fileUrl = null;
      
      // Upload file if one was selected
      if (file) {
        fileUrl = await uploadFile(file);
        if (!fileUrl) {
          setIsSubmitting(false);
          return;
        }
      }

      // Insert project request into database
      const { error } = await supabase
        .from('project_requests')
        .insert({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          project_type: formData.projectType,
          project_title: formData.projectTitle,
          project_description: formData.projectDescription,
          deadline: formData.deadline || null,
          budget: formData.budget,
          file_url: fileUrl,
          status: 'Submitted'
        });

      if (error) {
        console.error('Database error:', error);
        toast({
          title: "Submission failed",
          description: "There was an error submitting your request. Please try again.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Project Request Submitted!",
        description: "We'll review your requirements and get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        college: '',
        projectType: '',
        projectTitle: '',
        projectDescription: '',
        deadline: '',
        budget: ''
      });
      setFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Submission failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const processSteps = [
    {
      icon: FileText,
      title: "We review your requirements within 2 hours",
      step: 1
    },
    {
      icon: User,
      title: "You receive a detailed proposal and timeline",
      step: 2
    },
    {
      icon: CheckCircle,
      title: "Work begins immediately after approval",
      step: 3
    },
    {
      icon: Clock,
      title: "Regular updates throughout the project",
      step: 4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation with enhanced styling */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <Link to="/" className="flex items-center group">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                AcademicPro
              </span>
            </Link>
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
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium text-sm lg:text-base">Home</Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium text-sm lg:text-base">Services</Link>
              <Link to="/project-topics" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium text-sm lg:text-base">Project Topics</Link>
              <Link to="/contact" className="text-blue-600 font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 text-sm lg:text-base">Contact</Link>
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm lg:text-base">
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
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Project Topics
              </Link>
              <Link 
                to="/contact" 
                className="block py-2 text-blue-600 font-semibold border-b-2 border-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Contact Information with enhanced styling */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
                Contact Information
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Get in touch with us for your academic project needs. We're here to help you succeed.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-4 md:space-x-6 p-4 md:p-6 bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-100">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 md:p-4 rounded-lg md:rounded-xl shadow-md">
                  <Mail className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base md:text-lg">Email Us</h3>
                  <p className="text-gray-700 font-medium text-sm md:text-base">info@academicpro.com</p>
                  <p className="text-xs md:text-sm text-blue-600 font-medium">We respond within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 md:space-x-6 p-4 md:p-6 bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-yellow-100">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 md:p-4 rounded-lg md:rounded-xl shadow-md">
                  <Phone className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base md:text-lg">Call Us</h3>
                  <p className="text-gray-700 font-medium text-sm md:text-base">+1 (555) 123-4567</p>
                  <p className="text-xs md:text-sm text-orange-600 font-medium">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 md:space-x-6 p-4 md:p-6 bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-green-100">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 md:p-4 rounded-lg md:rounded-xl shadow-md">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base md:text-lg">Live Chat</h3>
                  <p className="text-gray-700 font-medium text-sm md:text-base">Available 24/7</p>
                  <p className="text-xs md:text-sm text-green-600 font-medium">Instant support for urgent queries</p>
                </div>
              </div>
            </div>

            {/* Library Image with enhanced styling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl md:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img 
                src="/lovable-uploads/4b4d2d3c-3f84-450c-a19f-1eff31753fe1.png" 
                alt="Academic library" 
                className="relative rounded-2xl md:rounded-3xl shadow-2xl w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover border-4 border-white/50 group-hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Process Steps with enhanced styling */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-blue-100">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6 md:mb-8 text-center lg:text-left">
                What Happens Next?
              </h3>
              <div className="space-y-4 md:space-y-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 md:space-x-4 group hover:scale-105 transition-all duration-300">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 md:p-3 rounded-full flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <step.icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-2 md:px-3 py-1 rounded-full mr-2 md:mr-3 font-semibold shadow-md">
                        {step.step}
                      </span>
                      <span className="text-gray-700 font-medium text-sm md:text-base">{step.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form with enhanced styling */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 animate-fade-in delay-200">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-6 md:p-8">
              <CardTitle className="text-2xl md:text-3xl font-bold">Send Us Your Requirements</CardTitle>
              <CardDescription className="text-blue-100 text-base md:text-lg">
                Fill out the form below and we'll get back to you with a detailed proposal
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700 font-semibold text-sm md:text-base">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300 text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700 font-semibold text-sm md:text-base">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300 text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-semibold text-sm md:text-base">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@university.edu"
                    required
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300 text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-semibold text-sm md:text-base">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300 text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="college" className="text-gray-700 font-semibold text-sm md:text-base">College/University</Label>
                  <Input
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    placeholder="Your institution name"
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300 text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-gray-700 font-semibold text-sm md:text-base">Project Type *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, projectType: value})}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300 text-sm md:text-base">
                      <SelectValue placeholder="Select project type..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-xl">
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="mobile-app">Mobile Application</SelectItem>
                      <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                      <SelectItem value="iot">IoT Project</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="ieee-paper">IEEE Paper</SelectItem>
                      <SelectItem value="research-paper">Research Paper</SelectItem>
                      <SelectItem value="documentation">Documentation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectTitle" className="text-gray-700 font-semibold text-sm md:text-base">Project Topic/Title *</Label>
                  <Input
                    id="projectTitle"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., E-commerce Website with Payment Integration"
                    required
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300 text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDescription" className="text-gray-700 font-semibold text-sm md:text-base">Project Description *</Label>
                  <Textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    placeholder="Please provide detailed requirements, features needed, technologies to be used, deadline, and any specific requirements..."
                    rows={4}
                    required
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300 resize-none text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-gray-700 font-semibold text-sm md:text-base">Deadline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300 text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file" className="text-gray-700 font-semibold text-sm md:text-base">Upload Requirements (PDF/DOC/DOCX)</Label>
                  <div className="border-2 border-dashed border-blue-300 rounded-xl md:rounded-2xl p-4 md:p-8 text-center hover:border-blue-500 transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100">
                    <Upload className="h-8 w-8 md:h-10 md:w-10 text-blue-500 mx-auto mb-3 md:mb-4" />
                    <input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="file" className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold text-base md:text-lg">
                      Click to upload or drag and drop
                    </label>
                    <p className="text-xs md:text-sm text-gray-500 mt-2 font-medium">PDF, DOC, DOCX up to 10MB each</p>
                    {file && (
                      <p className="text-xs md:text-sm text-green-600 mt-3 font-semibold bg-green-50 rounded-lg p-2 inline-block">
                        ✓ Selected: {file.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-gray-700 font-semibold text-sm md:text-base">Budget Range</Label>
                  <Select onValueChange={(value) => setFormData({...formData, budget: value})}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300 text-sm md:text-base">
                      <SelectValue placeholder="Select budget range..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-xl">
                      <SelectItem value="under-100">Under $100</SelectItem>
                      <SelectItem value="100-300">$100 - $300</SelectItem>
                      <SelectItem value="300-500">$300 - $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1000</SelectItem>
                      <SelectItem value="1000-plus">$1000+</SelectItem>
                      <SelectItem value="discuss">Let's Discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-start space-x-3 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <input
                    type="checkbox"
                    id="updates"
                    className="h-4 w-4 md:h-5 md:w-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500 mt-1"
                    required
                  />
                  <Label htmlFor="updates" className="text-xs md:text-sm font-medium text-gray-700">
                    I agree to receive project updates and academic resources via email
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base md:text-lg py-4 md:py-6 font-semibold" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Project Request"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
