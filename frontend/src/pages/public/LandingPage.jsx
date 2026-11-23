import Navbar from '../../components/layout/Navbar';
import HeroSection from '../../components/landing/HeroSection';
import ProductPreview from '../../components/landing/ProductPreview';
import FeatureSection from '../../components/landing/FeatureSection';
import HowItWorks from '../../components/landing/HowItWorks';
import WhyChooseUs from '../../components/landing/WhyChooseUs';
import CTASection from '../../components/landing/CTASection';
import Footer from '../../components/layout/Footer';

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProductPreview />
        <FeatureSection />
        <HowItWorks />
        <WhyChooseUs />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

export default LandingPage;
