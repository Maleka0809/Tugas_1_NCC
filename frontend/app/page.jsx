import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Programs from '../components/Programs'
import HowItWorks from '../components/HowItWorks'
import { CTA, Footer } from '../components/CtaFooter'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Programs />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
