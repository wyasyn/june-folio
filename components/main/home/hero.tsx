import Link from "next/link"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { IconExternalLink } from "@tabler/icons-react"
import SocialIcons from "./social-icons"

export default function HeroSection() {
  return (
    <section className="container pt-12 md:pt-32">
      <header className="flex items-center gap-5 sm:gap-6">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-muted sm:size-24">
        <Image src="https://res.cloudinary.com/dkdteb9m5/image/upload/v1731179025/personal%20finance/lj5hjqhmvaeqdsrfcwky.jpg" alt="June" fill className="object-cover" priority />
        </div>

        <div className="flex flex-col items-start gap-1 sm:gap-1.5">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
           Yasin Walum
          </h1>
          <p className="text-sm sm:text-base">Software Engineer</p>
          <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            variant="secondary"
            className=" items-center gap-2 "
          >
            <Link  href="/works"><span>My Works</span><IconExternalLink className="size-4" /> </Link> 
          </Button>
          </div>
        
        </div>
      </header>
      <p className="mt-8 md:mt-12 max-w-prose">
        <span className=" font-bold text-foreground ">Yasin</span> is Uganda based software engineer with a passion for building <span className="font-bold text-foreground">web</span> & <span className="font-bold text-foreground">mobile</span> applications that are fast, scalable, and easy to use.
      </p>

      <div className="mt-8 md:mt-12">
        <SocialIcons />
      </div>
    </section>
  )
}
