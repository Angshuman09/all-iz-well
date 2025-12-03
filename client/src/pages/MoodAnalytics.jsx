import React, { useState } from 'react';
import { TrendingUp, Heart, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Cell } from 'recharts';
export const MoodAnalytics = () => {
  const [moodData] = useState([
    { day: 'Mon', score: 1, mood: 'Happy', emoji: '😊' },
    { day: 'Tue', score: -1, mood: 'Sad', emoji: '😔' },
    { day: 'Wed', score: 2, mood: 'Very Happy', emoji: '😄' },
    { day: 'Thu', score: 0, mood: 'Neutral', emoji: '😐' },
    { day: 'Fri', score: 1, mood: 'Happy', emoji: '😊' },
    { day: 'Sat', score: 2, mood: 'Very Happy', emoji: '😄' },
    { day: 'Sun', score: 0, mood: 'Neutral', emoji: '😐' }
  ]);

  const [weeklyStats] = useState([
    { mood: 'Very Happy', emoji: '😄', percentage: 29, color: '#8EA8FF' },
    { mood: 'Happy', emoji: '😊', percentage: 29, color: '#7ED7C2' },
    { mood: 'Neutral', emoji: '😐', percentage: 28, color: '#A9C1FF' },
    { mood: 'Sad', emoji: '😔', percentage: 14, color: '#F7B9F2' },
    { mood: 'Very Sad', emoji: '😢', percentage: 0, color: '#FFB3B3' }
  ]);

  const getMoodEmoji = (score) => {
    if (score === 2) return '😄';
    if (score === 1) return '😊';
    if (score === 0) return '😐';
    if (score === -1) return '😔';
    return '😢';
  };

  const getMoodLabel = (score) => {
    if (score === 2) return 'Very Happy';
    if (score === 1) return 'Happy';
    if (score === 0) return 'Neutral';
    if (score === -1) return 'Sad';
    return 'Very Sad';
  };

  const mostFrequentScore = 2;
  const leastFrequentScore = -2;
  const averageScore = (moodData.reduce((acc, d) => acc + d.score, 0) / moodData.length).toFixed(1);

  const calculateVariability = () => {
    const scores = moodData.map(d => d.score);
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);

    if (stdDev < 0.5) return 'Very Stable';
    if (stdDev < 1.0) return 'Stable';
    if (stdDev < 1.5) return 'Moderate';
    if (stdDev < 2.0) return 'Variable';
    return 'Highly Variable';
  };

  const variability = calculateVariability();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-800">{payload[0].payload.day}</p>
          <p className="text-2xl">{getMoodEmoji(payload[0].value)}</p>
          <p className="text-sm text-gray-600">{getMoodLabel(payload[0].value)}</p>
          <p className="text-xs text-gray-500">Score: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{payload[0].payload.emoji}</span>
            <p className="text-sm font-semibold text-gray-800">{payload[0].payload.mood}</p>
          </div>
          <p className="text-lg font-bold text-gray-700 mt-1">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFFCEB] via-[#D6F6FF] to-[#EDEBFF] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Mood Analytics</h1>
          <p className="text-gray-600 text-sm md:text-base">Your emotional patterns and trends</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-[#8EA8FF]" />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">7-Day Mood Trend</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={moodData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8EA8FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8EA8FF" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis domain={[-2, 2]} ticks={[-2, -1, 0, 1, 2]} stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#8EA8FF"
                  strokeWidth={3}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <span className="text-lg">😄</span> Very Happy (2)
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <span className="text-lg">😊</span> Happy (1)
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <span className="text-lg">😐</span> Neutral (0)
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <span className="text-lg">😔</span> Sad (-1)
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <span className="text-lg">😢</span> Very Sad (-2)
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-[#7ED7C2]" />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Weekly Mood Breakdown</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="mood"
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value, index) => weeklyStats[index].emoji}
                />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                  {weeklyStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-3 mt-4 flex-wrap">
              {weeklyStats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: stat.color + '40', color: '#374151' }}
                >
                  <span className="text-base">{stat.emoji}</span>
                  <span>{stat.mood}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-[#A9C1FF]" />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Mood Insights</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#7ED7C2]/30 to-[#7ED7C2]/10 rounded-xl p-4 transition-transform hover:scale-105 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Most Frequent Mood</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{getMoodEmoji(mostFrequentScore)}</span>
                  <p className="text-xl font-bold text-gray-800">{getMoodLabel(mostFrequentScore)}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#F7B9F2]/30 to-[#F7B9F2]/10 rounded-xl p-4 transition-transform hover:scale-105 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Least Frequent Mood</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{getMoodEmoji(leastFrequentScore)}</span>
                  <p className="text-xl font-bold text-gray-800">{getMoodLabel(leastFrequentScore)}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#8EA8FF]/30 to-[#8EA8FF]/10 rounded-xl p-4 transition-transform hover:scale-105 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Average Mood Score</p>
                <p className="text-2xl font-bold text-gray-800">{averageScore}</p>
                <p className="text-xs text-gray-500 mt-1">Range: -2 to 2</p>
              </div>
              <div className="bg-gradient-to-br from-[#A9C1FF]/30 to-[#A9C1FF]/10 rounded-xl p-4 transition-transform hover:scale-105 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Mood Variability</p>
                <p className="text-2xl font-bold text-gray-800">{variability}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};