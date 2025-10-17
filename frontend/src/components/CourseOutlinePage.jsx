import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { 
  ArrowLeft, 
  LogOut, 
  PlayCircle, 
  FileText, 
  Code, 
  Award,
  Download,
  Share2,
  Clock,
  CheckCircle2,
  Lock
} from "lucide-react";

export function CourseOutlinePage({ 
  course, 
  onBack, 
  onLogout, 
  onLessonSelect, 
  onQuiz, 
  onAssignment,
  onExport 
}) {
  const courseData = course || {
    title: "Web Development Fundamentals",
    progress: 65,
    duration: "40 hours",
    level: "Intermediate",
    modules: [
      {
        id: 1,
        title: "HTML Basics",
        duration: "5 hours",
        completed: true,
        lessons: [
          { id: 1, title: "Introduction to HTML", type: "video", duration: "15 min", completed: true },
          { id: 2, title: "HTML Tags and Elements", type: "video", duration: "20 min", completed: true },
          { id: 3, title: "Building Your First Page", type: "exercise", duration: "30 min", completed: true }
        ]
      },
      {
        id: 2,
        title: "CSS Fundamentals",
        duration: "8 hours",
        completed: false,
        lessons: [
          { id: 4, title: "CSS Selectors and Properties", type: "video", duration: "25 min", completed: true },
          { id: 5, title: "Box Model and Layout", type: "video", duration: "30 min", completed: true },
          { id: 6, title: "Responsive Design", type: "video", duration: "35 min", completed: false },
          { id: 7, title: "CSS Project", type: "project", duration: "2 hours", completed: false }
        ]
      },
      {
        id: 3,
        title: "JavaScript Essentials",
        duration: "12 hours",
        completed: false,
        lessons: [
          { id: 8, title: "JavaScript Basics", type: "video", duration: "40 min", completed: false },
          { id: 9, title: "Functions and Events", type: "video", duration: "45 min", completed: false },
          { id: 10, title: "DOM Manipulation", type: "exercise", duration: "1 hour", completed: false }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onExport} className="gap-2">
              <Share2 className="h-4 w-4" />
              Export
            </Button>
            <Button variant="ghost" onClick={onLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Course Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {courseData.duration}
                    </span>
                    <Badge variant="secondary">{courseData.level}</Badge>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-chart-1 to-chart-2 text-white">
                  {courseData.progress}% Complete
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course Progress</span>
                  <span>{courseData.progress}%</span>
                </div>
                <Progress value={courseData.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Course Modules */}
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>
                Complete all modules and exercises to finish the course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {courseData.modules.map((module, index) => (
                  <AccordionItem key={module.id} value={`module-${module.id}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left flex-1">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          module.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-primary/10'
                        } shrink-0`}>
                          {module.completed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{module.title}</h4>
                          <p className="text-muted-foreground text-sm">{module.duration}</p>
                        </div>
                        <Badge variant={module.completed ? "default" : "outline"}>
                          {module.completed ? "Completed" : `${module.lessons.filter(l => l.completed).length}/${module.lessons.length}`}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-11 space-y-3 pt-2">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer group ${
                              lesson.completed 
                                ? 'bg-green-500/10 border border-green-500/20' 
                                : 'hover:bg-secondary/30'
                            } ${!lesson.completed && !module.completed ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            onClick={() => !lesson.completed && module.completed !== false && onLessonSelect(lesson)}
                          >
                            <div className="mt-0.5">
                              {lesson.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              ) : module.completed ? (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <PlayCircle className="h-4 w-4 text-chart-1" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`group-hover:text-primary transition-colors ${
                                lesson.completed ? 'text-green-700' : ''
                              }`}>
                                {lesson.title}
                              </p>
                              <p className="text-muted-foreground text-sm">{lesson.duration}</p>
                            </div>
                            <Badge variant="outline" className="shrink-0">
                              {lesson.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onQuiz} variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Take Quiz
            </Button>
            <Button onClick={onAssignment} variant="outline" className="gap-2">
              <Code className="h-4 w-4" />
              View Assignment
            </Button>
            <Button onClick={onExport} className="gap-2 bg-gradient-to-r from-chart-1 to-chart-2">
              <Download className="h-4 w-4" />
              Export Certificate
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}