"use client"
import { Inter } from "next/font/google";
import "../globals.css";
import * as React from "react";
import Providers from "@/app/providers";
import ProtectedRoute from "@/components/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <Providers>
            <div style={{display: 'flex'}}>
                <ProtectedRoute>
                    {children}
                </ProtectedRoute>
            </div>
        </Providers>
    );
}
