import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SAMPLE_MARKDOWN = `# Markdown Preview

This preview supports **bold**, *italic*, and inline \`code\`.

- Edit the text above
- See updates instantly
- Try ~~GFM~~ task lists too
`;

export function Markdown() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);

  return (
    <div className="markdown-widget">
      <style>{`
        .markdown-widget {
          display: flex;
          flex: 1;
          min-height: 0;
          width: 100%;
          flex-direction: column;
          gap: 14px;
        }

        .markdown-widget__editor {
          width: 100%;
          resize: vertical;
          min-height: 132px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--panel-2);
          color: var(--text);
          padding: 12px;
          font: 14px/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          outline: none;
        }

        .markdown-widget__editor:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(124, 92, 255, 0.18);
        }

        .markdown-widget__preview {
          flex: 1;
          min-height: 0;
          overflow: auto;
          border-top: 1px solid var(--border);
          padding-top: 12px;
          line-height: 1.55;
          color: var(--text);
        }

        .markdown-widget__preview > :first-child {
          margin-top: 0;
        }

        .markdown-widget__preview > :last-child {
          margin-bottom: 0;
        }

        .markdown-widget__preview h1,
        .markdown-widget__preview h2,
        .markdown-widget__preview h3 {
          margin: 0 0 10px;
          line-height: 1.2;
        }

        .markdown-widget__preview h1 {
          font-size: 24px;
          letter-spacing: -0.02em;
        }

        .markdown-widget__preview p,
        .markdown-widget__preview ul,
        .markdown-widget__preview ol,
        .markdown-widget__preview table {
          margin: 0 0 12px;
        }

        .markdown-widget__preview ul,
        .markdown-widget__preview ol {
          padding-left: 22px;
        }

        .markdown-widget__preview li + li {
          margin-top: 4px;
        }

        .markdown-widget__preview a {
          color: var(--accent-2);
        }

        .markdown-widget__preview code {
          border-radius: 6px;
          background: var(--panel-2);
          padding: 2px 5px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.92em;
        }

        .markdown-widget__preview pre {
          overflow: auto;
          border-radius: 10px;
          background: var(--panel-2);
          padding: 12px;
        }

        .markdown-widget__preview pre code {
          padding: 0;
          background: transparent;
        }

        .markdown-widget__preview table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .markdown-widget__preview th,
        .markdown-widget__preview td {
          border: 1px solid var(--border);
          padding: 6px 8px;
        }

        .markdown-widget__preview th {
          background: var(--panel-2);
          text-align: left;
        }

        .markdown-widget__preview input[type="checkbox"] {
          accent-color: var(--accent);
        }
      `}</style>
      <textarea
        className="markdown-widget__editor"
        rows={6}
        value={markdown}
        onChange={(event) => setMarkdown(event.target.value)}
        aria-label="Markdown editor"
      />
      <div className="markdown-widget__preview" aria-label="Markdown preview">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
