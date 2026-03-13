# CLAUDE.md — Inspire4U

## Sobre
Site institucional da Inspire4U — consultoria de Governança Corporativa para fintechs.
Estilo: "VOID VIOLET" — inspirado em Anius, Halo, Nebula, Nexus mas 100% único.
Cor primária: #4B0082 (violeta institucional) com família de 8 variações.

## Stack
Next.js 15 · TypeScript · Tailwind v4 · GSAP + @gsap/react · Lenis · R3F (Three.js)

## Comandos
- `pnpm dev`   — desenvolvimento
- `pnpm build` — build de produção

## Fontes
- Display (headlines): Syne — var(--font-display)
- Body (texto): DM Sans — var(--font-body)
- Mono (labels): Geist Mono — var(--font-mono)

## Logos (IMPORTANTE)
Todos os logos são referenciados com <Image> da Next.js.
Os arquivos REAIS devem ser colocados em: /public/images/

| Arquivo                              | Onde é usado                    | Dimensões  |
|--------------------------------------|---------------------------------|------------|
| logo-inspire4u-white.png             | Header                          | 120×28px   |
| logo-inspire4u.png                   | Footer                          | 130×32px   |
| logo-athena7.png                     | Mockup no hero                  | 90×22px    |
| logo-athena7-white.png               | Seção Athena7 + página /athena7 | 180×44px   |
| og-image.png                         | Open Graph                      | 1200×630px |

Enquanto as logos reais não existem, um fallback visual elegante é exibido automaticamente.

## Design Tokens
Ver app/globals.css — seção :root.
NUNCA usar valores hardcoded. Sempre var(--nome).

## GSAP
- Sempre usar useGSAP de @gsap/react (não useEffect)
- Sempre verificar prefers-reduced-motion
- Sempre usar scope do sectionRef
- ScrollTrigger: usar once: true em animações não-interativas
- Lenis integrado: não usar scroll-behavior: smooth no CSS

## Adicionar nova seção
1. Criar em components/sections/NomeSection.tsx
2. Adicionar RevealOnScroll nos elementos
3. Adicionar useGSAP com scope + reduced-motion check
4. Importar em app/page.tsx
5. Usar tokens CSS — nunca valores hardcoded

## Variáveis de ambiente
RESEND_API_KEY=re_... (para envio real de emails — opcional no dev)
