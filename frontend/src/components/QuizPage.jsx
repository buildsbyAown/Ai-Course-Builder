import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  LogOut, 
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";

export function QuizPage({ onBack, onLogout, onSubmit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const quiz = {
    title: "CSS Fundamentals Quiz",
    description: "Test your knowledge of CSS selectors and properties",
    duration: "10 minutes",
    questions: [
      {
        id: 1,
        question: "Which CSS selector targets an element with ID 'header'?",
        options: [
          ".header",
          "#header",
          "header",
          "*header"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What does the 'margin' property control?",
        options: [
          "Internal spacing within an element",
          "External spacing around an element",
          "Element border thickness",
          "Text alignment"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Which property changes text color?",
        options: [
          "text-color",
          "font-color",
          "color",
          "text-style"
        ],
        correctAnswer: 2
      }
    ]
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    const correct = quiz.questions.filter((q, index) => answers[q.id] === q.correctAnswer).length;
    return Math.round((correct / quiz.questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 70;

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

        <div className="container px-4 py-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className={passed ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}>
              <CardContent className="p-8">
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  passed ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {passed ? (
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  )}
                </div>
                
                <h2 className="text-2xl font-bold mb-2">
                  {passed ? "Quiz Passed! 🎉" : "Quiz Failed 😔"}
                </h2>
                
                <div className="text-4xl font-bold mb-4">
                  {score}%
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {passed 
                    ? "Congratulations! You've passed the quiz with flying colors."
                    : "Don't worry! Review the material and try again."
                  }
                </p>

                <div className="grid gap-3 mb-6">
                  {quiz.questions.map((q, index) => (
                    <div key={q.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                      <span>Question {index + 1}</span>
                      <Badge variant={
                        answers[q.id] === q.correctAnswer ? "default" : "destructive"
                      }>
                        {answers[q.id] === q.correctAnswer ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button onClick={onSubmit} className="w-full">
                  {passed ? "Continue Learning" : "Retry Quiz"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {quiz.duration}
            </div>
            <Button variant="ghost" onClick={onLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Quiz Header */}
          <Card>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Current Question */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {currentQ.question}
              </h3>

              <RadioGroup 
                value={answers[currentQ.id]?.toString()} 
                onValueChange={(value) => handleAnswer(currentQ.id, parseInt(value))}
                className="space-y-3"
              >
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-secondary/30 cursor-pointer">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={answers[currentQ.id] === undefined}
            >
              {currentQuestion === quiz.questions.length - 1 ? "Submit Quiz" : "Next Question"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}