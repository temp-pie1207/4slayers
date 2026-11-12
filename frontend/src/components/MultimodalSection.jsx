import React, { useState } from 'react';
import { MessageSquare, Globe, QrCode, Camera, Phone, CreditCard, GitFork, ArrowUpRight, Maximize2, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MultimodalSection() {
  const [selectedImage, setSelectedImage] = useState(null);

  const vectors = [
    {
      title: 'SMS & Chat Transcript Analysis',
      icon: MessageSquare,
      code: 'VEC // SMS',
      image: '/images/vector-sms.svg',
      desc: 'Parses conversational pressure, artificial time-limits, credential solicitation keywords, and forged institutional headers.',
      tag: 'Phishing Detection'
    },
    {
      title: 'URL & Domain Typosquatting',
      icon: Globe,
      code: 'VEC // DOMAIN',
      image: '/images/vector-domain.svg',
      desc: 'Evaluates character entropy, visual homoglyph spoofing, TLD reputation, fast-flux DNS hops, and destination login clones.',
      tag: 'DNS Entropy'
    },
    {
      title: 'QR Code & Quishing Payloads',
      icon: QrCode,
      code: 'VEC // QR',
      image: '/images/vector-qr.svg',
      desc: 'Decodes encoded barcodes to reveal hidden URI redirects, reverse-collect UPI payment intents, and rogue WiFi setups.',
      tag: 'Reverse Debit Trap'
    },
    {
      title: 'Screenshot & OCR Extraction',
      icon: Camera,
      code: 'VEC // OCR',
      image: '/images/vector-ocr.svg',
      desc: 'Extracts embedded textual threats, fake banking receipts, and forged police arrest warrants directly from image files.',
      tag: 'Document Forensics'
    },
    {
      title: 'Phone & VoIP Telemetry',
      icon: Phone,
      code: 'VEC // TELECOM',
      image: '/images/vector-telecom.svg',
      desc: 'Flags spoofed caller IDs, unregistered SIP trunks, mass robo-calling origins, and cold-call enforcement impersonation.',
      tag: 'Carrier Gateway'
    },
    {
      title: 'Payment & Mule Account Signals',
      icon: CreditCard,
      code: 'VEC // PAYMENT',
      image: '/images/vector-payment.svg',
      desc: 'Cross-checks payee VPAs, mule bank accounts, and crypto depository addresses against active fraud syndicates.',
      tag: 'Laundering Graph'
    },
    {
      title: 'Cross-Channel Threat Correlation',
      icon: GitFork,
      code: 'VEC // SYNERGY',
      image: '/images/vector-synergy.svg',
      desc: 'The connective brain. Binds disparate vectors into a unified forensic graph to uncover the patterns others miss.',
      tag: 'Scam DNA Core',
      highlight: true
    }
  ];

  return (
    <section id="multimodal-intelligence" className="relative py-24 sm:py-32 bg-[#FBF8F0] dark:bg-[#0F0D0A] border-b border-[#E5DCCB] dark:border-[#2E2820] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start max-w-3xl mb-16"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[#906727] dark:text-[#EAD6A0]">
              SECTION // 06
            </span>
            <span className="text-[#E5DCCB] dark:text-[#3D3528]">|</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#777064] dark:text-[#9E9688]">
              MULTIMODAL INTELLIGENCE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242019] dark:text-[#FBF8F0] mb-4">
            SEVEN VECTORS. ONE DEFENSE.
          </h2>
          <p className="text-sm sm:text-base text-[#777064] dark:text-[#A8A095] leading-relaxed">
            Attackers do not restrict themselves to a single channel. Our unified architecture processes every vector through calibrated heuristic models and correlates them into actionable Scam DNA.
          </p>
        </motion.div>

        {/* 7 Vector Editorial Cards Grid with Visual Image Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {vectors.map((vec, idx) => {
            const Icon = vec.icon;

            return (
              <motion.div
                key={vec.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`card-hover-lift rounded-2xl border transition duration-300 flex flex-col justify-between overflow-hidden group ${
                  vec.highlight
                    ? 'md:col-span-2 lg:col-span-3 border-[#C69A42] bg-gradient-to-r from-white via-[#FBF8F0] to-[#F2EADB] dark:from-[#1A1612] dark:via-[#16130F] dark:to-[#12100E] shadow-lg'
                    : 'border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm hover:border-[#C69A42]'
                }`}
              >
                <div className="p-6 sm:p-7 flex flex-col h-full">
                  
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] font-bold text-[#906727] dark:text-[#EAD6A0] tracking-widest uppercase">
                      {vec.code}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C69A42]/10 text-[#C69A42] border border-[#C69A42]/20">
                        {vec.tag}
                      </span>
                      <div className="p-2 rounded-xl bg-[#FBF8F0] dark:bg-[#201C16] text-[#C69A42]">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#242019] dark:text-[#FBF8F0] mb-2 group-hover:text-[#C69A42] transition">
                    {vec.title}
                  </h3>

                  <p className="text-xs text-[#777064] dark:text-[#A8A095] leading-relaxed mb-5">
                    {vec.desc}
                  </p>

                  {/* Visual Vector Forensics Image Preview */}
                  <div 
                    onClick={() => setSelectedImage({ src: vec.image, title: vec.title, code: vec.code })}
                    className="relative mt-auto mb-4 rounded-xl overflow-hidden border border-[#E5DCCB] dark:border-[#2E2820] bg-[#12100E] cursor-pointer group/img"
                  >
                    <div className="w-full aspect-[16/10] overflow-hidden">
                      <img 
                        src={vec.image} 
                        alt={vec.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                      />
                    </div>
                    {/* Hover Overlay with Inspect Icon */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
                      <div className="p-2 rounded-full bg-[#C69A42]/90 text-white shadow-lg flex items-center gap-1.5 text-xs font-mono">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect Forensics</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-3 border-t border-[#E5DCCB]/60 dark:border-[#2E2820] flex items-center justify-between text-[11px] font-mono text-[#777064]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#277653] animate-pulse" />
                      <span>Heuristics Live</span>
                    </span>
                    <button 
                      onClick={() => setSelectedImage({ src: vec.image, title: vec.title, code: vec.code })}
                      className="text-[#C69A42] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <span>View Blueprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Forensic Diagram Fullscreen Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative max-w-4xl w-full bg-[#16130F] border border-[#C69A42]/40 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#332B20] mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#EAD6A0] tracking-wider uppercase">
                    {selectedImage.code}
                  </span>
                  <span className="text-[#332B20]">|</span>
                  <h4 className="font-display font-bold text-base text-[#FBF8F0]">
                    {selectedImage.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-lg bg-[#2E2820] text-[#A8A095] hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="rounded-xl overflow-hidden border border-[#332B20] bg-black max-h-[70vh] flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[68vh] object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#A8A095]">
                <span>4SLAYERS // HIGH-FIDELITY VECTOR TELEMETRY SPECIFICATION</span>
                <a
                  href="/app/scan"
                  className="px-4 py-2 rounded-lg bg-[#C69A42] hover:bg-[#D4A853] text-[#1A1202] font-bold uppercase tracking-wider transition"
                >
                  Scan Threats With This Vector →
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}