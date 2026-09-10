import { MongoClient, Db, Collection } from 'mongodb';
import dotenv from 'dotenv';
import { 
  MongoUser, 
  MongoCropListing, 
  MongoPriceHistory, 
  MongoFairScoreForecast, 
  MongoTransaction, 
  MongoDbStatus 
} from '../src/types';

dotenv.config();

// Default database name in MongoDB
const DB_NAME = 'krishisetu';

// In-memory fallback stores for when MONGODB_URI is not set or cluster is connecting
let inMemoryUsers: MongoUser[] = [];
let inMemoryCropListings: MongoCropListing[] = [];
let inMemoryPriceHistory: MongoPriceHistory[] = [];
let inMemoryFairScoreForecasts: MongoFairScoreForecast[] = [];
let inMemoryTransactions: MongoTransaction[] = [];

// Track MongoDB client state
let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;
let isConnectedToCloud = false;
let connectionAttempted = false;

// INITIAL SEED DATA ACCORDING TO USER'S SCHEMA
const INITIAL_USERS: MongoUser[] = [
  {
    id: 'usr-f-01',
    name: 'Sardar Gurpreet Singh',
    phone: '+91 98765 43210',
    role: 'farmer',
    district: 'Ludhiana',
    taluk: 'Khanna',
    verified: true,
    email: 'gurpreet.farm@krishisetu.in',
    createdAt: '2026-07-15T09:00:00Z',
  },
  {
    id: 'usr-f-02',
    name: 'Kailash Patidar & FPO Collective',
    phone: '+91 98123 45678',
    role: 'farmer',
    district: 'Indore',
    taluk: 'Sanwer',
    verified: true,
    email: 'patidar.fpo@krishisetu.in',
    createdAt: '2026-07-18T11:20:00Z',
  },
  {
    id: 'usr-f-03',
    name: 'Rameshwar Patel',
    phone: '+91 97234 56789',
    role: 'farmer',
    district: 'Rajkot',
    taluk: 'Jetpur',
    verified: true,
    email: 'rameshwar.patel@krishisetu.in',
    createdAt: '2026-07-22T08:15:00Z',
  },
  {
    id: 'usr-f-04',
    name: 'Dattatraya Shinde',
    phone: '+91 99345 67890',
    role: 'farmer',
    district: 'Nashik',
    taluk: 'Niphad',
    verified: true,
    email: 'dattatraya.shinde@krishisetu.in',
    createdAt: '2026-07-25T14:40:00Z',
  },
  {
    id: 'usr-b-01',
    name: 'Vikram Singhania',
    phone: '+91 98450 12345',
    role: 'buyer',
    district: 'Delhi NCR / Central Hub',
    taluk: 'Agri Procurement Cell',
    verified: true,
    email: 'procurement.singhania@itcagri.com',
    createdAt: '2026-06-10T10:00:00Z',
  },
  {
    id: 'usr-b-02',
    name: 'Anand Mehra (Adani Wilmar)',
    phone: '+91 98210 98765',
    role: 'buyer',
    district: 'Indore',
    taluk: 'Solvent Extraction Hub',
    verified: true,
    email: 'anand.mehra@adaniwilmar.com',
    createdAt: '2026-06-12T12:30:00Z',
  },
  {
    id: 'usr-b-03',
    name: 'Sunil Agarwal (Vardhman Textiles)',
    phone: '+91 98140 54321',
    role: 'buyer',
    district: 'Ludhiana',
    taluk: 'Spinning Mill Division',
    verified: true,
    email: 'rawcotton@vardhmangroup.com',
    createdAt: '2026-06-20T16:00:00Z',
  },
];

const INITIAL_CROP_LISTINGS: MongoCropListing[] = [
  {
    id: 'list-01',
    farmer_id: 'usr-f-01',
    crop_name: 'Wheat (Sharbati / Lokwan)',
    quantity_kg: 9500, // 95 Quintals
    quality_grade: 'Grade A',
    district: 'Ludhiana',
    harvest_date: '2026-08-25',
    asking_price: 28.50, // ₹28.5/kg -> ₹2,850/Qtl
    fairscore_at_listing: 94,
    status: 'active',
    variety: 'Lokwan Sharbati Bold',
    moisture_percent: 11.5,
    created_at: '2026-08-26T08:00:00Z',
  },
  {
    id: 'list-02',
    farmer_id: 'usr-f-02',
    crop_name: 'Soybean (JS 9560)',
    quantity_kg: 6000, // 60 Quintals
    quality_grade: 'Grade A',
    district: 'Indore',
    harvest_date: '2026-08-20',
    asking_price: 53.50, // ₹53.5/kg -> ₹5,350/Qtl
    fairscore_at_listing: 91,
    status: 'negotiating',
    variety: 'JS 9560 Yellow',
    moisture_percent: 10.8,
    created_at: '2026-08-21T10:00:00Z',
  },
  {
    id: 'list-03',
    farmer_id: 'usr-f-03',
    crop_name: 'Cotton (Shankar-6)',
    quantity_kg: 4500, // 45 Quintals
    quality_grade: 'Grade A',
    district: 'Rajkot',
    harvest_date: '2026-08-18',
    asking_price: 81.00, // ₹81.0/kg -> ₹8,100/Qtl
    fairscore_at_listing: 89,
    status: 'active',
    variety: 'Shankar-6 Long Staple 29mm',
    moisture_percent: 7.5,
    created_at: '2026-08-19T09:30:00Z',
  },
  {
    id: 'list-04',
    farmer_id: 'usr-f-04',
    crop_name: 'Onion (Red Garwa)',
    quantity_kg: 12000, // 120 Quintals
    quality_grade: 'Grade B',
    district: 'Nashik',
    harvest_date: '2026-08-22',
    asking_price: 24.00, // ₹24.0/kg -> ₹2,400/Qtl
    fairscore_at_listing: 83,
    status: 'sold',
    variety: 'Red Garwa Winter Crop',
    moisture_percent: 13.0,
    created_at: '2026-08-23T11:00:00Z',
  },
  {
    id: 'list-05',
    farmer_id: 'usr-f-01',
    crop_name: 'Basmati Paddy (PB-1121)',
    quantity_kg: 8000, // 80 Quintals
    quality_grade: 'Grade A',
    district: 'Ludhiana',
    harvest_date: '2026-08-28',
    asking_price: 39.50, // ₹39.5/kg -> ₹3,950/Qtl
    fairscore_at_listing: 96,
    status: 'active',
    variety: 'Pusa Basmati 1121 Extra Long',
    moisture_percent: 12.0,
    created_at: '2026-08-29T14:15:00Z',
  },
];

const INITIAL_PRICE_HISTORY: MongoPriceHistory[] = [
  {
    id: 'ph-01',
    crop_name: 'Wheat',
    market: 'Azadpur APMC',
    district: 'Delhi',
    date: '2026-09-06',
    min_price: 2720,
    max_price: 2950,
    modal_price: 2850,
    arrivals_tonnes: 420,
  },
  {
    id: 'ph-02',
    crop_name: 'Wheat',
    market: 'Khanna Mandi',
    district: 'Ludhiana',
    date: '2026-09-06',
    min_price: 2600,
    max_price: 2790,
    modal_price: 2720,
    arrivals_tonnes: 610,
  },
  {
    id: 'ph-03',
    crop_name: 'Soybean',
    market: 'Indore APMC',
    district: 'Indore',
    date: '2026-09-06',
    min_price: 4850,
    max_price: 5280,
    modal_price: 5120,
    arrivals_tonnes: 340,
  },
  {
    id: 'ph-04',
    crop_name: 'Cotton',
    market: 'Rajkot APMC',
    district: 'Rajkot',
    date: '2026-09-06',
    min_price: 7600,
    max_price: 8150,
    modal_price: 7920,
    arrivals_tonnes: 190,
  },
  {
    id: 'ph-05',
    crop_name: 'Onion',
    market: 'Lasalgaon APMC',
    district: 'Nashik',
    date: '2026-09-06',
    min_price: 1800,
    max_price: 2500,
    modal_price: 2280,
    arrivals_tonnes: 850,
  },
  {
    id: 'ph-06',
    crop_name: 'Potato',
    market: 'Agra Mandi',
    district: 'Agra',
    date: '2026-09-06',
    min_price: 1150,
    max_price: 1420,
    modal_price: 1340,
    arrivals_tonnes: 510,
  },
  {
    id: 'ph-07',
    crop_name: 'Basmati Paddy',
    market: 'Karnal APMC',
    district: 'Karnal',
    date: '2026-09-06',
    min_price: 3400,
    max_price: 3850,
    modal_price: 3650,
    arrivals_tonnes: 280,
  },
  {
    id: 'ph-08',
    crop_name: 'Mustard Seed',
    market: 'Jaipur APMC',
    district: 'Jaipur',
    date: '2026-09-06',
    min_price: 5200,
    max_price: 5600,
    modal_price: 5450,
    arrivals_tonnes: 310,
  },
  {
    id: 'ph-09',
    crop_name: 'Wheat',
    market: 'Azadpur APMC',
    district: 'Delhi',
    date: '2026-09-05',
    min_price: 2700,
    max_price: 2920,
    modal_price: 2815,
    arrivals_tonnes: 440,
  },
  {
    id: 'ph-10',
    crop_name: 'Soybean',
    market: 'Indore APMC',
    district: 'Indore',
    date: '2026-09-05',
    min_price: 4800,
    max_price: 5200,
    modal_price: 5040,
    arrivals_tonnes: 360,
  },
];

const INITIAL_FAIRSCORE_FORECASTS: MongoFairScoreForecast[] = [
  {
    id: 'fc-01',
    crop_name: 'Wheat (Sharbati / Lokwan)',
    district: 'Ludhiana',
    forecast_date: '2026-09-15',
    predicted_band_min: 2750,
    predicted_band_max: 2950,
    oversupply_risk: false,
    generated_at: '2026-09-07T06:00:00Z',
    confidence_score: 93,
    key_drivers: [
      'Low pipeline inventory in flour mill clusters',
      'High milling extraction demand across Punjab and Haryana',
      'Quality Grade A lots fetching 7% market premium'
    ],
  },
  {
    id: 'fc-02',
    crop_name: 'Soybean (JS 9560)',
    district: 'Indore',
    forecast_date: '2026-09-20',
    predicted_band_min: 5150,
    predicted_band_max: 5500,
    oversupply_risk: false,
    generated_at: '2026-09-07T06:00:00Z',
    confidence_score: 89,
    key_drivers: [
      'Active crushing parity from domestic solvent extractors',
      'Firm global soymeal export inquiries',
      'MSP statutory benchmark at ₹4,892/Qtl providing solid floor'
    ],
  },
  {
    id: 'fc-03',
    crop_name: 'Onion (Red Garwa)',
    district: 'Nashik',
    forecast_date: '2026-09-18',
    predicted_band_min: 1950,
    predicted_band_max: 2350,
    oversupply_risk: true,
    generated_at: '2026-09-07T06:00:00Z',
    confidence_score: 85,
    key_drivers: [
      'Substantial chawl storages releasing stock ahead of monsoon end',
      'Kharif early nursery transplanting reports on schedule',
      'Advise staggered selling or certified cold-storage holding'
    ],
  },
  {
    id: 'fc-04',
    crop_name: 'Cotton (Shankar-6)',
    district: 'Rajkot',
    forecast_date: '2026-09-25',
    predicted_band_min: 7850,
    predicted_band_max: 8300,
    oversupply_risk: false,
    generated_at: '2026-09-07T06:00:00Z',
    confidence_score: 91,
    key_drivers: [
      'Tight yarn inventory in Coimbatore and Ludhiana mills',
      'Export order bookings for medium-long staple fiber',
      'Zero oversupply risk due to localized pink bollworm reports'
    ],
  },
  {
    id: 'fc-05',
    crop_name: 'Basmati Paddy (PB-1121)',
    district: 'Ludhiana',
    forecast_date: '2026-09-30',
    predicted_band_min: 3700,
    predicted_band_max: 4150,
    oversupply_risk: false,
    generated_at: '2026-09-07T06:00:00Z',
    confidence_score: 94,
    key_drivers: [
      'Middle East export contracts signed at higher CFR prices',
      'High head-rice recovery in Grade A parboiled lots'
    ],
  },
];

const INITIAL_TRANSACTIONS: MongoTransaction[] = [
  {
    id: 'tx-101',
    listing_id: 'list-04',
    buyer_id: 'usr-b-01',
    agreed_price: 23.50, // ₹23.50/kg -> ₹2,350/Qtl
    quantity: 12000, // 12,000 kg -> 120 Qtl
    status: 'completed',
    timestamp: '2026-08-29T14:30:00Z',
    notes: 'Quality passed Agmark Grade B inspection. Direct RTGS settled to farmer bank account.',
    payment_reference: 'UTR: PUNBR589210452',
  },
  {
    id: 'tx-102',
    listing_id: 'list-02',
    buyer_id: 'usr-b-02',
    agreed_price: 53.00, // ₹53.00/kg -> ₹5,300/Qtl
    quantity: 6000, // 6,000 kg -> 60 Qtl
    status: 'escrow_locked',
    timestamp: '2026-09-02T10:15:00Z',
    notes: '100% Escrow deposit locked with KrishiSetu ICICI Custody. Gate pass generated.',
    payment_reference: 'ESCROW-REF: ADANI-KS-7741',
  },
  {
    id: 'tx-103',
    listing_id: 'list-01',
    buyer_id: 'usr-b-01',
    agreed_price: 28.50, // ₹28.50/kg -> ₹2,850/Qtl
    quantity: 9500, // 9,500 kg -> 95 Qtl
    status: 'dispatched',
    timestamp: '2026-09-05T08:45:00Z',
    notes: 'Truck loaded from Khanna cluster. Moisture verified at 11.5%. In transit to hub.',
    payment_reference: 'ESCROW-REF: ITC-KS-9012',
  },
];

// Seed in-memory storage immediately on module load
function seedInMemoryStore() {
  inMemoryUsers = [...INITIAL_USERS];
  inMemoryCropListings = [...INITIAL_CROP_LISTINGS];
  inMemoryPriceHistory = [...INITIAL_PRICE_HISTORY];
  inMemoryFairScoreForecasts = [...INITIAL_FAIRSCORE_FORECASTS];
  inMemoryTransactions = [...INITIAL_TRANSACTIONS];
}
seedInMemoryStore();

/**
 * Initialize connection to MongoDB if MONGODB_URI is provided.
 * Uses resilient timeout to avoid stalling server startup.
 */
export async function initMongoDb(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.trim() === '') {
    console.log('📦 MONGODB_URI not configured; running with active MongoDB-compatible in-memory engine.');
    return false;
  }

  const trimmedUri = uri.trim();
  if (!trimmedUri.startsWith('mongodb://') && !trimmedUri.startsWith('mongodb+srv://')) {
    console.log('📦 MONGODB_URI does not contain a valid "mongodb://" or "mongodb+srv://" prefix; running with active MongoDB-compatible in-memory engine.');
    isConnectedToCloud = false;
    return false;
  }

  if (connectionAttempted && isConnectedToCloud) {
    return true;
  }

  connectionAttempted = true;

  try {
    console.log('Connecting to MongoDB cluster...');
    mongoClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 4000,
    });

    await mongoClient.connect();
    mongoDb = mongoClient.db(DB_NAME);
    isConnectedToCloud = true;
    console.log(`Connected to MongoDB Database: "${DB_NAME}"`);

    // Create indexes on all 5 collections
    await ensureIndexes(mongoDb);

    // Seed data in MongoDB cluster if empty
    await seedCloudMongoIfEmpty(mongoDb);

    return true;
  } catch (err: any) {
    console.log(`[MongoDB Engine] No external MongoDB URI configured (${err.message}). Using high-performance MongoDB-compatible in-memory store.`);
    isConnectedToCloud = false;
    return false;
  }
}

async function ensureIndexes(db: Db) {
  try {
    await db.collection('users').createIndex({ phone: 1 }, { unique: true, sparse: true });
    await db.collection('users').createIndex({ role: 1 });
    await db.collection('crop_listings').createIndex({ farmer_id: 1 });
    await db.collection('crop_listings').createIndex({ crop_name: 1, district: 1 });
    await db.collection('crop_listings').createIndex({ status: 1 });
    await db.collection('price_history').createIndex({ crop_name: 1, market: 1, date: -1 });
    await db.collection('fairscore_forecasts').createIndex({ crop_name: 1, district: 1, forecast_date: 1 });
    await db.collection('transactions').createIndex({ listing_id: 1 });
    await db.collection('transactions').createIndex({ buyer_id: 1 });
    console.log('MongoDB schema indexes verified.');
  } catch (indexErr: any) {
    console.log('[MongoDB Engine] Index note:', indexErr.message);
  }
}

async function seedCloudMongoIfEmpty(db: Db) {
  try {
    const userCount = await db.collection('users').countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding initial records to MongoDB collections...');
      await db.collection('users').insertMany(INITIAL_USERS as any);
      await db.collection('crop_listings').insertMany(INITIAL_CROP_LISTINGS as any);
      await db.collection('price_history').insertMany(INITIAL_PRICE_HISTORY as any);
      await db.collection('fairscore_forecasts').insertMany(INITIAL_FAIRSCORE_FORECASTS as any);
      await db.collection('transactions').insertMany(INITIAL_TRANSACTIONS as any);
      console.log('Initial MongoDB seed complete.');
    }
  } catch (err: any) {
    console.log('[MongoDB Engine] Seeding note:', err.message);
  }
}

// -----------------------------------------------------------------
// DATABASE STATUS & METRICS
// -----------------------------------------------------------------
export async function getMongoDbStatus(): Promise<MongoDbStatus> {
  const uri = process.env.MONGODB_URI;
  const uriConfigured = Boolean(uri && uri.trim().length > 0);

  if (isConnectedToCloud && mongoDb) {
    try {
      const [users, crop_listings, price_history, fairscore_forecasts, transactions] = await Promise.all([
        mongoDb.collection('users').countDocuments(),
        mongoDb.collection('crop_listings').countDocuments(),
        mongoDb.collection('price_history').countDocuments(),
        mongoDb.collection('fairscore_forecasts').countDocuments(),
        mongoDb.collection('transactions').countDocuments(),
      ]);

      return {
        connected: true,
        usingCloudMongo: true,
        uriConfigured: true,
        dbName: DB_NAME,
        collections: {
          users,
          crop_listings,
          price_history,
          fairscore_forecasts,
          transactions,
        },
      };
    } catch {
      // Fallback
    }
  }

  return {
    connected: true,
    usingCloudMongo: false,
    uriConfigured,
    dbName: 'krishisetu (in-memory MongoDB)',
    collections: {
      users: inMemoryUsers.length,
      crop_listings: inMemoryCropListings.length,
      price_history: inMemoryPriceHistory.length,
      fairscore_forecasts: inMemoryFairScoreForecasts.length,
      transactions: inMemoryTransactions.length,
    },
  };
}

export async function resetAndSeedDb(): Promise<void> {
  if (isConnectedToCloud && mongoDb) {
    await mongoDb.collection('users').deleteMany({});
    await mongoDb.collection('crop_listings').deleteMany({});
    await mongoDb.collection('price_history').deleteMany({});
    await mongoDb.collection('fairscore_forecasts').deleteMany({});
    await mongoDb.collection('transactions').deleteMany({});

    await mongoDb.collection('users').insertMany(INITIAL_USERS as any);
    await mongoDb.collection('crop_listings').insertMany(INITIAL_CROP_LISTINGS as any);
    await mongoDb.collection('price_history').insertMany(INITIAL_PRICE_HISTORY as any);
    await mongoDb.collection('fairscore_forecasts').insertMany(INITIAL_FAIRSCORE_FORECASTS as any);
    await mongoDb.collection('transactions').insertMany(INITIAL_TRANSACTIONS as any);
  }

  seedInMemoryStore();
}

// -----------------------------------------------------------------
// USERS COLLECTION
// -----------------------------------------------------------------
export async function getUsers(query?: { role?: string; district?: string }): Promise<MongoUser[]> {
  if (isConnectedToCloud && mongoDb) {
    const filter: any = {};
    if (query?.role) filter.role = query.role;
    if (query?.district) filter.district = new RegExp(query.district, 'i');
    return (await mongoDb.collection('users').find(filter).toArray()) as unknown as MongoUser[];
  }

  return inMemoryUsers.filter((u) => {
    if (query?.role && u.role !== query.role) return false;
    if (query?.district && !u.district.toLowerCase().includes(query.district.toLowerCase())) return false;
    return true;
  });
}

export async function getUserById(id: string): Promise<MongoUser | null> {
  if (isConnectedToCloud && mongoDb) {
    const user = await mongoDb.collection('users').findOne({ id });
    return (user as unknown as MongoUser) || null;
  }
  return inMemoryUsers.find((u) => u.id === id) || null;
}

export async function createUser(user: Omit<MongoUser, 'id' | 'createdAt'> & { id?: string; createdAt?: string }): Promise<MongoUser> {
  const newUser: MongoUser = {
    ...user,
    id: user.id || `usr-${user.role?.[0] || 'u'}-${Date.now().toString().slice(-6)}`,
    createdAt: user.createdAt || new Date().toISOString(),
  };

  if (isConnectedToCloud && mongoDb) {
    await mongoDb.collection('users').insertOne(newUser as any);
    return newUser;
  }

  inMemoryUsers.unshift(newUser);
  return newUser;
}

// -----------------------------------------------------------------
// CROP_LISTINGS COLLECTION
// -----------------------------------------------------------------
export async function getCropListings(query?: {
  crop_name?: string;
  district?: string;
  status?: string;
  farmer_id?: string;
}): Promise<MongoCropListing[]> {
  if (isConnectedToCloud && mongoDb) {
    const filter: any = {};
    if (query?.crop_name) filter.crop_name = new RegExp(query.crop_name, 'i');
    if (query?.district) filter.district = new RegExp(query.district, 'i');
    if (query?.status) filter.status = query.status;
    if (query?.farmer_id) filter.farmer_id = query.farmer_id;
    return (await mongoDb.collection('crop_listings').find(filter).sort({ created_at: -1 }).toArray()) as unknown as MongoCropListing[];
  }

  return inMemoryCropListings.filter((c) => {
    if (query?.crop_name && !c.crop_name.toLowerCase().includes(query.crop_name.toLowerCase())) return false;
    if (query?.district && !c.district.toLowerCase().includes(query.district.toLowerCase())) return false;
    if (query?.status && c.status !== query.status) return false;
    if (query?.farmer_id && c.farmer_id !== query.farmer_id) return false;
    return true;
  });
}

export async function getCropListingById(id: string): Promise<MongoCropListing | null> {
  if (isConnectedToCloud && mongoDb) {
    const listing = await mongoDb.collection('crop_listings').findOne({ id });
    return (listing as unknown as MongoCropListing) || null;
  }
  return inMemoryCropListings.find((c) => c.id === id) || null;
}

export async function createCropListing(listing: Omit<MongoCropListing, 'id' | 'created_at'> & { id?: string; created_at?: string }): Promise<MongoCropListing> {
  const newListing: MongoCropListing = {
    ...listing,
    id: listing.id || `list-${Date.now().toString().slice(-6)}`,
    created_at: listing.created_at || new Date().toISOString(),
  };

  if (isConnectedToCloud && mongoDb) {
    await mongoDb.collection('crop_listings').insertOne(newListing as any);
    return newListing;
  }

  inMemoryCropListings.unshift(newListing);
  return newListing;
}

export async function updateCropListing(id: string, updates: Partial<MongoCropListing>): Promise<MongoCropListing | null> {
  if (isConnectedToCloud && mongoDb) {
    await mongoDb.collection('crop_listings').updateOne({ id }, { $set: updates });
    return (await mongoDb.collection('crop_listings').findOne({ id })) as unknown as MongoCropListing;
  }

  const idx = inMemoryCropListings.findIndex((c) => c.id === id);
  if (idx !== -1) {
    inMemoryCropListings[idx] = { ...inMemoryCropListings[idx], ...updates };
    return inMemoryCropListings[idx];
  }
  return null;
}

export async function deleteCropListing(id: string): Promise<boolean> {
  if (isConnectedToCloud && mongoDb) {
    const res = await mongoDb.collection('crop_listings').deleteOne({ id });
    return res.deletedCount > 0;
  }

  const initialLen = inMemoryCropListings.length;
  inMemoryCropListings = inMemoryCropListings.filter((c) => c.id !== id);
  return inMemoryCropListings.length < initialLen;
}

// -----------------------------------------------------------------
// PRICE_HISTORY COLLECTION
// -----------------------------------------------------------------
export async function getPriceHistory(query?: {
  crop_name?: string;
  market?: string;
  district?: string;
  limit?: number;
}): Promise<MongoPriceHistory[]> {
  const limit = query?.limit || 50;

  if (isConnectedToCloud && mongoDb) {
    const filter: any = {};
    if (query?.crop_name) filter.crop_name = new RegExp(query.crop_name, 'i');
    if (query?.market) filter.market = new RegExp(query.market, 'i');
    if (query?.district) filter.district = new RegExp(query.district, 'i');
    return (await mongoDb.collection('price_history').find(filter).sort({ date: -1 }).limit(limit).toArray()) as unknown as MongoPriceHistory[];
  }

  return inMemoryPriceHistory
    .filter((p) => {
      if (query?.crop_name && !p.crop_name.toLowerCase().includes(query.crop_name.toLowerCase())) return false;
      if (query?.market && !p.market.toLowerCase().includes(query.market.toLowerCase())) return false;
      if (query?.district && !p.district.toLowerCase().includes(query.district.toLowerCase())) return false;
      return true;
    })
    .slice(0, limit);
}

export async function recordPriceHistory(record: Omit<MongoPriceHistory, 'id'> & { id?: string }): Promise<MongoPriceHistory> {
  const newRecord: MongoPriceHistory = {
    ...record,
    id: record.id || `ph-${Date.now().toString().slice(-6)}`,
  };

  if (isConnectedToCloud && mongoDb) {
    await mongoDb.collection('price_history').insertOne(newRecord as any);
    return newRecord;
  }

  inMemoryPriceHistory.unshift(newRecord);
  return newRecord;
}

// -----------------------------------------------------------------
// FAIRSCORE_FORECASTS COLLECTION
// -----------------------------------------------------------------
export async function getFairScoreForecasts(query?: {
  crop_name?: string;
  district?: string;
  oversupply_risk?: boolean;
}): Promise<MongoFairScoreForecast[]> {
  if (isConnectedToCloud && mongoDb) {
    const filter: any = {};
    if (query?.crop_name) filter.crop_name = new RegExp(query.crop_name, 'i');
    if (query?.district) filter.district = new RegExp(query.district, 'i');
    if (typeof query?.oversupply_risk === 'boolean') filter.oversupply_risk = query.oversupply_risk;
    return (await mongoDb.collection('fairscore_forecasts').find(filter).sort({ forecast_date: 1 }).toArray()) as unknown as MongoFairScoreForecast[];
  }

  return inMemoryFairScoreForecasts.filter((f) => {
    if (query?.crop_name && !f.crop_name.toLowerCase().includes(query.crop_name.toLowerCase())) return false;
    if (query?.district && !f.district.toLowerCase().includes(query.district.toLowerCase())) return false;
    if (typeof query?.oversupply_risk === 'boolean' && f.oversupply_risk !== query.oversupply_risk) return false;
    return true;
  });
}

export async function createFairScoreForecast(forecast: Omit<MongoFairScoreForecast, 'id' | 'generated_at'> & { id?: string; generated_at?: string }): Promise<MongoFairScoreForecast> {
  const newForecast: MongoFairScoreForecast = {
    ...forecast,
    id: forecast.id || `fc-${Date.now().toString().slice(-6)}`,
    generated_at: forecast.generated_at || new Date().toISOString(),
  };

  if (isConnectedToCloud && mongoDb) {
    await mongoDb.collection('fairscore_forecasts').insertOne(newForecast as any);
    return newForecast;
  }

  inMemoryFairScoreForecasts.unshift(newForecast);
  return newForecast;
}

// -----------------------------------------------------------------
// TRANSACTIONS COLLECTION
// -----------------------------------------------------------------
export async function getTransactions(query?: {
  listing_id?: string;
  buyer_id?: string;
  status?: string;
}): Promise<MongoTransaction[]> {
  if (isConnectedToCloud && mongoDb) {
    const filter: any = {};
    if (query?.listing_id) filter.listing_id = query.listing_id;
    if (query?.buyer_id) filter.buyer_id = query.buyer_id;
    if (query?.status) filter.status = query.status;
    return (await mongoDb.collection('transactions').find(filter).sort({ timestamp: -1 }).toArray()) as unknown as MongoTransaction[];
  }

  return inMemoryTransactions.filter((t) => {
    if (query?.listing_id && t.listing_id !== query.listing_id) return false;
    if (query?.buyer_id && t.buyer_id !== query.buyer_id) return false;
    if (query?.status && t.status !== query.status) return false;
    return true;
  });
}

export async function createTransaction(tx: Omit<MongoTransaction, 'id' | 'timestamp'> & { id?: string; timestamp?: string }): Promise<MongoTransaction> {
  const newTx: MongoTransaction = {
    ...tx,
    id: tx.id || `tx-${Date.now().toString().slice(-6)}`,
    timestamp: tx.timestamp || new Date().toISOString(),
  };

  if (isConnectedToCloud && mongoDb) {
    await mongoDb.collection('transactions').insertOne(newTx as any);
    return newTx;
  }

  inMemoryTransactions.unshift(newTx);
  return newTx;
}

export async function updateTransaction(id: string, updates: Partial<MongoTransaction>): Promise<MongoTransaction | null> {
  if (isConnectedToCloud && mongoDb) {
    await mongoDb.collection('transactions').updateOne({ id }, { $set: updates });
    return (await mongoDb.collection('transactions').findOne({ id })) as unknown as MongoTransaction;
  }

  const idx = inMemoryTransactions.findIndex((t) => t.id === id);
  if (idx !== -1) {
    inMemoryTransactions[idx] = { ...inMemoryTransactions[idx], ...updates };
    return inMemoryTransactions[idx];
  }
  return null;
}
