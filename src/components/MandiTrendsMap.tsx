import React, { useState } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  Truck, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Sparkles, 
  Activity,
  Layers,
  Info,
  LayoutGrid,
  List as ListIcon,
  Table as TableIcon,
  Clock,
  Award,
  ArrowUpDown,
  CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, AreaChart, Area } from 'recharts';
import { MandiRecord, Language } from '../types';
import { CROP_MASTER_LIST, SAMPLE_MANDIS } from '../data/cropMaster';
import { getTranslation, getLocalizedCropName } from '../utils/translations';
import { CustomSelect } from './CustomSelect';

interface MandiTrendsMapProps {
  currentLanguage: Language;
  selectedState?: string;
}

type MandiViewMode = 'cards' | 'list' | 'table';
type SortOption = 'payout' | 'distance' | 'price';

export const MandiTrendsMap: React.FC<MandiTrendsMapProps> = ({ currentLanguage, selectedState = 'Karnataka' }) => {
  const t = getTranslation(currentLanguage);

  const [selectedCropId, setSelectedCropId] = useState<string>('wheat');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30d' | '60d' | '90d'>('30d');
  const [mandiViewMode, setMandiViewMode] = useState<MandiViewMode>('cards');
  const [sortBy, setSortBy] = useState<SortOption>('payout');

  const selectedCrop = CROP_MASTER_LIST.find((c) => c.id === selectedCropId) || CROP_MASTER_LIST[0];
  const rawMandis = SAMPLE_MANDIS[selectedCropId] || SAMPLE_MANDIS['wheat'] || [];
  
  const mandis = React.useMemo(() => {
    if (!selectedState) return rawMandis;
    const stateMatched = rawMandis.filter((m) => m.state.toLowerCase() === selectedState.toLowerCase());
    return stateMatched.length > 0 ? stateMatched : rawMandis;
  }, [rawMandis, selectedState]);

  const maxNetRealization = mandis.length > 0 ? Math.max(...mandis.map((m) => m.netFarmerRealization)) : 0;
  const minDistance = mandis.length > 0 ? Math.min(...mandis.map((m) => m.distanceKm)) : 0;

  const sortedMandis = [...mandis].sort((a, b) => {
    if (sortBy === 'payout') {
      return b.netFarmerRealization - a.netFarmerRealization;
    }
    if (sortBy === 'distance') {
      return a.distanceKm - b.distanceKm;
    }
    if (sortBy === 'price') {
      return b.spotPrice - a.spotPrice;
    }
    return 0;
  });

  const trendData = [
    { date: 'Aug 01', spotPrice: 2540, terminalPrice: 2720, mspBenchmark: 2425, arrivalTonnes: 850 },
    { date: 'Aug 06', spotPrice: 2580, terminalPrice: 2760, mspBenchmark: 2425, arrivalTonnes: 920 },
    { date: 'Aug 11', spotPrice: 2610, terminalPrice: 2800, mspBenchmark: 2425, arrivalTonnes: 980 },
    { date: 'Aug 16', spotPrice: 2640, terminalPrice: 2830, mspBenchmark: 2425, arrivalTonnes: 1100 },
    { date: 'Aug 21', spotPrice: 2650, terminalPrice: 2820, mspBenchmark: 2425, arrivalTonnes: 1250 },
    { date: 'Aug 26', spotPrice: 2680, terminalPrice: 2850, mspBenchmark: 2425, arrivalTonnes: 1050 },
    { date: 'Today', spotPrice: 2720, terminalPrice: 2890, mspBenchmark: 2425, arrivalTonnes: 950 },
    { date: 'Sep 05 (F)', spotPrice: 2760, terminalPrice: 2940, mspBenchmark: 2425, arrivalTonnes: 820 },
    { date: 'Sep 10 (F)', spotPrice: 2810, terminalPrice: 3010, mspBenchmark: 2425, arrivalTonnes: 740 },
    { date: 'Sep 15 (F)', spotPrice: 2860, terminalPrice: 3080, mspBenchmark: 2425, arrivalTonnes: 680 },
    { date: 'Sep 20 (F)', spotPrice: 2910, terminalPrice: 3140, mspBenchmark: 2425, arrivalTonnes: 620 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-stone-900 pb-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono mb-3">
            <TrendingUp className="w-4 h-4 text-[#1b4332]" />
            <span>APMC Live Mandi Rate Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-stone-900">
            Statewide Mandi Trends & Arbitrage Analytics
          </h1>
          <p className="mt-1 text-stone-500 text-xs sm:text-sm leading-relaxed">
            Compare spot prices, transport freight costs, and net realization payouts across regional APMC markets.
          </p>
        </div>
      </div>

      {/* Selector & Filter Controls Bar */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-[11px] font-extrabold text-stone-400 uppercase tracking-wider mb-1 font-mono">
              SELECT COMMODITY
            </label>
            <CustomSelect
              value={selectedCropId}
              onChange={(val) => setSelectedCropId(val)}
              options={CROP_MASTER_LIST.map((c) => ({
                value: c.id,
                label: getLocalizedCropName(c.id, currentLanguage, c.name),
              }))}
              dropdownWidth="w-64"
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-stone-400 uppercase tracking-wider mb-1 font-mono">
              SORT PREFERENCE
            </label>
            <CustomSelect
              value={sortBy}
              onChange={(val) => setSortBy(val as SortOption)}
              options={[
                { value: 'payout', label: 'Highest Net Farmer Payout' },
                { value: 'distance', label: 'Nearest Distance' },
                { value: 'price', label: 'Highest Mandi Spot Price' },
              ]}
              dropdownWidth="w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            onClick={() => setMandiViewMode('cards')}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mandiViewMode === 'cards' ? 'bg-[#1b4332] text-white font-extrabold shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Card Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMandiViewMode('table')}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mandiViewMode === 'table' ? 'bg-[#1b4332] text-white font-extrabold shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Detailed Table View"
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold font-display text-stone-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#1b4332]" />
              <span>30-Day Agmarknet Spot Prices & Forward AI Forecast</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5 font-mono">
              Local Mandi vs Regional Terminal Hub vs Statutory MSP (₹{selectedCrop.defaultMsp}/Qtl)
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderColor: '#e2e8f0', 
                  borderRadius: '12px',
                  color: '#0f172a',
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#475569' }} />
              <Area type="monotone" dataKey="terminalPrice" stroke="#0284c7" fill="#0284c7" fillOpacity={0.1} name="Terminal Hub Price" />
              <Area type="monotone" dataKey="spotPrice" stroke="#059669" fill="#059669" fillOpacity={0.15} name="Local APMC Spot Price" />
              <Line type="monotone" dataKey="mspBenchmark" stroke="#d97706" strokeWidth={2} strokeDasharray="4 4" name="Statutory MSP Floor" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mandi Cards / Table View */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold font-display text-stone-900 flex items-center justify-between">
          <span>APMC Arbitrage Opportunities for {selectedCrop.name}</span>
          <span className="text-xs font-mono text-emerald-800 font-bold">{sortedMandis.length} APMC Markets Monitored</span>
        </h3>

        {mandiViewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedMandis.map((m) => {
              const isBest = m.netFarmerRealization === maxNetRealization;
              return (
                <div
                  key={m.id}
                  className={`bg-white rounded-2xl p-5 border shadow-sm transition-all flex flex-col justify-between space-y-3 ${
                    isBest ? 'border-2 border-[#1b4332] bg-white shadow-sm' : 'border-stone-200/80 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-extrabold text-stone-900 text-base font-display">{m.name}</h4>
                      {isBest && (
                        <span className="px-2.5 py-0.5 bg-[#1b4332] text-white font-extrabold rounded-full text-[10px] uppercase font-mono">
                          Best Payout
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500">{m.district}, {m.state} • {m.distanceKm} km away</p>

                    <div className="mt-4 p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 font-mono text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Spot Price:</span>
                        <strong className="text-stone-900">₹{m.spotPrice}/Qtl</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Freight Cost:</span>
                        <strong className="text-amber-800">-₹{m.freightCostPerQtl}/Qtl</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Mandi Fee:</span>
                        <strong className="text-stone-700">{m.handlingAndMandiFeePercent}%</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between font-mono">
                    <span className="text-xs text-stone-500">Net Farmer Payout:</span>
                    <strong className="text-lg font-black text-[#1b4332]">₹{m.netFarmerRealization}/Qtl</strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {mandiViewMode === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] font-extrabold">
                  <th className="py-3 px-4">APMC Market</th>
                  <th className="py-3 px-4">Distance</th>
                  <th className="py-3 px-4">Spot Price</th>
                  <th className="py-3 px-4">Daily Trend</th>
                  <th className="py-3 px-4">Freight Deduction</th>
                  <th className="py-3 px-4 text-right">Net Farmer Realization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {sortedMandis.map((m) => (
                  <tr key={m.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-stone-900 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#1b4332] flex-shrink-0" />
                      <div>
                        <div>{m.name}</div>
                        <div className="text-[10px] text-stone-500 font-normal">{m.district}, {m.state}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">{m.distanceKm} km ({m.distanceHours}h)</td>
                    <td className="py-3.5 px-4 font-bold text-stone-900">₹{m.spotPrice}/Qtl</td>
                    <td className="py-3.5 px-4">
                      {m.dailyPriceChange >= 0 ? (
                        <span className="text-emerald-700 font-bold">+₹{m.dailyPriceChange}</span>
                      ) : (
                        <span className="text-rose-600 font-bold">{m.dailyPriceChange}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">-₹{m.freightCostPerQtl}/Qtl</td>
                    <td className="py-3.5 px-4 text-right font-black text-sm text-[#1b4332]">
                      ₹{m.netFarmerRealization}/Qtl
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
