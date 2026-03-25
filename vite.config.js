import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {
  getIndexHtmlBrandPayload,
  INDEX_HTML_DEFAULT_ORIGIN,
} from './src/seo/indexHtmlBrand.js'

function injectBrandMetaPlugin() {
  return {
    name: 'cortiqx-inject-brand-meta',
    transformIndexHtml(html) {
      const origin = (process.env.VITE_SITE_URL || INDEX_HTML_DEFAULT_ORIGIN).replace(/\/$/, '')
      const p = getIndexHtmlBrandPayload(origin)
      return html
        .replace(/__CX_META_DESCRIPTION__/g, p.metaDescription)
        .replace(/__CX_META_KEYWORDS__/g, p.metaKeywords)
        .replace(/__CX_META_AUTHOR__/g, p.author)
        .replace(/__CX_LINK_CANONICAL__/g, p.canonical)
        .replace(/__CX_OG_URL__/g, p.ogUrl)
        .replace(/__CX_OG_TITLE__/g, p.ogTitle)
        .replace(/__CX_OG_DESCRIPTION__/g, p.ogDescription)
        .replace(/__CX_OG_IMAGE__/g, p.ogImage)
        .replace(/__CX_TWITTER_TITLE__/g, p.twitterTitle)
        .replace(/__CX_TWITTER_DESCRIPTION__/g, p.twitterDescription)
        .replace(/__CX_TWITTER_IMAGE__/g, p.twitterImage)
        .replace(/__CX_DOCUMENT_TITLE__/g, p.documentTitle)
    },
  }
}

/** Dev-only: same handler as Vercel `/api/sendConsultation` so local `npm run dev` can POST the form. */
function consultationApiDevPlugin() {
  return {
    name: 'cortiqx-consultation-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url || '').split('?')[0]
        if (pathname !== '/api/sendConsultation') {
          return next()
        }

        const mode = server.config.mode
        const root = server.config.root || process.cwd()
        const fileEnv = loadEnv(mode, root, '')
        for (const key of Object.keys(fileEnv)) {
          if (process.env[key] === undefined) {
            process.env[key] = fileEnv[key]
          }
        }

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          return res.end()
        }

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
        }

        const chunks = []
        for await (const chunk of req) {
          chunks.push(chunk)
        }
        const raw = Buffer.concat(chunks).toString('utf8')
        let body
        try {
          body = raw ? JSON.parse(raw) : {}
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }))
        }

        const { handleConsultationSubmit } = await import('./api/consultationSubmit.js')
        const { statusCode, payload } = await handleConsultationSubmit(body)
        res.statusCode = statusCode
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(payload))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), injectBrandMetaPlugin(), consultationApiDevPlugin()],
  build: {
    target: 'es2022',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('firebase')) return 'vendor-firebase'
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (
            id.includes('react-dom') ||
            id.includes('react-router') ||
            id.includes('react-helmet-async') ||
            id.includes('node_modules/react/')
          ) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
