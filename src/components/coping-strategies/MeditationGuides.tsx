import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, Volume2, Clock } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

interface MeditationGuide {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  audioSrc: string;
  category: "beginner" | "intermediate" | "advanced" | "sleep" | "anxiety";
  backgroundImage: string;
}

const defaultMeditations: MeditationGuide[] = [
  {
    id: "med-1",
    title: "Mindful Breathing",
    description:
      "A gentle introduction to mindful breathing techniques to calm your mind.",
    duration: 5,
    audioSrc: "/meditation-audio-1.mp3",
    category: "beginner",
    backgroundImage:
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80",
  },
  {
    id: "med-2",
    title: "Body Scan Relaxation",
    description:
      "Progressive relaxation through a guided body scan meditation.",
    duration: 10,
    audioSrc: "/meditation-audio-2.mp3",
    category: "beginner",
    backgroundImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  },
  {
    id: "med-3",
    title: "Anxiety Relief",
    description:
      "Specific techniques to help manage anxiety and panic symptoms.",
    duration: 8,
    audioSrc: "/meditation-audio-3.mp3",
    category: "anxiety",
    backgroundImage:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
  },
  {
    id: "med-4",
    title: "Sleep Meditation",
    description: "Gentle guidance to help you fall asleep peacefully.",
    duration: 15,
    audioSrc: "/meditation-audio-4.mp3",
    category: "sleep",
    backgroundImage:
      "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=800&q=80",
  },
  {
    id: "med-5",
    title: "Loving-Kindness",
    description:
      "Cultivate compassion for yourself and others with this guided practice.",
    duration: 12,
    audioSrc: "/meditation-audio-5.mp3",
    category: "intermediate",
    backgroundImage:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80",
  },
  {
    id: "med-6",
    title: "Deep Focus",
    description:
      "Advanced concentration techniques to improve focus and clarity.",
    duration: 20,
    audioSrc: "/meditation-audio-6.mp3",
    category: "advanced",
    backgroundImage:
      "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?w=800&q=80",
  },
];

interface MeditationPlayerProps {
  meditation: MeditationGuide;
  onClose: () => void;
}

const MeditationPlayer = ({
  meditation = defaultMeditations[0],
  onClose = () => {},
}: MeditationPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Simulate audio loading and playing
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      // Start the progress simulation when playing
      const interval = window.setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / (meditation.duration * 60) / 10;
          setCurrentTime((prev) => prev + 0.1);
          if (newProgress >= 100) {
            window.clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return newProgress;
        });
      }, 100);
      intervalRef.current = interval;
    } else {
      // Pause the progress simulation
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const resetMeditation = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-green-50 p-6 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <div
        className="relative h-48 rounded-lg mb-4 bg-cover bg-center flex items-end p-4"
        style={{ backgroundImage: `url(${meditation.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
        <div className="relative z-10 text-white">
          <h2 className="text-2xl font-bold">{meditation.title}</h2>
          <p className="text-sm opacity-90">{meditation.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {meditation.duration} minutes
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {formatTime(currentTime)} / {formatTime(meditation.duration * 60)}
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        <div className="flex justify-center space-x-4 py-2">
          <Button
            variant="outline"
            size="icon"
            onClick={resetMeditation}
            className="rounded-full bg-white hover:bg-gray-100"
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={togglePlayPause}
            className="rounded-full bg-blue-500 hover:bg-blue-600 h-12 w-12 flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-0.5" />
            )}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-gray-500" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-full max-w-xs"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button variant="outline" onClick={onClose} className="w-full">
          Close Meditation
        </Button>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={meditation.audioSrc} />
    </div>
  );
};

interface MeditationGuidesProps {
  meditations?: MeditationGuide[];
}

const MeditationGuides = ({
  meditations = defaultMeditations,
}: MeditationGuidesProps) => {
  const [selectedMeditation, setSelectedMeditation] =
    useState<MeditationGuide | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredMeditations =
    activeCategory === "all"
      ? meditations
      : meditations.filter((med) => med.category === activeCategory);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full">
      {selectedMeditation ? (
        <MeditationPlayer
          meditation={selectedMeditation}
          onClose={() => setSelectedMeditation(null)}
        />
      ) : (
        <>
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Meditation Guides
            </h1>
            <p className="text-gray-600">
              Find peace and calm with our guided meditation practices
            </p>
          </div>

          <Tabs
            defaultValue="all"
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="w-full flex justify-between mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="anxiety">Anxiety</TabsTrigger>
              <TabsTrigger value="sleep">Sleep</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMeditations.map((meditation) => (
                  <MeditationCard
                    key={meditation.id}
                    meditation={meditation}
                    onClick={() => setSelectedMeditation(meditation)}
                  />
                ))}
              </div>
            </TabsContent>

            {["beginner", "intermediate", "advanced", "anxiety", "sleep"].map(
              (category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMeditations.map((meditation) => (
                      <MeditationCard
                        key={meditation.id}
                        meditation={meditation}
                        onClick={() => setSelectedMeditation(meditation)}
                      />
                    ))}
                  </div>
                </TabsContent>
              ),
            )}
          </Tabs>
        </>
      )}
    </div>
  );
};

interface MeditationCardProps {
  meditation: MeditationGuide;
  onClick: () => void;
}

const MeditationCard = ({
  meditation,
  onClick = () => {},
}: MeditationCardProps) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div
        className="h-40 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${meditation.backgroundImage})` }}
      />
      <CardHeader className="pb-2">
        <CardTitle>{meditation.title}</CardTitle>
        <CardDescription className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {meditation.duration} min
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2">
          {meditation.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <Play className="h-4 w-4 mr-2" /> Start Meditation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MeditationGuides;
