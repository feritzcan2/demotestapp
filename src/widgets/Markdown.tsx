import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SAMPLE_MARKDOWN = `# Markdown Preview

This editor supports **bold**, _italic_, and inline \`code\`.

- Write markdown above
- Preview updates live
- Try GFM features too`;

export function Markdown() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);

  return (
    <div style={styles.wrapper}>
      <textarea
        aria-label="Markdown editor"
        rows={6}
        value={markdown}
        onChange={(event) => setMarkdown(event.target.value)}
        style={styles.editor}
        spellCheck="false"
      />
      <div style={styles.preview}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node: _node, ...props }) => <a {...props} style={styles.link} />,
            code: ({ node: _node, ...props }) => (
              <code {...props} style={styles.inlineCode} />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flex: 1,
    minHeight: 0,
    flexDirection: "column",
    gap: 12,
  },
  editor: {
    width: "100%",
    minHeight: 132,
    resize: "vertical",
    border: "1px solid var(--border)",
    borderRadius: 10,
    background: "var(--panel-2)",
    color: "var(--text)",
    padding: 12,
    font: '14px/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    outlineColor: "var(--accent)",
  },
  preview: {
    flex: 1,
    minHeight: 0,
    overflow: "auto",
    borderTop: "1px solid var(--border)",
    paddingTop: 12,
    lineHeight: 1.6,
    color: "var(--text)",
  },
  link: {
    color: "var(--accent-2)",
  },
  inlineCode: {
    background: "var(--panel-2)",
    border: "1px solid var(--border)",
    borderRadius: 5,
    padding: "0.1em 0.35em",
    fontSize: "0.9em",
  },
} as const;
