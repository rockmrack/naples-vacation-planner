'use client';

import Link from 'next/link';

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-ocean-50 to-teal-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="bg-white rounded-3xl shadow-xl p-10">
                    {/* Offline Icon */}
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-3">
                        You&apos;re Offline
                    </h1>
                    <p className="text-gray-600 mb-8">
                        It looks like you&apos;ve lost your internet connection. Some features may not be available.
                    </p>

                    {/* Actions */}
                    <div className="space-y-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-3 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                        >
                            Try Again
                        </button>

                        <Link
                            href="/"
                            className="block w-full py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Go to Homepage
                        </Link>
                    </div>

                    {/* Cached Content Note */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            💡 <strong>Tip:</strong> Previously visited pages may still be available from cache.
                        </p>
                    </div>
                </div>

                {/* Decorator */}
                <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
                    <span className="text-2xl">🌴</span>
                    <span className="text-sm">Naples Vacation Planner</span>
                </div>
            </div>
        </div>
    );
}
