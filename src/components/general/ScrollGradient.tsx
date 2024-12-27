import { useEffect, useState, SyntheticEvent, useCallback } from "react";
import { throttle } from "lodash";

type ScrollGradientProps = {
  e?: SyntheticEvent<HTMLElement>;
  targetOffsetX?: number;
};

const ScrollGradient = ({ e, targetOffsetX = 15 }: ScrollGradientProps) => {
  const [scrollPosition, setScrollPosition] = useState<{
    isAtLeft: boolean;
    isAtRight: boolean;
  }>({
    isAtLeft: true,
    isAtRight: true,
  });

  // Memoize throttled function to avoid re-creation on every render
  const handleScroll = useCallback(
    (event: SyntheticEvent<HTMLElement>) => {
      const { scrollLeft, scrollWidth, clientWidth } =
        event.target as HTMLElement;
      const isAtLeft = scrollLeft <= targetOffsetX;
      const isAtRight = clientWidth + scrollLeft >= scrollWidth - targetOffsetX;
      const hasScrollBar = clientWidth < scrollWidth;

      setScrollPosition((prev) => {
        if (
          prev.isAtLeft === isAtLeft &&
          prev.isAtRight === (!hasScrollBar || isAtRight)
        ) {
          return prev;
        }
        return { isAtLeft, isAtRight: !hasScrollBar || isAtRight };
      });
    },
    [targetOffsetX]
  );

  const throttledHandleScroll = useCallback(throttle(handleScroll, 300), [
    handleScroll,
  ]);

  useEffect(() => {
    if (e) {
      throttledHandleScroll(e);
    } else {
      setScrollPosition({ isAtLeft: true, isAtRight: true });
    }
  }, [e, throttledHandleScroll]);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 999,
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        pointerEvents: "none",
        background: `linear-gradient(to right, ${
          scrollPosition.isAtLeft ? "transparent" : "rgba(0,0,0,0.2)"
        } 0%, transparent 3%, transparent 97%, ${
          scrollPosition.isAtRight ? "transparent" : "rgba(0,0,0,0.2)"
        } 100%)`,
      }}
    />
  );
};

export default ScrollGradient;
