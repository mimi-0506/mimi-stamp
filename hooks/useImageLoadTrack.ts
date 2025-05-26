import { useRef, useState } from "react";

export default function useImageLoadTrack(totalImageCnt: number) {
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const completedCountRef = useRef(0);

  const handleImageComplete = () => {
    completedCountRef.current += 1;

    if (completedCountRef.current >= totalImageCnt) setIsAllLoaded(true);
  };

  return {
    isAllLoaded,
    handleImageComplete,
  };
}
