import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

export const FeedbackPage = () => {
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const feedbackData = [
        {
            id: 1,
            anonId: "Anonymous #A23",
            rating: 5,
            timestamp: "2024-12-05 10:32 AM",
            message: "The session was extremely helpful. I feel much more confident now. The counsellor listened to all my concerns and provided practical strategies I can use daily."
        },
        {
            id: 2,
            anonId: "Anonymous #X91",
            rating: 3,
            timestamp: "2024-12-03 7:12 PM",
            message: "Feeling overwhelmed. Would like more guidance managing workload. The session was okay but I expected more concrete advice on time management."
        },
        {
            id: 3,
            anonId: "Anonymous #M07",
            rating: 4,
            timestamp: "2024-12-02 2:15 PM",
            message: "The booking system is easy to use but could be faster. Overall good experience with the platform interface."
        },
        {
            id: 4,
            anonId: "Anonymous #K44",
            rating: 5,
            timestamp: "2024-12-01 3:45 PM",
            message: "I finally found someone who understands what I'm going through. The coping techniques shared have been life-changing. Thank you so much!"
        },
        {
            id: 5,
            anonId: "Anonymous #P18",
            rating: 4,
            timestamp: "2024-11-30 11:20 AM",
            message: "Really appreciated the non-judgmental approach. Helped me see my study habits from a different perspective."
        },
        {
            id: 6,
            anonId: "Anonymous #T55",
            rating: 2,
            timestamp: "2024-11-29 6:10 PM",
            message: "Had some technical issues during the video call. Session kept disconnecting. Hope this can be fixed soon."
        }
    ];

    const openModal = (feedback) => {
        setSelectedFeedback(feedback);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedFeedback(null), 200);
    };

    const renderStars = (rating, filled = true) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`w-5 h-5 ${index < rating
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-300 fill-gray-300'
                    }`}
            />
        ));
    };

    const truncateText = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Counselling Experience': 'bg-blue-100 text-blue-700',
            'Stress': 'bg-purple-100 text-purple-700',
            'Platform Feedback': 'bg-pink-100 text-pink-700',
            'Anxiety': 'bg-indigo-100 text-indigo-700',
            'Academic Pressure': 'bg-violet-100 text-violet-700'
        };
        return colors[category] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">
                        Student Feedback
                    </h1>
                    <p className="text-slate-600">
                        View anonymous feedback and ratings submitted by students.
                    </p>
                </div>



                {/* Feedback Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feedbackData.map((feedback) => (
                        <div
                            key={feedback.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer"
                            onClick={() => openModal(feedback)}
                        >
                            {/* Anonymous ID Badge */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                    {feedback.anonId}
                                </span>
                                <span className="text-xs text-slate-500">{feedback.timestamp}</span>
                            </div>

                            {/* Category Tag */}
                            <div className="mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(feedback.category)}`}>
                                    {feedback.category}
                                </span>
                            </div>

                            {/* Star Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {renderStars(feedback.rating)}
                                <span className="ml-2 text-sm text-slate-600 font-medium">
                                    {feedback.rating}/5
                                </span>
                            </div>

                            {/* Feedback Text */}
                            <p className="text-slate-700 text-sm mb-4 line-clamp-3">
                                {truncateText(feedback.message)}
                            </p>

                            {/* View Details Button */}
                            <button className="w-full px-4 py-2 border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent border-gradient hover:shadow-md transition-all duration-200 rounded-lg font-medium text-sm">
                                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    View Details
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedFeedback && (
                <div
                    className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            animation: 'scaleIn 0.2s ease-out'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Modal Header */}
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">
                            Feedback Details
                        </h2>

                        {/* Anonymous ID Badge */}
                        <div className="mb-4">
                            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                {selectedFeedback.anonId}
                            </span>
                        </div>

                        {/* Timestamp */}
                        <p className="text-sm text-slate-500 mb-4">
                            {selectedFeedback.timestamp}
                        </p>

                        {/* Category */}
                        <div className="mb-6">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedFeedback.category)}`}>
                                {selectedFeedback.category}
                            </span>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 mb-6">
                            {renderStars(selectedFeedback.rating)}
                            <span className="ml-3 text-lg text-slate-700 font-semibold">
                                {selectedFeedback.rating} out of 5 stars
                            </span>
                        </div>

                        {/* Full Feedback Text */}
                        <div className="bg-slate-50 rounded-xl p-6 mb-6">
                            <h3 className="text-sm font-semibold text-slate-700 mb-2">
                                Feedback Message
                            </h3>
                            <p className="text-slate-700 leading-relaxed">
                                {selectedFeedback.message}
                            </p>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
};
