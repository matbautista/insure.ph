"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { withFilterParam } from "@/lib/with-filter-param";

export function SearchFilter({ value }: { value: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [text, setText] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Keep in sync when navigation changes the URL from elsewhere (e.g. back
  // button), without the cascading-render issue useEffect+setState has here.
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setText(value);
  }

  function handleChange(next: string) {
    setText(next);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      router.push(withFilterParam(searchParams.toString(), "q", next.trim()));
    }, 400);
  }

  return (
    <input
      id="search-filter"
      type="text"
      value={text}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Search name, email, phone, remarks…"
      className="w-64 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
    />
  );
}
