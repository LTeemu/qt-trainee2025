import React, { EventHandler, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Login({}: Props) {
  const [username, setUsername] = useState("dummyuser");
  const [password, setPassword] = useState("dummypass");
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Dummy login logic
    if (username === "dummyuser" && password === "dummypass") {
      localStorage.setItem("logged_user", username);
      navigate("/dashboard");
    } else {
      localStorage.removeItem("logged_user");
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-[100dvh] grid place-content-center">
      <form onSubmit={handleLogin} className="grid gap-y-2">
        <input
          type="text"
          placeholder="Username (dummyuser)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 rounded-sm py-1 px-2"
        />

        <input
          type="password"
          placeholder="Password (dummypass)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 rounded-sm py-1 px-2"
        />

        <button
          type="submit"
          className="border-2 mt-2 bg-slate-600 text-white font-semibold p-1.5"
        >
          Login
        </button>
      </form>
    </div>
  );
}
