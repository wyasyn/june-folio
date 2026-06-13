import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email"

export type ContactMessageEmailProps = {
  name: string
  email: string
  message: string
}

const BRAND = "Yasin Walum"
const SITE = "yasinwalum.com"
const BLUE = "#2563eb"

const main = {
  backgroundColor: "#f6f7f9",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  padding: "40px 0",
}

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  borderTop: `4px solid ${BLUE}`,
  boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06)",
  margin: "0 auto",
  maxWidth: "560px",
  overflow: "hidden",
}

const content = { padding: "32px 40px 8px" }

const brandRow = { margin: "0 0 28px" }

const brandMark = {
  backgroundColor: BLUE,
  borderRadius: "4px",
  display: "inline-block",
  height: "18px",
  transform: "rotate(45deg)",
  verticalAlign: "middle",
  width: "18px",
}

const brandName = {
  color: "#101828",
  fontSize: "18px",
  fontWeight: 700,
  margin: "0 0 0 12px",
  verticalAlign: "middle",
}

const heading = {
  color: "#101828",
  fontSize: "26px",
  fontWeight: 700,
  lineHeight: "32px",
  margin: "0 0 20px",
}

const paragraph = {
  color: "#475467",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 16px",
}

const label = {
  color: "#98a2b3",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.04em",
  margin: "20px 0 4px",
  textTransform: "uppercase" as const,
}

const value = {
  color: "#101828",
  fontSize: "15px",
  lineHeight: "22px",
  margin: 0,
}

const messageBox = {
  backgroundColor: "#f9fafb",
  border: "1px solid #eaecf0",
  borderRadius: "8px",
  color: "#344054",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "4px 0 0",
  padding: "16px",
  whiteSpace: "pre-wrap" as const,
}

const button = {
  backgroundColor: BLUE,
  borderRadius: "8px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: 600,
  margin: "28px 0 8px",
  padding: "11px 20px",
  textDecoration: "none",
}

const divider = { borderColor: "#eaecf0", margin: "28px 0 24px" }

const footerInner = {
  color: "#475467",
  fontSize: "14px",
  lineHeight: "22px",
  margin: 0,
  padding: "0 40px 32px",
}

const footerLink = { color: BLUE, textDecoration: "underline" }

const signOff = {
  color: "#475467",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "16px 0 0",
  padding: "0 40px 32px",
}

const outerFooter = {
  color: "#98a2b3",
  fontSize: "12px",
  lineHeight: "20px",
  margin: "24px auto 0",
  maxWidth: "560px",
  textAlign: "center" as const,
}

const outerFooterLink = {
  color: "#98a2b3",
  margin: "0 8px",
  textDecoration: "underline",
}

export default function ContactMessageEmail({
  name,
  email,
  message,
}: ContactMessageEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New portfolio message from ${name}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
            <Section style={brandRow}>
              <span style={brandMark} />
              <span style={brandName}>{BRAND}</span>
            </Section>

            <Heading style={heading}>New message from {name}</Heading>

            <Text style={paragraph}>
              You&rsquo;ve received a new message through the contact form on{" "}
              {SITE}. The details are below — reply to {name} using the button or
              just hit reply on this email.
            </Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>

            <Text style={label}>Message</Text>
            <Text style={messageBox}>{message}</Text>

            <Button style={button} href={`mailto:${email}`}>
              Reply to {name}
            </Button>
          </Section>

          <Hr style={divider} />

          <Text style={footerInner}>
            Having trouble replying?{" "}
            <Link href={`mailto:${email}`} style={footerLink}>
              Email {name} directly
            </Link>
          </Text>

          <Text style={signOff}>
            Best,
            <br />~ {SITE}
          </Text>
        </Container>

        <Text style={outerFooter}>
          <Link href={`https://${SITE}`} style={outerFooterLink}>
            Website
          </Link>
          <Link href={`https://${SITE}/works`} style={outerFooterLink}>
            Works
          </Link>
          <Link href={`https://${SITE}/contact`} style={outerFooterLink}>
            Contact
          </Link>
          <br />
          <br />
          {`© ${new Date().getFullYear()} ${BRAND}. Sent from the contact form at ${SITE}.`}
        </Text>
      </Body>
    </Html>
  )
}
