import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import { LandingPage } from "./components/LandingPage.jsx";
import { LoginPage } from "./components/LoginPage.jsx";
import { SignupPage } from "./components/SignupPage.jsx";
import { CourseBuilderPage } from "./components/CourseBuilderPage.jsx";
import { DashboardPage } from "./components/DashboardPage.jsx";
import { UserProfilePage } from "./components/UserProfilePage.jsx";
import { PasswordResetPage } from "./components/PasswordResetPage.jsx";
import { CourseOutlinePage } from "./components/CourseOutlinePage.jsx";
import { LessonContentPage } from "./components/LessonContentPage.jsx";
import { QuizPage } from "./components/QuizPage.jsx";
import { AssignmentsPage } from "./components/AssignmentsPage.jsx";
import { ExportSharePage } from "./components/ExportSharePage.jsx";
import { ProgressTrackingPage } from "./components/ProgressTrackingPage.jsx";
import { CertificatePage } from "./components/CertificatePage.jsx";
import { MyCertificatesPage } from "./components/MyCertificatesPage.jsx";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [currentCourse, setCurrentCourse] = useState(null);

  return (
    <ThemeProvider defaultTheme="light">
      <AnimatePresence mode="wait">
        {currentPage === "landing" && (
          <LandingPage
            key="landing"
            onGetStarted={() => setCurrentPage("course-builder")}
            onLogin={() => setCurrentPage("login")}
            onSignup={() => setCurrentPage("signup")}
          />
        )}
        
        {currentPage === "login" && (
          <LoginPage
            key="login"
            onBack={() => setCurrentPage("landing")}
            onLogin={() => setCurrentPage("dashboard")}
            onSignup={() => setCurrentPage("signup")}
            onPasswordReset={() => setCurrentPage("password-reset")}
          />
        )}
        
        {currentPage === "signup" && (
          <SignupPage
            key="signup"
            onBack={() => setCurrentPage("landing")}
            onSignup={() => setCurrentPage("dashboard")}
            onLogin={() => setCurrentPage("login")}
          />
        )}

        {currentPage === "password-reset" && (
          <PasswordResetPage
            key="password-reset"
            onBack={() => setCurrentPage("login")}
            onReset={() => setCurrentPage("login")}
          />
        )}
        
        {currentPage === "dashboard" && (
          <DashboardPage
            key="dashboard"
            onLogout={() => setCurrentPage("landing")}
            onProfile={() => setCurrentPage("user-profile")}
            onCourseBuilder={() => setCurrentPage("course-builder")}
            onCourseSelect={(course) => {
              setCurrentCourse(course);
              setCurrentPage("course-outline");
            }}
            onProgress={() => setCurrentPage("progress-tracking")}
            onCertificates={() => setCurrentPage("my-certificates")}
          />
        )}
        
        {currentPage === "course-builder" && (
          <CourseBuilderPage
            key="course-builder"
            onBack={() => setCurrentPage("dashboard")}
            onLogout={() => setCurrentPage("landing")}
            onCourseCreated={(course) => {
              setCurrentCourse(course);
              setCurrentPage("course-outline");
            }}
          />
        )}

        {currentPage === "user-profile" && (
          <UserProfilePage
            key="user-profile"
            onBack={() => setCurrentPage("dashboard")}
            onLogout={() => setCurrentPage("landing")}
          />
        )}

        {currentPage === "course-outline" && (
          <CourseOutlinePage
            key="course-outline"
            course={currentCourse}
            onBack={() => setCurrentPage("dashboard")}
            onLogout={() => setCurrentPage("landing")}
            onLessonSelect={(lesson) => setCurrentPage("lesson-content")}
            onQuiz={() => setCurrentPage("quiz")}
            onAssignment={() => setCurrentPage("assignments")}
            onExport={() => setCurrentPage("export-share")}
          />
        )}

        {currentPage === "lesson-content" && (
          <LessonContentPage
            key="lesson-content"
            onBack={() => setCurrentPage("course-outline")}
            onLogout={() => setCurrentPage("landing")}
            onNext={() => setCurrentPage("quiz")}
          />
        )}

        {currentPage === "quiz" && (
          <QuizPage
            key="quiz"
            onBack={() => setCurrentPage("course-outline")}
            onLogout={() => setCurrentPage("landing")}
            onSubmit={() => setCurrentPage("course-outline")}
          />
        )}

        {currentPage === "assignments" && (
          <AssignmentsPage
            key="assignments"
            onBack={() => setCurrentPage("course-outline")}
            onLogout={() => setCurrentPage("landing")}
            onSubmit={() => setCurrentPage("course-outline")}
          />
        )}

        {currentPage === "export-share" && (
          <ExportSharePage
            key="export-share"
            course={currentCourse}
            onBack={() => setCurrentPage("course-outline")}
            onLogout={() => setCurrentPage("landing")}
          />
        )}

        {currentPage === "progress-tracking" && (
          <ProgressTrackingPage
            key="progress-tracking"
            onBack={() => setCurrentPage("dashboard")}
            onLogout={() => setCurrentPage("landing")}
            onCertificate={() => setCurrentPage("certificate")}
          />
        )}

        {currentPage === "certificate" && (
          <CertificatePage
            key="certificate"
            onBack={() => setCurrentPage("progress-tracking")}
            onLogout={() => setCurrentPage("landing")}
            onMyCertificates={() => setCurrentPage("my-certificates")}
          />
        )}

        {currentPage === "my-certificates" && (
          <MyCertificatesPage
            key="my-certificates"
            onBack={() => setCurrentPage("dashboard")}
            onLogout={() => setCurrentPage("landing")}
            onViewCertificate={() => setCurrentPage("certificate")}
          />
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}