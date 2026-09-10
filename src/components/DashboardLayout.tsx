import React, { useState } from 'react';
import { 
  Sprout, 
  Scale, 
  Store, 
  TrendingUp, 
  Package, 
  CloudSun, 
  Database, 
  Trophy, 
  Headphones, 
  Settings, 
  Search, 
  MapPin, 
  Bell, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  User,
  LogOut,
  LogIn,
  Sparkles,
  Layers,
  BookOpen,
  Languages
} from 'lucide-react';
import { NavTabType } from './Navbar';
import { Language, MongoUser } from '../types';
import { DEMO_PROFILES } from './AuthModal';
import { CustomSelect } from './CustomSelect';

interface DashboardLayoutProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  onOpenAdvisory: () => void;
  currentUser: MongoUser | null;
  onOpenAuth: (mode?: 'login' | 'logoutConfirm') => void;
  onLogout: () => void;
  children: React.ReactNode;
  selectedState: string;
  setSelectedState: (state: string) => void;
}

const NAV_ITEMS = [
  { id: 'fairscore' as NavTabType, label: 'FairScore', icon: ShieldCheck },
  { id: 'yield' as NavTabType, label: 'Yield AI', icon: Sprout },
  { id: 'price' as NavTabType, label: 'Fair Price Engine', icon: Scale },
  { id: 'linkages' as NavTabType, label: 'Buyer Market', icon: Store },
  { id: 'portfolio' as NavTabType, label: 'My Lots', icon: Package },
  { id: 'mandi' as NavTabType, label: 'Market Trends', icon: TrendingUp },
  { id: 'weather' as NavTabType, label: 'Weather & Alerts', icon: CloudSun },
  { id: 'database' as NavTabType, label: 'Database Hub', icon: Database },
  { id: 'sihpitch' as NavTabType, label: 'SIH Demo Pitch', icon: Trophy },
];

const STATES_LIST = ['Punjab', 'Haryana', 'Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Gujarat', 'Uttar Pradesh', 'Rajasthan'];

const LANGUAGES_LIST: { code: Language; name: string; native: string; region: string }[] = [
  { code: 'en', name: 'English', native: 'English', region: 'All India / National' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', region: 'North & Central India' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', region: 'Punjab & North India' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', region: 'Maharashtra' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', region: 'Andhra Pradesh & Telangana' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', region: 'Tamil Nadu & Puducherry' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', region: 'Karnataka' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', region: 'Gujarat' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', region: 'West Bengal & Tripura' },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeTab,
  setActiveTab,
  currentLanguage,
  setCurrentLanguage,
  onOpenAdvisory,
  currentUser,
  onOpenAuth,
  onLogout,
  children,
  selectedState,
  setSelectedState,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userName = currentUser?.name?.split(' ')[0] || 'Sardar';
  const userInitial = userName.charAt(0).toUpperCase();

  const isAdmin = currentUser?.role === 'admin' || currentUser?.name?.toLowerCase() === 'admin' || currentUser?.name?.toLowerCase().includes('admin');
  const visibleNavItems = NAV_ITEMS.filter((item) => {
    if (item.id === 'database' || item.id === 'sihpitch') {
      return isAdmin;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f4f6f4] text-stone-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Container Wrapper */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto relative">
        
        {/* MOBILE OVERLAY BACKDROP */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* LEFT SIDEBAR (Desktop & Mobile Drawer) */}
        <aside 
          className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[260px] bg-white border-r border-stone-200/80 flex flex-col justify-between p-4 transition-transform duration-200 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="space-y-6">
            {/* Logo Section */}
            <div className="flex items-center justify-between px-2 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-white flex items-center justify-center shadow-md shadow-emerald-950/20">
                  <Sprout className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-stone-900 font-display leading-none">
                    AgriConnect
                  </h1>
                  <span className="text-[10px] text-stone-400 font-semibold block mt-0.5 leading-none">
                    Better Markets. Brighter Farmers.
                  </span>
                </div>
              </div>

              {/* Close Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="lg:hidden text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Menu Links */}
            <nav className="space-y-1">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white border-2 border-[#1b4332] text-[#1b4332] font-extrabold shadow-2xs'
                        : 'text-stone-600 hover:bg-stone-100/80 hover:text-stone-900 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#1b4332]' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Bottom Section */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            {/* Bottom Support & Settings */}
            <div className="space-y-1">
              <button
                onClick={() => {
                  onOpenAdvisory();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100/80 hover:text-stone-900 cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-stone-400" />
                <span>Support</span>
              </button>

              <button
                onClick={() => {
                  onOpenAuth('login');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100/80 hover:text-stone-900 cursor-pointer"
              >
                <Settings className="w-4 h-4 text-stone-400" />
                <span>Settings</span>
              </button>
            </div>

            {/* Empowering Farmers Banner Card */}
            <div className="relative rounded-2xl overflow-hidden p-4 text-white shadow-sm border border-stone-200/50 min-h-[140px] flex flex-col justify-end">
              <img 
                src="/assets/sidebar_leaf.jpg" 
                alt="Green crop leaves" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent" />
              
              <div className="relative z-10 space-y-2">
                <h4 className="text-sm font-extrabold font-display leading-tight text-stone-50 max-w-[130px]">
                  Empowering Farmers, Every Day.
                </h4>
                
                <button 
                  onClick={() => onOpenAuth('login')}
                  className="w-8 h-8 rounded-full bg-[#1b4332] text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-md cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTAINER */}
        <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
          
          {/* TOP HEADER BAR */}
          <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sm:gap-6 w-full min-w-0">
            
            {/* Left: Mobile Menu Trigger + Search Bar */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial w-full sm:w-80 md:w-96 max-w-md">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 cursor-pointer flex-shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search Bar Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search for a crop, mandi or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full pl-9 pr-14 py-2 bg-stone-100/80 border border-stone-200/70 rounded-full text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white transition-all placeholder:text-stone-400 truncate"
                />
                <span className="hidden sm:inline-flex items-center gap-0.5 absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-stone-400 font-mono bg-white px-1.5 py-0.5 rounded border border-stone-200">
                  Ctrl K
                </span>
              </div>
            </div>

            {/* Right: State Selector, Notifications, Profile Avatar */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              
              {/* Location State Selector Dropdown */}
              <div className="w-28 sm:w-40 md:w-44 flex-shrink-0">
                <CustomSelect
                  value={selectedState}
                  onChange={(st) => setSelectedState(st)}
                  options={STATES_LIST.map((st) => ({ value: st, label: st }))}
                  icon={MapPin}
                  dropdownWidth="w-48"
                  align="right"
                />
              </div>

              {/* Header Change Language Selector Button */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setIsLanguageModalOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-full bg-white hover:bg-stone-50 text-stone-900 border border-stone-200/90 shadow-2xs text-xs font-extrabold cursor-pointer transition-colors"
                  title="Change Application Language (Vernacular Indian Languages)"
                  id="dashboard-header-language-btn"
                >
                  <Languages className="w-4 h-4 text-[#1b4332] flex-shrink-0" />
                  <span className="font-extrabold hidden md:inline">
                    {LANGUAGES_LIST.find((l) => l.code === currentLanguage)?.native || 'Language'}
                  </span>
                  <span className="md:hidden font-extrabold uppercase">{currentLanguage}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                </button>
              </div>

              {/* Notification Bell Icon */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-full bg-white hover:bg-stone-50 text-stone-700 border border-stone-200/90 shadow-2xs relative cursor-pointer transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
                </button>

                {/* Notifications Popup */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 animate-scaleUp space-y-3">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                      <h4 className="text-xs font-extrabold text-stone-900 font-display">Live Notifications</h4>
                      <button onClick={() => setIsNotificationsOpen(false)} className="text-stone-400 hover:text-stone-700 text-xs font-bold">Close</button>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/80">
                        <span className="font-bold text-stone-900 block">🌾 Khanna Mandi Rate Spike</span>
                        <span className="text-stone-600 text-[11px]">Wheat Sharbati modal price increased +₹35/Qtl today.</span>
                      </div>
                      <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/80">
                        <span className="font-bold text-stone-900 block">🌦️ Monsoon Advisory</span>
                        <span className="text-stone-600 text-[11px]">Clear harvest window predicted in Ludhiana district for 7 days.</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Avatar Dropdown */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 bg-white hover:bg-stone-50 rounded-full border border-stone-200/90 shadow-2xs cursor-pointer transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#1b4332] text-white flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0">
                    {userInitial}
                  </div>
                  <span className="text-xs font-extrabold text-stone-800 font-sans hidden sm:inline">
                    {userName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500 hidden sm:inline" />
                </button>

                {/* Profile Switcher Modal Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 sm:w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 animate-scaleUp space-y-2">
                    <div className="px-2 py-1 border-b border-stone-100">
                      <span className="text-[10px] text-stone-400 font-bold uppercase font-mono block">Logged In As</span>
                      <span className="text-xs font-extrabold text-stone-900 block">{currentUser?.name || 'Sardar Gurpreet Singh'}</span>
                      <span className="text-[11px] text-emerald-700 font-medium">{currentUser?.role?.toUpperCase() || 'FARMER'}</span>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          onOpenAuth('login');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-stone-700 hover:bg-stone-100 flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-stone-500" />
                        <span>Switch Demo Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          onLogout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* MAIN VIEW CONTENT CONTAINER */}
          <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-[1400px] w-full min-w-0 mx-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>

      {/* Vernacular Indian Languages Selector Modal */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1b4332] text-white flex items-center justify-center shadow-md">
                  <Languages className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-stone-900 font-display">
                    Select Language / भाषा चुनें
                  </h3>
                  <p className="text-xs text-stone-500">
                    Choose your preferred Indian language for real-time translation across AgriConnect.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLanguageModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-stone-200/70 hover:bg-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 flex-1">
              {LANGUAGES_LIST.map((lang) => {
                const isSelected = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLanguage(lang.code);
                      setIsLanguageModalOpen(false);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#1b4332] text-stone-900 shadow-md ring-2 ring-emerald-600/20 font-bold'
                        : 'bg-stone-50/80 hover:bg-stone-100/80 border-stone-200/90 text-stone-700 hover:border-emerald-600/40'
                    }`}
                  >
                    <div>
                      <div className="text-base font-extrabold font-display leading-snug text-[#1b4332]">
                        {lang.native}
                      </div>
                      <div className="text-xs font-bold text-stone-800 mt-0.5">
                        {lang.name}
                      </div>
                      <div className="text-[10px] text-stone-400 font-mono mt-1">
                        {lang.region}
                      </div>
                    </div>

                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-[#1b4332] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        ✓
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-xs flex-shrink-0">
                        →
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>🌐 9 Vernacular Indian Languages Supported</span>
              <button
                onClick={() => setIsLanguageModalOpen(false)}
                className="px-5 py-2.5 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold rounded-xl text-xs cursor-pointer transition-all shadow-sm"
              >
                Done / हो गया
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
