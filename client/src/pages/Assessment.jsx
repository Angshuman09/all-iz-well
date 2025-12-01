import React, { useState } from "react";
import { BrainCircuit, AlertTriangle, CheckCircle, ClipboardList } from "lucide-react";

const phqQuestions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure",
  "Trouble concentrating on things",
  "Moving/speaking slowly or being fidgety/restless",
  "Thoughts that you’d be better off dead or hurting yourself",
];

const gadQuestions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it’s hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid something awful might happen",
];

export default function Assessment() {
  const [mode, setMode] = useState(null); 
  const [answers, setAnswers] = useState([]);

  const questions = mode === "phq" ? phqQuestions : gadQuestions;

  const updateAnswer = (i, val) => {
    const arr = [...answers];
    arr[i] = val;
    setAnswers(arr);
  };

  const score =
    answers.length === questions.length &&
    answers.every((a) => a !== null && a !== undefined)
      ? answers.reduce((a, b) => a + b, 0)
      : null;

  const isCritical =
    (mode === "phq" && score >= 20) || (mode === "gad" && score >= 15);

  return (
    <div
      className="min-h-screen w-full px-5 py-10 flex justify-center"
      style={{
        background:
          "linear-gradient(135deg, #E6F4FF 0%, #F7FFE8 50%, #FFF6F9 100%)",
      }}
    >
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-[#1A3A5F] mb-6">
          Mental Health Assessment
        </h1>

        {/* Selection Cards */}
        {!mode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => {
                setMode("phq");
                setAnswers(Array(9).fill(null));
              }}
              className="p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition"
            >
              <BrainCircuit className="text-purple-500 mb-3" size={32} />
              <h2 className="text-xl font-semibold text-[#1A3A5F]">PHQ-9</h2>
              <p className="text-sm text-gray-600">Assessment for depression</p>
            </button>

            <button
              onClick={() => {
                setMode("gad");
                setAnswers(Array(7).fill(null));
              }}
              className="p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition"
            >
              <ClipboardList className="text-blue-500 mb-3" size={32} />
              <h2 className="text-xl font-semibold text-[#1A3A5F]">GAD-7</h2>
              <p className="text-sm text-gray-600">Assessment for anxiety</p>
            </button>
          </div>
        )}

        {/* Questionnaire */}
        {mode && (
          <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-[#1A3A5F]">
                {mode === "phq" ? "PHQ-9 Questionnaire" : "GAD-7 Questionnaire"}
              </h2>

              <button
                className="text-sm text-[#1A73E8] underline"
                onClick={() => setMode(null)}
              >
                Back
              </button>
            </div>

            {questions.map((q, index) => (
              <div key={index} className="mb-6">
                <p className="font-medium text-[#1A3A5F] mb-2">{q}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[0, 1, 2, 3].map((v) => (
                    <button
                      key={v}
                      onClick={() => updateAnswer(index, v)}
                      className={`py-2 px-3 rounded-xl border text-sm transition 
                        ${
                          answers[index] === v
                            ? "bg-[#E6F0FF] border-[#1A73E8] font-semibold"
                            : "bg-white border-gray-300"
                        }`}
                    >
                      {v === 0 && "Not at all"}
                      {v === 1 && "Several days"}
                      {v === 2 && "More than half the days"}
                      {v === 3 && "Nearly every day"}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Score Section */}
            {score !== null && (
              <div
                className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                  isCritical
                    ? "bg-red-50 border border-red-300 text-red-700"
                    : "bg-green-50 border border-green-300 text-green-700"
                }`}
              >
                {isCritical ? (
                  <AlertTriangle size={24} />
                ) : (
                  <CheckCircle size={24} />
                )}
                <p className="font-semibold text-lg">
                  Score: {score}{" "}
                  {isCritical ? "(Critical)" : "(Safe Range)"}
                </p>
              </div>
            )}

            {/* Critical Button */}
            {isCritical && (
              <button
                className="w-full py-4 mt-6 rounded-xl bg-[#1A73E8] text-white text-lg font-semibold hover:bg-[#155FCC] transition"
                onClick={() => console.log("Redirect to counsellor")}
              >
                Contact Counsellor
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
