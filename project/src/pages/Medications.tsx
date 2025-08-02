import React, { useState } from 'react';
import { Pill, Plus, Clock, AlertCircle, Check, X, Search, Filter } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  startDate: string;
  endDate?: string;
  instructions: string;
  status: 'active' | 'completed' | 'discontinued';
  refillDate?: string;
}

const Medications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Mock medication data
  const medications: Medication[] = [
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      time: 'Morning',
      startDate: '2025-01-15',
      instructions: 'Take with water before breakfast',
      status: 'active',
      refillDate: '2025-07-15'
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: 'Morning and Evening',
      startDate: '2025-02-01',
      instructions: 'Take with meals',
      status: 'active',
      refillDate: '2025-07-01'
    },
    {
      id: '3',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily',
      time: 'Evening',
      startDate: '2025-03-10',
      instructions: 'Take at bedtime',
      status: 'active',
      refillDate: '2025-07-10'
    },
    {
      id: '4',
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times daily',
      time: 'Morning, Afternoon, Evening',
      startDate: '2025-04-05',
      endDate: '2025-04-15',
      instructions: 'Take until finished even if symptoms improve',
      status: 'completed'
    },
    {
      id: '5',
      name: 'Prednisone',
      dosage: '10mg',
      frequency: 'Once daily',
      time: 'Morning',
      startDate: '2025-02-10',
      endDate: '2025-03-10',
      instructions: 'Take with food. Do not stop abruptly.',
      status: 'discontinued'
    }
  ];

  // Filter medications based on search term and selected filter
  const filteredMedications = medications.filter(medication => {
    const matchesSearch = 
      medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.dosage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.instructions.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') {
      return matchesSearch;
    }
    
    return matchesSearch && medication.status === selectedFilter;
  });

  // Function to get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'discontinued':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Check if refill is needed soon (within 7 days)
  const isRefillNeededSoon = (refillDate?: string) => {
    if (!refillDate) return false;
    
    const today = new Date();
    const refill = new Date(refillDate);
    const diffTime = refill.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 && diffDays <= 7;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medications</h1>
          <p className="text-gray-600">Manage your medications and track refills</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Add Medication
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-md p-3">
              <Pill className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Medications</p>
              <p className="text-2xl font-semibold text-gray-900">
                {medications.filter(med => med.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-md p-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Completed Courses</p>
              <p className="text-2xl font-semibold text-gray-900">
                {medications.filter(med => med.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-md p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Upcoming Refills</p>
              <p className="text-2xl font-semibold text-gray-900">
                {medications.filter(med => med.status === 'active' && isRefillNeededSoon(med.refillDate)).length}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search medications by name, dosage, or instructions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative inline-flex w-full md:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All Medications</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="discontinued">Discontinued</option>
          </select>
        </div>
      </div>
      
      {/* Medications List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredMedications.length > 0 ? (
            filteredMedications.map((medication) => (
              <li key={medication.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                        <Pill className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium text-gray-900">{medication.name}</h3>
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {medication.dosage}
                          </span>
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(medication.status)}`}>
                            {medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{medication.frequency} • {medication.time}</p>
                        <p className="mt-1 text-sm text-gray-600">{medication.instructions}</p>
                        
                        <div className="mt-2 text-xs text-gray-500">
                          <span>Started: {new Date(medication.startDate).toLocaleDateString()}</span>
                          {medication.endDate && (
                            <span> • Ended: {new Date(medication.endDate).toLocaleDateString()}</span>
                          )}
                        </div>
                        
                        {medication.refillDate && medication.status === 'active' && (
                          <div className={`mt-2 flex items-center ${
                            isRefillNeededSoon(medication.refillDate) ? 'text-yellow-600' : 'text-gray-600'
                          }`}>
                            {isRefillNeededSoon(medication.refillDate) && (
                              <AlertCircle className="h-4 w-4 mr-1" />
                            )}
                            <span className="text-xs font-medium">
                              Refill by: {new Date(medication.refillDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {medication.status === 'active' && (
                        <>
                          <button className="p-1 rounded text-blue-600 hover:bg-blue-50 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-1 rounded text-red-600 hover:bg-red-50 focus:outline-none">
                            <X className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 sm:px-6 text-center">
              <p className="text-gray-500">No medications found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('all');
                }}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters
              </button>
            </li>
          )}
        </ul>
      </div>
      
      {/* Medication Reminders */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Today's Medication Schedule</h2>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-sm font-medium text-gray-900">Morning</h3>
              <div className="mt-2 space-y-2">
                {medications
                  .filter(med => med.status === 'active' && med.time.includes('Morning'))
                  .map(med => (
                    <div key={`morning-${med.id}`} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Pill className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm">{med.name} {med.dosage}</span>
                      </div>
                      <button className="text-xs px-2 py-1 bg-white text-blue-600 rounded-md border border-blue-200 hover:bg-blue-100">
                        Taken
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <h3 className="text-sm font-medium text-gray-900">Afternoon</h3>
              <div className="mt-2 space-y-2">
                {medications
                  .filter(med => med.status === 'active' && med.time.includes('Afternoon'))
                  .map(med => (
                    <div key={`afternoon-${med.id}`} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Pill className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="text-sm">{med.name} {med.dosage}</span>
                      </div>
                      <button className="text-xs px-2 py-1 bg-white text-yellow-600 rounded-md border border-yellow-200 hover:bg-yellow-100">
                        Taken
                      </button>
                    </div>
                  ))}
                {!medications.some(med => med.status === 'active' && med.time.includes('Afternoon')) && (
                  <p className="text-sm text-gray-500">No medications scheduled</p>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h3 className="text-sm font-medium text-gray-900">Evening</h3>
              <div className="mt-2 space-y-2">
                {medications
                  .filter(med => med.status === 'active' && med.time.includes('Evening'))
                  .map(med => (
                    <div key={`evening-${med.id}`} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Pill className="h-4 w-4 text-purple-600 mr-2" />
                        <span className="text-sm">{med.name} {med.dosage}</span>
                      </div>
                      <button className="text-xs px-2 py-1 bg-white text-purple-600 rounded-md border border-purple-200 hover:bg-purple-100">
                        Taken
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medications;