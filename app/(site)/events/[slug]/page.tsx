import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllDocsByType, getDocBySlug } from "@/src/lib/content";
import { site } from "@/src/config/site";
import { isEvent, EventFrontmatter } from "@/src/lib/content-schema";
import { Prose } from "@/src/components/Prose";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import ShareButtons from "@/src/components/ShareButtons";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const events = getAllDocsByType("event");
    return events.map((doc) => ({
        slug: doc.frontmatter.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const doc = getDocBySlug("event", slug);

    if (!doc || !isEvent(doc.frontmatter)) {
        return { title: "Event Not Found" };
    }

    const fm = doc.frontmatter;

    return {
        title: `${fm.eventName} | Naples Events | ${site.name}`,
        description: fm.description,
        openGraph: {
            title: `${fm.eventName} | ${site.name}`,
            description: fm.description,
            url: `${site.url}/events/${fm.slug}`,
            type: "article",
            images: [{ url: fm.featuredImage }],
        },
    };
}

const categoryLabels: Record<string, string> = {
    "art-show": "Art Show",
    festival: "Festival",
    "farmers-market": "Farmers Market",
    music: "Music & Concert",
    "food-drink": "Food & Drink",
    sports: "Sports & Fitness",
    holiday: "Holiday Event",
    film: "Film & Theater",
    community: "Community Event",
};

function formatEventDate(startDate: string, endDate?: string): string {
    const start = new Date(startDate);
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    };

    if (!endDate) {
        return start.toLocaleDateString("en-US", options);
    }

    const end = new Date(endDate);
    const startStr = start.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    const endStr = end.toLocaleDateString("en-US", options);
    return `${startStr} - ${endStr}`;
}

export default async function EventPage({ params }: PageProps) {
    const { slug } = await params;
    const doc = getDocBySlug("event", slug);

    if (!doc || !isEvent(doc.frontmatter)) {
        notFound();
    }

    const fm = doc.frontmatter as EventFrontmatter;

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Events", href: "/events" },
        { label: fm.eventName, href: `/events/${fm.slug}` },
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Image */}
            <section className="relative h-[40vh] md:h-[50vh] w-full">
                <Image
                    src={fm.featuredImage}
                    alt={fm.featuredImageAlt || fm.eventName}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                    <div className="container mx-auto">
                        <span className="inline-block bg-ocean-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-3">
                            {categoryLabels[fm.category] || fm.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold mb-2">
                            {fm.eventName}
                        </h1>
                        <p className="text-lg text-gray-200">
                            {fm.venue}
                        </p>
                    </div>
                </div>
            </section>

            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 py-4">
                <Breadcrumbs items={breadcrumbs} />
            </div>

            {/* Main Content */}
            <article className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Article */}
                    <div className="lg:col-span-2">
                        <Prose>
                            <MDXRemote source={doc.body} />
                        </Prose>

                        <ShareButtons title={fm.title} url={`/events/${fm.slug}`} />
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Event Details */}
                            <div className="bg-ocean-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-ocean-900 mb-4">
                                    Event Details
                                </h3>
                                <dl className="space-y-3 text-sm">
                                    <div>
                                        <dt className="text-ocean-600 font-medium">📅 Date</dt>
                                        <dd className="text-gray-900 mt-1">
                                            {fm.isRecurring && fm.recurringSchedule
                                                ? fm.recurringSchedule
                                                : formatEventDate(fm.startDate, fm.endDate)}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-ocean-600 font-medium">📍 Venue</dt>
                                        <dd className="text-gray-900 mt-1">{fm.venue}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-ocean-600 font-medium">🗺️ Address</dt>
                                        <dd className="text-gray-900 mt-1">{fm.address}</dd>
                                    </div>
                                    {fm.price && (
                                        <div>
                                            <dt className="text-ocean-600 font-medium">💰 Price</dt>
                                            <dd className="text-gray-900 mt-1 font-semibold">
                                                {fm.isFree ? (
                                                    <span className="text-green-600">Free Admission</span>
                                                ) : (
                                                    fm.price
                                                )}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            {/* CTAs */}
                            <div className="space-y-3">
                                {fm.ticketUrl && (
                                    <a
                                        href={fm.ticketUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-ocean-600 hover:bg-ocean-700 text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors"
                                    >
                                        Get Tickets
                                    </a>
                                )}
                                {fm.website && (
                                    <a
                                        href={fm.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-center font-semibold py-3 px-6 rounded-lg transition-colors"
                                    >
                                        Official Website
                                    </a>
                                )}
                            </div>

                            {/* Back Link */}
                            <Link
                                href="/events"
                                className="block text-center text-ocean-600 hover:text-ocean-700 font-medium"
                            >
                                ← View All Events
                            </Link>
                        </div>
                    </aside>
                </div>
            </article>
        </main>
    );
}
