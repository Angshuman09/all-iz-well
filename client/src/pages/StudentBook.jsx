import React, { useState } from 'react';
import { Star, Calendar, ChevronLeft, ChevronRight, Filter, Clock, MessageSquare } from 'lucide-react';

export const StudentBook = () => {
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 3));
  const [showModal, setShowModal] = useState(false);
  const [genderFilter, setGenderFilter] = useState('all');
  const [sortByRating, setSortByRating] = useState(false);
  const [activeTab, setActiveTab] = useState('book');
  const [upcomingSession, setUpcomingSession] = useState(null);
  const [sessionHistory, setSessionHistory] = useState([
    {
      id: 1,
      counsellorName: 'Dr. Sarah Mitchell',
      date: 'Nov 28, 2025',
      time: '2:00 PM',
      rating: 0,
      feedback: ''
    },
    {
      id: 2,
      counsellorName: 'Dr. James Chen',
      date: 'Nov 15, 2025',
      time: '11:00 AM',
      rating: 0,
      feedback: ''
    }
  ]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedHistorySession, setSelectedHistorySession] = useState(null);
  const [tempRating, setTempRating] = useState(0);
  const [tempFeedback, setTempFeedback] = useState('');

  const counsellors = [
    { id: 1, name: 'Dr. Sarah Mitchell', rating: 4.9, gender: 'female', image: 'SM' },
    { id: 2, name: 'Dr. James Chen', rating: 4.8, gender: 'male', image: 'JC' },
    { id: 3, name: 'Dr. Priya Sharma', rating: 4.9, gender: 'female', image: 'PS' },
    { id: 4, name: 'Dr. Michael Roberts', rating: 4.7, gender: 'male', image: 'MR' },
    { id: 5, name: 'Dr. Emma Wilson', rating: 4.9, gender: 'female', image: 'EW' },
    { id: 6, name: 'Dr. Rahul Verma', rating: 4.6, gender: 'male', image: 'RV' },
  ];

  const timeSlots = [
    { id: 1, time: '9:00 AM' },
    { id: 2, time: '11:00 AM' },
    { id: 3, time: '2:00 PM' },
    { id: 4, time: '4:00 PM' },
  ];

  const getFilteredCounsellors = () => {
    let filtered = counsellors;
    if (genderFilter !== 'all') {
      filtered = filtered.filter(c => c.gender === genderFilter);
    }
    if (sortByRating) {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }
    return filtered;
  };

  const handleViewSlots = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setSelectedSlot(null);
    setSelectedDate(new Date(2025, 11, 3));
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    if (selectedSlot && selectedCounsellor && !upcomingSession) {
      const booking = {
        counsellorName: selectedCounsellor.name,
        date: selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: selectedSlot.time,
        dateObj: new Date(selectedDate)
      };
      setUpcomingSession(booking);
      setShowModal(false);
      setActiveTab('upcoming');
      alert(`Booking confirmed with ${selectedCounsellor.name} at ${selectedSlot.time} on ${booking.date}`);
    }
  };

  const canStartSession = () => {
    if (!upcomingSession) return false;
    const now = new Date(2025, 11, 3, 14, 0);
    const sessionDate = upcomingSession.dateObj;
    const [time, period] = upcomingSession.time.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    sessionDate.setHours(hours, minutes, 0, 0);
    return now >= sessionDate;
  };

  const handleStartSession = () => {
    if (canStartSession()) {
      alert('Starting session...');
      console.log('Session started:', upcomingSession);
    }
  };

  const handleOpenFeedback = (session) => {
    setSelectedHistorySession(session);
    setTempRating(session.rating);
    setTempFeedback(session.feedback);
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = () => {
    if (selectedHistorySession) {
      setSessionHistory(prev =>
        prev.map(s =>
          s.id === selectedHistorySession.id
            ? { ...s, rating: tempRating, feedback: tempFeedback }
            : s
        )
      );
      setShowFeedbackModal(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek, month, year };
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek, month, year } = getDaysInMonth(selectedDate);
    const days = [];
    const today = new Date(2025, 11, 3);

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPast = date < today;
      const isSelected = date.toDateString() === selectedDate.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => !isPast && setSelectedDate(date)}
          disabled={isPast}
          className={`h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${isPast
            ? 'text-gray-300 cursor-not-allowed'
            : isSelected
              ? 'bg-gradient-to-br from-[#FF4F93] to-[#FFE9F6] text-white'
              : 'hover:bg-gray-100 text-gray-700'
            }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const changeMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const filteredCounsellors = getFilteredCounsellors();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFFCEB] via-[#D6F6FF] to-[#EDEBFF] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Counsellor Booking</h1>

          <div className="flex gap-2 mb-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('book')}
              className={`px-4 py-2 font-medium transition-all ${activeTab === 'book'
                ? 'text-purple-700 border-b-2 border-purple-700'
                : 'text-gray-500'
                }`}
            >
              Book Session
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 font-medium transition-all ${activeTab === 'upcoming'
                ? 'text-purple-700 border-b-2 border-purple-700'
                : 'text-gray-500'
                }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 font-medium transition-all ${activeTab === 'history'
                ? 'text-purple-700 border-b-2 border-purple-700'
                : 'text-gray-500'
                }`}
            >
              History
            </button>
          </div>

          {activeTab === 'book' && (
            <>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => setGenderFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${genderFilter === 'all'
                      ? 'bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setGenderFilter('female')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${genderFilter === 'female'
                      ? 'bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    Female
                  </button>
                  <button
                    onClick={() => setGenderFilter('male')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${genderFilter === 'male'
                      ? 'bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    Male
                  </button>
                </div>

                <button
                  onClick={() => setSortByRating(!sortByRating)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${sortByRating
                    ? 'bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <Filter className="w-4 h-4" />
                  High Rated
                </button>
              </div>

              {upcomingSession && (
                <div className="bg-gradient-to-br from-[#FFE9F6] to-[#EDEBFF] rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    You have an upcoming session. You cannot book another slot until it's completed.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCounsellors.map((counsellor) => (
                  <div
                    key={counsellor.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-5"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#EDEBFF] to-[#D6F6FF] flex items-center justify-center text-lg font-bold text-purple-700">
                        {counsellor.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{counsellor.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-700">{counsellor.rating}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewSlots(counsellor)}
                      disabled={!!upcomingSession}
                      className={`w-full py-2.5 rounded-lg font-medium transition-all ${upcomingSession
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] text-purple-700 hover:shadow-md'
                        }`}
                    >
                      Book Slot
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'upcoming' && (
            <div>
              {upcomingSession ? (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Upcoming Session</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#EDEBFF] to-[#D6F6FF] flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-purple-700" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Counsellor</p>
                        <p className="font-semibold text-gray-800">{upcomingSession.counsellorName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#D6F6FF] to-[#DFFCEB] flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date & Time</p>
                        <p className="font-semibold text-gray-800">{upcomingSession.date} at {upcomingSession.time}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleStartSession}
                    disabled={!canStartSession()}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${canStartSession()
                      ? 'bg-gradient-to-r from-[#FF4F93] to-[#FFE9F6] text-white hover:shadow-md'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {canStartSession() ? 'Start Session' : 'Available at scheduled time'}
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No upcoming sessions</p>
                  <button
                    onClick={() => setActiveTab('book')}
                    className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] text-purple-700 font-medium hover:shadow-md transition-all"
                  >
                    Book a Session
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              {sessionHistory.length > 0 ? (
                <div className="space-y-4">
                  {sessionHistory.map((session) => (
                    <div key={session.id} className="bg-white rounded-xl shadow-sm p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">{session.counsellorName}</h3>
                          <p className="text-sm text-gray-500">{session.date} at {session.time}</p>
                        </div>
                        {session.rating > 0 && (
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < session.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                                  }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleOpenFeedback(session)}
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] text-purple-700 font-medium hover:shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        {session.rating > 0 ? 'Edit Feedback' : 'Give Feedback'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No session history</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showModal && selectedCounsellor && (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedCounsellor.name}</h2>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{selectedCounsellor.rating}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Date</h3>
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => changeMonth(-1)}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-semibold text-gray-800">
                    {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => changeMonth(1)}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2 mb-6">
                  {renderCalendar()}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Time Slot</h3>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-lg font-medium transition-all ${selectedSlot?.id === slot.id
                        ? 'bg-gradient-to-br from-[#FF4F93] to-[#FFE9F6] text-white'
                        : 'bg-gradient-to-br from-[#EDEBFF] to-[#D6F6FF] text-purple-700 hover:shadow-md'
                        }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!selectedSlot}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${selectedSlot
                    ? 'bg-gradient-to-r from-[#FF4F93] to-[#FFE9F6] text-white hover:shadow-md'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFeedbackModal && selectedHistorySession && (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Session Feedback</h2>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Rate your session</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setTempRating(rating)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${rating <= tempRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Your feedback</p>
                <textarea
                  value={tempFeedback}
                  onChange={(e) => setTempFeedback(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  rows="4"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1 py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  disabled={tempRating === 0}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${tempRating > 0
                    ? 'bg-gradient-to-r from-[#FF4F93] to-[#FFE9F6] text-white hover:shadow-md'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
