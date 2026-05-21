import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface NewsletterNotificationProps {
  subscriberEmail?: string
  source?: string
  submittedAt?: string
}

const NewsletterNotificationEmail = ({
  subscriberEmail,
  source,
  submittedAt,
}: NewsletterNotificationProps) => (
  <Html lang="nb" dir="ltr">
    <Head />
    <Preview>Ny nyhetsbrev-påmelding</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Ny nyhetsbrev-påmelding</Heading>
        <Text style={text}>En ny person har meldt seg på nyhetsbrevet.</Text>
        <Text style={row}><strong style={label}>E-post:</strong> {subscriberEmail}</Text>
        {source ? <Text style={row}><strong style={label}>Kilde:</strong> {source}</Text> : null}
        {submittedAt ? <Text style={row}><strong style={label}>Tidspunkt:</strong> {submittedAt}</Text> : null}
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewsletterNotificationEmail,
  subject: 'Ny nyhetsbrev-påmelding',
  displayName: 'Nyhetsbrev-påmelding (intern)',
  previewData: {
    subscriberEmail: 'ny.kunde@eksempel.no',
    source: 'landing_page',
    submittedAt: new Date().toLocaleString('nb-NO'),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Poppins, Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '600px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#2a0a4a', margin: '0 0 12px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.5', margin: '0 0 20px' }
const row = { fontSize: '14px', color: '#2a0a4a', margin: '6px 0' }
const label = { color: '#6b21a8' }