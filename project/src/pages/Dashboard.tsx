import React from 'react';
import { Calendar, Clock, Activity, FileText, Pill, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Mock data for the dashboard
  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: '2025-06-15', time: '10:00 AM' },
    { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Dermatologist', date: '2025-06-22', time: '2:30 PM' },
  ];
  
  const medications = [
    { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', time: 'Morning' },
    { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', time: 'Morning and Evening' },
    { id: 3, name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', time: 'Evening' },
  ];
  
  const healthMetrics = [
    { id: 1, name: 'Blood Pressure', value: '120/80', status: 'normal' },
    { id: 2, name: 'Heart Rate', value: '72 bpm', status: 'normal' },
    { id: 3, name: 'Blood Glucose', value: '110 mg/dL', status: 'elevated' },
    { id: 4, name: 'Weight', value: '165 lbs', status: 'normal' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
          <p className="text-gray-600">{currentDate}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </button>
        </div>
      </div>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="p-5">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <div key={appointment.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.doctor}</p>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })} at {appointment.time}
                      </p>
                    </div>
                  </div>
                ))}
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View all appointments
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No upcoming appointments</p>
            )}
          </div>
        </div>
        
        {/* Health Metrics */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Health Metrics</h2>
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4">
              {healthMetrics.map(metric => (
                <div key={metric.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">{metric.name}</p>
                  <p className="text-lg font-semibold">
                    {metric.value}
                  </p>
                  <span 
                    className={`text-xs px-2 py-1 rounded ${
                      metric.status === 'normal' 
                        ? 'bg-green-100 text-green-800' 
                        : metric.status === 'elevated'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
              View health history
            </button>
          </div>
        </div>
        
        {/* Medications */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Current Medications</h2>
              <Pill className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="p-5">
            {medications.length > 0 ? (
              <div className="space-y-3">
                {medications.map(medication => (
                  <div key={medication.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-900">{medication.name}</p>
                      <p className="text-sm font-medium text-blue-600">{medication.dosage}</p>
                    </div>
                    <p className="text-sm text-gray-600">{medication.frequency}</p>
                    <p className="text-xs text-gray-500">{medication.time}</p>
                  </div>
                ))}
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Manage medications
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No current medications</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Recent Medical Records */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Medical Records</h2>
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    May 10, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Annual Physical
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Dr. Emily Chang
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <button>View</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Apr 5, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Blood Test
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Quest Diagnostics
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <button>View</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Mar 15, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    X-Ray
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    City Hospital
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <button>View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;