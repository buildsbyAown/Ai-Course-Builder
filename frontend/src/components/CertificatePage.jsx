import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  LogOut, 
  Download,
  Share2,
  Award,
  Calendar,
  Clock,
  CheckCircle2
} from "lucide-react";

export function CertificatePage({ onBack, onLogout, onMyCertificates }) {
  const certificate = {
    title: "Web Development Fundamentals",
    recipient: "John Doe",
    issueDate: "December 15, 2024",
    completionDate: "December 15, 2024",
    duration: "40 hours",
    certificateId: "LP-2024-WD-001",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    instructor: "Dr. Sarah Johnson",
    grade: "A+"
  };

  const handleDownload = () => {
    // Handle certificate download
    console.log("Downloading certificate...");
  };

  const handleShare = () => {
    // Handle certificate sharing
    console.log("Sharing certificate...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Progress
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
          {/* Certificate Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Certificate of Completion</h1>
            <p className="text-muted-foreground">
              Congratulations on completing your course!
            </p>
          </div>

          {/* Certificate Preview */}
          <Card className="border-2 border-gold shadow-2xl">
            <CardContent className="p-8">
              {/* Certificate Design */}
              <div className="text-center space-y-6">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-chart-1 to-chart-3 flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">LearnPath AI</h2>
                  </div>
                  <p className="text-muted-foreground uppercase tracking-widest text-sm">
                    Certificate of Completion
                  </p>
                </div>

                {/* Main Content */}
                <div className="space-y-4 mb-8">
                  <p className="text-lg text-muted-foreground">
                    This certifies that
                  </p>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-chart-1 to-chart-3 bg-clip-text text-transparent">
                    {certificate.recipient}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    has successfully completed the course
                  </p>
                  <h4 className="text-2xl font-semibold">{certificate.title}</h4>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                  <div className="text-left">
                    <p className="font-semibold">Completion Date</p>
                    <p className="text-muted-foreground">{certificate.completionDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Duration</p>
                    <p className="text-muted-foreground">{certificate.duration}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Instructor</p>
                    <p className="text-muted-foreground">{certificate.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Grade</p>
                    <p className="text-muted-foreground">{certificate.grade}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <p className="font-semibold mb-3">Skills Acquired</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {certificate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Certificate ID */}
                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground">
                    Certificate ID: {certificate.certificateId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Verify at: learnpath.ai/verify
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleDownload} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={handleShare} variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button onClick={onMyCertificates} className="gap-2 bg-gradient-to-r from-chart-1 to-chart-2">
              <Award className="h-4 w-4" />
              View All Certificates
            </Button>
          </div>

          {/* Certificate Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-chart-1" />
                  Verification Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Certificate ID</span>
                  <span className="font-mono">{certificate.certificateId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issue Date</span>
                  <span>{certificate.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className="bg-green-500">Verified</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-chart-2" />
                  Course Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Duration</span>
                  <span>{certificate.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modules Completed</span>
                  <span>5/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Final Grade</span>
                  <span>{certificate.grade}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Share Achievement */}
          <Card className="bg-gradient-to-br from-chart-1/10 to-chart-2/10 border-chart-1/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Share Your Achievement! 🎉</h3>
                  <p className="text-sm text-muted-foreground">
                    Let others know about your accomplishment by sharing this certificate.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}