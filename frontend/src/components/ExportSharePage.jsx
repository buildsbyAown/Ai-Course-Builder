import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft, 
  LogOut, 
  Download,
  Share2,
  Mail,
  Link,
  FileText,
  BookOpen,
  Copy,
  CheckCircle2
} from "lucide-react";

export function ExportSharePage({ course, onBack, onLogout }) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");

  const courseData = course || {
    title: "Web Development Fundamentals",
    progress: 65,
    modules: 5,
    duration: "40 hours"
  };

  const shareUrl = "https://learnpath.ai/courses/web-dev-fundamentals";
  const exportFormats = [
    { name: "PDF", icon: FileText, description: "Standard document format" },
    { name: "Markdown", icon: BookOpen, description: "Plain text with formatting" },
    { name: "JSON", icon: FileText, description: "Structured data format" }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailShare = (e) => {
    e.preventDefault();
    // Handle email sharing logic
    console.log("Sharing via email to:", email);
    setEmail("");
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
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Export & Share</h1>
            <p className="text-muted-foreground">
              Export your course materials or share with others
            </p>
          </div>

          <Tabs defaultValue="export" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="export">Export</TabsTrigger>
              <TabsTrigger value="share">Share</TabsTrigger>
            </TabsList>

            {/* Export Tab */}
            <TabsContent value="export" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Export Course Materials</CardTitle>
                  <CardDescription>
                    Download your course content in various formats
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    {exportFormats.map((format) => (
                      <Card key={format.name} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-6 text-center">
                          <div className="p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <format.icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-semibold mb-1">{format.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{format.description}</p>
                          <Button variant="outline" className="w-full gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h4 className="font-semibold mb-2">What's included in the export:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Complete course outline and structure</li>
                      <li>• All lesson content and materials</li>
                      <li>• Assignments and exercises</li>
                      <li>• Progress tracking data</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Share Tab */}
            <TabsContent value="share" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Share Course</CardTitle>
                  <CardDescription>
                    Share this course with others via link or email
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Share via Link */}
                  <div className="space-y-3">
                    <Label>Shareable Link</Label>
                    <div className="flex gap-2">
                      <Input 
                        value={shareUrl} 
                        readOnly 
                        className="bg-input-background"
                      />
                      <Button 
                        onClick={handleCopyLink}
                        className="gap-2"
                        variant={copied ? "default" : "outline"}
                      >
                        {copied ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Anyone with this link can view the course content
                    </p>
                  </div>

                  {/* Share via Email */}
                  <div className="space-y-3">
                    <Label>Share via Email</Label>
                    <form onSubmit={handleEmailShare} className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-input-background"
                        required
                      />
                      <Button type="submit" className="gap-2">
                        <Mail className="h-4 w-4" />
                        Send
                      </Button>
                    </form>
                  </div>

                  {/* Privacy Settings */}
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h4 className="font-semibold mb-2">Privacy Settings</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Link sharing</span>
                        <Badge variant="outline">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Requires sign-in</span>
                        <Badge variant="outline">Optional</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progress tracking</span>
                        <Badge variant="outline">Private</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Shares */}
              <Card>
                <CardHeader>
                  <CardTitle>Recently Shared With</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">sarah@example.com</p>
                        <p className="text-sm text-muted-foreground">Shared 2 days ago</p>
                      </div>
                      <Badge variant="outline">Viewed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">mike@example.com</p>
                        <p className="text-sm text-muted-foreground">Shared 1 week ago</p>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Course Summary */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">{courseData.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{courseData.modules} modules</span>
                    <span>{courseData.duration}</span>
                    <span>{courseData.progress}% complete</span>
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Quick Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}