import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface SelfHelpTechniquesProps {
  onClose?: () => void;
  userName?: string;
  withVoiceGuidance?: boolean;
}

const SelfHelpTechniques: React.FC<SelfHelpTechniquesProps> = ({
  onClose = () => {},
  userName = "Friend",
  withVoiceGuidance = true,
}) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] =
    useState<SpeechSynthesisUtterance | null>(null);

  const selfCareTips = [
    {
      title: "Deep Breathing",
      description:
        "Take 5 slow, deep breaths. Inhale for 4 counts, hold for 2, exhale for 6.",
      voiceScript:
        "Let's practice deep breathing together. Inhale slowly through your nose for 4 counts. Now hold your breath for 2 counts. And exhale slowly through your mouth for 6 counts. Let's repeat this 4 more times.",
    },
    {
      title: "Grounding Exercise",
      description:
        "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      voiceScript:
        "Let's try a grounding exercise. Look around you and name 5 things you can see. Now, identify 4 things you can touch or feel. Listen carefully and notice 3 things you can hear. Try to identify 2 things you can smell. Finally, notice 1 thing you can taste.",
    },
    {
      title: "Positive Affirmation",
      description:
        'Repeat to yourself: "This feeling is temporary. I am safe, and I will get through this."',
      voiceScript:
        "Let's practice a positive affirmation. Repeat after me: This feeling is temporary. I am safe, and I will get through this. Let's say it again: This feeling is temporary. I am safe, and I will get through this.",
    },
  ];

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      // Try to find a calm, soothing voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (voice) =>
          voice.name.includes("Female") ||
          voice.name.includes("Samantha") ||
          voice.name.includes("Karen"),
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      setSpeechSynthesis(utterance);
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Speak the current tip when it changes
  useEffect(() => {
    if (withVoiceGuidance && speechSynthesis) {
      speakTip(selfCareTips[currentTip].voiceScript);
    }
  }, [currentTip, withVoiceGuidance]);

  const nextTip = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setCurrentTip((prev) => (prev + 1) % selfCareTips.length);
  };

  const speakTip = (text: string) => {
    if (speechSynthesis && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      speechSynthesis.text = text;
      window.speechSynthesis.speak(speechSynthesis);
      setIsSpeaking(true);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    } else {
      speakTip(selfCareTips[currentTip].voiceScript);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-blue-50 to-green-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-blue-100 rounded-t-xl">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-blue-800">
                Taking Care of Yourself
              </CardTitle>
              {withVoiceGuidance && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSpeech}
                  className="text-blue-700 hover:bg-blue-200"
                >
                  {isSpeaking ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
              )}
            </div>
            <CardDescription className="text-blue-600">
              Hi {userName}, here are some gentle techniques to help you feel
              better.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <motion.div
                key={currentTip}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-blue-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  {isSpeaking && withVoiceGuidance && (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                    </div>
                  )}
                  <h3 className="text-xl font-medium text-blue-700">
                    {selfCareTips[currentTip].title}
                  </h3>
                </div>
                <p className="text-gray-700">
                  {selfCareTips[currentTip].description}
                </p>
              </motion.div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                  onClick={onClose}
                >
                  Back
                </Button>
                <Button
                  variant="outline"
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                  onClick={nextTip}
                >
                  Next Technique
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-blue-50 border-t border-blue-100 p-4 flex justify-center">
            <p className="text-sm text-blue-600 text-center">
              Remember: It's okay to ask for help. If you continue to feel
              distressed, consider reaching out to a friend, family member, or
              professional.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SelfHelpTechniques;
