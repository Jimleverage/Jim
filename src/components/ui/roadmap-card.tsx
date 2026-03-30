"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status?: "done" | "in-progress" | "upcoming";
}

export interface RoadmapCardProps {
  title?: string;
  description?: string;
  items: RoadmapItem[];
  className?: string;
}

export function RoadmapCard({
  title = "Product Roadmap",
  description = "Upcoming features and releases",
  items,
  className,
}: RoadmapCardProps) {
  return (
    <Card
      className={cn(
        "w-full glass-card glow-border border-0 shadow-none bg-transparent overflow-x-auto",
        className,
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="gradient-text font-display text-xl">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="relative min-w-[600px]">
          {/* Timeline line */}
          <div className="absolute left-0 right-0 top-4 h-px bg-gradient-to-r from-[hsl(180,100%,40%,0.6)] via-[hsl(270,60%,55%,0.4)] to-[hsl(180,100%,40%,0.1)]" />

          <div className="flex justify-between">
            {items.map((item, index) => {
              const isActive =
                item.status === "done" || item.status === "in-progress";

              return (
                <motion.div
                  key={index}
                  className="relative pt-8 text-center w-1/5 px-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                >
                  {/* Timeline dot */}
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={cn(
                      "absolute left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                      isActive
                        ? "bg-[hsl(180,100%,40%)] border-[hsl(180,100%,40%)] shadow-[0_0_10px_hsl(180,100%,40%,0.6)]"
                        : "bg-muted border-border",
                    )}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-background" />
                  </motion.div>

                  {/* Step badge */}
                  <Badge
                    variant={isActive ? "default" : "outline"}
                    className={cn(
                      "mb-2 text-[10px] font-bold tracking-wider",
                      isActive &&
                        "bg-gradient-to-r from-[hsl(180,100%,40%)] to-[hsl(200,100%,45%)] border-0 text-white",
                    )}
                  >
                    {item.quarter}
                  </Badge>

                  {/* Title */}
                  <h4 className="text-sm font-display font-semibold text-foreground leading-tight mb-1">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
