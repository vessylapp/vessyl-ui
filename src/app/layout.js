import { Inter } from "next/font/google";
import "./globals.css";
import * as React from "react";
import Providers from "@/app/providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Vessyl",
    description: "It's all about Docker.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={"dark bg-dark"}>
        <body className={inter.className}>
        <Providers>
        <div>
            {children}
        </div>
        </Providers>
        </body>
        </html>
    );
}
