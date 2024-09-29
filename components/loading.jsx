import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
      <p className="mt-2 text-sm text-gray-500">
        Please wait while we fetch the data.
      </p>
    </div>
  );
}
