import React from "react";
import {
  Calendar,
  AlertTriangle,
  FileText,
  MessageSquare,
  User,
  Mail,
  Phone,
  Briefcase,
  Bell,
  CheckCircle,

} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetCounsellor } from "../apis/Counsellor";
import { useGetUsers } from "../apis/MyUserAuth";

const CounsellorDashboard = () => {
  const navigate = useNavigate();

  const { getCounsellor, isLoading } = useGetCounsellor();
  const counsellor = getCounsellor?.data || "";

  const { users } = useGetUsers();
  // console.log(users);

  const notifications = [
    {
      id: 1,
      icon: <AlertTriangle className="text-red-600" size={20} />,
      title: "Critical Student Flagged",
      time: "2h ago",
    },

  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFFCEB] via-[#D6F6FF] via-[#EDEBFF] to-[#FFE9F6] p-5 md:p-10 flex justify-center">
      <div className="w-full max-w-5xl space-y-8">

        {/* ---------- PAGE HEADER ---------- */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Counsellor Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Overview & quick actions</p>
        </div>

        {/* ---------- MINI PROFILE CARD ---------- */}
        <div className="bg-white/90 rounded-2xl shadow-md p-5 md:p-6 flex items-center gap-4 md:gap-6 w-full">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#FFE9F6] to-[#EDEBFF] flex items-center justify-center">
            <User className="w-8 h-8 md:w-9 md:h-9 text-gray-700" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">
              {counsellor[0]?.fullName}
            </h2>

            <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
              <Mail size={16} /> <span>{users?.userData?.email}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Phone size={16} /> <span>{counsellor[0]?.phoneNumber}</span>
            </div>


          </div>
        </div>

        {/* ---------- MINI NOTIFICATIONS CARD ---------- */}
        <div className="bg-white/90 rounded-2xl shadow-md p-5 md:p-6 w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Notifications
          </h2>

          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/60 hover:bg-white transition-all"
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- MAIN DASHBOARD BUTTON GRID ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          <button onClick={() => navigate("/upcoming-sessions")} className="group bg-white/90 rounded-3xl shadow-lg p-10 hover:shadow-2xl hover:scale-105 active:bg-[#FFE9F6] active:scale-95 transition-all duration-300">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-[#D6F6FF] to-[#DFFCEB] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-14 h-14 md:w-16 md:h-16 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Upcoming Sessions
              </h2>
            </div>
          </button>

          <button onClick={() => navigate("/critical-students")} className="group bg-white/90 rounded-3xl shadow-lg p-10 hover:shadow-2xl hover:scale-105 active:bg-[#FFE9F6] active:scale-95 transition-all duration-300">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-[#FFE9F6] to-[#EDEBFF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-14 h-14 md:w-16 md:h-16 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Critical Students
              </h2>
            </div>
          </button>

          <button onClick={() => navigate("/previous-sessions")} className="group bg-white/90 rounded-3xl shadow-lg p-10 hover:shadow-2xl hover:scale-105 active:bg-[#FFE9F6] active:scale-95 transition-all duration-300">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-[#EDEBFF] to-[#D6F6FF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-14 h-14 md:w-16 md:h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Previous Sessions
              </h2>
            </div>
          </button>

          <button onClick={() => navigate("/feedback")} className="group bg-white/90 rounded-3xl shadow-lg p-10 hover:shadow-2xl hover:scale-105 active:bg-[#FFE9F6] active:scale-95 transition-all duration-300">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-[#DFFCEB] to-[#D6F6FF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-14 h-14 md:w-16 md:h-16 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Feedback</h2>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
};

export default CounsellorDashboard;
