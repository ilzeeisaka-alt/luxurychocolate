import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Img, Link, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
interface Props { id?: string; productName?: string; customerName?: string; customerEmail?: string; idea?: string; lang?: string; imageUrl?: string }
const Email = ({ id, productName, customerName, customerEmail, idea, lang, imageUrl }: Props) => (
  <Html lang="lv"><Head /><Preview>Jauna klienta vizualizācija: {productName}</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#222222' }}>
      <Container style={{ padding: '24px', maxWidth: '600px' }}>
        <Text style={{ color: '#94732b' }}>Luxury Chocolate</Text>
        <Heading as="h1" style={{ fontSize: '22px' }}>Klients izveidoja produkta vizualizāciju</Heading>
        <Text>Klients: {customerName} · {customerEmail}</Text><Text>Produkts: {productName}</Text><Text>Lapas valoda: {lang}</Text>
        <Text style={{ whiteSpace: 'pre-wrap' }}>Ideja: {idea}</Text>
        {imageUrl && <><Img src={imageUrl} alt="Klienta produkta vizualizācija" width="500" style={{ width: '100%', maxWidth: '500px' }} /><Link href={imageUrl}>Lejupielādēt attēlu (saite derīga 7 dienas)</Link></>}
        <Text><Link href={`https://luxurychocolate.lv/admin?tab=visualizations&visualization=${encodeURIComponent(id ?? '')}`}>Atvērt vizualizācijas admin panelī</Link></Text>
      </Container>
    </Body>
  </Html>
)
export const template = { component: Email, subject: 'Jauna klienta produkta vizualizācija — Luxury Chocolate', displayName: 'Produkta vizualizācija administratoram', to: 'ilze.eisaka@gmail.com', previewData: { customerName: 'Klients', customerEmail: 'client@example.com', productName: 'Personalizēta šokolāde', idea: 'Logo uz iepakojuma', lang: 'lv' } } satisfies TemplateEntry