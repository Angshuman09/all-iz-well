import { useState } from 'react';
import { Heart, FileText, BookOpen, MessageCircle, Users, Calendar, AlertCircle, Activity, Brain, Sparkles } from 'lucide-react';
import Vector from '../assets/Vector.png'
import { useNavigate } from 'react-router-dom';
import { useGetStudentData } from '../apis/Student';
import { useLogoutMyUser } from '../apis/MyUserAuth';
import toast from 'react-hot-toast';

export default function StudentDashboard() {
  const [activeCard, setActiveCard] = useState(null);
  const { studentData, isLoading, refetch } = useGetStudentData();
  const { logoutMyUser } = useLogoutMyUser();
  const name = studentData?.name || studentData?.data?.name;
  const college = studentData?.college || studentData?.data?.college;
  const navigate = useNavigate();
  const [active, setactive] = useState(false);
  const features = [
    {
      id: 'test',
      title: 'Take Test',
      description: 'Assess your mental wellness',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 'mood',
      title: 'Mood Tracker',
      description: 'Log your daily emotions',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'journal',
      title: 'Journal',
      description: 'Write your thoughts',
      icon: FileText,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'resources',
      title: 'Resources',
      description: 'Helpful guides & articles',
      icon: BookOpen,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      id: 'buddy',
      title: 'Buddy Bot',
      description: 'Chat with AI companion',
      icon: MessageCircle,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Connect with peers',
      icon: Users,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      id: 'counsellor',
      title: 'Counsellor',
      description: 'Talk to a professional',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      id: 'analytics',
      title: 'Mood analytics',
      description: 'student mood analytics',
      icon: Calendar,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    }
  ];

  const logoutHandler = async ()=>{
    try {
      await logoutMyUser();
      toast.success("logout successful");
      navigate('/');
    } catch (error) {
      toast.error("error in logout");
      console.log("error: ", error);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-green-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full">
                {/* <Sparkles className="w-6 h-6 text-white" /> */}
                <img src={Vector} width={100} height={100} alt="logo" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-slate-800 bg-clip-text text-transparent">
                  All Izz Well
                </h1>
                <p className="text-sm text-gray-500">Student Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                {isLoading ? (<p className="text-sm font-medium text-gray-700">loading...</p>) : (
                  <p className="text-sm font-medium text-gray-700">{name || ''}</p>
                )}
                <p className="text-xs text-gray-500">How are you feeling today?</p>
              </div>
              <div className="relative">
                <img
                  onClick={() => setactive(!active)}
                  src={`https://avatar.iran.liara.run/username?username=${name}`}
                  width={50}
                  height={50}
                  className="rounded-full cursor-pointer border border-gray-300 hover:opacity-80 transition"
                  alt=""
                />

                {active && (
                  <div className="absolute top-14 right-0 bg-red-500 shadow-lg rounded-lg p-3 w-32 text-center border border-gray-200 animate-fade hover:bg-red-600 transition">
                    <button
                      onClick={logoutHandler}
                      className="w-full rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{college}</h2>
          <p className="text-gray-600">Take care of your mental health, one step at a time.</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${activeCard === feature.id ? 'ring-4 ring-purple-400' : ''
                  }`
                }
                onClick={() => navigate(`/${feature.id}`)}
                onMouseEnter={() => setActiveCard(feature.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`${feature.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${feature.textColor}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${feature.color} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            );
          })}
        </div>

        {/* SOS Button - Prominent */}
        <div className="fixed bottom-8 right-8 z-50">
          <button onClick={() => navigate('/sos')} className="group relative bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 animate-pulse hover:animate-none transform hover:scale-105">
            <AlertCircle className="w-6 h-6" />
            <span className="font-bold text-lg">SOS</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-ping"></div>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-linear-to-br from-purple-100 to-purple-50 rounded-xl p-4">
              <p className="text-sm text-purple-600 font-medium mb-1">Mood Entries</p>
              <p className="text-3xl font-bold text-purple-700">24</p>
              <p className="text-xs text-purple-500 mt-1">This month</p>
            </div>
            <div className="bg-linear-to-br from-blue-100 to-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-600 font-medium mb-1">Journal Entries</p>
              <p className="text-3xl font-bold text-blue-700">12</p>
              <p className="text-xs text-blue-500 mt-1">This month</p>
            </div>
            <div className="bg-linear-to-br from-green-100 to-green-50 rounded-xl p-4">
              <p className="text-sm text-green-600 font-medium mb-1">Sessions</p>
              <p className="text-3xl font-bold text-green-700">3</p>
              <p className="text-xs text-green-500 mt-1">Completed</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}