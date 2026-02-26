'use client';

const categories = [
  'Core Analysis',
  'Pharmacogenomics',
  'Therapy Optimization',
  'Risk Assessment',
  'Specialty Analysis',
  'Organ-Specific',
  'Lifestyle & Prevention',
  'Advanced Multi-Omics',
  'Resilience & Longevity',
  'Advanced Pharmacogenomics',
  'Organ Optimization',
  'Advanced Metabolic',
  'Advanced Neuroscience',
  'Advanced Immunology',
  'Regenerative Medicine',
  'Precision Oncology',
  'Advanced Compliance',
];

export default function CapabilitiesSection() {
  const scrollToForm = () => {
    const el = document.getElementById('apply');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        {/* Label */}
        <p className="font-heading font-semibold text-xs tracking-widest uppercase mb-4" style={{ color: 'rgb(0,128,128)' }}>
          The Platform
        </p>

        {/* Heading */}
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#002147] mb-6">
          200 Analyses. Every Dimension of Genomic Intelligence.
        </h2>

        {/* Body */}
        <p className="font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12" style={{ color: 'rgb(112,128,144)' }}>
          Genomic Sentinel covers the full clinical and research spectrum — from core variant analysis to advanced
          multi-omics, pharmacogenomics, oncology, longevity, neuroscience, immunology, and beyond.
        </p>

        {/* Category tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-heading font-medium border transition-all duration-200 hover:bg-teal-50 cursor-default"
              style={{
                borderColor: 'rgb(0,128,128)',
                color: 'rgb(0,128,128)',
                backgroundColor: 'rgba(0,128,128,0.04)',
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* More analyses text */}
        <p className="font-heading font-semibold text-sm mb-10" style={{ color: 'rgb(112,128,144)' }}>
          + 183 more analyses across every major organ system and research domain.
        </p>

        {/* Secondary CTA */}
        <button
          onClick={scrollToForm}
          className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#002147] text-[#002147] font-heading font-bold text-sm rounded hover:bg-[#002147] hover:text-white transition-all duration-200"
        >
          Join the Pilot
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
