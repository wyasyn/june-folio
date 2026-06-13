import { HomeIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "heroName",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroTitle",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroBio",
      title: "Bio",
      description:
        'Use the "Sketch underline" decorator on words you want emphasized (e.g. Yasin, web, mobile).',
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Sketch underline", value: "sketch" },
            ],
            annotations: [],
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "heroAvatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroCtaLabel",
      title: "CTA label",
      type: "string",
      initialValue: "My Works",
    }),
    defineField({
      name: "heroCtaHref",
      title: "CTA href",
      type: "string",
      initialValue: "/works",
    }),
    defineField({
      name: "projectsSectionTitle",
      title: "Projects section title",
      type: "string",
      initialValue: "Projects",
    }),
    defineField({
      name: "blogSectionTitle",
      title: "Blog section title",
      type: "string",
      initialValue: "Blog",
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "featuredPosts",
      title: "Featured posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
})
