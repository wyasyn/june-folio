"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { usePreferences } from "@/components/preferences-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover } from "radix-ui";

import { useRef, useState } from "react";

export type DockItem = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  content?: React.ReactNode;
};

const isActiveRoute = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

const popoverAnimation =
  "z-50 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95";

// Same springy entrance as the hero social-link tooltips. Covers both
// delayed-open (this dock's 100ms delay) and instant-open states.
const tooltipAnimation =
  "duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-90 data-[state=delayed-open]:slide-in-from-bottom-2 data-[state=instant-open]:animate-in data-[state=instant-open]:fade-in-0 data-[state=instant-open]:zoom-in-90 data-[state=instant-open]:slide-in-from-bottom-2 motion-reduce:animate-none";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div data-font-scale-exempt className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    aria-label={item.title}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md",
                      isActiveRoute(pathname, item.href)
                        ? "border-transparent bg-primary/15 text-primary"
                        : "border-border bg-card/60 text-muted-foreground",
                    )}
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </Link>
                ) : (
                  <Popover.Root>
                    <Popover.Trigger asChild>
                      <button
                        aria-label={item.title}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur-md"
                      >
                        <div className="h-4 w-4">{item.icon}</div>
                      </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content
                        side="left"
                        sideOffset={12}
                        data-font-scale-exempt
                        className={popoverAnimation}
                      >
                        {item.content}
                        <Popover.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] border-r border-b border-border bg-popover/80 fill-popover/80 backdrop-blur-md" />
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur-md"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-muted-foreground" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  const pathname = usePathname();
  const { reducedMotion } = usePreferences();
  return (
    <TooltipProvider delayDuration={100}>
      <motion.div
        data-font-scale-exempt
        onMouseMove={(e) => !reducedMotion && mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto hidden h-16 items-end gap-4 rounded-2xl border border-border bg-card/60 px-4 pb-3 backdrop-blur-md md:flex",
          className,
        )}
      >
        <span aria-hidden className="dock-border-glow" />
        {items.map((item) => (
          <IconContainer
            mouseX={mouseX}
            key={item.title}
            active={item.href ? isActiveRoute(pathname, item.href) : false}
            {...item}
          />
        ))}
      </motion.div>
    </TooltipProvider>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  content,
  active,
}: DockItem & {
  mouseX: MotionValue;
  active: boolean;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const dockIcon = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-full",
        active
          ? "bg-primary/15 text-primary"
          : "bg-muted/50 text-muted-foreground hover:bg-secondary/60 hover:text-secondary-foreground",
      )}
    >
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (content) {
    return (
      <Popover.Root>
        <Tooltip>
          <TooltipTrigger asChild>
            <Popover.Trigger asChild>
              <button aria-label={title}>{dockIcon}</button>
            </Popover.Trigger>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8} className={tooltipAnimation}>
            {title}
          </TooltipContent>
        </Tooltip>
        <Popover.Portal>
          <Popover.Content
            side="top"
            sideOffset={12}
            data-font-scale-exempt
            className={popoverAnimation}
          >
            {content}
            <Popover.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] border-r border-b border-border bg-popover/80 fill-popover/80 backdrop-blur-md" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={href!} aria-label={title}>
          {dockIcon}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8} className={tooltipAnimation}>
        {title}
      </TooltipContent>
    </Tooltip>
  );
}
