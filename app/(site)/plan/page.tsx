import { TripPlannerQuiz } from "@/src/components/TripPlannerQuiz";

export const metadata = {
    title: "Plan Your Perfect Naples Trip | Naples Vacation Planner",
    description: "Answer a few questions and get a personalized Naples itinerary crafted just for you. Free trip planning for luxury travelers.",
};

export default function PlanPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-ocean-50 via-white to-teal-50">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                        Plan Your Perfect Naples Trip
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Answer a few questions and we&apos;ll create a personalized itinerary
                        tailored to your travel style, budget, and interests.
                    </p>
                </div>
                <TripPlannerQuiz />
            </div>
        </div>
    );
}
