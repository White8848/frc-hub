import { lazy, Suspense, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import MobileMenu from './components/layout/MobileMenu'
import ScrollToTop from './components/ui/ScrollToTop'

const HomePage = lazy(() => import('./pages/HomePage'))
const CompetitionsPage = lazy(() => import('./pages/CompetitionsPage'))
const CompetitionDetailPage = lazy(() => import('./pages/CompetitionDetailPage'))
const PartsPage = lazy(() => import('./pages/PartsPage'))
const PartDetailPage = lazy(() => import('./pages/PartDetailPage'))
const EquipmentPage = lazy(() => import('./pages/EquipmentPage'))
const EquipmentDetailPage = lazy(() => import('./pages/EquipmentDetailPage'))
const TeamsPage = lazy(() => import('./pages/TeamsPage'))
const TeamDetailPage = lazy(() => import('./pages/TeamDetailPage'))
const NewsPage = lazy(() => import('./pages/NewsPage'))
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <main style={{ minHeight: '100vh', paddingTop: 'var(--navbar-height)' }}>
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/competitions" element={<CompetitionsPage />} />
            <Route path="/competitions/:key" element={<CompetitionDetailPage />} />
            <Route path="/parts" element={<PartsPage />} />
            <Route path="/parts/:id" element={<PartDetailPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/equipment/:id" element={<EquipmentDetailPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:number" element={<TeamDetailPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </HashRouter>
  )
}

export default App
