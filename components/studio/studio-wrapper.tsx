"use client"

import isPropValid from "@emotion/is-prop-valid"
import { NextStudio } from "next-sanity/studio"
import { StyleSheetManager } from "styled-components"

import config from "@/sanity.config"

export function StudioWrapper() {
  return (
    <StyleSheetManager
      shouldForwardProp={(prop, element) => {
        if (typeof element === "string") {
          return isPropValid(prop)
        }
        return true
      }}
    >
      <NextStudio config={config} />
    </StyleSheetManager>
  )
}
