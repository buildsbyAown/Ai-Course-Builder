import React, { useState } from "react";
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

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");

  // Sample course data used for pages that expect a course prop
  const sampleCourse = {
    id: 1,
    title: "Web Development Fundamentals",
    progress: 65,
    duration: "40 hours",
    level: "Intermediate",
  };

  return (
    <ThemeProvider defaultTheme="light">
      <AnimatePresence mode="wait">
        {currentPage === "landing" && (
          <div key="landing">
            <LandingPage
              onGetStarted={() => setCurrentPage("course-builder")}
              onLogin={() => setCurrentPage("login")}
              onSignup={() => setCurrentPage("signup")}
            />
          </div>
        )}

        {currentPage === "login" && (
          <div key="login">
            <LoginPage
              onBack={() => setCurrentPage("landing")}
              onLogin={() => setCurrentPage("dashboard")}
              onSignup={() => setCurrentPage("signup")}
              onForgot={() => setCurrentPage("password-reset")}
            />
          </div>
        )}

        {currentPage === "signup" && (
          <div key="signup">
            <SignupPage
              onBack={() => setCurrentPage("landing")}
              onSignup={() => setCurrentPage("dashboard")}
              onLogin={() => setCurrentPage("login")}
            />
          </div>
        )}

        {currentPage === "password-reset" && (
          <div key="password-reset">
            <PasswordResetPage
              onBack={() => setCurrentPage("login")}
              onReset={() => setCurrentPage("login")}
            />
          </div>
        )}

        {currentPage === "course-builder" && (
          <div key="course-builder">
            <CourseBuilderPage
              onLogout={() => setCurrentPage("landing")}
              onProfile={() => setCurrentPage("profile")}
              onMyCourses={() => setCurrentPage("dashboard")}
              onProgress={() => setCurrentPage("progress")}
              onOpenQuiz={() => setCurrentPage("quiz")}
              onOpenAssignments={() => setCurrentPage("assignments")}
            />
          </div>
        )}

        {currentPage === "dashboard" && (
          <div key="dashboard">
            <DashboardPage
              onLogout={() => setCurrentPage("landing")}
              onProfile={() => setCurrentPage("profile")}
              onCourseBuilder={() => setCurrentPage("course-builder")}
              onCourseSelect={() => setCurrentPage("course-builder")}
              onProgress={() => setCurrentPage("progress")}
              onCertificates={() => setCurrentPage("my-certificates")}
            />
          </div>
        )}

        {currentPage === "course-outline" && (
          <div key="course-outline">
            <CourseOutlinePage
              course={sampleCourse}
              onBack={() => setCurrentPage("dashboard")}
              onLogout={() => setCurrentPage("landing")}
              onLessonSelect={() => setCurrentPage("lesson")}
              onQuiz={() => setCurrentPage("quiz")}
              onAssignment={() => setCurrentPage("assignments")}
              onExport={() => setCurrentPage("export-share")}
            />
          </div>
        )}

        {currentPage === "lesson" && (
          <div key="lesson">
            <LessonContentPage
              onBack={() => setCurrentPage("course-outline")}
              onLogout={() => setCurrentPage("landing")}
              onNext={() => setCurrentPage("course-outline")}
            />
          </div>
        )}

        {currentPage === "quiz" && (
          <div key="quiz">
            <QuizPage
              onBack={() => setCurrentPage("course-outline")}
              onLogout={() => setCurrentPage("landing")}
              onSubmit={() => setCurrentPage("course-outline")}
            />
          </div>
        )}

        {currentPage === "assignments" && (
          <div key="assignments">
            <AssignmentsPage
              onBack={() => setCurrentPage("course-outline")}
              onLogout={() => setCurrentPage("landing")}
              onSubmit={() => setCurrentPage("course-outline")}
            />
          </div>
        )}

        {currentPage === "export-share" && (
          <div key="export-share">
            <ExportSharePage
              course={sampleCourse}
              onBack={() => setCurrentPage("course-outline")}
              onLogout={() => setCurrentPage("landing")}
            />
          </div>
        )}

        {currentPage === "profile" && (
          <div key="profile">
            <EditProfilePage
              onBack={() => setCurrentPage("dashboard")}
              onSave={(updated) => {
                // Could integrate with user state / API; for now navigate back to dashboard
                console.log('Profile saved', updated);
                setCurrentPage("dashboard");
              }}
              onLogout={() => setCurrentPage("landing")}
              user={{ name: "John Doe", email: "john@example.com", avatar: "" }}
            />
          </div>
        )}

        {currentPage === "progress" && (
          <div key="progress">
            <ProgressTrackingPage
              onBack={() => setCurrentPage("dashboard")}
              onLogout={() => setCurrentPage("landing")}
              onCertificate={() => setCurrentPage("certificate")}
            />
          </div>
        )}

        {currentPage === "my-certificates" && (
          <div key="my-certificates">
            <MyCertificatesPage
              onBack={() => setCurrentPage("dashboard")}
              onLogout={() => setCurrentPage("landing")}
              onViewCertificate={() => setCurrentPage("certificate")}
            />
          </div>
        )}

        {currentPage === "certificate" && (
          <div key="certificate">
            <CertificatePage
              onBack={() => setCurrentPage("progress")}
              onLogout={() => setCurrentPage("landing")}
              onMyCertificates={() => setCurrentPage("my-certificates")}
            />
          </div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
