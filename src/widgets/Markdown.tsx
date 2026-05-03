import { useState } from "react";
import type { CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const sampleMarkdown = `# Markdown preview

This widget renders **bold** and _italic_ text as you type.

- Edit the markdown above
- See the preview below
- Try inline \`code\``;

const textareaStyle: CSSProperties = {
  width: "100%",
  minHeight: "132px",
  resize: "vertical",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  background: "var(--panel-2)",
  color: "var(--text)",
  padding: "12px",
  font: "14px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  outline: "none",
};

const previewStyle: CSSProperties = {
  flex: 1,
  minHeight: 0,
  marginTop: "16px",
  paddingTop: "12px",
  borderTop: "1px solid var(--border)",
  overflow: "auto",
  lineHeight: 1.6,
  color: "var(--text)",
};

const inlineCodeStyle: CSSProperties = {
  background: "var(--panel-2)",
  border: "1px solid var(--border)",
  borderRadius: "5px",
  padding: "2px 5px",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  fontSize: "0.9em",
};

export function Markdown() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0, flexDirection: "column" }}>
      <textarea
        aria-label="Markdown editor"
        rows={6}
        value={markdown}
        onChange={(event) => setMarkdown(event.target.value)}
        style={textareaStyle}
        spellCheck={false}
      />

      <div style={previewStyle}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ children, ...props }) => (
              <a {...props} style={{ color: "var(--accent)", fontWeight: 600 }}>
                {children}
              </a>
            ),
            code: ({ children, ...props }) => (
              <code {...props} style={inlineCodeStyle}>
                {children}
              </code>
            ),
            h1: ({ children, ...props }) => (
              <h1 {...props} style={{ margin: "0 0 10px", fontSize: "24px" }}>
                {children}
              </h1>
            ),
            p: ({ children, ...props }) => (
              <p {...props} style={{ margin: "0 0 10px" }}>
                {children}
              </p>
            ),
            ul: ({ children, ...props }) => (
              <ul {...props} style={{ margin: "0 0 10px", paddingLeft: "22px" }}>
                {children}
              </ul>
            ),
            table: ({ children, ...props }) => (
              <table
                {...props}
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              >
                {children}
              </table>
            ),
            th: ({ children, ...props }) => (
              <th
                {...props}
                style={{
                  border: "1px solid var(--border)",
                  padding: "6px 8px",
                  textAlign: "left",
                }}
              >
                {children}
              </th>
            ),
            td: ({ children, ...props }) => (
              <td {...props} style={{ border: "1px solid var(--border)", padding: "6px 8px" }}>
                {children}
              </td>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
