"use client"

import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"

import { schemaTypes } from "./sanity/schemaTypes"
import { structure } from "./sanity/structure"
import { folioTheme } from "./sanity/theme"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: "default",
  title: "June Folio",
  basePath: "/studio",
  projectId,
  dataset,
  theme: folioTheme,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2026-06-13" }),
  ],
  schema: {
    types: schemaTypes,
  },
})
