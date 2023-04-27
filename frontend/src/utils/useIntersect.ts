import { useState, useEffect, useCallback } from 'react';

function useIntersect(getMoreItem: any, isLoaded: any) {
  const [ref, setRef] = useState<any>(null);

  const checkIntersect = useCallback(async ([entry]: any, observer: any) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  }, []);

  useEffect(() => {
    let observer: any;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        threshold: 0.4,
      });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref]);

  return [ref, setRef];
}

export default useIntersect;
