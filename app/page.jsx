import Header from "@/components/Header"
import WelcomeCard from "@/components/WelcomeCard"

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header title="Accueil" />
      <WelcomeCard />
    </div>
  )
}
