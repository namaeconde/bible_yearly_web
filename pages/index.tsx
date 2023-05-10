import { Roboto_Mono } from 'next/font/google'
import { useEffect, useState } from "react";
import { ReadingTodayType } from "@/pages/api/reading/today";


const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  const [readingToday, setReadingToday] = useState({})<ReadingTodayType>;


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
            TODAY'S READING
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
        </div>
      </main>
  )
}