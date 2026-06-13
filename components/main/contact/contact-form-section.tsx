import { connection } from "next/server"

import ContactForm from "@/components/main/contact/contact-form"

export default async function ContactFormSection() {
  await connection()
  return <ContactForm />
}
