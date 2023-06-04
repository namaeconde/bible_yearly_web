import { Nunito } from 'next/font/google'
import { ReadingTodayType } from "@/pages/api/reading";
import ReadingToday from "./components/ReadingToday";
import useSWR from "swr";
import UserProfile from "@/pages/components/UserProfile";

const nunito = Nunito({
  weight: '400',
  subsets: ['latin'],
});

export function Loading() {
    return (
        <div role="status" className="max-w-sm m-auto animate-pulse">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"/>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"/>
            </span>
        </div>
    )
}

export const fetcher = (...args: any) => fetch(args).then(res => res.json())

export function useReadingToday() {
    const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const nowStr = new Date().toLocaleString("en-US", { timeZone: clientTimezone, dateStyle: "full" })
    const { data, error, isLoading } = useSWR<ReadingTodayType>(`/api/reading?date=${nowStr}`, fetcher)

    return {
        readingToday: data,
        isReadingLoading: isLoading,
        isError: error
    }
}

export default function Home() {
  const { isReadingLoading, readingToday } = useReadingToday()

  return (
      <main
          className={`grid grid-cols-1 gap-1 flex py-24 min-h-screen ${nunito.className}`}
      >
        { <UserProfile />}
        { isReadingLoading ? <Loading /> : <ReadingToday readingToday={readingToday as ReadingTodayType} /> }
      </main>
  )
}
