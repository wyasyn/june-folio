import {
  BlockContentIcon,
  CaseIcon,
  CogIcon,
  DocumentTextIcon,
  HomeIcon,
} from "@sanity/icons"
import type { ComponentType } from "react"
import type { StructureResolver } from "sanity/structure"

const SINGLETONS = ["siteSettings", "homePage"]

function createSingleton(
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
  icon?: ComponentType
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
        .title(title)
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("June Folio")
    .items([
      createSingleton(S, "siteSettings", "Site settings", CogIcon),
      createSingleton(S, "homePage", "Home page", HomeIcon),
      S.divider(),
      S.listItem()
        .title("Works")
        .icon(CaseIcon)
        .child(
          S.documentTypeList("project")
            .title("Projects")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
        ),
      S.listItem()
        .title("Blog")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("post").title("Posts")),
      S.listItem()
        .title("Page copy")
        .icon(BlockContentIcon)
        .child(S.documentTypeList("pageIntro").title("Page intros")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() as string)
      ),
    ])
