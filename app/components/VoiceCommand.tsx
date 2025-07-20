
'use client';

import { useEffect, useState } from 'react';

interface VoiceCommandProps {
  onSOSActivation: () => void;
}

export default function VoiceCommand({ onSOSActivation }: VoiceCommandProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase().trim();
        
        if (command.includes('shakti') || command.includes('help') || command.includes('emergency')) {
          onSOSActivation();
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        if (permissionGranted && isListening) {
          try {
            recognitionInstance.start();
          } catch (error) {
            console.log('Recognition restart failed');
          }
        }
      };
      
      setRecognition(recognitionInstance);
    }
  }, [onSOSActivation, permissionGranted, isListening]);

  const requestMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionGranted(true);
      startListening();
    } catch (error) {
      console.log('Microphone permission denied');
    }
  };

  const startListening = () => {
    if (recognition && permissionGranted) {
      setIsListening(true);
      try {
        recognition.start();
      } catch (error) {
        console.log('Recognition already started');
      }
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!permissionGranted ? (
        <button
          onClick={requestMicrophonePermission}
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-colors cursor-pointer whitespace-nowrap"
          title="Enable voice commands"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <i className="ri-mic-line text-xl"></i>
          </div>
        </button>
      ) : (
        <div className="flex flex-col items-end space-y-2">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-3 rounded-full shadow-lg transition-colors cursor-pointer whitespace-nowrap ${
              isListening
                ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
            title={isListening ? 'Voice commands active' : 'Start voice commands'}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className={`ri-${isListening ? 'mic-fill' : 'mic-line'} text-xl`}></i>
            </div>
          </button>
          
          {isListening && (
            <div className="bg-gray-800/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                Listening for "Shakti" or "Help"
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
