import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Heart, ThumbsUp, BookOpen, ArrowRight, Sparkles } from "lucide-react";

// Mock component for CopingStrategiesLibrary since we don't know its exact structure
const MockCopingStrategiesLibrary = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <Card
            key={item}
            className="border border-blue-200 hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Coping Strategy {item}</CardTitle>
              <CardDescription>
                A helpful technique for managing stress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                This strategy helps you manage your emotions through guided
                exercises and mindfulness techniques.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

interface MildDistressInterventionProps {
  onClose?: () => void;
  userName?: string;
}

const MildDistressIntervention: React.FC<MildDistressInterventionProps> = ({
  onClose = () => {},
  userName = "Friend",
}) => {
  const [showLibrary, setShowLibrary] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const selfCareTips = [
    {
      title: "Deep Breathing",
      description:
        "Take 5 slow, deep breaths. Inhale for 4 counts, hold for 2, exhale for 6.",
      icon: <Sparkles className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Grounding Exercise",
      description:
        "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      icon: <ThumbsUp className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Positive Affirmation",
      description:
        'Repeat to yourself: "This feeling is temporary. I am safe, and I will get through this."',
      icon: <Heart className="h-8 w-8 text-red-500" />,
    },
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % selfCareTips.length);
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
            <CardTitle className="text-2xl text-center text-blue-800">
              Taking Care of Yourself
            </CardTitle>
            <CardDescription className="text-center text-blue-600">
              Hi {userName}, we've detected mild distress. Here are some gentle
              techniques to help you feel better.
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
                  {selfCareTips[currentTip].icon}
                  <h3 className="text-xl font-medium text-blue-700">
                    {selfCareTips[currentTip].title}
                  </h3>
                </div>
                <p className="text-gray-700">
                  {selfCareTips[currentTip].description}
                </p>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextTip}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    Next tip <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                    >
                      <BookOpen className="mr-2 h-5 w-5" />
                      Explore Coping Strategies
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Coping Strategies Library</DialogTitle>
                      <DialogDescription>
                        Browse our collection of techniques to help manage
                        stress and anxiety.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="h-[60vh] overflow-y-auto">
                      <MockCopingStrategiesLibrary />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowLibrary(false)}
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="secondary"
                  className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                  onClick={onClose}
                >
                  I'm Feeling Better
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

export default MildDistressIntervention;
