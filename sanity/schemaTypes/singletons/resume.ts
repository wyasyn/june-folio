import { DocumentIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

import { INTEREST_OPTIONS } from "../../lib/resume-options"

export const resume = defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "header", title: "Header" },
    { name: "left", title: "Left column" },
    { name: "right", title: "Right column" },
  ],
  fields: [
    // Header / contact
    defineField({
      name: "fullName",
      title: "Full name",
      type: "string",
      group: "header",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jobTitle",
      title: "Job title",
      type: "string",
      group: "header",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      description: "Street, city, ZIP",
      type: "string",
      group: "header",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "header",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "header",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "string",
      group: "header",
    }),

    // Right column
    defineField({
      name: "profile",
      title: "Profile",
      type: "text",
      rows: 4,
      group: "right",
    }),
    defineField({
      name: "workExperience",
      title: "Work experience",
      type: "array",
      group: "right",
      of: [
        defineField({
          name: "job",
          title: "Job",
          type: "object",
          fields: [
            defineField({ name: "jobTitle", title: "Job title", type: "string" }),
            defineField({ name: "company", title: "Company", type: "string" }),
            defineField({ name: "location", title: "Location", type: "string" }),
            defineField({
              name: "period",
              title: "Period",
              description: "e.g. 2012 – 2013",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "bullets",
              title: "Highlights",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { title: "jobTitle", subtitle: "company" },
          },
        }),
      ],
    }),
    defineField({
      name: "references",
      title: "References",
      type: "array",
      group: "right",
      of: [
        defineField({
          name: "referenceItem",
          title: "Reference",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "phone", title: "Phone", type: "string" }),
            defineField({ name: "email", title: "Email", type: "string" }),
          ],
          preview: {
            select: { title: "name", subtitle: "role" },
          },
        }),
      ],
    }),
    defineField({
      name: "interests",
      title: "Interests",
      description: "Pick from popular interests — each has a matching icon.",
      type: "array",
      group: "right",
      of: [
        {
          type: "string",
          options: { list: INTEREST_OPTIONS },
        },
      ],
    }),

    // Left column
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      group: "left",
      of: [
        defineField({
          name: "education",
          title: "Education",
          type: "object",
          fields: [
            defineField({ name: "degree", title: "Degree", type: "string" }),
            defineField({ name: "institution", title: "Institution", type: "string" }),
            defineField({
              name: "years",
              title: "Years",
              description: "e.g. 2012 – 2013",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "degree", subtitle: "institution" },
          },
        }),
      ],
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      group: "left",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "array",
      group: "left",
      of: [
        defineField({
          name: "language",
          title: "Language",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({
              name: "level",
              title: "Level",
              description: "e.g. Mother tongue, Excellent",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "level" },
          },
        }),
      ],
    }),
    defineField({
      name: "social",
      title: "Social",
      type: "array",
      group: "left",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "expertise",
      title: "Expertise",
      type: "array",
      group: "left",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "awards",
      title: "Awards",
      type: "array",
      group: "left",
      of: [
        defineField({
          name: "award",
          title: "Award",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
            defineField({
              name: "years",
              title: "Years",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "subtitle" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Resume" }),
  },
})
