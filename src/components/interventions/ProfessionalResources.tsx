import React, { useState, useEffect } from "react";
import {
  Phone,
  MessageSquare,
  ExternalLink,
  Info,
  ArrowLeft,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

interface ProfessionalResourcesProps {
  onBack?: () => void;
  isPremiumUser?: boolean;
  hotlines?: Array<{ name: string; number: string; description: string }>;
  isOpen?: boolean;
  withVoiceGuidance?: boolean;
}

const ProfessionalResources: React.FC<ProfessionalResourcesProps> = ({
  onBack = () => {},
  isPremiumUser = false,
  hotlines = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "1-800-273-8255",
      description:
        "Available 24/7 for emotional support during crisis situations.",
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Connect with a crisis counselor via text message.",
    },
    {
      name: "SAMHSA's National Helpline",
      number: "1-800-662-4357",
      description:
        "Treatment referral and information service for individuals facing mental health challenges.",
    },
  ],
  isOpen = true,
  withVoiceGuidance = true,
}) => {
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const [selectedHotline, setSelectedHotline] = useState<null | {
    name: string;
    number: string;
    description: string;
  }>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] =
    useState<SpeechSynthesisUtterance | null>(null);

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

  // Initial voice guidance
  useEffect(() => {
    if (withVoiceGuidance && speechSynthesis && isOpen) {
      const welcomeText =
        "Based on your responses, I recommend connecting with professional support. Here are some resources that can help you right now. You can speak with trained crisis counselors through hotlines, or connect with a licensed therapist through our chat service.";
      speak(welcomeText);
    }
  }, [isOpen, withVoiceGuidance]);

  const handleTherapistChatClick = () => {
    if (!isPremiumUser) {
      setShowPremiumDialog(true);
    } else {
      // Logic to open therapist chat would go here
      console.log("Opening therapist chat");
    }
  };

  const handleHotlineClick = (hotline: {
    name: string;
    number: string;
    description: string;
  }) => {
    setSelectedHotline(hotline);

    if (withVoiceGuidance && speechSynthesis) {
      const hotlineText = `You've selected ${hotline.name}. ${hotline.description} The number is ${hotline.number.split("").join(" ")}.`;
      speak(hotlineText);
    }
  };

  const speak = (text: string) => {
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
      const welcomeText =
        "Based on your responses, I recommend connecting with professional support. Here are some resources that can help you right now. You can speak with trained crisis counselors through hotlines, or connect with a licensed therapist through our chat service.";
      speak(welcomeText);
    }
  };

  return (
    <div className="bg-teal-50 min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            Back to Assessment
          </Button>

          {withVoiceGuidance && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSpeech}
              className="text-teal-700 hover:bg-teal-100"
            >
              {isSpeaking ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-700 mb-2">
            Professional Support
          </h1>
          <p className="text-lg text-teal-600">
            Based on your responses, we recommend connecting with professional
            support. Here are resources that can help you right now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white border-teal-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-teal-700 flex items-center gap-2">
                <Phone size={20} />
                Hotline Support
              </CardTitle>
              <CardDescription>
                Speak with trained crisis counselors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {hotlines.map((hotline, index) => (
                  <li
                    key={index}
                    className="border-b border-teal-100 pb-3 last:border-0"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left hover:bg-teal-50"
                      onClick={() => handleHotlineClick(hotline)}
                    >
                      <div>
                        <h3 className="font-medium text-teal-700">
                          {hotline.name}
                        </h3>
                        <p className="text-teal-600">{hotline.number}</p>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-teal-300 text-teal-700 hover:bg-teal-100"
              >
                <ExternalLink size={16} className="mr-2" />
                View All Resources
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white border-teal-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-teal-700 flex items-center gap-2">
                <MessageSquare size={20} />
                Professional Chat
              </CardTitle>
              <CardDescription>
                Connect with a licensed therapist
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=therapist"
                  alt="Therapist"
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-teal-100 p-1"
                />
                <p className="text-teal-600 mb-4">
                  {isPremiumUser
                    ? "As a premium user, you have access to our licensed therapists for immediate support."
                    : "Upgrade to premium for immediate access to licensed therapists."}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${isPremiumUser ? "bg-teal-600 hover:bg-teal-700" : "bg-purple-600 hover:bg-purple-700"}`}
                onClick={handleTherapistChatClick}
              >
                {isPremiumUser ? "Start Chat Now" : "Upgrade to Premium"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-teal-100 p-6 rounded-xl border border-teal-200 flex items-start gap-4">
          <Info size={24} className="text-teal-700 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-teal-800 mb-2">Remember</h3>
            <p className="text-teal-700">
              It's okay to ask for help. Professional support can provide you
              with strategies and resources to manage your current situation. If
              you feel your condition is worsening, please don't hesitate to
              call emergency services or visit your nearest emergency room.
            </p>
          </div>
        </div>
      </div>

      {/* Premium Upgrade Dialog */}
      <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-purple-700">
              Upgrade to Premium
            </DialogTitle>
            <DialogDescription>
              Get immediate access to licensed therapists and additional mental
              health resources.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <ul className="space-y-2">
              {[
                "24/7 access to licensed therapists",
                "Unlimited chat sessions",
                "Personalized coping strategies",
                "Priority crisis support",
                "Advanced meditation and breathing exercises",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPremiumDialog(false)}
            >
              Maybe Later
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Upgrade Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hotline Information Dialog */}
      <Dialog
        open={!!selectedHotline}
        onOpenChange={() => setSelectedHotline(null)}
      >
        <DialogContent className="bg-white">
          {selectedHotline && (
            <>
              <DialogHeader>
                <DialogTitle className="text-teal-700">
                  {selectedHotline.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedHotline.description}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200 text-center mb-4">
                  <p className="text-sm text-teal-600 mb-2">Contact Number</p>
                  <p className="text-xl font-bold text-teal-700">
                    {selectedHotline.number}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  When you call, a trained counselor will listen to you,
                  understand your situation, and provide support and resources.
                  All calls are confidential and available 24/7.
                </p>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-teal-300 text-teal-700"
                  onClick={() => setSelectedHotline(null)}
                >
                  Close
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Phone size={16} className="mr-2" />
                  Call Now
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfessionalResources;
