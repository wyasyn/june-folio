import ContactForm from "@/components/main/contact/contact-form"
import SocialIcons from "@/components/main/home/social-icons"

export const metadata = {
  title: "Contact — Yasin Walum",
  description: "Get in touch about a project or just say hello.",
}

export default function ContactPage() {
  return (
    <div className="container max-w-3xl pb-12 pt-12 md:pb-24 md:pt-24">
      <h1 className="text-3xl font-bold md:text-4xl">Get in touch</h1>
      <p className="mt-2 max-w-prose">
        Have a project in mind or just want to say hello? Drop a message and I
        will get back to you as soon as I can.
      </p>

      <div className="mt-8 md:mt-12">
        <ContactForm />
      </div>

      <div className="mt-12 md:mt-16">
        <p className="text-sm font-medium text-foreground">Or find me on</p>
        <div className="mt-3">
          <SocialIcons />
        </div>
      </div>
    </div>
  )
}
