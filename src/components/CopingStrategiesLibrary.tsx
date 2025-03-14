import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Search,
  BookOpen,
  Wind,
  Footprints,
  Music,
  ArrowRight,
} from "lucide-react";
import BreathingExercises from "./coping-strategies/BreathingExercises";
import GroundingTechniques from "./coping-strategies/GroundingTechniques";
import MeditationGuides from "./coping-strategies/MeditationGuides";

interface CopingStrategy {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface CopingStrategiesLibraryProps {
  onSelectStrategy?: (strategyId: string) => void;
  initialTab?: string;
}

const CopingStrategiesLibrary: React.FC<CopingStrategiesLibraryProps> = ({
  onSelectStrategy = () => {},
  initialTab = "all",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStrategy, setActiveStrategy] = useState<string | null>(null);

  const strategies: CopingStrategy[] = [
    {
      id: "breathing",
      title: "Breathing Exercises",
      description:
        "Guided breathing techniques to help calm your mind and reduce anxiety.",
      icon: <Wind className="h-6 w-6" />,
      component: <BreathingExercises />,
    },
    {
      id: "grounding",
      title: "Grounding Techniques",
      description:
        "Methods to help you reconnect with the present moment when feeling overwhelmed.",
      icon: <Footprints className="h-6 w-6" />,
      component: <GroundingTechniques />,
    },
    {
      id: "meditation",
      title: "Meditation Guides",
      description:
        "Guided meditation practices to find peace and calm during stressful situations.",
      icon: <Music className="h-6 w-6" />,
      component: <MeditationGuides />,
    },
    {
      id: "reading",
      title: "Educational Resources",
      description:
        "Articles and information about managing mental health crises and building resilience.",
      icon: <BookOpen className="h-6 w-6" />,
      component: (
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Educational Resources
          </h2>
          <p className="text-gray-600 mb-8">
            Coming soon. This section will contain articles and information
            about managing mental health crises.
          </p>
          <Button onClick={() => setActiveStrategy(null)}>
            Back to Library
          </Button>
        </div>
      ),
    },
  ];

  const filteredStrategies = strategies.filter(
    (strategy) =>
      strategy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      strategy.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleStrategySelect = (strategyId: string) => {
    setActiveStrategy(strategyId);
    onSelectStrategy(strategyId);
  };

  if (activeStrategy) {
    const strategy = strategies.find((s) => s.id === activeStrategy);
    if (strategy) {
      return (
        <div className="bg-white min-h-screen w-full">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2">
              {strategy.icon}
              {strategy.title}
            </h2>
            <Button variant="ghost" onClick={() => setActiveStrategy(null)}>
              Back to Library
            </Button>
          </div>
          <div className="p-4">{strategy.component}</div>
        </div>
      );
    }
  }

  return (
    <div className="bg-blue-50 min-h-screen w-full p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            Coping Strategies Library
          </h1>
          <p className="text-blue-600 max-w-2xl mx-auto">
            Explore a variety of techniques and resources to help manage stress,
            anxiety, and difficult emotions.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for coping strategies..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue={initialTab} className="w-full">
            <TabsList className="w-full flex justify-start mb-6 overflow-x-auto">
              <TabsTrigger value="all">All Strategies</TabsTrigger>
              <TabsTrigger value="breathing">Breathing</TabsTrigger>
              <TabsTrigger value="grounding">Grounding</TabsTrigger>
              <TabsTrigger value="meditation">Meditation</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStrategies.map((strategy) => (
                  <StrategyCard
                    key={strategy.id}
                    strategy={strategy}
                    onClick={() => handleStrategySelect(strategy.id)}
                  />
                ))}
              </div>
            </TabsContent>

            {["breathing", "grounding", "meditation", "resources"].map(
              (category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStrategies
                      .filter((strategy) => {
                        if (category === "resources")
                          return strategy.id === "reading";
                        return strategy.id === category;
                      })
                      .map((strategy) => (
                        <StrategyCard
                          key={strategy.id}
                          strategy={strategy}
                          onClick={() => handleStrategySelect(strategy.id)}
                        />
                      ))}
                  </div>
                </TabsContent>
              ),
            )}
          </Tabs>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Need immediate help?</h2>
          <p className="mb-4">
            If you're experiencing a mental health crisis, don't hesitate to
            reach out for support.
          </p>
          <Button
            variant="secondary"
            className="bg-white text-blue-700 hover:bg-blue-50"
          >
            Return to Crisis Help
          </Button>
        </div>
      </div>
    </div>
  );
};

interface StrategyCardProps {
  strategy: CopingStrategy;
  onClick: () => void;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onClick }) => {
  return (
    <Card className="bg-white border-blue-100 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="p-2 bg-blue-100 rounded-full text-blue-600 w-fit">
          {strategy.icon}
        </div>
        <CardTitle className="text-blue-800 mt-3">{strategy.title}</CardTitle>
        <CardDescription>{strategy.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter>
        <Button
          onClick={onClick}
          className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
        >
          Explore <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CopingStrategiesLibrary;
