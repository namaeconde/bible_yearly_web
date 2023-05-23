import { Roboto_Mono } from 'next/font/google'
import { useEffect, useState } from "react";
import { ReadingTodayType } from "@/pages/api/reading/today";


const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
});
const VERSION = "NCV";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [readingToday, setReadingToday] = useState<ReadingTodayType>({
    Date: "",
    "Old Testament": "",
    "New Testament": ""
  });

  useEffect(() => {
    setLoading(true);
    fetch('/api/reading/today')
        .then((res) => res.json())
        .then((data) => {
          setReadingToday(data);
          setLoading(false);
        })
  }, []);

  return (
      <main
          className={`flex min-h-screen py-24 ${robotoMono.className}`}
      >
        { isLoading ?
          <div role="status" className="max-w-sm m-auto animate-pulse">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div> :
          <div
            className="grid m-auto text-center place-items-center
            before:rounded-full before:bg-gradient-radial
            before:blur-2xl before:content-[''] after:absolute after:-z-20
            after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic
            after:from-sky-200 after:via-blue-200 after:blur-2xl
            after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent
            before:dark:to-blue-700/10 after:dark:from-sky-900
            after:dark:via-[#0141ff]/40">
            <h2 className={`mb-3 text-2xl font-bold opacity-70`}>
              TODAY&apos;S READING
            </h2>
            <p className={`text-sm opacity-70`}>
              Date: {readingToday["Date"]}
            </p>
            <p className={`text-sm opacity-70`}>
              Old Testament: {readingToday["Old Testament"]}
            </p>
            <p className={`text-sm opacity-70`}>
              New Testament: {readingToday["New Testament"]}
            </p>
            <a href={`https://www.biblegateway.com/passage/?search=${readingToday["Old Testament"]},${readingToday["New Testament"]}&version=${VERSION}`}
              className="group rounded-lg border border-transparent p-2 m-2
               transition-colors border-gray-300 bg-gray-100
               dark:border-neutral-700 dark:bg-neutral-800/30"
              target="_self"
              rel="noopener noreferrer">
              <svg className="animate-bounce w-6 h-6 text-gray-900" fill="none" stroke-linecap="round"
                 stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </div>
        }
      </main>
  )
}
