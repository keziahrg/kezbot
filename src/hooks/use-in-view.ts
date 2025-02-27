import { useEffect, useRef, useState } from "react";

function useInView() {
  const inViewRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(true);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setInView(entry.isIntersecting);
  };

  useEffect(() => {
    const element = inViewRef.current;
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "0px 0px -118px 0px",
      threshold: 1.0,
    });

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [inViewRef]);

  return {
    inView,
    setInView,
    inViewRef,
  };
}

export { useInView };
