import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  Phone,
  Send,
  UserRound,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface EmergencyAlertsProps {
  onClose?: () => void;
  onSendAlert?: (contacts: EmergencyContact[]) => void;
  onConnectToCrisisServices?: () => void;
  isOpen?: boolean;
  withVoiceGuidance?: boolean;
}

const EmergencyAlerts: React.FC<EmergencyAlertsProps> = ({
  onClose = () => {},
  onSendAlert = () => {},
  onConnectToCrisisServices = () => {},
  isOpen = true,
  withVoiceGuidance = true,
}) => {
  const [step, setStep] = useState<"initial" | "confirmation" | "sent">(
    "initial",
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] =
    useState<SpeechSynthesisUtterance | null>(null);

  // Mock emergency contacts
  const [emergencyContacts] = useState<EmergencyContact[]>([
    {
      id: "1",
      name: "Jane Doe",
      phone: "(555) 123-4567",
      relationship: "Family",
    },
    {
      id: "2",
      name: "John Smith",
      phone: "(555) 987-6543",
      relationship: "Friend",
    },
    {
      id: "3",
      name: "Dr. Wilson",
      phone: "(555) 456-7890",
      relationship: "Therapist",
    },
  ]);

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

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
      const welcomeText = getStepVoiceText();
      speak(welcomeText);
    }
  }, [isOpen, step, withVoiceGuidance]);

  const getStepVoiceText = () => {
    switch (step) {
      case "initial":
        return "You've indicated you're experiencing severe distress. I'm here to help you get immediate assistance. You can alert your emergency contacts or connect directly to crisis services. Please select the contacts you'd like to alert.";
      case "confirmation":
        return "Please confirm that you want to alert these emergency contacts. They will receive a message with your current location and a request to check on you immediately.";
      case "sent":
        return "Alert sent successfully. Your emergency contacts have been notified and help is on the way. Stay where you are if it's safe to do so. While you wait, try to take slow, deep breaths and focus on your surroundings.";
      default:
        return "";
    }
  };

  const handleToggleContact = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id)
        ? prev.filter((contactId) => contactId !== id)
        : [...prev, id],
    );
  };

  const handleConfirmAlert = () => {
    setStep("confirmation");
    if (withVoiceGuidance && speechSynthesis) {
      speak(getStepVoiceText());
    }
  };

  const handleSendAlert = () => {
    const contactsToAlert = emergencyContacts.filter((contact) =>
      selectedContacts.includes(contact.id),
    );
    onSendAlert(contactsToAlert);
    setStep("sent");
    if (withVoiceGuidance && speechSynthesis) {
      speak(getStepVoiceText());
    }
  };

  const handleBackToAssessment = () => {
    setStep("initial");
    onClose();
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
      speak(getStepVoiceText());
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-red-50 max-w-2xl">
        <DialogHeader className="flex justify-between items-start">
          <div>
            <DialogTitle className="flex items-center text-red-700 text-2xl">
              <AlertTriangle className="mr-2 h-6 w-6" />
              Emergency Intervention
            </DialogTitle>
            <DialogDescription className="text-red-700 text-lg">
              {step === "initial" &&
                "You've indicated you're experiencing severe distress. Let's get you immediate help."}
              {step === "confirmation" &&
                "Please confirm you want to alert these emergency contacts."}
              {step === "sent" && "Alert sent. Help is on the way."}
            </DialogDescription>
          </div>

          {withVoiceGuidance && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSpeech}
              className="text-red-700 hover:bg-red-100"
            >
              {isSpeaking ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
          )}
        </DialogHeader>

        <div className="py-4">
          {step === "initial" && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">
                  Select emergency contacts to alert:
                </h3>
                <div className="space-y-3">
                  {emergencyContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center justify-between p-3 rounded-md border ${selectedContacts.includes(contact.id) ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                      onClick={() => handleToggleContact(contact.id)}
                    >
                      <div className="flex items-center">
                        <UserRound className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-500">
                            {contact.relationship}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500 mr-2">
                          {contact.phone}
                        </p>
                        {selectedContacts.includes(contact.id) ? (
                          <X className="h-5 w-5 text-red-500" />
                        ) : (
                          <Phone className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">Crisis Services</h3>
                <p className="mb-4">
                  Connect directly to professional crisis support services:
                </p>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={onConnectToCrisisServices}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Connect to Crisis Services
                </Button>
              </div>
            </div>
          )}

          {step === "confirmation" && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-4 text-center">
                  You are about to alert:
                </h3>
                <div className="space-y-3">
                  {emergencyContacts
                    .filter((contact) => selectedContacts.includes(contact.id))
                    .map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center p-3 rounded-md border border-red-200 bg-red-50"
                      >
                        <UserRound className="h-5 w-5 text-red-500 mr-3" />
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-500">
                            {contact.relationship} • {contact.phone}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  These contacts will receive a message with your current
                  location and a request to check on you immediately.
                </p>
              </div>
            </div>
          )}

          {step === "sent" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-medium text-xl mb-2">
                  Alert Sent Successfully
                </h3>
                <p className="mb-4">
                  Your emergency contacts have been notified and help is on the
                  way. Stay where you are if it's safe to do so.
                </p>
                <div className="p-4 bg-blue-50 rounded-md border border-blue-100 text-left">
                  <h4 className="font-medium mb-2">While you wait:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Take slow, deep breaths</li>
                    <li>
                      Focus on your surroundings - name 5 things you can see
                    </li>
                    <li>If possible, move to a quiet, safe space</li>
                    <li>Remember that this intense feeling will pass</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {step === "initial" && (
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                variant="outline"
                onClick={handleBackToAssessment}
                className="flex-1"
              >
                Back to Assessment
              </Button>
              <Button
                onClick={handleConfirmAlert}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                disabled={selectedContacts.length === 0}
              >
                Alert Selected Contacts
              </Button>
            </div>
          )}

          {step === "confirmation" && (
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => setStep("initial")}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSendAlert}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Confirm and Send Alert
              </Button>
            </div>
          )}

          {step === "sent" && (
            <Button
              onClick={handleBackToAssessment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Return to Home
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyAlerts;
