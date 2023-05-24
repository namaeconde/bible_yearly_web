import { Roboto_Mono } from 'next/font/google'
import { ReadingTodayType } from "@/pages/api/reading/today";
import ReadingToday from "./components/ReadingToday";
import useSWR from "swr";

const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
});

export function Loading() {
    return (
        <div role="status" className="max-w-sm m-auto animate-pulse">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
        </div>
    )
}

export const fetcher = (...args: RequestInfo) => fetch(args).then(res => res.json())

export function useReadingToday() {
    const { data, error, isLoading } = useSWR<ReadingTodayType>('/api/reading/today', fetcher)

    return {
        readingToday: data,
        isLoading,
        isError: error
    }
}

export default function Home() {
  const { isLoading, readingToday } = useReadingToday()

  return (
      <main
          className={`flex min-h-screen py-24 ${robotoMono.className}`}
      >
        { isLoading ?
          <Loading /> :
          <ReadingToday readingToday={readingToday} />
        }
      </main>
  )
}
