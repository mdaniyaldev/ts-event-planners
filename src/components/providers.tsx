"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

// LazyMotion loads only the animation features we use (not layout or drag), which keeps the bundle small.
// `strict` makes any leftover full `motion.*` component fail loudly instead of silently adding weight.
// reducedMotion="user" turns off transform animation for people who ask for less motion.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
