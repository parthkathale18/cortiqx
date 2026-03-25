import { handleConsultationSubmit } from './consultationSubmit.js'

/**
 * Vercel serverless: sends team notification + client confirmation.
 * Env: CONSULTATION_NOTIFY_EMAIL, MAIL_FROM, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON' })
    }
  }

  const { statusCode, payload } = await handleConsultationSubmit(body)
  return res.status(statusCode).json(payload)
}
