import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BookOpen, Clock, TrendingUp, Target, Sparkles, Zap, Star } from "lucide-react";

const skillLevels = [
  { value: "beginner", label: "Beginner", description: "Just starting out" },
  { value: "elementary", label: "Elementary", description: "Basic understanding" },
  { value: "intermediate", label: "Intermediate", description: "Comfortable with fundamentals" },
  { value: "advanced", label: "Advanced", description: "Strong expertise" },
  { value: "expert", label: "Expert", description: "Master level" },
];

export function CourseBuilderForm({ onGenerate, isGenerating = false }) {
  const [courseName, setCourseName] = useState("");
  const [timeAvailable, setTimeAvailable] = useState([10]);
  const [currentLevel, setCurrentLevel] = useState("");
  const [desiredLevel, setDesiredLevel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (courseName && currentLevel && desiredLevel) {
      onGenerate({
        courseName,
        timeAvailable: timeAvailable[0],
        currentLevel,
        desiredLevel,
      });
    }
  };

  const canSubmit = courseName.trim() && currentLevel && desiredLevel && currentLevel !== desiredLevel;

  const getTimeRecommendation = (hours) => {
    if (hours <= 5) return { text: "Steady pace", icon: "🐢", color: "text-chart-2" };
    if (hours <= 15) return { text: "Balanced learning", icon: "⚡", color: "text-chart-3" };
    return { text: "Fast track", icon: "🚀", color: "text-chart-1" };
  };

  const timeRec = getTimeRecommendation(timeAvailable[0]);

  return (
    <Card className="w-full max-w-2xl shadow-lg border-border/50 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3" />
      
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-chart-1 to-chart-3 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <CardTitle>Build Your Learning Path</CardTitle>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            AI-Powered
          </Badge>
        </div>
        <CardDescription>
          Tell us about your goals and we'll create a personalized course just for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Name */}
          <div className="space-y-2">
            <Label htmlFor="course-name" className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              What skill do you want to learn?
            </Label>
            <Input
              id="course-name"
              placeholder="e.g., Web Development, Data Science, Digital Marketing..."
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="bg-input-background border-border/50"
            />
          </div>

          {/* Time Available */}
          <div className="space-y-3">
            <Label htmlFor="time-available" className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              How many hours per week can you dedicate?
            </Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Hours per week</span>
                <div className="flex items-center gap-2">
                  <motion.span
                    key={timeAvailable[0]}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-gradient-to-r from-chart-1/20 to-chart-2/20 rounded-md"
                  >
                    {timeAvailable[0]} hrs
                  </motion.span>
                  <Badge variant="outline" className={`gap-1 ${timeRec.color}`}>
                    <span>{timeRec.icon}</span>
                    {timeRec.text}
                  </Badge>
                </div>
              </div>
              <Slider
                id="time-available"
                min={1}
                max={40}
                step={1}
                value={timeAvailable}
                onValueChange={setTimeAvailable}
                className="py-4"
              />
              <div className="flex justify-between text-muted-foreground">
                <span>1 hr</span>
                <span>40 hrs</span>
              </div>
            </div>
          </div>

          {/* Current Skill Level */}
          <div className="space-y-2">
            <Label htmlFor="current-level" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              Current skill level
            </Label>
            <Select value={currentLevel} onValueChange={setCurrentLevel}>
              <SelectTrigger id="current-level" className="bg-input-background border-border/50">
                <SelectValue placeholder="Select your current level" />
              </SelectTrigger>
              <SelectContent>
                {skillLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <div className="flex flex-col items-start">
                      <span>{level.label}</span>
                      <span className="text-muted-foreground">{level.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desired Skill Level */}
          <div className="space-y-2">
            <Label htmlFor="desired-level" className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              Target skill level
            </Label>
            <Select value={desiredLevel} onValueChange={setDesiredLevel}>
              <SelectTrigger id="desired-level" className="bg-input-background border-border/50">
                <SelectValue placeholder="Select your target level" />
              </SelectTrigger>
              <SelectContent>
                {skillLevels.map((level) => (
                  <SelectItem 
                    key={level.value} 
                    value={level.value}
                    disabled={level.value === currentLevel}
                  >
                    <div className="flex flex-col items-start">
                      <span>{level.label}</span>
                      <span className="text-muted-foreground">{level.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full gap-2 relative overflow-hidden group"
            disabled={!canSubmit || isGenerating}
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Generating Your Course...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 group-hover:animate-pulse" />
                Generate My Learning Path
                <Star className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              </>
            )}
          </Button>

          {/* Info hints */}
          {canSubmit && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-chart-1/10 to-chart-3/10 rounded-lg border border-chart-1/20"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-chart-1/20 rounded-lg">
                  <Sparkles className="h-4 w-4 text-chart-1" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <strong>Ready to go!</strong> We'll create a personalized curriculum with {Math.ceil((40 * timeAvailable[0]) / 7)} hours of content tailored just for you.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
