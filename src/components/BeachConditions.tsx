"use client";

import { useState } from "react";

interface BeachCondition {
    name: string;
    status: "Excellent" | "Good" | "Fair" | "Poor";
    waterTemp: number;
    waveHeight: string;
    windSpeed: string;
    uvIndex: number;
    crowds: "Light" | "Moderate" | "Heavy";
    parking: "Available" | "Limited" | "Full";
    alerts?: string[];
}

const beaches: BeachCondition[] = [
    {
        name: "Naples Beach (Pier)",
        status: "Excellent",
        waterTemp: 78,
        waveHeight: "1-2 ft",
        windSpeed: "8 mph",
        uvIndex: 9,
        crowds: "Moderate",
        parking: "Limited",
    },
    {
        name: "Vanderbilt Beach",
        status: "Good",
        waterTemp: 79,
        waveHeight: "1 ft",
        windSpeed: "10 mph",
        uvIndex: 9,
        crowds: "Light",
        parking: "Available",
    },
    {
        name: "Delnor-Wiggins",
        status: "Excellent",
        waterTemp: 78,
        waveHeight: "0-1 ft",
        windSpeed: "6 mph",
        uvIndex: 8,
        crowds: "Light",
        parking: "Available",
        alerts: ["$6 park entry fee"],
    },
    {
        name: "Lowdermilk Beach",
        status: "Good",
        waterTemp: 78,
        waveHeight: "1 ft",
        windSpeed: "8 mph",
        uvIndex: 9,
        crowds: "Moderate",
        parking: "Limited",
    },
    {
        name: "Clam Pass Beach",
        status: "Excellent",
        waterTemp: 79,
        waveHeight: "0-1 ft",
        windSpeed: "5 mph",
        uvIndex: 8,
        crowds: "Light",
        parking: "Available",
        alerts: ["Free tram to beach"],
    },
    {
        name: "Barefoot Beach",
        status: "Excellent",
        waterTemp: 78,
        waveHeight: "0-1 ft",
        windSpeed: "7 mph",
        uvIndex: 9,
        crowds: "Light",
        parking: "Limited",
        alerts: ["Excellent shelling"],
    },
];

const statusColors = {
    Excellent: "bg-green-100 text-green-800",
    Good: "bg-blue-100 text-blue-800",
    Fair: "bg-yellow-100 text-yellow-800",
    Poor: "bg-red-100 text-red-800",
};

const crowdColors = {
    Light: "text-green-600",
    Moderate: "text-yellow-600",
    Heavy: "text-red-600",
};

export function BeachConditionsWidget() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <section className="my-12 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 border border-cyan-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 mb-2 block">
                        🏖️ Live Conditions
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">Naples Beach Report</h3>
                    <p className="text-gray-500 text-sm">{currentDate}</p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold text-gray-900">78°F</div>
                    <div className="text-sm text-gray-500">Water Temp</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {beaches.map((beach) => (
                    <div
                        key={beach.name}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{beach.name}</h4>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[beach.status]}`}>
                                {beach.status}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-gray-500">Waves:</span>
                                <span className="ml-1 font-medium">{beach.waveHeight}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Wind:</span>
                                <span className="ml-1 font-medium">{beach.windSpeed}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Crowds:</span>
                                <span className={`ml-1 font-medium ${crowdColors[beach.crowds]}`}>
                                    {beach.crowds}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500">Parking:</span>
                                <span className="ml-1 font-medium">{beach.parking}</span>
                            </div>
                        </div>
                        {beach.alerts && beach.alerts.length > 0 && (
                            <div className="mt-2 text-xs text-cyan-700 bg-cyan-50 rounded-lg px-2 py-1">
                                {beach.alerts[0]}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                <span>Data refreshes hourly</span>
                <span>UV Index Today: 9 (Very High) 🌞</span>
            </div>
        </section>
    );
}
