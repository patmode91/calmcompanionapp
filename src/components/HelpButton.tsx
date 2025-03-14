import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

interface HelpButtonProps {
  onClick?: () => void;
  size?: number;
  pulseEffect?: boolean;
}

interface CrisisAssessmentProps {
  onClose?: () => void;
}

// Temporary placeholder for CrisisAssessment component
const CrisisAssessmentPlaceholder = ({
  onClose = () => {},
}: CrisisAssessmentProps) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Crisis Assessment</h2>
      <p className="mb-4">
        This is a placeholder for the Crisis Assessment component.
      </p>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

const HelpButton = ({
  onClick,
  size = 200,
  pulseEffect = true,
}: HelpButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="flex items-center justify-center bg-white p-4 rounded-full">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {pulseEffect && (
              <motion.div
                className="absolute inset-0 rounded-full bg-teal-500 opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{
                  width: size,
                  height: size,
                }}
              />
            )}
            <Button
              onClick={handleClick}
              className="rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white font-bold text-xl shadow-lg"
              style={{
                width: size,
                height: size,
              }}
            >
              <span className="flex items-center justify-center">
                <Volume2 className="mr-2 h-5 w-5" />
                HELP
              </span>
            </Button>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] p-0 bg-white">
          <CrisisAssessmentPlaceholder onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpButton;
