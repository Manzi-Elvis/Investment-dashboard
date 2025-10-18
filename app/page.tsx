import { Dashboard } from "@/components/dashboard"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { LoadingAnimation } from "@/components/loading-animation"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Suspense fallback={<LoadingAnimation />}>
            <Dashboard />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
