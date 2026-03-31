import { motion } from "motion/react";

const DEFAULT_LINES = [
  "every inbound call, text, and inquiry automatically booked on your calendar — without you lifting a finger.",
  "every satisfied customer automatically receiving a review request the moment the job is done.",
  "your Google rankings always protected, monitored, and climbing — on autopilot.",
  "having the business credit and fundability that 97% of businesses never build — and the financing options that come with it.",
];

interface ImagineSectionProps {
  lines?: string[];
}

export default function ImagineSection({
  lines = DEFAULT_LINES,
}: ImagineSectionProps) {
  return (
    <section className="py-20 px-6 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            Picture This
          </div>
        </motion.div>

        <div className="space-y-7">
          {lines.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="flex items-start gap-3"
            >
              <span className="text-2xl md:text-3xl font-bold text-indigo-400 leading-tight shrink-0">
                Imagine
              </span>
              <span className="text-2xl md:text-3xl font-semibold text-white leading-tight">
                {line}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: lines.length * 0.12 + 0.2 }}
          className="mt-14 pt-10 border-t border-white/10 text-center"
        >
          <p className="text-xl md:text-2xl font-bold text-white">
            That's not a vision.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              That's what Booked, Ranked &amp; Fundable turns on for your
              business.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
