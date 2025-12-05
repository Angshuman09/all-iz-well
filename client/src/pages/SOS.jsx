import React, { useState } from 'react';
import { Phone, AlertTriangle, Shield, Heart, PhoneCall } from 'lucide-react';

export const SOS = () => {
    const [pulseAnimation, setPulseAnimation] = useState(true);

    const helplines = [
        {
            id: 1,
            icon: Phone,
            title: "National Mental Health Helpline",
            description: "24/7 mental health support and counseling",
            phone: "08046110007",
            displayPhone: "080-46110007",
            color: "text-blue-600"
        },
        {
            id: 2,
            icon: Heart,
            title: "AASRA",
            description: "Suicide prevention and emotional support",
            phone: "9820466726",
            displayPhone: "9820466726",
            color: "text-pink-600"
        },
        {
            id: 3,
            icon: Phone,
            title: "Vandrevala Foundation",
            description: "Mental health support and crisis intervention",
            phone: "18602662345",
            displayPhone: "1860-2662-345",
            color: "text-purple-600"
        },
        {
            id: 4,
            icon: Heart,
            title: "iCall (TISS)",
            description: "Counseling service by trained professionals",
            phone: "9152987821",
            displayPhone: "9152987821",
            color: "text-teal-600"
        },
        {
            id: 5,
            icon: Phone,
            title: "Sumaitri",
            description: "Crisis intervention center",
            phone: "01123389090",
            displayPhone: "011-23389090",
            color: "text-indigo-600"
        }
    ];

    const safetyTips = [
        "Reach out to someone you trust - a friend, family member, or counselor",
        "Move to a safe, calm environment away from stressors",
        "Practice deep breathing: inhale for 4 counts, hold for 4, exhale for 4",
        "If in immediate danger, call 112 or go to the nearest emergency room",
        "Remember: This feeling is temporary, and help is available"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#DFFCEB] via-[#D6F6FF] via-[#EDEBFF] to-[#FFE9F6] p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className={`${pulseAnimation ? 'animate-pulse' : ''}`}>
                            <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-red-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
                        SOS & Emergency Support
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                        Immediate help when you need it most. You are not alone.
                    </p>
                </div>

                {/* Emergency Call Button */}
                <div className="flex justify-center mb-10 md:mb-14">
                    <a
                        href="tel:112"
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                        <button className="relative bg-red-600 hover:bg-red-700 text-white rounded-full p-8 md:p-10 shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center min-w-[200px] md:min-w-[240px]">
                            <PhoneCall className="w-12 h-12 md:w-16 md:h-16 mb-3 animate-pulse" />
                            <span className="text-2xl md:text-3xl font-bold">Call 112</span>
                            <span className="text-sm md:text-base mt-1 opacity-90">Emergency Services</span>
                        </button>
                    </a>
                </div>

                {/* Quick Access Helpline Cards */}
                <div className="mb-10 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                        Mental Health Helplines
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {helplines.map((helpline) => {
                            const IconComponent = helpline.icon;
                            return (
                                <div
                                    key={helpline.id}
                                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="flex items-start mb-4">
                                        <div className={`${helpline.color} mr-3`}>
                                            <IconComponent className="w-7 h-7" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                                                {helpline.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-3">
                                                {helpline.description}
                                            </p>
                                            <p className="text-xl font-semibold text-gray-800 mb-4">
                                                {helpline.displayPhone}
                                            </p>
                                        </div>
                                    </div>
                                    <a
                                        href={`tel:${helpline.phone}`}
                                        className="block w-full"
                                    >
                                        <button className="w-full bg-gradient-to-r from-[#FFE9F6] to-[#EDEBFF] hover:from-[#ffd4ec] hover:to-[#ddd6ff] text-gray-800 font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                                            Call Now
                                        </button>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Safety Tips Section */}
                <div className="mb-10 md:mb-12">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6 md:p-8">
                        <div className="flex items-center mb-4">
                            <Shield className="w-8 h-8 text-blue-600 mr-3" />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                Safety Tips
                            </h2>
                        </div>
                        <ul className="space-y-3">
                            {safetyTips.map((tip, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="bg-gradient-to-r from-[#D6F6FF] to-[#DFFCEB] rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                        <span className="text-sm font-bold text-gray-700">{index + 1}</span>
                                    </div>
                                    <p className="text-gray-700 text-base">{tip}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>



                {/* Footer */}
                <div className="text-center py-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        You Are Not Alone
                    </h3>
                    <div className="inline-block">
                        <div className="h-1 bg-gradient-to-r from-[#FFE9F6] via-[#EDEBFF] via-[#D6F6FF] to-[#DFFCEB] rounded-full"></div>
                    </div>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Help is always available. Reach out, speak up, and take care of yourself.
                    </p>
                </div>
            </div>
        </div>
    );
};
