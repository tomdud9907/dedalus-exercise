import { useState } from 'react'
import './NewsletterPage.css'

const STORAGE_KEY = 'newsletter_subscribers'

function readSubscribers() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveSubscriber(email) {
  const subscribers = readSubscribers()
  const nextSubscribers = [
    ...subscribers,
    {
      email,
      createdAt: new Date().toISOString(),
    },
  ]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSubscribers))
}

function validateEmailFormat(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function emailExists(email) {
  const normalized = email.toLowerCase()
  return readSubscribers().some((entry) => entry.email?.toLowerCase() === normalized)
}

function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}
    const normalizedEmail = email.trim()

    if (!normalizedEmail) {
      nextErrors.email = 'Email is required.'
    } else if (!validateEmailFormat(normalizedEmail)) {
      nextErrors.email = 'Please enter a valid email address.'
    } else if (emailExists(normalizedEmail)) {
      nextErrors.email = 'This email is already subscribed.'
    }

    if (!consent) {
      nextErrors.consent = 'You must agree to receive newsletter emails.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage('')
      return
    }

    saveSubscriber(normalizedEmail)
    setSuccessMessage('Thanks! You have been subscribed to the newsletter.')
    setEmail('')
    setConsent(false)
    setErrors({})
  }

  return (
    <section className="newsletter-page">
      <h2>Newsletter</h2>
      <p className="newsletter-subtitle">Get updates about new movie picks and features.</p>

      <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email">Email</label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
        />
        {errors.email && (
          <p id="newsletter-email-error" className="form-error" role="alert">
            {errors.email}
          </p>
        )}

        <label className="newsletter-consent">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'newsletter-consent-error' : undefined}
          />
          I agree to receive newsletter emails.
        </label>
        {errors.consent && (
          <p id="newsletter-consent-error" className="form-error" role="alert">
            {errors.consent}
          </p>
        )}

        <button type="submit">Subscribe</button>

        {successMessage && <p className="form-success">{successMessage}</p>}
      </form>
    </section>
  )
}

export default NewsletterPage
