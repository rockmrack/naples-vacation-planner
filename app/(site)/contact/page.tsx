import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with Naples Vacation Planner. Questions, feedback, or partnership inquiries—we'd love to hear from you.",
    alternates: {
        canonical: `${site.url}/contact`,
    },
};

export default function ContactPage() {
    return (
        <div className="section-container py-12">
            <Breadcrumbs items={[{ label: "Contact" }]} />

            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold font-display text-gray-900 mb-4">
                    Contact Us
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Have questions about planning your Naples trip? Want to share feedback
                    or suggest a topic? We&apos;re here to help.
                </p>

                {/* Contact Form */}
                <form
                    action="#"
                    method="POST"
                    className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 transition-all"
                            placeholder="Jane Doe"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 transition-all"
                            placeholder="jane@example.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="subject"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Subject
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 transition-all"
                        >
                            <option value="question">Trip Planning Question</option>
                            <option value="feedback">Feedback or Suggestion</option>
                            <option value="correction">Content Correction</option>
                            <option value="partnership">Partnership Inquiry</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 transition-all resize-none"
                            placeholder="How can we help you?"
                        />
                    </div>

                    <button type="submit" className="btn-primary w-full">
                        Send Message
                    </button>
                </form>

                {/* Alternative Contact */}
                <div className="mt-8 text-center text-gray-600">
                    <p className="text-sm">
                        We typically respond within 24-48 hours.
                    </p>
                </div>
            </div>
        </div>
    );
}
