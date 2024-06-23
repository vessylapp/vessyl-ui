"use client"
import { Inter } from "next/font/google";
import "../globals.css";
import * as React from "react";
import Providers from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={"dark bg-dark"}>
        <body className={inter.className}>
        <Providers>
            <div style={{display: 'flex'}}>
                {children}
            </div>
        </Providers>
        </body>
        </html>
    );
}
