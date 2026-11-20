import * as React from 'npm:react@18.3.1';
import { Body, Container, Head, Heading, Html, Link, Preview, Text } from 'npm:@react-email/components@0.0.22';
import type { TemplateEntry } from './registry.ts';
interface Props { orderNumber?: string; customerName?: string; total?: string; items?: { product_name: string; quantity: number }[]; invoiceUrl?: string; visualizationUrl?: string }
const Email = ({ orderNumber, customerName, total, items = [], invoiceUrl, visualizationUrl }: Props) => <Html lang="lv"><Head /><Preview>Jūsu pasūtījuma rēķins un vizualizācija — {orderNumber}</Preview>
  <Body style={{ backgroundColor: '#ffffff', color: '#222222', fontFamily: 'Arial, sans-serif' }}>
    <Container style={{ maxWidth: '600px', padding: '24px' }}>
      <Text style={{ color: '#94732b' }}>Luxury Chocolate</Text>
      <Heading as="h1" style={{ fontSize: '22px' }}>Jūsu pasūtījuma dokumenti</Heading>
      <Text>{customerName || 'Sveiki'}!</Text><Text>Pasūtījums: {orderNumber}</Text>
      {items.map((item, index) => <Text key={index}>{item.product_name} × {item.quantity}</Text>)}
      <Text>Kopā: {total}</Text>
      <Text><Link href={invoiceUrl}>Atvērt savu rēķinu</Link></Text>
      <Text><Link href={visualizationUrl}>Atvērt savu pasūtījuma vizualizāciju</Link></Text>
      <Text>Dokumenti pieejami, pieslēdzoties kontā, kurā noformējāt pasūtījumu. Tos var apskatīt, izdrukāt un saglabāt PDF.</Text>
      <Text>info@luxurychocolate.lv · +371 26 177 853</Text>
    </Container>
  </Body></Html>;
export const template = { component: Email, subject: (data: Record<string, any>) => `Jūsu pasūtījuma dokumenti ${data.orderNumber ?? ''} — Luxury Chocolate`, displayName: 'Klienta pasūtījuma dokumenti', previewData: { orderNumber: 'ORD-EXAMPLE', customerName: 'Klients', total: '25,00 €', invoiceUrl: 'https://luxurychocolate.lv/account', visualizationUrl: 'https://luxurychocolate.lv/account' } } satisfies TemplateEntry;
