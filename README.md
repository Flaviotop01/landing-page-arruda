# Landing Page — Arruda Serviços

Projeto institucional da Arruda Serviços.

Página única, estática, em HTML/CSS/JS — apresenta a trajetória de 25 anos da empresa, estrutura, ramos de atuação, projetos, governança de SSMA e dados institucionais. Sem CTAs comerciais.

## Stack

- HTML estático
- CSS puro (sem build)
- JavaScript vanilla + React (via CDN) para o painel de Tweaks
- Fontes: Newsreader, IBM Plex Sans, IBM Plex Mono (Google Fonts)

## Estrutura

```
.
├── index.html         # página principal
├── styles.css         # estilos completos (mobile-first)
├── tweaks-panel.jsx   # shell de tweaks (React)
├── tweaks-app.jsx     # tweaks específicos do projeto
├── vercel.json        # configuração de deploy
└── assets/
    └── photos/        # fotos operacionais
```

## Deploy

Hospedado na Vercel via GitHub.

### Publicar pela primeira vez

```bash
git init
git add .
git commit -m "feat: landing page Arruda Serviços"
gh repo create landing-page-arruda --public --source=. --push
```

Depois, em [vercel.com/new](https://vercel.com/new), importe o repositório `landing-page-arruda`. Como é estático, não há build command.

### Atualizar

```bash
git add .
git commit -m "chore: ajustes de copy"
git push
```

A Vercel publica automaticamente a cada push para `main`.

## Desenvolvimento local

Como é estático, basta abrir `index.html` em qualquer servidor:

```bash
npx serve .
# ou
python3 -m http.server 8000
```

## Responsividade

Breakpoints:

- `≤ 480px` — mobile pequeno
- `≤ 768px` — mobile / tablet (drawer + hamburger)
- `≤ 1024px` — tablet
- `> 1024px` — desktop

---

© 2001 — 2026 · Arruda Serviços
