import React, { useState } from 'react';
import { BarChart3, MessageSquare, Users, LogOut, Plus, TrendingUp, AlertCircle, Eye, UserCheck, Mail, Phone, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('mood');
  const [showAddCounsellor, setShowAddCounsellor] = useState(false);

  const counsellors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Anxiety & Depression', status: 'Available', email: 'sarah.j@college.edu', phone: '+1 234-567-8900', sessions: 45 },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Stress Management', status: 'Busy', email: 'michael.c@college.edu', phone: '+1 234-567-8901', sessions: 38 },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Trauma Counseling', status: 'Available', email: 'emily.r@college.edu', phone: '+1 234-567-8902', sessions: 52 },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Academic Stress', status: 'Available', email: 'james.w@college.edu', phone: '+1 234-567-8903', sessions: 41 }
  ];

  const anonymousPosts = [
    { id: 1, content: 'Feeling overwhelmed with finals coming up. Anyone else struggling?', mood: 'anxious', date: '2 hours ago', replies: 12, severity: 'medium' },
    { id: 2, content: 'Really grateful for the support I\'ve received. Things are getting better.', mood: 'hopeful', date: '5 hours ago', replies: 8, severity: 'low' },
    { id: 3, content: 'Having trouble sleeping and concentrating on studies lately.', mood: 'stressed', date: '1 day ago', replies: 15, severity: 'medium' },
    { id: 4, content: 'Feeling isolated and lonely. Miss my friends back home.', mood: 'sad', date: '1 day ago', replies: 10, severity: 'high' }
  ];

  const moodData = [
    { mood: 'Happy', count: 156, percentage: 35, color: 'bg-green-500' },
    { mood: 'Neutral', count: 123, percentage: 28, color: 'bg-blue-500' },
    { mood: 'Anxious', count: 89, percentage: 20, color: 'bg-yellow-500' },
    { mood: 'Sad', count: 52, percentage: 12, color: 'bg-orange-500' },
    { mood: 'Stressed', count: 25, percentage: 5, color: 'bg-red-500' }
  ];

  const getMoodColor = (mood) => {
    const colors = {
      happy: 'text-green-600 bg-green-100',
      hopeful: 'text-blue-600 bg-blue-100',
      anxious: 'text-yellow-600 bg-yellow-100',
      stressed: 'text-orange-600 bg-orange-100',
      sad: 'text-red-600 bg-red-100'
    };
    return colors[mood] || 'text-gray-600 bg-gray-100';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-red-100 text-red-700'
    };
    return colors[severity];
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-br from-indigo-600 to-purple-600 p-2 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">College Admin Portal</h1>
                <p className="text-sm text-gray-500">Mental Health Management</p>
              </div>
            </div>
            <button
              onClick={() => alert('Logging out...')}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md p-2 mb-8 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveSection('mood')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              activeSection === 'mood'
                ? 'bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Mood Analysis
          </button>
          <button
            onClick={() => setActiveSection('posts')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              activeSection === 'posts'
                ? 'bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Anonymous Posts
          </button>
          <button
            onClick={() => setActiveSection('counsellors')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              activeSection === 'counsellors'
                ? 'bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            Counsellors
          </button>
        </div>

        {/* Mood Analysis Section */}
        {activeSection === 'mood' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Student Mood Analytics</h2>
              <div className="text-sm text-gray-600">Total Entries: <span className="font-bold text-indigo-600">445</span></div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-linear-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8" />
                  <span className="text-2xl font-bold">63%</span>
                </div>
                <p className="text-green-100 text-sm">Positive Moods</p>
                <p className="text-white font-semibold mt-1">Trending Up</p>
              </div>
              <div className="bg-linear-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="w-8 h-8" />
                  <span className="text-2xl font-bold">20%</span>
                </div>
                <p className="text-yellow-100 text-sm">Anxious Students</p>
                <p className="text-white font-semibold mt-1">Needs Attention</p>
              </div>
              <div className="bg-linear-to-br from-red-500 to-pink-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="w-8 h-8" />
                  <span className="text-2xl font-bold">17%</span>
                </div>
                <p className="text-red-100 text-sm">High Risk</p>
                <p className="text-white font-semibold mt-1">Immediate Care</p>
              </div>
            </div>

            {/* Mood Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Mood Distribution</h3>
              <div className="space-y-4">
                {moodData.map((item) => (
                  <div key={item.mood}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">{item.mood}</span>
                      <span className="text-sm text-gray-600">{item.count} students ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${item.color} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Anonymous Posts Section */}
        {activeSection === 'posts' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Anonymous Community Posts</h2>
              <div className="text-sm text-gray-600">Last 7 Days</div>
            </div>

            <div className="space-y-4">
              {anonymousPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMoodColor(post.mood)}`}>
                        {post.mood}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(post.severity)}`}>
                        {post.severity} priority
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{post.replies} replies</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 font-medium">
                      <Eye className="w-4 h-4" />
                      View Thread
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Counsellors Section */}
        {activeSection === 'counsellors' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Counsellor Management</h2>
              <button
                onClick={() => setShowAddCounsellor(!showAddCounsellor)}
                className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg shadow-lg transition-all duration-200 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Counsellor
              </button>
            </div>

            {/* Add Counsellor Form */}
            {showAddCounsellor && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Counsellor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Specialty"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      alert('Counsellor added successfully!');
                      setShowAddCounsellor(false);
                    }}
                    className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Add Counsellor
                  </button>
                  <button
                    onClick={() => setShowAddCounsellor(false)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Counsellors List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {counsellors.map((counsellor) => (
                <div key={counsellor.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-linear-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {counsellor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{counsellor.name}</h3>
                        <p className="text-sm text-gray-600">{counsellor.specialty}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      counsellor.status === 'Available' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {counsellor.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Mail className="w-4 h-4" />
                      <span>{counsellor.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{counsellor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{counsellor.sessions} sessions completed</span>
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 font-medium border border-indigo-200">
                    <UserCheck className="w-4 h-4" />
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}