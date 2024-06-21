"use client";

import clsx from "clsx";
import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("Enter text to Summarize");
  const [isLoading, setIsLoading] = useState(false);

  const summaryApi = () => {
    if (text === "") {
      setError("Please enter text first");
      return;
    }
    setIsLoading(true);
    axios
      .post(
        "https://shahzaib201-ai-semester-project.hf.space/summarize_text",
        {
          text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => setSummary(response.data.summary))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="p-10 flex flex-col items-center gap-y-10">
      {/* Input fields */}
      <div className="flex items-center justify-center gap-5">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-[500px]"
          disabled={isLoading}
          placeholder="Enter a paragraph to summarize..."
        />
        <Button
          onClick={summaryApi}
          variant="outline"
          className={clsx({
            "cursor-not-allowed opacity-70": isLoading,
          })}
        >
          {isLoading ? "Loading" : "Submit"}
        </Button>
      </div>

      {/* Summary */}
      {isLoading ? (
        <ClipLoader color="white" />
      ) : (
        <div className="bg-zinc-800 rounded-lg py-3 px-4">
          <h1 className="text-2xl font-bold text-white mb-5">Summary:</h1>
          {error ? (
            <p className="text-rose-400">{error}</p>
          ) : (
            <p className="text-white">{summary}</p>
          )}
        </div>
      )}
    </div>
  );
}
