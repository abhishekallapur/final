import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Upload, CheckCircle, Clock, FileText, User, Facebook, Twitter, Linkedin, Instagram, Menu, X } from 'lucide-react';
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
  const [showWhatsapp, setShowWhatsapp] = useState(false);
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
      const { error: dbError } = await supabase
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

      if (dbError) {
        console.error('Database error:', dbError);
        toast({
          title: "Submission failed",
          description: "There was an error submitting your request. Please try again.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-project-notification', {
        body: {
          to: import.meta.env.VITE_CONTACT_EMAIL,
          subject: `New Project Request: ${formData.projectTitle}`,
          html: `
            <h2>New Project Request Received</h2>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>College:</strong> ${formData.college}</p>
            <p><strong>Project Type:</strong> ${formData.projectType}</p>
            <p><strong>Project Title:</strong> ${formData.projectTitle}</p>
            <p><strong>Description:</strong> ${formData.projectDescription}</p>
            <p><strong>Deadline:</strong> ${formData.deadline || 'Not specified'}</p>
            <p><strong>Budget:</strong> ${formData.budget}</p>
            ${fileUrl ? `<p><strong>File:</strong> <a href="${fileUrl}">View Requirements</a></p>` : ''}
          `
        }
      });

      if (emailError) {
        console.error('Email notification error:', emailError);
        // Don't show error to user since the form was submitted successfully
      }

      // Send confirmation email to client
      const { error: clientEmailError } = await supabase.functions.invoke('send-project-notification', {
        body: {
          to: formData.email,
          subject: 'Project Request Received - ProjectEra',
          html: `
            <h2>Thank you for your project request!</h2>
            <p>Dear ${formData.firstName},</p>
            <p>We have received your project request and will review it within 2 hours. Our team will get back to you with a detailed proposal and timeline.</p>
            <p>Here's a summary of your request:</p>
            <ul>
              <li><strong>Project Type:</strong> ${formData.projectType}</li>
              <li><strong>Project Title:</strong> ${formData.projectTitle}</li>
              <li><strong>Deadline:</strong> ${formData.deadline || 'Not specified'}</li>
              <li><strong>Budget Range:</strong> ${formData.budget}</li>
            </ul>
            <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
            <p>Best regards,<br>The ProjectEra Team</p>
          `
        }
      });

      if (clientEmailError) {
        console.error('Client confirmation email error:', clientEmailError);
        // Don't show error to user since the form was submitted successfully
      }

      toast({
        title: "Project Request Submitted!",
        description: "We'll review your requirements and get back to you within 24 hours.",
      });
      setShowWhatsapp(true);
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

  const email = import.meta.env.VITE_CONTACT_EMAIL;
  const phone = import.meta.env.VITE_CONTACT_PHONE;
  const whatsappLink = import.meta.env.VITE_WHATSAPP_LINK;

  // Social Media Links
  const instagramLink = import.meta.env.VITE_INSTAGRAM_LINK;
  const linkedinLink = import.meta.env.VITE_LINKEDIN_LINK;
  const facebookLink = import.meta.env.VITE_FACEBOOK_LINK;
  const twitterLink = import.meta.env.VITE_TWITTER_LINK;

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
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium">Home</Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium">Services</Link>
              <Link to="/project-topics" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium">Project Topics</Link>
              <Link to="/contact" className="text-blue-600 font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600">Contact</Link>
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact Information with enhanced styling */}
          <div className="space-y-8 animate-fade-in">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
                Contact Information
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Get in touch with us for your academic project needs. We're here to help you succeed.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-6 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-100">
                <a href={`mailto:${email}`} className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-md flex-shrink-0 hover:scale-110 transition-transform" aria-label="Email">
                  <Mail className="h-6 w-6 text-white" />
                </a>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
                  <a href={`mailto:${email}`} className="text-gray-700 font-medium hover:underline">{email}</a>
                  <p className="text-sm text-blue-600 font-medium">We respond within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-yellow-100">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-yellow-500 to-orange-500 p-4 rounded-xl shadow-md flex-shrink-0 hover:scale-110 transition-transform" aria-label="WhatsApp">
                  <Phone className="h-6 w-6 text-white" />
                </a>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Call Us</h3>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-700 font-medium hover:underline">{phone}</a>
                  <p className="text-sm text-orange-600 font-medium">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-green-100">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-xl shadow-md">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Live Chat</h3>
                  <p className="text-gray-700 font-medium">Available 24/7</p>
                  <p className="text-sm text-green-600 font-medium">Instant support for urgent queries</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-100">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-xl shadow-md">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors hover:scale-110" aria-label="Facebook">
                      <Facebook className="h-5 w-5 text-white" />
                    </a>
                    <a href={twitterLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-400 hover:bg-blue-500 rounded-full transition-colors hover:scale-110" aria-label="Twitter">
                      <Twitter className="h-5 w-5 text-white" />
                    </a>
                    <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-700 hover:bg-blue-800 rounded-full transition-colors hover:scale-110" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5 text-white" />
                    </a>
                    <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-600 hover:bg-pink-700 rounded-full transition-colors hover:scale-110" aria-label="Instagram">
                      <Instagram className="h-5 w-5 text-white" />
                    </a>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-600 hover:bg-green-700 rounded-full transition-colors hover:scale-110" aria-label="WhatsApp">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Library Image with enhanced styling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img 
                src="/lovable-uploads/image.png" 
                alt="Academic library" 
                className="relative rounded-3xl shadow-2xl w-full h-72 object-cover border-4 border-white/50 group-hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Process Steps with enhanced styling */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-8 text-center lg:text-left">
                What Happens Next?
              </h3>
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 group hover:scale-105 transition-all duration-300">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-full flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full mr-3 font-semibold shadow-md">
                        {step.step}
                      </span>
                      <span className="text-gray-700 font-medium">{step.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form with enhanced styling */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 animate-fade-in delay-200">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold">Send Us Your Requirements</CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Fill out the form below and we'll get back to you with a detailed proposal
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700 font-semibold">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700 font-semibold">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-semibold">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@university.edu"
                    required
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="college" className="text-gray-700 font-semibold">College/University</Label>
                  <Input
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    placeholder="Your institution name"
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-gray-700 font-semibold">Project Type *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, projectType: value})}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300">
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
                  <Label htmlFor="projectTitle" className="text-gray-700 font-semibold">Project Topic/Title *</Label>
                  <Input
                    id="projectTitle"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., E-commerce Website with Payment Integration"
                    required
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDescription" className="text-gray-700 font-semibold">Project Description *</Label>
                  <Textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    placeholder="Please provide detailed requirements, features needed, technologies to be used, deadline, and any specific requirements..."
                    rows={5}
                    required
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-gray-700 font-semibold">Deadline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file" className="text-gray-700 font-semibold">Upload Requirements (PDF/DOC/DOCX)</Label>
                  <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100">
                    <Upload className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                    <input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="file" className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold text-lg">
                      Click to upload or drag and drop
                    </label>
                    <p className="text-sm text-gray-500 mt-2 font-medium">PDF, DOC, DOCX up to 10MB each</p>
                    {file && (
                      <p className="text-sm text-green-600 mt-3 font-semibold bg-green-50 rounded-lg p-2 inline-block">
                        ✓ Selected: {file.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-gray-700 font-semibold">Budget Range</Label>
                  <Select onValueChange={(value) => setFormData({...formData, budget: value})}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-300 hover:border-blue-300">
                      <SelectValue placeholder="Select budget range..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-xl">
                      <SelectItem value="under-8300">Under ₹8,300</SelectItem>
                      <SelectItem value="8300-24900">₹8,300 - ₹24,900</SelectItem>
                      <SelectItem value="24900-41500">₹24,900 - ₹41,500</SelectItem>
                      <SelectItem value="41500-83000">₹41,500 - ₹83,000</SelectItem>
                      <SelectItem value="83000-plus">₹83,000+</SelectItem>
                      <SelectItem value="discuss">Let's Discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <input
                    type="checkbox"
                    id="updates"
                    className="h-5 w-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500"
                    required
                  />
                  <Label htmlFor="updates" className="text-sm font-medium text-gray-700">
                    I agree to receive project updates and academic resources via email
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg py-6 font-semibold" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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
      {showWhatsapp && (
        <div className="mt-6 flex flex-col items-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 text-lg mt-2"
          >
            Chat with us on WhatsApp
          </a>
          <p className="text-green-700 mt-2 font-medium">For instant support, click the button above to chat with us on WhatsApp!</p>
        </div>
      )}
    </div>
  );
};

export default Contact;