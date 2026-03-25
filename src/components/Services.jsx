import { motion } from 'framer-motion'
import { FYW_VIEWPORT, fywRevealTransition } from '../lib/fywMotion.js'

const items = [
  {
    tag: 'STARTUP & MVP DEVELOPMENT',
    title: 'STARTUP & MVP DEVELOPMENT',
    desc: 'Quickly validate your concept with a market-ready MVP that captures your core idea.',
  },
  {
    tag: 'FULL-CYCLE DEVELOPMENT',
    title: 'FULL-CYCLE DEVELOPMENT',
    desc: 'End-to-end app creation: design, development, testing, and store deployment.',
  },
  {
    tag: 'CUSTOM SOLUTION',
    title: 'CUSTOM SOLUTION',
    desc: 'Bespoke applications tailored to your unique business challenges and goals.',
  },
]

export default function Services() {
  return (
    <section id="services" className="fyw-section fyw-services">
      <div className="fyw-container">
        <motion.h2
          className="fyw-section__title"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={FYW_VIEWPORT}
          transition={fywRevealTransition(0)}
        >
          Services We Provide
        </motion.h2>
        <motion.p
          className="fyw-section__lede"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={FYW_VIEWPORT}
          transition={fywRevealTransition(0.06)}
        >
          We build robust apps through collaborative development that turns your vision into reality.
        </motion.p>

        <div className="fyw-services__grid">
          {items.map((item, i) => (
            <motion.article
              key={item.tag}
              className="fyw-service-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={FYW_VIEWPORT}
              transition={fywRevealTransition(0.1 + i * 0.09)}
              whileHover={{ y: -6, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
            >
              <p className="fyw-service-card__tag">{item.tag}</p>
              <h3>{item.title}</h3>
              <p className="fyw-service-card__desc">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
