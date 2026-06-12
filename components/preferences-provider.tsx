"use client";

import { MotionConfig } from "motion/react";
import { createContext, useContext, useEffect, useState } from "react";

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
  const [reducedMotion, setReducedMotionState] = useState(false);
  const [fontSize, setFontSizeState] = useState<FontSize>("default");
  const [highContrast, setHighContrastState] = useState(false);

  useEffect(() => {
    const storedMotion = localStorage.getItem(MOTION_KEY);
    if (storedMotion !== null) {
      setReducedMotionState(storedMotion === "true");
    } else {
      setReducedMotionState(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      );
    }

    const storedFontSize = localStorage.getItem(FONT_SIZE_KEY);
    if (
      storedFontSize === "small" ||
      storedFontSize === "default" ||
      storedFontSize === "large"
    ) {
      setFontSizeState(storedFontSize);
    }

    const storedContrast = localStorage.getItem(CONTRAST_KEY);
    if (storedContrast !== null) {
      setHighContrastState(storedContrast === "true");
    } else {
      setHighContrastState(
        window.matchMedia("(prefers-contrast: more)").matches,
      );
    }
  }, []);

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

  const setReducedMotion = (value: boolean) => {
    setReducedMotionState(value);
    localStorage.setItem(MOTION_KEY, String(value));
  };

  const setFontSize = (value: FontSize) => {
    setFontSizeState(value);
    localStorage.setItem(FONT_SIZE_KEY, value);
  };

  const setHighContrast = (value: boolean) => {
    setHighContrastState(value);
    localStorage.setItem(CONTRAST_KEY, String(value));
  };

  return (
    <PreferencesContext.Provider
      value={{
        reducedMotion,
        setReducedMotion,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
      }}
    >
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
