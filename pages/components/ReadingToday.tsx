import { ReadingTodayType } from "@/pages/api/reading";

const VERSION = "NCV";

export default function ReadingToday({ readingToday }: { readingToday: ReadingTodayType }) {
    return (
        readingToday && <div
            className="grid m-auto text-center place-items-center py-4
            before:rounded-full before:bg-gradient-radial
            before:blur-2xl before:content-[''] after:absolute after:-z-20
            after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic
            after:from-sky-200 after:via-blue-200 after:blur-2xl
            after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent
            before:dark:to-blue-700/10 after:dark:from-sky-900
            after:dark:via-[#0141ff]/40">
            <h2 className={`mb-3 text-xl font-bold opacity-90`}>
                Here&apos;s your reading for today
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
            <div className="grid grid-cols-2 m-2">
                <div className="group relative flex justify-center">
                    <a href={`https://www.biblegateway.com/passage/?search=${readingToday["Old Testament"]},${readingToday["New Testament"]}&version=${VERSION}`}
                       className="group rounded-lg border border-transparent p-2 m-2
               transition-colors border-gray-300 bg-gray-100
               dark:border-neutral-700 dark:bg-neutral-800/30"
                       target="_blank"
                       rel="noopener noreferrer"
                       title="Go to scripture reading">
                        <svg className="animate-bounce w-6 h-6 opacity-70" fill="none" strokeLinecap="round"
                             strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                        </svg>
                    </a>
                    <span className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white
                    group-hover:scale-100">Go to scripture</span>
                </div>
                <div className="group relative flex justify-center">
                    <a className="group rounded-lg border border-transparent p-2 m-2
               transition-colors border-gray-300 bg-gray-100
               dark:border-neutral-700 dark:bg-neutral-800/30"
                       title="Mark as done">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                        </svg>
                    </a>
                    <span className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white
                    group-hover:scale-100">Mark as done</span>
                </div>
            </div>
        </div>
    )
}