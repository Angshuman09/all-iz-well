import React, { useState } from 'react';
import { Plus, X, NotebookPen, Trash2, Calendar, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetJournal } from '../apis/Student';
import { useCreateJournal } from '../apis/Student';
import { useDeleteJournal } from '../apis/Student';
import toast from 'react-hot-toast';

export const JournalPage = () => {
  const [entries, setEntries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: ''
  });

  const { getJournal } = useGetJournal();
  const { createJournal } = useCreateJournal();
  const { deleteJournal } = useDeleteJournal();

  console.log(entries);

  const handleAddEntry = async () => {
    console.log("newEntry", newEntry);
    if (newEntry.title.trim() && newEntry.content.trim()) {
      const entry = {
        id: Date.now(),
        title: newEntry.title,
        content: newEntry.content,
        date: selectedDate.toISOString()
      };
      try {
        await createJournal({
          title: newEntry.title,
          content: newEntry.content
        });
        toast.success("Journal created successfully");
      } catch (error) {
        console.log("error is happening");
        toast.error("Failed to create journal");
      }
      setEntries([entry, ...entries]);
      setNewEntry({ title: '', content: '' });
      setShowAddModal(false);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await deleteJournal(id);
      toast.success("Journal deleted successfully");
    } catch (error) {
      console.log("error is happening");
      toast.error("Failed to delete journal");
    }
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleViewEntry = (entry) => {
    setSelectedEntry(entry);
    setShowViewModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  const getDateLabel = (date) => {
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return formatDateShort(date.toISOString());
  };

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const setToday = () => {
    setSelectedDate(new Date());
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const hasEntryOnDate = (date) => {
    return entries.some(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.toDateString() === date.toDateString();
    });
  };

  const selectDate = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    setShowCalendar(false);
  };

  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const getEntriesForDate = () => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.toDateString() === selectedDate.toDateString();
    });
  };

  const dateEntries = getEntriesForDate();
  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFFCEB] via-[#D6F6FF] via-[#EDEBFF] to-[#FFE9F6] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Journal</h1>
          <p className="text-gray-600 text-sm md:text-base">Reflect on your thoughts and track your growth</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-4 md:p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => navigateDate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-2 flex-1 justify-center">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <Calendar className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                  {getDateLabel(selectedDate)}
                </h2>
              </button>
            </div>

            <button
              onClick={() => navigateDate(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isToday(selectedDate)}
            >
              <ChevronRight className={`w-5 h-5 ${isToday(selectedDate) ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>

          {!isToday(selectedDate) && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={setToday}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Jump to Today
              </button>
            </div>
          )}

          {showCalendar && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h3 className="text-lg font-semibold text-gray-900">
                  {monthNames[month]} {year}
                </h3>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}

                {[...Array(startingDayOfWeek)].map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {[...Array(daysInMonth)].map((_, index) => {
                  const day = index + 1;
                  const date = new Date(year, month, day);
                  const isSelected = date.toDateString() === selectedDate.toDateString();
                  const isTodayDate = date.toDateString() === new Date().toDateString();
                  const isFuture = date > new Date();
                  const hasEntry = hasEntryOnDate(date);

                  return (
                    <button
                      key={day}
                      onClick={() => selectDate(day)}
                      disabled={isFuture}
                      className={`aspect-square rounded-lg text-sm font-medium transition-all relative
                        ${isFuture
                          ? 'text-gray-300 cursor-not-allowed'
                          : isSelected
                            ? 'bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] text-gray-900 shadow-md'
                            : isTodayDate
                              ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                              : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                      {day}
                      {hasEntry && !isFuture && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {dateEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 md:py-16">
            <div className="bg-gradient-to-br from-[#EDEBFF] to-[#D6F6FF] rounded-full p-6 mb-6">
              <NotebookPen className="w-12 h-12 text-gray-700" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              No entries for {getDateLabel(selectedDate).toLowerCase()}
            </h3>
            <p className="text-gray-600 mb-6">Start writing to capture your thoughts</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {dateEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-4 md:p-6 transition-all hover:shadow-lg border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1 line-clamp-1">{entry.title}</h3>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center text-xs text-gray-500 gap-1 mb-3">
                  <Calendar className="w-3 h-3" />
                  {formatDate(entry.date)}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
                  {entry.content}
                </p>

                <button
                  onClick={() => handleViewEntry(entry)}
                  className="w-full bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] text-gray-900 font-medium py-2 px-4 rounded-xl hover:shadow-md transition-all"
                >
                  View Entry
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[#D6F6FF] to-[#DFFCEB] text-gray-900 font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Entry
        </button>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex items-center justify-between rounded-t-3xl">
                <h2 className="text-2xl font-bold text-gray-900">New Journal Entry</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 md:p-6 space-y-6">
                <div className="bg-gradient-to-r from-[#EDEBFF] to-[#D6F6FF] rounded-xl p-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-700" />
                  <span className="font-medium text-gray-900">{getDateLabel(selectedDate)}</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    placeholder="Give your entry a title..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your thoughts</label>
                  <textarea
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    placeholder="Write your thoughts here..."
                    rows={10}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all resize-none"
                  />
                </div>

                <button
                  onClick={handleAddEntry}
                  disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                  className="w-full bg-gradient-to-r from-[#FFE9F6] to-[#EDEBFF] text-gray-900 font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        )}

        {showViewModal && selectedEntry && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex items-center justify-between rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEntry.title}</h2>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 md:p-8 space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{formatDate(selectedEntry.date)}</span>
                </div>

                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedEntry.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};