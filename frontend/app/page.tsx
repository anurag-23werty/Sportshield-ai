"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [official, setOfficial] = useState<File | null>(null);
  const [scan, setScan] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const registerOfficial = async () => {
    if (!official) return;

    const formData = new FormData();
    formData.append("file", official);

    await axios.post(
      "https://sportshield-ai-m8aa.onrender.com/register",
      formData
    );
  };

  const analyze = async () => {
    if (!scan || !official) {
      alert("Upload both images first");
      return;
    }

    setLoading(true);

    await registerOfficial();

    const formData = new FormData();
    formData.append("file", scan);

    const res = await axios.post(
      "https://sportshield-ai-m8aa.onrender.com/scan",
      formData
    );

    setResult(res.data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-10">
      <h1 className="text-5xl font-bold mb-3">
        SportShield AI
      </h1>

      <p className="text-gray-400 mb-10">
        Protecting Digital Sports Media
      </p>

      <div className="w-full max-w-xl space-y-6">
        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="mb-2 font-semibold">
            Upload Official Asset
          </p>

          <input
            type="file"
            onChange={(e) =>
              setOfficial(e.target.files?.[0] || null)
            }
          />
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="mb-2 font-semibold">
            Upload Suspicious Asset
          </p>

          <input
            type="file"
            onChange={(e) =>
              setScan(e.target.files?.[0] || null)
            }
          />
        </div>

        <button
          onClick={analyze}
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-2xl p-4 font-bold transition"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <div className="bg-zinc-900 p-6 rounded-2xl space-y-3">
            <h2 className="text-2xl font-bold">
              Detection Report
            </h2>

            <p>
              Final Score: <b>{result.final_score}</b>
            </p>

            <p>
              Risk:{" "}
              <span className="text-red-400 font-bold">
                {result.risk}
              </span>
            </p>

            <p>
              Match Found:{" "}
              <b>
                {result.match_found ? "YES" : "NO"}
              </b>
            </p>

            <p>Hash Score: {result.hash_score}</p>
            <p>Histogram Score: {result.histogram_score}</p>
            <p>Tamper Score: {result.tamper_score}</p>

            <div className="mt-6 border-t border-zinc-700 pt-4">
              <p className="font-semibold text-blue-400 mb-2">
                Gemini AI Analysis
              </p>

              <p className="text-gray-300 leading-7">
                {result.ai_explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}