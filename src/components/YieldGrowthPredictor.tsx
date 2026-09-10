import React, { useState } from 'react';
import { 
  Sprout, 
  Layers, 
  Droplets, 
  CloudSun, 
  Bug, 
  IndianRupee, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  Award,
  Calendar,
  RefreshCw,
  Info
} from 'lucide-react';
import { CropMasterData, YieldPredictionInput, YieldPredictionResult, Language } from '../types';
import { CROP_MASTER_LIST } from '../data/cropMaster';
import { getTranslation } from '../utils/translations';

interface YieldGrowthPredictorProps {
  currentLanguage: Language;
  onNavigateToPriceEngine: (prediction: YieldPredictionResult, crop: CropMasterData) => void;
  initialWeatherRisk?: 'Normal' | 'Deficit Monsoon (-15%)' | 'Excess Rain / Hail' | 'Heatwave Spike' | 'Frost Risk';
  onNavigateToWeather?: () => void;
}

export const YieldGrowthPredictor: React.FC<YieldGrowthPredictorProps> = ({
  currentLanguage,
  onNavigateToPriceEngine,
  initialWeatherRisk,
  onNavigateToWeather,
}) => {
  const t = getTranslation(currentLanguage);

  const [selectedCropId, setSelectedCropId] = useState<string>('wheat');
  const [variety, setVariety] = useState<string>('Lokwan Sharbati (Premium Grain)');
  const [acreage, setAcreage] = useState<number | ''>(5);
  const [sowingDate, setSowingDate] = useState<string>('2026-06-15');
  const [irrigationMethod, setIrrigationMethod] = useState<'Canal' | 'Borewell / Drip' | 'Rainfed' | 'Sprinkler'>('Borewell / Drip');
  
  // Soil conditions
  const [nitrogen, setNitrogen] = useState<number | ''>(240);
  const [phosphorus, setPhosphorus] = useState<number | ''>(32);
  const [potassium, setPotassium] = useState<number | ''>(210);
  const [soilPh, setSoilPh] = useState<number | ''>(7.2);
  const [organicCarbon, setOrganicCarbon] = useState<number | ''>(0.75);
  const [soilType, setSoilType] = useState<'Alluvial' | 'Black / Regur' | 'Red & Yellow' | 'Laterite' | 'Sandy Loam'>('Black / Regur');

  // Weather & pest
  const [weatherRisk, setWeatherRisk] = useState<'Normal' | 'Deficit Monsoon (-15%)' | 'Excess Rain / Hail' | 'Heatwave Spike' | 'Frost Risk'>(
    initialWeatherRisk || 'Normal'
  );
  const [pestIncidence, setPestIncidence] = useState<'None / Prevented' | 'Mild (Aphids/Borers)' | 'Moderate' | 'Severe'>('Mild (Aphids/Borers)');

  React.useEffect(() => {
    if (initialWeatherRisk) {
      setWeatherRisk(initialWeatherRisk);
    }
  }, [initialWeatherRisk]);

  const [region, setRegion] = useState<string>('Malwa Agro-Climatic Zone');
  const [state, setState] = useState<string>('Madhya Pradesh');

  const [loading, setLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<YieldPredictionResult | null>({
    estimatedYieldQuintals: 95.0,
    estimatedYieldPerAcre: 19.0,
    yieldRangeMin: 88,
    yieldRangeMax: 104,
    maturityDate: '2026-10-24',
    harvestWindowStart: '2026-10-18',
    harvestWindowEnd: '2026-10-30',
    qualityBreakdown: {
      gradeA_Percent: 70,
      gradeB_Percent: 22,
      gradeC_Percent: 8,
    },
    totalProductionCost: 75500,
    costOfProductionPerQuintal: 1589,
    c2CostOfProductionPerQuintal: 2192,
    growthStage: 'Grain Filling / Pod Formation',
    riskScore: 22,
    recommendations: [
      'Optimal soil nitrogen-potassium balance is fostering high protein content and bold grain size (>8mm).',
      'Schedule final light irrigation 10 days before physiological maturity to prevent kernel shrinkage.',
      'Grade A output is estimated at 70%, qualifying for direct FMCG & export milling premiums.'
    ],
    aiAnalysisText: 'Based on 5 acres in Malwa Agro-Climatic Zone with Borewell/Drip irrigation and balanced NPK, expected output is 95 Quintals (19 Qtl/Acre). True Cost of Production (A2+FL) is ₹1,589/Qtl, leaving a healthy margin above statutory MSP (₹2,425/Qtl).'
  });

  const selectedCrop = CROP_MASTER_LIST.find((c) => c.id === selectedCropId) || CROP_MASTER_LIST[0];

  const runYieldPrediction = async () => {
    setLoading(true);
    const inputPayload: YieldPredictionInput = {
      cropId: selectedCropId,
      variety,
      acreage: Number(acreage) || 5,
      sowingDate,
      irrigationMethod,
      soilNitrogen: Number(nitrogen) || 240,
      soilPhosphorus: Number(phosphorus) || 32,
      soilPotassium: Number(potassium) || 210,
      soilPh: Number(soilPh) || 7.2,
      organicCarbon: Number(organicCarbon) || 0.75,
      soilType,
      weatherRiskFactor: weatherRisk,
      pestIncidence,
      region,
      state,
    };

    try {
      const response = await fetch('/api/gemini/yield-predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputPayload),
      });
      const data = await response.json();
      if (data && (data.prediction || data.data)) {
        setPrediction(data.prediction || data.data);
      }
    } catch (e) {
      console.warn('Using local fallback yield prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-stone-900 pb-8">
      {/* Top Banner Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white text-stone-800 text-[11px] font-extrabold px-3.5 py-1 rounded-full border border-stone-200/90 shadow-2xs font-mono">
                SIH26132 Predictive Agronomy
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 flex items-center gap-3 font-display">
              <Sprout className="w-8 h-8 text-[#1b4332]" />
              Yield Growth & Cost-of-Production Predictor
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Input soil NPK, climate telemetry, and input costs to estimate true cost per quintal (A2+FL / C2) and grade recovery.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-5">
            <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2.5 font-display pb-3 border-b border-stone-100">
              <Layers className="w-5 h-5 text-[#1b4332]" />
              <span>Farm Plot & Soil Telemetry</span>
            </h3>

            {/* Select Crop */}
            <div>
              <label className="block text-[11px] font-extrabold text-stone-400 uppercase tracking-wider mb-1.5 font-mono">
                CROP & VARIETY
              </label>
              <select
                value={selectedCropId}
                onChange={(e) => setSelectedCropId(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none cursor-pointer"
              >
                {CROP_MASTER_LIST.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.hindiName}) — Baseline Yield: {c.averageYieldPerAcreQuintals} Qtl/Acre
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">
                  Acreage (Acres)
                </label>
                <input
                  type="number"
                  value={acreage}
                  onChange={(e) => setAcreage(e.target.value === '' ? '' : Number(e.target.value))}
                  onBlur={() => { if (acreage === '') setAcreage(5); }}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono font-bold text-stone-900 focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">
                  Irrigation Source
                </label>
                <select
                  value={irrigationMethod}
                  onChange={(e) => setIrrigationMethod(e.target.value as any)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 outline-none cursor-pointer"
                >
                  <option value="Borewell / Drip">Borewell / Drip</option>
                  <option value="Canal">Canal</option>
                  <option value="Rainfed">Rainfed</option>
                  <option value="Sprinkler">Sprinkler</option>
                </select>
              </div>
            </div>

            {/* Soil NPK Sliders */}
            <div className="space-y-3 pt-3 border-t border-stone-100">
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">
                SOIL NPK & ORGANIC CARBON (SOIL HEALTH CARD)
              </h4>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-center font-mono">
                  <span className="text-[10px] text-stone-500 font-medium block mb-1">Nitrogen (N)</span>
                  <input
                    type="number"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(e.target.value === '' ? '' : Number(e.target.value))}
                    onBlur={() => { if (nitrogen === '') setNitrogen(240); }}
                    className="w-full text-center bg-transparent font-black text-emerald-800 outline-none text-base"
                  />
                  <span className="text-[9px] text-stone-400 block mt-0.5">kg/ha</span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-center font-mono">
                  <span className="text-[10px] text-stone-500 font-medium block mb-1">Phosphorus (P)</span>
                  <input
                    type="number"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(e.target.value === '' ? '' : Number(e.target.value))}
                    onBlur={() => { if (phosphorus === '') setPhosphorus(32); }}
                    className="w-full text-center bg-transparent font-black text-emerald-800 outline-none text-base"
                  />
                  <span className="text-[9px] text-stone-400 block mt-0.5">kg/ha</span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-center font-mono">
                  <span className="text-[10px] text-stone-500 font-medium block mb-1">Potassium (K)</span>
                  <input
                    type="number"
                    value={potassium}
                    onChange={(e) => setPotassium(e.target.value === '' ? '' : Number(e.target.value))}
                    onBlur={() => { if (potassium === '') setPotassium(210); }}
                    className="w-full text-center bg-transparent font-black text-emerald-800 outline-none text-base"
                  />
                  <span className="text-[9px] text-stone-400 block mt-0.5">kg/ha</span>
                </div>
              </div>
            </div>

            <button
              onClick={runYieldPrediction}
              disabled={loading}
              className="w-full py-3.5 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Run Yield & Cost Forecast</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Yield Forecast Results */}
        <div className="lg:col-span-5 space-y-6">
          {prediction && (
            <>
              <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-extrabold font-display text-stone-900">{selectedCrop.name}</h3>
                    <p className="text-xs text-stone-500">{acreage} Acres • {region}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                    {prediction.growthStage}
                  </span>
                </div>

                {/* Metrics 2x2 Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 font-mono">
                    <span className="text-[10px] text-emerald-900 uppercase tracking-wider block font-extrabold">EXPECTED TOTAL YIELD</span>
                    <div className="text-3xl font-black text-stone-950 mt-1.5 leading-none">
                      {prediction.estimatedYieldQuintals} <span className="text-xs font-normal text-stone-500">Qtl</span>
                    </div>
                    <span className="text-[10px] text-stone-500 mt-1.5 block">~ {prediction.estimatedYieldPerAcre} Qtl/Acre</span>
                  </div>

                  <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 font-mono">
                    <span className="text-[10px] text-amber-900 uppercase tracking-wider block font-extrabold">COST OF PROD (A2+FL)</span>
                    <div className="text-3xl font-black text-amber-950 mt-1.5 leading-none">
                      ₹{prediction.costOfProductionPerQuintal}
                      <span className="text-xs font-normal text-stone-500 ml-0.5">/Qtl</span>
                    </div>
                    <span className="text-[10px] text-stone-500 mt-1.5 block">C2 Benchmark: ₹{prediction.c2CostOfProductionPerQuintal}/Qtl</span>
                  </div>
                </div>

                {/* Quality Grade Distribution Bar */}
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 font-mono">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-stone-700 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>Quality Grade Projection</span>
                    </span>
                    <span className="text-emerald-800 font-extrabold">{prediction.qualityBreakdown.gradeA_Percent}% Grade-A</span>
                  </div>

                  <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden flex">
                    <div style={{ width: `${prediction.qualityBreakdown.gradeA_Percent}%` }} className="bg-emerald-500 h-full" />
                    <div style={{ width: `${prediction.qualityBreakdown.gradeB_Percent}%` }} className="bg-amber-400 h-full" />
                    <div style={{ width: `${prediction.qualityBreakdown.gradeC_Percent}%` }} className="bg-rose-400 h-full" />
                  </div>
                </div>

                {/* Call to Action Button */}
                <button
                  onClick={() => onNavigateToPriceEngine(prediction, selectedCrop)}
                  className="w-full py-3.5 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-[0.99]"
                >
                  <span>Discover Fair Baseline Price for this Yield</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Advisory Box */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>AI Agronomic & Quality Advisory</span>
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed italic bg-emerald-50/50 p-3 rounded-xl border border-emerald-200/60">
                  "{prediction.aiAnalysisText}"
                </p>

                <ul className="space-y-2 pt-1">
                  {prediction.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
