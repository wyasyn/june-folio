import path from "node:path"

import {
  Circle,
  Document,
  Font,
  G,
  Page,
  Path,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer"

import { INTEREST_LABELS } from "@/sanity/lib/resume-options"
import type { Resume } from "@/sanity/lib/types"

const fontDir = path.join(process.cwd(), "public", "fonts")

let fontsRegistered = false
function registerFonts() {
  if (fontsRegistered) return
  Font.register({
    family: "Inter",
    fonts: [
      { src: path.join(fontDir, "Inter-400.ttf"), fontWeight: 400 },
      { src: path.join(fontDir, "Inter-500.ttf"), fontWeight: 500 },
      { src: path.join(fontDir, "Inter-600.ttf"), fontWeight: 600 },
      { src: path.join(fontDir, "Inter-700.ttf"), fontWeight: 700 },
    ],
  })
  // Avoid hyphenation breaking words mid-line.
  Font.registerHyphenationCallback((word) => [word])
  fontsRegistered = true
}

const INK = "#1a1a1a"
const MUTED = "#5c5c5c"
const FAINT = "#8a8a8a"
const RULE = "#d6d6d6"
const RING = "#bdbdbd"

const PAGE_PADDING = 34

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 9,
    color: MUTED,
    paddingVertical: 36,
    paddingHorizontal: 0,
    backgroundColor: "#ffffff",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: PAGE_PADDING,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 16,
  },
  name: {
    fontSize: 34,
    fontWeight: 700,
    letterSpacing: 3,
    color: INK,
    textTransform: "uppercase",
    lineHeight: 1.02,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: 1.5,
    color: MUTED,
    marginTop: 8,
  },
  website: {
    fontSize: 9,
    fontWeight: 500,
    color: FAINT,
    marginTop: 5,
  },
  headerRight: {
    width: 188,
    paddingTop: 6,
  },
  contactLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },
  contactText: {
    fontSize: 8.5,
    color: MUTED,
    marginLeft: 9,
    flex: 1,
  },
  headerRule: {
    marginHorizontal: PAGE_PADDING,
    marginTop: 22,
    borderBottomWidth: 1,
    borderBottomColor: RULE,
  },

  // Body
  body: {
    flexDirection: "row",
  },
  leftCol: {
    width: "35%",
    paddingLeft: PAGE_PADDING,
    paddingRight: 22,
    paddingTop: 20,
  },
  rightCol: {
    width: "65%",
    paddingRight: PAGE_PADDING,
    paddingLeft: 24,
    paddingTop: 20,
    borderLeftWidth: 1,
    borderLeftColor: RULE,
  },

  section: {
    marginTop: 16,
  },
  sectionFirst: {
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    letterSpacing: 1.5,
    color: INK,
    textTransform: "uppercase",
    paddingBottom: 4,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: RULE,
  },
  itemTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    color: INK,
  },
  itemMeta: {
    fontSize: 8,
    fontWeight: 500,
    color: FAINT,
    marginTop: 1.5,
  },
  paragraph: {
    fontSize: 9,
    color: MUTED,
    lineHeight: 1.5,
  },
  block: {
    marginBottom: 11,
  },
  bulletRow: {
    flexDirection: "row",
    marginTop: 3,
  },
  bulletDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: FAINT,
    marginTop: 4,
    marginRight: 6,
  },
  bulletText: {
    fontSize: 8.5,
    color: MUTED,
    lineHeight: 1.45,
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  listDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: INK,
    marginTop: 4,
    marginRight: 7,
  },
  listText: {
    fontSize: 9,
    color: MUTED,
    flex: 1,
  },
  langRow: {
    marginBottom: 5,
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  socialText: {
    marginLeft: 9,
    flex: 1,
  },
  interestsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestItem: {
    width: 78,
    alignItems: "center",
    marginBottom: 12,
  },
  interestLabel: {
    fontSize: 8,
    color: MUTED,
    marginTop: 5,
    textAlign: "center",
  },
})

// Tabler-style glyphs (24x24), scaled and centred inside a thin ring.
const GLYPHS = {
  pin: [
    "M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0",
    "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z",
  ],
  phone: [
    "M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2",
  ],
  mail: [
    "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z",
    "M3 7l9 6l9 -6",
  ],
} as const

function ContactIcon({ type }: { type: keyof typeof GLYPHS }) {
  return (
    <Svg width={19} height={19} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="11.4" stroke={RING} strokeWidth={0.8} fill="none" />
      <G transform="translate(12 12) scale(0.5) translate(-12 -12)">
        {GLYPHS[type].map((d, i) => (
          <Path
            key={i}
            d={d}
            stroke={FAINT}
            strokeWidth={1.7}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </G>
    </Svg>
  )
}

// Brand glyphs (Tabler, 24x24) drawn in white on a filled dark square.
const BRAND_GLYPHS: Record<string, string[]> = {
  github: [
    "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5",
  ],
  linkedin: [
    "M8 11l0 5",
    "M8 8l0 .01",
    "M12 16l0 -5",
    "M16 16v-3a2 2 0 0 0 -4 0",
    "M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z",
  ],
  x: [
    "M4 4l11.733 16h4.267l-11.733 -16z",
    "M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772",
  ],
  instagram: [
    "M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z",
    "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M16.5 7.5l0 .01",
  ],
  facebook: [
    "M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3",
  ],
  youtube: [
    "M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4z",
    "M10 9l5 3l-5 3z",
  ],
}

function BrandIcon({ platform }: { platform: string }) {
  const glyph = BRAND_GLYPHS[platform]
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Rect x={0} y={0} width={24} height={24} rx={5} fill={INK} />
      {glyph && (
        <G transform="translate(12 12) scale(0.62) translate(-12 -12)">
          {glyph.map((d, i) => (
            <Path
              key={i}
              d={d}
              stroke="#ffffff"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </G>
      )}
    </Svg>
  )
}

// Interest glyphs (Tabler, 24x24) drawn as thin line icons above the label.
const INTEREST_GLYPHS: Record<string, string[]> = {
  reading: [
    "M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0",
    "M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0",
    "M3 6l0 13",
    "M12 6l0 13",
    "M21 6l0 13",
  ],
  music: [
    "M3 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M13 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M9 17l0 -13l10 0l0 13",
    "M9 8l10 0",
  ],
  photography: [
    "M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2",
    "M12 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
  ],
  travelling: [
    "M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z",
  ],
  cycling: [
    "M5 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
    "M19 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
    "M12 19l0 -4l-3 -3l5 -4l2 3l3 0",
    "M11 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
  ],
  painting: [
    "M12 21a9 9 0 0 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25a9 9 0 0 1 -.5 0z",
    "M7.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M12 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
  ],
  football: [
    "M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18z",
    "M12 7l4.755 3.455l-1.817 5.59h-5.876l-1.817 -5.59z",
  ],
  gaming: [
    "M3 11a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v2a4 4 0 0 1 -4 4h-1l-2 -3h-4l-2 3h-1a4 4 0 0 1 -4 -4z",
    "M7 11l2 0",
    "M8 10l0 2",
    "M15 10l0 .01",
    "M17 12l0 .01",
  ],
  cooking: [
    "M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 7.723l0 7.126h-12l0 -7.126a4 4 0 0 1 2.092 -7.723a4 4 0 0 1 3.908 -3.151z",
    "M6.161 17.009l11.839 -.009",
  ],
  movies: [
    "M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z",
    "M8 4l0 16",
    "M16 4l0 16",
    "M4 8l4 0",
    "M4 16l4 0",
    "M4 12l16 0",
    "M16 8l4 0",
    "M16 16l4 0",
  ],
  writing: [
    "M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5l0 4",
    "M13.5 6.5l4 4",
  ],
  fitness: [
    "M2 12l1 0",
    "M5 9m0 1a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1z",
    "M8 11l8 0",
    "M16 9m0 1a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1z",
    "M21 12l1 0",
  ],
  hiking: [
    "M3 20h18l-7 -12l-3 5l-2 -3z",
    "M14 8a2 2 0 1 0 -1.8 -1.1",
  ],
  coding: [
    "M7 8l-4 4l4 4",
    "M17 8l4 4l-4 4",
    "M14 4l-4 16",
  ],
  coffee: [
    "M4 8h12v5a4 4 0 0 1 -4 4h-4a4 4 0 0 1 -4 -4z",
    "M16 9h2a2 2 0 0 1 0 5h-2",
    "M7 3c-.3 1 -.3 2 0 3",
    "M11 3c-.3 1 -.3 2 0 3",
  ],
  gardening: [
    "M12 10a6 6 0 0 0 -6 -6h-3v3a6 6 0 0 0 6 6h3",
    "M12 14a6 6 0 0 1 6 -6h3v2a6 6 0 0 1 -6 6h-3",
    "M12 20l0 -10",
  ],
}

function InterestIcon({ name }: { name: string }) {
  const glyph = INTEREST_GLYPHS[name]
  if (!glyph) return null
  return (
    <Svg width={26} height={26} viewBox="0 0 24 24">
      {glyph.map((d, i) => (
        <Path
          key={i}
          d={d}
          stroke={MUTED}
          strokeWidth={1.3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  )
}

// Turn a profile URL into a short, readable handle (e.g. "@username").
function shortHandle(url: string): string {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, "")
    const segments = u.pathname.split("/").filter(Boolean)
    if (segments.length > 0) {
      return `@${segments[segments.length - 1]}`
    }
    return host
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "")
  }
}

function Section({
  title,
  first = false,
  children,
}: {
  title: string
  first?: boolean
  children: React.ReactNode
}) {
  return (
    <View style={first ? styles.sectionFirst : styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

function nonEmpty<T>(arr: T[] | null | undefined): T[] {
  return Array.isArray(arr) ? arr.filter(Boolean) : []
}

export function ResumeDocument({ data }: { data: Resume }) {
  registerFonts()

  const education = nonEmpty(data.education)
  const skills = nonEmpty(data.skills)
  const languages = nonEmpty(data.languages)
  const social = nonEmpty(data.social)
  const expertise = nonEmpty(data.expertise)
  const awards = nonEmpty(data.awards)
  const work = nonEmpty(data.workExperience)
  const references = nonEmpty(data.references)
  const interests = nonEmpty(data.interests)

  const contactLines: Array<{ type: keyof typeof GLYPHS; value: string }> = [
    data.address ? { type: "pin" as const, value: data.address } : null,
    data.phone ? { type: "phone" as const, value: data.phone } : null,
    data.email ? { type: "mail" as const, value: data.email } : null,
  ].filter((line): line is { type: keyof typeof GLYPHS; value: string } =>
    Boolean(line),
  )

  // Track whether the first section in each column has rendered, so only the
  // very first one drops its top margin (keeps spacing tidy under the rule).
  const leftSections = { first: true }
  const rightSections = { first: true }
  const takeFirst = (col: { first: boolean }) => {
    if (col.first) {
      col.first = false
      return true
    }
    return false
  }

  return (
    <Document
      title={`${data.fullName} — Resume`}
      author={data.fullName}
      subject="Resume"
    >
      <Page size="A4" style={styles.page}>
        {/* Full-width header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{data.fullName}</Text>
            <Text style={styles.jobTitle}>{data.jobTitle}</Text>
            {data.website && (
              <Text style={styles.website}>{data.website}</Text>
            )}
          </View>
          {contactLines.length > 0 && (
            <View style={styles.headerRight}>
              {contactLines.map((line, i) => (
                <View key={i} style={styles.contactLine}>
                  <ContactIcon type={line.type} />
                  <Text style={styles.contactText}>{line.value}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.headerRule} />

        {/* Two-column body */}
        <View style={styles.body}>
          {/* Left column */}
          <View style={styles.leftCol}>
            {education.length > 0 && (
              <Section title="Education" first={takeFirst(leftSections)}>
                {education.map((item, i) => (
                  <View key={i} style={styles.block}>
                    <Text style={styles.itemTitle}>{item.degree}</Text>
                    {item.institution && (
                      <Text style={styles.itemMeta}>{item.institution}</Text>
                    )}
                    {item.years && (
                      <Text style={styles.itemMeta}>{item.years}</Text>
                    )}
                  </View>
                ))}
              </Section>
            )}

            {skills.length > 0 && (
              <Section title="Skills" first={takeFirst(leftSections)}>
                {skills.map((skill, i) => (
                  <View key={i} style={styles.listItem}>
                    <View style={styles.listDot} />
                    <Text style={styles.listText}>{skill}</Text>
                  </View>
                ))}
              </Section>
            )}

            {languages.length > 0 && (
              <Section title="Languages" first={takeFirst(leftSections)}>
                {languages.map((lang, i) => (
                  <View key={i} style={styles.langRow}>
                    <Text style={styles.itemTitle}>{lang.name}</Text>
                    {lang.level && (
                      <Text style={styles.itemMeta}>{lang.level}</Text>
                    )}
                  </View>
                ))}
              </Section>
            )}

            {social.length > 0 && (
              <Section title="Social" first={takeFirst(leftSections)}>
                {social.map((item, i) => (
                  <View key={i} style={styles.socialRow}>
                    <BrandIcon platform={item.platform} />
                    <View style={styles.socialText}>
                      <Text style={styles.itemTitle}>{item.label}</Text>
                      <Text style={styles.itemMeta}>{shortHandle(item.url)}</Text>
                    </View>
                  </View>
                ))}
              </Section>
            )}

            {expertise.length > 0 && (
              <Section title="Expertise" first={takeFirst(leftSections)}>
                {expertise.map((item, i) => (
                  <View key={i} style={styles.listItem}>
                    <View style={styles.listDot} />
                    <Text style={styles.listText}>{item}</Text>
                  </View>
                ))}
              </Section>
            )}

            {awards.length > 0 && (
              <Section title="Awards" first={takeFirst(leftSections)}>
                {awards.map((award, i) => (
                  <View key={i} style={styles.block}>
                    <Text style={styles.itemTitle}>{award.title}</Text>
                    {award.subtitle && (
                      <Text style={styles.itemMeta}>{award.subtitle}</Text>
                    )}
                    {award.years && (
                      <Text style={styles.itemMeta}>{award.years}</Text>
                    )}
                  </View>
                ))}
              </Section>
            )}
          </View>

          {/* Right column */}
          <View style={styles.rightCol}>
            {data.profile && (
              <Section title="Profile" first={takeFirst(rightSections)}>
                <Text style={styles.paragraph}>{data.profile}</Text>
              </Section>
            )}

            {work.length > 0 && (
              <Section title="Work Experience" first={takeFirst(rightSections)}>
                {work.map((job, i) => (
                  <View key={i} style={styles.block} wrap={false}>
                    <Text style={styles.itemTitle}>{job.jobTitle}</Text>
                    {(job.company || job.location || job.period) && (
                      <Text style={styles.itemMeta}>
                        {[job.company, job.location, job.period]
                          .filter(Boolean)
                          .join(" / ")}
                      </Text>
                    )}
                    {job.description && (
                      <Text style={[styles.paragraph, { marginTop: 4 }]}>
                        {job.description}
                      </Text>
                    )}
                    {nonEmpty(job.bullets).map((bullet, j) => (
                      <View key={j} style={styles.bulletRow}>
                        <View style={styles.bulletDot} />
                        <Text style={styles.bulletText}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </Section>
            )}

            {references.length > 0 && (
              <Section title="References" first={takeFirst(rightSections)}>
                {references.map((ref, i) => (
                  <View key={i} style={styles.block}>
                    <Text style={styles.itemTitle}>{ref.name}</Text>
                    {ref.role && <Text style={styles.itemMeta}>{ref.role}</Text>}
                    {ref.phone && (
                      <Text style={styles.itemMeta}>T: {ref.phone}</Text>
                    )}
                    {ref.email && (
                      <Text style={styles.itemMeta}>E: {ref.email}</Text>
                    )}
                  </View>
                ))}
              </Section>
            )}

            {interests.length > 0 && (
              <Section title="Interests" first={takeFirst(rightSections)}>
                <View style={styles.interestsRow}>
                  {interests.map((interest, i) => (
                    <View key={i} style={styles.interestItem}>
                      <InterestIcon name={interest} />
                      <Text style={styles.interestLabel}>
                        {INTEREST_LABELS[interest] ?? interest}
                      </Text>
                    </View>
                  ))}
                </View>
              </Section>
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
}
