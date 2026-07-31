import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import API from "./api";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { theme, toggleTheme } = useTheme();

  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const mode = searchParams.get("mode");

    if (mode === "signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }

    setError("");
    setSuccess("");
  }, [searchParams]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email.trim(),
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.description || "Login failed.");
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.user.username,
          email: data.user.email,
          role: data.user.role,
        })
      );

      navigate("/");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerData.username.trim(),
          email: registerData.email.trim(),
          password: registerData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.description ||
          "Registration failed."
        );
      }

      setSuccess(
        "Account created successfully. Please sign in."
      );

      setRegisterData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setIsLogin(true);

      navigate("/login?mode=signin");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">

        <div className="flex items-center justify-between px-8 pt-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Nairobi Mining Operations
            </h1>

            <p className="text-sm mt-2 text-slate-500 dark:text-slate-400">
              Mining Management System
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"
          >
            {theme === "dark"
              ? <Sun size={20} />
              : <Moon size={20} />}
          </button>
        </div>

        <div className="mt-8 flex mx-8 rounded-xl bg-slate-100 dark:bg-slate-800">

          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              navigate("/login?mode=signin");
            }}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              isLogin
                ? "bg-green-600 text-white"
                : "text-slate-500 dark:text-slate-300"
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              navigate("/login?mode=signup");
            }}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              !isLogin
                ? "bg-green-600 text-white"
                : "text-slate-500 dark:text-slate-300"
            }`}
          >
            Create Account
          </button>

        </div>

        <div className="px-8 py-8">

          {error && (
            <div className="mb-5 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 px-4 py-3">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-3">
              {success}
            </div>
          )}

          {isLogin ? (

            <form onSubmit={handleLogin} className="space-y-5">

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="admin@nmo.co.ke"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none"
                />
              </div>

              <div>

                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showLoginPassword ? "text" : "password"}
                    name="password"
                    required
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 pr-12 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowLoginPassword(!showLoginPassword)
                    }
                    className="absolute right-4 top-3"
                  >
                    {showLoginPassword
                      ? <EyeOff size={20} />
                      : <Eye size={20} />}
                  </button>

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-green-600 py-3 text-white font-semibold disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="text-sm text-center text-slate-500 dark:text-slate-400">

                Test Accounts

                <div className="mt-3 space-y-2">

                  <p>
                    <strong>Admin</strong><br />
                    admin@nmo.co.ke
                  </p>

                  <p>
                    <strong>Manager</strong><br />
                    manager@nmo.co.ke
                  </p>

                  <p>
                    <strong>Inspector</strong><br />
                    inspector@nmo.co.ke
                  </p>

                </div>

              </div>

            </form>

          ) : (            <form onSubmit={handleRegister} className="space-y-5">

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  required
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  placeholder="Enter username"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    name="password"
                    required
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    placeholder="Create password"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 pr-12 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterPassword(!showRegisterPassword)
                    }
                    className="absolute right-4 top-3"
                  >
                    {showRegisterPassword
                      ? <EyeOff size={20} />
                      : <Eye size={20} />}
                  </button>

                </div>

              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder="Confirm password"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 pr-12 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-3"
                  >
                    {showConfirmPassword
                      ? <EyeOff size={20} />
                      : <Eye size={20} />}
                  </button>

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-green-600 py-3 text-white font-semibold disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    navigate("/login?mode=signin");
                  }}
                  className="font-semibold text-green-600 dark:text-green-400"
                >
                  Sign In
                </button>
              </p>

            </form>

          )}

        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 px-8 py-5 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Nairobi Mining Operations
        </div>

      </div>
    </div>
  );
}