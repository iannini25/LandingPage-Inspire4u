import { z } from "zod"

export const ContactSchema = z.object({
  name:    z.string().min(2, "Nome muito curto").max(100),
  company: z.string().min(1, "Empresa obrigatória").max(100),
  email:   z.string().email("E-mail inválido"),
  message: z.string().min(10, "Mensagem muito curta").max(2000),
})

export const InvestorSchema = z.object({
  name:         z.string().min(2, "Nome obrigatório").max(100),
  company:      z.string().min(1, "Empresa obrigatória").max(100),
  email:        z.string().email("E-mail inválido"),
  interestType: z.enum([
    "Investimento Estratégico",
    "Parceria de Negócios",
    "Fusão ou Aquisição (M&A)",
    "Outro"
  ], { required_error: "Selecione um tipo de interesse" }),
  message: z.string().max(2000).optional(),
})

export type ContactInput  = z.infer<typeof ContactSchema>
export type InvestorInput = z.infer<typeof InvestorSchema>
