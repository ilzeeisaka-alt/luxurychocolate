import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface OfferRequestEmailProps {
  name?: string
  company?: string
  email?: string
  phone?: string
  size?: string
  packaging?: string
  purpose?: string
  quantity?: string
  message?: string
  logoUrl?: string | null
  lang?: string
}

const NA = 'Nav norādīts'

const row: React.CSSProperties = { padding: '8px', fontSize: '14px' }
const labelCell: React.CSSProperties = { ...row, fontWeight: 'bold', width: '35%' }

export const OfferRequestEmail = ({
  name = '',
  company = '',
  email = '',
  phone,
  size,
  packaging,
  purpose,
  quantity,
  message,
  logoUrl,
}: OfferRequestEmailProps) => (
  <Html>
    <Head />
    <Preview>Jauns piedāvājuma pieprasījums no {company || name}</Preview>
    <Body style={{ backgroundColor: '#f6f6f6', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <Container style={{ backgroundColor: '#ffffff', padding: '24px', maxWidth: '600px' }}>
        <Heading as="h2" style={{ fontSize: '20px', margin: '0 0 16px' }}>
          Jauns piedāvājuma pieprasījums
        </Heading>
        <Section>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              <tr>
                <td style={labelCell}>Vārds:</td>
                <td style={row}>{name}</td>
              </tr>
              <tr>
                <td style={labelCell}>Uzņēmums:</td>
                <td style={row}>{company}</td>
              </tr>
              <tr>
                <td style={labelCell}>E-pasts:</td>
                <td style={row}>{email}</td>
              </tr>
              <tr>
                <td style={labelCell}>Telefons:</td>
                <td style={row}>{phone || NA}</td>
              </tr>
              <tr>
                <td style={labelCell}>Izmērs:</td>
                <td style={row}>{size || NA}</td>
              </tr>
              <tr>
                <td style={labelCell}>Iepakojums:</td>
                <td style={row}>{packaging || NA}</td>
              </tr>
              <tr>
                <td style={labelCell}>Pielietošana:</td>
                <td style={row}>{purpose || NA}</td>
              </tr>
              <tr>
                <td style={labelCell}>Daudzums:</td>
                <td style={row}>{quantity || NA}</td>
              </tr>
              <tr>
                <td style={labelCell}>Ziņojums:</td>
                <td style={row}>{message || NA}</td>
              </tr>
            </tbody>
          </table>
        </Section>
        {logoUrl ? (
          <Text style={{ fontSize: '14px' }}>
            <strong>Logo fails: </strong>
            <Link href={logoUrl}>{logoUrl}</Link>
          </Text>
        ) : (
          <Text style={{ fontSize: '14px', fontStyle: 'italic' }}>Logo nav pievienots</Text>
        )}
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OfferRequestEmail,
  displayName: 'Piedāvājuma pieprasījums',
  subject: (data: Record<string, any>) =>
    `Jauns pieprasījums no ${data?.company ?? ''} — ${data?.name ?? ''}`,
  previewData: {
    name: 'Jānis Bērziņš',
    company: 'Confero Technologies SIA',
    email: 'janis@example.com',
    phone: '+371 20000000',
    size: '6 cm',
    packaging: 'Maisiņš ar lentīti',
    purpose: 'Konferences dāvana',
    quantity: '200',
    message: 'Vēlamies logo apdruku zeltā.',
    logoUrl: 'https://luxurychocolate.lv/logo.png',
  },
} satisfies TemplateEntry
