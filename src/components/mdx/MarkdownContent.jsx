import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Link } from 'react-router-dom';

/**
 * Componente para renderizar conteúdo Markdown formatado
 */
export default function MarkdownContent({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        // Headings
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold mb-6 mt-8 text-foreground border-b pb-3">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold mb-4 mt-8 text-foreground">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-semibold mb-3 mt-6 text-foreground">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-semibold mb-2 mt-4 text-foreground">
            {children}
          </h4>
        ),

        // Paragraphs
        p: ({ children }) => (
          <p className="text-base leading-7 mb-4 text-muted-foreground">
            {children}
          </p>
        ),

        // Lists
        ul: ({ children }) => (
          <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-muted-foreground">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-muted-foreground">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-7">
            {children}
          </li>
        ),

        // Links
        a: ({ href, children }) => {
          const isExternal = href?.startsWith('http');
          if (isExternal) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                {children}
              </a>
            );
          }
          return (
            <Link to={href} className="text-primary hover:underline font-medium">
              {children}
            </Link>
          );
        },

        // Code
        code: ({ inline, className, children }) => {
          if (inline) {
            return (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
                {children}
              </code>
            );
          }
          return (
            <code className={`block bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4 ${className}`}>
              {children}
            </code>
          );
        },

        // Pre (for code blocks)
        pre: ({ children }) => (
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
            {children}
          </pre>
        ),

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary bg-muted/50 pl-4 py-2 my-4 italic text-muted-foreground">
            {children}
          </blockquote>
        ),

        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-border">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-muted">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-border">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="border-b border-border">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left font-semibold text-foreground border border-border">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-muted-foreground border border-border">
            {children}
          </td>
        ),

        // Horizontal Rule
        hr: () => (
          <hr className="my-8 border-border" />
        ),

        // Strong (bold)
        strong: ({ children }) => (
          <strong className="font-bold text-foreground">
            {children}
          </strong>
        ),

        // Em (italic)
        em: ({ children }) => (
          <em className="italic">
            {children}
          </em>
        ),

        // Images
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="rounded-lg my-6 max-w-full h-auto shadow-md"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}




