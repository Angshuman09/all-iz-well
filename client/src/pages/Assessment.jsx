import { useState } from "react";
import { useAssessmentTest } from "../apis/Student";

const phqQuestions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure",
  "Trouble concentrating on things",
  "Moving/speaking slowly or being fidgety/restless",
  "Thoughts that you'd be better off dead or hurting yourself",
];

const gadQuestions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid something awful might happen",
];

export default function Assessment() {
  const [mode, setMode] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [assessmentData, setAssessmentData] = useState(null);

  const { submitAssessmentMutation, isPending, isError, error } = useAssessmentTest();

  const questions = mode === "phq" ? phqQuestions : gadQuestions;
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const updateAnswer = (i, val) => {
    const arr = [...answers];
    arr[i] = val;
    setAnswers(arr);
    
    if (i < totalQuestions - 1) {
      setTimeout(() => setCurrentQuestion(i + 1), 300);
    }
  };

  const getSeverityLevel = (score, type) => {
    if (type === "phq-9") {
      if (score <= 4) return { level: "Minimal", color: "from-green-400 to-emerald-500" };
      if (score <= 9) return { level: "Mild", color: "from-blue-400 to-cyan-500" };
      if (score <= 14) return { level: "Moderate", color: "from-yellow-400 to-amber-500" };
      if (score <= 19) return { level: "Moderately Severe", color: "from-orange-400 to-red-500" };
      return { level: "Severe", color: "from-red-500 to-rose-600" };
    } else {
      if (score <= 4) return { level: "Minimal", color: "from-green-400 to-emerald-500" };
      if (score <= 9) return { level: "Mild", color: "from-blue-400 to-cyan-500" };
      if (score <= 14) return { level: "Moderate", color: "from-yellow-400 to-amber-500" };
      return { level: "Severe", color: "from-red-500 to-rose-600" };
    }
  };

  const handleSubmit = async () => {
    if (!answers.every((a) => a !== null && a !== undefined)) {
      return;
    }

    try {
      const result = await submitAssessmentMutation({
        type: mode === "phq" ? "phq-9" : "gad-7",
        answers: answers
      });

      if (result.data) {
        setAssessmentData(result.data);
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Error submitting assessment:', err);
    }
  };

  const resetTest = () => {
    setMode(null);
    setAnswers([]);
    setSubmitted(false);
    setCurrentQuestion(0);
    setAssessmentData(null);
  };

  const severity = assessmentData ? getSeverityLevel(assessmentData.score, mode === "phq" ? "phq-9" : "gad-7") : null;

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10 px-5 py-10 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-3xl mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Mental Health Assessment
            </h1>
            <p className="text-gray-600 text-lg">Your wellbeing matters to us</p>
          </div>

          {!mode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button
                onClick={() => {
                  setMode("phq");
                  setAnswers(Array(9).fill(null));
                  setSubmitted(false);
                  setCurrentQuestion(0);
                }}
                className="group relative p-8 bg-white backdrop-blur-sm rounded-3xl shadow-xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">PHQ-9 Depression</h2>
                  <p className="text-gray-600 mb-4">Comprehensive assessment for depression symptoms</p>
                  <div className="flex items-center text-sm text-purple-600 font-semibold">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    9 questions • 2-3 minutes
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setMode("gad");
                  setAnswers(Array(7).fill(null));
                  setSubmitted(false);
                  setCurrentQuestion(0);
                }}
                className="group relative p-8 bg-white backdrop-blur-sm rounded-3xl shadow-xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-cyan-600 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">GAD-7 Anxiety</h2>
                  <p className="text-gray-600 mb-4">Comprehensive assessment for anxiety symptoms</p>
                  <div className="flex items-center text-sm text-blue-600 font-semibold">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    7 questions • 2-3 minutes
                  </div>
                </div>
              </button>
            </div>
          )}

          {mode && !submitted && (
            <div className="bg-white backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-200">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                    onClick={resetTest}
                    disabled={isPending}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-medium">Back</span>
                  </button>
                  <span className="text-sm font-semibold text-gray-600">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  {questions[currentQuestion]}
                </h3>

                <div className="space-y-3">
                  {[
                    { value: 0, label: "Not at all", emoji: "😊" },
                    { value: 1, label: "Several days", emoji: "😐" },
                    { value: 2, label: "More than half the days", emoji: "😟" },
                    { value: 3, label: "Nearly every day", emoji: "😢" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateAnswer(currentQuestion, option.value)}
                      disabled={isPending}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-4
                        ${
                          answers[currentQuestion] === option.value
                            ? "bg-linear-to-r from-purple-500 to-pink-500 border-transparent text-white shadow-lg scale-105"
                            : "bg-white border-gray-300 hover:border-purple-300 hover:shadow-md"
                        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <span className="text-3xl">{option.emoji}</span>
                      <span className="font-semibold text-lg">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {isError && error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  {error.message}
                </div>
              )}

              <div className="flex gap-4">
                {currentQuestion > 0 && (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    disabled={isPending}
                    className="px-6 py-3 rounded-xl border-2 border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                )}
                {currentQuestion < totalQuestions - 1 && answers[currentQuestion] !== null && (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    disabled={isPending}
                    className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Question
                  </button>
                )}
                {currentQuestion === totalQuestions - 1 &&
                  answers.every((a) => a !== null && a !== undefined) && (
                    <button
                      className="flex-1 px-6 py-4 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSubmit}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Submit Assessment"
                      )}
                    </button>
                  )}
              </div>
            </div>
          )}

          {submitted && assessmentData && severity && (
            <div className="bg-white backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-200">
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-24 h-24 bg-linear-to-br ${severity.color} rounded-full mb-4 shadow-xl`}>
                  {assessmentData.isCritical ? (
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Assessment Complete</h2>
                <p className="text-gray-600">Thank you for taking the time to assess your mental health</p>
              </div>

              <div className={`p-6 rounded-2xl bg-linear-to-br ${severity.color} shadow-xl mb-6`}>
                <div className="text-center text-white">
                  <p className="text-6xl font-bold mb-2">{assessmentData.score}</p>
                  <p className="text-xl font-semibold opacity-90">
                    {severity.level} {mode === "phq" ? "Depression" : "Anxiety"}
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border-2 mb-6 ${
                assessmentData.isCritical 
                  ? "bg-red-50 border-red-200" 
                  : "bg-green-50 border-green-200"
              }`}>
                <h3 className={`text-xl font-bold mb-3 ${assessmentData.isCritical ? "text-red-800" : "text-green-800"}`}>
                  {assessmentData.isCritical ? "⚠️ Professional Support Recommended" : "✓ Your Mental Health Status"}
                </h3>
                <p className={`${assessmentData.isCritical ? "text-red-700" : "text-green-700"}`}>
                  {assessmentData.isCritical
                    ? "Your score indicates you may benefit from professional support. We encourage you to speak with a counselor who can provide personalized guidance."
                    : "Your score indicates manageable levels. Continue practicing self-care and reach out if you need support."}
                </p>
                {assessmentData.counsellorNotified && (
                  <p className="mt-3 text-sm text-red-600 font-semibold">
                    ✓ A counselor has been notified and will contact you soon.
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {assessmentData.isCritical && (
                  <button
                    className="flex-1 py-4 rounded-xl bg-linear-to-r from-red-500 to-pink-600 text-white text-lg font-bold hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                    onClick={() => {
                      // Navigate to appointment booking page
                      window.location.href = '/book-appointment';
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Appointment with Counsellor
                  </button>
                )}
                <button
                  onClick={resetTest}
                  className="flex-1 py-4 rounded-xl border-2 border-gray-300 text-gray-700 text-lg font-bold hover:bg-gray-50 hover:scale-105 transition-all"
                >
                  Take Another Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}