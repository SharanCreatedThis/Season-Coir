"use client";

import { useState } from "react";
import { motion, PanInfo } from "framer-motion";

interface CapsuleSliderProps<T> {
  items: T[];
  renderItem: (item: T, isActive: boolean, index: number) => React.ReactNode;
  height?: number | string;
  cardWidth?: number | string;
}

export function CapsuleSlider<T>({ items, renderItem, height = 450, cardWidth = "75vw" }: CapsuleSliderProps<T>) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    if (info.offset.x < -40) {
      setIndex((i) => (i + 1) % total);
    } else if (info.offset.x > 40) {
      setIndex((i) => (i - 1 + total) % total);
    }
  };

  const handleClick = (i: number, rel: number) => {
    if (rel !== 0) setIndex(i);
  };

  return (
    <div style={{ height, width: "100%", position: "relative", perspective: 1200, overflow: "visible" }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {items.map((item, i) => {
          let rel = i - index;
          if (rel < -Math.floor(total / 2)) rel += total;
          if (rel > Math.floor(total / 2)) rel -= total;
          const absRel = Math.abs(rel);

          const zStep = 100;
          const scaleStep = 0.12;
          const gapX = 35; 
          const gapY = 15; 
          const rotateStep = 6;
          
          const z = -absRel * zStep;
          const scale = 1 / (1 + absRel * scaleStep);
          // Shift active center state
          const x = rel * gapX;
          const y = absRel * gapY; 
          const rotate = rel * rotateStep;
          const opacity = rel === 0 ? 1 : Math.max(0, 0.7 - (absRel * 0.15));
          
          // Optimization: Do not render items too far back
          if (absRel > 5) return null;

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                x,
                y,
                z,
                scale,
                rotateZ: rotate,
                opacity
              }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              style={{
                position: "absolute",
                zIndex: 100 - absRel,
                width: cardWidth,
                transformOrigin: "center center",
                cursor: rel === 0 ? "grab" : "pointer",
                pointerEvents: "auto",
              }}
              drag={rel === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={rel === 0 ? handleDragEnd : undefined}
              whileDrag={{ cursor: "grabbing" }}
              onClick={() => handleClick(i, rel)}
            >
              {renderItem(item, rel === 0, i)}
            </motion.div>
          );
        })}
      </div>
      
      {/* Visual Navigation Hints under the cards */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center flex-wrap gap-1.5 z-50 px-6">
         {items.map((_, i) => (
            <div 
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === index ? 'w-6 bg-kerala-gold' : 'w-1.5 bg-kerala-gold/20 hover:bg-kerala-gold/50'}`}
            />
         ))}
      </div>
    </div>
  );
}
