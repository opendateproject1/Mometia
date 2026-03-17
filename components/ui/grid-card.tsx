'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GridPattern } from '@/components/ui/grid-pattern';

interface GridCardProps {
  className?: string;
  children?: React.ReactNode;
  squares?: [x: number, y: number][];
}

export function GridCard({
  className,
  children,
  squares = [[7, 1], [9, 3], [8, 5], [10, 2], [7, 4]],
}: GridCardProps) {
  return (
    <motion.div
      className={cn(
        'group relative isolate z-0 flex h-full flex-col justify-between overflow-hidden',
        'rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm',
        'transition-colors duration-150',
        'hover:border-primary/40 hover:bg-card/60',
        className,
      )}
      whileHover={{
        y: -2,
        scale: 1.01,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
    >
      <div className="absolute inset-0">
        {/* Skewed grid pattern reveal */}
        <div className="absolute -inset-[25%] -skew-y-12 [mask-image:linear-gradient(225deg,black,transparent)]">
          <GridPattern
            width={30}
            height={30}
            x={0}
            y={0}
            squares={squares}
            className="fill-border/50 stroke-border/50 absolute inset-0 size-full translate-y-2 transition-transform duration-150 ease-out group-hover:translate-y-0"
          />
        </div>

        {/* Conic glow on hover — uses project theme colors */}
        <motion.div
          className="absolute -inset-[10%] opacity-0 blur-[50px]"
          style={{
            background:
              'conic-gradient(var(--primary) 0deg, var(--accent) 120deg, var(--secondary) 240deg, var(--primary) 360deg)',
          }}
          whileHover={{ opacity: 0.07 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {children}
    </motion.div>
  );
}
