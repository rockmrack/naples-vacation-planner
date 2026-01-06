import { TripBuilder } from '@/src/components/TripBuilder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Trip Builder - Plan Your Naples Vacation',
    description: 'Create a custom Naples, Florida itinerary with our interactive trip builder. Plan activities day by day and save your perfect vacation.',
};

export default function TripBuilderPage() {
    return <TripBuilder />;
}
