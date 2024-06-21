"use client";
import Link from "next/link";

export default function Resource({ resource }) {

  return (
    <div
      className={`p-4 rounded-lg shadow-md text-black ${
        resource.container.running ? "border-green-500 border-4" : "border-red-500 border-4"
      }`}
    >
        <Link href={`/resource/${resource.name}`}>
            <h1 className="text-2xl font-bold">{resource.name}</h1>
            <p className="text-sm">{resource.git_url} - {resource.type}</p>
        </Link>
    </div>
  );
}