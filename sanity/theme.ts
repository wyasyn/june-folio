import { buildLegacyTheme } from "sanity"

const props = {
  "--folio-white": "#fafafa",
  "--folio-black": "#2e2e2e",
  "--folio-primary": "#6b5c4f",
  "--folio-muted": "#f0f0f0",
  "--folio-border": "#e0e0e0",
  "--folio-accent": "#ebebeb",
}

export const folioTheme = buildLegacyTheme({
  "--black": props["--folio-black"],
  "--white": props["--folio-white"],
  "--gray": "#737373",
  "--gray-base": "#737373",
  "--component-bg": props["--folio-white"],
  "--component-text-color": props["--folio-black"],
  "--brand-primary": props["--folio-primary"],
  "--default-button-color": "#737373",
  "--default-button-primary-color": props["--folio-primary"],
  "--default-button-success-color": "#0f9d58",
  "--default-button-warning-color": "#f4b400",
  "--default-button-danger-color": "#db4437",
  "--state-info-color": props["--folio-primary"],
  "--state-success-color": "#0f9d58",
  "--state-warning-color": "#f4b400",
  "--state-danger-color": "#db4437",
  "--main-navigation-color": props["--folio-black"],
  "--main-navigation-color--inverted": props["--folio-white"],
  "--focus-color": props["--folio-primary"],
})
