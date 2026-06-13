"use server"

import { Resend } from "resend"

import ContactMessageEmail from "@/emails/contact-message"

export type ContactFieldErrors = {
  name?: string
  email?: string
  message?: string
}

export type ContactFormState = {
  status: "idle" | "success" | "error"
  message: string
  errors?: ContactFieldErrors
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  const errors: ContactFieldErrors = {}
  if (!name) errors.name = "Please enter your name."
  if (!email) errors.email = "Please enter your email."
  else if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right."
  if (!message) errors.message = "Please enter a message."
  else if (message.length < 10)
    errors.message = "Your message is a little short."

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
    }
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      status: "error",
      message:
        "The contact form isn't configured yet — please reach out through my social links instead.",
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <mail@frompaandassociates.com>",
    to: process.env.CONTACT_EMAIL ?? "ywalum@gmail.com",
    replyTo: email,
    subject: `New message from ${name}`,
    react: <ContactMessageEmail name={name} email={email} message={message} />,
    text: `From: ${name} <${email}>\n\n${message}`,
  })

  if (error) {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
    }
  }

  return { status: "success", message: "Thanks! Your message is on its way." }
}
