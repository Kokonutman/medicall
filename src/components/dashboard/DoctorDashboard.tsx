import React, { useState, useRef, useEffect } from 'react';
import { User, Calendar, Clock, Stethoscope, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import doctorData from '../../sample/doctorData.json';

export default function DoctorDashboard() {
  const { user } = useAuthContext();
  
  // Use data from Supabase if available, otherwise fall back to sample data
  const data = user?.data || doctorData;
  const { personalInfo, todaysAppointments, timeSlots } = data;
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [isFullDay, setIsFullDay] = useState(false);
  const [fromTime, setFromTime] = useState('8:00 AM');
  const [toTime, setToTime] = useState('9:00 AM');
  
  const calendarRef = useRef<HTMLDivElement>(null);

  // Handle click outside calendar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const handleViewAppointment = (appointmentId: number) => {
    console.log('View appointment:', appointmentId);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(today.getMonth() + 6);

    for (let d = new Date(today); d <= sixMonthsLater; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  };

  const calendarDates = generateCalendarDates();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleToggleChange = () => {
    setIsFullDay(!isFullDay);
    if (!isFullDay) {
      // When turning on full day, set to first and last time slots
      setFromTime(timeSlots[0]);
      setToTime(timeSlots[timeSlots.length - 1]);
    }
  };

  const isTimeOrderValid = () => {
    const fromIndex = timeSlots.indexOf(fromTime);
    const toIndex = timeSlots.indexOf(toTime);
    return fromIndex < toIndex;
  };

  const isBlockButtonEnabled = () => {
    if (isFullDay) return true;
    return isTimeOrderValid();
  };

  const handleBlock = () => {
    if (isBlockButtonEnabled()) {
      console.log('Blocking schedule:', {
        date: selectedDate,
        isFullDay,
        fromTime: isFullDay ? timeSlots[0] : fromTime,
        toTime: isFullDay ? timeSlots[timeSlots.length - 1] : toTime
      });
    }
  };

  const getRiskIndicator = (risk: string) => {
    const riskColors = {
      'High': 'bg-red-600',
      'Moderate': 'bg-yellow-600',
      'Low': 'bg-green-600'
    };

    return (
      <div className="flex items-center">
        <div 
          className={`w-16 h-8 rounded-full ${riskColors[risk as keyof typeof riskColors]} flex items-center justify-center`}
        >
          <span className="text-white text-[10px] font-bold">{risk}</span>
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    
    // Get first day of the month and calculate grid
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    // Generate 6 weeks of dates
    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        const date = new Date(current);
        const isCurrentMonth = date.getMonth() === currentMonth;
        const isToday = date.toDateString() === today.toDateString();
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const isAvailable = date >= today && calendarDates.some(d => d.toDateString() === date.toDateString());
        
        days.push({
          date,
          isCurrentMonth,
          isToday,
          isSelected,
          isAvailable
        });
        
        current.setDate(current.getDate() + 1);
      }
    }

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const navigateMonth = (direction: number) => {
      const newDate = new Date(selectedDate);
      newDate.setMonth(newDate.getMonth() + direction);
      setSelectedDate(newDate);
    };

    return (
      <div 
        ref={calendarRef}
        className="absolute top-1/2 left-full ml-4 p-4 rounded-lg shadow-lg z-50 w-80 transform -translate-y-1/2"
        style={{ backgroundColor: '#0d0d0d', border: '1px solid #4f8ef7' }}
      >
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1 rounded hover:bg-gray-700 text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="text-white font-medium">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1 rounded hover:bg-gray-700 text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-center text-gray-400 text-sm py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => day.isAvailable ? handleDateSelect(day.date) : null}
              disabled={!day.isAvailable}
              className={`
                p-2 text-sm rounded transition-colors duration-200
                ${day.isSelected ? 'bg-[#4f8ef7] text-white' : ''}
                ${day.isToday && !day.isSelected ? 'bg-gray-600 text-white' : ''}
                ${day.isCurrentMonth && day.isAvailable && !day.isSelected && !day.isToday ? 'text-white hover:bg-gray-700' : ''}
                ${!day.isCurrentMonth || !day.isAvailable ? 'text-gray-500 cursor-not-allowed' : ''}
              `}
            >
              {day.date.getDate()}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-8">
      {/* Left Half - Two Cards Stacked */}
      <div className="flex-1 flex flex-col gap-8">
        
        {/* Top Card - Personal Information (1/2 height) */}
        <div 
          className="p-8 rounded-2xl"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)',
            height: 'calc(50% - 16px)'
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <User className="w-6 h-6 text-[#4f8ef7]" />
            Personal Information
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-gray-600">
              <span className="text-gray-400 text-lg">Name</span>
              <span className="text-white text-lg font-medium">{personalInfo.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-600">
              <span className="text-gray-400 text-lg">Specialization</span>
              <span className="text-white text-lg font-medium">{personalInfo.specialty}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-600">
              <span className="text-gray-400 text-lg">Hospital</span>
              <span className="text-white text-lg font-medium">{personalInfo.hospital}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400 text-lg">Medical License</span>
              <span className="text-white text-lg font-medium">{personalInfo.license}</span>
            </div>
          </div>
        </div>

        {/* Bottom Card - Schedule Editor (1/2 height) */}
        <div 
          className="p-8 rounded-2xl"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)',
            height: 'calc(50% - 16px)'
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#4f8ef7]" />
            Schedule Editor
          </h2>

          {/* Date Selection and Full Day Toggle Row */}
          <div className="flex gap-6 mb-6">
            {/* Date Selection - 2/3 width */}
            <div className="flex-1" style={{ flexBasis: '66.67%' }}>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-nowrap">Select date:</span>
                <div className="relative flex-1">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0d0d0d] text-white hover:bg-gray-700 transition-colors duration-200 w-full"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(selectedDate)}</span>
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  </button>
                  {showCalendar && renderCalendar()}
                </div>
              </div>
            </div>

            {/* Full Day Toggle - 1/3 width */}
            <div style={{ flexBasis: '33.33%' }}>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-nowrap">Full Day:</span>
                <button
                  onClick={handleToggleChange}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    isFullDay ? 'bg-[#4f8ef7]' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                      isFullDay ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Time Selection Row */}
          <div className="flex gap-6 mb-8">
            {/* From Time - 1/2 width */}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-nowrap">From:</span>
                <div className="relative flex-1">
                  <select
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    disabled={isFullDay}
                    className={`w-full px-4 py-3 rounded-lg bg-[#0d0d0d] text-white border-none outline-none appearance-none cursor-pointer ${
                      isFullDay ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
                    }`}
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time} className="bg-[#0d0d0d]">
                        {time}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* To Time - 1/2 width */}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-nowrap">To:</span>
                <div className="relative flex-1">
                  <select
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    disabled={isFullDay}
                    className={`w-full px-4 py-3 rounded-lg bg-[#0d0d0d] text-white border-none outline-none appearance-none cursor-pointer ${
                      isFullDay ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
                    }`}
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time} className="bg-[#0d0d0d]">
                        {time}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Block Button */}
          <button
            onClick={handleBlock}
            disabled={!isBlockButtonEnabled()}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              isBlockButtonEnabled()
                ? 'bg-[#4f8ef7] text-white hover:bg-[#5a9af8] cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Block
          </button>
        </div>
      </div>

      {/* Right Half - Today's Appointments (Full Height) */}
      <div className="flex-1">
        <div 
          className="h-full p-8 rounded-2xl flex flex-col"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Stethoscope className="w-6 h-6 text-[#4f8ef7]" />
            Upcoming Appointments
          </h2>
          
          {/* Appointments Table */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left text-gray-400 font-medium pb-4">Time</th>
                  <th className="text-left text-gray-400 font-medium pb-4">Patient</th>
                  <th className="text-left text-gray-400 font-medium pb-4">Reason</th>
                  <th className="text-left text-gray-400 font-medium pb-4">Risk</th>
                  <th className="text-left text-gray-400 font-medium pb-4">More</th>
                </tr>
              </thead>
              <tbody>
                {todaysAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-700">
                    <td className="text-white py-5 font-medium">{appointment.time}</td>
                    <td className="text-gray-300 py-5">{appointment.patient}</td>
                    <td className="text-gray-300 py-5">{appointment.reason}</td>
                    <td className="py-5">
                      {getRiskIndicator(appointment.risk)}
                    </td>
                    <td className="py-5">
                      <button
                        onClick={() => handleViewAppointment(appointment.id)}
                        className="px-4 py-1.5 rounded-lg bg-[#4f8ef7] text-white hover:bg-[#5a9af8] transition-all duration-300 font-medium text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}