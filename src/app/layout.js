import { Inter } from "next/font/google";
import "./globals.css";
import * as React from "react";
import {NextUIProvider} from "@nextui-org/system";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Vessyl",
    description: "It's all about Docker.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={"dark"}>
        <body className={inter.className}>
        <NextUIProvider>
        <Navbar/>
        <div className={"p-6"}>
            {children}
        </div>
        </NextUIProvider>
        </body>
        </html>
    );
}
