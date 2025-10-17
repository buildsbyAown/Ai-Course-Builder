import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  LogOut, 
  Upload,
  Download,
  Calendar,
  CheckCircle2,
  Clock
} from "lucide-react";

export function AssignmentsPage({ onBack, onLogout, onSubmit }) {
  const [submission, setSubmission] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const assignment = {
    title: "Build a Responsive Layout",
    description: "Create a responsive webpage layout using CSS Grid and Flexbox",
    dueDate: "2024-12-31",
    points: 100,
    instructions: `
      # Assignment: Responsive Layout

      ## Objective
      Create a responsive webpage layout that works on desktop, tablet, and mobile devices.

      ## Requirements:
      1. Use CSS Grid for the main layout
      2. Use Flexbox for component alignment
      3. Implement media queries for responsiveness
      4. Include at least 3 breakpoints
      5. Ensure accessibility standards

      ## Submission Guidelines:
      - Submit your HTML and CSS files
      - Include a README with setup instructions
      - Ensure code is properly commented

      ## Evaluation Criteria:
      - Code quality and organization
      - Responsive design implementation
      - Browser compatibility
      - Accessibility compliance
    `,
    attachments: [
      { name: "design-mockup.jpg", size: "2.4 MB" },
      { name: "requirements.pdf", size: "1.1 MB" }
    ]
  };

  const handleSubmit = () => {
    if (submission.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Button>
          <Button variant="ghost" onClick={onLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container px-4 py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Assignment Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{assignment.title}</h1>
                  <p className="text-muted-foreground mb-4">{assignment.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="gap-1">
                      <Calendar className="h-3 w-3" />
                      Due: {assignment.dueDate}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-chart-1 to-chart-2">
                      {assignment.points} points
                    </Badge>
                  </div>
                </div>
                
                {isSubmitted && (
                  <Badge className="bg-green-500 gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Submitted
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Resources
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Instructions & Attachments */}
            <div className="lg:col-span-2 space-y-6">
              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: assignment.instructions }}
                  />
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Download these files to get started</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {assignment.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.size}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Submission Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isSubmitted ? "Submission Status" : "Submit Assignment"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!isSubmitted ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Submission</label>
                        <Textarea
                          placeholder="Paste your code, GitHub link, or write your response here..."
                          value={submission}
                          onChange={(e) => setSubmission(e.target.value)}
                          className="min-h-[200px] bg-input-background"
                        />
                      </div>

                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Or upload files
                        </p>
                        <Button variant="outline" size="sm">
                          Choose Files
                        </Button>
                      </div>

                      <Button 
                        onClick={handleSubmit}
                        disabled={!submission.trim()}
                        className="w-full gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Submit Assignment
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="p-3 bg-green-500/10 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-1">Assignment Submitted!</h3>
                        <p className="text-sm text-muted-foreground">
                          Your submission has been received and is awaiting review.
                        </p>
                      </div>

                      <div className="text-left space-y-2 p-3 bg-secondary/50 rounded">
                        <div className="flex justify-between text-sm">
                          <span>Submitted on:</span>
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Status:</span>
                          <Badge variant="outline">Under Review</Badge>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full" onClick={onSubmit}>
                        Back to Course
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Grading Rubric */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Grading Rubric</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Code Quality</span>
                    <span>30 points</span>
                  </div>
                  <Progress value={0} className="h-1" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Functionality</span>
                    <span>40 points</span>
                  </div>
                  <Progress value={0} className="h-1" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Design & UX</span>
                    <span>30 points</span>
                  </div>
                  <Progress value={0} className="h-1" />
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}