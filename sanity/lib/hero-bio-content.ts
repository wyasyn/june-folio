import type { PortableTextBlock } from "next-sanity"

export const HERO_BIO_BLOCKS: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "hero-bio",
    style: "normal",
    markDefs: [],
    children: [
      { _type: "span", _key: "hero-bio-span-0", text: "Yasin", marks: ["sketch"] },
      {
        _type: "span",
        _key: "hero-bio-span-1",
        text: " is Uganda based software engineer with a passion for building ",
        marks: [],
      },
      { _type: "span", _key: "hero-bio-span-2", text: "web", marks: ["sketch"] },
      { _type: "span", _key: "hero-bio-span-3", text: " & ", marks: [] },
      {
        _type: "span",
        _key: "hero-bio-span-4",
        text: "mobile",
        marks: ["sketch"],
      },
      {
        _type: "span",
        _key: "hero-bio-span-5",
        text: " applications that are fast, scalable, and easy to use.",
        marks: [],
      },
    ],
  },
]
