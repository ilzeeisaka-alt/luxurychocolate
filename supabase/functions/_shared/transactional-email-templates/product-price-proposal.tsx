import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Link, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props { productName?: string; productSlug?: string; customerName?: string; customerEmail?: string; currentPrice?: string; proposedPrice?: string; quantity?: number; message?: string; lang?: string }
const Email = ({ productName, productSlug, customerName, customerEmail, currentPrice, proposedPrice, quantity, message, lang }: Props) => (
  <Html lang="lv"><Head /><Preview>Klienta cenas piedāvājums: {productName}</Preview>
    <Body style={{ backgroundColor: '#ffffff', color: '#222222', fontFamily: 'Arial, sans-serif' }}>
      <Container style={{ maxWidth: '600px', padding: '24px' }}>
        <Text style={{ color: '#94732b' }}>Luxury Chocolate</Text>
        <Heading as="h1" style={{ fontSize: '22px' }}>Jauns klienta cenas piedāvājums</Heading>
        <Text>Produkts: {productName}</Text>
        <Text>Veikala cena par vienību: {currentPrice}</Text>
        <Text style={{ fontWeight: 'bold' }}>Klienta vēlamā cena par vienību: {proposedPrice}</Text>
        <Text>Daudzums: {quantity} gab.</Text>
        <Text>Klients: {customerName} · {customerEmail}</Text>
        <Text>Lapas valoda: {lang}</Text>
        {message && <Text style={{ whiteSpace: 'pre-wrap' }}>Komentārs: {message}</Text>}
        <Text><Link href={`https://luxurychocolate.lv/veikals/${encodeURIComponent(productSlug ?? '')}`}>Atvērt produktu</Link></Text>
        <Text><Link href="https://luxurychocolate.lv/admin?tab=price-proposals">Atvērt cenas piedāvājumus admin panelī</Link></Text>
      </Container>
    </Body>
  </Html>
)
export const template = { component: Email, subject: 'Klienta cenas piedāvājums — Luxury Chocolate', displayName: 'Klienta cenas piedāvājums', to: 'ilze.eisaka@gmail.com', previewData: { productName: 'Personalizēta šokolāde', currentPrice: '25,00 €', proposedPrice: '20,00 €', quantity: 50, customerName: 'Klients', customerEmail: 'client@example.com', lang: 'lv' } } satisfies TemplateEntry