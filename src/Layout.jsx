import { Outlet } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ConsultationModal from './components/ConsultationModal.jsx'
import { ConsultationModalProvider } from './contexts/ConsultationModalContext.jsx'

export default function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <ConsultationModalProvider>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">
          <Outlet />
        </main>
        <Footer />
        <ConsultationModal />
      </ConsultationModalProvider>
    </MotionConfig>
  )
}
