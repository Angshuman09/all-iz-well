import React, { useState } from 'react';
import { Brain, Heart, Phone, Download, ArrowLeft, Plus, X, Youtube, Music, Sparkles } from 'lucide-react';
import { useGetResources, useAddQuote, useDeleteQuote, useAddLink, useDeleteLink } from '../apis/Student';
import toast from 'react-hot-toast';
export const Resources = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAddQuote, setShowAddQuote] = useState(false);
    const [newQuote, setNewQuote] = useState('');
    const [userQuotes, setUserQuotes] = useState([]);
    const [showAddLink, setShowAddLink] = useState(false);
    const [newLinkUrl, setNewLinkUrl] = useState('');
    const [newLinkTitle, setNewLinkTitle] = useState('');
    const [userLinks, setUserLinks] = useState([]);

    console.log(userQuotes)
    console.log(userLinks)

    const categories = [
        {
            id: 1,
            icon: Brain,
            title: 'Anxiety & Stress',
            description: 'Techniques to manage worry and find calm',
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50',
            articles: [
                {
                    id: 1,
                    title: 'Understanding Anxiety',
                    quote: '"You are not your anxiety. You are the person learning to manage it."',
                    content: `Anxiety is a natural response to stress, but when it becomes overwhelming, it's important to recognize and address it.

                Common signs include racing thoughts, restlessness, difficulty concentrating, and physical symptoms like rapid heartbeat or sweating.

                Remember: Seeking help is a sign of strength, not weakness. Start with small steps—deep breathing, regular exercise, and talking to someone you trust can make a real difference.`
                },
                {
                    id: 2,
                    title: '5 Quick Calming Techniques',
                    quote: '"Peace begins with a pause."',
                    content: `1. Box Breathing: Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat.

                2. Grounding Exercise: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.

                3. Progressive Muscle Relaxation: Tense and release each muscle group from toes to head.

                4. Cold Water Splash: Splash cold water on your face to activate your body's calming response.

                5. Mindful Walking: Take a short walk, focusing on each step and your surroundings.`
                },
                {
                    id: 3,
                    title: 'Managing Academic Stress',
                    quote: '"Your mental health is more important than any grade."',
                    content: `Academic pressure is real, but you can manage it effectively:

                • Break large tasks into smaller, manageable steps
                • Use a planner to organize deadlines and study time
                • Practice saying "no" to maintain balance
                • Schedule regular breaks—your brain needs rest
                • Connect with classmates for study groups and support
                • Remember that perfection isn't the goal; progress is

                If stress becomes overwhelming, reach out to campus counseling services. They're there to help you succeed.`
                }
            ]
        },
        {
            id: 2,
            icon: Heart,
            title: 'Mental Wellness',
            description: 'Support for mood and emotional health',
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50',
            articles: [
                {
                    id: 4,
                    title: 'Building Daily Self-Care',
                    quote: '"Self-care isn\'t selfish. It\'s essential."',
                    content: `Creating a self-care routine doesn't have to be complicated:

                Morning: Start with 5 minutes of stretching or meditation. Eat a nutritious breakfast. Set one positive intention for the day.

                Throughout the day: Take short breaks every hour. Stay hydrated. Connect with a friend, even briefly.

                Evening: Limit screen time before bed. Journal about one good thing from your day. Establish a calming bedtime routine.

                Remember: Self-care looks different for everyone. Find what makes you feel recharged and make it a priority.`
                },
                {
                    id: 5,
                    title: 'Recognizing Depression',
                    quote: '"It\'s okay to not be okay. It\'s not okay to stay silent."',
                    content: `Depression is more than feeling sad. Watch for these signs:

                • Persistent sadness or emptiness
                • Loss of interest in activities you once enjoyed
                • Changes in sleep or appetite
                • Difficulty concentrating
                • Feelings of hopelessness or worthlessness
                • Physical aches without clear cause

                If you notice these symptoms lasting more than two weeks, please reach out for help. Depression is treatable, and you don't have to face it alone.

                Talk to a counselor, trusted friend, or family member. Recovery is possible.`
                },
                {
                    id: 6,
                    title: 'The Power of Connection',
                    quote: '"We heal in community, not in isolation."',
                    content: `Human connection is vital for mental wellness:

                • Schedule regular catch-ups with friends, even if it's just a quick coffee
                • Join a club or group that interests you
                • Volunteer—helping others boosts your own wellbeing
                • Be present in conversations—put away your phone
                • Share your feelings with people you trust
                • Remember: quality matters more than quantity in relationships

                If you're feeling isolated, campus organizations and support groups are great places to start building connections.`
                }
            ]
        }
    ];

    const { resources, isLoading, isError, isSuccess, refetch } = useGetResources();
    const { addQuote } = useAddQuote();
    const { deleteQuote } = useDeleteQuote();
    const { addLink } = useAddLink();
    const { deleteLink } = useDeleteLink();

    React.useEffect(() => {
        if (resources?.resources) {
            if (resources.resources.quotes) setUserQuotes(resources.resources.quotes);
            if (resources.resources.links) setUserLinks(resources.resources.links);
        }
    }, [resources]);

    const downloadArticle = (article, categoryTitle) => {
        const content = `${article.title}\n${categoryTitle}\n\n${article.quote}\n\n${article.content}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${article.title.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleAddQuote = async () => {
        if (newQuote.trim()) {
            try {
                await addQuote(newQuote.trim());
                toast.success("Quote added successfully");
                setNewQuote('');
                setShowAddQuote(false);
                refetch();
            } catch (error) {
                console.log(error);
                toast.error("Failed to add quote");
            }
        }
    };

    const handleDeleteQuote = async (idx) => {
        try {
            await deleteQuote(idx);
            toast.success("Quote deleted successfully");
            refetch();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete quote");
        }
    };

    const handleAddLink = async () => {
        if (newLinkUrl.trim() && newLinkTitle.trim()) {
            const linkData = `${newLinkTitle.trim()}|||${newLinkUrl.trim()}`;

            try {
                await addLink(linkData);
                toast.success("Link added successfully");
                setNewLinkUrl('');
                setNewLinkTitle('');
                setShowAddLink(false);
                refetch();
            } catch (error) {
                console.log(error);
                toast.error("Failed to add link");
            }
        }
    };

    const handleDeleteLink = async (idx) => {
        try {
            await deleteLink(idx);
            toast.success("Link deleted successfully");
            refetch();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete link");
        }
    };

    if (selectedCategory) {
        const category = categories.find(c => c.id === selectedCategory);
        const IconComponent = category.icon;

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
                {/* Animated background blobs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-12">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-all hover:gap-3"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to resources</span>
                    </button>

                    <div className="flex items-center gap-5 mb-12">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                            <IconComponent className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-1">{category.title}</h1>
                            <p className="text-lg text-gray-600">{category.description}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {category.articles.map((article) => (
                            <div key={article.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex items-start justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 flex-1">{article.title}</h2>
                                    <button
                                        onClick={() => downloadArticle(article, category.title)}
                                        className="p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all group-hover:scale-110"
                                        title="Download article"
                                    >
                                        <Download className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className={`mb-6 p-5 bg-gradient-to-r ${category.bgGradient} border-l-4 border-${category.gradient.split(' ')[1].replace('to-', '')} rounded-xl shadow-sm`}>
                                    <p className="text-lg text-gray-800 italic leading-relaxed font-medium">{article.quote}</p>
                                </div>

                                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                                    {article.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-600">Your Wellbeing Hub</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Mental Health Resources
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Support, guidance, and tools for your mental wellness journey
                    </p>
                </div>

                {/* Motivational Quotes Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                <span>✨</span> Your Motivational Quotes
                            </h2>
                            <p className="text-gray-600 mt-1">Words that inspire and uplift you</p>
                        </div>
                        <button
                            onClick={() => setShowAddQuote(!showAddQuote)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 font-semibold"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Quote</span>
                        </button>
                    </div>

                    {showAddQuote && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 mb-6 shadow-lg animate-fadeIn">
                            <textarea
                                value={newQuote}
                                onChange={(e) => setNewQuote(e.target.value)}
                                placeholder="Enter your motivational quote..."
                                className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 resize-none transition-all"
                                rows="4"
                            />
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={handleAddQuote}
                                    disabled={!newQuote.trim()}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Save Quote
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAddQuote(false);
                                        setNewQuote('');
                                    }}
                                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {userQuotes.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {userQuotes.map((quote, index) => (
                                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 flex items-start justify-between hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                                    <div className="flex-1">
                                        <div className="text-4xl text-purple-400 mb-2">"</div>
                                        <p className="text-lg text-gray-700 italic leading-relaxed">{quote}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteQuote(index)}
                                        className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
                            <div className="text-6xl mb-4">💭</div>
                            <p className="text-lg text-gray-500">No quotes added yet. Add your first motivational quote!</p>
                        </div>
                    )}
                </div>

                {/* Media Links Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                <span>🎵</span> Media & Playlists
                            </h2>
                            <p className="text-gray-600 mt-1">Your calming videos and music</p>
                        </div>
                        <button
                            onClick={() => setShowAddLink(!showAddLink)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 font-semibold"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Link</span>
                        </button>
                    </div>

                    {showAddLink && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 mb-6 shadow-lg animate-fadeIn">
                            <input
                                type="text"
                                value={newLinkTitle}
                                onChange={(e) => setNewLinkTitle(e.target.value)}
                                placeholder="Link title (e.g., Meditation Music, Calming Video)"
                                className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 mb-3 transition-all"
                            />
                            <input
                                type="url"
                                value={newLinkUrl}
                                onChange={(e) => setNewLinkUrl(e.target.value)}
                                placeholder="YouTube or Spotify URL"
                                className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                            />
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={handleAddLink}
                                    disabled={!newLinkTitle.trim() || !newLinkUrl.trim()}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Save Link
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAddLink(false);
                                        setNewLinkUrl('');
                                        setNewLinkTitle('');
                                    }}
                                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {userLinks.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {userLinks.map((link, index) => {
                                const [title, url] = link.split('|||');
                                const linkType = url?.includes('youtube.com') || url?.includes('youtu.be') ? 'youtube' :
                                    url?.includes('spotify.com') ? 'spotify' : 'other';

                                return (
                                    <a
                                        key={index}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 flex items-start justify-between hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        <div className="flex items-start gap-4 flex-1">
                                            <div
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${linkType === "youtube"
                                                    ? "bg-gradient-to-br from-red-500 to-red-600"
                                                    : linkType === "spotify"
                                                        ? "bg-gradient-to-br from-green-500 to-green-600"
                                                        : "bg-gradient-to-br from-gray-500 to-gray-600"
                                                    }`}
                                            >
                                                {linkType === "youtube" ? (
                                                    <Youtube className="w-6 h-6 text-white" />
                                                ) : (
                                                    <Music className="w-6 h-6 text-white" />
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-lg text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">
                                                    {title}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {linkType === "youtube" ? "YouTube Video" : linkType === "spotify" ? "Spotify Playlist" : "Media Link"}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDeleteLink(index);
                                            }}
                                            className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </a>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
                            <div className="text-6xl mb-4">🎬</div>
                            <p className="text-lg text-gray-500">No links added yet. Add your first YouTube or Spotify link!</p>
                        </div>
                    )}
                </div>

                {/* Resource Categories */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Resource Categories</h2>
                        <p className="text-gray-600">Explore articles and guides for your wellbeing</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {categories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 text-left hover:scale-[1.02]"
                                >
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                                    <span className="inline-flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                                        View {category.articles.length} articles
                                        <span className="ml-1 group-hover:ml-2 transition-all">→</span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Crisis Support */}
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl border-2 border-red-200 p-10 shadow-xl">
                    <div className="flex items-start gap-5 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Phone className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">24/7 Crisis Support</h2>
                            <p className="text-lg text-gray-600">Help is always available when you need it</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {[
                            { name: "National Mental Health Helpline", org: "NIMHANS, Bangalore", number: "080-46110007" },
                            { name: "Vandrevala Foundation", org: "24/7 mental health support", number: "1860-2662-345" },
                            { name: "AASRA", org: "24/7 crisis helpline", number: "9820466726" },
                            { name: "iCall - TISS", org: "Mon-Sat, 8 AM - 10 PM", number: "9152987821" },
                            { name: "Sumaitri", org: "Delhi-NCR crisis support", number: "011-23389090", colSpan: true }
                        ].map((helpline, idx) => (
                            <div
                                key={idx}
                                className={`bg-white rounded-2xl p-6 hover:shadow-lg transition-all ${helpline.colSpan ? 'lg:col-span-2' : ''}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="font-bold text-lg text-gray-900">{helpline.name}</p>
                                        <p className="text-sm text-gray-600 mt-1">{helpline.org}</p>
                                    </div>
                                    <a
                                        href={`tel:${helpline.number}`}
                                        className="text-xl font-bold text-red-600 hover:text-red-700 transition-colors ml-4"
                                    >
                                        {helpline.number}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-5 bg-white rounded-2xl border-2 border-red-200">
                        <p className="text-gray-700 leading-relaxed">
                            <span className="font-bold text-red-600">🚨 Emergency:</span> If you're in immediate danger, call <span className="font-bold">112</span> or visit your nearest hospital
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};