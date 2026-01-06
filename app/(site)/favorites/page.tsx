import { Metadata } from "next";
import Link from "next/link";
import { FavoritesList } from "@/src/components/Favorites";

export const metadata: Metadata = {
    title: "My Saved Items | Naples Vacation Planner",
    description: "View and manage your saved Naples vacation guides, hotels, restaurants, and activities.",
};

export default function FavoritesPage() {
    return (
        <div className="section-container py-12">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Saved Items</h1>
                <p className="text-gray-600 mb-8">
                    Your saved guides, hotels, and activities for easy access during trip planning.
                </p>

                <FavoritesList />

                <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-gray-900 mb-2">💡 Tip</h3>
                    <p className="text-gray-600 text-sm">
                        Click the heart icon on any guide, hotel, or activity to save it here.
                        Your saved items are stored locally and will be here when you return.
                    </p>
                </div>
            </div>
        </div>
    );
}
