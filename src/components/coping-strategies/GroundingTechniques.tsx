import React, { useState } from "react";
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
  Check,
  Clock,
  Footprints,
  HandMetal,
  Leaf,
  Music,
  RefreshCw,
  Sparkles,
  ThumbsUp,
} from "lucide-react";

interface GroundingTechniqueProps {
  techniques?: GroundingTechnique[];
  onComplete?: (techniqueName: string) => void;
}

interface GroundingTechnique {
  id: string;
  name: string;
  description: string;
  steps: string[];
  icon: React.ReactNode;
  duration: string;
}

const defaultTechniques: GroundingTechnique[] = [
  {
    id: "5-4-3-2-1",
    name: "5-4-3-2-1 Technique",
    description:
      "Engage all five senses to ground yourself in the present moment.",
    steps: [
      "Acknowledge FIVE things you see around you.",
      "Acknowledge FOUR things you can touch around you.",
      "Acknowledge THREE things you hear.",
      "Acknowledge TWO things you can smell.",
      "Acknowledge ONE thing you can taste.",
    ],
    icon: <Sparkles className="h-6 w-6" />,
    duration: "5 minutes",
  },
  {
    id: "body-scan",
    name: "Body Scan",
    description:
      "Progressively focus attention on different parts of your body to release tension.",
    steps: [
      "Find a comfortable position sitting or lying down.",
      "Close your eyes and take several deep breaths.",
      "Focus your attention on your feet, noticing any sensations.",
      "Slowly move your attention up through your body - legs, torso, arms, and head.",
      "Notice any areas of tension and consciously relax them.",
    ],
    icon: <Footprints className="h-6 w-6" />,
    duration: "10 minutes",
  },
  {
    id: "deep-breathing",
    name: "Deep Breathing",
    description:
      "Slow, deep breathing to activate the parasympathetic nervous system.",
    steps: [
      "Sit or lie down in a comfortable position.",
      "Place one hand on your chest and the other on your abdomen.",
      "Breathe in slowly through your nose for 4 counts.",
      "Hold your breath for 2 counts.",
      "Exhale slowly through your mouth for 6 counts.",
      "Repeat for 5-10 cycles.",
    ],
    icon: <RefreshCw className="h-6 w-6" />,
    duration: "3-5 minutes",
  },
  {
    id: "object-focus",
    name: "Object Focus",
    description:
      "Concentrate deeply on a single object to anchor your attention.",
    steps: [
      "Choose any object in your surroundings.",
      "Examine it closely, noting its color, texture, shape, and weight.",
      "Consider its purpose and how it was made.",
      "Notice any thoughts that arise and gently return focus to the object.",
      "Continue for 3-5 minutes.",
    ],
    icon: <Leaf className="h-6 w-6" />,
    duration: "3-5 minutes",
  },
  {
    id: "hand-warming",
    name: "Hand Warming",
    description:
      "A biofeedback technique that helps reduce anxiety through focused attention.",
    steps: [
      "Sit comfortably and rub your hands together vigorously for 15 seconds.",
      "Place your hands palm-up on your lap.",
      "Focus on the sensation of warmth in your palms.",
      "Imagine your hands becoming warmer and heavier.",
      "Continue for 5 minutes, noticing the sensations.",
    ],
    icon: <HandMetal className="h-6 w-6" />,
    duration: "5 minutes",
  },
  {
    id: "music-grounding",
    name: "Music Grounding",
    description:
      "Use music to reconnect with the present moment and regulate emotions.",
    steps: [
      "Choose a calming or familiar piece of music.",
      "Close your eyes and focus entirely on the music.",
      "Notice the different instruments and sounds.",
      "Pay attention to how the music makes you feel physically.",
      "Allow the music to anchor you to the present moment.",
    ],
    icon: <Music className="h-6 w-6" />,
    duration: "5-10 minutes",
  },
];

const GroundingTechniques: React.FC<GroundingTechniqueProps> = ({
  techniques = defaultTechniques,
  onComplete = () => {},
}) => {
  const [activeTechnique, setActiveTechnique] =
    useState<GroundingTechnique | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);

  const startTechnique = (technique: GroundingTechnique) => {
    setActiveTechnique(technique);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (activeTechnique && currentStep < activeTechnique.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (activeTechnique) {
      // Technique completed
      setCompleted([...completed, activeTechnique.id]);
      onComplete(activeTechnique.name);
      setActiveTechnique(null);
    }
  };

  const resetTechnique = () => {
    setActiveTechnique(null);
    setCurrentStep(0);
  };

  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {!activeTechnique ? (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-blue-800 mb-2">
                Grounding Techniques
              </h1>
              <p className="text-blue-600">
                These exercises can help you reconnect with the present moment
                when feeling overwhelmed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techniques.map((technique) => (
                <Card
                  key={technique.id}
                  className="bg-white border-blue-100 hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                        {technique.icon}
                      </div>
                      {completed.includes(technique.id) && (
                        <div className="bg-green-100 p-1 rounded-full">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-blue-800 mt-3">
                      {technique.name}
                    </CardTitle>
                    <CardDescription>{technique.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center text-sm text-blue-600 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{technique.duration}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => startTechnique(technique)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {completed.includes(technique.id)
                        ? "Practice Again"
                        : "Start Practice"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <Card className="bg-white border-blue-100 max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600 mr-3">
                    {activeTechnique.icon}
                  </div>
                  <div>
                    <CardTitle className="text-blue-800">
                      {activeTechnique.name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-blue-600 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{activeTechnique.duration}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={resetTechnique}
                  className="text-blue-600"
                >
                  Back to all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">
                    Step {currentStep + 1} of {activeTechnique.steps.length}
                  </span>
                  <span className="text-sm text-blue-600">
                    {Math.round(
                      ((currentStep + 1) / activeTechnique.steps.length) * 100,
                    )}
                    % complete
                  </span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentStep + 1) / activeTechnique.steps.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p className="text-lg text-blue-800 font-medium">
                  {activeTechnique.steps[currentStep]}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={resetTechnique}
                className="border-blue-200 text-blue-700"
              >
                Cancel
              </Button>
              <Button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentStep < activeTechnique.steps.length - 1
                  ? "Next Step"
                  : "Complete"}
              </Button>
            </CardFooter>
          </Card>
        )}

        {completed.length > 0 && !activeTechnique && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full">
              <ThumbsUp className="h-5 w-5 mr-2" />
              <span>
                You've completed {completed.length} technique
                {completed.length !== 1 ? "s" : ""}!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroundingTechniques;
