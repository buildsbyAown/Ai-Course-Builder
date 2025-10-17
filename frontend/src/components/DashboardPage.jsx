import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  BookOpen, 
  User, 
  LogOut, 
  Plus,
  TrendingUp,
  Award,
  Clock,
  Target,
  Sparkles
} from "lucide-react";

export function DashboardPage({ 
  onLogout, 
  onProfile, 
  onCourseBuilder, 
  onCourseSelect, 
  onProgress,
  onCertificates 
}) {
  const enrolledCourses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      progress: 65,
      duration: "40 hours",
      level: "Intermediate",
      nextLesson: "JavaScript Arrays"
    },
    {
      id: 2,
      title: "Data Science Essentials",
      progress: 30,
      duration: "60 hours",
      level: "Beginner",
      nextLesson: "Data Visualization"
    }
  ];

  const stats = [
    { label: "Courses Enrolled", value: "3", icon: BookOpen, color: "text-chart-1" },
    { label: "Hours Learned", value: "42", icon: Clock, color: "text-chart-2" },
    { label: "Certificates", value: "1", icon: Award, color: "text-chart-3" },
    { label: "Current Streak", value: "7 days", icon: TrendingUp, color: "text-chart-4" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-chart-1 to-chart-3">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">LearnPath AI</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onProfile} className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" onClick={onLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground">Continue your learning journey where you left off.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-secondary ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Button onClick={onCourseBuilder} className="gap-2">
                <Plus className="h-4 w-4" />
                New Course
              </Button>
            </div>

            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onCourseSelect(course)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.duration}
                          </span>
                          <Badge variant="secondary">{course.level}</Badge>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-chart-1 to-chart-2">
                        {course.progress}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Next: {course.nextLesson}
                      </span>
                      <Button variant="outline" size="sm">
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={onCourseBuilder}>
                  <Plus className="h-4 w-4" />
                  Create New Course
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={onProgress}>
                  <TrendingUp className="h-4 w-4" />
                  View Progress
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={onCertificates}>
                  <Award className="h-4 w-4" />
                  My Certificates
                </Button>
              </CardContent>
            </Card>

            {/* Today's Goal */}
            <Card className="bg-gradient-to-br from-chart-1/10 to-chart-2/10 border-chart-1/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-chart-1" />
                  Today's Goal
                </CardTitle>
                <CardDescription>Complete 2 lessons to maintain your streak</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">1/2</span>
                  <Badge variant="outline" className="text-chart-1">
                    Almost there!
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}