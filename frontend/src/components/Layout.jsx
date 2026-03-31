import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import AgeGate from './AgeGate'

export default function Layout() {
  return (
    <div className="ambient-app">
      {/* Age Verification Gate */}
      <AgeGate />

      {/* Ambient Animated Mesh Background Elements */}
      <div className="ambient-blur"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Floating Pill Navigation */}
      <Header />

      <main className="glass-main-content">
        <Outlet />
      </main>

      {/* Glass Footer */}
      <Footer />
    </div>
  )
}
