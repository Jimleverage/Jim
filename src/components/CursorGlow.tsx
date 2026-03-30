import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const trail = useRef({ x: -200, y: -200 });
  const raf = useRef<number>();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      // Smoothly interpolate trail toward cursor
      trail.current.x += (pos.current.x - trail.current.x) * 0.08;
      trail.current.y += (pos.current.y - trail.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trail.current.x - 300}px, ${trail.current.y - 300}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Sharp glow — follows cursor directly */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(180,100%,50%,0.10) 0%, hsl(180,100%,50%,0.04) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />
      {/* Soft glow — lags behind for trail effect */}
      <div
        ref={trailRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(270,60%,55%,0.07) 0%, hsl(270,60%,55%,0.02) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default CursorGlow;
