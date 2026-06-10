"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }: any) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input);
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md">
      <div className="relative flex-1">
        {/* Ícone de lupa opcional estilizado */}
        <input
          type="text"
          placeholder="Search location..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-[#1E224F] text-white placeholder-gray-400 pl-4 pr-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm border border-transparent focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-3 rounded-xl transition-colors text-sm shadow-md"
      >
        Search
      </button>
    </form>
  );
}