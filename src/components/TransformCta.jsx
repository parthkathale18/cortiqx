import { motion } from 'framer-motion'
import { FYW_VIEWPORT, fywRevealTransition } from '../lib/fywMotion.js'

export default function TransformCta() {
  return (
    <section className="fyw-transform">
      <div className="fyw-container fyw-transform__inner">
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={FYW_VIEWPORT}
          transition={fywRevealTransition(0)}
        >
          LET&apos;S TRANSFORM YOUR IDEA INTO REALITY
        </motion.h2>
        <motion.a
          href="/#contact"
          className="fyw-btn fyw-btn--primary fyw-btn--lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={FYW_VIEWPORT}
          transition={fywRevealTransition(0.1)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          BOOK A FREE CONSULTATION
        </motion.a>
      </div>
    </section>
  )
}
