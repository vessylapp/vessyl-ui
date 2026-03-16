"use client"
import "../globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/sb/Sidebar";
import { ToastProvider } from "@/components/ToastProvider";

export default function RootLayout({ children }) {
    return (
        <ProtectedRoute>
            <ToastProvider>
                <div className="app-shell">
                    <Sidebar />
                    <main className="page-shell">{children}</main>
                </div>
            </ToastProvider>
        </ProtectedRoute>
    );
}
