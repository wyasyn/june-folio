import { getCliClient } from "sanity/cli"

const ORPHAN_DRAFT_IDS = [
  "drafts.bac65599-a295-4c93-accd-e888ad0804e2",
  "drafts.ef11cf9d-2ad7-44d6-bc94-b301abdde9e5",
]

async function cleanup() {
  const client = getCliClient({ apiVersion: "2026-06-13" })

  for (const id of ORPHAN_DRAFT_IDS) {
    const doc = await client.getDocument(id)
    if (!doc) {
      console.log(`Skip ${id} (not found)`)
      continue
    }

    await client.delete(id)
    console.log(`Deleted ${id} (${doc._type})`)
  }

  console.log("Orphan draft cleanup complete.")
}

cleanup().catch((error) => {
  console.error(error)
  process.exit(1)
})
