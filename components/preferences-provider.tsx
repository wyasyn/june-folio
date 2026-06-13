"use client";

import { MotionConfig } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type FontSize = "small" | "default" | "large";

type PreferencesContextValue = {
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  fontSize: FontSize;
  setFontSize: (value: FontSize) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const MOTION_KEY = "preferences:reduce-motion";
const FONT_SIZE_KEY = "preferences:font-size";
const CONTRAST_KEY = "preferences:high-contrast";

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize from localStorage on the client so the first render already
  // matches the attributes set by the pre-paint script in the root layout.
  const [reducedMotion, setReducedMotionState] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(MOTION_KEY);
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    if (typeof window === "undefined") return "default";
    const stored = localStorage.getItem(FONT_SIZE_KEY);
    return stored === "small" || stored === "large" ? stored : "default";
  });
  const [highContrast, setHighContrastState] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(CONTRAST_KEY);
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-contrast: more)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    html.toggleAttribute("data-reduce-motion", reducedMotion);
    html.toggleAttribute("data-high-contrast", highContrast);
    if (fontSize === "default") {
      delete html.dataset.fontSize;
    } else {
      html.dataset.fontSize = fontSize;
    }
  }, [reducedMotion, highContrast, fontSize]);

  const setReducedMotion = useCallback((value: boolean) => {
    setReducedMotionState(value);
    localStorage.setItem(MOTION_KEY, String(value));
  }, []);

  const setFontSize = useCallback((value: FontSize) => {
    setFontSizeState(value);
    localStorage.setItem(FONT_SIZE_KEY, value);
  }, []);

  const setHighContrast = useCallback((value: boolean) => {
    setHighContrastState(value);
    localStorage.setItem(CONTRAST_KEY, String(value));
  }, []);

  const value = useMemo(
    () => ({
      reducedMotion,
      setReducedMotion,
      fontSize,
      setFontSize,
      highContrast,
      setHighContrast,
    }),
    [
      reducedMotion,
      setReducedMotion,
      fontSize,
      setFontSize,
      highContrast,
      setHighContrast,
    ],
  );

  return (
    <PreferencesContext.Provider value={value}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
        {children}
      </MotionConfig>
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }
  return ctx;
}
