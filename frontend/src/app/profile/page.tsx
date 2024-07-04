"use client";

import React, { useState } from "react";
import { TextField, Button, Typography, Box, Avatar } from "@mui/material";
import { useUser } from "../../contexts/UserContext";

export default function Profile() {
  const { user, updateUser } = useUser();
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({ email, bio });
      // Show success message
    } catch (error) {
      console.error("Error updating profile:", error);
      // Show error message
    }
  };

  if (!user)
    return <Typography>Please log in to view your profile.</Typography>;

  return (
    <div className="grid grid-cols-12 min-h-[500px] overflow-hidden">
      <div className="col-span-12 p-2 md:col-span-6 overflow-hidden md:p-10">
        <Avatar
          src={user.profilePicture}
          alt={user.username}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <h2 className="mb-6 text-2xl font-bold font-sans uppercase">
          {user.username}'s Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <p className="my-5">
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </p>
            <p className="my-5">
              <TextField
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                multiline
                rows={10}
                className="w-full"
              />
            </p>
            <button type="submit" className="bg-gray-900 text-gray-200 py-4 px-6 uppercase transition-all duration-300 hover:bg-blue-500">
              Update Profile
            </button>
          </div>
        </form>
      </div>
      <div className="hidden md:block col-span-6 h-[700px]">
        <img
          src="/images/bg-3.webp"
          alt={user.username}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
