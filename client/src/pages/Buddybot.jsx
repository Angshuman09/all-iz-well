import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Heart, BookOpen, ClipboardList, Smile, Menu, X } from 'lucide-react';

export function Buddybot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi there! 👋 I'm your Mental Health Buddy. I'm here to support you through whatever you're feeling. How are you doing today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // API key is read from environment variable (VITE_GEMINI_API_KEY) at build time.
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  console.log("api key:", apiKey);
  // No need for API key input UI; the key is provided via .env
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestions = [
    { icon: BookOpen, text: 'Start Journaling', color: 'bg-purple-500', action: 'journal' },
    { icon: ClipboardList, text: 'Take Assessment', color: 'bg-blue-500', action: 'assessment' },
    { icon: Smile, text: 'Track Your Mood', color: 'bg-green-500', action: 'mood' },
    { icon: Heart, text: 'Self-Care Tips', color: 'bg-pink-500', action: 'selfcare' }
  ];

  const handleSuggestionClick = (action) => {
    let message = '';
    switch (action) {
      case 'journal':
        message = "I'd like to start journaling";
        break;
      case 'assessment':
        message = "I want to take a mental health assessment";
        break;
      case 'mood':
        message = "Help me track my mood";
        break;
      case 'selfcare':
        message = "Give me some self-care tips";
        break;
      default:
        message = "Hi";
    }
    setInput(message);
  };

  const getSystemPrompt = () => {
    return `You are a compassionate mental health buddy bot for students. Your role is to:

1. Be empathetic, warm, and supportive in all interactions
2. When students share their feelings or problems, ALWAYS suggest one or more of these tools:
   - 📝 Journaling: Help them express their thoughts and feelings
   - 📋 Assessment Test: Evaluate their mental health status
   - 😊 Mood Tracker: Monitor emotional patterns over time
3. Provide encouragement and validate their feelings
4. Offer practical coping strategies and self-care tips
5. Never provide medical advice or diagnoses
6. If someone is in crisis, encourage them to seek professional help or contact crisis services
7. Keep responses concise (2-3 paragraphs max) and easy to read
8. Use a friendly, conversational tone with occasional emojis
9. Always end with an encouraging note or helpful suggestion

Remember: You're a supportive friend, not a therapist. Guide students to helpful resources while providing emotional support.`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Ensure the API key is available; if not, warn the developer.
    if (!apiKey) {
      console.error('Gemini API key is missing. Set VITE_GEMINI_API_KEY in .env');
      return;
    }

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      conversationHistory.push({
        role: 'user',
        parts: [{ text: input }]
      });

      let response;
      let attempt = 0;
      const maxRetries = 5;

      // apiKey is already set from env; no need to overwrite

      while (attempt <= maxRetries) {
        try {
          response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: conversationHistory,
              systemInstruction: {
                parts: [{ text: getSystemPrompt() }]
              },
              generationConfig: {
                temperature: 0.9,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 500,
              }
            })
          });

          // Check for 503 (Overloaded) or other server errors and retry
          if (response.status === 503 || response.status === 429 || response.status >= 500) {
            if (attempt < maxRetries) {
              const delay = 1000 * Math.pow(2, attempt); // 1s, 2s, 4s, 8s, 16s
              await new Promise(resolve => setTimeout(resolve, delay));
              attempt++;
              continue;
            }
          }

          // If it's a client error (4xx) or success (200), break the loop
          break;
        } catch (err) {
          // Retry on network errors as well
          if (attempt < maxRetries) {
            const delay = 1000 * Math.pow(2, attempt);
            await new Promise(resolve => setTimeout(resolve, delay));
            attempt++;
            continue;
          }
          throw err;
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error Details:", errorText);
        throw new Error(`Failed to get response from Gemini: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) {
        throw new Error('No content received from model');
      }

      const assistantMessage = {
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please check your API key and try again. If the issue persists, the service might be temporarily overloaded.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen bg-linear-to-br from-purple-100 via-pink-100 to-blue-100 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-20 w-64 bg-white shadow-xl transition-transform duration-300 h-full flex flex-col`}>
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-purple-500" />
              <h2 className="font-bold text-gray-800">Wellness Tools</h2>
            </div>
            <button onClick={() => setShowSidebar(false)} className="md:hidden">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-3">
            {suggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  handleSuggestionClick(item.action);
                  setShowSidebar(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
              >
                <div className={`${item.color} p-2 rounded-lg`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{item.text}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">Crisis Support</h3>
            <p className="text-xs text-gray-600 mb-2">If you're in crisis, please reach out:</p>
            <p className="text-xs text-gray-700 font-medium">988 - Suicide & Crisis Lifeline</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Overlay for mobile sidebar */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        {/* Header */}
        <div className="bg-white shadow-md p-4 flex items-center gap-3 z-0">
          <button onClick={() => setShowSidebar(true)} className="md:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">Mental Health Buddy</h1>
            <p className="text-xs text-gray-500">Here to support you 💜</p>
          </div>
          <Sparkles className="w-6 h-6 text-purple-500" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl ${message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white shadow-md text-gray-800'
                  }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-purple-100' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white shadow-md p-4 rounded-2xl">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none transition-colors"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}