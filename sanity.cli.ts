import { defineCliConfig } from "sanity/cli"

import { dataset, projectId } from "./sanity/lib/env"

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: "june-folio",
  typegen: {
    path: "./sanity/**/*.{ts,tsx}",
    schema: "./sanity/schemaTypes",
    generates: "./sanity.types.ts",
    overloadClientMethods: true,
  },
})
