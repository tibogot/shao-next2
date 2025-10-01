"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What makes SHAO cosmetics different from other brands?",
    answer:
      "SHAO combines traditional botanical wisdom with cutting-edge biotechnology and bio-fermentation. Our products are crafted with nature's purest ingredients and sustainable practices, ensuring both skin efficacy and environmental responsibility.",
  },
  {
    id: 2,
    question: "Are SHAO products suitable for all skin types?",
    answer:
      "Yes, our formulations are designed to work harmoniously with all skin types. We use gentle, bio-fermented ingredients that are easily absorbed and well-tolerated by sensitive, oily, dry, and combination skin.",
  },
  {
    id: 3,
    question: "How long does it take to see results?",
    answer:
      "Most customers notice improved skin texture and hydration within 2-3 weeks of consistent use. For more significant improvements in skin tone and firmness, we recommend using our products for 6-8 weeks as part of your daily skincare ritual.",
  },
  {
    id: 4,
    question: "Are your products cruelty-free and vegan?",
    answer:
      "Absolutely. SHAO is committed to ethical beauty practices. All our products are 100% cruelty-free, never tested on animals, and formulated with vegan ingredients. We believe in conscious beauty that respects all living beings.",
  },
  {
    id: 5,
    question: "What is bio-fermentation and why do you use it?",
    answer:
      "Bio-fermentation is an advanced process that breaks down natural ingredients into smaller, more bioavailable molecules. This allows for deeper skin penetration and enhanced efficacy while maintaining the integrity of natural botanicals.",
  },
  {
    id: 6,
    question: "How should I store my SHAO products?",
    answer:
      "Store your products in a cool, dry place away from direct sunlight. Our natural formulations are best preserved at room temperature. Avoid storing in bathrooms with high humidity or near heat sources.",
  },
  {
    id: 7,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide! Shipping times vary by location: 3-5 business days within Europe, 7-10 days to North America, and 10-14 days to other international destinations. Free shipping on orders over €75.",
  },
  {
    id: 8,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return unopened products for a full refund. For opened products, we offer store credit to ensure you find the perfect match for your skin.",
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-[#FBFBFB] px-4 py-16 md:px-8">
      <div>
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-neue-montreal-mono mb-4 text-sm tracking-wider text-black/60 uppercase">
            Frequently Asked Questions
          </h2>
          {/* <p className="font-neue-montreal max-w-2xl text-xl text-black">
            Everything you need to know about SHAO's natural skincare and our
            commitment to conscious beauty.
          </p> */}
        </motion.div>

        {/* FAQ Items with Layout Group for coordinated animations */}
        <LayoutGroup>
          <motion.div
            className="space-y-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {faqData.map((item, index) => {
              const isOpen = openItem === item.id;
              return (
                <motion.div
                  key={item.id}
                  layout
                  className="border-b border-black/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <motion.button
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full cursor-pointer items-center justify-between py-6 text-left"
                    aria-expanded={isOpen}
                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-neue-montreal pr-4 text-lg font-medium text-black">
                      {item.question}
                    </h3>
                    <motion.div
                      className="flex-shrink-0"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <svg
                        className="h-5 w-5 text-black/60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </motion.div>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.4, ease: "easeInOut" },
                            opacity: { duration: 0.3, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: "easeInOut" },
                            opacity: { duration: 0.2 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          className="pb-6"
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          exit={{ y: -10 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <p className="font-neue-montreal max-w-4xl text-lg leading-relaxed text-black/70">
                            {item.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* Contact CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="font-neue-montreal mb-4 text-black/60">
            Still have questions? We're here to help.
          </p>
          <motion.a
            href="mailto:hello@shao.com"
            className="font-neue-montreal-mono inline-flex cursor-pointer items-center bg-black px-8 py-3 text-sm font-medium text-white"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
            {/* <motion.svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </motion.svg> */}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
