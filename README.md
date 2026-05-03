# demotestapp

Vite + React + TypeScript demo with 4 mini-tools rendered side-by-side on a
single page. Used to demo 4 termloop agents working in parallel — each agent
owns one widget file, no shared state, no merge conflicts.

Test marker: PR-to-dev merge flow verified on 2026-05-03.

## Run

```sh
npm install
npm run dev
```

Visit `http://localhost:5173` — single page, 2x2 grid of all 4 widgets.

## Layout

```
src/
  main.tsx              entry (do not edit)
  App.tsx               header + 2x2 tile grid (do not edit)
  styles.css            global styles (extend if you need to)
  widgets/
    Clock.tsx           ← agent 1 owns this file
    Qr.tsx              ← agent 2 owns this file
    Markdown.tsx        ← agent 3 owns this file
    Color.tsx           ← agent 4 owns this file
```

Each agent edits **only their own widget file**. Each widget renders inside a
tile (`<div className="tile-body">`) that is roughly 500×340px on desktop and
full-width on mobile. Design your widget to fit comfortably in that space.

## Per-agent task specs

Each spec is fully self-contained — no clarification needed. Replace the
placeholder export in the assigned file with a real implementation. Use the
existing CSS variables (`--accent`, `--accent-2`, `--panel-2`, `--muted`,
`--border`, `--text`) so all widgets feel consistent.

### 1. Clock — `src/widgets/Clock.tsx`

Build a live clock that ticks every second.

- Show an analog clock (SVG, ~180px square, dark face, accent-colored hands)
  with hour, minute, and second hands. Hour marks at 12/3/6/9.
- Below it, the current time as `HH:MM:SS` in monospace, ~22px.
- Update via `setInterval(1000)` inside `useEffect`. Clean up on unmount.
- Center horizontally and vertically inside the tile body.

### 2. QR Generator — `src/widgets/Qr.tsx`

Build a live QR code generator.

- Single `<textarea>` (rows=2, full width) with placeholder `"Type anything…"`
  and default value `"https://github.com"`.
- Below it, render a QR (~180px) of the textarea's current value using
  `qrcode.react` (already installed): `import { QRCodeSVG } from "qrcode.react"`.
- White QR on a white rounded box (`padding: 12px; border-radius: 10px`) so it
  scans cleanly against the dark tile.
- If the textarea is empty, hide the QR and show muted text
  `"Type something to generate a QR code."` centered in its place.

### 3. Markdown Preview — `src/widgets/Markdown.tsx`

Build a stacked markdown editor (tile is too narrow for true side-by-side).

- Top: `<textarea>` with monospace font, ~6 rows, full width.
- Bottom: rendered markdown of the textarea value, with a top border
  separator and `padding-top: 12px`.
- Use `react-markdown` with `remark-gfm` (both already installed) for GFM
  features (tables, task lists, strikethrough).
- Default textarea value should be a short markdown sample showing a heading,
  bold/italic, a list, and an inline `code` example so the preview looks
  alive on first load.
- Style the rendered side: readable line height, accent color for links,
  padded inline code with `--panel-2` background.

### 4. Color Picker — `src/widgets/Color.tsx`

Build an RGB color picker.

- Three labeled sliders (`R`, `G`, `B`) stacked vertically, each
  `min=0 max=255`, default `124, 92, 255` (matches the app accent).
- A horizontal preview bar (~64px tall, full width) showing the current
  color, with rounded corners.
- Below the preview, the hex code (e.g. `#7C5CFF`) in monospace ~20px and an
  `rgb(r, g, b)` line under it in muted color.
- A small "Copy hex" button next to the hex that writes to the clipboard
  (`navigator.clipboard.writeText`) and briefly shows "Copied!" for 1.5s.

## Done = working in `npm run dev`

Each agent's task is done when:
1. `npm run build` passes (no TS errors).
2. The widget renders correctly in `npm run dev` inside its tile.
3. A PR is opened against `main`.



When your work is done, after you implement all code changes, use running your application skill to show your changes. 
When you open PR, open as active, not draft.
