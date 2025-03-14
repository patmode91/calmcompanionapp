import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";

export type DistressLevel = "mild" | "moderate" | "severe";

interface SeverityDeterminationProps {
  onSeverityDetermined?: (level: DistressLevel) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const SeverityDetermination = ({
  onSeverityDetermined = () => {},
  isOpen = true,
  onClose = () => {},
}: SeverityDeterminationProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const questions = [
    {
      question: "How would you rate your current distress level?",
      options: [
        { value: "low", label: "I'm feeling anxious but can manage" },
        { value: "medium", label: "I'm struggling to cope with my feelings" },
        { value: "high", label: "I feel overwhelmed and unsafe" },
      ],
    },
    {
      question: "Are you having thoughts of harming yourself?",
      options: [
        { value: "no", label: "No, I'm not having such thoughts" },
        {
          value: "passive",
          label: "I have thoughts but no plans to act on them",
        },
        { value: "active", label: "Yes, I'm thinking about harming myself" },
      ],
    },
    {
      question: "Do you have support available right now?",
      options: [
        { value: "yes", label: "Yes, I have people I can reach out to" },
        { value: "maybe", label: "I'm not sure who I could talk to" },
        { value: "no", label: "No, I feel completely alone" },
      ],
    },
  ];

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedOption;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption("");
      } else {
        // Determine severity based on answers
        determineSeverity(newAnswers);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] || "");
    }
  };

  const determineSeverity = (responses: string[]) => {
    // Simple algorithm to determine severity
    // This could be more sophisticated in a real implementation
    const highRiskCount = responses.filter(
      (r) => r === "high" || r === "active" || r === "no",
    ).length;

    const mediumRiskCount = responses.filter(
      (r) => r === "medium" || r === "passive" || r === "maybe",
    ).length;

    let severity: DistressLevel = "mild";

    if (highRiskCount >= 2 || responses[1] === "active") {
      severity = "severe";
    } else if (highRiskCount === 1 || mediumRiskCount >= 2) {
      severity = "moderate";
    }

    onSeverityDetermined(severity);
    onClose();
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-blue-50 max-w-md mx-auto rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-blue-800 font-semibold">
            How are you feeling?
          </DialogTitle>
          <DialogDescription className="text-blue-700">
            Please answer honestly to help us provide the right support for you.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h3 className="text-lg font-medium text-blue-800 mb-3">
            {currentQuestionData.question}
          </h3>

          <RadioGroup
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="space-y-3"
          >
            {currentQuestionData.options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-3 rounded-md bg-white hover:bg-blue-100 transition-colors"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <label
                  htmlFor={option.value}
                  className="text-blue-900 font-medium cursor-pointer flex-grow"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="bg-white text-blue-700 border-blue-300 hover:bg-blue-100"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SeverityDetermination;
