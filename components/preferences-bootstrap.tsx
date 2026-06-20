import { headers } from "next/headers"
import Script from "next/script"

export async function PreferencesBootstrap() {
  const nonce = (await headers()).get("x-nonce") ?? undefined

  return (
    <Script
      src="/preferences-bootstrap.js"
      strategy="beforeInteractive"
      nonce={nonce}
    />
  )
}
