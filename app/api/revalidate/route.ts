import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

import { getTagsForSanityDocument } from "@/sanity/lib/revalidate-tags"

type WebhookPayload = {
  _type?: string
  slug?: string | null
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET

    if (!secret) {
      return NextResponse.json(
        { message: "Missing SANITY_REVALIDATE_SECRET" },
        { status: 500 }
      )
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true
    )

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      )
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type in payload" }, { status: 400 })
    }

    const tags = getTagsForSanityDocument(body)

    for (const tag of tags) {
      revalidateTag(tag, "max")
    }

    return NextResponse.json({
      revalidated: true,
      tags,
      documentType: body._type,
      slug: body.slug ?? null,
    })
  } catch (error) {
    console.error("Sanity revalidation webhook failed:", error)
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ message }, { status: 500 })
  }
}
