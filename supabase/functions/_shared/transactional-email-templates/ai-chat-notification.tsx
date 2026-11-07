import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Link, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  conversationId?: string
  question?: string
  answer?: string
  lang?: string
  occurredAt?: string
}

const ChatNotification = ({ conversationId, question, answer, lang, occurredAt }: Props) => (
  <Html lang="lv">
    <Head />
    <Preview>Klients jautāja: {question || 'Jauna AI saruna'}</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#222222' }}>
      <Container style={{ padding: '24px', maxWidth: '600px' }}>
        <Text style={{ color: '#94732b' }}>Luxury Chocolate</Text>
        <Heading as="h1" style={{ fontSize: '22px' }}>Klients sarunājās ar AI asistentu</Heading>
        <Text>Laiks: {occurredAt || 'Nav norādīts'} · Lapas valoda: {lang || 'Nav norādīta'}</Text>
        <Heading as="h2" style={{ fontSize: '16px' }}>Klienta jautājums</Heading>
        <Text style={{ whiteSpace: 'pre-wrap' }}>{question || 'Nav norādīts'}</Text>
        <Heading as="h2" style={{ fontSize: '16px' }}>Asistenta atbilde</Heading>
        <Text style={{ whiteSpace: 'pre-wrap' }}>{answer || 'Atbilde nav pieejama'}</Text>
        <Link href={`https://luxurychocolate.lv/admin?tab=chats&conversation=${encodeURIComponent(conversationId || '')}`}>Atvērt pilnu sarunu admin panelī</Link>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ChatNotification,
  subject: 'Jauna klienta saruna ar AI asistentu — Luxury Chocolate',
  displayName: 'AI sarunas paziņojums administratoram',
  to: 'ilze.eisaka@gmail.com',
  previewData: { conversationId: '', question: 'Vai iespējama šokolāde ar uzņēmuma logo?', answer: 'Jā, pasūtījumi iespējami no 1 gabala.', lang: 'lv', occurredAt: '07.11.2026. 10:15' },
} satisfies TemplateEntry