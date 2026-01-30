import { useState, useEffect, useCallback } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpeechInputProps {
  onTranscript: (transcript: string) => void;
  transcript: string;
}

export const SpeechInput = ({ onTranscript, transcript }: SpeechInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [interimTranscript, setInterimTranscript] = useState("");

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      if (finalTranscript) {
        onTranscript(transcript + " " + finalTranscript);
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };

    recognition.start();

    // Store recognition instance for stopping
    (window as any).currentRecognition = recognition;
  }, [transcript, onTranscript]);

  const stopListening = useCallback(() => {
    const recognition = (window as any).currentRecognition;
    if (recognition) {
      recognition.stop();
      (window as any).currentRecognition = null;
    }
    setIsListening(false);
    setInterimTranscript("");
  }, []);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className="text-center p-8 border-2 border-dashed border-muted rounded-xl">
        <MicOff className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">
          Speech recognition is not supported in your browser.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Please use Chrome, Edge, or Safari for this feature.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button
        type="button"
        onClick={toggleListening}
        className={`w-full h-14 text-lg font-medium transition-all duration-300 ${
          isListening
            ? "bg-destructive hover:bg-destructive/90"
            : "bg-primary/20 hover:bg-primary/30 border-2 border-primary text-primary"
        }`}
        variant={isListening ? "destructive" : "outline"}
      >
        {isListening ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="w-5 h-5 mr-2" />
            Start Speaking
          </>
        )}
      </Button>

      {/* Live transcript display */}
      <div className="relative min-h-[200px] p-4 rounded-xl bg-muted/30 border border-muted">
        {isListening && (
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs text-muted-foreground">Listening...</span>
          </div>
        )}
        
        <div className="text-sm">
          {transcript || interimTranscript ? (
            <>
              <span>{transcript}</span>
              {interimTranscript && (
                <span className="text-muted-foreground opacity-70">
                  {" "}{interimTranscript}
                </span>
              )}
            </>
          ) : (
            <span className="text-muted-foreground">
              {isListening 
                ? "Speak now... Your words will appear here."
                : "Click 'Start Speaking' to begin voice input for analysis."
              }
            </span>
          )}
        </div>

        {transcript && (
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {transcript.length} characters
          </div>
        )}
      </div>
    </div>
  );
};

// Add type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
