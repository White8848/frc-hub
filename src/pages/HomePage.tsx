import HeroSection from '../components/sections/HeroSection'
import CompetitionHighlights from '../components/sections/CompetitionHighlights'
import FeaturedNews from '../components/sections/FeaturedNews'
import StatsShowcase from '../components/sections/StatsShowcase'
import CTASection from '../components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CompetitionHighlights />
      <StatsShowcase />
      <FeaturedNews />
      <CTASection />
    </>
  )
}
