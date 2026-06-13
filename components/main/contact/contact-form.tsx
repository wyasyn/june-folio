"use client"

import { useActionState } from "react"
import { IconLoader2, IconSend } from "@tabler/icons-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import {
  sendContactEmail,
  type ContactFormState,
} from "@/app/(main)/contact/actions"
import { Button } from "@/components/ui/button"

const initialState: ContactFormState = { status: "idle", message: "" }

const fieldClasses =
  "w-full rounded-lg border bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/40"

function FieldError({ id, error }: { id: string; error?: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-destructive"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

// Small hand-drawn check that draws itself in when a message is sent,
// matching the sketch accents used across the app.
function SketchCheck() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4 overflow-visible">
      <motion.path
        d="M4 13 Q 8 17, 10 18 Q 14 10, 20 5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </svg>
  )
}

export default function ContactForm() {
  const reduceMotion = useReducedMotion()
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState
  )
  const errors = state.errors ?? {}

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
    animate: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { delay, type: "spring" as const, stiffness: 260, damping: 24 },
  })

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <motion.div {...fadeUp(0.1)} className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClasses}
          />
          <FieldError id="name-error" error={errors.name} />
        </motion.div>

        <motion.div {...fadeUp(0.16)} className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClasses}
          />
          <FieldError id="email-error" error={errors.email} />
        </motion.div>
      </div>

      <motion.div {...fadeUp(0.22)} className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={10}
          placeholder="Tell me about your project…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClasses} resize-y`}
        />
        <FieldError id="message-error" error={errors.message} />
      </motion.div>

      <motion.div
        {...fadeUp(0.28)}
        className="flex flex-wrap items-center gap-4"
      >
        <Button
          type="submit"
          disabled={isPending}
          className="group items-center gap-2"
        >
          {isPending ? (
            <IconLoader2 className="size-4 animate-spin" />
          ) : (
            <IconSend className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
          {isPending ? "Sending…" : "Send message"}
        </Button>

        <AnimatePresence mode="wait">
          {state.status !== "idle" && !isPending && (
            <motion.p
              key={`${state.status}-${state.message}`}
              role="status"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-center gap-1.5 text-sm ${
                state.status === "success" ? "text-primary" : "text-destructive"
              }`}
            >
              {state.status === "success" && <SketchCheck />}
              {state.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </form>
  )
}
