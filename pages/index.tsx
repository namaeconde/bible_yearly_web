import { Roboto_Mono } from 'next/font/google'
import { useEffect, useState } from "react";
import { ReadingTodayType } from "@/pages/api/reading/today";


const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
});
const VERSION = "NCV";

export default function Home() {
  const [readingToday, setReadingToday] = useState<ReadingTodayType>({
    Date: "",
    "Old Testament": "",
    "New Testament": ""
  });

  useEffect(() => {
    fetch('/api/reading/today')
        .then((res) => res.json())
        .then((data) => {
          setReadingToday(data);
        })
  }, []);

  return (
      <main
          className={`flex min-h-screen flex-col items-center justify-between p-24 ${robotoMono.className}`}
      >
        <div className="mb-32 grid text-center place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <h2 className={`mb-3 text-2xl font-bold`}>
            TODAY&apos;S READING
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-70`}>
            Date: {readingToday["Date"]}
          </p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Old Testament: {readingToday["Old Testament"]}
          </p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
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
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
          </a>
        </div>
      </main>
  )
}
