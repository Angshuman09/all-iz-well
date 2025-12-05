import React, { useState } from 'react';
import { UserCheck, Users, AlertTriangle, FilePlus, CheckCircle, XCircle, User, Mail, ShieldCheck, Ban, Hash, Flag, Eye, LayoutDashboard, Shield, MessageSquare, TrendingUp, Calendar, Bell, Search, MessageCircle } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddCounsellor, setShowAddCounsellor] = useState(false);
  const [newCounsellor, setNewCounsellor] = useState({ name: '', email: '', gender: 'Male' });
  const navigate = useNavigate();

  const [counsellors, setCounsellors] = useState([
    { id: 'CNS3713', name: 'Preetis Debnath', email: 'preetis.d@college.edu', gender: 'Male', status: 'inactive', appointments: 0 },
    { id: 'CNS1001', name: 'Asha Verma', email: 'asha.verma@college.edu', gender: 'Female', status: 'inactive', appointments: 12 },
    { id: 'CNS1002', name: 'Rohan Sen', email: 'rohan.sen@college.edu', gender: 'Male', status: 'inactive', appointments: 7 },
    { id: 'CNS1003', name: 'Dr. Priya Sharma', email: 'priya.sharma@college.edu', gender: 'Female', status: 'active', appointments: 24 },
  ]);

  const [criticalAlerts] = useState([
    { id: 'STU-A001', level: 'High', reason: 'PHQ-9 Score: 22 (Severe)', time: '2 hours ago' },
    { id: 'STU-B023', level: 'High', reason: 'SOS Call Triggered', time: '5 hours ago' },
    { id: 'STU-C045', level: 'Medium', reason: 'GAD-7 Score: 15 (Moderate)', time: '1 day ago' },
    { id: 'STU-D067', level: 'Medium', reason: 'Multiple crisis posts', time: '1 day ago' },
  ]);

  const [moderation] = useState({
    trending: ['#mentalhealth', '#examstress', '#anxiety', '#selfcare', '#depression'],
    reported: 12,
    flagged: 8,
  });

  const analytics = {
    counsellors: counsellors.filter(c => c.status === 'active').length,
    students: 3,
    critical: 2,
  };

  const getLevelColor = (level) => {
    if (level === 'High') return 'bg-red-100 text-red-700 border-red-200';
    if (level === 'Medium') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  const toggleCounsellorStatus = (id) => {
    setCounsellors(counsellors.map(c => 
      c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
    ));
  };

  const addCounsellor = () => {
    if (newCounsellor.name && newCounsellor.email) {
      const newId = `CNS${Math.floor(1000 + Math.random() * 9000)}`;
      setCounsellors([...counsellors, {
        id: newId,
        name: newCounsellor.name,
        email: newCounsellor.email,
        gender: newCounsellor.gender,
        status: 'active',
        appointments: 0
      }]);
      setNewCounsellor({ name: '', email: '', gender: 'Male' });
      setShowAddCounsellor(false);
    }
  };

  const Sidebar = () => (
    <div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 h-screen fixed left-0 top-0 p-6 text-white">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center font-bold text-sm">
            JEC
          </div>
          <span className="font-bold text-lg">ALL IZZ WELL</span>
        </div>
      </div>

      <nav className="space-y-2">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
        <button 
          onClick={() => setActiveTab('critical')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'critical' ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}
        >
          <Shield className="w-5 h-5" />
          <span>Critical Students</span>
        </button>
        <button 
          onClick={() => setActiveTab('mood')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'mood' ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}
        >
          <TrendingUp className="w-5 h-5" />
          <span>Mood Analytics</span>
        </button>
        <button 
          onClick={() => setActiveTab('posts')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'posts' ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Anonymous Posts</span>
        </button>
        <button 
          onClick={() => setActiveTab('trending')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'trending' ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Notification</span>
        </button>
        <button 
          onClick={() => setActiveTab('appointments')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'appointments' ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}
        >
          <Calendar className="w-5 h-5" />
          <span>Appointments</span>
        </button>
        <button 
          onClick={() => setActiveTab('counsellors')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'counsellors' ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}
        >
          <UserCheck className="w-5 h-5" />
          <span>Counsellors</span>
        </button>
      </nav>

      <div className="absolute bottom-6 left-6 text-sm text-slate-400">
        IQAC Officer
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFFCEB] via-[#D6F6FF] via-[#EDEBFF] to-[#FFE9F6]">
      <Sidebar />
      
      <div className="ml-64 min-h-screen">
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-800">SIH — Admin Dashboard</h1>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-gray-100 rounded text-sm">
                <span className="text-gray-500">Students</span>
                <span className="ml-2 font-semibold text-gray-800">{analytics.students}</span>
              </div>
              <div className="px-3 py-1 bg-red-100 rounded text-sm">
                <span className="text-gray-500">Critical</span>
                <span className="ml-2 font-semibold text-red-700">{analytics.critical}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
            <Search className="w-5 h-5 text-gray-600 cursor-pointer" />
            <span className="text-gray-600 font-medium">IQAC Officer</span>
          </div>
        </div>

        <div className="p-5 md:p-8 space-y-6">
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white/90 rounded-2xl shadow-md p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-800">{analytics.counsellors}</div>
                    <div className="text-sm text-gray-600">Active Counsellors</div>
                  </div>
                </div>

                <div className="bg-white/90 rounded-2xl shadow-md p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-800">{analytics.students}</div>
                    <div className="text-sm text-gray-600">Total Students</div>
                  </div>
                </div>

                <div className="bg-white/90 rounded-2xl shadow-md p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-800">{analytics.critical}</div>
                    <div className="text-sm text-gray-600">Critical Reports</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-5 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  Critical Alerts
                </h2>
                <div className="space-y-3">
                  {criticalAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-xl border-2 ${getLevelColor(alert.level)} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                      <div className="flex items-start gap-3 flex-1">
                        <AlertTriangle className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-semibold">Anonymous ID: {alert.id}</div>
                          <div className="text-sm mt-1">{alert.reason}</div>
                          <div className="text-xs mt-1 opacity-70">{alert.time}</div>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white font-semibold text-sm self-start sm:self-center">
                        {alert.level} Risk
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-5 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Flag className="w-6 h-6 text-orange-600" />
                  Community Insights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Hash className="w-5 h-5 text-blue-600" />
                      Trending Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {moderation.trending.map((tag, index) => (
                        <span key={index} className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Pending Reviews</h3>
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-orange-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Flag className="w-5 h-5 text-orange-600" />
                          <span className="text-gray-700">Reported Posts</span>
                        </div>
                        <span className="font-bold text-orange-700">{moderation.reported}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-red-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye className="w-5 h-5 text-red-600" />
                          <span className="text-gray-700">Flagged Posts</span>
                        </div>
                        <span className="font-bold text-red-700">{moderation.flagged}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'counsellors' && (
            <div className="bg-white rounded-2xl shadow-md">
              <div className="p-5 md:p-8 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Counsellors</h2>
                  <p className="text-gray-600 text-sm mt-1">Create and manage counsellor accounts</p>
                </div>
                <button 
                  onClick={() => setShowAddCounsellor(true)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  <FilePlus className="w-4 h-4" />
                  Add Counsellor
                </button>
              </div>

              {showAddCounsellor && (
                <div className="p-5 md:p-8 bg-blue-50 border-b border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-4">Add New Counsellor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newCounsellor.name}
                      onChange={(e) => setNewCounsellor({...newCounsellor, name: e.target.value})}
                      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newCounsellor.email}
                      onChange={(e) => setNewCounsellor({...newCounsellor, email: e.target.value})}
                      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={newCounsellor.gender}
                      onChange={(e) => setNewCounsellor({...newCounsellor, gender: e.target.value})}
                      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={addCounsellor}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
                    >
                      Add Counsellor
                    </button>
                    <button
                      onClick={() => setShowAddCounsellor(false)}
                      className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 font-medium hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointments</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {counsellors.map((counsellor) => (
                      <tr key={counsellor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{counsellor.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{counsellor.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{counsellor.gender}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${counsellor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            {counsellor.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{counsellor.appointments}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-800 font-medium mr-3">View</button>
                          <button 
                            onClick={() => toggleCounsellorStatus(counsellor.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            {counsellor.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* {(activeTab === 'critical' || activeTab === 'mood' || activeTab === 'posts' || activeTab === 'trending' || activeTab === 'appointments') && (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="text-gray-400 mb-4">
                <LayoutDashboard className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h3>
              <p className="text-gray-600">This section is under development</p>
            </div>
          )} */}

          {activeTab==='posts' && (
             <div className="min-h-screen bg-linear-to-br from-[#DFFCEB] via-[#D6F6FF] via-[#EDEBFF] to-[#FFE9F6] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Anonymous Community
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Posting as:{" "}
                <span className="font-semibold text-purple-600">
                  {/* {currentUser?.anonymousName} */}
                </span>
              </p>
            </div>

            <button
              // onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-linear-to-r from-[#EDEBFF] to-[#D6F6FF] text-gray-700 px-4 py-2 rounded-xl font-semibold hover:shadow-md transition-all duration-200"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Create Post</span>
            </button>
          </div>
        </div>

        {/* Trending Tags */}
        {trendingTags.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-gray-600" />
                <h2 className="text-lg font-bold text-gray-800">
                  Trending This Week
                </h2>
              </div>
              <span className="text-xs text-gray-400">Resets {weekEndDate}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {trendingTags.map((item, index) => (
                <span
                  key={index}
                  className={`${item.color} px-4 py-2 rounded-full text-sm font-medium text-gray-700 cursor-pointer hover:shadow-md transition-all duration-200 flex items-center gap-2`}
                >
                  <span className="font-bold text-xs bg-white bg-opacity-60 px-2 py-0.5 rounded-full">
                    {index + 1}
                  </span>
                  #{item.tag}
                  <span className="text-xs opacity-75">({item.count})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-linear-to-br from-[#EDEBFF] to-[#D6F6FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 mb-4">
              Be the first to share something with the community!
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-linear-to-r from-[#EDEBFF] to-[#D6F6FF] text-gray-800 font-semibold px-6 py-3 rounded-xl hover:shadow-md transition-all"
            >
              Create First Post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                {/* Top */}
                <div className="flex justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#DFFCEB] to-[#D6F6FF] flex justify-center items-center">
                      <span className="text-lg">🎭</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {post.anonymousName}
                      </p>
                      <p className="text-xs text-gray-400">{post.timestamp}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isOwnPost(post) ? (
                      <button
                        onClick={() => handleDeleteClick(post.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete your post"
                      >
                        <Trash2 size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReportClick(post.id)}
                        disabled={post.reported}
                        className={`text-gray-400 hover:text-red-500 transition-colors ${post.reported ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        title={post.reported ? "Already reported" : "Report post"}
                      >
                        <Flag
                          size={18}
                          fill={post.reported ? "currentColor" : "none"}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Text */}
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                  {highlightHashtags(post.text)}
                </p>

                {/* Likes */}
                <div className="flex items-center gap-4 text-gray-500 text-sm border-t pt-3">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 hover:text-pink-500 transition-colors"
                  >
                    <Heart
                      size={20}
                      className={
                        post.liked ? "fill-pink-500 text-pink-500" : ""
                      }
                    />
                    <span className="font-medium">{post.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- CREATE MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isCreating}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Share Anonymously
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Posting as:{" "}
              <span className="font-semibold text-purple-600">
                {currentUser?.anonymousName}
              </span>
            </p>

            <textarea
              value={newPostText}
              // onChange={(e) => setNewPostText(e.target.value)}
              placeholder="What's on your mind? Use #hashtags to connect with others..."
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-purple-300 transition-colors"
              disabled={isCreating}
            />

            <button
              // onClick={handleCreatePost}
              disabled={!newPostText.trim() || isCreating}
              className="w-full mt-4 bg-linear-to-r from-[#EDEBFF] via-[#D6F6FF] to-[#DFFCEB] text-gray-800 font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Anonymously"
              )}
            </button>
          </div>
        </div>
      )}

      {/* --- REPORT MODAL --- */}
      {showReportModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 relative">
            <button
              // onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              // disabled={isReporting}
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Flag size={24} className="text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Report Post</h2>
                <p className="text-sm text-gray-500">
                  Help us keep the community safe
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Please select a reason for reporting this post:
            </p>

            <div className="space-y-2 mb-6">
              {/* {reportReasons.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${reportReason === reason
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="report"
                    value={reason}
                    checked={reportReason === reason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="mr-3 accent-red-500"
                    disabled={isReporting}
                  />
                  <span className="text-gray-700">{reason}</span>
                </label>
              ))} */}
            </div>

            <div className="flex gap-3">
              <button
                // onClick={() => setShowReportModal(false)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                disabled={isReporting}
              >
                Cancel
              </button>
              <button
                // onClick={handleSubmitReport}
                // disabled={!reportReason || isReporting}
                className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {/* {isReporting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Reporting...
                  </>
                ) : (
                  "Submit Report"
                )} */}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE MODAL --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 relative">
            <button
              // onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isDeleting}
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Delete Post</h2>
                <p className="text-sm text-gray-500">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-base mb-6">
              Are you sure you want to delete this post? This will permanently
              remove it from the community.
            </p>

            <div className="flex gap-3">
              <button
                // onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                // onClick={handleConfirmDelete}
                // disabled={isDeleting}
                className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Post"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
          )}
        </div>
      </div>
    </div>
  );
};
