import * as React from 'npm:react@18.3.1'
import type { TemplateEntry } from './registry.ts'

// Generic wrapper for server-built, already-escaped HTML bodies
// (admin notifications, cart reminders).
interface Props {
  subject?: string
  html?: string
}

const HtmlMessage = ({ html = '' }: Props) => (
  <html lang="lv">
    <head><meta charSet="utf-8" /></head>
    <body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#222' }}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </body>
  </html>
)

export const template = {
  component: HtmlMessage,
  subject: (d: Record<string, any>) => d.subject || 'Luxury Chocolate',
  displayName: 'HTML message',
  previewData: { subject: 'Test', html: '<h2>Test</h2><p>Hello</p>' },
} satisfies TemplateEntry
