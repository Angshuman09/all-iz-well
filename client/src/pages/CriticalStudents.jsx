import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, Calendar, CheckCircle, BarChart3 } from 'lucide-react';
import { useGetCriticalStudents } from '../apis/Counsellor';
export const CriticalStudents = () => {
    const [students, setStudents] = useState([
        {
            id: 1,
            name: 'Preetis Debonath',
            phq9: 18,
            gad7: 16,
            resolved: false,
            appointment: null
        },
        {
            id: 2,
            name: 'Angshuman Kashyap',
            phq9: 21,
            gad7: 19,
            resolved: false,
            appointment: null
        },
        {
            id: 3,
            name: 'Rahul Sharma',
            phq9: 17,
            gad7: 15,
            resolved: false,
            appointment: null
        }
    ]);

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const { getCriticalStudents } = useGetCriticalStudents();
    console.log(getCriticalStudents)

    const slots = ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];

    const handleMarkResolved = (id) => {
        setStudents(students.map(s =>
            s.id === id ? { ...s, resolved: true } : s
        ));
        setTimeout(() => {
            setStudents(prev => prev.filter(s => s.id !== id));
        }, 500);
    };

    const openBookingModal = (student) => {
        setSelectedStudent(student);
        setSelectedDate("");
        setSelectedSlot("");
        setShowBookingModal(true);
    };

    const confirmBooking = () => {
        if (!selectedDate || !selectedSlot) return;

        setStudents(students.map(s =>
            s.id === selectedStudent.id
                ? { ...s, appointment: { date: selectedDate, slot: selectedSlot } }
                : s
        ));

        setShowBookingModal(false);
    };

    const criticalCount = students.filter(s => !s.resolved).length;
    const resolvedCount = students.filter(s => s.resolved).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Critical Students</h1>
                    <p className="text-gray-600">Monitor and manage students requiring immediate attention</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-2">No. of Students Marked Critical</p>
                                <p className="text-4xl font-bold text-gray-900">{getCriticalStudents?.count}</p>
                            </div>
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                                <AlertTriangle className="w-7 h-7 text-red-600" strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-2">Cases Resolved</p>
                                <p className="text-4xl font-bold text-gray-900">{resolvedCount}</p>
                            </div>
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                                <CheckCircle className="w-7 h-7 text-green-600" strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Critical Students</h2>
                </div>

                {/* Student Cards */}
                <div className="space-y-4">
                    {students.map((student) => (
                        <div
                            key={student.id}
                            className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 ${student.resolved ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                                {/* Student Info */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{student.name}</h3>

                                    {/* Scores */}
                                    <div className="flex gap-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                                                <TrendingUp className="w-4 h-4 text-purple-600" strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">PHQ-9</p>
                                                <p className="text-lg font-bold text-gray-900">{student.phq9}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                                <BarChart3 className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">GAD-7</p>
                                                <p className="text-lg font-bold text-gray-900">{student.gad7}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Appointment Info */}
                                    {student.appointment && (
                                        <p className="mt-3 text-sm text-green-700 font-medium">
                                            Appointed at: {student.appointment.date} — {student.appointment.slot}
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <button className="px-5 py-2.5 rounded-xl border-2 border-blue-200 text-blue-600 font-medium hover:bg-blue-50 transition-colors flex items-center gap-2">
                                        <BarChart3 className="w-4 h-4" strokeWidth={1.5} />
                                        View Analytics
                                    </button>

                                    <button
                                        onClick={() => openBookingModal(student)}
                                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                                    >
                                        <Calendar className="w-4 h-4" strokeWidth={1.5} />
                                        Book
                                    </button>

                                    <button
                                        onClick={() => handleMarkResolved(student.id)}
                                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                                    >
                                        <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
                                        Mark Resolved
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {students.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-green-600" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">All Cases Resolved</h3>
                        <p className="text-gray-600">Great work! There are no critical students at the moment.</p>
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
                    <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Book Slot for {selectedStudent?.name}
                        </h3>

                        {/* Date Picker */}
                        <label className="text-sm font-medium text-gray-600">Select Date</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full p-2 mt-1 mb-4 border rounded-lg"
                        />

                        {/* Slots */}
                        <label className="text-sm font-medium text-gray-600">Select Time Slot</label>
                        <div className="grid grid-cols-2 gap-3 mt-2 mb-4">
                            {slots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`p-2 rounded-lg border text-sm ${selectedSlot === slot
                                        ? "bg-blue-500 text-white border-blue-600"
                                        : "bg-gray-50 border-gray-300 text-gray-700"
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>

                        {/* Modal Actions */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowBookingModal(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmBooking}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:shadow-lg"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

