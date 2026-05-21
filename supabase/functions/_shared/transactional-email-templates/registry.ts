/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as demoNotification } from './demo-notification.tsx'
import { template as newsletterNotification } from './newsletter-notification.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'demo-notification': demoNotification,
  'newsletter-notification': newsletterNotification,
}