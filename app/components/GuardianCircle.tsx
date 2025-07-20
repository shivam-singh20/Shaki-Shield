
'use client';

import { useState } from 'react';

interface Guardian {
  id: string;
  name: string;
  phone: string;
  email: string;
  relationship: string;
  isPrimary: boolean;
}

export default function GuardianCircle() {
  const [guardians, setGuardians] = useState<Guardian[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      phone: '+1 555-0123',
      email: 'sarah.j@email.com',
      relationship: 'Best Friend',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Mom',
      phone: '+1 555-0456',
      email: 'mom@family.com',
      relationship: 'Mother',
      isPrimary: true
    },
    {
      id: '3',
      name: 'Alex Chen',
      phone: '+1 555-0789',
      email: 'alex.chen@email.com',
      relationship: 'Colleague',
      isPrimary: false
    }
  ]);

  const [isAddingGuardian, setIsAddingGuardian] = useState(false);
  const [newGuardian, setNewGuardian] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    isPrimary: false
  });

  const addGuardian = () => {
    if (newGuardian.name && newGuardian.phone) {
      const guardian: Guardian = {
        id: Date.now().toString(),
        ...newGuardian
      };
      setGuardians([...guardians, guardian]);
      setNewGuardian({
        name: '',
        phone: '',
        email: '',
        relationship: '',
        isPrimary: false
      });
      setIsAddingGuardian(false);
    }
  };

  const removeGuardian = (id: string) => {
    setGuardians(guardians.filter(g => g.id !== id));
  };

  const togglePrimary = (id: string) => {
    setGuardians(guardians.map(g => 
      g.id === id ? { ...g, isPrimary: !g.isPrimary } : g
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Guardian Circle</h1>
            <p className="text-gray-400">Manage your trusted emergency contacts</p>
          </div>
          <button
            onClick={() => setIsAddingGuardian(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <div className="w-5 h-5 flex items-center justify-center inline-block mr-2">
              <i className="ri-add-line"></i>
            </div>
            Add Guardian
          </button>
        </div>
        
        <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start">
            <div className="w-6 h-6 flex items-center justify-center mt-1 mr-3">
              <i className="ri-information-line text-blue-400"></i>
            </div>
            <div>
              <h3 className="font-semibold text-blue-400 mb-1">How it works</h3>
              <p className="text-blue-300 text-sm">
                When you activate SOS, your primary guardians receive immediate alerts with your location. 
                Secondary guardians are notified after 2 minutes if the emergency continues.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 mb-8">
        {guardians.map((guardian) => (
          <div key={guardian.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {guardian.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold mr-2">{guardian.name}</h3>
                    {guardian.isPrimary && (
                      <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400">{guardian.relationship}</p>
                  <div className="flex items-center mt-2 space-x-4 text-sm">
                    <div className="flex items-center text-gray-300">
                      <div className="w-4 h-4 flex items-center justify-center mr-1">
                        <i className="ri-phone-line"></i>
                      </div>
                      {guardian.phone}
                    </div>
                    {guardian.email && (
                      <div className="flex items-center text-gray-300">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-mail-line"></i>
                        </div>
                        {guardian.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => togglePrimary(guardian.id)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors cursor-pointer whitespace-nowrap ${
                    guardian.isPrimary
                      ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {guardian.isPrimary ? 'Primary' : 'Secondary'}
                </button>
                <button
                  onClick={() => removeGuardian(guardian.id)}
                  className="text-red-400 hover:text-red-300 p-2 hover:bg-red-600/20 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-delete-bin-line"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAddingGuardian && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold mb-4">Add New Guardian</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={newGuardian.name}
                  onChange={(e) => setNewGuardian({...newGuardian, name: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 text-sm"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={newGuardian.phone}
                  onChange={(e) => setNewGuardian({...newGuardian, phone: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 text-sm"
                  placeholder="+1 555-0123"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={newGuardian.email}
                  onChange={(e) => setNewGuardian({...newGuardian, email: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 text-sm"
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Relationship</label>
                <input
                  type="text"
                  value={newGuardian.relationship}
                  onChange={(e) => setNewGuardian({...newGuardian, relationship: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 text-sm"
                  placeholder="e.g., Sister, Friend, Colleague"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="primary"
                  checked={newGuardian.isPrimary}
                  onChange={(e) => setNewGuardian({...newGuardian, isPrimary: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="primary" className="text-sm">Set as primary guardian</label>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={addGuardian}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Add Guardian
              </button>
              <button
                onClick={() => setIsAddingGuardian(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
