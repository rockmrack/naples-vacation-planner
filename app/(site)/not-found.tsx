import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-30 30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            />

            {/* Accent Lights */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl px-4 text-center">
                <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-bold uppercase tracking-wider mb-6 border border-white/10">
                    404 Error
                </span>

                <h1 className="text-6xl md:text-8xl font-bold font-display text-white mb-6">
                    Lost in Paradise?
                </h1>

                <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                    The page you're looking for seems to have drifted out to sea.
                    Don't worry, even getting lost in Naples can be beautiful.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-ocean-500/25 hover:-translate-y-1 transition-all"
                    >
                        Return Home
                    </Link>
                    <Link
                        href="/itineraries"
                        className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 hover:-translate-y-1 transition-all"
                    >
                        Browse Itineraries
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <p className="text-sm text-slate-400 mb-6 uppercase tracking-wider font-semibold">Popular Destinations</p>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium">
                        <Link href="/where-to-stay" className="text-white/70 hover:text-white transition-colors">Where to Stay</Link>
                        <Link href="/day-trips" className="text-white/70 hover:text-white transition-colors">Day Trips</Link>
                        <Link href="/travel-tips" className="text-white/70 hover:text-white transition-colors">Travel Tips</Link>
                        <Link href="/maps" className="text-white/70 hover:text-white transition-colors">Maps</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
