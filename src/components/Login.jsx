import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, Award, Lock } from "lucide-react";
import API from "./api";
import GlassButton from "./ui/GlassButton";
import Logo from "./ui/Logo";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isLogin = searchParams.get("mode") !== "signup";

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
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
       throw new Error(
         data.message ||
         data.description ||
         "Login failed."
       );
     }

     localStorage.setItem(
       "token",
       data.access_token
     );

     localStorage.setItem(
       "user",
       JSON.stringify(data.user)
     );

     switch (data.user.role) {
       case "admin":
       case "manager":
       case "inspector":
       case "worker":
         navigate("/dashboard");
         break;

       default:
         navigate("/");
     }
 
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

    if (!registerData.username || !registerData.email || !registerData.password || !registerData.confirmPassword) {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: registerData.username.trim(), email: registerData.email.trim(), password: registerData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.description || "Registration failed.");
      }

      setSuccess("Account created successfully. Please sign in.");
      setRegisterData({ username: "", email: "", password: "", confirmPassword: "" });
      navigate("/login?mode=signin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="mining-bg" />

      <div className="w-full max-w-md rounded-[36px] panel-strong border border-[rgba(255,255,255,0.12)] overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between px-8 pt-8">
          <div className="flex items-center gap-5">
            <Logo />
            <div>
              <h1 className="text-2xl font-extrabold text-white">NMO</h1>
              <p className="text-sm mt-1 text-[#7C8CA3]">Mining Certificate Management</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex mx-8 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-white/[0.04] p-1">
          <button
            type="button"
            onClick={() => navigate("/login?mode=signin")}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${isLogin ? "btn btn-gold" : "text-[#7C8CA3] hover:text-white"}`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => navigate("/login?mode=signup")}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${!isLogin ? "btn btn-purple" : "text-[#7C8CA3] hover:text-white"}`}
          >
            Create Account
          </button>
        </div>

        <div className="px-8 py-8">
          {error && (
            <div className="mb-5 rounded-2xl border border-[rgba(229,57,53,0.4)] bg-[rgba(229,57,53,0.12)] text-[#FF8A80] px-4 py-3 text-sm animate-fade-in">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-2xl border border-[rgba(46,204,113,0.4)] bg-[rgba(46,204,113,0.12)] text-[#58E68C] px-4 py-3 text-sm animate-fade-in">
              {success}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <button
                type="button"
                onClick={() =>
                  window.location.href =
                    `${API}/api/auth/google`
                }
                className="btn btn-blue w-full mt-4"
              >
                Continue with Google
              </button>
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#B9C6D6]">Email</label>
                <input type="email" name="email" required value={loginData.email} onChange={handleLoginChange} placeholder="example@email.com" className="input w-full" />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-[#B9C6D6]">Password</label>
                <div className="relative">
                  <input type={showLoginPassword ? "text" : "password"} name="password" required value={loginData.password} onChange={handleLoginChange} placeholder="Enter password" className="input w-full pr-12" />
                  <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7C8CA3]">
                    {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-[#FDB813] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button type="submit" disabled={loading} className="btn btn-gold w-full text-[17px] disabled:opacity-50">
                {loading ? "Signing In..." : "Sign In"}
              </button>
              <p className="text-center text-sm text-[#7C8CA3]">
                Don't have an account?{" "}
                <button type="button" onClick={() => navigate("/login?mode=signup")} className="font-bold text-[#8B5CF6]">
                  Request Access!
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <button
                type="button"
                onClick={() =>
                  window.location.href =
                    `${API}/api/auth/google`
                }
                className="btn btn-blue w-full mt-4"
              >
                Continue with Google
              </button>
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#B9C6D6]">Username</label>
                <input type="text" name="username" required value={registerData.username} onChange={handleRegisterChange} placeholder="Enter username" className="input w-full" />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-[#B9C6D6]">Email</label>
                <input type="email" name="email" required value={registerData.email} onChange={handleRegisterChange} placeholder="example@email.com" className="input w-full" />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-[#B9C6D6]">Password</label>
                <div className="relative">
                  <input type={showRegisterPassword ? "text" : "password"} name="password" required value={registerData.password} onChange={handleRegisterChange} placeholder="Create password" className="input w-full pr-12" />
                  <button type="button" onClick={() => setShowRegisterPassword(!showRegisterPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7C8CA3]">
                    {showRegisterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-[#B9C6D6]">Confirm Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required value={registerData.confirmPassword} onChange={handleRegisterChange} placeholder="Confirm password" className="input w-full pr-12" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7C8CA3]">
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-purple w-full text-[17px] disabled:opacity-60">
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-[#7C8CA3]">
                Already have an account?{" "}
                <button type="button" onClick={() => navigate("/login?mode=signin")} className="font-bold text-[#FDB813]">
                  Sign In
                </button>
              </p>
            </form>
          )}
        </div>

        <div className="border-t border-[rgba(255,255,255,0.08)] px-8 py-5 flex items-center justify-center gap-6 text-sm text-[#7C8CA3]">
          <span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#2ECC71]" /> Secure</span>
          <span className="flex items-center gap-1.5"><Award size={15} className="text-[#FDB813]" /> Verified</span>
          <span className="flex items-center gap-1.5"><Lock size={15} className="text-[#2196F3]" /> Encrypted</span>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.08)] px-8 py-4 text-center text-sm text-[#7C8CA3]">
          © {new Date().getFullYear()} N.M.O
        </div>
      </div>
    </div>
  );
}
