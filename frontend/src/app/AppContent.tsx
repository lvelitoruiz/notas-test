"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useUser } from "../contexts/UserContext";
import Link from "next/link";
import ProtectedRoute from "./ProtectedRoute";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

const AppContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useUser();
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <div className="bg-gray-100 min-h-screen w-screen flex items-center justify-center">
      <div className="bg-gray-700 absolute right-0 top-0 md:w-7/12 h-4/6 z-0 w-full lg:w-5/7"></div>
      {isLoginPage ? null : (
        <Header />
      )}

      <Container
        className={`relative mx-auto p-0 bg-white min-w-72 max-w-[1200px] w-[90%] ${ !isLoginPage ? "my-[120px] min-h-[calc(100vh-240px)]" : "h-[500px]" } z-10`}
      >
        {isLoginPage ? children : <ProtectedRoute>{children}</ProtectedRoute>}
      </Container>
    </div>
  );
};

export default AppContent;
