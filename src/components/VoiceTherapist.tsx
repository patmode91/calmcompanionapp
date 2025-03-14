import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Volume2, VolumeX, Mic, MicOff, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceTherapistProps {
  isActive: boolean;
  onClose: () => void;
  userName?: string;
  distressLevel?: "mild" | "moderate" | "severe" | null;
  onSpeakComplete?: () => void;
}

const VoiceTherapist: React.FC<VoiceTherapistProps> = ({
  isActive,
  onClose,
  userName = "there",
  distressLevel = null,
  onSpeakComplete = () => {},
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: "user" | "therapist" }>
  >([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      speechSynthesisRef.current = new SpeechSynthesisUtterance();
      speechSynthesisRef.current.rate = 1.0;
      speechSynthesisRef.current.pitch = 1.0;
      speechSynthesisRef.current.volume = 1.0;

      // Try to find a calm, soothing voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (voice) =>
          voice.name.includes("Female") ||
          voice.name.includes("Samantha") ||
          voice.name.includes("Karen"),
      );

      if (preferredVoice) {
        speechSynthesisRef.current.voice = preferredVoice;
      }

      speechSynthesisRef.current.onend = () => {
        setIsSpeaking(false);
        onSpeakComplete();
      };
    }

    return () => {
      if (speechSynthesisRef.current && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [onSpeakComplete]);

  // Load voices when they become available
  useEffect(() => {
    const loadVoices = () => {
      if (speechSynthesisRef.current && window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
          (voice) =>
            voice.name.includes("Female") ||
            voice.name.includes("Samantha") ||
            voice.name.includes("Karen"),
        );

        if (preferredVoice) {
          speechSynthesisRef.current.voice = preferredVoice;
        }
      }
    };

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Speak the welcome message when the component becomes active
  useEffect(() => {
    if (isActive && messages.length === 0) {
      const welcomeMessage = getWelcomeMessage();
      addTherapistMessage(welcomeMessage);
      speak(welcomeMessage);
    }
  }, [isActive]);

  // Auto-scroll to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getWelcomeMessage = () => {
    let message = `Hi ${userName}, I'm your voice assistant. `;

    if (distressLevel === "mild") {
      message +=
        "I'm here to help you through this mild distress. Let's try some simple breathing exercises together.";
    } else if (distressLevel === "moderate") {
      message +=
        "I understand you're experiencing moderate distress. I'm here to guide you through some effective coping strategies.";
    } else if (distressLevel === "severe") {
      message +=
        "I can see you're going through a difficult time. I'm here to support you and connect you with immediate help if needed.";
    } else {
      message +=
        "How are you feeling today? I'm here to listen and help you through whatever you're experiencing.";
    }

    return message;
  };

  const speak = (text: string) => {
    if (speechSynthesisRef.current && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      speechSynthesisRef.current.text = text;
      window.speechSynthesis.speak(speechSynthesisRef.current);
      setIsSpeaking(true);
    }
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript("");

    // This is a placeholder for actual speech recognition implementation
    // In a real implementation, you would use the Web Speech API or a library
    setTimeout(() => {
      // Simulating user input for demo purposes
      setTranscript("I'm feeling anxious about my upcoming presentation.");
      handleUserInput("I'm feeling anxious about my upcoming presentation.");
      setIsListening(false);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    // Stop the actual speech recognition here
  };

  const handleUserInput = (input: string) => {
    // Add user message
    addUserMessage(input);

    // Generate therapist response
    setTimeout(() => {
      const response = generateResponse(input);
      addTherapistMessage(response);
      speak(response);
    }, 1000);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, sender: "user" }]);
  };

  const addTherapistMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, sender: "therapist" }]);
  };

  const generateResponse = (input: string) => {
    // This is a simple rule-based response system
    // In a real implementation, you would use a more sophisticated AI system
    const inputLower = input.toLowerCase();

    if (inputLower.includes("anxious") || inputLower.includes("anxiety")) {
      return "It's completely normal to feel anxious about presentations. Let's try a quick breathing exercise together. Take a deep breath in for 4 counts, hold for 2, and exhale for 6. Would you like to try that now?";
    } else if (inputLower.includes("sad") || inputLower.includes("depressed")) {
      return "I'm sorry to hear you're feeling down. Remember that your feelings are valid, and it's okay to not be okay sometimes. Would you like to explore some grounding techniques that might help?";
    } else if (
      inputLower.includes("angry") ||
      inputLower.includes("frustrated")
    ) {
      return "I understand that feeling frustrated can be overwhelming. Let's try to identify what's triggering these feelings and work through them together. Would you like to talk more about what's causing this?";
    } else if (
      inputLower.includes("help") ||
      inputLower.includes("suicide") ||
      inputLower.includes("hurt")
    ) {
      return "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, it's important to reach out to a crisis helpline immediately. Would you like me to provide you with some resources?";
    } else {
      return "Thank you for sharing that with me. I'm here to listen and support you. Would you like to try some coping strategies that might help with what you're experiencing?";
    }
  };

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      handleUserInput(currentMessage);
      setCurrentMessage("");
    }
  };

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 w-80 md:w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-teal-200"
      >
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-3 flex justify-between items-center">
          <h3 className="text-white font-medium flex items-center">
            {isSpeaking ? (
              <Volume2 className="h-4 w-4 mr-2 animate-pulse" />
            ) : (
              <Volume2 className="h-4 w-4 mr-2" />
            )}
            Voice Therapist
          </h3>
          <div className="flex items-center space-x-2">
            {isSpeaking ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-teal-600"
                onClick={stopSpeaking}
              >
                <VolumeX className="h-4 w-4" />
              </Button>
            ) : null}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-teal-600"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="h-80 overflow-y-auto p-4 bg-blue-50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-3 ${message.sender === "user" ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-white text-blue-800 border border-blue-200"}`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t border-gray-200 bg-white">
          {isListening && (
            <div className="mb-2 text-sm text-teal-600 flex items-center">
              <div className="w-2 h-2 bg-teal-600 rounded-full mr-2 animate-pulse"></div>
              Listening... {transcript && `"${transcript}"`}
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className={`h-8 w-8 ${isListening ? "bg-teal-100 text-teal-700" : "text-gray-500"}`}
              onClick={toggleListening}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Button
              size="sm"
              className="bg-teal-500 hover:bg-teal-600 text-white"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceTherapist;
