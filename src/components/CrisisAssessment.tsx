import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import SeverityDetermination from "./SeverityDetermination";
import { motion } from "framer-motion";

export type DistressLevel = "mild" | "moderate" | "severe";

interface CrisisAssessmentProps {
  isOpen?: boolean;
  onClose?: () => void;
  onComplete?: (severity: DistressLevel) => void;
}

const CrisisAssessment = ({
  isOpen = true,
  onClose = () => {},
  onComplete = () => {},
}: CrisisAssessmentProps) => {
  const [step, setStep] = useState<"intro" | "assessment">("intro");

  const handleStartAssessment = () => {
    setStep("assessment");
  };

  const handleSeverityDetermined = (level: DistressLevel) => {
    onComplete(level);
    onClose();
  };

  const handleClose = () => {
    setStep("intro");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {step === "intro" ? (
        <DialogContent className="bg-gradient-to-b from-blue-50 to-green-50 max-w-md mx-auto rounded-lg border-blue-200">
          <DialogHeader>
            <DialogTitle className="text-2xl text-blue-800 font-semibold text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                We're Here For You
              </motion.div>
            </DialogTitle>
            <DialogDescription className="text-blue-700 text-center mt-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Let's take a moment to understand how you're feeling so we can
                provide the right support for you.
              </motion.div>
            </DialogDescription>
          </DialogHeader>

          <motion.div
            className="py-6 px-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="text-blue-800 mb-6">
              We'll ask you a few questions to better understand your current
              situation. Your responses will help us determine the most
              appropriate resources for you.
            </p>

            <div className="flex justify-center space-x-4 mt-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="bg-white text-blue-700 border-blue-300 hover:bg-blue-100"
              >
                Not Now
              </Button>
              <Button
                onClick={handleStartAssessment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Begin Assessment
              </Button>
            </div>
          </motion.div>
        </DialogContent>
      ) : (
        <SeverityDetermination
          isOpen={true}
          onClose={handleClose}
          onSeverityDetermined={handleSeverityDetermined}
        />
      )}
    </Dialog>
  );
};

export default CrisisAssessment;
