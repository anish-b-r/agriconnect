import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  CloudRain,
  Flame,
  Wind,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  RefreshCw,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Compass,
  Thermometer,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { WeatherAlertsData, DailyWeatherForecast, Language } from '../types';
import { getTranslation } from '../utils/translations';
import { CustomSelect } from './CustomSelect';

interface WeatherAlertsProps {
  currentLanguage: Language;
  selectedState?: string;
  onNavigateToYield?: (weatherRisk: 'Normal' | 'Deficit Monsoon (-15%)' | 'Excess Rain / Hail' | 'Heatwave Spike' | 'Frost Risk') => void;
  onNavigateToPriceDiscovery?: () => void;
}

const MAJOR_DISTRICTS = [
  // Karnataka (Default)
  { district: 'Bengaluru', state: 'Karnataka', zone: 'Eastern Dry Zone' },
  { district: 'Mysuru', state: 'Karnataka', zone: 'Southern Dry / Transition Zone' },
  { district: 'Belagavi', state: 'Karnataka', zone: 'Northern Transition Zone' },
  { district: 'Davanagere', state: 'Karnataka', zone: 'Central Dry Zone' },
  { district: 'Hubballi-Dharwad', state: 'Karnataka', zone: 'Northern Dry Zone' },
  { district: 'Shimoga', state: 'Karnataka', zone: 'Malnad Hill Zone' },
  { district: 'Hassan', state: 'Karnataka', zone: 'Southern Transition Zone' },
  { district: 'Bellary', state: 'Karnataka', zone: 'North Eastern Dry Zone' },
  { district: 'Mandya', state: 'Karnataka', zone: 'Southern Dry Zone' },
  { district: 'Kalaburagi', state: 'Karnataka', zone: 'North Eastern Transition Zone' },

  // Punjab
  { district: 'Ludhiana', state: 'Punjab', zone: 'Central Plain Zone' },
  { district: 'Sangrur', state: 'Punjab', zone: 'Western Semi-Arid Zone' },
  { district: 'Bathinda', state: 'Punjab', zone: 'South Western Zone' },
  { district: 'Amritsar', state: 'Punjab', zone: 'Border Undulating Zone' },
  { district: 'Patiala', state: 'Punjab', zone: 'Central Plain Zone' },

  // Haryana
  { district: 'Karnal', state: 'Haryana', zone: 'Eastern Agro-Climatic Zone' },
  { district: 'Hisar', state: 'Haryana', zone: 'Western Arid Zone' },
  { district: 'Sirsa', state: 'Haryana', zone: 'Western Dry Zone' },
  { district: 'Ambala', state: 'Haryana', zone: 'North Eastern Sub-Mountain' },

  // Maharashtra
  { district: 'Nashik', state: 'Maharashtra', zone: 'Western Ghats / Plain' },
  { district: 'Latur', state: 'Maharashtra', zone: 'Marathwada Scarcity Zone' },
  { district: 'Pune', state: 'Maharashtra', zone: 'Western Maharashtra Plain' },
  { district: 'Nagpur', state: 'Maharashtra', zone: 'Vidarbha Cotton-Soybean Belt' },

  // Madhya Pradesh
  { district: 'Indore', state: 'Madhya Pradesh', zone: 'Malwa Plateau' },
  { district: 'Ujjain', state: 'Madhya Pradesh', zone: 'Malwa Agro Zone' },
  { district: 'Bhopal', state: 'Madhya Pradesh', zone: 'Vindhyan Plateau' },

  // Gujarat
  { district: 'Rajkot', state: 'Gujarat', zone: 'North Saurashtra Dry Zone' },
  { district: 'Ahmedabad', state: 'Gujarat', zone: 'Middle Gujarat Zone' },
  { district: 'Surat', state: 'Gujarat', zone: 'South Gujarat Heavy Rainfall' },

  // Uttar Pradesh
  { district: 'Varanasi', state: 'Uttar Pradesh', zone: 'Eastern Plain Zone' },
  { district: 'Lucknow', state: 'Uttar Pradesh', zone: 'Central Plain Zone' },
  { district: 'Bareilly', state: 'Uttar Pradesh', zone: 'Rohilkhand Tarai Zone' },

  // Rajasthan
  { district: 'Kota', state: 'Rajasthan', zone: 'South-Eastern Humid Plain' },
  { district: 'Jaipur', state: 'Rajasthan', zone: 'Semi-Arid Eastern Plain' },
  { district: 'Sri Ganganagar', state: 'Rajasthan', zone: 'Irrigated North Western Plain' },
];

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({
  currentLanguage,
  selectedState = 'Karnataka',
  onNavigateToYield,
  onNavigateToPriceDiscovery,
}) => {
  const t = getTranslation(currentLanguage);

  const [activeState, setActiveState] = useState<string>(selectedState);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => {
    const match = MAJOR_DISTRICTS.filter((d) => d.state.toLowerCase() === (selectedState || 'karnataka').toLowerCase());
    return match[0]?.district || 'Bengaluru';
  });
  const [weatherData, setWeatherData] = useState<WeatherAlertsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expandedDayIndex, setExpandedDayIndex] = useState<number | null>(0);

  // Filter districts dropdown based on the active state
  const availableDistricts = React.useMemo(() => {
    const matched = MAJOR_DISTRICTS.filter((d) => d.state.toLowerCase() === activeState.toLowerCase());
    return matched.length > 0 ? matched : MAJOR_DISTRICTS;
  }, [activeState]);

  // Sync state prop when user changes state in top navbar header
  useEffect(() => {
    if (selectedState) {
      setActiveState(selectedState);
      const stateDistricts = MAJOR_DISTRICTS.filter((d) => d.state.toLowerCase() === selectedState.toLowerCase());
      const newDistrict = stateDistricts.length > 0 ? stateDistricts[0].district : selectedDistrict;
      setSelectedDistrict(newDistrict);
      fetchWeatherForecast(newDistrict, selectedState);
    }
  }, [selectedState]);

  const fetchWeatherForecast = async (district: string, stateName: string) => {
    setIsLoading(true);

    try {
      const queryParam = `district=${encodeURIComponent(district)}&state=${encodeURIComponent(stateName)}`;
      const response = await fetch(`/api/weather/forecast?${queryParam}`);
      const data = await response.json();

      if (data.success && data.data) {
        const raw = data.data;

        // Normalize daily forecast array (server sends dailyForecasts, fallback to forecast)
        const rawForecast = raw.dailyForecasts || raw.forecast || [];
        const normalizedForecast: DailyWeatherForecast[] = rawForecast.map((item: any) => ({
          day: item.dayName || item.day || 'Day',
          date: item.date || '',
          tempHigh: item.tempMax ?? item.tempHigh ?? 32,
          tempLow: item.tempMin ?? item.tempLow ?? 22,
          condition: item.condition || 'Clear Sky',
          rainProbability: item.precipitationProbability ?? item.rainProbability ?? 0,
          icon: item.condition?.toLowerCase().includes('rain') ? '🌧️' : 
                item.condition?.toLowerCase().includes('heat') || item.condition?.toLowerCase().includes('sunny') ? '☀️' : '🌤️',
          harvestSuitability: item.harvestSuitability || 'Optimal',
          risks: item.risks || [],
        }));

        // Normalize alerts array from summaryAlert or alerts
        const normalizedAlerts = [];
        if (raw.summaryAlert?.headline) {
          normalizedAlerts.push({
            id: 'sum-1',
            severity: raw.summaryAlert.hasHighRisk ? 'high' : 'low',
            message: `${raw.summaryAlert.headline} ${raw.summaryAlert.actionAdvice}`,
            date: 'Today',
          });
        }
        if (Array.isArray(raw.alerts)) {
          normalizedAlerts.push(...raw.alerts);
        }

        const normalizedData: WeatherAlertsData = {
          district: raw.district || district,
          state: raw.state || stateName,
          agroZone: raw.agroZone || 'Central Agro Zone',
          currentTemp: raw.currentTemp ?? 32,
          humidity: raw.currentHumidity ?? raw.humidity ?? 55,
          rainfallMm: raw.rainfallMm ?? 0,
          windSpeedKm: raw.currentWind ?? raw.windSpeedKm ?? 12,
          alerts: normalizedAlerts,
          forecast: normalizedForecast,
          summaryAlert: raw.summaryAlert,
        };

        setWeatherData(normalizedData);
      } else {
        throw new Error('Invalid backend payload structure');
      }
    } catch (err: any) {
      console.warn('[WeatherAlerts] Using fallback local weather:', err?.message || err);
      setWeatherData(createLocalFallbackWeather(district, stateName));
    } finally {
      setIsLoading(false);
    }
  };

  const createLocalFallbackWeather = (district: string, stateName: string): WeatherAlertsData => {
    const today = new Date();
    const days: DailyWeatherForecast[] = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const isRainy = i === 2 || i === 5;
      const isHeat = i === 1 || i === 4;

      days.push({
        day: dayName,
        date: dateStr,
        tempHigh: isHeat ? 39 : 32,
        tempLow: isHeat ? 26 : 22,
        condition: isRainy ? 'Heavy Rain Showers' : isHeat ? 'Extreme Heatwave' : 'Clear Skies',
        rainProbability: isRainy ? 80 : 10,
        icon: isRainy ? '🌧️' : isHeat ? '☀️' : '🌤️',
        harvestSuitability: isRainy ? 'High Risk' : isHeat ? 'Caution' : 'Optimal',
        risks: isRainy ? [{
          type: 'heavy_rain',
          severity: 'high',
          title: 'Monsoon Rain & Spoilage Danger',
          description: 'Rain showers elevates moisture content above safe 12% storage threshold.',
          mitigationAction: 'Cover harvest lots with double tarpaulins. Halt open field combine cutting.',
        }] : [],
      });
    }

    return {
      district,
      state: stateName,
      agroZone: 'Central Agro-Climatic Zone',
      currentTemp: 31,
      humidity: 62,
      rainfallMm: 0,
      windSpeedKm: 14,
      alerts: [
        {
          id: 'alt-1',
          severity: 'medium',
          message: 'Moderate rain expected in 48 hours. Ensure crop tarpaulin covers are ready at loading yards.',
          date: 'Today',
        },
      ],
      forecast: days,
    };
  };

  useEffect(() => {
    fetchWeatherForecast(selectedDistrict, activeState);
  }, [selectedDistrict, activeState]);

  const handleDistrictChange = (districtName: string) => {
    const found = MAJOR_DISTRICTS.find((d) => d.district === districtName);
    if (found) {
      setSelectedDistrict(found.district);
      setActiveState(found.state);
    }
  };

  const getSuitabilityBadge = (suitability?: string) => {
    switch (suitability) {
      case 'Optimal':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">Optimal Harvest</span>;
      case 'Caution':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">Caution Advised</span>;
      case 'High Risk':
      case 'Critical Risk':
      case 'Unfavorable':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">High Spoilage Risk</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">Optimal</span>;
    }
  };

  const activeForecast = weatherData?.forecast || [];

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-stone-900 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono mb-3">
              <CloudSun className="w-4 h-4 text-[#1b4332]" />
              <span>IMD & Open-Meteo Satellite Radar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-stone-900">
              Weather & Harvest Risk Advisory
            </h1>
            <p className="mt-1 text-stone-500 text-xs sm:text-sm leading-relaxed">
              Hyper-local satellite weather predictions, grain moisture risk warnings, and combine cutter scheduling.
            </p>
          </div>

          <button
            onClick={() => fetchWeatherForecast(selectedDistrict, activeState)}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-stone-200 cursor-pointer transition-colors shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#1b4332]' : ''}`} />
            <span>Refresh Radar Telemetry</span>
          </button>
        </div>
      </div>

      {/* District & Agro Zone Selector */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="w-full md:w-auto">
          <label className="block text-[11px] font-extrabold text-stone-400 uppercase tracking-wider mb-1.5 font-mono">
            Select Agricultural District & State
          </label>
          <CustomSelect
            value={selectedDistrict}
            onChange={(val) => handleDistrictChange(val)}
            options={availableDistricts.map((d) => ({
              value: d.district,
              label: `${d.district} (${d.state})`,
              sublabel: d.zone,
            }))}
            icon={MapPin}
            dropdownWidth="w-72 sm:w-80"
            align="left"
          />
        </div>

        {weatherData && (
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto font-mono text-xs">
            <div className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-amber-600" />
              <div>
                <span className="text-[10px] text-stone-400 block font-sans">CURRENT TEMP</span>
                <span className="font-bold text-stone-900">{weatherData.currentTemp}°C</span>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <div>
                <span className="text-[10px] text-stone-400 block font-sans">HUMIDITY</span>
                <span className="font-bold text-stone-900">{weatherData.humidity}%</span>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 flex items-center gap-2">
              <Wind className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-[10px] text-stone-400 block font-sans">WIND SPEED</span>
                <span className="font-bold text-stone-900">{weatherData.windSpeedKm} km/h</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-stone-400 border border-stone-200/80 shadow-sm">
          <div className="animate-spin w-8 h-8 border-3 border-[#1b4332] border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-xs font-bold font-mono">Loading satellite weather telemetry for {selectedDistrict}...</p>
        </div>
      ) : weatherData ? (
        <div className="space-y-6">
          {/* Active Spoilage / Weather Alerts */}
          {weatherData.alerts && weatherData.alerts.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-sm flex items-start gap-4">
              <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-extrabold text-stone-900 font-display">
                    Weather Alert — {weatherData.district} Zone
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono text-[10px] font-bold">
                    ACTIVE ADVISORY
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {weatherData.alerts[0].message}
                </p>
              </div>
            </div>
          )}

          {/* 7-Day Forecast Grid */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold font-display text-stone-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1b4332]" />
                <span>7-Day Agricultural Outlook — {weatherData.district}</span>
              </h3>
              <span className="text-xs font-mono text-stone-500">
                {weatherData.agroZone}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 font-mono">
              {activeForecast.map((forecast, idx) => {
                const isSelected = expandedDayIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setExpandedDayIndex(idx)}
                    className={`bg-white p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-2 border-[#1b4332] bg-white shadow-sm'
                        : 'border-stone-200/80 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900">{forecast.day}</span>
                        <span className="text-xl">{forecast.icon}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 block">{forecast.date}</span>

                      <div className="mt-3 text-lg font-black text-stone-900">
                        {forecast.tempHigh}°C
                        <span className="text-xs font-normal text-stone-500 ml-1">/ {forecast.tempLow}°C</span>
                      </div>

                      <div className="mt-2 text-[11px] text-stone-600">
                        <span>Rain: <strong className="text-stone-900">{forecast.rainProbability}%</strong></span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-100 text-[10px] font-bold text-[#1b4332]">
                      {forecast.harvestSuitability || 'Optimal'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Day Action Blueprint Card */}
          {expandedDayIndex !== null && activeForecast[expandedDayIndex] && (
            <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-5">
              {(() => {
                const day = activeForecast[expandedDayIndex];
                return (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl p-2 bg-stone-50 rounded-xl border border-stone-200/80">{day.icon}</span>
                        <div>
                          <h3 className="text-base font-extrabold font-display text-stone-900">
                            {day.day} ({day.date}) — Field Action & Harvesting Blueprint
                          </h3>
                          <p className="text-xs text-stone-500 font-mono">Sky Condition: {day.condition}</p>
                        </div>
                      </div>
                      {getSuitabilityBadge(day.harvestSuitability)}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                      <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
                        <span className="text-stone-400 text-[10px] block font-sans uppercase font-bold">TEMPERATURE CORRIDOR</span>
                        <strong className="text-stone-900 text-sm mt-0.5 block">{day.tempLow}°C — {day.tempHigh}°C</strong>
                      </div>

                      <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
                        <span className="text-stone-400 text-[10px] block font-sans uppercase font-bold">PRECIPITATION CHANCE</span>
                        <strong className="text-[#1b4332] text-sm mt-0.5 block">{day.rainProbability}% Probability</strong>
                      </div>

                      <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
                        <span className="text-stone-400 text-[10px] block font-sans uppercase font-bold">FIELD SUITABILITY</span>
                        <strong className="text-stone-900 text-sm mt-0.5 block">{day.harvestSuitability || 'Optimal'}</strong>
                      </div>
                    </div>

                    {/* Specific Field Advisory Risks */}
                    {day.risks && day.risks.length > 0 ? (
                      <div className="space-y-3 pt-1">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-400 font-mono">
                          IDENTIFIED AGRONOMIC RISKS & MITIGATION
                        </h4>
                        {day.risks.map((risk: any, rIdx: number) => (
                          <div key={rIdx} className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-1.5">
                            <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                              <span>{risk.title}</span>
                            </div>
                            <p className="text-xs text-stone-600 leading-relaxed">{risk.description}</p>
                            <div className="mt-2 text-xs text-[#1b4332] font-semibold flex items-start gap-1.5 pt-2 border-t border-amber-200/50">
                              <CheckCircle2 className="w-4 h-4 text-[#1b4332] shrink-0 mt-0.5" />
                              <span><strong>Action Plan:</strong> {risk.mitigationAction}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-emerald-950">Optimal Harvesting Window</h4>
                          <p className="text-xs text-stone-600 mt-0.5">
                            Weather parameters favor field cutting, mechanical threshing, and open yard drying without humidity spikes.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Interactive Action Shortcuts */}
                    <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-3">
                      {onNavigateToYield && (
                        <button
                          onClick={() => onNavigateToYield(
                            day.rainProbability > 50 ? 'Excess Rain / Hail' : day.tempHigh > 37 ? 'Heatwave Spike' : 'Normal'
                          )}
                          className="px-4 py-2 bg-[#1b4332] hover:bg-[#143326] text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                        >
                          <span>Simulate Yield Impact in Yield AI</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {onNavigateToPriceDiscovery && (
                        <button
                          onClick={onNavigateToPriceDiscovery}
                          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center gap-2 border border-stone-200 cursor-pointer transition-colors"
                        >
                          <span>Check Fair Baseline Price</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};



