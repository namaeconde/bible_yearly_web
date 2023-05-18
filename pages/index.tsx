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
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <span className="sr-only">Loading...</span>
          </div> :
          <div
              className="grid m-auto text-center place-items-center
              before:rounded-full before:bg-gradient-radial
              before:blur-2xl before:content-[''] after:absolute after:-z-20
              after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic
              after:from-sky-200 after:via-blue-200 after:blur-2xl
              after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent
              before:dark:to-blue-700/10 after:dark:from-sky-900
              after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
            <h2 className={`mb-3 text-2xl font-bold`}>
              TODAY&apos;S READING
            </h2>
            <p className={`text-sm`}>
              Date: {readingToday["Date"]}
            </p>
            <p className={`text-sm`}>
              Old Testament: {readingToday["Old Testament"]}
            </p>
            <p className={`text-sm`}>
              New Testament: {readingToday["New Testament"]}
            </p>
            <a
                href={`https://www.biblegateway.com/passage/?search=${readingToday["Old Testament"]},${readingToday["New Testament"]}&version=${VERSION}`}
                className="group rounded-lg border border-transparent p-2 m-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
            >
              <h2 className={`text-xl font-semibold`}>
                Go{' '}
                <span
                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
              </h2>
            </a>
          </div>
        }
      </main>
  )
}
