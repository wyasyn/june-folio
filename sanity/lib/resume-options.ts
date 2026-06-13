// Popular interests offered in the studio. Each value has a matching icon
// rendered in the resume PDF (see components/resume/resume-document.tsx).
export const INTEREST_OPTIONS: Array<{ title: string; value: string }> = [
  { title: "Reading", value: "reading" },
  { title: "Music", value: "music" },
  { title: "Photography", value: "photography" },
  { title: "Travelling", value: "travelling" },
  { title: "Cycling", value: "cycling" },
  { title: "Painting", value: "painting" },
  { title: "Football", value: "football" },
  { title: "Gaming", value: "gaming" },
  { title: "Cooking", value: "cooking" },
  { title: "Movies", value: "movies" },
  { title: "Writing", value: "writing" },
  { title: "Fitness", value: "fitness" },
  { title: "Hiking", value: "hiking" },
  { title: "Coding", value: "coding" },
  { title: "Coffee", value: "coffee" },
  { title: "Gardening", value: "gardening" },
]

export const INTEREST_LABELS: Record<string, string> = Object.fromEntries(
  INTEREST_OPTIONS.map((option) => [option.value, option.title]),
)
