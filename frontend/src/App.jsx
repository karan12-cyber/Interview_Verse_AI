import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/public/LandingPage';

/*
 * App.jsx — Root component with client-side routing.
 *
 * Landing page route: /
 *
 * Other routes (/login, /register, /dashboard, etc.) will be added
 * by their respective developers. Add new <Route> elements below
 * the landing page route.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Authentication routes — to be added by auth developer */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        {/* Student routes — to be added by student module developer */}
        {/* <Route path="/dashboard/*" element={<StudentDashboard />} /> */}

        {/* Admin routes — to be added by admin module developer */}
        {/* <Route path="/admin/*" element={<AdminDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
