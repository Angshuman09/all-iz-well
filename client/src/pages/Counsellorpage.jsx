import React, { useState } from 'react';
import { Calendar, User, FileText, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const CounsellorPortal = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [showSevereModal, setShowSevereModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState({});

  // Sample data
  const appointments = [
    { id: 1, name: 'u/StarryNight_77', time: '10:00 AM', date: '2025-11-26', status: 'approved', canStart: true },
    { id: 2, name: 'u/OceanWaves_34', time: '11:30 AM', date: '2025-11-26', status: 'pending', canStart: false },
    { id: 3, name: 'u/PhoenixRising_56', time: '2:00 PM', date: '2025-11-27', status: 'approved', canStart: false },
    { id: 4, name: 'u/MoonlightDancer_89', time: '3:30 PM', date: '2025-11-27', status: 'pending', canStart: false },
  ];

  const handleStartSession = (appointment) => {
    setSelectedSession(appointment);
    setSessionNotes('');
    setShowSessionModal(true);
  };

  const handleSaveNotes = () => {
    if (selectedSession) {
      setSavedNotes({
        ...savedNotes,
        [selectedSession.id]: sessionNotes
      });
      setShowNotesModal(false);
      setShowSessionModal(false);
      alert('Session notes saved successfully!');
    }
  };

  const [revealedStudents, setRevealedStudents] = useState([]);

  const flaggedCases = [
    { id: 1, anonymousName: 'u/MidnightOwl_23', realName: 'Alex Turner', severity: 'severe', risk: 'High Risk', lastSession: '2025-11-20', studentId: '#JEC123', bookedOn: 'Nov 20, 2025 10:00 A.M.', canReveal: true },
    { id: 2, anonymousName: 'u/SilentEcho_89', realName: 'Jordan Lee', severity: 'warning', risk: 'Moderate Risk', lastSession: '2025-11-22', studentId: '#JEC456', bookedOn: 'Nov 22, 2025 7:00 A.M.', canReveal: true },
    { id: 3, anonymousName: 'u/CosmicDreamer_45', realName: 'Sam Patel', severity: 'severe', risk: 'High Risk', lastSession: '2025-11-19', studentId: '#JEC789', bookedOn: 'Nov 19, 2025 2:00 P.M.', canReveal: false },
    { id: 4, anonymousName: 'u/ThunderStrike_12', realName: 'Maya Johnson', severity: 'warning', risk: 'Moderate Risk', lastSession: '2025-11-18', studentId: '#JEC890', bookedOn: 'Nov 18, 2025 3:30 P.M.', canReveal: true },
  ];

  const handleRevealName = (studentId) => {
    setRevealedStudents([...revealedStudents, studentId]);
  };

  const previousSessions = [
    { id: 1, name: 'u/CrimsonTide_42', date: '2025-11-20', summary: 'Discussed academic stress and coping mechanisms. Progress noted.' },
    { id: 2, name: 'u/SilverLining_91', date: '2025-11-19', summary: 'Follow-up on anxiety management techniques. Positive feedback.' },
    { id: 3, name: 'u/GoldenHour_28', date: '2025-11-18', summary: 'Initial consultation regarding time management and workload.' },
    { id: 4, name: 'u/EmeraldDream_65', date: '2025-11-15', summary: 'Career counseling session. Explored various path options.' },
  ];

  const Header = () => (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-[#D8EAD9] to-[#C9E1D1] flex items-center justify-center">
            <span className="text-[#2C3E50] font-bold text-base sm:text-lg">CP</span>
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-semibold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>Counsellor Portal</h1>
            <p className="text-xs sm:text-sm text-gray-500 hidden sm:block" style={{ fontFamily: 'Roboto, sans-serif' }}>University Wellness Center</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>Dr. Amanda Foster</p>
            <p className="text-xs text-gray-500" style={{ fontFamily: 'Roboto, sans-serif' }}>Senior Counsellor</p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2C3E50] flex items-center justify-center">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardPage = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div 
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm cursor-pointer transition-all hover:shadow-md"
          onClick={() => setCurrentPage('dashboard')}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br from-[#D8EAD9] to-[#C9E1D1] flex items-center justify-center mb-3 sm:mb-4">
            <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-[#2C3E50]" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-1 sm:mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Dashboard</h3>
          <p className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>Overview and quick stats</p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm cursor-pointer transition-all hover:shadow-md"
          onClick={() => setCurrentPage('reports')}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br from-[#D8EAD9] to-[#C9E1D1] flex items-center justify-center mb-3 sm:mb-4">
            <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#2C3E50]" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-1 sm:mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Reports</h3>
          <p className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>Student assessments</p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm cursor-pointer transition-all hover:shadow-md"
          onClick={() => setCurrentPage('appointments')}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br from-[#D8EAD9] to-[#C9E1D1] flex items-center justify-center mb-3 sm:mb-4">
            <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-[#2C3E50]" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#2C3E50] mb-1 sm:mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Appointments</h3>
          <p className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>Manage your schedule</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-[#2C3E50] mb-4 sm:mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Appointment Status</h3>
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          <div className="text-center cursor-pointer" onClick={() => setShowBookingsModal(true)}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-[#D8EAD9] to-[#C9E1D1] flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>12</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>Bookings</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FEF3E7] flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#F1C40F]" style={{ fontFamily: 'Poppins, sans-serif' }}>5</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>Pending</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E8F6F0] flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#27AE60]" style={{ fontFamily: 'Poppins, sans-serif' }}>7</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>Approved</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AppointmentsPage = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>Appointments</h2>
        <button className="w-full sm:w-auto px-6 py-2.5 bg-[#2C3E50] text-white rounded-lg text-sm font-medium transition-all hover:opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
          New Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <h3 className="text-sm sm:text-base font-semibold text-[#2C3E50] mb-3 sm:mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Calendar</h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="text-center pb-2 sm:pb-3 border-b border-[#E2E2E2]">
              <p className="text-xs sm:text-sm font-medium text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>November 2025</p>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-1 sm:mb-2">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm">
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i} 
                  className={`p-1.5 sm:p-2 rounded-lg ${i === 25 ? 'bg-[#2C3E50] text-white font-semibold' : i === 26 ? 'bg-[#D8EAD9] text-[#2C3E50] font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <h3 className="text-sm sm:text-base font-semibold text-[#2C3E50] mb-3 sm:mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Upcoming Appointments</h3>
          <div className="space-y-2 sm:space-y-3">
            {appointments.map(apt => (
              <div key={apt.id} className="p-3 sm:p-4 rounded-xl bg-gray-50 border border-[#E2E2E2]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-[#D8EAD9] to-[#C9E1D1] flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C3E50]" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>{apt.name}</p>
                      <p className="text-xs text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>{apt.date} at {apt.time}</p>
                    </div>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium shrink-0 ${
                    apt.status === 'approved' ? 'bg-[#E8F6F0] text-[#27AE60]' : 'bg-[#FEF3E7] text-[#F1C40F]'
                  }`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {apt.status === 'approved' ? 'Approved' : 'Pending'}
                  </span>
                </div>
                {apt.canStart && apt.status === 'approved' && (
                  <button 
                    onClick={() => handleStartSession(apt)}
                    className="w-full mt-2 py-2 px-3 bg-[#2C3E50] text-white rounded-lg text-xs font-medium transition-all hover:opacity-90 flex items-center justify-center gap-2" 
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <Clock className="w-4 h-4" />
                    Start Session
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ReportsPage = () => (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>Student Reports</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Total Students</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>156</p>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border-l-4 border-[#D64545]">
          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>High Risk</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#D64545]" style={{ fontFamily: 'Poppins, sans-serif' }}>8</p>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border-l-4 border-[#E67E22]">
          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Moderate Risk</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#E67E22]" style={{ fontFamily: 'Poppins, sans-serif' }}>23</p>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border-l-4 border-[#27AE60]">
          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>No Risk</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#27AE60]" style={{ fontFamily: 'Poppins, sans-serif' }}>125</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
        <h3 className="text-sm sm:text-base font-semibold text-[#2C3E50] mb-3 sm:mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Risk Assessment Overview</h3>
        <div className="flex items-end gap-2 sm:gap-4 h-40 sm:h-48">
          <div className="flex-1 flex flex-col justify-end">
            <div className="bg-[#27AE60] rounded-t-lg h-28 sm:h-32 flex items-end justify-center pb-2">
              <span className="text-white font-semibold text-xs sm:text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>125</span>
            </div>
            <p className="text-center text-xs text-gray-600 mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>No Risk</p>
          </div>
          <div className="flex-1 flex flex-col justify-end">
            <div className="bg-[#E67E22] rounded-t-lg h-20 sm:h-24 flex items-end justify-center pb-2">
              <span className="text-white font-semibold text-xs sm:text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>23</span>
            </div>
            <p className="text-center text-xs text-gray-600 mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Moderate</p>
          </div>
          <div className="flex-1 flex flex-col justify-end">
            <div className="bg-[#D64545] rounded-t-lg h-14 sm:h-16 flex items-end justify-center pb-2">
              <span className="text-white font-semibold text-xs sm:text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>8</span>
            </div>
            <p className="text-center text-xs text-gray-600 mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>High Risk</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
        <h3 className="text-sm sm:text-base font-semibold text-[#2C3E50] mb-3 sm:mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Flagged Cases</h3>
        <div className="space-y-2 sm:space-y-3">
          {flaggedCases.map(student => {
            const isRevealed = revealedStudents.includes(student.id);
            const displayName = isRevealed ? student.realName : student.anonymousName;
            
            return (
              <div 
                key={student.id} 
                className="p-3 sm:p-4 rounded-xl bg-gray-50 border border-[#E2E2E2]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-[#D8EAD9] to-[#C9E1D1] flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C3E50]" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {displayName}
                      </p>
                      <p className="text-xs text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>Student ID: {student.studentId}</p>
                      <p className="text-xs text-gray-500" style={{ fontFamily: 'Roboto, sans-serif' }}>Booked on {student.bookedOn}</p>
                    </div>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium shrink-0 ${
                    student.severity === 'severe' ? 'bg-[#FDE8E8] text-[#D64545]' : 'bg-[#FEF3E7] text-[#E67E22]'
                  }`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {student.severity === 'severe' ? 'Pending' : 'Approved'}
                  </span>
                </div>
                
                {student.canReveal ? (
                  <div className="space-y-2">
                    {!isRevealed && (
                      <button 
                        onClick={() => handleRevealName(student.id)}
                        className="w-full py-2 px-3 bg-linear-to-r from-[#D8EAD9] to-[#C9E1D1] text-[#2C3E50] rounded-lg text-xs font-medium transition-all hover:opacity-90 flex items-center justify-center gap-2" 
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <User className="w-4 h-4" />
                        Reveal Real Name
                      </button>
                    )}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => student.severity === 'severe' && setShowSevereModal(true)}
                        className="flex-1 py-2 px-3 bg-white border border-[#E2E2E2] text-[#2C3E50] rounded-lg text-xs font-medium transition-all hover:border-[#2C3E50]" 
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        View Details
                      </button>
                      <button 
                        className="flex-1 py-2 px-3 bg-[#2C3E50] text-white rounded-lg text-xs font-medium transition-all hover:opacity-90" 
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Set Date & Time
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FEF3E7] border border-[#F1C40F] rounded-lg p-3 flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#F1C40F] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>Available after 1 week</p>
                      <p className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>You can reveal this student's identity after Nov 26, 2025</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const PreviousSessionsPage = () => (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>Previous Sessions</h2>

      <div className="space-y-3 sm:space-y-4">
        {previousSessions.map(session => (
          <div key={session.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-[#D8EAD9] to-[#C9E1D1] flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C3E50]" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>{session.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>{session.date}</p>
                </div>
              </div>
              <button className="text-xs sm:text-sm text-[#2C3E50] hover:underline shrink-0" style={{ fontFamily: 'Poppins, sans-serif' }}>View Details</button>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>{session.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const BookingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={() => setShowBookingsModal(false)}>
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-semibold text-[#2C3E50] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Total Bookings</h3>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <span className="text-sm font-medium text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>This Week</span>
            <span className="text-lg font-bold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>12</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <span className="text-sm font-medium text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>This Month</span>
            <span className="text-lg font-bold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>48</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <span className="text-sm font-medium text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>Total</span>
            <span className="text-lg font-bold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>156</span>
          </div>
        </div>
        <button 
          onClick={() => setShowBookingsModal(false)}
          className="w-full py-2.5 bg-[#2C3E50] text-white rounded-lg text-sm font-medium transition-all hover:opacity-90" 
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Close
        </button>
      </div>
    </div>
  );

  const SevereModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={() => setShowSevereModal(false)}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="bg-[#D64545] p-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <AlertCircle className="w-6 h-6" />
            Severe Case Alert
          </h3>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Student Name</p>
            <p className="text-base font-semibold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>Alex Turner</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Student ID</p>
            <p className="text-base font-semibold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>ST2024-4567</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Email</p>
            <p className="text-base font-semibold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>alex.turner@university.edu</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Risk Level</p>
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#FDE8E8] text-[#D64545]" style={{ fontFamily: 'Poppins, sans-serif' }}>High Risk</span>
          </div>
          <div className="flex gap-3 pt-4">
            <button className="flex-1 py-2.5 bg-[#2C3E50] text-white rounded-lg text-sm font-medium transition-all hover:opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Contact Student
            </button>
            <button className="flex-1 py-2.5 border-2 border-[#2C3E50] text-[#2C3E50] rounded-lg text-sm font-medium transition-all hover:bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
              View Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SessionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4" onClick={() => setShowSessionModal(false)}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="bg-linear-to-r from-[#D8EAD9] to-[#C9E1D1] p-6">
          <h3 className="text-xl font-semibold text-[#2C3E50] flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <FileText className="w-6 h-6" />
            Session in Progress
          </h3>
        </div>
        <div className="p-6 sm:p-8 space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#D8EAD9] to-[#C9E1D1] flex items-center justify-center">
                <User className="w-6 h-6 text-[#2C3E50]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2C3E50]" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedSession?.name}</p>
                <p className="text-xs text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>{selectedSession?.date} at {selectedSession?.time}</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Session Notes
            </label>
            <textarea
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Write your observations, key points discussed, progress notes, and recommendations here..."
              className="w-full h-64 p-4 border border-[#E2E2E2] rounded-xl resize-none focus:outline-none focus:border-[#2C3E50] text-sm"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            />
            <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {sessionNotes.length} characters
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => {
                setShowNotesModal(false);
                setShowSessionModal(false);
              }}
              className="flex-1 py-2.5 border-2 border-[#E2E2E2] text-[#2C3E50] rounded-lg text-sm font-medium transition-all hover:bg-gray-50" 
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveNotes}
              className="flex-1 py-2.5 bg-[#2C3E50] text-white rounded-lg text-sm font-medium transition-all hover:opacity-90 flex items-center justify-center gap-2" 
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <CheckCircle className="w-4 h-4" />
              Save & End Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#D8EAD9] to-[#C9E1D1]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              currentPage === 'dashboard' 
                ? 'bg-[#2C3E50] text-white shadow-sm' 
                : 'bg-white text-[#2C3E50] hover:shadow-sm'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentPage('appointments')}
            className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              currentPage === 'appointments' 
                ? 'bg-[#2C3E50] text-white shadow-sm' 
                : 'bg-white text-[#2C3E50] hover:shadow-sm'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Appointments
          </button>
          <button 
            onClick={() => setCurrentPage('reports')}
            className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              currentPage === 'reports' 
                ? 'bg-[#2C3E50] text-white shadow-sm' 
                : 'bg-white text-[#2C3E50] hover:shadow-sm'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Reports
          </button>
          <button 
            onClick={() => setCurrentPage('sessions')}
            className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              currentPage === 'sessions' 
                ? 'bg-[#2C3E50] text-white shadow-sm' 
                : 'bg-white text-[#2C3E50] hover:shadow-sm'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Previous Sessions
          </button>
        </div>

        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'appointments' && <AppointmentsPage />}
        {currentPage === 'reports' && <ReportsPage />}
        {currentPage === 'sessions' && <PreviousSessionsPage />}
      </div>

      {showBookingsModal && <BookingsModal />}
      {showSevereModal && <SevereModal />}
      {showSessionModal && <SessionModal />}
    </div>
  );
};

export default CounsellorPortal;