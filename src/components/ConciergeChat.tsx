"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function ConciergeChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
        { role: "assistant", text: "Hello! I'm your Naples concierge. How can I help you plan an unforgettable trip?" },
    ]);
    const [input, setInput] = useState("");

    const quickResponses = [
        "Best restaurants for dinner?",
        "Beach recommendations",
        "What's happening this week?",
        "Golf course availability",
    ];

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: "user", text: input }]);
        setInput("");

        // Simulated response (in production this would call an AI API)
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "Thanks for your question! For the best personalized recommendations, I recommend speaking with our concierge team. Would you like to schedule a call?",
                },
            ]);
        }, 1000);
    };

    return (
        <>
            {/* Chat button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-r from-ocean-500 to-teal-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </motion.button>

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-44 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-ocean-500 to-teal-500 p-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                                    🌴
                                </div>
                                <div>
                                    <h3 className="font-bold">Naples Concierge</h3>
                                    <p className="text-xs text-white/80">Usually replies in minutes</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-64 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${msg.role === "user"
                                                ? "bg-ocean-500 text-white rounded-br-none"
                                                : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100"
                                            }`}
                                    >
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick responses */}
                        <div className="p-2 bg-white border-t border-gray-100 flex flex-wrap gap-2">
                            {quickResponses.map((qr) => (
                                <button
                                    key={qr}
                                    onClick={() => {
                                        setInput(qr);
                                    }}
                                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    {qr}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Ask anything about Naples..."
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleSend}
                                className="w-10 h-10 bg-ocean-500 text-white rounded-full flex items-center justify-center hover:bg-ocean-600 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>

                        {/* Book a call CTA */}
                        <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200">
                            <Link
                                href="/contact"
                                className="flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg text-sm hover:shadow-lg transition-all"
                            >
                                📞 Schedule Free Concierge Call
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
