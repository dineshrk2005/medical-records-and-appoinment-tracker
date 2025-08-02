import React, { useState } from 'react';
import { Calendar, Clock, Plus, MapPin, User, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const Appointments: React.FC = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Mock appointments data
  const appointments: Appointment[] = [
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2025-06-15',
      time: '10:00 AM',
      location: 'Heart Center, 123 Main St',
      status: 'upcoming'
    },
    {
      id: '2',
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: '2025-06-22',
      time: '2:30 PM',
      location: 'Skin Clinic, 456 Oak Ave',
      status: 'upcoming'
    },
    {
      id: '3',
      doctor: 'Dr. Robert Williams',
      specialty: 'Ophthalmologist',
      date: '2025-05-10',
      time: '9:15 AM',
      location: 'Vision Center, 789 Pine St',
      status: 'completed'
    },
    {
      id: '4',
      doctor: 'Dr. Jennifer Lee',
      specialty: 'Neurologist',
      date: '2025-05-03',
      time: '11:30 AM',
      location: 'Neurology Associates, 101 Elm St',
      status: 'cancelled'
    },
    {
      id: '5',
      doctor: 'Dr. David Miller',
      specialty: 'Orthopedic Surgeon',
      date: '2025-07-05',
      time: '3:00 PM',
      location: 'Orthopedic Center, 202 Maple Ave',
      status: 'upcoming'
    }
  ];

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedStatus === 'all') {
      return matchesSearch;
    }
    
    return matchesSearch && appointment.status === selectedStatus;
  });
  
  // Function to navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    let newMonth = month;
    let newYear = year;
    
    if (direction === 'prev') {
      if (month === 0) {
        newMonth = 11;
        newYear--;
      } else {
        newMonth--;
      }
    } else {
      if (month === 11) {
        newMonth = 0;
        newYear++;
      } else {
        newMonth++;
      }
    }
    
    setMonth(newMonth);
    setYear(newYear);
  };
  
  // Function to generate calendar days for current month
  const generateCalendarDays = () => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      
      // Check if the day has an appointment
      const hasAppointment = appointments.some(apt => apt.date === dateString);
      
      days.push(
        <div
          key={`day-${day}`}
          className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer transition-colors ${
            hasAppointment 
              ? 'bg-blue-100 text-blue-700 font-semibold' 
              : 'hover:bg-gray-100'
          }`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };
  
  // Function to get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Schedule and manage your healthcare visits</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            New Appointment
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => navigateMonth('prev')}
                  className="p-1 rounded-full text-gray-400 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm font-medium">
                  {new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button 
                  onClick={() => navigateMonth('next')}
                  className="p-1 rounded-full text-gray-400 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={`header-${i}`} className="h-6 flex items-center justify-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays()}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 mr-2"></div>
                <span className="text-sm text-gray-600">Appointment scheduled</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Appointment List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">Appointments</h2>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search appointments"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="block w-full md:w-auto py-1.5 pl-3 pr-10 text-base border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All appointments</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{appointment.doctor}</h3>
                          <p className="text-sm text-gray-500">{appointment.specialty}</p>
                        </div>
                        <span className={`mt-1 md:mt-0 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })} at {appointment.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {appointment.location}
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                          Reschedule
                        </button>
                        <button className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors">
                          View Details
                        </button>
                        {appointment.status === 'upcoming' && (
                          <button className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No appointments found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedStatus('all');
                  }}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;