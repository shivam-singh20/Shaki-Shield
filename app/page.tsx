
'use client';

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import SOSButton from './components/SOSButton';
import GuardianCircle from './components/GuardianCircle';
import SafetyMap from './components/SafetyMap';
import IncidentLog from './components/IncidentLog';
import About from './components/About';
import Navigation from './components/Navigation';
import VoiceCommand from './components/VoiceCommand';

export default function Home() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const handleSOSActivation = () => {
    setIsSOSActive(true);
    setCurrentSection('emergency');
  };

  const handleSOSDeactivation = () => {
    setIsSOSActive(false);
    setCurrentSection('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation 
        currentSection={currentSection} 
        setCurrentSection={setCurrentSection}
        isSOSActive={isSOSActive}
      />
      
      <VoiceCommand onSOSActivation={handleSOSActivation} />
      
      <main className="pb-20">
        {currentSection === 'home' && <Hero />}
        
        {currentSection === 'dashboard' && (
          <div className="px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome to Shakti Shield
                </h1>
                <p className="text-gray-400">Your digital guardian is ready</p>
              </div>
              
              <SOSButton 
                onActivate={handleSOSActivation}
                userLocation={userLocation}
              />
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <i className="ri-shield-user-line text-2xl text-purple-400"></i>
                    </div>
                    <h3 className="text-xl font-semibold ml-3">Guardian Circle</h3>
                  </div>
                  <p className="text-gray-400 mb-4">Manage your trusted contacts</p>
                  <button 
                    onClick={() => setCurrentSection('guardians')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Manage Circle
                  </button>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <i className="ri-file-list-3-line text-2xl text-pink-400"></i>
                    </div>
                    <h3 className="text-xl font-semibold ml-3">Incident Log</h3>
                  </div>
                  <p className="text-gray-400 mb-4">Your private safety records</p>
                  <button 
                    onClick={() => setCurrentSection('incidents')}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    View Log
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentSection === 'emergency' && (
          <SafetyMap 
            userLocation={userLocation}
            onDeactivate={handleSOSDeactivation}
            isActive={isSOSActive}
          />
        )}
        
        {currentSection === 'guardians' && <GuardianCircle />}
        {currentSection === 'incidents' && <IncidentLog />}
        {currentSection === 'about' && <About />}
      </main>
    </div>
  );
}
