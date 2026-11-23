import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public & Landing Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Student routes — to be added with StudentDashboard */}
        {/* <Route path="/dashboard/*" element={<StudentDashboard />} /> */}

        {/* Admin routes — to be added with AdminDashboard */}
        {/* <Route path="/admin/*" element={<AdminDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
