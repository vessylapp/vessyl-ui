"use client";
import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLogged, setIsLogged] = useState(false)
  const router = useRouter();

  useEffect(async () => {
    const apiStatus = await fetch("/api/status");
    const apiStatusData = await apiStatus.json();
    if(apiStatusData.setup === false) {
      return router.push("/register");
    }
    const token = localStorage.getItem("token")
    if (token) {
      setIsLogged(true);
      router.push("/dashboard");
    }
  }, [])

  return (
    <>
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">Welcome to Vessyl</h1>
        <p className="mt-3 text-2xl">Manage your Docker environment with ease.</p>
      </div>
    </div>
    </>
  );
}