import Script from "next/script"

export function PreferencesBootstrap() {
  return (
    <Script src="/preferences-bootstrap.js" strategy="beforeInteractive" />
  )
}
