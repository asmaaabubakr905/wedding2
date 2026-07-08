import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import QuoteSection from './QuoteSection';
import CountdownSection from './CountdownSection';
import TimelineSection from './TimelineSection';
import LocationSection from './LocationSection';
import GallerySection from './GallerySection';
import FooterSection from './FooterSection';
import Particles from './Particles';
import MusicControl from './MusicControl';

interface Props {
  visible: boolean;
}

export default function MainSite({ visible }: Props) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative"
    >
      <Particles />
      <MusicControl />

      <HeroSection />
      <QuoteSection />
      <CountdownSection />
      <TimelineSection />
      <LocationSection />
      <GallerySection />
      <FooterSection />
    </motion.div>
  );
}
