import React from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { CourseBuilderPage } from "./components/CourseBuilderPage";
import { DashboardPage } from "./components/DashboardPage";
import { CourseOutlinePage } from "./components/CourseOutlinePage";
import { LessonContentPage } from "./components/LessonContentPage";
import { QuizPage } from "./components/QuizPage";
import { AssignmentsPage } from "./components/AssignmentsPage";
import { ExportSharePage } from "./components/ExportSharePage";
import { PasswordResetPage } from "./components/PasswordResetPage";
import { UserProfilePage } from "./components/UserProfilePage";
import { EditProfilePage } from "./components/EditProfilePage";
import { ProgressTrackingPage } from "./components/ProgressTrackingPage";
import { MyCertificatesPage } from "./components/MyCertificatesPage";
import { CertificatePage } from "./components/CertificatePage";
import { AnimatePresence } from "motion/react";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  // Sample course data used for pages that expect a course prop
  const sampleCourse = {
    id: 1,
    title: "Web Development Fundamentals",
    progress: 65,
    duration: "40 hours",
    level: "Intermediate",
  };

  // helper callbacks to keep existing component props unchanged
  const props = {
    toLanding: () => navigate("/"),
    toLogin: () => navigate("/login"),
    toSignup: () => navigate("/signup"),
    toDashboard: () => navigate("/dashboard"),
    toCourseBuilder: () => navigate("/builder"),
    toCourseOutline: (id?: number) => navigate(id ? `/course/${id}` : "/course"),
    toLesson: (id?: number) => navigate(id ? `/course/${id}/lesson` : "/lesson"),
    toProfile: () => navigate("/profile"),
    toProgress: () => navigate("/progress"),
    toCertificates: () => navigate("/certificates"),
  };

  return (
    <ThemeProvider defaultTheme="light">
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={<LandingPage onGetStarted={props.toCourseBuilder} onLogin={props.toLogin} onSignup={props.toSignup} />}
          />

          <Route
            path="/login"
            element={<LoginPage onBack={props.toLanding} onLogin={props.toDashboard} onSignup={props.toSignup} onForgot={() => navigate("/password-reset")} />}
          />

          <Route
            path="/signup"
            element={<SignupPage onBack={props.toLanding} onSignup={props.toDashboard} onLogin={props.toLogin} />}
          />

          <Route
            path="/password-reset"
            element={<PasswordResetPage onBack={props.toLogin} onReset={props.toLogin} />}
          />

          <Route
            path="/builder"
            element={<CourseBuilderPage onLogout={props.toLanding} onProfile={props.toProfile} onMyCourses={props.toDashboard} onProgress={props.toProgress} onOpenQuiz={() => navigate("/quiz")} onOpenAssignments={() => navigate("/assignments")} />}
          />

          <Route
            path="/dashboard"
            element={<DashboardPage onLogout={props.toLanding} onProfile={props.toProfile} onCourseBuilder={props.toCourseBuilder} onCourseSelect={(course?: any) => props.toCourseOutline(course?.id)} onProgress={props.toProgress} onCertificates={props.toCertificates} />}
          />

          <Route
            path="/course"
            element={<CourseOutlinePage course={sampleCourse} onBack={props.toDashboard} onLogout={props.toLanding} onLessonSelect={() => navigate("/lesson")} onQuiz={() => navigate("/quiz")} onAssignment={() => navigate("/assignments")} onExport={() => navigate("/export-share")} />}
          />

          <Route
            path="/course/:id"
            element={<CourseOutlinePage course={sampleCourse} onBack={props.toDashboard} onLogout={props.toLanding} onLessonSelect={() => navigate("/lesson")} onQuiz={() => navigate("/quiz")} onAssignment={() => navigate("/assignments")} onExport={() => navigate("/export-share")} />}
          />

          <Route
            path="/lesson"
            element={<LessonContentPage onBack={() => navigate(-1)} onLogout={props.toLanding} onNext={() => navigate(-1)} />}
          />

          <Route
            path="/quiz"
            element={<QuizPage onBack={() => navigate(-1)} onLogout={props.toLanding} onSubmit={() => navigate(-1)} />}
          />

          <Route
            path="/assignments"
            element={<AssignmentsPage onBack={() => navigate(-1)} onLogout={props.toLanding} onSubmit={() => navigate(-1)} />}
          />

          <Route
            path="/export-share"
            element={<ExportSharePage course={sampleCourse} onBack={() => navigate(-1)} onLogout={props.toLanding} />}
          />

          <Route
            path="/profile"
            element={<EditProfilePage onBack={props.toDashboard} onSave={() => props.toDashboard()} onLogout={props.toLanding} user={{ name: "John Doe", email: "john@example.com", avatar: "" }} />}
          />

          <Route
            path="/progress"
            element={<ProgressTrackingPage onBack={props.toDashboard} onLogout={props.toLanding} onCertificate={() => navigate("/certificate")} />}
          />

          <Route
            path="/certificates"
            element={<MyCertificatesPage onBack={props.toDashboard} onLogout={props.toLanding} onViewCertificate={() => navigate("/certificate")} />}
          />

          <Route
            path="/certificate"
            element={<CertificatePage onBack={() => navigate("/progress")} onLogout={props.toLanding} onMyCertificates={() => navigate("/certificates")} />}
          />

          {/* Fallback route to landing */}
          <Route path="*" element={<LandingPage onGetStarted={props.toCourseBuilder} onLogin={props.toLogin} onSignup={props.toSignup} />} />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}
