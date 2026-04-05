import { motion } from "motion/react";

interface ImagineLine {
  text: string;
  image?: string;
  alt?: string;
}

const DEFAULT_LINES: ImagineLine[] = [
  {
    text: "every inbound call, text, and inquiry automatically booked on your calendar — without you lifting a finger.",
    image: "/assets/generated/imagine-auto-booking.dim_800x500.jpg",
    alt: "Automatic call booking on a digital calendar",
  },
  {
    text: "every satisfied customer automatically receiving a review request the moment the job is done.",
    image: "/assets/generated/imagine-review-request.dim_800x500.jpg",
    alt: "5-star review notification on phone screen",
  },
  {
    text: "your Google rankings always protected, monitored, and climbing — on autopilot.",
    image: "/assets/generated/imagine-google-rankings.dim_800x500.jpg",
    alt: "Google local business ranking #1 with upward trend",
  },
  {
    text: "having the business credit and fundability that 97% of businesses never build — and the financing options that come with it.",
    image: "/assets/generated/imagine-fundability.dim_800x500.jpg",
    alt: "Business credit score dashboard with approved financing",
  },
];

interface ImagineSectionProps {
  lines?: string[] | ImagineLine[];
}

function normalizeLine(line: string | ImagineLine): ImagineLine {
  if (typeof line === "string") {
    return { text: line };
  }
  return line;
}

export default function ImagineSection({
  lines = DEFAULT_LINES,
}: ImagineSectionProps) {
  const normalized = (lines as (string | ImagineLine)[]).map(normalizeLine);

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

        <div className="space-y-16">
          {normalized.map((line, i) => (
            <motion.div
              key={line.text}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl md:text-3xl font-bold text-indigo-400 leading-tight shrink-0">
                  Imagine
                </span>
                <span className="text-2xl md:text-3xl font-semibold text-white leading-tight">
                  {line.text}
                </span>
              </div>
              {line.image && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.12 + 0.2 }}
                  className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-950/40"
                >
                  <img
                    src={line.image}
                    alt={line.alt ?? ""}
                    className="w-full object-cover max-h-72 md:max-h-80"
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: normalized.length * 0.12 + 0.2,
          }}
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
