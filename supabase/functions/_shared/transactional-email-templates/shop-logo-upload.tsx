import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ShopLogoUploadEmailProps {
  fileName?: string
  fileType?: string
  fileSize?: string
  logoUrl?: string
  isImage?: boolean
}

export const ShopLogoUploadEmail = ({
  fileName = 'fails',
  fileType = 'unknown',
  fileSize = 'Nav zināms',
  logoUrl = '',
  isImage = false,
}: ShopLogoUploadEmailProps) => (
  <Html>
    <Head />
    <Preview>Jauns fails augšupielādēts — {fileName}</Preview>
    <Body style={{ backgroundColor: '#f6f6f6', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <Container style={{ backgroundColor: '#ffffff', padding: '24px', maxWidth: '600px' }}>
        <Heading as="h2" style={{ fontSize: '20px', margin: '0 0 16px' }}>
          Jauns logo/fails augšupielādēts no interneta veikala
        </Heading>
        <Text style={{ fontSize: '14px' }}>
          <strong>Faila nosaukums:</strong> {fileName}
        </Text>
        <Text style={{ fontSize: '14px' }}>
          <strong>Tips:</strong> {fileType}
        </Text>
        <Text style={{ fontSize: '14px' }}>
          <strong>Izmērs:</strong> {fileSize}
        </Text>
        {logoUrl ? (
          <Text style={{ fontSize: '14px' }}>
            <strong>Faila saite: </strong>
            <Link href={logoUrl}>{logoUrl}</Link>
          </Text>
        ) : null}
        {isImage && logoUrl ? (
          <Img
            src={logoUrl}
            alt="Klienta augšupielādētais fails"
            style={{ maxWidth: '400px', maxHeight: '300px' }}
          />
        ) : null}
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ShopLogoUploadEmail,
  displayName: 'Veikalā augšupielādēts logo',
  subject: (data: Record<string, any>) =>
    `Jauns fails augšupielādēts — ${data?.fileName ?? 'fails'}`,
  previewData: {
    fileName: 'logo.png',
    fileType: 'image/png',
    fileSize: '24576 B',
    logoUrl: 'https://luxurychocolate.lv/logo.png',
    isImage: true,
  },
} satisfies TemplateEntry
