import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Droplet, Clock, Share2, Database, Users } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Health Sync</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/login')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-teal-400 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Your Health Records, Simplified
              </h1>
              <p className="mt-4 text-xl text-blue-50">
                Track your medical data, manage appointments, and take control of your health journey—all in one secure platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md shadow-md transition-colors"
                >
                  Get Started
                </button>
                <button className="bg-transparent text-white border border-white hover:bg-white hover:text-blue-600 font-medium py-3 px-6 rounded-md transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Doctor with patient using digital tablet" 
                className="max-w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Keep Your Health Data in One Place</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Health Sync helps you manage your medical information efficiently and securely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <Database className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Medical Records Storage</h3>
              <p className="text-gray-600">
                Securely store and organize all your medical records, lab results, and health documents in one centralized location.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Appointment Tracking</h3>
              <p className="text-gray-600">
                Manage your medical appointments, receive timely reminders, and never miss an important healthcare visit.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <Droplet className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Medication Management</h3>
              <p className="text-gray-600">
                Track your medications, dosages, and schedules with automated reminders to ensure you never miss a dose.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure and Private</h3>
              <p className="text-gray-600">
                Your health data is protected with industry-leading security measures and strict privacy controls.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <Share2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Sharing</h3>
              <p className="text-gray-600">
                Securely share your medical information with healthcare providers or family members when needed.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Family Accounts</h3>
              <p className="text-gray-600">
                Manage health records for the whole family with dedicated profiles for each family member.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">James Wilson</h4>
                  <p className="text-gray-500 text-sm">Patient</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Health Sync has completely transformed how I manage my chronic condition. Having all my records in one place makes doctor visits so much easier."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">Healthcare Provider</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a physician, I appreciate when patients use Health Sync. It gives me a complete picture of their medical history and current medications."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Maria Rodriguez</h4>
                  <p className="text-gray-500 text-sm">Family Caregiver</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Managing healthcare for my elderly parents was overwhelming until I found Health Sync. Now I can keep track of all their appointments and medications."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to take control of your health data?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of users who are already managing their health journey more effectively with Health Sync.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-md shadow-md transition-colors text-lg"
          >
            Get Started for Free
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Health Sync</h3>
              <p className="text-gray-400">
                Secure, reliable health records and appointment tracking for modern healthcare.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Protection</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2025 Health Sync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;