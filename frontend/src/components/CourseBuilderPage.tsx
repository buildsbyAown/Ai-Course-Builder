interface CourseBuilderPagePropsFull extends CourseBuilderPagePropsExtended {
  onOpenQuiz?: () => void;
  onOpenAssignments?: () => void;
}

import { useState } from "react";
import { CourseBuilderForm, CourseFormData } from "./CourseBuilderForm";
import { GeneratedCourse } from "./GeneratedCourse";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { 
  Sparkles, 
  LogOut, 
  User, 
  BookOpen, 
  TrendingUp,
  Bell,
  Settings
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface CourseBuilderPageProps {
  onLogout: () => void;
}

type CourseBuilderPagePropsExtended = CourseBuilderPageProps & {
  onProfile?: () => void;
  onMyCourses?: () => void;
  onProgress?: () => void;
};

export function CourseBuilderPage({ onLogout, onProfile, onMyCourses, onProgress, onOpenQuiz, onOpenAssignments }: CourseBuilderPagePropsFull) {
  const [generatedCourse, setGeneratedCourse] = useState<CourseFormData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCourse = (data: CourseFormData) => {
    setIsGenerating(true);
    
    // Simulate course generation with a delay
    setTimeout(() => {
      setGeneratedCourse(data);
      setIsGenerating(false);
    }, 2000);
  };

  const handleReset = () => {
    setGeneratedCourse(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-chart-1 to-chart-3">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg">LearnPath AI</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-4">
              <Button variant="ghost" className="gap-2" onClick={onMyCourses}>
                <BookOpen className="h-4 w-4" />
                My Courses
              </Button>
              <Button variant="ghost" className="gap-2" onClick={onProgress}>
                <TrendingUp className="h-4 w-4" />
                Progress
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 h-10">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-chart-1 to-chart-2">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">John Doe</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p>John Doe</p>
                    <p className="text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onProfile} className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        {!generatedCourse && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-primary">AI-Powered Learning</span>
            </div>
            <h1 className="mb-2">Create Your Course</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build a personalized learning path tailored to your goals, schedule, and skill level
            </p>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {!generatedCourse ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <CourseBuilderForm
                  onGenerate={handleGenerateCourse}
                  isGenerating={isGenerating}
                />
              </motion.div>
            ) : (
              <motion.div
                key="course"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <GeneratedCourse
                  formData={generatedCourse}
                  onReset={handleReset}
                  onOpenQuiz={onOpenQuiz}
                  onOpenAssignments={onOpenAssignments}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats Footer */}
        {!generatedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center p-6 bg-secondary/20 rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-chart-1/20 mb-3">
                <BookOpen className="h-6 w-6 text-chart-1" />
              </div>
              <div className="text-2xl mb-1">1,000+</div>
              <p className="text-muted-foreground">Skills Available</p>
            </div>
            <div className="text-center p-6 bg-secondary/20 rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-chart-2/20 mb-3">
                <TrendingUp className="h-6 w-6 text-chart-2" />
              </div>
              <div className="text-2xl mb-1">95%</div>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center p-6 bg-secondary/20 rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-chart-3/20 mb-3">
                <Sparkles className="h-6 w-6 text-chart-3" />
              </div>
              <div className="text-2xl mb-1">AI-Powered</div>
              <p className="text-muted-foreground">Personalization</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
