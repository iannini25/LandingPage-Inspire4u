"use server"
import { ContactSchema } from "@/lib/validations"

export async function submitContact(prevState: unknown, formData: FormData) {
  const raw    = Object.fromEntries(formData)
  const result = ContactSchema.safeParse(raw)

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  // Integração email — descomentar quando RESEND_API_KEY estiver configurada
  // import { Resend } from "resend"
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({ ... })

  await new Promise((r) => setTimeout(r, 900))
  return { success: true, errors: {} as Record<string, string[]> }
}
