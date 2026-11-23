import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/public/LandingPage';

const Dashboard = lazy(() => import('../pages/student/Dashboard'));
const InterviewHistory = lazy(() => import('../pages/student/InterviewHistory'));
const MyProfile = lazy(() => import('../pages/student/MyProfile'));
const Settings = lazy(() => import('../pages/student/Settings'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const StudentLayout = lazy(() => import('../layouts/StudentLayout'));
const ModulePlaceholder = lazy(() => import('../components/dashboard/ModulePlaceholder'));

function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<StudentLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="interviews" element={<ModulePlaceholder title="AI Interviews" description="Role-based interview practice will be available when the interview module is connected." />} />
          <Route path="resume" element={<ModulePlaceholder title="Resume Analyzer" description="Resume review will be available when the resume module is connected." />} />
          <Route path="coding" element={<ModulePlaceholder title="Coding Practice" description="Coding challenges will be available when the coding module is connected." />} />
          <Route path="analytics" element={<ModulePlaceholder title="Analytics" description="Detailed performance analytics will appear when the analytics service is connected." />} />
          <Route path="history" element={<InterviewHistory />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
