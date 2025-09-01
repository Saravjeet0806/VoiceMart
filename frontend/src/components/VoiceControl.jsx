import React, { useState, useEffect, useRef } from 'react';

// Check for browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = true;
}

const VoiceControl = ({ processCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!recognition) return;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript('');
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      setTranscript(currentTranscript);

      // Reset timeout on new speech
      clearTimeout(timeoutRef.current);

      if (event.results[0].isFinal) {
        processCommand(currentTranscript);
      } else {
        // If the user pauses, treat it as the final command
        timeoutRef.current = setTimeout(() => {
            recognition.stop();
            processCommand(currentTranscript);
        }, 1500); // 1.5 second pause
      }
    };
  }, [processCommand]);

  const handleMicClick = () => {
    if (!recognition) {
        alert("Sorry, your browser doesn't support speech recognition.");
        return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
        <p className="text-gray-500 h-6 mb-2 text-center italic">
            {isListening ? transcript : 'Press the mic and say "Add 2 kg apples" or "Remove apples"'}
        </p>
      <button
        onClick={handleMicClick}
        className={`mt-10 sm:mt-0 relative rounded-full p-4 transition-colors duration-300 focus:outline-none ${
          isListening ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'
        }`}
      >
        {isListening && <span className="mic-pulse"></span>}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm5 4a1 1 0 10-2 0v1a1 1 0 102 0V8zM5 8a1 1 0 00-1 1v1a4 4 0 004 4h1a4 4 0 004-4v-1a1 1 0 10-2 0v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default VoiceControl;