import { useCallback, useEffect, useState } from 'react';
import ChapterNav from './ChapterNav';
import WorldHud from './WorldHud';
import ChapterStory from './ChapterStory';
import ChapterPromise from './ChapterPromise';
import ChapterDay from './ChapterDay';
import ChapterCelebration from './ChapterCelebration';
import FindThePlace from './FindThePlace';
import MemoryRoom from './MemoryRoom';
import RsvpQuest from './RsvpQuest';
import FinalReveal from './FinalReveal';
import { CursorSparkles, SecretHeart } from './Atmosphere';
import { SECRET_NOTES } from './media';
import { playWeddingMusic } from '../hooks/useWeddingMusic';

interface Props {
  onReplay: () => void;
}

export default function LoveWorld({ onReplay }: Props) {
  const [chapter, setChapter] = useState(0);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [finale, setFinale] = useState(false);

  const onChapter = useCallback((id: number) => setChapter(id), []);

  useEffect(() => {
    playWeddingMusic();
  }, []);

  return (
    <div className="relative love-night">
      <CursorSparkles />
      <ChapterNav chapter={finale ? 4 : chapter} />
      <WorldHud onEnvelope={() => setEnvelopeOpen((v) => !v)} />
      <SecretHeart notes={SECRET_NOTES} />

      <ChapterStory setChapter={onChapter} envelopeOpen={envelopeOpen} />
      <ChapterPromise setChapter={onChapter} />
      <ChapterDay setChapter={onChapter} />
      <ChapterCelebration setChapter={onChapter} />
      <FindThePlace />
      <MemoryRoom />
      <RsvpQuest onFinished={() => setFinale(true)} />

      {finale && <FinalReveal onReplay={onReplay} />}
    </div>
  );
}
