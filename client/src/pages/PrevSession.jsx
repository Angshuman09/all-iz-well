import { useState } from 'react';
import { Calendar, Clock, Video, CheckCircle, ChevronRight, X, FileText, Save } from 'lucide-react';

export const PreviousSessions = () => {
    const [selectedSession, setSelectedSession] = useState(null);
    const [studentNotes, setStudentNotes] = useState({
        'Alice Johnson': 'Student showed significant improvement. Reported better sleep patterns and more positive outlook. Continue monitoring anxiety levels.',
        'David Chen': '',
        'Emma Wilson': 'Discussed coping mechanisms for exam stress. Student is responding well to mindfulness techniques.',
    });
    const [currentNote, setCurrentNote] = useState('');

    // FORCE ALL SESSIONS TO BE ONLINE, IGNORE 'mode' IN YOUR DATA
    const previousSessions = [
        {
            id: 1,
            studentName: 'Alice Johnson',
            date: '2024-11-28',
            time: '10:00 AM',
            status: 'Completed',
            phq9: 8,
            gad7: 12,
        },
        {
            id: 2,
            studentName: 'David Chen',
            date: '2024-11-27',
            time: '2:30 PM',
            status: 'Completed',
            phq9: 15,
            gad7: 18,
        },
        {
            id: 3,
            studentName: 'Emma Wilson',
            date: '2024-11-25',
            time: '11:00 AM',
            status: 'Completed',
            phq9: 6,
            gad7: 8,
        },
        {
            id: 4,
            studentName: 'Michael Brown',
            date: '2024-11-24',
            time: '4:00 PM',
            status: 'Completed',
            phq9: 12,
            gad7: 14,
        },
        {
            id: 5,
            studentName: 'Sarah Martinez',
            date: '2024-11-22',
            time: '9:30 AM',
            status: 'Completed',
            phq9: 10,
            gad7: 11,
        },
        {
            id: 6,
            studentName: 'James Taylor',
            date: '2024-11-20',
            time: '1:00 PM',
            status: 'Completed',
            phq9: 7,
            gad7: 9,
        },
    ];

    const handleSessionClick = (session) => {
        setSelectedSession(session);
        setCurrentNote(studentNotes[session.studentName] || '');
    };

    const handleSaveNote = () => {
        if (selectedSession) {
            setStudentNotes({
                ...studentNotes,
                [selectedSession.studentName]: currentNote,
            });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Previous Sessions</h1>
                    <p className="text-gray-600">View all past counselling sessions and your saved notes.</p>
                </div>

                {/* Sessions Grid */}
                <div className="grid gap-4">
                    {previousSessions.map((session) => (
                        <div
                            key={session.id}
                            onClick={() => handleSessionClick(session)}
                            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-3">
                                        <h3 className="text-xl font-semibold text-gray-900">{session.studentName}</h3>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            {session.status}
                                        </span>

                                        {studentNotes[session.studentName] && (
                                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium flex items-center gap-1">
                                                <FileText className="w-3.5 h-3.5" />
                                                Notes Added
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-6 text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">{formatDate(session.date)}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm">{session.time}</span>
                                        </div>


                                    </div>
                                </div>

                                <ChevronRight className="w-6 h-6 text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedSession && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-3xl">
                                <h2 className="text-2xl font-bold text-gray-900">Session Details</h2>
                                <button
                                    onClick={() => setSelectedSession(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-6">
                                {/* Student Info */}
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedSession.studentName}</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium">
                                            {formatDate(selectedSession.date)}
                                        </span>

                                        <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium">
                                            {selectedSession.time}
                                        </span>


                                    </div>
                                </div>

                                {/* Assessment Scores */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                                        <p className="text-sm text-blue-700 font-medium mb-1">PHQ-9 Score</p>
                                        <p className="text-3xl font-bold text-blue-900">{selectedSession.phq9}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                                        <p className="text-sm text-purple-700 font-medium mb-1">GAD-7 Score</p>
                                        <p className="text-3xl font-bold text-purple-900">{selectedSession.gad7}</p>
                                    </div>
                                </div>

                                {/* Notes Section */}
                                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FileText className="w-5 h-5 text-yellow-700" />
                                        <h4 className="text-lg font-semibold text-gray-900">Session Notes</h4>
                                    </div>

                                    <textarea
                                        value={currentNote}
                                        onChange={(e) => setCurrentNote(e.target.value)}
                                        placeholder="Add your observations and notes about this session..."
                                        className="w-full h-32 p-4 bg-white rounded-lg border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 placeholder-gray-400 resize-none"
                                    />

                                    <button
                                        onClick={handleSaveNote}
                                        className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <Save className="w-5 h-5" />
                                        Save Note
                                    </button>

                                    {studentNotes[selectedSession.studentName] && (
                                        <div className="mt-4 pt-4 border-t border-yellow-200">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Saved Note:</p>
                                            <p className="text-sm text-gray-600 bg-white p-3 rounded-lg">
                                                {studentNotes[selectedSession.studentName]}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

