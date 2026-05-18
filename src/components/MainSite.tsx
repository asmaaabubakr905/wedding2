import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import GallerySection from './GallerySection';
import TimelineSection from './TimelineSection';
import VenueSection from './VenueSection';
import CountdownSection from './CountdownSection';
import MessagesSection from './MessagesSection';
import ThankYouSection from './ThankYouSection';
import Particles from './Particles';

interface Props {
  visible: boolean;
}

export default function MainSite({ visible }: Props) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative"
    >
      <Particles />

      <HeroSection />
      <GallerySection />
      <TimelineSection />
      <VenueSection />
      <CountdownSection />
      <MessagesSection />
      <ThankYouSection />
    </motion.div>
  );
}
