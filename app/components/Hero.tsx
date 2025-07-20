
'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20cityscape%20at%20night%20with%20neon%20lights%20and%20glowing%20purple%20pink%20accents%2C%20cyberpunk%20aesthetic%20with%20strong%20female%20silhouette%20in%20foreground%2C%20empowering%20and%20protective%20atmosphere%2C%20digital%20guardian%20concept%2C%20high-tech%20security%20theme%2C%20dark%20background%20with%20bright%20neon%20highlights%2C%20modern%20urban%20safety%20technology%20visualization&width=1920&height=1080&seq=hero1&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl w-full mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="mb-6">
              <h1 className="text-6xl md:text-7xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                  Shakti
                </span>
                <br />
                <span className="text-white">Shield</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                Your next-generation digital guardian. Empowering women with instant safety, 
                trusted networks, and life-saving technology at your fingertips.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={() => window.location.hash = '#dashboard'}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 whitespace-nowrap cursor-pointer"
              >
                Get Protected Now
              </button>
              <button className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all whitespace-nowrap cursor-pointer">
                Learn More
              </button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-shield-check-line text-lg text-green-400"></i>
                </div>
                <span className="ml-2">Instant SOS</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-team-line text-lg text-blue-400"></i>
                </div>
                <span className="ml-2">Guardian Circle</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-map-pin-line text-lg text-purple-400"></i>
                </div>
                <span className="ml-2">Live Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-arrow-down-line text-2xl text-white/60"></i>
        </div>
      </div>
    </div>
  );
}
