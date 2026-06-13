import { CogIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "authorName",
      title: "Author name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
    }),
    defineField({
      name: "navItems",
      title: "Navigation",
      type: "array",
      of: [{ type: "navItem" }],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      of: [{ type: "navItem" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "footerCopyright",
      title: "Footer copyright",
      description: "Use {year} for the current year",
      type: "string",
      initialValue: "© {year} Yasin Walum.",
    }),
    defineField({
      name: "contactSocialLabel",
      title: "Contact social label",
      type: "string",
      initialValue: "Or find me on",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
})
