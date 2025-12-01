import React, { useState } from 'react';
import { Building2, CheckCircle, XCircle, Clock, LogOut, LayoutDashboard, Users, Settings, Menu, X } from 'lucide-react';
import { useLogoutMyUser } from '../apis/MyUserAuth';
import { useGetActiveColleges, useGetRejectedColleges, useGetInactiveColleges } from '../apis/Colleges';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CollegeCard } from '../components/CollegeCard';
import { StatCard } from '../components/StatCard';

export default function SuperAdminDashboard() {
  const {logoutMyUser, isPending} = useLogoutMyUser();
  const {activeColleges, isLoading} = useGetActiveColleges();
  const {inactiveColleges} = useGetInactiveColleges();
  const {rejectedColleges} = useGetRejectedColleges();

  const activeCount = activeColleges?.count || activeColleges?.data?.length || 0;
  const inactiveCount = inactiveColleges?.count || inactiveColleges?.data?.length || 0;
  const rejectedCount = rejectedColleges?.count || rejectedColleges?.data?.length || 0;

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const onLogoutHandler = async ()=>{
    try {
      await logoutMyUser();
      navigate('/');
    } catch (error) {
      toast.error("error in logout");
    }
  }

  return (
    <div className="flex h-screen bg-linear-to-r from-[#CBDAC8] to-[#D4E7ED]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-[#6C8F5E] text-white transition-all duration-300 overflow-hidden`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Building2 className="w-8 h-8" />
            <h1 className="text-xl font-bold">Admin Portal</h1>
          </div>
          
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-green-900 rounded-lg transition-colors">
              <Users className="w-5 h-5" />
              <span>Colleges</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-green-900 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h2 className="text-2xl font-bold text-gray-900">College Management</h2>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={onLogoutHandler}>
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={CheckCircle}
              label="Active Colleges"
              value={activeCount}
              color="bg-green-600"
            />
            <StatCard
              icon={Clock}
              label="Pending Approvals"
              value={inactiveCount}
              color="bg-yellow-600"
            />
            <StatCard
              icon={XCircle}
              label="Rejected"
              value={rejectedCount}
              color="bg-red-600"
            />
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex gap-8">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`pb-4 px-1 font-medium transition-colors ${
                    activeTab === 'active'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Active Colleges ({activeCount})
                </button>
                <button
                  onClick={() => setActiveTab('inactive')}
                  className={`pb-4 px-1 font-medium transition-colors ${
                    activeTab === 'inactive'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Inactive Colleges ({inactiveCount})
                </button>
              </nav>
            </div>
          </div>

          {/* College Grid */}
         {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-600">Loading colleges...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === 'active' && (
                <CollegeCard colleges={activeColleges}/>
              )}
              {activeTab === 'inactive' && (
                <CollegeCard colleges={inactiveColleges}/>
              )}
              {activeTab === 'rejected' && (
                <CollegeCard colleges={rejectedColleges}/>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}