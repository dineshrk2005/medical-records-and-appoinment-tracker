import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Download } from 'lucide-react';

interface Record {
  id: string;
  type: string;
  date: string;
  provider: string;
  description: string;
  status: 'new' | 'processed' | 'archived';
}

const MedicalRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Mock data
  const medicalRecords: Record[] = [
    {
      id: '1',
      type: 'Lab Results',
      date: '2025-05-10',
      provider: 'Quest Diagnostics',
      description: 'Complete Blood Count (CBC)',
      status: 'new'
    },
    {
      id: '2',
      type: 'Imaging',
      date: '2025-04-15',
      provider: 'City Hospital',
      description: 'Chest X-Ray',
      status: 'processed'
    },
    {
      id: '3',
      type: 'Consultation',
      date: '2025-03-22',
      provider: 'Dr. Emily Chang',
      description: 'Annual Physical Examination',
      status: 'processed'
    },
    {
      id: '4',
      type: 'Lab Results',
      date: '2025-02-05',
      provider: 'LabCorp',
      description: 'Lipid Panel',
      status: 'archived'
    },
    {
      id: '5',
      type: 'Procedure',
      date: '2025-01-18',
      provider: 'Memorial Hospital',
      description: 'Colonoscopy',
      status: 'archived'
    },
    {
      id: '6',
      type: 'Vaccination',
      date: '2024-12-10',
      provider: 'City Clinic',
      description: 'Influenza Vaccine',
      status: 'archived'
    }
  ];

  // Filter records based on search term and selected filter
  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = 
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') {
      return matchesSearch;
    }
    
    return matchesSearch && record.status === selectedFilter;
  });

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600">Manage and view your health documents</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Add New Record
          </button>
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
            placeholder="Search records by type, provider, or description"
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
            <option value="all">All Records</option>
            <option value="new">New</option>
            <option value="processed">Processed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
      
      {/* Records List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <li key={record.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{record.description}</p>
                        <p className="text-sm text-gray-500">{record.type} • {record.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                      <p className="text-sm text-gray-500">
                        {new Date(record.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <button className="p-1 rounded-full text-gray-400 hover:text-blue-600 focus:outline-none focus:text-blue-600">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 sm:px-6 text-center">
              <p className="text-gray-500">No records found matching your criteria.</p>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                Clear filters
              </button>
            </li>
          )}
        </ul>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRecords.length}</span> of{' '}
              <span className="font-medium">{filteredRecords.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;