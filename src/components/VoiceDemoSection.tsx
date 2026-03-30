import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, Brain, Loader2 } from "lucide-react";
import Vapi from "@vapi-ai/web";

const VAPI_PUBLIC_KEY = "e32694fc-ea16-41e3-9b15-99d206e804d7";
const ASSISTANT_ID = "e710f898-76fb-40b8-8833-ec13719e5274";

type CallStatus = "idle" | "connecting" | "active" | "ending";

const features = [
  {
    icon: <Mic className="w-5 h-5" />,
    title: "Voice Input",
    desc: "Natural speech recognition",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: "AI Processing",
    desc: "Intelligent conversation",
  },
  {
    icon: <Volume2 className="w-5 h-5" />,
    title: "Natural Response",
    desc: "Human-like voice output",
  },
];

const VoiceDemoSection = () => {
  const vapiRef = useRef<Vapi | null>(null);
  const [status, setStatus] = useState<CallStatus>("idle");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    const vapi = new Vapi(VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", () => setStatus("active"));
    vapi.on("call-end", () => {
      setStatus("idle");
      setIsSpeaking(false);
      setVolumeLevel(0);
    });
    vapi.on("speech-start", () => setIsSpeaking(true));
    vapi.on("speech-end", () => setIsSpeaking(false));
    vapi.on("volume-level", (vol: number) => setVolumeLevel(vol));
    vapi.on("error", () => setStatus("idle"));

    return () => {
      vapi.stop();
    };
  }, []);

  const handleToggle = async () => {
    const vapi = vapiRef.current;
    if (!vapi) return;

    if (status === "active") {
      setStatus("ending");
      vapi.stop();
    } else if (status === "idle") {
      setStatus("connecting");
      try {
        await vapi.start(ASSISTANT_ID);
      } catch {
        setStatus("idle");
      }
    }
  };

  const statusLabel: Record<CallStatus, string> = {
    idle: "Ready to connect",
    connecting: "Connecting...",
    active: isSpeaking ? "AI is speaking..." : "Listening...",
    ending: "Ending call...",
  };

  const statusColor: Record<CallStatus, string> = {
    idle: "bg-red-500",
    connecting: "bg-yellow-400 animate-pulse",
    active: "bg-green-400 animate-pulse",
    ending: "bg-yellow-400",
  };

  // Pulse rings scale driven by volume
  const pulseScale = 1 + volumeLevel * 0.6;

  return (
    <section id="voice-demo" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(180,100%,40%,0.04)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[hsl(270,60%,55%,0.04)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[hsl(270,60%,55%,0.15)] text-[hsl(270,80%,75%)] border border-[hsl(270,60%,55%,0.3)] mb-4">
            Featured Demo
          </span>
          <h2 className="text-5xl sm:text-6xl font-display font-bold mb-3">
            <span className="mr-3">🎙️</span>
            Live <span className="gradient-text">Voice AI</span> Demo
          </h2>
          <p className="text-lg text-muted-foreground">
            Click the microphone to start a real-time voice conversation with my AI agent
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 glow-border mb-6"
        >
          {/* Status bar */}
          <div className="flex items-center gap-4 bg-white/4 border border-white/10 rounded-2xl px-6 py-4 mb-8 max-w-sm mx-auto">
            <span className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${statusColor[status]}`} />
            <div>
              <p className="text-base font-bold text-foreground">Voice AI Assistant</p>
              <p className="text-sm text-muted-foreground">{statusLabel[status]}</p>
            </div>
          </div>

          {/* Mic button area */}
          <div className="flex flex-col items-center gap-5">
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.p
                  key="idle-hint"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-xl font-bold text-[hsl(180,100%,50%)] flex items-center gap-2"
                >
                  ↓ Click to start talking
                </motion.p>
              )}
              {status === "active" && (
                <motion.p
                  key="active-hint"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-sm font-semibold text-green-400 flex items-center gap-1.5"
                >
                  {isSpeaking ? "🔊 AI speaking..." : "🎤 Speak now..."}
                </motion.p>
              )}
              {status === "connecting" && (
                <motion.p
                  key="connecting-hint"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-sm font-semibold text-yellow-400 flex items-center gap-1.5"
                >
                  <Loader2 className="w-4 h-4 animate-spin" /> Connecting to AI...
                </motion.p>
              )}
              {status === "ending" && (
                <motion.p
                  key="ending-hint"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-sm font-semibold text-yellow-400"
                >
                  Ending call...
                </motion.p>
              )}
            </AnimatePresence>

            {/* Mic button with volume pulse rings */}
            <div className="relative flex items-center justify-center">
              {/* Volume-driven pulse rings */}
              {status === "active" && (
                <>
                  <motion.div
                    animate={{ scale: pulseScale, opacity: 0.25 - volumeLevel * 0.1 }}
                    transition={{ duration: 0.1 }}
                    className="absolute w-36 h-36 rounded-full bg-[hsl(180,100%,40%,0.2)] pointer-events-none"
                  />
                  <motion.div
                    animate={{ scale: pulseScale * 1.25, opacity: 0.12 - volumeLevel * 0.05 }}
                    transition={{ duration: 0.15 }}
                    className="absolute w-36 h-36 rounded-full bg-[hsl(180,100%,40%,0.15)] pointer-events-none"
                  />
                </>
              )}

              <motion.button
                onClick={handleToggle}
                disabled={status === "connecting" || status === "ending"}
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: status === "idle" ? 1.06 : 1 }}
                className={`relative w-44 h-44 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  status === "active"
                    ? "bg-red-500 hover:bg-red-600 shadow-[0_0_32px_rgba(239,68,68,0.4)]"
                    : status === "connecting" || status === "ending"
                    ? "bg-yellow-500/80 cursor-not-allowed"
                    : "bg-gradient-to-br from-[hsl(50,100%,70%)] to-[hsl(40,100%,60%)] shadow-[0_0_32px_hsl(180,100%,40%,0.25)] hover:shadow-[0_0_48px_hsl(180,100%,40%,0.4)]"
                }`}
              >
                {status === "connecting" || status === "ending" ? (
                  <Loader2 className="w-16 h-16 text-white animate-spin" />
                ) : status === "active" ? (
                  <MicOff className="w-16 h-16 text-white" />
                ) : (
                  <Mic className="w-16 h-16 text-[hsl(222,47%,14%)]" />
                )}
              </motion.button>
            </div>

            <p className="text-xs text-muted-foreground">
              {status === "active"
                ? "Click the mic to end the call"
                : "Microphone access required"}
            </p>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card p-4 text-center hover:border-[hsl(180,100%,40%,0.3)] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(180,100%,40%,0.15)] to-[hsl(270,60%,55%,0.15)] border border-[hsl(180,100%,40%,0.2)] flex items-center justify-center mx-auto mb-2 group-hover:border-[hsl(180,100%,40%,0.4)] transition-all">
                <span className="text-[hsl(180,100%,50%)]">{f.icon}</span>
              </div>
              <p className="text-sm font-semibold text-foreground mb-0.5">{f.title}</p>
              <p className="text-xs text-muted-foreground leading-tight">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Tool badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {["VAPI Web SDK", "n8n Workflow", "Real-time Voice", "AI Agent"].map((badge) => (
            <span
              key={badge}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-muted-foreground"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VoiceDemoSection;
