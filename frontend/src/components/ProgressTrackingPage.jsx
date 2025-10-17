import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  LogOut, 
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Target,
  Star,
  Zap
} from "lucide-react";

export function ProgressTrackingPage({ onBack, onLogout, onCertificate }) {
  const progressData = {
    overallProgress: 65,
    timeSpent: "42 hours",
    currentStreak: 7,
    courses: [
      {
        title: "Web Development Fundamentals",
        progress: 65,
        timeSpent: "28 hours",
        lastActivity: "2 hours ago",
        modulesCompleted: 3,
        totalModules: 5
      },
      {
        title: "Data Science Essentials",
        progress: 30,
        timeSpent: "14 hours",
        lastActivity: "1 day ago",
        modulesCompleted: 2,
        totalModules: 6
      }
    ],
    achievements: [
      { name: "First Lesson", icon: Star, earned: true },
      { name: "7-Day Streak", icon: Zap, earned: true },
      { name: "Course Completer", icon: Award, earned: false },
      { name: "Fast Learner", icon: TrendingUp, earned: false }
    ],
    weeklyActivity: [5, 7, 3, 8, 6, 4, 7] // hours per day
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button variant="ghost" onClick={onLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container px-4 py-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Learning Progress</h1>
            <p className="text-muted-foreground">
              Track your learning journey and achievements
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                    <p className="text-2xl font-bold">{progressData.overallProgress}%</p>
                  </div>
                  <div className="p-3 bg-chart-1/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-chart-1" />
                  </div>
                </div>
                <Progress value={progressData.overallProgress} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Time Spent</p>
                    <p className="text-2xl font-bold">{progressData.timeSpent}</p>
                  </div>
                  <div className="p-3 bg-chart-2/10 rounded-full">
                    <Clock className="h-6 w-6 text-chart-2" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Total learning time</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold">{progressData.currentStreak} days</p>
                  </div>
                  <div className="p-3 bg-chart-3/10 rounded-full">
                    <Zap className="h-6 w-6 text-chart-3" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Keep it going!</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Courses</p>
                    <p className="text-2xl font-bold">{progressData.courses.length}</p>
                  </div>
                  <div className="p-3 bg-chart-4/10 rounded-full">
                    <Target className="h-6 w-6 text-chart-4" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Active courses</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Course Progress */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                  <CardDescription>
                    Detailed progress for each of your courses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {progressData.courses.map((course, index) => (
                    <div key={index} className="space-y-3 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{course.title}</h3>
                        <Badge variant="outline">{course.progress}%</Badge>
                      </div>
                      
                      <Progress value={course.progress} className="h-2" />
                      
                      <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p>Time Spent</p>
                          <p className="font-semibold text-foreground">{course.timeSpent}</p>
                        </div>
                        <div>
                          <p>Modules</p>
                          <p className="font-semibold text-foreground">
                            {course.modulesCompleted}/{course.totalModules}
                          </p>
                        </div>
                        <div>
                          <p>Last Active</p>
                          <p className="font-semibold text-foreground">{course.lastActivity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>


            </div>

            {/* Achievements & Actions */}
            <div className="space-y-6">
              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>
                    Unlock achievements as you learn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {progressData.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-green-500/10 border-green-500/20' 
                          : 'bg-secondary/30'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        achievement.earned 
                          ? 'bg-green-500/20 text-green-600' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <achievement.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {achievement.earned ? 'Earned' : 'Locked'}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certificate Progress */}
              <Card className="bg-gradient-to-br from-chart-1/10 to-chart-2/10 border-chart-1/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-chart-1" />
                    Certificate Progress
                  </CardTitle>
                  <CardDescription>
                    Complete courses to earn certificates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Web Development Certificate</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Data Science Certificate</span>
                      <span>30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>

                  <Button onClick={onCertificate} className="w-full gap-2">
                    <Award className="h-4 w-4" />
                    View Certificates
                  </Button>
                </CardContent>
              </Card>

              {/* Learning Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Complete 2 courses</span>
                    <Badge variant="outline">1/2</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Learn for 50 hours</span>
                    <Badge variant="outline">42/50</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Maintain 14-day streak</span>
                    <Badge variant="outline">7/14</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}