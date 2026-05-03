# demotestapp

Vite + React + TypeScript demo with 4 independent mini-tools, each on its own
route. Used to demo 4 termloop agents working in parallel — each agent owns one
page file, no shared state, no merge conflicts.

## Run

```sh
npm install
npm run dev
```

Visit `http://localhost:5173` — home page links to all 4 tools.

## Layout

```
src/
  main.tsx          router + routes (do not edit)
  Layout.tsx        shared header (do not edit)
  styles.css        global styles (extend if you need to)
  pages/
    Home.tsx        4 cards (do not edit)
    Clock.tsx       ← agent 1 owns this file
    Qr.tsx          ← agent 2 owns this file
    Markdown.tsx    ← agent 3 owns this file
    Color.tsx       ← agent 4 owns this file
```

Each agent edits **only their own page file**. Add new component files under
`src/pages/<tool>/` if you want, but never touch another agent's page.

## Per-agent task specs

Each spec is fully self-contained — no clarification needed. Replace the
placeholder in the assigned page file with a working implementation. Keep the
existing `<div className="page">` wrapper and `← Back` link.

### 1. Clock — `src/pages/Clock.tsx`

Build a live clock that ticks every second.

- Show an analog clock (SVG, ~240px, dark face, accent-colored hands) with
  hour, minute, and second hands. Use the existing `--accent` and `--accent-2`
  CSS variables.
- Below it, show the current time as `HH:MM:SS` in a large monospace font.
- Update via `setInterval(1000)` inside `useEffect`. Clean up on unmount.
- No props, no external libs beyond what's already installed.

### 2. QR Generator — `src/pages/Qr.tsx`

Build a live QR code generator.

- Single `<textarea>` (rows=3, full width) — placeholder text
  `"Type anything…"`, default value `"https://github.com"`.
- Below it, render a QR code (~256px) of the textarea's current value using
  `qrcode.react` (already installed): `import { QRCodeSVG } from "qrcode.react"`.
- Use a white QR on dark page background; wrap it in a white rounded box
  (`padding: 16px; border-radius: 12px`) so it scans cleanly.
- If the textarea is empty, hide the QR and show the muted text
  `"Type something to generate a QR code."`.

### 3. Markdown Preview — `src/pages/Markdown.tsx`

Build a side-by-side markdown editor.

- Two-column grid (1fr 1fr, 24px gap). Left: full-height `<textarea>` with a
  monospace font. Right: rendered markdown.
- Use `react-markdown` with `remark-gfm` (both already installed) for GFM
  features (tables, task lists, strikethrough).
- Default textarea value should be a short markdown sample showing a heading,
  bold/italic, a list, a link, and an inline `code` example so the preview
  looks alive on first load.
- Style the rendered side: readable line height, accent color for links,
  subtle border on tables, padded inline code with the panel-2 background.
- On screens narrower than 720px, stack the columns.

### 4. Color Picker — `src/pages/Color.tsx`

Build an RGB color picker.

- Three labeled sliders (`R`, `G`, `B`), each `min=0 max=255`, default
  `124, 92, 255` (matches the app accent).
- A large square preview (~240px) showing the current color, with rounded
  corners and a 1px border.
- Below the preview, show the hex code (e.g. `#7C5CFF`) in a large monospace
  font and an `rgb(r, g, b)` line under it in muted color.
- A "Copy hex" button that writes the hex to the clipboard
  (`navigator.clipboard.writeText`) and briefly shows "Copied!" for 1.5s.

## Done = working in `npm run dev`

Each agent's task is done when:
1. `npm run build` passes (no TS errors).
2. The page works correctly in `npm run dev`.
3. A PR is opened against `main`.
