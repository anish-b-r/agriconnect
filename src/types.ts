export type Language = 'en' | 'hi' | 'pa' | 'mr' | 'te' | 'ta' | 'kn' | 'gu' | 'bn';

export interface CropMasterData {
  id: string;
  name: string;
  category: string;
  hindiName: string;
  defaultMsp: number;
  typicalYieldPerAcre: number;
  growthDurationDays: number;
  optimalMoisture: number;
  unit: string;
  standardCoP: number;
  demandSeason: string;
  imageIcon: string;
  varieties?: string[];
  [key: string]: any;
}

export interface QualityParameters {
  moisturePercent?: number;
  moistureContent?: number;
  foreignMatterPercent?: number;
  foreignMatter?: number;
  grainAdmixturePercent?: number;
  admixturePercent?: number;
  damagedGrainsPercent?: number;
  brokenGrainsOrDamaged?: number;
  grainSizeOrCount?: string;
  colorAndLuster?: string;
  grade?: 'A+' | 'A' | 'B' | 'C' | string;
  [key: string]: any;
}

export interface MandiRecord {
  id: string;
  mandiName?: string;
  name?: string;
  district: string;
  state: string;
  cropId?: string;
  minPrice?: number;
  maxPrice?: number;
  modalPrice?: number;
  spotPrice?: number;
  dailyPriceChange?: number;
  freightCostPerQtl?: number;
  handlingAndMandiFeePercent?: number;
  arrivalVolumeTonnes?: number;
  arrivals24hTonnes?: number;
  arrivalTrend?: 'up' | 'down' | 'stable' | string;
  netFarmerRealization?: number;
  distanceHours?: number;
  date?: string;
  distanceKm?: number;
  verifiedApmc?: boolean;
  [key: string]: any;
}

export interface BuyerOrder {
  id: string;
  buyerName: string;
  company?: string;
  companyName?: string;
  buyerType?: string;
  trustRating?: number;
  location?: string;
  deliveryLocation?: string;
  contactEmail?: string;
  contactPhone?: string;
  cropId?: string;
  cropName?: string;
  requirements?: string | string[];
  targetQuantityTonnes?: number;
  targetQuantityQuintals?: number;
  fulfilledQuantityQuintals?: number;
  offeredPricePerQtl?: number;
  requiredGrade?: string;
  gradeRequired?: string;
  paymentTerms?: string;
  escrowSecured?: boolean;
  verifiedBuyer?: boolean;
  validUntil?: string;
  [key: string]: any;
}

export interface MarketLinkageContract {
  id: string;
  contractCode?: string;
  batchId?: string;
  farmerName?: string;
  farmerPhone?: string;
  buyerName?: string;
  buyerCompany?: string;
  cropId?: string;
  cropName?: string;
  quantityQtl?: number;
  quantityQuintals?: number;
  agreedPricePerQtl?: number;
  totalValue?: number;
  totalDealValue?: number;
  freightArrangement?: string;
  contractDate?: string;
  deliveryDueDate?: string;
  qualitySpecSheet?: string;
  escrowStatus?: string;
  createdDate?: string;
  deliveryLocation?: string;
  paymentMode?: string;
  bankReference?: string;
  escrowAccountRef?: string;
  paymentReleasedDate?: string;
  logisticsPartner?: string;
  notes?: string;
  contractPdfUrl?: string;
  [key: string]: any;
}

export interface FarmerBatchListing {
  id?: string;
  batchCode?: string;
  farmerName?: string;
  cropId?: string;
  cropName?: string;
  variety?: string;
  village?: string;
  quantityQtl?: number;
  availableQuantityQuintals?: number;
  askingPrice?: number;
  askingPricePerQtl?: number;
  fairScore?: number;
  fairPriceFloor?: number;
  fairBaselinePrice?: number;
  estimatedCostOfProduction?: number;
  mspBenchmark?: number;
  createdDate?: string;
  qualityGrade?: string;
  harvestDate?: string;
  district?: string;
  state?: string;
  status?: 'Listed' | 'Contracted' | 'Sold' | 'Draft' | string;
  qualityParams?: any;
  inspectionReport?: any;
  bidsReceived?: any[];
  [key: string]: any;
}

export interface YieldPredictionInput {
  cropId?: string;
  variety?: string;
  acreage?: number;
  sowingDate?: string;
  district?: string;
  state?: string;
  region?: string;
  irrigationType?: string;
  irrigationMethod?: string;
  fertilizerUsed?: string;
  soilHealth?: string;
  pestIncidence?: string;
  soil?: any;
  costs?: any;
  weatherRisk?: string;
  [key: string]: any;
}

export interface YieldPredictionResult {
  cropId: string;
  estimatedYieldQuintals: number;
  yieldPerAcre: number;
  confidenceScore: number;
  weatherRiskLevel: 'Low' | 'Moderate' | 'High' | string;
  recommendedAction: string;
  estimatedGrossRevenue: number;
  estimatedCostOfProduction: number;
  estimatedNetProfit: number;
  [key: string]: any;
}

export interface FairPriceAssessment {
  cropId: string;
  fairScore: number;
  recommendedFloorPrice: number;
  mspPrice: number;
  mandiModalPrice: number;
  qualityAdjustedPrice: number;
  grade: string;
  riskFactors: string[];
  marketDemand: 'High' | 'Medium' | 'Low' | string;
  [key: string]: any;
}

export interface DailyWeatherForecast {
  day: string;
  date: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
  rainProbability: number;
  icon: string;
  harvestSuitability?: string;
  [key: string]: any;
}

export interface WeatherAlertsData {
  district: string;
  currentTemp: number;
  humidity: number;
  rainfallMm: number;
  windSpeedKm: number;
  alerts: Array<{
    id: string;
    severity: 'low' | 'medium' | 'high' | string;
    message: string;
    date: string;
  }>;
  forecast: DailyWeatherForecast[];
  [key: string]: any;
}

export interface HarvestWeatherRisk {
  cropId: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | string;
  impact: string;
  advisory: string;
  [key: string]: any;
}

export interface VernacularMessage {
  id: string;
  sender: 'user' | 'ai' | 'farmer' | string;
  text: string;
  timestamp: string;
  language?: Language;
  audioUrl?: string;
  suggestedAction?: string;
  audioAvailable?: boolean;
  [key: string]: any;
}

export interface MongoUser {
  _id?: string;
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  role?: 'farmer' | 'buyer' | 'admin' | string;
  district?: string;
  taluk?: string;
  state?: string;
  preferredLanguage?: Language;
  registeredDate?: string;
  createdAt?: string;
  verified?: boolean;
  totalTransactions?: number;
  reputationScore?: number;
  [key: string]: any;
}

export interface MongoCropListing {
  _id?: string;
  id?: string;
  farmerId?: string;
  farmer_id?: string;
  farmerName?: string;
  cropId?: string;
  cropName?: string;
  crop_name?: string;
  variety?: string;
  quantityQtl?: number;
  quantity_kg?: number;
  askingPrice?: number;
  asking_price?: number;
  fairScore?: number;
  fairscore_at_listing?: number;
  qualityGrade?: string;
  quality_grade?: string;
  moisture_percent?: number;
  harvest_date?: string;
  district?: string;
  state?: string;
  status?: string;
  createdAt?: string;
  created_at?: string;
  [key: string]: any;
}

export interface MongoPriceHistory {
  _id?: string;
  id?: string;
  cropId?: string;
  crop_name?: string;
  mandiName?: string;
  market?: string;
  district?: string;
  modalPrice?: number;
  modal_price?: number;
  minPrice?: number;
  min_price?: number;
  maxPrice?: number;
  max_price?: number;
  arrivals_tonnes?: number;
  date?: string;
  [key: string]: any;
}

export interface MongoFairScoreForecast {
  _id?: string;
  id?: string;
  cropId?: string;
  crop_name?: string;
  district?: string;
  score?: number;
  confidence_score?: number;
  oversupply_risk?: string | number | boolean;
  predicted_band_min?: number;
  predicted_band_max?: number;
  forecastDate?: string;
  forecast_date?: string;
  generated_at?: string;
  trend?: 'up' | 'down' | 'stable' | string;
  key_drivers?: any;
  [key: string]: any;
}

export interface MongoTransaction {
  _id?: string;
  id?: string;
  listingId?: string;
  listing_id?: string;
  farmerName?: string;
  buyerName?: string;
  buyer_id?: string;
  cropName?: string;
  quantityQtl?: number;
  quantity?: number;
  pricePerQtl?: number;
  agreed_price?: number;
  totalAmount?: number;
  notes?: string;
  payment_reference?: string;
  status?: string;
  createdAt?: string;
  timestamp?: string;
  [key: string]: any;
}

export interface MongoDbStatus {
  isConnected?: boolean;
  connected?: boolean;
  usingCloudMongo?: boolean;
  uriConfigured?: boolean;
  mode?: 'cloud' | 'in-memory' | string;
  dbName?: string;
  connectionUri?: string;
  collections?: any;
  stats?: {
    usersCount: number;
    listingsCount: number;
    priceRecordsCount: number;
    forecastsCount: number;
    transactionsCount: number;
  };
  [key: string]: any;
}
