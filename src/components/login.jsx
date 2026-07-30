import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      onLogin("admin");
    } else if (username === "user" && password === "user123") {
      onLogin("user");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-emerald-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-emerald-100"
      >
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Nairobi Mining Operations
        </h2>

        <p className="text-center text-slate-500 mb-6">
          Sign in to continue
        </p>

        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}