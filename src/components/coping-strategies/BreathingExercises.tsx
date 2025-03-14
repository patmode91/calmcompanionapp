import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface BreathingExerciseProps {
  title?: string;
  description?: string;
  duration?: number;
  inhaleTime?: number;
  holdTime?: number;
  exhaleTime?: number;
  cycles?: number;
  onComplete?: () => void;
}

const BreathingExercises = ({
  title = "Deep Breathing Exercise",
  description = "A simple breathing technique to help calm your mind and reduce anxiety.",
  duration = 120,
  inhaleTime = 4,
  holdTime = 4,
  exhaleTime = 6,
  cycles = 5,
  onComplete = () => {},
}: BreathingExerciseProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<
    "inhale" | "hold" | "exhale" | "rest"
  >("inhale");
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(0);

  // Sample breathing exercises
  const breathingExercises = [
    {
      title: "Deep Breathing",
      description:
        "A simple breathing technique to help calm your mind and reduce anxiety.",
      inhaleTime: 4,
      holdTime: 4,
      exhaleTime: 6,
      cycles: 5,
    },
    {
      title: "Box Breathing",
      description:
        "Equal parts inhale, hold, exhale, and hold. Great for stress relief.",
      inhaleTime: 4,
      holdTime: 4,
      exhaleTime: 4,
      cycles: 4,
    },
    {
      title: "4-7-8 Breathing",
      description:
        "Inhale for 4, hold for 7, exhale for 8. Helps with anxiety and sleep.",
      inhaleTime: 4,
      holdTime: 7,
      exhaleTime: 8,
      cycles: 3,
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let phaseInterval: NodeJS.Timeout | null = null;

    if (isActive) {
      // Main timer for overall duration
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval as NodeJS.Timeout);
            setIsActive(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Phase timer for breathing cycle
      let currentPhaseTime =
        currentPhase === "inhale"
          ? inhaleTime
          : currentPhase === "hold"
            ? holdTime
            : currentPhase === "exhale"
              ? exhaleTime
              : 1;

      let phaseTimeElapsed = 0;

      phaseInterval = setInterval(() => {
        phaseTimeElapsed += 0.1;
        const progress = (phaseTimeElapsed / currentPhaseTime) * 100;
        setPhaseProgress(progress > 100 ? 100 : progress);

        if (phaseTimeElapsed >= currentPhaseTime) {
          phaseTimeElapsed = 0;
          setPhaseProgress(0);

          // Move to next phase
          if (currentPhase === "inhale") {
            setCurrentPhase("hold");
          } else if (currentPhase === "hold") {
            setCurrentPhase("exhale");
          } else if (currentPhase === "exhale") {
            if (currentCycle >= cycles) {
              setCurrentCycle(1);
              setCurrentPhase("inhale");
            } else {
              setCurrentCycle((prev) => prev + 1);
              setCurrentPhase("inhale");
            }
          }
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (phaseInterval) clearInterval(phaseInterval);
    };
  }, [
    isActive,
    currentPhase,
    inhaleTime,
    holdTime,
    exhaleTime,
    cycles,
    currentCycle,
    onComplete,
    duration,
  ]);

  const toggleExercise = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setCurrentPhase("inhale");
      setPhaseProgress(0);
    }
  };

  const resetExercise = () => {
    setIsActive(false);
    setTimeRemaining(duration);
    setCurrentCycle(1);
    setCurrentPhase("inhale");
    setPhaseProgress(0);
  };

  const selectExercise = (index: number) => {
    if (isActive) return; // Don't change during active session
    setSelectedExercise(index);
    const exercise = breathingExercises[index];
    // Update exercise parameters
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getPhaseInstruction = (): string => {
    switch (currentPhase) {
      case "inhale":
        return "Inhale slowly through your nose...";
      case "hold":
        return "Hold your breath...";
      case "exhale":
        return "Exhale slowly through your mouth...";
      case "rest":
        return "Rest before next cycle...";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-blue-50">
      <Card className="overflow-hidden border-blue-200 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-400 text-white">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-blue-50">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-8">
            {/* Exercise Selector */}
            <div className="flex justify-between w-full max-w-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  selectExercise(
                    (selectedExercise - 1 + breathingExercises.length) %
                      breathingExercises.length,
                  )
                }
                disabled={isActive}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="text-center">
                <h3 className="text-lg font-medium">
                  {breathingExercises[selectedExercise].title}
                </h3>
                <p className="text-sm text-gray-500">
                  {breathingExercises[selectedExercise].description}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  selectExercise(
                    (selectedExercise + 1) % breathingExercises.length,
                  )
                }
                disabled={isActive}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Visual Breathing Guide */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div
                className={`absolute w-full h-full rounded-full border-4 transition-all duration-1000 flex items-center justify-center ${isActive ? "bg-blue-100" : "bg-gray-100"}`}
                style={{
                  transform: `scale(${
                    currentPhase === "inhale"
                      ? 0.8 + phaseProgress / 500
                      : currentPhase === "exhale"
                        ? 1 - phaseProgress / 500
                        : 1
                  })`,
                }}
              >
                <div className="text-center">
                  <p className="text-xl font-semibold text-blue-700">
                    {getPhaseInstruction()}
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {currentCycle}/{cycles}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Phase Progress</span>
                <span className="text-sm font-medium">
                  {Math.round(phaseProgress)}%
                </span>
              </div>
              <Progress value={phaseProgress} className="h-2" />
            </div>

            {/* Timer */}
            <div className="text-center">
              <p className="text-sm text-gray-500">Time Remaining</p>
              <p className="text-3xl font-bold">{formatTime(timeRemaining)}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center space-x-4 p-6 bg-gray-50">
          <Button
            onClick={toggleExercise}
            className="w-32"
            variant={isActive ? "outline" : "default"}
          >
            {isActive ? (
              <Pause className="mr-2 h-4 w-4" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            {isActive ? "Pause" : "Start"}
          </Button>

          <Button onClick={resetExercise} variant="outline" className="w-32">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BreathingExercises;
