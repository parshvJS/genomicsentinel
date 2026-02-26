export default function WhySection() {
  const cards = [
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="rgb(0,128,128)" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Full Platform Access',
      body: 'All 200 analyses across pharmacogenomics, oncology, rare variants, epigenetics, multi-omics, and more — nothing locked or restricted.',
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="rgb(0,128,128)" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Exclusive Pilot Access',
      body: 'Be among the first 100 researchers to test Genomic Sentinel in your lab. Run real analyses on real data with full platform capabilities.',
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" stroke="rgb(0,128,128)" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Your Feedback Shapes the Platform',
      body: 'We\'re not running a passive trial. We want to hear what works, what doesn\'t, and what would make Genomic Sentinel indispensable to your lab.',
    },
  ];

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: 'oklch(0.985 0.002 247.839)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section label */}
        <p className="font-heading font-semibold text-xs tracking-widest uppercase mb-4 text-center" style={{ color: 'rgb(0,128,128)' }}>
          The Pilot Program
        </p>

        {/* Heading */}
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#002147] text-center mb-6">
          We Built This for Researchers Like You.
        </h2>

        {/* Body */}
        <p className="font-body text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed mb-14" style={{ color: 'rgb(112,128,144)' }}>
          Genomic Sentinel transforms static genomic reports into living, continuously updated intelligence — covering 200 clinical-grade analyses across pharmacogenomics, oncology, rare variants, multi-omics, and more. Before we open to the public, we&apos;re inviting 100 researchers to pilot the platform and tell us what they find.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-[10px] border p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: 'oklch(0.928 0.006 264.531)' }}
            >
              <div className="mb-5 p-3 inline-flex rounded-lg" style={{ backgroundColor: 'rgba(0,128,128,0.08)' }}>
                {card.icon}
              </div>
              <h3 className="font-heading font-semibold text-lg text-[#002147] mb-3">{card.title}</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'rgb(112,128,144)' }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
