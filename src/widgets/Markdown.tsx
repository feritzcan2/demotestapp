import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DEFAULT_MARKDOWN = `# Markdown preview

This sample has **bold text**, *italic text*, and inline \`code\`.

- Edit the text above
- See GitHub-flavored markdown below
- Try ~~strikethrough~~ or task lists`;

export function Markdown() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  return (
    <div className="markdown-widget">
      <style>{`
        .markdown-widget {
          display: flex;
          flex: 1;
          min-height: 0;
          flex-direction: column;
          gap: 14px;
        }

        .markdown-editor {
          width: 100%;
          min-height: 132px;
          resize: vertical;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--panel-2);
          color: var(--text);
          padding: 12px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 13px;
          line-height: 1.45;
          outline: none;
        }

        .markdown-editor:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(124, 92, 255, 0.16);
        }

        .markdown-preview {
          flex: 1;
          min-height: 0;
          overflow: auto;
          border-top: 1px solid var(--border);
          padding-top: 12px;
          line-height: 1.6;
        }

        .markdown-preview > :first-child {
          margin-top: 0;
        }

        .markdown-preview > :last-child {
          margin-bottom: 0;
        }

        .markdown-preview h1,
        .markdown-preview h2,
        .markdown-preview h3 {
          margin: 0 0 8px;
          line-height: 1.2;
        }

        .markdown-preview p,
        .markdown-preview ul,
        .markdown-preview ol,
        .markdown-preview table {
          margin: 0 0 10px;
        }

        .markdown-preview a {
          color: var(--accent-2);
        }

        .markdown-preview code {
          border-radius: 5px;
          background: var(--panel-2);
          padding: 2px 5px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 0.92em;
        }

        .markdown-preview pre {
          overflow-x: auto;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--panel-2);
          padding: 10px;
        }

        .markdown-preview pre code {
          padding: 0;
          background: transparent;
        }

        .markdown-preview table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .markdown-preview th,
        .markdown-preview td {
          border: 1px solid var(--border);
          padding: 5px 7px;
        }

        .markdown-preview blockquote {
          margin: 0 0 10px;
          border-left: 3px solid var(--accent);
          padding-left: 10px;
          color: var(--muted);
        }
      `}</style>
      <textarea
        className="markdown-editor"
        rows={6}
        value={markdown}
        onChange={(event) => setMarkdown(event.target.value)}
        aria-label="Markdown editor"
      />
      <div className="markdown-preview" aria-label="Markdown preview">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
