import { useEffect, useRef, useState, type ReactNode } from "react";

/** Mount heavy homepage sections only as the visitor approaches them. */
export default function DeferredSection({ children, anchor }: { children: ReactNode; anchor?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "600px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} id={visible ? undefined : anchor} className={visible ? undefined : "min-h-[400px] scroll-mt-32"}>{visible ? children : null}</div>;
}