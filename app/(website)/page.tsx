import Hero from '@/components/website/home/Hero/Hero';
import ServiceStrip from '@/components/website/home/ServiceStrip/ServiceStrip';
import AboutSection from '@/components/website/home/About/AboutPage';
import ServicesSection from '@/components/website/home/Services/ServicesSection';
import Process from '@/components/website/home/Process/Process';
import Clients  from '@/components/website/home/Clients/Clients';
import WhyChooseUs from '@/components/website/home/WhyChooseUs/WhyChooseUs';
import ContactCTA from '@/components/website/home/ContactCTA/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceStrip />
      <AboutSection />
      <ServicesSection />
      <Process />
      <Clients />
      <WhyChooseUs />
      <ContactCTA />
    </>
  );
}