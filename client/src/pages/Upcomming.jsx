import React, { useState } from 'react';
import { Calendar, Clock, Phone, ChevronLeft, ChevronRight, X } from 'lucide-react';

export const UpcomingSessions = () => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const allSessions = {
        '2025-12-3': [
            { id: 1, studentName: 'Anonymous Student #A23', time: '9:00 AM', isActive: false },
            { id: 2, studentName: 'Anonymous Student #B47', time: '11:00 AM', isActive: true },
            { id: 3, studentName: 'Anonymous Student #C12', time: '2:00 PM', isActive: false },
            { id: 4, studentName: 'Anonymous Student #D89', time: '4:00 PM', isActive: false }
        ],
        '2025-12-4': [
            { id: 5, studentName: 'Anonymous Student #E15', time: '9:00 AM', isActive: false },
            { id: 6, studentName: 'Anonymous Student #F32', time: '2:00 PM', isActive: false }
        ],
        '2025-12-5': [
            { id: 7, studentName: 'Anonymous Student #G44', time: '11:00 AM', isActive: false },
            { id: 8, studentName: 'Anonymous Student #H67', time: '2:00 PM', isActive: false },
            { id: 9, studentName: 'Anonymous Student #I21', time: '4:00 PM', isActive: false }
        ],
        '2025-12-6': [
            { id: 10, studentName: 'Anonymous Student #J89', time: '9:00 AM', isActive: false }
        ]
    };

    const getDateKey = (date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    const getSessionsForDate = (date) => {
        const key = getDateKey(date);
        return allSessions[key] || [];
    };

    const getBookingCount = (date) => {
        const sessions = getSessionsForDate(date);
        return sessions.length;
    };

    const generateWeekDates = () => {
        const dates = [];
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1);

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isToday = date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

            dates.push({
                date: date,
                day: date.getDate(),
                label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
                isPast: isPast,
                isToday: isToday,
                bookings: getBookingCount(date)
            });
        }
        return dates;
    };

    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1));

        const days = [];
        const current = new Date(startDate);

        for (let i = 0; i < 42; i++) {
            const isPast = current < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isCurrentMonth = current.getMonth() === month;
            const bookings = getBookingCount(current);

            days.push({
                date: new Date(current),
                day: current.getDate(),
                isPast: isPast,
                isCurrentMonth: isCurrentMonth,
                bookings: bookings
            });

            current.setDate(current.getDate() + 1);
        }

        return days;
    };

    const handlePrevWeek = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() - 7);
        setSelectedDate(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + 7);
        setSelectedDate(newDate);
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const weekDates = generateWeekDates();
    const calendarDays = generateCalendarDays();
    const currentSessions = getSessionsForDate(selectedDate);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Upcoming Sessions</h1>
                        <p className="text-sm sm:text-base text-gray-600">Manage your daily counselling schedule</p>
                    </div>
                    <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center hover:shadow-lg transition-all hover:scale-105"
                    >
                        <Calendar className="w-6 h-6 text-purple-600" />
                    </button>
                </div>

                {/* Calendar Modal */}
                {showCalendar && (
                    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePrevMonth}
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center hover:shadow-md transition-all"
                                >
                                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                </button>
                                <button
                                    onClick={handleNextMonth}
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center hover:shadow-md transition-all"
                                >
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                </button>
                                <button
                                    onClick={() => setShowCalendar(false)}
                                    className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((day, i) => (
                                <button
                                    key={i}
                                    onClick={() => !day.isPast && handleDateSelect(day.date)}
                                    disabled={day.isPast}
                                    className={`relative aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all ${day.isPast
                                        ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                        : !day.isCurrentMonth
                                            ? 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                            : day.date.getDate() === selectedDate.getDate() &&
                                                day.date.getMonth() === selectedDate.getMonth() &&
                                                day.date.getFullYear() === selectedDate.getFullYear()
                                                ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg scale-105'
                                                : 'bg-white text-gray-700 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 hover:shadow-md'
                                        }`}
                                >
                                    {day.day}
                                    {!day.isPast && day.bookings > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md">
                                            {day.bookings}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Week Slider */}
                <div className="bg-white rounded-2xl shadow-xl p-3 sm:p-4 lg:p-6 mb-6 border border-gray-100">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            onClick={handlePrevWeek}
                            className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center hover:shadow-md transition-all hover:scale-105"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                        </button>

                        <div className="flex gap-1.5 sm:gap-2 lg:gap-3 overflow-x-auto flex-1 scrollbar-hide pb-1">
                            {weekDates.map((dateObj, i) => (
                                <button
                                    key={i}
                                    onClick={() => !dateObj.isPast && setSelectedDate(dateObj.date)}
                                    disabled={dateObj.isPast}
                                    className={`relative flex-shrink-0 w-14 h-20 sm:w-16 sm:h-24 lg:w-20 lg:h-28 rounded-xl flex flex-col items-center justify-center transition-all ${dateObj.isPast
                                        ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                        : dateObj.date.getDate() === selectedDate.getDate() &&
                                            dateObj.date.getMonth() === selectedDate.getMonth() &&
                                            dateObj.date.getFullYear() === selectedDate.getFullYear()
                                            ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg scale-105'
                                            : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:shadow-md hover:scale-105'
                                        }`}
                                >
                                    <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide opacity-80">{dateObj.label}</span>
                                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1">{dateObj.day}</span>
                                    {!dateObj.isPast && dateObj.bookings > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-white shadow-md">
                                            {dateObj.bookings}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleNextWeek}
                            className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center hover:shadow-md transition-all hover:scale-105"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                        </button>
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <div className="px-3 sm:px-4 lg:px-6 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full border border-purple-100">
                            <p className="text-xs sm:text-sm font-medium text-gray-700">
                                <span className="font-bold text-purple-600">{currentSessions.length} {currentSessions.length === 1 ? 'session' : 'sessions'}</span> on {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sessions List */}
                <div className="space-y-4">
                    {currentSessions.length > 0 ? (
                        currentSessions.map((session) => (
                            <div
                                key={session.id}
                                onClick={() => setSelectedSession(session)}
                                className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-200"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                    <div className="flex-1">
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{session.studentName}</h3>
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm font-medium text-blue-700">{session.time}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-100 rounded-lg">
                                                <Phone className="w-4 h-4 text-green-600" />
                                                <span className="text-sm font-medium text-green-700">Phone Call</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                        <button
                                            disabled={!session.isActive}
                                            className={`px-5 py-2.5 rounded-xl font-semibold transition-all text-sm sm:text-base ${session.isActive
                                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            Start Call
                                        </button>
                                        <button
                                            disabled={!session.isActive}
                                            className={`px-5 py-2.5 rounded-xl font-semibold transition-all text-sm sm:text-base ${session.isActive
                                                ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            End Call
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center border border-gray-100">
                            <Calendar className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-base sm:text-lg font-medium">No sessions scheduled for this date</p>
                            <p className="text-gray-400 text-sm mt-2">Select another date to view sessions</p>
                        </div>
                    )}
                </div>

            </div>

            {/* Session Details Modal */}
            {selectedSession && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedSession(null)}>
                    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 transform transition-all" onClick={(e) => e.stopPropagation()}>

                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Session Details</h2>
                                <p className="text-gray-600 font-medium">{selectedSession.studentName}</p>
                            </div>
                            <button
                                onClick={() => setSelectedSession(null)}
                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all hover:scale-110"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="space-y-3 sm:space-y-4 mb-6">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                <div className="flex items-center gap-2 text-blue-700 mb-2">
                                    <Clock className="w-5 h-5" />
                                    <span className="font-semibold">Time</span>
                                </div>
                                <p className="text-gray-700 ml-7 font-medium">{selectedSession.time}</p>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl border border-green-200">
                                <div className="flex items-center gap-2 text-green-700 mb-2">
                                    <Phone className="w-5 h-5" />
                                    <span className="font-semibold">Mode</span>
                                </div>
                                <p className="text-gray-700 ml-7 font-medium">Phone Call</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                disabled={!selectedSession.isActive}
                                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${selectedSession.isActive
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Start Call
                            </button>
                            <button
                                disabled={!selectedSession.isActive}
                                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${selectedSession.isActive
                                    ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                End Call
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};
