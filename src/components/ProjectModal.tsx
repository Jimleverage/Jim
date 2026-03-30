import { motion, AnimatePresence } from "framer-motion";
import { X, Layers, Zap, BarChart2, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";

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

const ProjectModal = ({ project, onClose }: Props) => {
  const [zoomed, setZoomed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => Math.min(5, Math.max(1, s - e.deltaY * 0.001)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    setPos((p) => ({
      x: p.x + (e.clientX - lastPos.current.x),
      y: p.y + (e.clientY - lastPos.current.y),
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => { dragging.current = false; };

  const resetZoom = () => { setScale(1); setPos({ x: 0, y: 0 }); };

  const closeZoom = () => { setZoomed(false); resetZoom(); };

  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    if (!project) setZoomed(false);
  }, [project]);

  const imgSrc = project?.image
    ? `${import.meta.env.BASE_URL}${project.image.replace(/^\//, "")}`
    : null;

  return (
    <>
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
                <div
                  className="rounded-xl overflow-hidden border border-white/8 mb-8 relative cursor-zoom-in"
                  style={{ background: "linear-gradient(135deg, hsl(222,47%,7%) 0%, hsl(240,40%,12%) 50%, hsl(270,30%,10%) 100%)" }}
                  onClick={() => setZoomed(true)}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "linear-gradient(hsl(180,100%,50%,0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(180,100%,50%,0.2) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <img
                    src={imgSrc}
                    alt={project.title}
                    className="w-full rounded-lg object-cover relative z-10 transition-all duration-300"
                    style={{ filter: `contrast(1.05) saturate(1.1) brightness(${hovered ? 1.1 : 1.02})` }}
                  />
                  {/* Zoom hint overlay */}
                  <div
                    className="absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-200"
                    style={{ opacity: hovered ? 1 : 0 }}
                  >
                    <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-white/20">
                      <ZoomIn className="w-4 h-4 text-white" />
                      <span className="text-xs text-white font-medium">Click to zoom</span>
                    </div>
                  </div>
                </div>
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

                  {/* Impact box */}
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
                      <div
                        key={r.label}
                        className="pl-4 border-l-2 border-[hsl(270,60%,55%)]"
                      >
                        <div className="text-2xl font-display font-bold text-foreground">
                          {r.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                          {r.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Tools Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-muted-foreground"
                      >
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

      {/* Lightbox zoom overlay */}
      <AnimatePresence>
        {zoomed && imgSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md overflow-hidden"
            style={{ cursor: scale > 1 ? "grab" : "default" }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); setScale((s) => Math.min(5, s + 0.5)); }}
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </button>
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); setScale((s) => Math.max(1, s - 0.5)); if (scale <= 1.5) resetZoom(); }}
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </button>
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); resetZoom(); }}
                title="Reset"
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </button>
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={closeZoom}
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Scale indicator */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 text-xs text-white/70">
              {Math.round(scale * 100)}%
            </div>

            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={imgSrc}
              alt="Zoomed workflow"
              className="max-w-full max-h-full rounded-xl object-contain shadow-2xl select-none"
              style={{
                filter: "contrast(1.08) saturate(1.15) brightness(1.05)",
                transform: `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`,
                transformOrigin: "center center",
                transition: dragging.current ? "none" : "transform 0.1s ease",
                cursor: scale > 1 ? "grabbing" : "default",
              }}
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />

            <p className="absolute bottom-4 text-xs text-white/40">
              Scroll to zoom · Drag to pan · Press reset to fit
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectModal;
