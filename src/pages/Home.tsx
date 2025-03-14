import React, { useState } from "react";
import Header from "@/components/Header";
import HelpButton from "@/components/HelpButton";
import CrisisAssessment from "@/components/CrisisAssessment";
import CopingStrategiesLibrary from "@/components/CopingStrategiesLibrary";
import MildDistressIntervention from "@/components/interventions/MildDistressIntervention";
import ModerateDistressIntervention from "@/components/interventions/ModerateDistressIntervention";
import SevereDistressIntervention from "@/components/interventions/SevereDistressIntervention";
import EmergencyContactManager from "@/components/EmergencyContactManager";
import VoiceTherapist from "@/components/VoiceTherapist";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Define the distress level type locally
type DistressLevel = "mild" | "moderate" | "severe";

const Home = () => {
  const [showCrisisAssessment, setShowCrisisAssessment] = useState(false);
  const [showCopingStrategies, setShowCopingStrategies] = useState(false);
  const [distressLevel, setDistressLevel] = useState<DistressLevel | null>(
    null,
  );
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showVoiceTherapist, setShowVoiceTherapist] = useState(false);

  const handleHelpButtonClick = () => {
    setShowCrisisAssessment(true);
    setShowVoiceTherapist(true);
  };

  const handleCrisisAssessmentClose = () => {
    setShowCrisisAssessment(false);
  };

  const handleCrisisAssessmentComplete = (severity: DistressLevel) => {
    setDistressLevel(severity);
    setShowCrisisAssessment(false);
  };

  const handleInterventionClose = () => {
    setDistressLevel(null);
  };

  const handleVoiceTherapistClose = () => {
    setShowVoiceTherapist(false);
  };

  const handleCopingStrategiesClick = () => {
    setShowCopingStrategies(true);
  };

  const handleCopingStrategiesClose = () => {
    setShowCopingStrategies(false);
  };

  const handleManageContactsClick = () => {
    setShowEmergencyContacts(true);
  };

  const handleEmergencyContactsClose = () => {
    setShowEmergencyContacts(false);
  };

  // Render the appropriate intervention based on distress level
  const renderIntervention = () => {
    switch (distressLevel) {
      case "mild":
        return <MildDistressIntervention onClose={handleInterventionClose} />;
      case "moderate":
        return (
          <ModerateDistressIntervention onBack={handleInterventionClose} />
        );
      case "severe":
        return <SevereDistressIntervention onClose={handleInterventionClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50">
      <Header />

      {/* Main content */}
      {!distressLevel && !showCopingStrategies && !showEmergencyContacts ? (
        <main className="container mx-auto px-4 py-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">
              CalmCompanion
            </h1>
            <p className="text-lg text-teal-600 max-w-2xl mx-auto">
              Your personal support system for moments of distress. Press the
              help button when you need assistance.
            </p>
          </motion.div>

          {/* Help Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-16"
          >
            <HelpButton
              onClick={handleHelpButtonClick}
              size={200}
              pulseEffect={true}
            />
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">
              Additional Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button
                onClick={handleCopingStrategiesClick}
                className="h-auto py-6 bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 shadow-sm"
              >
                <div className="flex flex-col items-center">
                  <svg
                    className="w-12 h-12 mb-3 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="text-lg font-medium">
                    Coping Strategies Library
                  </span>
                  <p className="text-sm text-teal-600 mt-2">
                    Explore techniques to manage stress and anxiety
                  </p>
                </div>
              </Button>

              <Button
                onClick={handleManageContactsClick}
                className="h-auto py-6 bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 shadow-sm"
              >
                <div className="flex flex-col items-center">
                  <svg
                    className="w-12 h-12 mb-3 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="text-lg font-medium">
                    Manage Emergency Contacts
                  </span>
                  <p className="text-sm text-teal-600 mt-2">
                    Add or update people to contact during a crisis
                  </p>
                </div>
              </Button>
            </div>
          </motion.div>
        </main>
      ) : null}

      {/* Crisis Assessment Dialog */}
      {showCrisisAssessment && (
        <CrisisAssessment
          isOpen={showCrisisAssessment}
          onClose={handleCrisisAssessmentClose}
          onComplete={handleCrisisAssessmentComplete}
        />
      )}

      {/* Intervention Components */}
      {distressLevel && renderIntervention()}

      {/* Coping Strategies Library */}
      {showCopingStrategies && (
        <div className="absolute inset-0 bg-white z-10">
          <Header
            title="Coping Strategies"
            onHomeClick={handleCopingStrategiesClose}
          />
          <CopingStrategiesLibrary />
        </div>
      )}

      {/* Emergency Contact Manager */}
      {showEmergencyContacts && (
        <div className="absolute inset-0 bg-white z-10">
          <Header
            title="Emergency Contacts"
            onHomeClick={handleEmergencyContactsClose}
          />
          <EmergencyContactManager />
        </div>
      )}

      {/* Voice Therapist */}
      <VoiceTherapist
        isActive={showVoiceTherapist}
        onClose={handleVoiceTherapistClose}
        distressLevel={distressLevel}
        userName="Friend"
      />
    </div>
  );
};

export default Home;
