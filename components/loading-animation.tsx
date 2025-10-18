"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

export function LoadingAnimation() {
  return (
    <div className="flex h-full min-h-[400px] items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent glow-primary"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <TrendingUp className="h-8 w-8 text-white" />
        </motion.div>
        <motion.p
          className="text-sm text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          Loading your dashboard...
        </motion.p>
      </motion.div>
    </div>
  )
}
