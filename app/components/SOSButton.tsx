
'use client';

import { useState, useEffect } from 'react';

interface SOSButtonProps {
  onActivate: () => void;
  userLocation: { lat: number; lng: number } | null;
}

export default function SOSButton({ onActivate, userLocation }: SOSButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState(0);

  const handleMouseDown = () => {
    setIsPressed(true);
    setCountdown(3);
    
    const timer = setTimeout(() => {
      triggerSOS();
    }, 3000);
    
    setPressTimer(timer);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setCountdown(0);
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  const triggerSOS = () => {
    onActivate();
    
    if (userLocation) {
      const message = `EMERGENCY ALERT from Shakti Shield: I need immediate help! My location: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'EMERGENCY ALERT',
          text: message,
        });
      }
    }
    
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className={`relative w-64 h-64 rounded-full font-bold text-2xl transition-all duration-200 transform cursor-pointer whitespace-nowrap ${
            isPressed
              ? 'bg-red-600 scale-95 shadow-2xl shadow-red-500/50'
              : 'bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 hover:scale-105 shadow-xl shadow-red-500/30'
          }`}
          style={{
            boxShadow: isPressed 
              ? '0 0 50px rgba(239, 68, 68, 0.8), inset 0 0 30px rgba(0, 0, 0, 0.3)'
              : '0 0 30px rgba(239, 68, 68, 0.5)'
          }}
        >
          <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            {countdown > 0 ? (
              <>
                <div className="text-4xl font-bold mb-2">{countdown}</div>
                <div className="text-sm">Release to Cancel</div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  <i className="ri-alarm-warning-line text-4xl"></i>
                </div>
                <div>SOS</div>
                <div className="text-sm mt-1">Hold for 3 sec</div>
              </>
            )}
          </div>
        </button>
        
        {isPressed && (
          <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-ping"></div>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Emergency SOS</h2>
        <p className="text-gray-400 max-w-md">
          Hold the button for 3 seconds to activate emergency mode. 
          Your Guardian Circle will be immediately notified with your location.
        </p>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-center">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
            <i className="ri-mic-line text-2xl text-purple-400"></i>
          </div>
          <div className="font-semibold mb-1">Voice Commands</div>
          <div className="text-gray-400">Say "Shakti" or "Help"</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
            <i className="ri-map-pin-line text-2xl text-pink-400"></i>
          </div>
          <div className="font-semibold mb-1">Live Location</div>
          <div className="text-gray-400">Shared with guardians</div>
        </div>
      </div>
    </div>
  );
}
