'use client';

import { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import Link from 'next/link';
import { useAuth, TripItem } from '@/src/lib/auth-context';

const ACTIVITY_TEMPLATES = [
    { id: 'beach', emoji: '🏖️', title: 'Beach Day', type: 'activity' as const },
    { id: 'restaurant', emoji: '🍽️', title: 'Dinner Reservation', type: 'restaurant' as const },
    { id: 'tour', emoji: '🚤', title: 'Boat Tour', type: 'activity' as const },
    { id: 'golf', emoji: '⛳', title: 'Golf Round', type: 'activity' as const },
    { id: 'spa', emoji: '💆', title: 'Spa Treatment', type: 'activity' as const },
    { id: 'shopping', emoji: '🛍️', title: 'Shopping Trip', type: 'activity' as const },
    { id: 'museum', emoji: '🎨', title: 'Museum Visit', type: 'activity' as const },
    { id: 'nature', emoji: '🌿', title: 'Nature Walk', type: 'activity' as const },
    { id: 'sunset', emoji: '🌅', title: 'Sunset Viewing', type: 'activity' as const },
    { id: 'hotel', emoji: '🏨', title: 'Check-in/Check-out', type: 'hotel' as const },
];

const TIME_SLOTS = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
    '7:00 PM', '8:00 PM', '9:00 PM'
];

export function TripBuilder() {
    const { user, isAuthenticated, saveTrip, updateTrip } = useAuth();
    const [tripName, setTripName] = useState('My Naples Trip');
    const [days, setDays] = useState(3);
    const [items, setItems] = useState<TripItem[]>([]);
    const [selectedDay, setSelectedDay] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingItem, setEditingItem] = useState<TripItem | null>(null);
    const [isSaved, setIsSaved] = useState(false);

    // New item form state
    const [newItem, setNewItem] = useState({
        title: '',
        time: '9:00 AM',
        location: '',
        notes: '',
        type: 'activity' as TripItem['type'],
    });

    const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

    const handleAddItem = () => {
        const item: TripItem = {
            id: generateId(),
            day: selectedDay,
            time: newItem.time,
            type: newItem.type,
            title: newItem.title,
            location: newItem.location,
            notes: newItem.notes,
        };
        setItems([...items, item]);
        setShowAddModal(false);
        setNewItem({ title: '', time: '9:00 AM', location: '', notes: '', type: 'activity' });
        setIsSaved(false);
    };

    const handleQuickAdd = (template: typeof ACTIVITY_TEMPLATES[0]) => {
        const item: TripItem = {
            id: generateId(),
            day: selectedDay,
            time: '9:00 AM',
            type: template.type,
            title: template.title,
        };
        setItems([...items, item]);
        setIsSaved(false);
    };

    const handleDeleteItem = (itemId: string) => {
        setItems(items.filter(item => item.id !== itemId));
        setIsSaved(false);
    };

    const handleSaveTrip = () => {
        if (isAuthenticated) {
            saveTrip({
                name: tripName,
                items,
            });
            setIsSaved(true);
        }
    };

    const getDayItems = (day: number) => {
        return items
            .filter(item => item.day === day)
            .sort((a, b) => {
                if (!a.time || !b.time) return 0;
                return TIME_SLOTS.indexOf(a.time) - TIME_SLOTS.indexOf(b.time);
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={tripName}
                                onChange={(e) => { setTripName(e.target.value); setIsSaved(false); }}
                                className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-ocean-500 focus:outline-none w-full"
                                placeholder="Name your trip..."
                            />
                            <p className="text-gray-600 mt-1">
                                {items.length} activities planned
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div>
                                <label className="text-sm text-gray-600">Days</label>
                                <select
                                    value={days}
                                    onChange={(e) => setDays(Number(e.target.value))}
                                    className="ml-2 px-3 py-2 border border-gray-300 rounded-lg"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 10, 14].map(d => (
                                        <option key={d} value={d}>{d} day{d > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                            {isAuthenticated ? (
                                <button
                                    onClick={handleSaveTrip}
                                    className={`px-6 py-3 font-bold rounded-xl transition-all ${isSaved
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gradient-to-r from-ocean-500 to-teal-500 text-white hover:shadow-lg'
                                        }`}
                                >
                                    {isSaved ? '✓ Saved' : 'Save Trip'}
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-6 py-3 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                                >
                                    Sign in to Save
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Day Selector */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-4">Days</h3>
                            <div className="space-y-2">
                                {Array.from({ length: days }, (_, i) => i + 1).map((day) => (
                                    <button
                                        key={day}
                                        onClick={() => setSelectedDay(day)}
                                        className={`w-full p-3 rounded-xl text-left transition-all ${selectedDay === day
                                                ? 'bg-ocean-500 text-white'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <span className="font-semibold">Day {day}</span>
                                        <span className="block text-sm opacity-75">
                                            {getDayItems(day).length} activities
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Day Content */}
                    <div className="lg:col-span-3">
                        <motion.div
                            key={selectedDay}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Day {selectedDay}</h2>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="px-4 py-2 bg-ocean-500 text-white font-semibold rounded-lg hover:bg-ocean-600 transition-colors"
                                >
                                    + Add Activity
                                </button>
                            </div>

                            {/* Quick Add Templates */}
                            <div className="mb-6">
                                <p className="text-sm text-gray-600 mb-3">Quick add:</p>
                                <div className="flex flex-wrap gap-2">
                                    {ACTIVITY_TEMPLATES.map((template) => (
                                        <button
                                            key={template.id}
                                            onClick={() => handleQuickAdd(template)}
                                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                                        >
                                            <span>{template.emoji}</span>
                                            <span>{template.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Activities List */}
                            {getDayItems(selectedDay).length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-xl">
                                    <span className="text-5xl mb-4 block">📅</span>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities yet</h3>
                                    <p className="text-gray-600">Add your first activity for Day {selectedDay}</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {getDayItems(selectedDay).map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                                        >
                                            <div className="w-16 text-sm font-medium text-ocean-600">
                                                {item.time}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                                {item.location && (
                                                    <p className="text-sm text-gray-600">{item.location}</p>
                                                )}
                                                {item.notes && (
                                                    <p className="text-sm text-gray-500 italic mt-1">{item.notes}</p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleDeleteItem(item.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Add Activity Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Activity</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Activity Name</label>
                                    <input
                                        type="text"
                                        value={newItem.title}
                                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                                        placeholder="e.g., Dinner at The Bay House"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                        <select
                                            value={newItem.time}
                                            onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                                        >
                                            {TIME_SLOTS.map(time => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                        <select
                                            value={newItem.type}
                                            onChange={(e) => setNewItem({ ...newItem, type: e.target.value as TripItem['type'] })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                                        >
                                            <option value="activity">Activity</option>
                                            <option value="restaurant">Restaurant</option>
                                            <option value="hotel">Hotel</option>
                                            <option value="transport">Transport</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location (optional)</label>
                                    <input
                                        type="text"
                                        value={newItem.location}
                                        onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                                        placeholder="e.g., Old Naples"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                                    <textarea
                                        value={newItem.notes}
                                        onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none"
                                        rows={2}
                                        placeholder="Any special notes..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddItem}
                                    disabled={!newItem.title}
                                    className="flex-1 py-3 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                                >
                                    Add Activity
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
