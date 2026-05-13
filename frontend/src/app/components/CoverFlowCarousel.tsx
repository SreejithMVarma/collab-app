"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

interface CoverFlowItem {
  id: number;
  content: React.ReactNode;
}

interface CoverFlowCarouselProps {
  items: CoverFlowItem[];
}

export default function CoverFlowCarousel({ items }: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = items.length;

  const getIndex = useCallback(
    (offset: number) => ((currentIndex + offset) % total + total) % total,
    [currentIndex, total],
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 50;
      if (info.offset.x < -threshold) {
        setCurrentIndex((prev) => (prev + 1) % total);
      } else if (info.offset.x > threshold) {
        setCurrentIndex((prev) => ((prev - 1) + total) % total);
      }
    },
    [total],
  );

  if (total === 0) return null;

  const positions = [
    { offset: -1, x: "-65%", scale: 0.78, zIndex: 1, opacity: 0.5 },
    { offset: 0, x: "0%", scale: 1, zIndex: 10, opacity: 1 },
    { offset: 1, x: "65%", scale: 0.78, zIndex: 1, opacity: 0.5 },
  ];

  return (
    <div className="coverflow-container">
      <motion.div
        className="coverflow-track"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="popLayout">
          {positions.map((pos) => {
            const itemIndex = getIndex(pos.offset);
            const item = items[itemIndex];
            return (
              <motion.div
                key={item.id}
                className="coverflow-card"
                initial={{ x: pos.x, scale: pos.scale, opacity: 0 }}
                animate={{
                  x: pos.x,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                style={{
                  position: "absolute",
                  left: "50%",
                  transformOrigin: "center center",
                }}
              >
                {item.content}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Dots */}
      <div className="coverflow-dots">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`coverflow-dot ${i === currentIndex ? "is-active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
