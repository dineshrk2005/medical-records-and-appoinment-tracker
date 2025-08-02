import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Calendar, 
  Pill, 
  User, 
  LogOut, 
  BellRing, 
  LayoutDashboard 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-blue-600">Health Sync</h1>
          <p className="text-sm text-gray-500">Medical Records & Appointments</p>
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <nav className="flex-1 space-y-2">
            <button 
              onClick={() => navigate('/app/dashboard')}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            
            <button 
              onClick={() => navigate('/app/records')}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <FileText className="w-5 h-5 mr-3" />
              Medical Records
            </button>
            
            <button 
              onClick={() => navigate('/app/appointments')}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Appointments
            </button>
            
            <button 
              onClick={() => navigate('/app/medications')}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Pill className="w-5 h-5 mr-3" />
              Medications
            </button>
            
            <button 
              onClick={() => navigate('/app/profile')}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <User className="w-5 h-5 mr-3" />
              Profile
            </button>
          </nav>
          
          <div className="mt-auto pt-4 border-t border-gray-200">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold text-blue-600">Health Sync</h1>
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-500 hover:text-blue-600">
              <BellRing className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
              className="text-gray-500 hover:text-blue-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div id="mobile-menu" className="hidden bg-white border-b border-gray-200">
          <nav className="px-4 py-2 space-y-1">
            <button 
              onClick={() => {
                navigate('/app/dashboard');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            
            <button 
              onClick={() => {
                navigate('/app/records');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              <FileText className="w-5 h-5 mr-3" />
              Medical Records
            </button>
            
            <button 
              onClick={() => {
                navigate('/app/appointments');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Appointments
            </button>
            
            <button 
              onClick={() => {
                navigate('/app/medications');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              <Pill className="w-5 h-5 mr-3" />
              Medications
            </button>
            
            <button 
              onClick={() => {
                navigate('/app/profile');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              <User className="w-5 h-5 mr-3" />
              Profile
            </button>
            
            <button 
              onClick={() => {
                handleLogout();
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="flex items-center w-full px-4 py-2 text-red-600 rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 mt-16 md:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;