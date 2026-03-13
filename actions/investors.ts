"use server"
import { InvestorSchema } from "@/lib/validations"

export async function submitInvestor(prevState: unknown, formData: FormData) {
  const raw    = Object.fromEntries(formData)
  const result = InvestorSchema.safeParse(raw)

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  await new Promise((r) => setTimeout(r, 900))
  return { success: true, errors: {} as Record<string, string[]> }
}
