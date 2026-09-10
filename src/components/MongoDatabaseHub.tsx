import React, { useState, useEffect } from 'react';
import {
  Database,
  Users,
  Layers,
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Clock,
  IndianRupee,
  MapPin,
  Phone,
  FileText,
  ArrowUpRight,
  AlertTriangle,
  Server,
  Zap,
  Check,
  X
} from 'lucide-react';
import {
  MongoUser,
  MongoCropListing,
  MongoPriceHistory,
  MongoFairScoreForecast,
  MongoTransaction,
  MongoDbStatus,
  Language
} from '../types';
import { ArrowScrollContainer } from './ArrowScrollContainer';

interface MongoDatabaseHubProps {
  currentLanguage: Language;
}

export const MongoDatabaseHub: React.FC<MongoDatabaseHubProps> = ({ currentLanguage }) => {
  const [activeSubTab, setActiveSubTab] = useState<'listings' | 'users' | 'prices' | 'forecasts' | 'transactions'>('listings');
  const [dbStatus, setDbStatus] = useState<MongoDbStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Collections data
  const [users, setUsers] = useState<MongoUser[]>([]);
  const [cropListings, setCropListings] = useState<MongoCropListing[]>([]);
  const [priceHistory, setPriceHistory] = useState<MongoPriceHistory[]>([]);
  const [forecasts, setForecasts] = useState<MongoFairScoreForecast[]>([]);
  const [transactions, setTransactions] = useState<MongoTransaction[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals for adding new documents
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [showAddListingModal, setShowAddListingModal] = useState<boolean>(false);
  const [showAddPriceModal, setShowAddPriceModal] = useState<boolean>(false);
  const [showAddForecastModal, setShowAddForecastModal] = useState<boolean>(false);
  const [showAddTxModal, setShowAddTxModal] = useState<boolean>(false);

  // Form states
  const [newUser, setNewUser] = useState({
    name: '',
    phone: '',
    role: 'farmer' as 'farmer' | 'buyer',
    district: 'Ludhiana',
    taluk: 'Khanna',
    verified: true,
  });

  const [newListing, setNewListing] = useState({
    farmer_id: 'usr-f-01',
    crop_name: 'Wheat (Sharbati)',
    quantity_kg: 5000,
    quality_grade: 'Grade A',
    district: 'Ludhiana',
    harvest_date: new Date().toISOString().split('T')[0],
    asking_price: 28.50,
    fairscore_at_listing: 92,
    status: 'active' as 'active' | 'negotiating' | 'sold' | 'cancelled',
  });

  const [newPrice, setNewPrice] = useState({
    crop_name: 'Wheat',
    market: 'Azadpur APMC',
    district: 'Delhi',
    date: new Date().toISOString().split('T')[0],
    min_price: 2750,
    max_price: 2980,
    modal_price: 2880,
    arrivals_tonnes: 350,
  });

  const [newForecast, setNewForecast] = useState({
    crop_name: 'Wheat',
    district: 'Ludhiana',
    forecast_date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    predicted_band_min: 2750,
    predicted_band_max: 2950,
    oversupply_risk: false,
    confidence_score: 92,
    key_drivers: 'High mill extraction demand; low buffer inventory',
  });

  const [newTx, setNewTx] = useState({
    listing_id: 'list-01',
    buyer_id: 'usr-b-01',
    agreed_price: 28.50,
    quantity: 5000,
    status: 'escrow_locked' as 'escrow_locked' | 'dispatched' | 'completed' | 'disputed',
    notes: 'Escrow lock confirmed by buyer bank',
  });

  // Fetch DB status and collection items
  const fetchAllData = async () => {
    setIsRefreshing(true);
    try {
      // 1. DB Status
      const statusRes = await fetch('/api/db/status');
      if (statusRes.ok) {
        const json = await statusRes.json();
        if (json.success) setDbStatus(json.data);
      }

      // 2. Users
      const usersRes = await fetch('/api/users');
      if (usersRes.ok) {
        const json = await usersRes.json();
        if (json.success) setUsers(json.data);
      }

      // 3. Crop Listings
      const listingsRes = await fetch('/api/crop-listings');
      if (listingsRes.ok) {
        const json = await listingsRes.json();
        if (json.success) setCropListings(json.data);
      }

      // 4. Price History
      const pricesRes = await fetch('/api/price-history');
      if (pricesRes.ok) {
        const json = await pricesRes.json();
        if (json.success) setPriceHistory(json.data);
      }

      // 5. FairScore Forecasts
      const forecastsRes = await fetch('/api/fairscore-forecasts');
      if (forecastsRes.ok) {
        const json = await forecastsRes.json();
        if (json.success) setForecasts(json.data);
      }

      // 6. Transactions
      const txRes = await fetch('/api/transactions');
      if (txRes.ok) {
        const json = await txRes.json();
        if (json.success) setTransactions(json.data);
      }
    } catch (err) {
      console.error('Error fetching MongoDB collections:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const triggerNotification = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(null), 4000);
  };

  const handleResetDb = async () => {
    if (!confirm('Re-seed all 5 MongoDB collections with default verified schema records?')) return;
    try {
      const res = await fetch('/api/db/seed', { method: 'POST' });
      if (res.ok) {
        await fetchAllData();
        triggerNotification('MongoDB collections successfully re-seeded!');
      }
    } catch (err) {
      console.error('Error re-seeding DB:', err);
    }
  };

  // Create User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        setShowAddUserModal(false);
        await fetchAllData();
        triggerNotification(`User "${newUser.name}" inserted into MongoDB users collection.`);
        setNewUser({
          name: '',
          phone: '',
          role: 'farmer',
          district: 'Ludhiana',
          taluk: 'Khanna',
          verified: true,
        });
      }
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  // Create Crop Listing
  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/crop-listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newListing),
      });
      if (res.ok) {
        setShowAddListingModal(false);
        await fetchAllData();
        triggerNotification(`Crop Listing for "${newListing.crop_name}" saved to MongoDB crop_listings.`);
      }
    } catch (err) {
      console.error('Failed to create crop listing:', err);
    }
  };

  // Update listing status
  const handleUpdateListingStatus = async (id: string, status: 'active' | 'negotiating' | 'sold' | 'cancelled') => {
    try {
      const res = await fetch(`/api/crop-listings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await fetchAllData();
        triggerNotification(`Listing status updated to ${status}.`);
      }
    } catch (err) {
      console.error('Failed to update listing:', err);
    }
  };

  // Delete listing
  const handleDeleteListing = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing from MongoDB?')) return;
    try {
      const res = await fetch(`/api/crop-listings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchAllData();
        triggerNotification(`Listing deleted from MongoDB.`);
      }
    } catch (err) {
      console.error('Failed to delete listing:', err);
    }
  };

  // Create Price History Record
  const handleCreatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/price-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPrice),
      });
      if (res.ok) {
        setShowAddPriceModal(false);
        await fetchAllData();
        triggerNotification(`Mandi price record saved for ${newPrice.market}.`);
      }
    } catch (err) {
      console.error('Failed to create price record:', err);
    }
  };

  // Create FairScore Forecast
  const handleCreateForecast = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const drivers = newForecast.key_drivers.split(';').map(d => d.trim()).filter(Boolean);
      const res = await fetch('/api/fairscore-forecasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newForecast,
          key_drivers: drivers,
        }),
      });
      if (res.ok) {
        setShowAddForecastModal(false);
        await fetchAllData();
        triggerNotification(`FairScore forecast generated and stored in MongoDB.`);
      }
    } catch (err) {
      console.error('Failed to create forecast:', err);
    }
  };

  // Create Transaction
  const handleCreateTx = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTx),
      });
      if (res.ok) {
        setShowAddTxModal(false);
        await fetchAllData();
        triggerNotification(`Transaction recorded in MongoDB transactions collection.`);
      }
    } catch (err) {
      console.error('Failed to create transaction:', err);
    }
  };

  // Update Transaction Status
  const handleUpdateTxStatus = async (id: string, status: 'escrow_locked' | 'dispatched' | 'completed' | 'disputed') => {
    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await fetchAllData();
        triggerNotification(`Transaction status progressed to "${status}".`);
      }
    } catch (err) {
      console.error('Failed to update transaction:', err);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-stone-900 pb-8">
      {/* Top Banner: MongoDB Schema Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm text-stone-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <span className="w-11 h-11 rounded-2xl bg-[#1b4332] text-emerald-300 flex items-center justify-center shadow-xs border border-emerald-900/40">
              <Database className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold font-display text-stone-900">
                MongoDB Database Engine
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-[#1b4332] border border-emerald-200 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {dbStatus?.usingCloudMongo ? 'MongoDB Atlas / Cloud Connected' : 'Active In-Memory MongoDB Engine'}
              </span>
            </div>
          </div>
          <p className="text-xs text-stone-500 max-w-2xl">
            Managing verified agricultural schema:{' '}
            <span className="text-[#1b4332] font-mono font-bold">users</span>,{' '}
            <span className="text-[#1b4332] font-mono font-bold">crop_listings</span>,{' '}
            <span className="text-[#1b4332] font-mono font-bold">price_history</span>,{' '}
            <span className="text-[#1b4332] font-mono font-bold">fairscore_forecasts</span>, and{' '}
            <span className="text-[#1b4332] font-mono font-bold">transactions</span>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={fetchAllData}
            disabled={isRefreshing}
            className="px-4 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-xs font-bold text-stone-700 flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
            title="Refresh collections data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#1b4332]' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleResetDb}
            className="px-4 py-2.5 rounded-2xl bg-[#1b4332] hover:bg-[#143527] text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-sm transition-all border border-emerald-900/40"
            title="Reset to default seed data"
          >
            <Server className="w-3.5 h-3.5" />
            <span>Seed / Reset Collections</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {actionSuccessMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-[#1b4332] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1b4332] flex-shrink-0" />
            <span className="font-semibold">{actionSuccessMessage}</span>
          </div>
          <button onClick={() => setActionSuccessMessage(null)} className="text-emerald-600 hover:text-[#1b4332] cursor-pointer p-1 rounded-lg hover:bg-emerald-100 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Schema Document Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Users */}
        <button
          onClick={() => setActiveSubTab('users')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${activeSubTab === 'users'
              ? 'bg-white border-[#1b4332] shadow-md ring-1 ring-[#1b4332]/20'
              : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-sm shadow-2xs'
            }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">users</span>
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${activeSubTab === 'users' ? 'bg-[#1b4332]' : 'bg-stone-100'}`}>
              <Users className={`w-3.5 h-3.5 ${activeSubTab === 'users' ? 'text-emerald-300' : 'text-stone-500'}`} />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-stone-900 leading-none">
            {dbStatus?.collections?.users ?? users.length}
          </div>
          <div className="text-[11px] text-stone-500 mt-1.5 font-medium">Farmers & Buyers</div>
        </button>

        {/* Crop Listings */}
        <button
          onClick={() => setActiveSubTab('listings')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${activeSubTab === 'listings'
              ? 'bg-white border-[#1b4332] shadow-md ring-1 ring-[#1b4332]/20'
              : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-sm shadow-2xs'
            }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">crop_listings</span>
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${activeSubTab === 'listings' ? 'bg-[#1b4332]' : 'bg-stone-100'}`}>
              <Layers className={`w-3.5 h-3.5 ${activeSubTab === 'listings' ? 'text-emerald-300' : 'text-stone-500'}`} />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-stone-900 leading-none">
            {dbStatus?.collections?.crop_listings ?? cropListings.length}
          </div>
          <div className="text-[11px] text-stone-500 mt-1.5 font-medium">Available Lots & FairScores</div>
        </button>

        {/* Price History */}
        <button
          onClick={() => setActiveSubTab('prices')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${activeSubTab === 'prices'
              ? 'bg-white border-[#1b4332] shadow-md ring-1 ring-[#1b4332]/20'
              : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-sm shadow-2xs'
            }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">price_history</span>
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${activeSubTab === 'prices' ? 'bg-[#1b4332]' : 'bg-stone-100'}`}>
              <TrendingUp className={`w-3.5 h-3.5 ${activeSubTab === 'prices' ? 'text-emerald-300' : 'text-stone-500'}`} />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-stone-900 leading-none">
            {dbStatus?.collections?.price_history ?? priceHistory.length}
          </div>
          <div className="text-[11px] text-stone-500 mt-1.5 font-medium">Mandi Market Quotes</div>
        </button>

        {/* Fairscore Forecasts */}
        <button
          onClick={() => setActiveSubTab('forecasts')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${activeSubTab === 'forecasts'
              ? 'bg-white border-amber-600 shadow-md ring-1 ring-amber-600/20'
              : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-sm shadow-2xs'
            }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">fairscore_forecasts</span>
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${activeSubTab === 'forecasts' ? 'bg-amber-500' : 'bg-stone-100'}`}>
              <Zap className={`w-3.5 h-3.5 ${activeSubTab === 'forecasts' ? 'text-white' : 'text-stone-500'}`} />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-stone-900 leading-none">
            {dbStatus?.collections?.fairscore_forecasts ?? forecasts.length}
          </div>
          <div className="text-[11px] text-stone-500 mt-1.5 font-medium">Price Bands & Risk Model</div>
        </button>

        {/* Transactions */}
        <button
          onClick={() => setActiveSubTab('transactions')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${activeSubTab === 'transactions'
              ? 'bg-white border-[#1b4332] shadow-md ring-1 ring-[#1b4332]/20'
              : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-sm shadow-2xs'
            }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">transactions</span>
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${activeSubTab === 'transactions' ? 'bg-[#1b4332]' : 'bg-stone-100'}`}>
              <IndianRupee className={`w-3.5 h-3.5 ${activeSubTab === 'transactions' ? 'text-emerald-300' : 'text-stone-500'}`} />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-stone-900 leading-none">
            {dbStatus?.collections?.transactions ?? transactions.length}
          </div>
          <div className="text-[11px] text-stone-500 mt-1.5 font-medium">Escrow & Deals</div>
        </button>
      </div>

      {/* Main Collection Data Explorer */}
      <div className="bg-white border border-stone-200/80 rounded-3xl shadow-sm overflow-hidden">
        {/* Tab Selection Row & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-stone-100 bg-stone-50/80">
          <div className="min-w-0 flex-1 overflow-hidden">
            <ArrowScrollContainer scrollAmount={160}>
              <button
                onClick={() => setActiveSubTab('listings')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all shrink-0 font-mono ${activeSubTab === 'listings' ? 'bg-stone-900 text-stone-100 border border-stone-800 shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200 border border-transparent'
                  }`}
              >
                crop_listings ({cropListings.length})
              </button>

              <button
                onClick={() => setActiveSubTab('users')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all shrink-0 font-mono ${activeSubTab === 'users' ? 'bg-stone-900 text-stone-100 border border-stone-800 shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200 border border-transparent'
                  }`}
              >
                users ({users.length})
              </button>

              <button
                onClick={() => setActiveSubTab('prices')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all shrink-0 font-mono ${activeSubTab === 'prices' ? 'bg-stone-900 text-stone-100 border border-stone-800 shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200 border border-transparent'
                  }`}
              >
                price_history ({priceHistory.length})
              </button>

              <button
                onClick={() => setActiveSubTab('forecasts')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all shrink-0 font-mono ${activeSubTab === 'forecasts' ? 'bg-stone-900 text-stone-100 border border-stone-800 shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200 border border-transparent'
                  }`}
              >
                fairscore_forecasts ({forecasts.length})
              </button>

              <button
                onClick={() => setActiveSubTab('transactions')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all shrink-0 font-mono ${activeSubTab === 'transactions' ? 'bg-stone-900 text-stone-100 border border-stone-800 shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200 border border-transparent'
                  }`}
              >
                transactions ({transactions.length})
              </button>
            </ArrowScrollContainer>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-stone-200/90 rounded-xl pl-8 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white w-48 shadow-2xs"
              />
            </div>

            {/* Contextual Insert Button */}
            {activeSubTab === 'listings' && (
              <button
                onClick={() => setShowAddListingModal(true)}
                className="px-3.5 py-2 bg-[#1b4332] hover:bg-[#143527] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs border border-emerald-900/40 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Listing</span>
              </button>
            )}

            {activeSubTab === 'users' && (
              <button
                onClick={() => setShowAddUserModal(true)}
                className="px-3.5 py-2 bg-[#1b4332] hover:bg-[#143527] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs border border-emerald-900/40 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add User</span>
              </button>
            )}

            {activeSubTab === 'prices' && (
              <button
                onClick={() => setShowAddPriceModal(true)}
                className="px-3.5 py-2 bg-[#1b4332] hover:bg-[#143527] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs border border-emerald-900/40 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Price</span>
              </button>
            )}

            {activeSubTab === 'forecasts' && (
              <button
                onClick={() => setShowAddForecastModal(true)}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Forecast</span>
              </button>
            )}

            {activeSubTab === 'transactions' && (
              <button
                onClick={() => setShowAddTxModal(true)}
                className="px-3.5 py-2 bg-[#1b4332] hover:bg-[#143527] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs border border-emerald-900/40 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Deal</span>
              </button>
            )}
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* SUBTAB 1: CROP_LISTINGS */}
        {/* ----------------------------------------------------------------- */}
        {activeSubTab === 'listings' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/70">
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">id</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">farmer_id</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">crop_name</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">quantity_kg</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">quality_grade</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">district</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">harvest_date</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono text-right">asking_price</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono text-center">fairscore</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">status</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono text-right">actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {cropListings
                  .filter((item) =>
                    searchQuery ? item.crop_name.toLowerCase().includes(searchQuery.toLowerCase()) || item.district.toLowerCase().includes(searchQuery.toLowerCase()) : true
                  )
                  .map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-[11px] font-extrabold text-stone-500 tracking-wider">{item.id}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-[#1b4332]">{item.farmer_id}</td>
                      <td className="py-3.5 px-4 font-semibold text-stone-900">{item.crop_name}</td>
                      <td className="py-3.5 px-4 font-mono text-stone-700 text-[11px]">
                        {item.quantity_kg.toLocaleString()} kg <span className="text-stone-400">({item.quantity_kg / 100} Qtl)</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-stone-900 text-stone-100 border border-stone-800 font-mono">
                          {item.quality_grade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-stone-700 font-medium">{item.district}</td>
                      <td className="py-3.5 px-4 font-mono text-stone-500 text-[11px]">{item.harvest_date}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-extrabold text-[#1b4332]">
                        ₹{item.asking_price}/kg
                        <div className="text-[10px] text-stone-400 font-normal">₹{item.asking_price * 100}/Qtl</div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold font-mono bg-[#1b4332] text-emerald-100 border border-emerald-900/40">
                          {item.fairscore_at_listing}/100
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdateListingStatus(item.id, e.target.value as any)}
                          className={`text-[11px] font-extrabold px-2.5 py-1.5 rounded-xl border focus:outline-none cursor-pointer font-mono ${item.status === 'active'
                              ? 'bg-emerald-50 border-emerald-300 text-[#1b4332]'
                              : item.status === 'negotiating'
                                ? 'bg-amber-50 border-amber-300 text-amber-800'
                                : item.status === 'sold'
                                  ? 'bg-slate-900 border-slate-700 text-sky-200'
                                  : 'bg-stone-100 border-stone-200 text-stone-600'
                            }`}
                        >
                          <option value="active">active</option>
                          <option value="negotiating">negotiating</option>
                          <option value="sold">sold</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteListing(item.id)}
                          className="text-stone-400 hover:text-rose-600 text-xs font-bold px-2 py-1 rounded-lg hover:bg-rose-50 cursor-pointer transition-all"
                          title="Delete listing"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* SUBTAB 2: USERS */}
        {/* ----------------------------------------------------------------- */}
        {activeSubTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/70">
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">id</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">name</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">phone</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">role</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">district</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">taluk</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono text-center">verified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users
                  .filter((u) =>
                    searchQuery ? u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.district.toLowerCase().includes(searchQuery.toLowerCase()) : true
                  )
                  .map((u) => (
                    <tr key={u.id} className="hover:bg-emerald-50/40 transition-colors group">
                      <td className="py-3.5 px-4 font-mono text-[11px] font-extrabold text-stone-500 tracking-wider">{u.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-xl bg-stone-900 text-stone-100 font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 border border-stone-800">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-extrabold text-stone-900 text-xs flex items-center gap-1.5">
                              {u.name}
                              {u.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#1b4332]" />}
                            </div>
                            {u.email && <div className="text-[10px] text-stone-400 font-mono mt-0.5">{u.email}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-stone-700 font-semibold">{u.phone}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider font-mono ${u.role === 'farmer'
                              ? 'bg-[#1b4332] text-emerald-100 border border-emerald-900/40'
                              : 'bg-slate-900 text-sky-200 border border-slate-700'
                            }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-stone-700 font-medium">{u.district}</td>
                      <td className="py-3.5 px-4 text-stone-500 font-medium">{u.taluk}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold font-mono ${u.verified
                              ? 'bg-[#1b4332] text-emerald-100 border border-emerald-900/40'
                              : 'bg-stone-100 text-stone-500 border border-stone-200'
                            }`}
                        >
                          {u.verified ? '✓ true' : 'false'}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* SUBTAB 3: PRICE_HISTORY */}
        {/* ----------------------------------------------------------------- */}
        {activeSubTab === 'prices' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/70">
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">id</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">crop_name</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">market / mandi</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">district</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">date</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono text-right">min_price</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono text-right">max_price</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono text-right">modal_price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {priceHistory
                  .filter((p) =>
                    searchQuery ? p.crop_name.toLowerCase().includes(searchQuery.toLowerCase()) || p.market.toLowerCase().includes(searchQuery.toLowerCase()) : true
                  )
                  .map((p) => (
                    <tr key={p.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-[11px] font-extrabold text-stone-500 tracking-wider">{p.id}</td>
                      <td className="py-3.5 px-4 font-extrabold text-stone-900">{p.crop_name}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#1b4332]">{p.market}</td>
                      <td className="py-3.5 px-4 text-stone-700 font-medium">{p.district}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-stone-500">{p.date}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-stone-600 font-semibold">₹{p.min_price}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-stone-600 font-semibold">₹{p.max_price}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-extrabold text-[#1b4332]">
                        ₹{p.modal_price}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* SUBTAB 4: FAIRSCORE_FORECASTS */}
        {/* ----------------------------------------------------------------- */}
        {activeSubTab === 'forecasts' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/70">
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">id</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">crop_name</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">district</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">forecast_date</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono text-right">band_min</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono text-right">band_max</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono text-center">oversupply_risk</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">generated_at</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {forecasts
                  .filter((f) =>
                    searchQuery ? f.crop_name.toLowerCase().includes(searchQuery.toLowerCase()) || f.district.toLowerCase().includes(searchQuery.toLowerCase()) : true
                  )
                  .map((f) => (
                    <tr key={f.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-[11px] font-extrabold text-stone-500 tracking-wider">{f.id}</td>
                      <td className="py-3.5 px-4 font-extrabold text-stone-900">{f.crop_name}</td>
                      <td className="py-3.5 px-4 text-stone-700 font-medium">{f.district}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-[#1b4332]">{f.forecast_date}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-stone-600 font-semibold">₹{f.predicted_band_min}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-extrabold text-[#1b4332]">₹{f.predicted_band_max}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold font-mono ${f.oversupply_risk
                              ? 'bg-rose-50 text-rose-700 border border-rose-300'
                              : 'bg-[#1b4332] text-emerald-100 border border-emerald-900/40'
                            }`}
                        >
                          {f.oversupply_risk ? '⚠ High Risk' : '✓ Safe'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-stone-400">
                        {new Date(f.generated_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* SUBTAB 5: TRANSACTIONS */}
        {/* ----------------------------------------------------------------- */}
        {activeSubTab === 'transactions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/70">
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">id</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">listing_id</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">buyer_id</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono text-right">agreed_price</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">quantity</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">status</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">timestamp</th>
                  <th className="py-3 px-4 text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono text-right">action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {transactions
                  .filter((t) =>
                    searchQuery ? t.listing_id.toLowerCase().includes(searchQuery.toLowerCase()) || t.buyer_id.toLowerCase().includes(searchQuery.toLowerCase()) : true
                  )
                  .map((t) => (
                    <tr key={t.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-[11px] font-extrabold text-stone-500 tracking-wider">{t.id}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-[#1b4332]">{t.listing_id}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-slate-700">{t.buyer_id}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-extrabold text-[#1b4332]">
                        ₹{t.agreed_price}/kg
                        <div className="text-[10px] text-stone-400 font-normal">
                          Total: ₹{((t.agreed_price * t.quantity)).toLocaleString()}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-stone-700 font-semibold">
                        {t.quantity.toLocaleString()} kg <span className="text-stone-400">({t.quantity / 100} Qtl)</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold font-mono ${t.status === 'completed'
                              ? 'bg-[#1b4332] text-emerald-100 border border-emerald-900/40'
                              : t.status === 'dispatched'
                                ? 'bg-slate-900 text-sky-200 border border-slate-700'
                                : t.status === 'escrow_locked'
                                  ? 'bg-amber-950 text-amber-200 border border-amber-800'
                                  : 'bg-rose-50 text-rose-700 border border-rose-300'
                            }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-stone-500">
                        {new Date(t.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {t.status === 'escrow_locked' && (
                          <button
                            onClick={() => handleUpdateTxStatus(t.id, 'dispatched')}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-200 text-[11px] font-extrabold cursor-pointer border border-slate-700 transition-all"
                          >
                            Dispatch
                          </button>
                        )}
                        {t.status === 'dispatched' && (
                          <button
                            onClick={() => handleUpdateTxStatus(t.id, 'completed')}
                            className="px-3 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#143527] text-emerald-100 text-[11px] font-extrabold cursor-pointer border border-emerald-900/40 transition-all"
                          >
                            Release Payment
                          </button>
                        )}
                        {t.status === 'completed' && (
                          <span className="text-[#1b4332] text-[11px] font-extrabold flex items-center justify-end gap-1">
                            <Check className="w-3.5 h-3.5" /> Paid Out
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL 1: ADD USER */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200/80 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#1b4332] flex items-center justify-center">
                  <Users className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900">Add User</h3>
                  <p className="text-[10px] text-stone-400 font-mono">→ users collection</p>
                </div>
              </div>
              <button onClick={() => setShowAddUserModal(false)} className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Basavaraj Patil"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-medium placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Phone</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Role</label>
                  <div className="relative">
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                      className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white cursor-pointer transition-all pr-9"
                    >
                      <option value="farmer">Farmer</option>
                      <option value="buyer">Buyer</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-3 text-stone-400"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Status</label>
                  <div className="relative">
                    <select
                      value={newUser.verified ? 'true' : 'false'}
                      onChange={(e) => setNewUser({ ...newUser, verified: e.target.value === 'true' })}
                      className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white cursor-pointer transition-all pr-9"
                    >
                      <option value="true">✓ Verified</option>
                      <option value="false">Unverified</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-3 text-stone-400"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">District</label>
                  <input
                    type="text"
                    required
                    value={newUser.district}
                    onChange={(e) => setNewUser({ ...newUser, district: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Taluk</label>
                  <input
                    type="text"
                    required
                    value={newUser.taluk}
                    onChange={(e) => setNewUser({ ...newUser, taluk: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button type="button" onClick={() => setShowAddUserModal(false)} className="px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-xs font-extrabold text-stone-600 cursor-pointer transition-all border border-stone-200">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-2xl bg-[#1b4332] hover:bg-[#143527] text-xs font-extrabold text-white cursor-pointer shadow-sm border border-emerald-900/40 transition-all">Save to MongoDB</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD CROP LISTING */}
      {showAddListingModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200/80 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#1b4332] flex items-center justify-center">
                  <Layers className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900">List New Farm Harvest Lot</h3>
                  <p className="text-[10px] text-stone-400 font-mono">→ crop_listings collection</p>
                </div>
              </div>
              <button onClick={() => setShowAddListingModal(false)} className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateListing} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Farmer ID</label>
                  <div className="relative">
                    <select
                      value={newListing.farmer_id}
                      onChange={(e) => setNewListing({ ...newListing, farmer_id: e.target.value })}
                      className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white cursor-pointer transition-all pr-9"
                    >
                      {users.filter(u => u.role === 'farmer').map(u => (
                        <option key={u.id} value={u.id}>{u.id} — {u.name}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-3 text-stone-400"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Select Commodity</label>
                  <div className="relative">
                    <select
                      value={newListing.crop_name}
                      onChange={(e) => setNewListing({ ...newListing, crop_name: e.target.value })}
                      className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white cursor-pointer transition-all pr-9"
                    >
                      <option>Wheat (Sharbati / Lokwan)</option>
                      <option>Basmati Paddy (Pusa 1121 / 1509)</option>
                      <option>Soybean (JS 9560 / JS 20-34)</option>
                      <option>Cotton (Long Staple / Shankar-6)</option>
                      <option>Mustard / Rapeseed (Pusa Bold)</option>
                      <option>Tomato (Hybrid / Abhinav)</option>
                      <option>Onion (Nashik Red / Garwa)</option>
                      <option>Potato (Kufri Pukhraj / Jyoti)</option>
                      <option>Maize / Corn (Pioneer Hybrid)</option>
                      <option>Tur / Arhar Dal (Pigeon Pea)</option>
                      <option>Dry Red Chilli (Guntur Teja / Byadgi)</option>
                      <option>Groundnut / Peanut (Kadiri-6)</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-3 text-stone-400"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Quantity (kg)</label>
                  <input
                    type="number"
                    required
                    value={newListing.quantity_kg}
                    onChange={(e) => setNewListing({ ...newListing, quantity_kg: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Quality Grade</label>
                  <div className="relative">
                    <select
                      value={newListing.quality_grade}
                      onChange={(e) => setNewListing({ ...newListing, quality_grade: e.target.value })}
                      className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white cursor-pointer transition-all pr-9"
                    >
                      <option value="Grade A">Grade A — Premium / Export</option>
                      <option value="Grade B">Grade B — Standard FAQ</option>
                      <option value="Grade C">Grade C — Commercial</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-3 text-stone-400"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Asking Price (₹/kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newListing.asking_price}
                    onChange={(e) => setNewListing({ ...newListing, asking_price: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">FairScore (0–100)</label>
                  <input
                    type="number"
                    required
                    value={newListing.fairscore_at_listing}
                    onChange={(e) => setNewListing({ ...newListing, fairscore_at_listing: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">District</label>
                  <input
                    type="text"
                    required
                    value={newListing.district}
                    onChange={(e) => setNewListing({ ...newListing, district: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Harvest Date</label>
                  <input
                    type="date"
                    required
                    value={newListing.harvest_date}
                    onChange={(e) => setNewListing({ ...newListing, harvest_date: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button type="button" onClick={() => setShowAddListingModal(false)} className="px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-xs font-extrabold text-stone-600 cursor-pointer transition-all border border-stone-200">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-2xl bg-[#1b4332] hover:bg-[#143527] text-xs font-extrabold text-white cursor-pointer shadow-sm border border-emerald-900/40 transition-all">Insert Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: LOG PRICE HISTORY */}
      {showAddPriceModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200/80 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#1b4332] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900">Log Mandi Price</h3>
                  <p className="text-[10px] text-stone-400 font-mono">→ price_history collection</p>
                </div>
              </div>
              <button onClick={() => setShowAddPriceModal(false)} className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreatePrice} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Crop Name</label>
                <input type="text" required value={newPrice.crop_name} onChange={(e) => setNewPrice({ ...newPrice, crop_name: e.target.value })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-medium placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Market / Mandi</label>
                <input type="text" required value={newPrice.market} onChange={(e) => setNewPrice({ ...newPrice, market: e.target.value })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-medium placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">District</label>
                  <input type="text" required value={newPrice.district} onChange={(e) => setNewPrice({ ...newPrice, district: e.target.value })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Date</label>
                  <input type="date" required value={newPrice.date} onChange={(e) => setNewPrice({ ...newPrice, date: e.target.value })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Min (₹)</label>
                  <input type="number" required value={newPrice.min_price} onChange={(e) => setNewPrice({ ...newPrice, min_price: Number(e.target.value) })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Modal (₹)</label>
                  <input type="number" required value={newPrice.modal_price} onChange={(e) => setNewPrice({ ...newPrice, modal_price: Number(e.target.value) })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Max (₹)</label>
                  <input type="number" required value={newPrice.max_price} onChange={(e) => setNewPrice({ ...newPrice, max_price: Number(e.target.value) })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all" />
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button type="button" onClick={() => setShowAddPriceModal(false)} className="px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-xs font-extrabold text-stone-600 cursor-pointer transition-all border border-stone-200">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-2xl bg-[#1b4332] hover:bg-[#143527] text-xs font-extrabold text-white cursor-pointer shadow-sm border border-emerald-900/40 transition-all">Insert Price Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: NEW FAIRSCORE FORECAST */}
      {showAddForecastModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200/80 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-amber-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900">New FairScore Forecast</h3>
                  <p className="text-[10px] text-stone-400 font-mono">→ fairscore_forecasts collection</p>
                </div>
              </div>
              <button onClick={() => setShowAddForecastModal(false)} className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateForecast} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Crop Name</label>
                  <input type="text" required value={newForecast.crop_name} onChange={(e) => setNewForecast({ ...newForecast, crop_name: e.target.value })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">District</label>
                  <input type="text" required value={newForecast.district} onChange={(e) => setNewForecast({ ...newForecast, district: e.target.value })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Band Min (₹/Qtl)</label>
                  <input type="number" required value={newForecast.predicted_band_min} onChange={(e) => setNewForecast({ ...newForecast, predicted_band_min: Number(e.target.value) })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Band Max (₹/Qtl)</label>
                  <input type="number" required value={newForecast.predicted_band_max} onChange={(e) => setNewForecast({ ...newForecast, predicted_band_max: Number(e.target.value) })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Forecast Date</label>
                  <input type="date" required value={newForecast.forecast_date} onChange={(e) => setNewForecast({ ...newForecast, forecast_date: e.target.value })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Oversupply Risk</label>
                  <div className="relative">
                    <select value={newForecast.oversupply_risk ? 'true' : 'false'} onChange={(e) => setNewForecast({ ...newForecast, oversupply_risk: e.target.value === 'true' })} className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white cursor-pointer transition-all pr-9">
                      <option value="false">✓ Safe</option>
                      <option value="true">⚠ High Risk</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-3 text-stone-400"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Market Drivers (semicolon-separated)</label>
                <input type="text" value={newForecast.key_drivers} onChange={(e) => setNewForecast({ ...newForecast, key_drivers: e.target.value })} placeholder="Driver 1; Driver 2; Driver 3" className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all" />
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button type="button" onClick={() => setShowAddForecastModal(false)} className="px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-xs font-extrabold text-stone-600 cursor-pointer transition-all border border-stone-200">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-xs font-extrabold text-white cursor-pointer shadow-sm transition-all">Save Forecast</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: NEW TRANSACTION */}
      {showAddTxModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200/80 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#1b4332] flex items-center justify-center">
                  <IndianRupee className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900">Create Transaction</h3>
                  <p className="text-[10px] text-stone-400 font-mono">→ transactions collection</p>
                </div>
              </div>
              <button onClick={() => setShowAddTxModal(false)} className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateTx} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Listing ID</label>
                  <div className="relative">
                    <select value={newTx.listing_id} onChange={(e) => setNewTx({ ...newTx, listing_id: e.target.value })} className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white cursor-pointer transition-all pr-9">
                      {cropListings.map(l => (
                        <option key={l.id} value={l.id}>{l.id} ({l.crop_name})</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-3 text-stone-400"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Buyer ID</label>
                  <div className="relative">
                    <select value={newTx.buyer_id} onChange={(e) => setNewTx({ ...newTx, buyer_id: e.target.value })} className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white cursor-pointer transition-all pr-9">
                      {users.filter(u => u.role === 'buyer').map(b => (
                        <option key={b.id} value={b.id}>{b.id} ({b.name})</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-3 text-stone-400"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Agreed Price (₹/kg)</label>
                  <input type="number" step="0.1" required value={newTx.agreed_price} onChange={(e) => setNewTx({ ...newTx, agreed_price: Number(e.target.value) })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Quantity (kg)</label>
                  <input type="number" required value={newTx.quantity} onChange={(e) => setNewTx({ ...newTx, quantity: Number(e.target.value) })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Status</label>
                <div className="relative">
                  <select value={newTx.status} onChange={(e) => setNewTx({ ...newTx, status: e.target.value as any })} className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white cursor-pointer transition-all pr-9">
                    <option value="escrow_locked">escrow_locked</option>
                    <option value="dispatched">dispatched</option>
                    <option value="completed">completed</option>
                    <option value="disputed">disputed</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-3 text-stone-400"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-1.5 uppercase tracking-wider">Contract Notes / Escrow Ref</label>
                <input type="text" value={newTx.notes} onChange={(e) => setNewTx({ ...newTx, notes: e.target.value })} className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all" />
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button type="button" onClick={() => setShowAddTxModal(false)} className="px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-xs font-extrabold text-stone-600 cursor-pointer transition-all border border-stone-200">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-2xl bg-[#1b4332] hover:bg-[#143527] text-xs font-extrabold text-white cursor-pointer shadow-sm border border-emerald-900/40 transition-all">Commit Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
