import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ThemeToggle } from "./ThemeToggle.jsx";
import { ImageWithFallback } from "./figma/ImageWithFallback.jsx";
import {
  BookOpen,
  Brain,
  Clock,
  Target,
  Zap,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  Star,
  CheckCircle2,
  ArrowRight,
  Play,
  BarChart3,
  Lightbulb,
  Rocket,
  Shield,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Personalization",
    description: "Our intelligent algorithm creates a custom learning path tailored to your goals and schedule.",
    color: "text-chart-1",
    bg: "bg-chart-1/10",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Learn at your own pace with courses that adapt to your available time and commitments.",
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  {
    icon: Target,
    title: "Goal-Oriented Learning",
    description: "Set your target skill level and we'll create the perfect roadmap to get you there.",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your progress with detailed analytics and stay motivated with achievements.",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience.",
    color: "text-chart-1",
    bg: "bg-chart-1/10",
  },
  {
    icon: Award,
    title: "Certification",
    description: "Earn recognized certificates upon completion to boost your career prospects.",
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
];

const stats = [
  { value: "50K+", label: "Active Learners", icon: Users },
  { value: "1000+", label: "Courses Created", icon: BookOpen },
  { value: "95%", label: "Success Rate", icon: TrendingUp },
  { value: "4.9/5", label: "User Rating", icon: Star },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    content: "This platform completely transformed how I approach learning. The personalized path helped me transition from beginner to intermediate in just 3 months!",
    avatar: "SJ",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Marketing Manager",
    content: "The flexibility to learn at my own pace while having a structured curriculum was exactly what I needed. Highly recommended!",
    avatar: "MC",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Data Analyst",
    content: "The AI-powered personalization is incredible. It knew exactly what I needed to learn next. Best investment in my career!",
    avatar: "ER",
    rating: 5,
  },
];

export function LandingPage({ onGetStarted, onLogin, onSignup }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-chart-1 to-chart-3">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg">LearnPath AI</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" onClick={onLogin}>
              Log In
            </Button>
            <Button onClick={onSignup} className="gap-2">
              Sign Up <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Rocket className="h-4 w-4 text-primary" />
              <span className="text-primary">AI-Powered Learning Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              Master Any Skill with{" "}
              <span className="bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Personalized Learning
              </span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl">
              Get a custom learning path designed just for you. Our AI analyzes your goals, schedule, and skill level to create the perfect course.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onGetStarted} className="gap-2">
                <Zap className="h-5 w-5" />
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="border-2 border-background">
                    <AvatarFallback className="bg-gradient-to-br from-chart-1 to-chart-2">
                      U{i}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">Trusted by 50,000+ learners</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758874573116-2bc02232eef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBvbmxpbmV8ZW58MXx8fHwxNzYwNDI2ODQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Student learning online"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-background border rounded-xl shadow-lg p-4 max-w-[200px]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Course Complete</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -top-6 -right-6 bg-background border rounded-xl shadow-lg p-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-1/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Progress</div>
                  <div>87%</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl md:text-3xl mb-1">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">Features</Badge>
          <h2 className="text-3xl md:text-4xl mb-4">Everything You Need to Succeed</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform combines cutting-edge AI with proven learning methodologies to help you achieve your goals faster.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container px-4 py-16 md:py-24 bg-secondary/20 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl mb-4">Start Learning in 3 Simple Steps</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: "01",
              icon: Target,
              title: "Set Your Goals",
              description: "Tell us what you want to learn, your current level, and how much time you have.",
            },
            {
              step: "02",
              icon: Brain,
              title: "Get Your Path",
              description: "Our AI creates a personalized curriculum tailored specifically to your needs.",
            },
            {
              step: "03",
              icon: Rocket,
              title: "Start Learning",
              description: "Follow your custom path, track progress, and achieve your learning goals.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-chart-1 to-chart-3 flex items-center justify-center text-white text-xl">
                  {step.step}
                </div>
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl mb-4">Loved by Learners Worldwide</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what our community has to say about their learning journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base">{testimonial.content}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-chart-1 to-chart-2">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{testimonial.name}</p>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-chart-1/10 via-chart-2/10 to-chart-3/10 border-0">
            <CardContent className="p-12 text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="inline-flex items-center justify-center p-3 bg-primary rounded-full mb-4">
                  <Lightbulb className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl md:text-4xl">Ready to Transform Your Learning?</h2>
                <p className="text-muted-foreground text-lg">
                  Join thousands of learners who are already achieving their goals with personalized learning paths.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button size="lg" onClick={onGetStarted} className="gap-2">
                    <Sparkles className="h-5 w-5" />
                    Start Learning Now
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Shield className="h-5 w-5" />
                    No Credit Card Required
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-chart-1 to-chart-3">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg">LearnPath AI</span>
              </div>
              <p className="text-muted-foreground">
                Empowering learners worldwide with AI-powered personalized education.
              </p>
            </div>
            
            <div>
              <h4 className="mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground">
            <p>© 2025 LearnPath AI. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Globe className="h-4 w-4" />
              <span>Made with ❤️ for learners everywhere</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
