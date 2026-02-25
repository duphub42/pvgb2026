'use client'

import Link from 'next/link'
import React, { useId, useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/utilities/ui'

type ContactSection1BlockProps = {
  className?: string
  heading?: string | null
  description?: string | null
  formTitle?: string | null
  formFirstNameLabel?: string | null
  formFirstNamePlaceholder?: string | null
  formLastNameLabel?: string | null
  formLastNamePlaceholder?: string | null
  formEmailLabel?: string | null
  formEmailPlaceholder?: string | null
  formSubjectLabel?: string | null
  formSubjectPlaceholder?: string | null
  formMessageLabel?: string | null
  formMessagePlaceholder?: string | null
  formButtonText?: string | null
  formActionUrl?: string | null
  contactCardTitle?: string | null
  contactEmailLabel?: string | null
  contactEmailValue?: string | null
  contactPhoneLabel?: string | null
  contactPhoneValue?: string | null
  contactOfficeLabel?: string | null
  contactOfficeValue?: string | null
  hoursCardTitle?: string | null
  hoursRows?: Array<{ label?: string | null; value?: string | null }> | null
  altCardTitle?: string | null
  altCardDescription?: string | null
  altCardButtonText?: string | null
  altCardButtonUrl?: string | null
}

const def = {
  heading: 'Get in Touch',
  description:
    "Have a question or want to work together? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  formTitle: 'Send us a Message',
  formFirstNameLabel: 'First name',
  formFirstNamePlaceholder: 'John',
  formLastNameLabel: 'Last name',
  formLastNamePlaceholder: 'Doe',
  formEmailLabel: 'Email',
  formEmailPlaceholder: 'john@example.com',
  formSubjectLabel: 'Subject',
  formSubjectPlaceholder: 'How can we help?',
  formMessageLabel: 'Message',
  formMessagePlaceholder: 'Tell us more about your project...',
  formButtonText: 'Send Message',
  contactCardTitle: 'Contact Information',
  contactEmailLabel: 'Email',
  contactEmailValue: 'hello@company.com',
  contactPhoneLabel: 'Phone',
  contactPhoneValue: '+1 (555) 123-4567',
  contactOfficeLabel: 'Office',
  contactOfficeValue: '123 Business Ave, Suite 100\nSan Francisco, CA 94105',
  hoursCardTitle: 'Business Hours',
  hoursRows: [
    { label: 'Monday - Friday', value: '9:00 AM - 6:00 PM' },
    { label: 'Saturday', value: '10:00 AM - 4:00 PM' },
    { label: 'Sunday', value: 'Closed' },
  ] as Array<{ label: string; value: string }>,
  altCardTitle: 'Prefer to Call?',
  altCardDescription: 'Speak directly with our team for immediate assistance.',
  altCardButtonText: 'Schedule a Call',
  altCardButtonUrl: '#',
}

export const ContactSection1Block: React.FC<ContactSection1BlockProps> = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const baseId = useId().replace(/:/g, '')
  const {
    className,
    heading = def.heading,
    description = def.description,
    formTitle = def.formTitle,
    formFirstNameLabel = def.formFirstNameLabel,
    formFirstNamePlaceholder = def.formFirstNamePlaceholder,
    formLastNameLabel = def.formLastNameLabel,
    formLastNamePlaceholder = def.formLastNamePlaceholder,
    formEmailLabel = def.formEmailLabel,
    formEmailPlaceholder = def.formEmailPlaceholder,
    formSubjectLabel = def.formSubjectLabel,
    formSubjectPlaceholder = def.formSubjectPlaceholder,
    formMessageLabel = def.formMessageLabel,
    formMessagePlaceholder = def.formMessagePlaceholder,
    formButtonText = def.formButtonText,
    formActionUrl,
    contactCardTitle = def.contactCardTitle,
    contactEmailLabel = def.contactEmailLabel,
    contactEmailValue = def.contactEmailValue,
    contactPhoneLabel = def.contactPhoneLabel,
    contactPhoneValue = def.contactPhoneValue,
    contactOfficeLabel = def.contactOfficeLabel,
    contactOfficeValue = def.contactOfficeValue,
    hoursCardTitle = def.hoursCardTitle,
    hoursRows = def.hoursRows,
    altCardTitle = def.altCardTitle,
    altCardDescription = def.altCardDescription,
    altCardButtonText = def.altCardButtonText,
    altCardButtonUrl = def.altCardButtonUrl,
  } = props ?? {}

  const hours = Array.isArray(hoursRows) && hoursRows.length > 0 ? hoursRows : def.hoursRows
  const actionUrl = formActionUrl && String(formActionUrl).trim() ? formActionUrl : null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!actionUrl) {
      setSubmitted(true)
      return
    }
    const form = e.currentTarget
    const data = new FormData(form)
    const body = Object.fromEntries(
      ['first-name', 'last-name', 'email', 'subject', 'message'].map((name) => [name, data.get(name) ?? '']),
    )
    setIsSubmitting(true)
    try {
      const res = await fetch(actionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={cn('px-4 py-16 md:px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-semibold text-balance md:text-4xl">{heading ?? def.heading}</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {description ?? def.description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-balance">{formTitle ?? def.formTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {submitted && !actionUrl ? (
                <p className="text-muted-foreground text-sm">Thank you. Configure a Form Action URL to send submissions.</p>
              ) : submitted ? (
                <p className="text-muted-foreground text-sm">Thank you, your message has been sent.</p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  action={actionUrl ?? undefined}
                  method="post"
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`first-name-${baseId}`}>{formFirstNameLabel}</Label>
                      <Input
                        id={`first-name-${baseId}`}
                        name="first-name"
                        placeholder={formFirstNamePlaceholder ?? undefined}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`last-name-${baseId}`}>{formLastNameLabel}</Label>
                      <Input
                        id={`last-name-${baseId}`}
                        name="last-name"
                        placeholder={formLastNamePlaceholder ?? undefined}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`email-${baseId}`}>{formEmailLabel}</Label>
                    <Input
                      id={`email-${baseId}`}
                      name="email"
                      type="email"
                      placeholder={formEmailPlaceholder ?? undefined}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`subject-${baseId}`}>{formSubjectLabel}</Label>
                    <Input
                      id={`subject-${baseId}`}
                      name="subject"
                      placeholder={formSubjectPlaceholder ?? undefined}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`message-${baseId}`}>{formMessageLabel}</Label>
                    <Textarea
                      id={`message-${baseId}`}
                      name="message"
                      placeholder={formMessagePlaceholder ?? undefined}
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending…' : (formButtonText ?? def.formButtonText)}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="flex h-full flex-col space-y-6">
            <Card className="flex-1 gap-3">
              <CardHeader>
                <CardTitle className="text-lg text-balance">{contactCardTitle ?? def.contactCardTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
                    <Mail className="text-primary size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{contactEmailLabel}</h4>
                    <p className="text-muted-foreground text-xs">{contactEmailValue ?? ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
                    <Phone className="text-primary size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{contactPhoneLabel}</h4>
                    <p className="text-muted-foreground text-xs">{contactPhoneValue ?? ''}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 mt-0.5 flex size-8 items-center justify-center rounded-full">
                    <MapPin className="text-primary size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{contactOfficeLabel}</h4>
                    <p className="text-muted-foreground whitespace-pre-line text-xs">
                      {contactOfficeValue ?? ''}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gap-3">
              <CardHeader>
                <CardTitle className="text-lg text-balance">{hoursCardTitle ?? def.hoursCardTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {hours.map((row, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{row?.label ?? ''}</span>
                      <span className="text-muted-foreground">{row?.value ?? ''}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="gap-3">
              <CardHeader>
                <CardTitle className="text-lg text-balance">{altCardTitle ?? def.altCardTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">
                  {altCardDescription ?? def.altCardDescription}
                </p>
                <Button variant="outline" className="w-full cursor-pointer" asChild>
                  <Link href={altCardButtonUrl ?? '#'}>
                    <Phone className="me-2 size-4" />
                    {altCardButtonText ?? def.altCardButtonText}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
