import React, { useState, useEffect } from 'react';
import { Heart, Brain, Users, Calendar, MessageCircle, Shield, ArrowRight, Menu, X } from 'lucide-react';
import Vector from '../assets/Vector.png';
import { useNavigate } from 'react-router-dom';
export default function MentalHealthHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Therapy Sessions",
      description: "Professional one-on-one therapy with licensed therapists tailored to your needs."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Support",
      description: "Connect with others in a safe, supportive community environment."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "24/7 Crisis Support",
      description: "Immediate help when you need it most, available around the clock."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Wellness Programs",
      description: "Structured programs for anxiety, depression, stress management and more."
    }
  ];

  const stats = [
    { number: "10k+", label: "People Helped" },
    { number: "50+", label: "Licensed Therapists" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];
//D4E7ED
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #D4E7ED 0%, #CBDAC8 50%, #CBDAC8 100%)' }}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src={Vector} width={50} height={50} alt="" />
              <span className="text-2xl font-bold text-slate-700">
                All Izz Well
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 transition-colors hover:text-[#6C8F5E]" >About</a>
              <a href="#contact" className="text-gray-700 transition-colors hover:text-[#6C8F5E]" >Contact</a>
              <button className="text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-95 transition-all" 
              onClick={()=>navigate('/register')}
                      style={{ background: 'linear-gradient(135deg, #A8C699 0%, #6C8F5E 100%)' }}>
                Get Started
              </button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: '#6C8F5E' }}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-md" style={{ backgroundColor: 'rgba(212, 231, 237, 0.95)' }}>
            <div className="px-4 py-4 space-y-3">
              <a href="#about" className="block text-slate-700 hover:text-[#6C8F5E]" >About</a>
              <a href="#contact" className="block text-slate-700 hover:text-[#6C8F5E]" >Contact</a>
              <button className="w-full text-white px-6 py-2 rounded-full" 
              onClick={()=>navigate('/register')}
                      style={{ background: 'linear-gradient(135deg, #A8C699 0%, #6C8F5E 100%)' }}>
                        
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold" 
                      style={{ backgroundColor: '#CBDAC8', color: '#6C8F5E' }}>
                  Your Mental Health Matters
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Peace of Mind,
                <span className="block" style={{ color: '#6C8F5E' }}>
                  One Step at a Time
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                Professional mental health support that's accessible, compassionate, and tailored to your unique journey toward wellness.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2 text-sm sm:text-base" 
                        style={{ background: 'linear-gradient(135deg, #A8C699 0%, #6C8F5E 100%)' }}>
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button className="border-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all text-sm sm:text-base" 
                        style={{ borderColor: '#6C8F5E', color: '#6C8F5E', backgroundColor: 'transparent' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CBDAC8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="relative mt-8 md:mt-0">
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl blur-3xl opacity-30 animate-pulse" 
                   style={{ backgroundColor: '#A8C699' }}></div>
              <div className="relative backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl" 
                   style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0" style={{ color: '#6C8F5E' }} />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">100% Confidential</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Your privacy is our priority</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0" style={{ color: '#A8C699' }} />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Licensed Professionals</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Certified and experienced</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0" style={{ color: '#A8C690' }} />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Compassionate Care</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Supportive and understanding</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 backdrop-blur-sm" 
               style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#6C8F5E' }}>
                  {stat.number}
                </div>
                <div className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Services
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Comprehensive mental health support designed to help you thrive
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4" 
                     style={{ background: 'linear-gradient(135deg, #CBDAC8 0%, #A8C699 100%)', color: '#6C8F5E' }}>
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center shadow-2xl" 
               style={{ background: 'linear-gradient(135deg, #A8C699 0%, #6C8F5E 100%)' }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8" style={{ color: '#D4E7ED' }}>
              Take the first step towards better mental health today
            </p>
            <button className="bg-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all font-semibold" 
                    style={{ color: '#6C8F5E' }}>
              Schedule a Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#6C8F5E' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <img src={Vector} width={50} height={50} alt="" />
                <span className="text-lg sm:text-xl font-bold">All Izz Well</span>
              </div>
              <p className="text-sm sm:text-base" style={{ color: '#D4E7ED' }}>Supporting your mental wellness journey with compassion and expertise.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
              <ul className="space-y-2 text-xs sm:text-sm" style={{ color: '#D4E7ED' }}>
                <li><a href="#" className="hover:text-white transition-colors">Therapy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Group Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Crisis Help</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wellness Programs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 text-xs sm:text-sm" style={{ color: '#D4E7ED' }}>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Crisis Resources</h4>
              <p className="mb-2 text-xs sm:text-sm" style={{ color: '#D4E7ED' }}>24/7 Crisis Hotline:</p>
              <p className="font-semibold text-base sm:text-lg" style={{ color: '#A8C699' }}>1-800-273-8255</p>
            </div>
          </div>
          <div className="border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm" style={{ borderColor: '#A8C699', color: '#D4E7ED' }}>
            <p>&copy; 2024 MindfulCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}