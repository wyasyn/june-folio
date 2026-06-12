"use client";

import { usePreferences, type FontSize } from "@/components/preferences-provider";
import { cn } from "@/lib/utils";
import {
  IconContrast,
  IconMoon,
  IconSun,
  IconTextSize,
  IconWaveSine,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const fontSizeOrder: FontSize[] = ["small", "default", "large"];

const fontSizeLabels: Record<FontSize, string> = {
  small: "Small",
  default: "Default",
  large: "Large",
};

function MiniSwitch({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "block h-5 w-9 rounded-full p-0.5 transition-colors",
        on ? "bg-primary" : "bg-input",
      )}
    >
      <span
        className={cn(
          "block h-4 w-4 rounded-full bg-background transition-transform",
          on && "translate-x-4",
        )}
      />
    </span>
  );
}

function PanelRow({
  icon,
  label,
  value,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent"
    >
      <span className="text-primary">{icon}</span>
      <span className="flex-1 text-foreground">{label}</span>
      <span className="text-xs text-muted-foreground">{value}</span>
    </button>
  );
}

export default function PreferencesPanel() {
  const { resolvedTheme, setTheme } = useTheme();
  const {
    reducedMotion,
    setReducedMotion,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
  } = usePreferences();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const ThemeIcon = isDark ? IconMoon : IconSun;

  return (
    <div className="w-60 rounded-2xl border border-border bg-popover/80 p-2 shadow-lg backdrop-blur-md">
      <PanelRow
        icon={<ThemeIcon className="h-5 w-5" />}
        label={isDark ? "Dark theme" : "Light theme"}
        value={<MiniSwitch on={isDark} />}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      />
      <div className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-accent">
        <span className="text-primary">
          <IconTextSize className="h-5 w-5" />
        </span>
        <span className="flex-1 text-foreground">Font size</span>
        <input
          type="range"
          min={0}
          max={fontSizeOrder.length - 1}
          step={1}
          value={fontSizeOrder.indexOf(fontSize)}
          onChange={(e) => setFontSize(fontSizeOrder[Number(e.target.value)])}
          aria-label={`Font size: ${fontSizeLabels[fontSize]}`}
          title={fontSizeLabels[fontSize]}
          className="w-20 accent-primary"
        />
      </div>
      <PanelRow
        icon={<IconContrast className="h-5 w-5" />}
        label="High contrast"
        value={<MiniSwitch on={highContrast} />}
        onClick={() => setHighContrast(!highContrast)}
      />
      <PanelRow
        icon={<IconWaveSine className="h-5 w-5" />}
        label="Reduce motion"
        value={<MiniSwitch on={reducedMotion} />}
        onClick={() => setReducedMotion(!reducedMotion)}
      />
    </div>
  );
}
