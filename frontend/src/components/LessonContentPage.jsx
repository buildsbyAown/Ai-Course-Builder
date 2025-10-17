import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  LogOut, 
  PlayCircle, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  FileText,
  Video
} from "lucide-react";

export function LessonContentPage({ onBack, onLogout, onNext }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const lesson = {
    title: "CSS Selectors and Properties",
    type: "video",
    duration: "25 min",
    description: "Learn about different CSS selectors and how to apply properties to style your web pages effectively.",
    content: `
      <h3>Understanding CSS Selectors</h3>
      <p>CSS selectors are patterns used to select the elements you want to style. Here are the main types:</p>
      
      <h4>Basic Selectors:</h4>
      <ul>
        <li><strong>Element Selector:</strong> Selects all elements of a specific type</li>
        <li><strong>Class Selector:</strong> Selects elements with a specific class</li>
        <li><strong>ID Selector:</strong> Selects a single element with a specific ID</li>
      </ul>

      <h4>Example Code:</h4>
      <pre><code>/* Element selector */
p {
  color: blue;
}

/* Class selector */
.button {
  background: #007bff;
}

/* ID selector */
#header {
  padding: 20px;
}</code></pre>
    `,
    videoUrl: "https://example.com/video/css-selectors"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Button>
          
          <div className="flex items-center gap-4">
            <Progress value={65} className="w-24 h-2" />
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
          {/* Lesson Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="outline" className="mb-2 gap-1">
                    {lesson.type === 'video' ? <Video className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                    {lesson.type}
                  </Badge>
                  <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
                  <p className="text-muted-foreground">{lesson.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{lesson.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Player */}
          {lesson.type === 'video' && (
            <Card>
              <CardHeader>
                <CardTitle>Video Lesson</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="h-16 w-16 text-chart-1 mx-auto mb-4" />
                    <p className="text-muted-foreground">Video player would be embedded here</p>
                    <p className="text-sm text-muted-foreground mt-2">{lesson.videoUrl}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lesson Content */}
          <Card>
            <CardHeader>
              <CardTitle>Lesson Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            </CardContent>
          </Card>

          {/* Completion Section */}
          <Card className={isCompleted ? "bg-green-500/10 border-green-500/20" : ""}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  ) : (
                    <div className="h-8 w-8 rounded-full border-2 border-muted-foreground/50" />
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {isCompleted ? "Lesson Completed!" : "Mark as Complete"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isCompleted 
                        ? "You've successfully completed this lesson" 
                        : "Check this when you've finished the lesson"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant={isCompleted ? "outline" : "default"}
                    onClick={() => setIsCompleted(!isCompleted)}
                    className="gap-2"
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Completed
                      </>
                    ) : (
                      "Mark Complete"
                    )}
                  </Button>
                  
                  {isCompleted && (
                    <Button onClick={onNext} className="gap-2">
                      Next Lesson
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack} className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button onClick={onNext} className="gap-2">
              Next Lesson
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}