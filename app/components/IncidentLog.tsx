
'use client';

import { useState } from 'react';

interface Incident {
  id: string;
  date: string;
  time: string;
  type: 'emergency' | 'concern' | 'harassment' | 'other';
  location: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
}

export default function IncidentLog() {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: '1',
      date: '2024-01-15',
      time: '20:30',
      type: 'concern',
      location: 'Downtown parking garage',
      description: 'Felt unsafe walking alone to car. Poor lighting and no security presence.',
      severity: 'medium',
      resolved: true
    },
    {
      id: '2',
      date: '2024-01-10',
      time: '14:15',
      type: 'harassment',
      location: 'Coffee shop on Main St',
      description: 'Unwanted attention from stranger who followed me for several blocks.',
      severity: 'high',
      resolved: false
    }
  ]);

  const [isAddingIncident, setIsAddingIncident] = useState(false);
  const [newIncident, setNewIncident] = useState({
    type: 'concern' as const,
    location: '',
    description: '',
    severity: 'medium' as const
  });

  const addIncident = () => {
    if (newIncident.description) {
      const now = new Date();
      const incident: Incident = {
        id: Date.now().toString(),
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().slice(0, 5),
        resolved: false,
        ...newIncident
      };
      setIncidents([incident, ...incidents]);
      setNewIncident({
        type: 'concern',
        location: '',
        description: '',
        severity: 'medium'
      });
      setIsAddingIncident(false);
    }
  };

  const toggleResolved = (id: string) => {
    setIncidents(incidents.map(incident => 
      incident.id === id ? { ...incident, resolved: !incident.resolved } : incident
    ));
  };

  const deleteIncident = (id: string) => {
    setIncidents(incidents.filter(incident => incident.id !== id));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-600/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-600/20 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-600/20 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-600/20 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return 'ri-alarm-warning-line';
      case 'harassment': return 'ri-user-forbid-line';
      case 'concern': return 'ri-alert-line';
      default: return 'ri-information-line';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Incident Log</h1>
            <p className="text-gray-400">Your private safety records and documentation</p>
          </div>
          <button
            onClick={() => setIsAddingIncident(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <div className="w-5 h-5 flex items-center justify-center inline-block mr-2">
              <i className="ri-add-line"></i>
            </div>
            New Entry
          </button>
        </div>
        
        <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-start">
            <div className="w-6 h-6 flex items-center justify-center mt-1 mr-3">
              <i className="ri-lock-line text-purple-400"></i>
            </div>
            <div>
              <h3 className="font-semibold text-purple-400 mb-1">Privacy & Security</h3>
              <p className="text-purple-300 text-sm">
                All entries are encrypted and stored locally. Only you have access to this information. 
                Use this log to document any safety concerns for your own records.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {incidents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-list-line text-6xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">No incidents recorded</h3>
            <p className="text-gray-400">Your incident log is empty. Add an entry to get started.</p>
          </div>
        ) : (
          incidents.map((incident) => (
            <div key={incident.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg mr-4">
                    <i className={`${getTypeIcon(incident.type)} text-xl text-gray-300`}></i>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold capitalize">{incident.type}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity.toUpperCase()}
                      </span>
                      {incident.resolved && (
                        <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full">
                          Resolved
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-400 space-x-4">
                      <div className="flex items-center">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-calendar-line"></i>
                        </div>
                        {incident.date}
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-time-line"></i>
                        </div>
                        {incident.time}
                      </div>
                      {incident.location && (
                        <div className="flex items-center">
                          <div className="w-4 h-4 flex items-center justify-center mr-1">
                            <i className="ri-map-pin-line"></i>
                          </div>
                          {incident.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleResolved(incident.id)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors cursor-pointer whitespace-nowrap ${
                      incident.resolved
                        ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {incident.resolved ? 'Resolved' : 'Mark Resolved'}
                  </button>
                  <button
                    onClick={() => deleteIncident(incident.id)}
                    className="text-red-400 hover:text-red-300 p-2 hover:bg-red-600/20 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-delete-bin-line"></i>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{incident.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {isAddingIncident && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Incident</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['emergency', 'harassment', 'concern', 'other'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewIncident({...newIncident, type: type as any})}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                        newIncident.type === type
                          ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 flex items-center justify-center mr-2">
                          <i className={`${getTypeIcon(type)}`}></i>
                        </div>
                        <span className="capitalize">{type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Severity</label>
                <div className="grid grid-cols-3 gap-2">
                  {['low', 'medium', 'high'].map((severity) => (
                    <button
                      key={severity}
                      onClick={() => setNewIncident({...newIncident, severity: severity as any})}
                      className={`p-2 rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                        newIncident.severity === severity
                          ? getSeverityColor(severity).replace('text-', 'border-').replace('-400', '-500').replace('bg-', 'bg-')
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <span className="capitalize font-medium">{severity}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Location (Optional)</label>
                <input
                  type="text"
                  value={newIncident.location}
                  onChange={(e) => setNewIncident({...newIncident, location: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 text-sm"
                  placeholder="Where did this occur?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={newIncident.description}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setNewIncident({...newIncident, description: e.target.value});
                    }
                  }}
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 text-sm resize-none"
                  placeholder="Describe what happened in detail..."
                />
                <div className="text-right text-xs text-gray-400 mt-1">
                  {newIncident.description.length}/500 characters
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={addIncident}
                disabled={!newIncident.description}
                className={`flex-1 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  newIncident.description
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Add Entry
              </button>
              <button
                onClick={() => setIsAddingIncident(false)}
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
