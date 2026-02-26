import NavBar from '@/components/nav-bar';
import HeroSection from '@/components/hero-section';
import WhySection from '@/components/why-section';
import ScarcityBar from '@/components/scarcity-bar';
import ApplicationForm from '@/components/application-form';
import CapabilitiesSection from '@/components/capabilities-section';
import FooterSection from '@/components/footer-section';

export default function HomePage() {
  const spotsRemaining = 100;

  return (
    <main className="min-h-screen">
      <NavBar />
      <HeroSection />
      <WhySection />
      <ScarcityBar spotsRemaining={spotsRemaining} />
      <ApplicationForm />
      <CapabilitiesSection />
      <FooterSection />
    </main>
  );
}
