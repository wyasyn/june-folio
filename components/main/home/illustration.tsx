"use client"

import { useEffect, useState } from "react"

import {
  IconBrandAndroid,
  IconBrandFlutter,
  IconBrandKotlin,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandSwift,
  IconBrandTailwind,
  IconBrandTypescript,
  IconDots,
  IconStack2,
  IconTriangle,
  type Icon as TablerIcon,
} from "@tabler/icons-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

type StackItem = {
  name: string
  icon: TablerIcon
  color: string
}

// Two "pages" per side — the More button spins the wheel and swaps pages.
const MOBILE_PAGES: StackItem[][] = [
  [
    { name: "Flutter", icon: IconBrandFlutter, color: "#02569B" },
    { name: "React Native", icon: IconBrandReactNative, color: "#61DAFB" },
    { name: "Expo", icon: IconTriangle, color: "#4630EB" },
  ],
  [
    { name: "Kotlin", icon: IconBrandKotlin, color: "#7F52FF" },
    { name: "Swift", icon: IconBrandSwift, color: "#F05138" },
    { name: "Android", icon: IconBrandAndroid, color: "#3DDC84" },
  ],
]

const WEB_PAGES: StackItem[][] = [
  [
    { name: "Next.js", icon: IconBrandNextjs, color: "var(--foreground)" },
    { name: "TypeScript", icon: IconBrandTypescript, color: "#3178C6" },
    { name: "Python", icon: IconBrandPython, color: "#3776AB" },
  ],
  [
    { name: "React", icon: IconBrandReact, color: "#61DAFB" },
    { name: "Tailwind CSS", icon: IconBrandTailwind, color: "#38BDF8" },
    { name: "Node.js", icon: IconBrandNodejs, color: "#5FA04E" },
  ],
]

// Slot angles in degrees: -90 is 12 o'clock, increasing clockwise.
const MOBILE_ANGLES = [-135, 180, 135]
const WEB_ANGLES = [-45, 0, 45]

// The wedge artwork points at 12 o'clock, so its rotation = slot angle + 90.
const wedgeRotationFor = (angle: number) => angle + 90

// Rotate from `current` to the closest equivalent of `targetDeg` so the
// wedge always takes the short way around instead of unwinding.
function rotateTowards(current: number, targetDeg: number) {
  const delta = ((((targetDeg - current) % 360) + 540) % 360) - 180
  return current + delta
}

function point(deg: number) {
  const rad = (deg * Math.PI) / 180
  return {
    left: `calc(50% + ${Math.cos(rad).toFixed(4)} * var(--r))`,
    top: `calc(50% + ${Math.sin(rad).toFixed(4)} * var(--r))`,
  }
}

function StackSlot({
  item,
  angle,
  side,
  counterRotate,
  powered,
  entryDelay,
  onHover,
}: {
  item: StackItem
  angle: number
  side: "left" | "right"
  counterRotate: number
  powered: boolean
  entryDelay: number
  onHover: (name: string | null, angle: number) => void
}) {
  const reduceMotion = useReducedMotion()
  const Icon = item.icon

  return (
    <motion.div
      className="absolute"
      style={{ ...point(angle), x: "-50%", y: "-50%" }}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: counterRotate }}
      transition={{
        rotate: { duration: 0.9, ease: "easeInOut" },
        default: {
          type: "spring",
          stiffness: 260,
          damping: 22,
          delay: entryDelay,
        },
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.button
          key={item.name}
          type="button"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="group relative flex size-8 cursor-pointer items-center justify-center rounded-lg border bg-card shadow-sm outline-none transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring min-[380px]:size-10 min-[380px]:rounded-xl sm:size-12"
          aria-label={item.name}
          onMouseEnter={() => onHover(item.name, angle)}
          onMouseLeave={() => onHover(null, angle)}
          onFocus={() => onHover(item.name, angle)}
          onBlur={() => onHover(null, angle)}
        >
          <Icon
            className="size-4 text-foreground/80 transition-[color,filter] duration-500 group-hover:text-primary min-[380px]:size-5 sm:size-6"
            style={
              powered
                ? {
                    color: item.color,
                    filter: `drop-shadow(0 0 6px ${item.color})`,
                  }
                : undefined
            }
          />
          <span
            className={`pointer-events-auto absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border bg-card px-2 py-0.5 text-[9px] font-medium text-foreground shadow-sm transition-colors duration-300 group-hover:border-transparent group-hover:bg-secondary group-hover:text-secondary-foreground min-[380px]:px-2.5 min-[380px]:py-1 min-[380px]:text-[10px] sm:text-xs ${
              side === "right"
                ? "left-full ml-2 min-[380px]:ml-3"
                : "right-full mr-2 min-[380px]:mr-3"
            }`}
          >
            {item.name}
          </span>
        </motion.button>
      </AnimatePresence>
    </motion.div>
  )
}

function StackWheel({ onHover }: { onHover?: (name: string | null) => void }) {
  const reduceMotion = useReducedMotion()
  const [spin, setSpin] = useState(0)
  const [page, setPage] = useState(0)
  const [wedgeRot, setWedgeRot] = useState(0)
  const [tick, setTick] = useState(0)
  const [powered, setPowered] = useState(false)

  const mobileItems = MOBILE_PAGES[page % MOBILE_PAGES.length]
  const webItems = WEB_PAGES[page % WEB_PAGES.length]

  // Pulse cycle: center circle blinks, a light travels out along the wedge
  // (~0.9s), then everything it powers flashes its brand color and fades.
  useEffect(() => {
    if (reduceMotion) return
    let id: ReturnType<typeof setInterval> | undefined
    const first = setTimeout(() => {
      setTick((t) => t + 1)
      id = setInterval(() => setTick((t) => t + 1), 5200)
    }, 1200)
    return () => {
      clearTimeout(first)
      if (id) clearInterval(id)
    }
  }, [reduceMotion])

  useEffect(() => {
    if (tick === 0) return
    const arrive = setTimeout(() => setPowered(true), 900)
    const fade = setTimeout(() => setPowered(false), 1700)
    return () => {
      clearTimeout(arrive)
      clearTimeout(fade)
    }
  }, [tick])

  const handleHover = (name: string | null, angle: number) => {
    onHover?.(name)
    const target = wedgeRotationFor(name === null ? -90 : angle)
    setWedgeRot((current) => rotateTowards(current, target))
  }

  const handleMore = () => {
    if (reduceMotion) {
      setPage((p) => p + 1)
      return
    }
    setSpin((s) => s + 1)
    // Swap items mid-spin so the new set is revealed as the wheel settles.
    setTimeout(() => setPage((p) => p + 1), 350)
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative size-[180px] [--r:64px] min-[380px]:size-[230px] min-[380px]:[--r:84px] sm:size-[300px] sm:[--r:120px]"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      >
        {/* Rotating assembly: disc, wedge, active chip and stack slots */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: spin * 360 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* Wheel disc */}
          <div className="absolute left-1/2 top-1/2 size-[calc(var(--r)*2)] -translate-x-1/2 -translate-y-1/2 rounded-full border bg-card shadow-lg" />

          {/* Highlight wedge + traveling pulse, aimed at the hovered item */}
          <motion.div
            className="absolute left-1/2 top-1/2 size-[calc(var(--r)*2)] -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: wedgeRot }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 150, damping: 20 }
            }
          >
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              className="absolute inset-0 size-full overflow-hidden rounded-full text-primary"
            >
              <path
                d="M50 50 L38.4 3.4 A48 48 0 0 1 61.6 3.4 Z"
                fill="currentColor"
                opacity={0.15}
              />
            </svg>

            {tick > 0 && !reduceMotion && (
              <div className="absolute left-1/2 top-0 h-[var(--r)] w-0 -translate-x-1/2">
                <motion.div
                  key={tick}
                  className="absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_2px_var(--primary)]"
                  initial={{ top: "100%", opacity: 0 }}
                  animate={{ top: ["100%", "8%"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.9, ease: "easeIn" }}
                />
              </div>
            )}
          </motion.div>

          {/* Active item: My Stack, pinned at 12 o'clock */}
          <motion.div
            className="absolute"
            style={{ ...point(-90), x: "-50%", y: "-50%" }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: -spin * 360 }}
            transition={{
              rotate: { duration: 0.9, ease: "easeInOut" },
              default: {
                type: "spring",
                stiffness: 260,
                damping: 22,
                delay: 0.15,
              },
            }}
          >
            <div
              className="relative flex size-8 items-center justify-center rounded-lg border-2 border-primary bg-card text-primary transition-shadow duration-500 min-[380px]:size-10 min-[380px]:rounded-xl sm:size-12"
              style={{
                boxShadow: powered
                  ? "0 0 16px 2px var(--primary)"
                  : "var(--shadow-sm)",
              }}
            >
              <IconStack2 className="size-4 min-[380px]:size-5 sm:size-6" />
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground shadow-sm sm:text-xs">
                My Stack
              </span>
            </div>
          </motion.div>

          {/* Mobile tools on the left arc */}
          {mobileItems.map((item, i) => (
            <StackSlot
              key={`mobile-${i}`}
              item={item}
              angle={MOBILE_ANGLES[i]}
              side="left"
              counterRotate={-spin * 360}
              powered={powered}
              entryDelay={0.3 + i * 0.08}
              onHover={handleHover}
            />
          ))}

          {/* Web stack on the right arc */}
          {webItems.map((item, i) => (
            <StackSlot
              key={`web-${i}`}
              item={item}
              angle={WEB_ANGLES[i]}
              side="right"
              counterRotate={-spin * 360}
              powered={powered}
              entryDelay={0.34 + i * 0.08}
              onHover={handleHover}
            />
          ))}
        </motion.div>

        {/* Blinking center circle, synced with each outgoing pulse */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
            delay: 0.2,
          }}
        >
          <motion.div
            key={tick}
            className="size-11 rounded-full border-[3px] border-primary bg-card min-[380px]:size-14 sm:size-16"
            animate={
              reduceMotion || tick === 0 ? undefined : { scale: [1, 1.18, 1] }
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={handleMore}
        aria-label="Show more tools"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.7 }}
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        className="relative z-10 -mt-6 flex cursor-pointer items-center gap-1.5 rounded-full border bg-card px-4 py-1.5 text-xs font-medium text-foreground shadow-sm focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
      >
        More
        <IconDots className="size-4 text-muted-foreground" />
      </motion.button>
    </div>
  )
}

export default function Illustration() {
  return <StackWheel />
}
