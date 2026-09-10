import React, { useState } from 'react';
import { 
  User, 
  LogOut, 
  LogIn, 
  ShieldCheck, 
  Phone, 
  Check, 
  X, 
  Sparkles,
  AlertCircle,
  Building2,
  Tractor
} from 'lucide-react';
import { MongoUser } from '../types';

export const DEMO_PROFILES: MongoUser[] = [
  {
    id: 'usr-admin-01',
    name: 'Admin',
    phone: '+91 99999 00000',
    role: 'admin',
    district: 'System HQ',
    taluk: 'Headquarters',
    verified: true,
    email: 'admin@krishisetu.in',
  },
  {
    id: 'usr-f-01',
    name: 'Sardar Gurpreet Singh',
    phone: '+91 98765 43210',
    role: 'farmer',
    district: 'Ludhiana',
    taluk: 'Khanna',
    verified: true,
    email: 'gurpreet.farm@krishisetu.in',
  },
  {
    id: 'usr-f-02',
    name: 'Basavaraj Patil & FPO',
    phone: '+91 98123 45678',
    role: 'farmer',
    district: 'Dharwad',
    taluk: 'Hubballi',
    verified: true,
    email: 'basavaraj.patil@krishisetu.in',
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
  },
  {
    id: 'usr-b-01',
    name: 'Vikram Singhania (Buyer)',
    phone: '+91 98450 12345',
    role: 'buyer',
    district: 'Delhi NCR',
    taluk: 'Azadpur APMC',
    verified: true,
    email: 'vikram.singhania@apexagro.in',
  },
];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: MongoUser | null;
  onLogin: (user: MongoUser) => void;
  onLogout: () => void;
  initialMode?: 'login' | 'logoutConfirm';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  initialMode = 'login',
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customName, setCustomName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'buyer'>('farmer');
  const [loginStep, setLoginStep] = useState<'select' | 'custom'>('select');

  if (!isOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.trim() || '9876543210';
    const cleanName = customName.trim() || (selectedRole === 'farmer' ? 'Kisan Member' : 'Agri Buyer');
    
    const isAdminUser = cleanName.toLowerCase() === 'admin' || cleanName.toLowerCase().includes('admin');
    const roleToAssign = isAdminUser ? 'admin' : selectedRole;
    
    const customUser: MongoUser = {
      id: `usr-${Date.now().toString().slice(-6)}`,
      name: cleanName,
      phone: cleanPhone.startsWith('+91') ? cleanPhone : `+91 ${cleanPhone}`,
      role: roleToAssign,
      district: isAdminUser ? 'System HQ' : (selectedRole === 'farmer' ? 'Ludhiana' : 'Delhi NCR'),
      taluk: isAdminUser ? 'Headquarters' : (selectedRole === 'farmer' ? 'Khanna' : 'Azadpur'),
      verified: true,
      email: `${cleanName.toLowerCase().replace(/\s+/g, '.')}@agriconnect.in`,
    };

    onLogin(customUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 text-stone-900 shadow-2xl border border-stone-200/90 space-y-5 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-[#1b4332] text-emerald-300 flex items-center justify-center shadow-xs border border-emerald-900/40">
              <User className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-extrabold font-display text-stone-900">
                {initialMode === 'logoutConfirm' ? 'Account Profile' : 'Select User Profile'}
              </h3>
              <p className="text-xs text-stone-500 font-mono font-semibold">AgriConnect Identity System</p>
            </div>
          </div>

          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100 transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {initialMode === 'logoutConfirm' && currentUser ? (
          <div className="space-y-4">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 font-mono text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Current User:</span>
                <strong className="text-stone-900 font-extrabold">{currentUser.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Role:</span>
                <strong className="text-[#1b4332] uppercase font-bold">{currentUser.role}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-sans">Location:</span>
                <span className="text-stone-700 font-semibold">{currentUser.district}, {currentUser.taluk}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="flex-1 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-3 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold rounded-2xl text-xs cursor-pointer shadow-md transition-all border border-emerald-900/40"
              >
                Continue Session
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {loginStep === 'select' ? (
              <>
                <p className="text-xs text-stone-600 leading-relaxed font-sans font-medium">
                  Choose a verified demo profile or log in with your phone number:
                </p>

                <div className="space-y-2.5">
                  {DEMO_PROFILES.map((profile) => {
                    const isCurrent = currentUser?.id === profile.id;
                    return (
                      <div
                        key={profile.id}
                        onClick={() => {
                          onLogin(profile);
                          onClose();
                        }}
                        className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 border ${
                          isCurrent 
                            ? 'border-[#1b4332] bg-emerald-50/60 shadow-xs' 
                            : 'border-stone-200/90 bg-stone-50/50 hover:bg-stone-50 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-stone-900 text-stone-100 font-extrabold text-xs flex items-center justify-center border border-stone-800 shadow-xs">
                            {profile.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xs font-extrabold text-stone-900 font-display">{profile.name}</h4>
                            <p className="text-[11px] text-stone-500 font-mono font-semibold">
                              {profile.role.toUpperCase()} • {profile.district}
                            </p>
                          </div>
                        </div>

                        {isCurrent ? (
                          <span className="text-[10px] bg-[#1b4332] text-emerald-100 px-3 py-1 rounded-full font-black font-mono shadow-xs border border-emerald-900/40">
                            Active
                          </span>
                        ) : (
                          <span className="text-xs text-[#1b4332] font-extrabold font-mono hover:underline">Select →</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <button
                    onClick={() => setLoginStep('custom')}
                    className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-800 rounded-2xl text-xs font-extrabold font-mono text-center cursor-pointer transition-all shadow-xs"
                  >
                    + Enter Custom Phone Number
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleCustomLogin} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-stone-700 font-bold mb-1 font-mono">Your Name</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full p-3 bg-stone-50 border border-stone-300/90 rounded-2xl text-stone-900 font-medium outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1 font-mono">Mobile Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="9876543210"
                    className="w-full p-3 bg-stone-50 border border-stone-300/90 rounded-2xl text-stone-900 font-medium outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-2xs"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 font-mono">
                  <button
                    type="button"
                    onClick={() => setLoginStep('select')}
                    className="px-4 py-2.5 bg-stone-100 text-stone-700 rounded-2xl font-bold hover:bg-stone-200 transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#1b4332] text-white rounded-2xl font-extrabold hover:bg-[#143527] transition-all cursor-pointer shadow-sm border border-emerald-900/40"
                  >
                    Save & Login
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
