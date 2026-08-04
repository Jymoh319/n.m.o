import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Award, Lock } from "lucide-react";

import API from "./api";
import GlassButton from "./ui/GlassButton";
import Logo from "./ui/Logo";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            const response = await fetch(`${API}/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email.trim()
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    data.description ||
                    "Unable to send reset email."
                );
            }

            setSuccess(
                "A password reset link has been sent to your email."
            );

            setTimeout(() => {
                navigate("/reset-password");
            }, 2000);

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

                            <h1 className="text-2xl font-extrabold text-white">
                                NMO
                            </h1>

                            <p className="text-sm mt-1 text-[#7C8CA3]">
                                Mining Certificate Management
                            </p>

                        </div>

                    </div>

                </div>

                <div className="px-8 py-8">

                    <h2 className="text-3xl font-bold text-white mb-2">
                        Forgot Password?
                    </h2>

                    <p className="text-[#7C8CA3] mb-6">
                        Enter your account email below and we'll send you a password reset link.
                    </p>

                    {error && (
                        <div className="mb-5 rounded-2xl border border-[rgba(229,57,53,0.4)] bg-[rgba(229,57,53,0.12)] text-[#FF8A80] px-4 py-3 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-5 rounded-2xl border border-[rgba(46,204,113,0.4)] bg-[rgba(46,204,113,0.12)] text-[#58E68C] px-4 py-3 text-sm">
                            {success}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block mb-2 text-sm font-semibold text-[#B9C6D6]">
                                Email
                            </label>

                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="example@email.com"
                                className="input w-full"
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-gold w-full text-[17px]"
                        >
                            {loading
                                ? "Sending..."
                                : "Send Reset Link"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="w-full text-[#FDB813] font-semibold hover:underline"
                        >
                            ← Back to Sign In
                        </button>

                    </form>

                </div>

                <div className="border-t border-[rgba(255,255,255,0.08)] px-8 py-5 flex items-center justify-center gap-6 text-sm text-[#7C8CA3]">

                    <span className="flex items-center gap-1.5">
                        <ShieldCheck
                            size={15}
                            className="text-[#2ECC71]"
                        />
                        Secure
                    </span>

                    <span className="flex items-center gap-1.5">
                        <Award
                            size={15}
                            className="text-[#FDB813]"
                        />
                        Verified
                    </span>

                    <span className="flex items-center gap-1.5">
                        <Lock
                            size={15}
                            className="text-[#2196F3]"
                        />
                        Encrypted
                    </span>

                </div>

                <div className="border-t border-[rgba(255,255,255,0.08)] px-8 py-4 text-center text-sm text-[#7C8CA3]">

                    © {new Date().getFullYear()} N.M.O

                </div>

            </div>

        </div>
    );
}