# Site de desculpas interativo

Um mini-site de desculpas inspirado na mecânica do reel: várias telas em sequência, com a tela principal tendo um botão "não" que foge do toque/cursor — funcionando tanto no desktop quanto no mobile iOS (Safari).

## Fluxo de telas

1. **Intro** — título "me desculpa?" com emojis/flores, sub-texto curto e botão "continuar →".
2. **Pergunta principal** — "me perdoa?" com botão **SIM** (estático, rosa cheio) e botão **não** que **foge** sempre que o dedo/cursor chega perto. Depois de N tentativas, o "não" some ou encolhe até virar invisível.
3. **Confirmação** — "sério??? que aliviooo 😭" com botão "okay okay →".
4. **Próximo passo** — "então… quando posso te compensar?" com seletor de data + botão "marcar 💌".
5. **Tela final** — "te busco às [hora]. obrigado por não desistir de mim. 💗" com coraçõezinhos flutuando.

Espaços reservados para imagens/memes em cada tela (placeholders agora, você troca depois).

## Botão "não" fugitivo — mobile iOS de verdade

Esse é o ponto crítico. No reel funciona com mouse hover, mas no iOS não existe hover. Solução:

- Detectar **proximidade do dedo** usando `touchmove` no container inteiro da tela (não só no botão), calculando distância entre o toque e o centro do botão.
- Quando a distância < raio (ex.: 80px), o botão se desloca para a direção oposta com um pequeno offset randômico, dentro dos limites visíveis da viewport (sem nunca sair da tela).
- No desktop, mesma lógica com `mousemove`.
- Bloquear `touch-action` e `user-select` no botão pra evitar o iOS abrir menu de copiar/segurar.
- Usar `transform: translate3d(...)` (não `top/left`) pra animação suave a 60fps no Safari.
- Após 5–7 tentativas falhas, o botão encolhe e desaparece (`scale: 0`).

## Tema visual (rosa, mas distinto do reel)

Pra não parecer cópia direta:

- Paleta: rosa **coral/salmão** mais quente (não o rosa-bebê do reel) + **creme off-white** de fundo + acento **bordô** pra textos importantes.
  - Bg: `#FFF5F0`, Primário: `#FF7A8A`, Acento escuro: `#7A2E3F`, Soft: `#FFD9DC`.
- Tipografia: display **serif italic** (tipo "Instrument Serif" ou "Fraunces") pros títulos — o reel usa um slab rounded, então isso já diferencia bastante. Body em sans humanista (Plus Jakarta Sans).
- Decoração: pétalas/corações desenhados em SVG flutuando suavemente no fundo, em vez de emojis de flor.
- Cards com cantos bem arredondados, sombra suave rosada, sem o efeito "papel de caderno" do reel.

## Stack técnica

- Web app React (TanStack Start template via `add_artifact`).
- Animações com Motion (Framer Motion) — springs pros transitions de tela e pro botão fujão.
- Estado das telas via `useState` simples (sem rota separada por tela).
- Tudo client-side, sem backend.

## Fora do escopo desta primeira versão

- Imagens/memes reais (placeholders por enquanto, você manda depois).
- Persistência da resposta / envio pra alguém.
- Sons.
