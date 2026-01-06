'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CalendarEvent {
    title: string;
    description?: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    allDay?: boolean;
}

export function CalendarExport({ event }: { event: CalendarEvent }) {
    const [showOptions, setShowOptions] = useState(false);

    const formatDateForGoogle = (date: Date) => {
        return date.toISOString().replace(/-|:|\.\d{3}/g, '');
    };

    const formatDateForICal = (date: Date) => {
        return date.toISOString().replace(/-|:|\.\d{3}/g, '').slice(0, -1);
    };

    const generateGoogleCalendarUrl = () => {
        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: event.title,
            details: event.description || '',
            location: event.location || 'Naples, FL',
            dates: `${formatDateForGoogle(event.startDate)}/${formatDateForGoogle(event.endDate || new Date(event.startDate.getTime() + 3600000))}`,
        });
        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    };

    const generateOutlookUrl = () => {
        const params = new URLSearchParams({
            path: '/calendar/action/compose',
            rru: 'addevent',
            subject: event.title,
            body: event.description || '',
            location: event.location || 'Naples, FL',
            startdt: event.startDate.toISOString(),
            enddt: (event.endDate || new Date(event.startDate.getTime() + 3600000)).toISOString(),
        });
        return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
    };

    const generateICalData = () => {
        const formatDate = (date: Date) => formatDateForICal(date);
        const uid = `naples-${Date.now()}@naplesvacationplanner.com`;

        const icalContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Naples Vacation Planner//EN',
            'BEGIN:VEVENT',
            `UID:${uid}`,
            `DTSTAMP:${formatDate(new Date())}Z`,
            `DTSTART:${formatDate(event.startDate)}Z`,
            `DTEND:${formatDate(event.endDate || new Date(event.startDate.getTime() + 3600000))}Z`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description || ''}`,
            `LOCATION:${event.location || 'Naples, FL'}`,
            'END:VEVENT',
            'END:VCALENDAR',
        ].join('\r\n');

        return icalContent;
    };

    const downloadICalFile = () => {
        const icalData = generateICalData();
        const blob = new Blob([icalData], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${event.title.replace(/\s+/g, '-')}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowOptions(!showOptions)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-ocean-500 text-white font-semibold rounded-lg hover:bg-ocean-600 transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add to Calendar
            </button>

            {showOptions && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowOptions(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                    >
                        <a
                            href={generateGoogleCalendarUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowOptions(false)}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="font-medium text-gray-700">Google Calendar</span>
                        </a>

                        <a
                            href={generateOutlookUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowOptions(false)}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0078D4">
                                <path d="M24 7.387v10.478c0 .23-.08.424-.238.576-.158.152-.354.228-.586.228h-8.504v-6.182l1.02.84c.07.06.152.09.246.09.094 0 .176-.03.246-.09l6.578-5.392v-.548h-.148l-6.924 5.686-1.018-.838V4.26h8.504c.232 0 .428.076.586.228.158.152.238.346.238.576V7.387zM14.672 4.26v12.078H.814c-.232 0-.428-.076-.586-.228C.07 15.958 0 15.764 0 15.534V4.456c0-.23.07-.424.228-.576.158-.152.354-.228.586-.228h13.858z" />
                            </svg>
                            <span className="font-medium text-gray-700">Outlook</span>
                        </a>

                        <button
                            onClick={() => {
                                downloadICalFile();
                                setShowOptions(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span className="font-medium text-gray-700">Download .ics</span>
                        </button>

                        <div className="border-t border-gray-100 mt-2 pt-2 px-4 py-2">
                            <p className="text-xs text-gray-500">
                                Works with Apple Calendar, Yahoo, and other calendar apps
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
}

// Add Multiple Events Component (for itineraries)
export function ItineraryCalendarExport({
    tripName,
    events,
    startDate
}: {
    tripName: string;
    events: { day: number; time?: string; title: string; location?: string }[];
    startDate: Date;
}) {
    const [isExporting, setIsExporting] = useState(false);

    const exportAllEvents = () => {
        setIsExporting(true);

        const icalEvents = events.map((event, index) => {
            const eventDate = new Date(startDate);
            eventDate.setDate(eventDate.getDate() + event.day - 1);

            if (event.time) {
                const [hours, minutes] = event.time.match(/(\d+):(\d+)/)?.slice(1) || ['9', '00'];
                const isPM = event.time.toLowerCase().includes('pm');
                eventDate.setHours(parseInt(hours) + (isPM && parseInt(hours) !== 12 ? 12 : 0), parseInt(minutes));
            }

            const endDate = new Date(eventDate.getTime() + 2 * 3600000); // 2 hours later
            const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d{3}/g, '').slice(0, -1);

            return [
                'BEGIN:VEVENT',
                `UID:naples-${Date.now()}-${index}@naplesvacationplanner.com`,
                `DTSTAMP:${formatDate(new Date())}Z`,
                `DTSTART:${formatDate(eventDate)}Z`,
                `DTEND:${formatDate(endDate)}Z`,
                `SUMMARY:${event.title}`,
                `LOCATION:${event.location || 'Naples, FL'}`,
                'END:VEVENT',
            ].join('\r\n');
        });

        const icalContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Naples Vacation Planner//EN',
            `X-WR-CALNAME:${tripName}`,
            ...icalEvents,
            'END:VCALENDAR',
        ].join('\r\n');

        const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${tripName.replace(/\s+/g, '-')}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setIsExporting(false);
    };

    return (
        <button
            onClick={exportAllEvents}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {isExporting ? 'Exporting...' : `Export ${events.length} Events to Calendar`}
        </button>
    );
}
