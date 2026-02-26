'use client';

export default function HeroSection() {
  const scrollToForm = () => {
    const el = document.getElementById('apply');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative overflow-hidden bg-[#002147] py-24 md:py-32"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 70% 50%, rgba(0,128,128,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(212,175,55,0.08) 0%, transparent 50%)',
      }}
    >
      {/* Background DNA pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='https://www.shutterstock.com/image-illustration/seamless-repeating-geometric-pattern-composed-260nw-2721454327.jpg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6 animate-fade-in-up">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-heading border"
            style={{
              borderColor: 'rgb(212,175,55)',
              color: 'rgb(212,175,55)',
              backgroundColor: 'rgba(212,175,55,0.1)',
            }}
          >
            <span>⚡</span>
            Pilot Program — Limited to 100 Researchers
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 animate-fade-in-up animate-delay-100">
          200 Clinical-Grade Genomic Analyses.
          <br />
          <span style={{ color: 'rgb(0,128,128)' }}>One Intelligent Platform.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4 animate-fade-in-up animate-delay-200"
          style={{ color: 'rgba(255,255,255,0.82)' }}
        >
          We&apos;re inviting 100 genetics researchers to pilot Genomic Sentinel
          before it&apos;s publicly available — and tell us how it changes your research.
        </p>

        {/* Body copy */}
        <p
          className="font-heading font-semibold text-base md:text-lg mb-8 animate-fade-in-up animate-delay-200"
          style={{ color: 'rgb(212,175,55)' }}
        >
          Full platform access. No cost. Your feedback shapes the future.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#002147] font-heading font-bold text-base rounded hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Join the Pilot
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Trust line */}
        <p className="mt-4 text-sm animate-fade-in-up animate-delay-400" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Only 100 spots available. Application reviewed within 24 hours.
        </p>
      </div>
    </section>
  );
}
