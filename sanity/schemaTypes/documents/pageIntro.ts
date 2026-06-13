import { BlockContentIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const pageIntro = defineType({
  name: "pageIntro",
  title: "Page intro",
  type: "document",
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: "pageKey",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Blog", value: "blog" },
          { title: "Works", value: "works" },
          { title: "Contact", value: "contact" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "pageKey" },
  },
})
