import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Clipboard, Shield, Edit2, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingMedical, setIsEditingMedical] = useState(false);
  
  // Mock user profile data
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-06-15',
    address: '123 Main St, Anytown, CA 94705',
    emergencyContact: 'Jane Doe (Spouse) - (555) 987-6543'
  });
  
  const [medicalInfo, setMedicalInfo] = useState({
    bloodType: 'O+',
    allergies: 'Penicillin, Peanuts',
    conditions: 'Hypertension, Asthma',
    primaryCare: 'Dr. Sarah Johnson - (555) 111-2222',
    lastPhysical: '2025-01-10',
    insurance: 'BlueCross BlueShield - Policy #BCS12345678'
  });
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value
    });
  };
  
  const handleMedicalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMedicalInfo({
      ...medicalInfo,
      [name]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-600">Manage your personal and medical information</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Personal Information */}
        <div className="lg:w-1/2 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              <button 
                onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                className="text-blue-600 hover:text-blue-800"
              >
                {isEditingPersonal ? (
                  <Save className="h-5 w-5" />
                ) : (
                  <Edit2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold mb-3">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </div>
                {isEditingPersonal && (
                  <button className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 text-white">
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <h3 className="text-xl font-medium text-gray-900">{personalInfo.name}</h3>
              <p className="text-gray-500">Patient ID: PT-{user?.id || '12345'}</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditingPersonal ? (
                    <input
                      type="text"
                      name="name"
                      value={personalInfo.name}
                      onChange={handlePersonalInfoChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  ) : (
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{personalInfo.name}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  {isEditingPersonal ? (
                    <input
                      type="email"
                      name="email"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{personalInfo.email}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  {isEditingPersonal ? (
                    <input
                      type="tel"
                      name="phone"
                      value={personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  {isEditingPersonal ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={personalInfo.dateOfBirth}
                      onChange={handlePersonalInfoChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{new Date(personalInfo.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {isEditingPersonal ? (
                  <input
                    type="text"
                    name="address"
                    value={personalInfo.address}
                    onChange={handlePersonalInfoChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <span>{personalInfo.address}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                {isEditingPersonal ? (
                  <input
                    type="text"
                    name="emergencyContact"
                    value={personalInfo.emergencyContact}
                    onChange={handlePersonalInfoChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <span>{personalInfo.emergencyContact}</span>
                  </div>
                )}
              </div>
            </div>
            
            {isEditingPersonal && (
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  onClick={() => setIsEditingPersonal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsEditingPersonal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Medical Information */}
        <div className="lg:w-1/2 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Medical Information</h2>
              <button 
                onClick={() => setIsEditingMedical(!isEditingMedical)}
                className="text-blue-600 hover:text-blue-800"
              >
                {isEditingMedical ? (
                  <Save className="h-5 w-5" />
                ) : (
                  <Edit2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                  {isEditingMedical ? (
                    <input
                      type="text"
                      name="bloodType"
                      value={medicalInfo.bloodType}
                      onChange={handleMedicalInfoChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Droplet className="h-4 w-4 text-red-500 mr-2" />
                      <span>{medicalInfo.bloodType}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Physical Exam</label>
                  {isEditingMedical ? (
                    <input
                      type="date"
                      name="lastPhysical"
                      value={medicalInfo.lastPhysical}
                      onChange={handleMedicalInfoChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{new Date(medicalInfo.lastPhysical).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                {isEditingMedical ? (
                  <textarea
                    name="allergies"
                    value={medicalInfo.allergies}
                    onChange={handleMedicalInfoChange}
                    rows={2}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                    <span>{medicalInfo.allergies || 'No known allergies'}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
                {isEditingMedical ? (
                  <textarea
                    name="conditions"
                    value={medicalInfo.conditions}
                    onChange={handleMedicalInfoChange}
                    rows={2}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <div className="flex items-start">
                    <Clipboard className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <span>{medicalInfo.conditions || 'No recorded conditions'}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Care Provider</label>
                {isEditingMedical ? (
                  <input
                    type="text"
                    name="primaryCare"
                    value={medicalInfo.primaryCare}
                    onChange={handleMedicalInfoChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{medicalInfo.primaryCare}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Information</label>
                {isEditingMedical ? (
                  <input
                    type="text"
                    name="insurance"
                    value={medicalInfo.insurance}
                    onChange={handleMedicalInfoChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{medicalInfo.insurance}</span>
                  </div>
                )}
              </div>
            </div>
            
            {isEditingMedical && (
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  onClick={() => setIsEditingMedical(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsEditingMedical(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-2">Privacy Preferences</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700">Allow sharing data with healthcare providers</p>
                    <p className="text-xs text-gray-500">Share your medical records with your authorized healthcare providers</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" id="toggle-1" defaultChecked className="sr-only" />
                    <label htmlFor="toggle-1" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700">Email notifications</p>
                    <p className="text-xs text-gray-500">Receive email notifications for appointments and medication reminders</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" id="toggle-2" defaultChecked className="sr-only" />
                    <label htmlFor="toggle-2" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700">Two-factor authentication</p>
                    <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" id="toggle-3" className="sr-only" />
                    <label htmlFor="toggle-3" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-md font-medium text-gray-900 mb-2">Account Management</h3>
              <div className="space-y-2">
                <button className="text-sm text-blue-600 hover:text-blue-800">Change password</button>
                <div className="flex items-center">
                  <button className="text-sm text-red-600 hover:text-red-800">Delete account</button>
                  <span className="ml-2 text-xs text-gray-500">This action cannot be undone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MapPin: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const AlertCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertTriangle: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const Droplet: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

export default Profile;