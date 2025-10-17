import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  PlayCircle,
  FileText,
  Video,
  Code,
  Award,
  Calendar,
  Download,
  Share2,
  Sparkles,
  Flame,
  Zap
} from "lucide-react";
import { CourseFormData } from "./CourseBuilderForm";

interface GeneratedCourseProps {
  formData: CourseFormData;
  onReset: () => void;
}

interface Module {
  id: number;
  title: string;
  duration: string;
  lessons: {
    title: string;
    type: "video" | "reading" | "exercise" | "project";
    duration: string;
  }[];
}

interface GeneratedCoursePropsExtended extends GeneratedCourseProps {
  onOpenQuiz?: () => void;
  onOpenAssignments?: () => void;
}

export function GeneratedCourse({ formData, onReset, onOpenQuiz, onOpenAssignments }: GeneratedCoursePropsExtended) {
  const getLevelIndex = (level: string) => {
    const levels = ["beginner", "elementary", "intermediate", "advanced", "expert"];
    return levels.indexOf(level);
  };

  const currentIndex = getLevelIndex(formData.currentLevel);
  const targetIndex = getLevelIndex(formData.desiredLevel);
  const levelDifference = targetIndex - currentIndex;
  
  const estimatedWeeks = Math.ceil((levelDifference * 8) / (formData.timeAvailable / 5));
  const totalHours = levelDifference * 40;
  
  const modules: Module[] = generateModules(formData.courseName, levelDifference);

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Success Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/20 rounded-xl p-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-full">
            <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400 animate-pulse" />
          </div>
          <div className="flex-1">
            <h4 className="text-green-900 dark:text-green-100">Course Generated Successfully!</h4>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Your personalized learning path is ready. Let's achieve your goals together!
            </p>
          </div>
          <div className="hidden md:flex gap-1">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Flame className="h-5 w-5 text-orange-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="shadow-lg border-border/50 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3" />
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {formData.currentLevel} → {formData.desiredLevel}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {formData.timeAvailable} hrs/week
                  </Badge>
                  <Badge className="gap-1 bg-gradient-to-r from-chart-1 to-chart-2">
                    <Zap className="h-3 w-3" />
                    AI Optimized
                  </Badge>
                </div>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-chart-1 to-chart-3 rounded-lg">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  {formData.courseName}
                </CardTitle>
                <CardDescription>
                  Your personalized learning path • {estimatedWeeks} weeks • {totalHours} total hours
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-gradient-to-br from-chart-1/10 to-chart-1/5 rounded-lg space-y-1 border border-chart-1/20"
              >
                <div className="flex items-center gap-2 text-chart-1">
                  <Calendar className="h-4 w-4" />
                  <span>Timeline</span>
                </div>
                <p>{estimatedWeeks} weeks</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-gradient-to-br from-chart-2/10 to-chart-2/5 rounded-lg space-y-1 border border-chart-2/20"
              >
                <div className="flex items-center gap-2 text-chart-2">
                  <Clock className="h-4 w-4" />
                  <span>Total Time</span>
                </div>
                <p>{totalHours} hours</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-4 bg-gradient-to-br from-chart-3/10 to-chart-3/5 rounded-lg space-y-1 border border-chart-3/20"
              >
                <div className="flex items-center gap-2 text-chart-3">
                  <Target className="h-4 w-4" />
                  <span>Modules</span>
                </div>
                <p>{modules.length} modules</p>
              </motion.div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Course Progress</span>
                <span>0%</span>
              </div>
              <Progress value={0} className="h-2" />
              <p className="text-sm text-muted-foreground">Start your first lesson to begin tracking progress</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Course Modules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <PlayCircle className="h-5 w-5 text-primary" />
                  </div>
                  Course Curriculum
                </CardTitle>
                <CardDescription className="mt-2">
                  Follow these modules in order to achieve your learning goals
                </CardDescription>
              </div>
              <Badge variant="secondary" className="hidden md:flex">
                {modules.length} Modules
              </Badge>
            </div>
          </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {modules.map((module, index) => (
              <AccordionItem key={module.id} value={`module-${module.id}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <span>{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4>{module.title}</h4>
                      <p className="text-muted-foreground">{module.duration}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-11 space-y-3 pt-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer group"
                      >
                        <div className="mt-0.5">
                          {lesson.type === "video" && <Video className="h-4 w-4 text-chart-1" />}
                          {lesson.type === "reading" && <FileText className="h-4 w-4 text-chart-2" />}
                          {lesson.type === "exercise" && <Code className="h-4 w-4 text-chart-3" />}
                          {lesson.type === "project" && <Award className="h-4 w-4 text-chart-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="group-hover:text-primary transition-colors">{lesson.title}</p>
                          <p className="text-muted-foreground">{lesson.duration}</p>
                        </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="shrink-0">
                                {lesson.type}
                              </Badge>

                              {lesson.type === 'exercise' && (
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" onClick={() => onOpenQuiz && onOpenQuiz()}>
                                    Quiz
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => onOpenAssignments && onOpenAssignments()}>
                                    Assignment
                                  </Button>
                                </div>
                              )}
                            </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* Completion Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="shadow-lg border-border/50 bg-gradient-to-br from-chart-1/5 via-chart-2/5 to-chart-3/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-chart-1/20 to-chart-3/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-chart-2/20 to-chart-1/20 rounded-full blur-3xl" />
          
          <CardContent className="pt-6 relative">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-chart-1 to-chart-3 rounded-full">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="flex items-center gap-2 justify-center md:justify-start">
                  Ready to Start Your Journey?
                  <Sparkles className="h-5 w-5 text-chart-1 animate-pulse" />
                </h3>
                <p className="text-muted-foreground">
                  Complete all modules to earn your certificate and reach <strong>{formData.desiredLevel}</strong> level
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={onReset} variant="outline">
                  Create New Course
                </Button>
                <Button className="gap-2 bg-gradient-to-r from-chart-1 to-chart-3 hover:opacity-90">
                  <CheckCircle2 className="h-4 w-4" />
                  Start Learning
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function generateModules(courseName: string, levelDifference: number): Module[] {
  const baseModules = [
    {
      id: 1,
      title: `Introduction to ${courseName}`,
      duration: "2-3 hours",
      lessons: [
        { title: "Course Overview and Expectations", type: "video" as const, duration: "15 min" },
        { title: "Setting Up Your Environment", type: "reading" as const, duration: "30 min" },
        { title: "First Steps and Basic Concepts", type: "video" as const, duration: "45 min" },
        { title: "Practice Exercise: Getting Started", type: "exercise" as const, duration: "1 hour" },
      ],
    },
    {
      id: 2,
      title: "Fundamental Concepts",
      duration: "8-10 hours",
      lessons: [
        { title: "Core Principles and Theory", type: "video" as const, duration: "1 hour" },
        { title: "Essential Terminology", type: "reading" as const, duration: "45 min" },
        { title: "Hands-on Practice Session", type: "exercise" as const, duration: "2 hours" },
        { title: "Building Your First Project", type: "project" as const, duration: "4 hours" },
        { title: "Review and Assessment", type: "exercise" as const, duration: "1.5 hours" },
      ],
    },
    {
      id: 3,
      title: "Intermediate Techniques",
      duration: "12-15 hours",
      lessons: [
        { title: "Advanced Concepts Introduction", type: "video" as const, duration: "1.5 hours" },
        { title: "Best Practices and Patterns", type: "reading" as const, duration: "1 hour" },
        { title: "Practical Applications", type: "video" as const, duration: "2 hours" },
        { title: "Complex Exercise Set", type: "exercise" as const, duration: "3 hours" },
        { title: "Mid-Level Project", type: "project" as const, duration: "6 hours" },
      ],
    },
    {
      id: 4,
      title: "Advanced Applications",
      duration: "15-18 hours",
      lessons: [
        { title: "Professional Techniques", type: "video" as const, duration: "2 hours" },
        { title: "Industry Standards and Tools", type: "reading" as const, duration: "1.5 hours" },
        { title: "Advanced Problem Solving", type: "exercise" as const, duration: "4 hours" },
        { title: "Comprehensive Project", type: "project" as const, duration: "8 hours" },
        { title: "Code Review and Optimization", type: "video" as const, duration: "2 hours" },
      ],
    },
    {
      id: 5,
      title: "Mastery and Specialization",
      duration: "20+ hours",
      lessons: [
        { title: "Expert-Level Concepts", type: "video" as const, duration: "2.5 hours" },
        { title: "Cutting-Edge Techniques", type: "reading" as const, duration: "2 hours" },
        { title: "Real-World Case Studies", type: "video" as const, duration: "3 hours" },
        { title: "Capstone Project", type: "project" as const, duration: "12 hours" },
        { title: "Final Assessment and Certification", type: "exercise" as const, duration: "2 hours" },
      ],
    },
  ];

  return baseModules.slice(0, Math.min(levelDifference + 2, 5));
}
