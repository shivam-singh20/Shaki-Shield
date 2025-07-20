
'use client';

import { useEffect, useState } from 'react';

interface SafetyMapProps {
  userLocation: { lat: number; lng: number } | null;
  onDeactivate: () => void;
  isActive: boolean;
}

export default function SafetyMap({ userLocation, onDeactivate, isActive }: SafetyMapProps) {
  const [emergencyStartTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((new Date().getTime() - emergencyStartTime.getTime()) / 1000));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isActive, emergencyStartTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const shareLocation = () => {
    if (userLocation && navigator.share) {
      navigator.share({
        title: 'EMERGENCY: My Current Location',
        text: `I'm in an emergency situation. Please help! My location:`,
        url: `https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`
      });
    }
  };

  return (
    <div className="min-h-screen bg-red-950/20">
      <div className="bg-red-600 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center mr-3">
                <i className="ri-alarm-warning-fill text-2xl animate-pulse"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold">EMERGENCY MODE ACTIVE</h1>
                <div className="text-red-200">Duration: {formatTime(elapsedTime)}</div>
              </div>
            </div>
            <button
              onClick={onDeactivate}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              End Emergency
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <div className="w-6 h-6 flex items-center justify-center mr-2">
                <i className="ri-map-pin-fill text-red-400"></i>
              </div>
              Live Location
            </h2>
            
            {userLocation ? (
              <div>
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-400 mb-2">Current Coordinates</div>
                  <div className="font-mono text-sm">
                    Lat: {userLocation.lat.toFixed(6)}<br />
                    Lng: {userLocation.lng.toFixed(6)}
                  </div>
                </div>
                
                <div className="h-64 bg-gray-900/30 rounded-lg mb-4 flex items-center justify-center">
                  <iframe
                    src={`https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=15&output=embed`}
                    width="100%"
                    height="100%"
                    className="rounded-lg border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                
                <button
                  onClick={shareLocation}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Share Location
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <i className="ri-map-pin-line text-4xl text-gray-400"></i>
                </div>
                <p className="text-gray-400">Location access required for emergency features</p>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-2">
                  <i className="ri-shield-user-fill text-green-400"></i>
                </div>
                Guardian Circle Status
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-600/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span>Emergency contacts notified</span>
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-check-line text-green-400"></i>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span>Location shared securely</span>
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-check-line text-blue-400"></i>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                    <span>Awaiting response</span>
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-time-line text-yellow-400"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Emergency Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                  <div className="w-5 h-5 flex items-center justify-center inline-block mr-2">
                    <i className="ri-phone-line"></i>
                  </div>
                  Call Emergency Services
                </button>
                
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                  <div className="w-5 h-5 flex items-center justify-center inline-block mr-2">
                    <i className="ri-message-3-line"></i>
                  </div>
                  Send Custom Message
                </button>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                  <div className="w-5 h-5 flex items-center justify-center inline-block mr-2">
                    <i className="ri-camera-line"></i>
                  </div>
                  Record Evidence
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
