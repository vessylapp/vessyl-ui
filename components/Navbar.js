"use client";
import Link from 'next/link'
import {useState, useEffect} from "react";

export default function Navbar() {
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null && token !== undefined) {
            setIsLogged(true)
        }
    }, [])

    return (
        <nav className="w-full flex items-center justify-between p-6 bg-white text-black z-50">
            <div className="text-2xl">
                <Link href="/" className="hover:text-yellow-500 transition-all duration-300">
                    Vessyl
                </Link>
            </div>
            <div className="flex space-x-4">
                {!isLogged && (
                    <Link href="/login" className="hover:text-yellow-500 transition-all duration-300">
                        Login
                    </Link>
                )}
                {isLogged && (
                    <Link href="/settings" className="hover:text-yellow-500 transition-all duration-300">
                        Settings
                    </Link>
                )}
            </div>
        </nav>
    )
}