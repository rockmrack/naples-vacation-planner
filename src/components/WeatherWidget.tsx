"use client";

import { useEffect, useState } from "react";
import { Cloud, Sun, CloudRain, CloudLightning, Wind, Thermometer } from "lucide-react";

interface WeatherData {
    temperature: number;
    conditionCode: number;
    windSpeed: number;
}

// WMO Weather interpretation codes (http://www.wmo.int/pages/prog/www/IMOP/publications/CIMO-Guide/CIMO_Guide-7th_Edition-2008.html)
const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return <Sun className="w-8 h-8 text-yellow-500" />;
    if (code === 2 || code === 3) return <Cloud className="w-8 h-8 text-gray-400" />;
    if (code >= 51 && code <= 67) return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (code >= 80 && code <= 99) return <CloudRain className="w-8 h-8 text-blue-500" />;
    if (code >= 95) return <CloudLightning className="w-8 h-8 text-purple-500" />;
    return <Sun className="w-8 h-8 text-yellow-500" />; // Default
};

const getWeatherDescription = (code: number) => {
    if (code === 0) return "Clear sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if (code >= 51) return "Rainy";
    return "Sunny";
};

export default function WeatherWidget({ className }: { className?: string }) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Naples, FL coordinates: 26.1420° N, 81.7948° W
                const response = await fetch(
                    "https://api.open-meteo.com/v1/forecast?latitude=26.1420&longitude=-81.7948&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph"
                );

                if (!response.ok) throw new Error("Failed to fetch weather");

                const data = await response.json();
                setWeather({
                    temperature: data.current_weather.temperature,
                    conditionCode: data.current_weather.weathercode,
                    windSpeed: data.current_weather.windspeed,
                });
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (error) return null; // Hide widget on error

    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Current Weather in Naples</h3>

            {loading ? (
                <div className="flex items-center space-x-4 animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 rounded w-12"></div>
                    </div>
                </div>
            ) : weather ? (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {getWeatherIcon(weather.conditionCode)}
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {Math.round(weather.temperature)}°F
                            </div>
                            <div className="text-xs text-gray-500 font-medium">
                                {getWeatherDescription(weather.conditionCode)}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 items-end text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                            <Wind size={14} />
                            <span>{weather.windSpeed} mph</span>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
