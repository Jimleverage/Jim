import { motion, AnimatePresence } from "framer-motion";
import { X, Layers, Zap, BarChart2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

export type Project = {
  id: number;
  title: string;
  category: string;
  subTags?: string[];
  tags: string[];
  description: string;
  impactHeadline: string;
  impact: string;
  results: { label: string; value: string }[];
  tools: string[];
  image: string;
  metric: string;
  metricLabel?: string;
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

const MIN = 1;
const MAX = 4;
const STEP = 0.4;

const ImageViewer = ({ src, alt }: { src: string; alt: string }) => {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const zoom = useCallback((delta: number) => {
    setScale((s) => {
      const next = Math.min(MAX, Math.max(MIN, +(s + delta).toFixed(2)));
      if (next === MIN) setPos({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const reset = () => { setScale(1); setPos({ x: 0, y: 0 }); };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoom(e.deltaY < 0 ? STEP : -STEP);
  };

  const handleClick = () => {
    if (isDragging) return;
    zoom(scale >= MAX ? -(MAX - MIN) : STEP);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(false);
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...pos };
    e.currentTarget.setPointerCapture((e.nativeEvent as PointerEvent).pointerId || 0);
    window.addEventListener("mousemove", onMouseMove as any);
    window.addEventListener("mouseup", onMouseUp as any);
  };

  const onMouseMove = (e: MouseEvent) => {
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) setIsDragging(true);
    setPos({ x: posStart.current.x + dx, y: posStart.current.y + dy });
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove as any);
    window.removeEventListener("mouseup", onMouseUp as any);
    setTimeout(() => setIsDragging(false), 10);
  };

  return (
    <div
      className="rounded-xl border border-white/8 mb-8 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(222,47%,7%) 0%, hsl(240,40%,12%) 50%, hsl(270,30%,10%) 100%)" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(180,100%,50%,0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(180,100%,50%,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1.5 border border-white/15">
        <button onClick={() => zoom(STEP)} className="p-1 hover:text-[hsl(180,100%,50%)] transition-colors text-white/70" title="Zoom in">
          <ZoomIn className="w-4 h-4" />
        </button>
        <span className="text-xs text-white/50 w-9 text-center select-none">{Math.round(scale * 100)}%</span>
        <button onClick={() => zoom(-STEP)} className="p-1 hover:text-[hsl(180,100%,50%)] transition-colors text-white/70" title="Zoom out">
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-px h-3 bg-white/20 mx-0.5" />
        <button onClick={reset} className="p-1 hover:text-[hsl(180,100%,50%)] transition-colors text-white/70" title="Reset">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Hint */}
      {scale === 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/15 flex items-center gap-1.5 pointer-events-none">
          <ZoomIn className="w-3 h-3 text-[hsl(180,100%,50%)]" />
          <span className="text-[11px] text-white/60">Click or scroll to zoom</span>
        </div>
      )}

      {/* Image area */}
      <div
        ref={containerRef}
        className="overflow-hidden"
        style={{ maxHeight: 420, cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
        onWheel={handleWheel}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          className="w-full object-cover select-none"
          style={{
            filter: "contrast(1.05) saturate(1.1) brightness(1.02)",
            transform: `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`,
            transformOrigin: "top center",
            transition: isDragging ? "none" : "transform 0.25s ease",
          }}
        />
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: Props) => {
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const imgSrc = project?.image
    ? `${import.meta.env.BASE_URL}${project.image.replace(/^\//, "")}`
    : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[hsl(222,47%,8%)] border border-white/10 p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[hsl(270,60%,55%,0.2)] text-[hsl(270,80%,80%)] border border-[hsl(270,60%,55%,0.4)]">
                {project.category}
              </span>
              {project.subTags?.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-muted-foreground border border-white/10">
                  {t}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="text-3xl font-display font-bold mb-6 leading-snug pr-8">
              {project.title}
            </h2>

            {/* Workflow image */}
            {imgSrc ? (
              <ImageViewer src={imgSrc} alt={project.title} />
            ) : (
              <div className="rounded-xl bg-[#0d0d18] border border-white/8 mb-8 h-48 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Workflow screenshot coming soon</p>
              </div>
            )}

            {/* Two-column body */}
            <div className="grid md:grid-cols-5 gap-8">
              {/* Left — description + impact */}
              <div className="md:col-span-3 space-y-5">
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-sm mb-3">
                    <Layers className="w-4 h-4 text-[hsl(270,60%,65%)]" />
                    Automation Description
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="rounded-xl bg-white/4 border border-white/8 p-5">
                  <h4 className="flex items-center gap-2 font-semibold text-sm mb-2">
                    <Zap className="w-4 h-4 text-[hsl(180,100%,50%)]" />
                    The Impact
                  </h4>
                  <p className="text-sm font-bold text-[hsl(180,100%,55%)] mb-2 leading-snug">
                    {project.impactHeadline}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.impact}
                  </p>
                </div>
              </div>

              {/* Right — results + tools */}
              <div className="md:col-span-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-4">
                  <BarChart2 className="w-3.5 h-3.5" /> Tangible Results
                </p>
                <div className="space-y-4 mb-8">
                  {project.results.map((r) => (
                    <div key={r.label} className="pl-4 border-l-2 border-[hsl(270,60%,55%)]">
                      <div className="text-2xl font-display font-bold text-foreground">{r.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{r.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Tools Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span key={tool} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-muted-foreground">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
