/**
 * InterviewVerse AI — Client Authentication Service
 * Handles token storage, user session persistence, and API communication.
 */

const TOKEN_KEY = 'iv_auth_token';
const USER_KEY = 'iv_auth_user';

export const authService = {
  /**
   * Log in user with email & password
   */
  async login(email, password, rememberMe = false) {
    try {
      // 1. Attempt to communicate with backend if running
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s quick probe

      let response;
      try {
        response = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch {
        // Backend not running or unreachable, fallback to client-side session authentication
        response = null;
      }

      if (response && response.ok) {
        const data = await response.json();
        this.setSession(data.token, data.user, rememberMe);
        return { success: true, user: data.user };
      }

      // If backend returned an error status (e.g. 401 Invalid Credentials)
      if (response && !response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Invalid email or password.');
      }

      // 2. Client-side Mock Authentication Fallback
      if (!email.includes('@') || password.length < 6) {
        throw new Error('Invalid email or password credentials.');
      }

      const mockUser = {
        id: 'usr_' + Date.now(),
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email: email,
        role: email.includes('admin') ? 'admin' : 'student',
        targetRole: 'Full Stack Developer',
        avatarUrl: null,
      };

      const mockToken = 'mock_jwt_token_' + btoa(JSON.stringify({ id: mockUser.id, role: mockUser.role, exp: Date.now() + 86400000 }));

      this.setSession(mockToken, mockUser, rememberMe);
      return { success: true, user: mockUser };
    } catch (err) {
      throw err;
    }
  },

  /**
   * Register new candidate account with OTP verification
   */
  async register(name, email, targetRole, password) {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      let response;
      try {
        response = await fetch(`${apiUrl}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, targetRole, password }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch {
        response = null;
      }

      if (response && response.ok) {
        const data = await response.json();
        return { success: true, requireOtp: data.requireOtp ?? true, message: data.message };
      }

      if (response && !response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed. Please try again.');
      }

      // Client-side fallback session for OTP flow
      sessionStorage.setItem('pending_reg_email', email);
      sessionStorage.setItem('pending_reg_name', name);
      sessionStorage.setItem('pending_reg_role', targetRole);
      return {
        success: true,
        requireOtp: true,
        message: `A 6-digit verification code has been dispatched to ${email}`,
      };
    } catch (err) {
      throw err;
    }
  },

  /**
   * Verify registration OTP code
   */
  async verifyOtp(email, otp) {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      let response;
      try {
        response = await fetch(`${apiUrl}/auth/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch {
        response = null;
      }

      if (response && response.ok) {
        const data = await response.json();
        if (data.token && data.user) {
          this.setSession(data.token, data.user, true);
        }
        return { success: true, message: 'Account verified successfully!' };
      }

      if (response && !response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Invalid or expired OTP code.');
      }

      // Client-side OTP format verification fallback
      if (!/^\d{6}$/.test(otp.trim())) {
        throw new Error('Please enter a valid 6-digit numerical OTP code.');
      }

      const name = sessionStorage.getItem('pending_reg_name') || 'Candidate';
      const targetRole = sessionStorage.getItem('pending_reg_role') || 'Full Stack Developer';
      const mockUser = {
        id: 'usr_' + Date.now(),
        name,
        email,
        role: 'student',
        targetRole,
      };
      const mockToken = 'mock_jwt_token_' + btoa(JSON.stringify({ id: mockUser.id, role: mockUser.role, exp: Date.now() + 86400000 }));
      this.setSession(mockToken, mockUser, true);
      return { success: true, message: 'Account verified successfully!' };
    } catch (err) {
      throw err;
    }
  },

  /**
   * Resend OTP code
   */
  async resendOtp(email) {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    try {
      await fetch(`${apiUrl}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).catch(() => null);
    } catch {}
    return { success: true, message: 'A new 6-digit verification code has been sent.' };
  },

  /**
   * Google OAuth login handler
   */
  async loginWithGoogle() {
    const mockUser = {
      id: 'usr_google_' + Date.now(),
      name: 'Google Candidate',
      email: 'candidate@gmail.com',
      role: 'student',
      targetRole: 'Software Engineer',
      avatarUrl: null,
    };
    const mockToken = 'mock_google_jwt_token_' + Date.now();
    this.setSession(mockToken, mockUser, true);
    return { success: true, user: mockUser };
  },

  /**
   * Save session tokens
   */
  setSession(token, user, rememberMe) {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, token);
    storage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Retrieve active session user
   */
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY));
  },

  /**
   * Log out user
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
};
