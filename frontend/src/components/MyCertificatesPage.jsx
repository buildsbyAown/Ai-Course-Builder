import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  ArrowLeft, 
  LogOut, 
  Search,
  Download,
  Eye,
  Award,
  Calendar,
  Filter
} from "lucide-react";

export function MyCertificatesPage({ onBack, onLogout, onViewCertificate }) {
  const certificates = [
    {
      id: "LP-2024-WD-001",
      title: "Web Development Fundamentals",
      issueDate: "December 15, 2024",
      completionDate: "December 15, 2024",
      duration: "40 hours",
      grade: "A+",
      status: "verified",
      skills: ["HTML", "CSS", "JavaScript", "Responsive Design"]
    },
    {
      id: "LP-2024-DS-002",
      title: "Data Science Essentials",
      issueDate: "November 20, 2024",
      completionDate: "November 20, 2024",
      duration: "60 hours",
      grade: "A",
      status: "verified",
      skills: ["Python", "Pandas", "Matplotlib", "Data Analysis"]
    },
    {
      id: "LP-2024-ML-003",
      title: "Machine Learning Basics",
      issueDate: "In Progress",
      completionDate: "-",
      duration: "80 hours",
      grade: "-",
      status: "in-progress",
      skills: ["Python", "Scikit-learn", "TensorFlow", "Neural Networks"]
    }
  ];

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
              <p className="text-muted-foreground">
                Your earned certificates and achievements
              </p>
            </div>
            <Badge variant="outline" className="gap-1">
              <Award className="h-3 w-3" />
              {certificates.filter(c => c.status === 'verified').length} Certificates
            </Badge>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search certificates..."
                    className="pl-10 bg-input-background"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full transition-all hover:shadow-lg ${
                  certificate.status === 'in-progress' ? 'opacity-75' : ''
                }`}>
                  <CardContent className="p-6">
                    {/* Certificate Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-chart-1 to-chart-3 rounded-lg">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant={
                        certificate.status === 'verified' ? 'default' : 
                        certificate.status === 'in-progress' ? 'outline' : 'secondary'
                      }>
                        {certificate.status === 'verified' ? 'Verified' : 
                         certificate.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </Badge>
                    </div>

                    {/* Certificate Details */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg leading-tight">
                        {certificate.title}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Issued:</span>
                          <span>{certificate.issueDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{certificate.duration}</span>
                        </div>
                        {certificate.grade !== '-' && (
                          <div className="flex justify-between">
                            <span>Grade:</span>
                            <span className="font-semibold text-foreground">{certificate.grade}</span>
                          </div>
                        )}
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {certificate.skills.slice(0, 3).map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {certificate.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{certificate.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        {certificate.status === 'verified' ? (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 gap-1"
                              onClick={onViewCertificate}
                            >
                              <Eye className="h-3 w-3" />
                              View
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 gap-1"
                            >
                              <Download className="h-3 w-3" />
                              Download
                            </Button>
                          </>
                        ) : certificate.status === 'in-progress' ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            disabled
                          >
                            In Progress
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            disabled
                          >
                            Pending
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State (if no certificates) */}
          {certificates.filter(c => c.status === 'verified').length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="p-4 bg-secondary/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">No Certificates Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Complete your courses to earn certificates and showcase your achievements.
                </p>
                <Button onClick={onBack}>
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Certificate Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-full">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {certificates.filter(c => c.status === 'verified').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Certificates Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {certificates.filter(c => c.status === 'in-progress').length}
                    </p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-full">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {certificates.reduce((total, cert) => {
                        const hours = parseInt(cert.duration);
                        return total + (isNaN(hours) ? 0 : hours);
                      }, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Learning Hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}