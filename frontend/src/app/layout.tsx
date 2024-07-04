import React from "react";
import { UserProvider } from "../contexts/UserContext";
import AppContent from "./AppContent";
import { Raleway, Lato } from "next/font/google";
import "./globals.css"

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-raleway",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${raleway.variable} ${lato.variable} font-sans`}>
      <body>
        <UserProvider>
          <AppContent>{children}</AppContent>
        </UserProvider>
      </body>
    </html>
  );
}
