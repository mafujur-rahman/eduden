"use client";

import { useState, useEffect } from "react";
import { FiUser, FiLock, FiX } from "react-icons/fi";
import PlacementCmp from "@/components/placementCmp/PlacementCmp";

// Login Modal 
const LoginModal = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send login credentials in the request body
      const response = await fetch("https://lmsapi.eduden.io/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error("Login failed. Please try again.");
      }

      const loginData = await response.json();

      // Check token exists
      if (loginData.token) {
        // Store token and user data
        localStorage.setItem("authToken", loginData.token);
        localStorage.setItem("user", JSON.stringify({
          id: loginData.id,
          username: loginData.username,
          email: loginData.email,
          user_type: loginData.user_type
        }));

        onLogin();
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-[#111] rounded-2xl p-8 max-w-md w-full relative animate-scaleIn shadow-2xl border border-white/10">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
        >
          <FiX size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] flex items-center justify-center">
            <FiUser size={32} className="text-black" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to access career opportunities</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiUser size={20} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-black border border-white/15 text-white placeholder-gray-500 focus:border-[#fab80A] focus:ring-2 focus:ring-[#fab80A]/20 outline-none transition-all"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiLock size={20} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-black border border-white/15 text-white placeholder-gray-500 focus:border-[#fab80A] focus:ring-2 focus:ring-[#fab80A]/20 outline-none transition-all"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] text-black font-bold rounded-xl  "
          >
            {loading ? "Authenticating..." : "Login to Continue"}
          </button>
        </form>
      </div>
    </div>

  );
};

// Main Page Component
const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("user");

      if (token && user) {
        setIsAuthenticated(true);
      } else {
        setShowLoginModal(true);
      }
      setLoading(false);
    };

    checkAuth();

    // Listen for storage changes (in case user logs out from another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 mb-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01]"></div>
        </div>
        <p className="text-gray-600 animate-pulse">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return showLoginModal ? (
      <LoginModal
        onLogin={handleLoginSuccess}
        onClose={() => setShowLoginModal(false)}
      />
    ) : null;
  }

  return (
    <div>
      {/* Protected Content */}
      <div className="edn__hero__container text-center edn__lr__space pt-8">
        <h1 className="edn__title text-black mb-4">
          Career Opportunities
        </h1>
        <p className="text-lg text-gray-800 max-w-3xl mx-auto">
          Discover your next career move with our curated job listings.
          Search by role, location, or company to find the perfect match.
        </p>
      </div>

      <PlacementCmp />
    </div>
  );
};

export default Page;