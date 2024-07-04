"use client";

import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUser } from "../../contexts/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="grid grid-cols-12 h-[500px]">
      <div className="hidden md:block col-span-6 bg-gray-200 h-full overflow-hidden">
        <img
          src="/images/fondito.webp"
          className="w-full h-full object-cover block"
          alt="fondo"
        />
      </div>
      <div className="col-span-6 p-12 h-full flex items-center">
        <div>
          <h2 className="text-2xl font-bold font-sans uppercase mb-6">Welcome</h2>
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2} width={300}>
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="group bg-gray-900 text-gray-200 py-4 px-6 uppercase text-left transition-all duration-300 hover:bg-blue-500">
                Login
                <FontAwesomeIcon className="ml-2 transition-all duration-300 group-hover:ml-4" icon={faArrowRight} />
              </button>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
}
