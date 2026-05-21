import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Resepsjonisten.no'

interface DemoNotificationProps {
  name?: string
  company?: string
  email?: string
  phone?: string
  message?: string
  source?: string
  calculatorSummary?: string
  calculatorData?: Record<string, any> | null
  userAgent?: string
  submittedAt?: string
}

const Row = ({ label, value }: { label: string; value?: string | null }) =>
  value ? (
    <Text style={rowStyle}>
      <strong style={labelStyle}>{label}:</strong> {value}
    </Text>
  ) : null

const DemoNotificationEmail = ({
  name,
  company,
  email,
  phone,
  message,
  source,
  calculatorSummary,
  calculatorData,
  userAgent,
  submittedAt,
}: DemoNotificationProps) => {
  const hasCalc = !!calculatorSummary || (calculatorData && Object.keys(calculatorData).length > 0)
  return (
    <Html lang="nb" dir="ltr">
      <Head />
      <Preview>Ny demo-forespørsel fra {name || 'kunde'}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Ny demo-forespørsel</Heading>
          <Text style={text}>
            Du har mottatt en ny henvendelse fra skjemaet på {SITE_NAME}.
          </Text>

          <Section style={card}>
            <Heading as="h2" style={h2}>Kontaktinformasjon</Heading>
            <Row label="Navn" value={name} />
            <Row label="Bedrift" value={company} />
            <Row label="E-post" value={email} />
            <Row label="Telefon" value={phone} />
            <Row label="Kilde" value={source} />
            {submittedAt ? <Row label="Sendt" value={submittedAt} /> : null}
          </Section>

          {message ? (
            <Section style={card}>
              <Heading as="h2" style={h2}>Melding</Heading>
              <Text style={messageStyle}>{message}</Text>
            </Section>
          ) : null}

          {hasCalc ? (
            <Section style={cardHighlight}>
              <Heading as="h2" style={h2}>Tapt-samtale-kalkulator</Heading>
              {calculatorSummary ? (
                <Text style={messageStyle}>{calculatorSummary}</Text>
              ) : null}
              {calculatorData ? (
                <>
                  <Hr style={hr} />
                  <Text style={smallLabel}>Detaljer:</Text>
                  {Object.entries(calculatorData).map(([k, v]) => (
                    <Text key={k} style={rowStyle}>
                      <strong style={labelStyle}>{k}:</strong> {String(v)}
                    </Text>
                  ))}
                </>
              ) : null}
            </Section>
          ) : (
            <Text style={muted}>Kalkulatoren ble ikke brukt i denne henvendelsen.</Text>
          )}

          {userAgent ? (
            <Text style={footer}>User agent: {userAgent}</Text>
          ) : null}
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: DemoNotificationEmail,
  subject: (data: Record<string, any>) =>
    `Ny demo-forespørsel${data?.name ? ` fra ${data.name}` : ''}${data?.company ? ` (${data.company})` : ''}`,
  displayName: 'Demo-forespørsel (intern)',
  previewData: {
    name: 'Ola Nordmann',
    company: 'Eksempel AS',
    email: 'ola@eksempel.no',
    phone: '99887766',
    message: 'Vi ønsker å høre mer om tjenesten.',
    source: 'calculator',
    calculatorSummary: 'Ca. 12 tapte samtaler/uke · estimert tap kr 18 000/mnd',
    calculatorData: { tapteSamtalerPerUke: 12, snittordreverdi: 1500 },
    submittedAt: new Date().toLocaleString('nb-NO'),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Poppins, Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '600px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#2a0a4a', margin: '0 0 8px' }
const h2 = { fontSize: '16px', fontWeight: 'bold', color: '#2a0a4a', margin: '0 0 12px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.5', margin: '0 0 20px' }
const card = { backgroundColor: '#faf7ff', border: '1px solid #ece3fb', borderRadius: '12px', padding: '18px 20px', margin: '0 0 16px' }
const cardHighlight = { backgroundColor: '#fdf4ff', border: '1px solid #f5d0fe', borderRadius: '12px', padding: '18px 20px', margin: '0 0 16px' }
const rowStyle = { fontSize: '14px', color: '#2a0a4a', margin: '4px 0', lineHeight: '1.5' }
const labelStyle = { color: '#6b21a8' }
const messageStyle = { fontSize: '14px', color: '#2a0a4a', whiteSpace: 'pre-wrap' as const, margin: '0' }
const muted = { fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' as const, margin: '8px 0 16px' }
const smallLabel = { fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '0 0 6px' }
const hr = { borderColor: '#ece3fb', margin: '12px 0' }
const footer = { fontSize: '11px', color: '#9ca3af', margin: '24px 0 0' }