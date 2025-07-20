
'use client';

export default function Navigation({ currentSection, setCurrentSection, isSOSActive }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'ri-home-line' },
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
    { id: 'guardians', label: 'Guardians', icon: 'ri-team-line' },
    { id: 'incidents', label: 'Incidents', icon: 'ri-file-list-3-line' },
    { id: 'about', label: 'About', icon: 'ri-information-line' }
  ];

  if (isSOSActive) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-red-900/90 backdrop-blur-sm border-b border-red-700">
        <div className="px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-alarm-warning-line text-2xl text-red-400 animate-pulse"></i>
              </div>
              <span className="text-xl font-bold text-red-400">EMERGENCY MODE ACTIVE</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-shield-user-line text-2xl text-purple-400"></i>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Shakti Shield
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    currentSection === item.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className={item.icon}></i>
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            
            <div className="w-8"></div>
          </div>
        </div>
      </nav>
      
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-gray-900/90 backdrop-blur-sm border-t border-gray-800">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors cursor-pointer ${
                currentSection === item.id
                  ? 'text-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center mb-1">
                <i className={`${item.icon} text-xl`}></i>
              </div>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
