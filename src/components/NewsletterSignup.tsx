"use client";

import { useState } from "react";

interface NewsletterSignupProps {
    variant?: "inline" | "hero" | "footer";
    title?: string;
    description?: string;
}

export default function NewsletterSignup({
    variant = "inline",
    title = "Get Your Free Naples Guide",
    description = "Subscribe for insider tips, exclusive deals, and a free downloadable Naples vacation planning PDF.",
}: NewsletterSignupProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            setStatus("error");
            setMessage("Please enter a valid email address.");
            return;
        }

        setStatus("loading");

        // Simulate API call - replace with your actual newsletter service
        // e.g., Mailchimp, ConvertKit, Buttondown, etc.
        try {
            // For demo purposes, we'll simulate a successful signup
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setStatus("success");
            setMessage("Thanks! Check your email for your free Naples guide.");
            setEmail("");
        } catch {
            setStatus("error");
            setMessage("Something went wrong. Please try again.");
        }
    };

    if (status === "success") {
        return (
            <div className={`rounded-xl p-6 text-center ${variant === "hero" ? "bg-ocean-600 text-white" : "bg-green-50"
                }`}>
                <div className="text-4xl mb-3">🎉</div>
                <h3 className={`text-xl font-bold mb-2 ${variant === "hero" ? "text-white" : "text-green-800"
                    }`}>
                    You're In!
                </h3>
                <p className={variant === "hero" ? "text-ocean-100" : "text-green-700"}>
                    {message}
                </p>
            </div>
        );
    }

    if (variant === "hero") {
        return (
            <div className="bg-gradient-to-r from-ocean-600 to-ocean-700 rounded-2xl p-8 text-white">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="text-4xl mb-4 block">📧</span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{title}</h3>
                    <p className="text-ocean-100 mb-6">{description}</p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sand-400"
                            disabled={status === "loading"}
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="px-6 py-3 bg-sand-500 hover:bg-sand-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                        >
                            {status === "loading" ? "Sending..." : "Get Free Guide"}
                        </button>
                    </form>

                    {status === "error" && (
                        <p className="mt-3 text-red-200 text-sm">{message}</p>
                    )}

                    <p className="mt-4 text-xs text-ocean-200">
                        No spam, ever. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        );
    }

    if (variant === "footer") {
        return (
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm mb-4">{description}</p>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        disabled={status === "loading"}
                    />
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full px-4 py-2 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                    >
                        {status === "loading" ? "Sending..." : "Subscribe"}
                    </button>
                </form>

                {status === "error" && (
                    <p className="mt-2 text-red-400 text-sm">{message}</p>
                )}
            </div>
        );
    }

    // Default inline variant
    return (
        <div className="bg-ocean-50 border border-ocean-100 rounded-xl p-6">
            <div className="flex items-start gap-4">
                <span className="text-3xl">📬</span>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-ocean-900 mb-1">{title}</h3>
                    <p className="text-ocean-700 text-sm mb-4">{description}</p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="flex-1 px-4 py-2 rounded-lg border border-ocean-200 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                            disabled={status === "loading"}
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="px-5 py-2 bg-ocean-600 hover:bg-ocean-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                        >
                            {status === "loading" ? "..." : "Subscribe"}
                        </button>
                    </form>

                    {status === "error" && (
                        <p className="mt-2 text-red-600 text-sm">{message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
