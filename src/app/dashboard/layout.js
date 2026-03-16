"use client"
import "../globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/sb/Sidebar";

export default function RootLayout({ children }) {
    return (
        <ProtectedRoute>
            <div className="app-shell">
                <Sidebar />
                <main className="page-shell">{children}</main>
            </div>
        </ProtectedRoute>
    );
}
