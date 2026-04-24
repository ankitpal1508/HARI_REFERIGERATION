import React, { useState, useEffect, useRef } from 'react';

export default function LazySection({ children, minHeight = '200px' }) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          obs.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={mounted ? undefined : { minHeight }}>
      {mounted && children}
    </div>
  );
}
