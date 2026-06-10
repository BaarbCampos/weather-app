"use client";

import { useState } from "react";

export default function SearchBar({
  onSearch,
  isLoading = false,
}: {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input.trim()) return;

    onSearch(input.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search city..."
        className="flex-1 bg-[#1E224F] px-4 py-3 rounded-xl text-white"
      />

      <button
        disabled={isLoading}
        className="bg-blue-600 px-4 py-3 rounded-xl"
      >
        {isLoading ? "..." : "Search"}
      </button>
    </form>
  );
}