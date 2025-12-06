import React, { useState } from 'react';
import {
  Heart,
  Brain,
  Users,
  Calendar,
  MessageCircle,
  Shield,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';

import Vector from '../assets/Vector.png';
import AboutIllustration from '../assets/Frame.png';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();

  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Therapy Sessions',
      description:
        'Professional one-on-one therapy with licensed therapists tailored to your needs.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Group Support',
      description:
        'Connect with others in a safe, supportive community environment.',
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: '24/7 Crisis Support',
      description: 'Immediate help when you need it most, available around the clock.',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Wellness Programs',
      description:
        'Structured programs for anxiety, depression, stress management and more.',
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#DFFCEB] via-[#EDEBFF] to-[#FFE9F6] p-4 md:p-6"
    >
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 bg-transparent`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src={Vector} width={50} height={50} alt="" />
              <span className="text-2xl font-bold text-slate-700">All Izz Well</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {/* FIXED: Points to About Section */}
              <a
                href="#about"
                className="text-gray-700 transition-colors hover:text-[#6C8F5E]"
              >
                About
              </a>

              <button
                onClick={() => setShowContact(true)}
                className="text-gray-700 transition-colors hover:text-[#6C8F5E]"
              >
                Contact
              </button>

              <button
                className="text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-95 transition-all
                  bg-gradient-to-br from-[#A8C699] to-[#6C8F5E]"
                onClick={() => navigate('/register')}
              >
                Get Started
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: '#6C8F5E' }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden backdrop-blur-md"
            style={{ backgroundColor: 'rgba(237, 235, 255, 0.95)' }}
          >
            <div className="px-4 py-4 space-y-3">
              <a
                href="#about"
                className="block text-slate-700 hover:text-[#6C8F5E]"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>

              <button
                onClick={() => {
                  setShowContact(true);
                  setIsMenuOpen(false);
                }}
                className="block text-left text-slate-700 hover:text-[#6C8F5E]"
              >
                Contact
              </button>

              <button
                className="w-full text-white px-6 py-2 rounded-full bg-gradient-to-br from-[#A8C699] to-[#6C8F5E]"
                onClick={() => navigate('/register')}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* LEFT */}
          <div className="space-y-6">
            <span
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: '#CBDAC8', color: '#6C8F5E' }}
            >
              <b>TEAM</b> print("Positivity")
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Find Peace of Mind,
              <span className="block text-[#6C8F5E]">One Step at a Time</span>
            </h1>

            <p className="text-gray-600 text-lg">
              A Digital Mental Health & Psychological Support System for Students of Higher
              Education (SIH25092)
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="text-white px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2
                  bg-gradient-to-br from-[#A8C699] to-[#6C8F5E]"
                onClick={() => navigate('/register')}
              >
                <span>Start Your Journey</span>
                <ArrowRight />
              </button>

              <button
                className="border-2 px-8 py-4 rounded-full text-[#2f871dff] border-[#247713ff] hover:bg-[#E6FFE9] transition"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT - 3 Cards */}
          <div className="relative mt-6 md:mt-0">
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-30 animate-pulse"
              style={{ backgroundColor: '#72a164ff' }}
            ></div>

            <div className="relative bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-2xl space-y-6">
              {[
                {
                  icon: <Shield className="w-12 h-12" style={{ color: '#6C8F5E' }} />,
                  title: '100% Confidential',
                  desc: 'Your privacy is our priority',
                },
                {
                  icon: <Users className="w-12 h-12" style={{ color: '#6C8F5E' }} />,
                  title: 'Counsellor - Student - IQAC Admin Interaction',
                  desc: 'Anonymous Interaction (Stigma Free Environment)',
                },
                {
                  icon: <Heart className="w-12 h-12" style={{ color: '#6C8F5E' }} />,
                  title: 'Compassionate Community',
                  desc: 'Trained Student Volunteers & Peer Support',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
                >
                  {item.icon}
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
            <p className="text-gray-600 text-lg mt-2">
              Comprehensive mental health support designed to help you thrive
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition-all"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br 
                from-[#DFFCEB] via-[#EDEBFF] to-[#FFE9F6] text-[#6C8F5E]"
                >
                  {service.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT IMAGE */}
          <div className="flex justify-center relative">
            <img
              src={AboutIllustration}
              alt="About us illustration"
              className="w-full max-w-md drop-shadow-xl"
            />
          </div>

          {/* RIGHT TEXT */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">About Us</h4>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover the Faces Behind Our Mental Health Consultancy
            </h2>

            <p className="text-gray-700 mb-4">
              We are a team of 6 members including UI/UX Designer, Frontend Developer,
              Backend Developer, Presenter, and Team Lead.
            </p>

            <ul className="text-gray-700 space-y-1 mb-6">
              <li>1. Preetis Debnath</li>
              <li>2. Homagni Choudhury</li>
              <li>3. Debraj Choudhury</li>
              <li>4. Angshuman Kashyap</li>
              <li>5. Khushi Bora</li>
              <li>6. Pakhi Dubey</li>
            </ul>

            <button className="px-6 py-3 rounded-full bg-[#6C8F5E] text-white font-semibold hover:scale-105 transition">
              More Details
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="w-full py-6 px-4 sm:px-8"
        style={{
          background: 'linear-gradient(to bottom right, #DFFCEB, #EDEBFF, #FFE9F6)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={Vector} width={50} height={50} alt="" />
                <span className="text-xl font-bold text-gray-900">All Izz Well</span>
              </div>
              <p className="text-gray-700">
                Supporting your mental wellness journey with compassion and expertise.
              </p>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900">Company</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <a href="#about" className="hover:text-[#6C8F5E] transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#6C8F5E] transition">
                    Our Team
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setShowContact(true)}
                    className="hover:text-[#6C8F5E] transition"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Hotline */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900">Crisis Resources</h4>
              <p className="text-gray-700 mb-1">24/7 Crisis Hotline:</p>
              <p className=" text-gray-700 mb-1">1-800-273-8255</p>
            </div>
          </div>

          <div className="border-t pt-4 text-center text-gray-700 text-sm">
            © TEAM print("Positivity") SIH2025. All rights reserved.
          </div>
        </div>
      </footer>

      {/* CONTACT POPUP */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-xl p-6 w-80 shadow-xl text-center">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Contact Us</h2>

            <p className="text-gray-700 mb-1">📞 +91 6000536164</p>
            <p className="text-gray-700 mb-4">📧 preetisdebnath.gdgcjec@gmail.com</p>

            <button
              onClick={() => setShowContact(false)}
              className="px-4 py-2 rounded-full bg-[#6C8F5E] text-white hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
