"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummary = async () => {
    try {
      const response = await axios.post("/api/summary", { text });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("An error occurred while summarizing the text", error);
    }
  };

  return (
    <div className="p-10 flex flex-col items-center gap-y-10">
      {/* Input fields */}
      <div className="flex items-center justify-center">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-[500px] rounded-r-none"
          placeholder="Enter a paragraph to summarize..."
        />
        <Button
          onClick={handleSummary}
          variant="outline"
          className="rounded-l-none"
        >
          Submit
        </Button>
      </div>

      {/* Summary */}
      {summary && (
        <div className="bg-zinc-800 rounded-lg py-3 px-4">
          <h1 className="text-2xl font-bold text-white mb-5">Summary:</h1>
          <p className="text-white">{summary}</p>
        </div>
      )}
    </div>
  );
}
