import React from "react";

interface ExpertTipProps {
    children: React.ReactNode;
    author?: string; // Optional author override
}

export function ExpertTip({ children, author = "Local Expert" }: ExpertTipProps) {
    return (
        <div className="my-8 p-6 rounded-xl bg-gradient-to-br from-ocean-50 to-white border border-ocean-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <svg className="w-24 h-24 text-ocean-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                </svg>
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-ocean-100 text-ocean-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                    <span className="font-bold text-ocean-900 tracking-tight uppercase text-xs">
                        Verified {author} Tip
                    </span>
                </div>
                <div className="text-gray-700 leading-relaxed font-medium">
                    {children}
                </div>
            </div>
        </div>
    );
}

interface EditorNoteProps {
    children: React.ReactNode;
    type?: "warning" | "info" | "update";
}

export function EditorNote({ children, type = "info" }: EditorNoteProps) {
    const styles = {
        warning: "bg-amber-50 border-amber-200 text-amber-900",
        info: "bg-blue-50 border-blue-200 text-blue-900",
        update: "bg-green-50 border-green-200 text-green-900",
    };

    const icons = {
        warning: "⚠️",
        info: "ℹ️",
        update: "🔄",
    };

    const titles = {
        warning: "Important Notice",
        info: "Did You Know?",
        update: "Latest Update",
    };

    return (
        <div className={`my-6 p-4 rounded-lg border flex gap-3 ${styles[type]}`}>
            <span className="text-xl shrink-0 select-none">{icons[type]}</span>
            <div>
                <strong className="block text-xs uppercase tracking-wider font-bold opacity-80 mb-1">
                    {titles[type]}
                </strong>
                <div className="text-sm leading-relaxed opacity-90">{children}</div>
            </div>
        </div>
    );
}

interface RatingProps {
    stars: number; // 0-5
    label?: string;
}

export function Rating({ stars, label }: RatingProps) {
    return (
        <div className="flex items-center gap-2 my-2">
            <div className="flex gap-0.5 text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i <= stars ? "fill-current" : "text-gray-200 fill-current"}`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            {label && <span className="text-sm font-bold text-gray-700">{label}</span>}
        </div>
    );
}

interface ProsConsProps {
    pros: string[];
    cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
    return (
        <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-green-50/50 rounded-xl p-6 border border-green-100">
                <h4 className="flex items-center gap-2 font-bold text-green-800 mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    The Highlights
                </h4>
                <ul className="space-y-3">
                    {pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-900">
                            <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-green-500 shrink-0" />
                            {pro}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                <h4 className="flex items-center gap-2 font-bold text-red-800 mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Things to Note
                </h4>
                <ul className="space-y-3">
                    {cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                            <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-red-400 shrink-0" />
                            {con}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

interface KeyStatProps {
    label: string;
    value: string;
}

export function KeyStat({ label, value }: KeyStatProps) {
    return (
        <div className="inline-flex flex-col border-l-2 border-ocean-500 pl-3 py-1 my-2 mr-6">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</span>
            <span className="font-bold text-gray-900">{value}</span>
        </div>
    );
}
