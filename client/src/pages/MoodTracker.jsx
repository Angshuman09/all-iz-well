import { useState } from 'react';
import { Frown, Meh, Smile, Heart } from 'lucide-react';
import { useSetStudentMood } from '../apis/Student';

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const moods = [
    { value: -2, label: 'Very Bad', emoji: '😢', color: 'bg-red-500 hover:bg-red-600', icon: Frown },
    { value: -1, label: 'Bad', emoji: '😟', color: 'bg-orange-500 hover:bg-orange-600', icon: Frown },
    { value: 0, label: 'Neutral', emoji: '😐', color: 'bg-gray-500 hover:bg-gray-600', icon: Meh },
    { value: 1, label: 'Good', emoji: '😊', color: 'bg-blue-500 hover:bg-blue-600', icon: Smile },
    { value: 2, label: 'Very Good', emoji: '😄', color: 'bg-green-500 hover:bg-green-600', icon: Heart },
  ];

  const {studentMood, isPending} = useSetStudentMood();

  const handleMoodSelect = (moodValue) => {
    setSelectedMood(moodValue);
    setMessage('');
  };

  const handleSubmit = async () => {
    if (selectedMood === null) {
      setMessage('Please select a mood');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = studentMood({
        mood: selectedMood
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Mood recorded successfully! 🎉');
        setTimeout(() => {
          setSelectedMood(null);
          setMessage('');
        }, 2000);
      } else {
        setMessage(data.error || 'Failed to record mood');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            How are you feeling today?
          </h1>
          <p className="text-gray-600">
            Select your current mood to help us understand you better
          </p>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-8">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.value;
            
            return (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                className={`
                  relative p-4 rounded-xl transition-all duration-200 transform
                  ${isSelected 
                    ? `${mood.color} scale-110 shadow-lg` 
                    : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'
                  }
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                disabled={isSubmitting}
              >
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-4xl">{mood.emoji}</span>
                  <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                    {mood.label}
                  </span>
                </div>
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || selectedMood === null}
          className={`
            w-full py-4 rounded-xl font-semibold text-white text-lg
            transition-all duration-200 transform
            ${selectedMood !== null && !isSubmitting
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 hover:scale-105 shadow-lg'
              : 'bg-gray-300 cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit Mood'
          )}
        </button>

        {message && (
          <div className={`
            mt-4 p-4 rounded-lg text-center font-medium
            ${message.includes('successfully') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
            }
          `}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your mood data helps us provide better support and resources</p>
        </div>
      </div>
    </div>
  );
}