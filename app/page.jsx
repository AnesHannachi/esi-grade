import Header from "@/components/Header"
import WelcomeCard from "@/components/WelcomeCard"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800 font-sans">
      <Header />
      <WelcomeCard />
    </div>
  )
}
