"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Container({ container }) {
  const [containerIsRunning, setContainerIsRunning] = useState(false);

  useEffect(() => {
    if (container.running === true) {
      setContainerIsRunning(true);
    }
  }, []);

  return (
    <div
      className={`p-4 rounded-lg shadow-md text-black ${
        containerIsRunning ? "border-green-500 border-4" : "border-red-500 border-4"
      }`}
    >
    <Link href={`/container/${container.name}`}>
      <h1 className="text-2xl font-bold">{container.name}</h1>
      <p className="text-lg">{container.image}</p>
      <p className="text-lg">{container.running}</p>
    </Link>
    </div>
  );
}