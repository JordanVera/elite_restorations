"use client";

import * as React from "react";
import { motion } from "motion/react";

const navigation = { count: 0 };

export default function Template({ children }: { children: React.ReactNode }) {
  const [animateIn] = React.useState(() => navigation.count > 0);

  React.useEffect(() => {
    navigation.count += 1;
  }, []);

  if (!animateIn) {
    return <>{children}</>;
  }

  return (
    <>
      <motion.div
        aria-hidden
        data-reveal
        className="pointer-events-none fixed inset-0 z-[95] origin-top bg-background"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        data-reveal
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
