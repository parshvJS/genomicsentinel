import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="w-full bg-white border-b border-[oklch(0.928_0.006_264.531)] sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between">
        <a href="https://genomicsentinel.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
          <Image
            src="https://genomicsentinel.com/GenomicSentinelLogo.png"
            alt="Genomic Sentinel - Home"
            width={200}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </a>
        <a
          href="#apply"
          className="hidden sm:inline-flex items-center px-5 py-2 bg-[#002147] text-white text-sm font-semibold font-heading rounded hover:bg-[#003166] transition-colors duration-200"
        >
          Join the Pilot
        </a>
        {/* Mobile CTA */}
        <a
          href="#apply"
          className="sm:hidden inline-flex items-center px-4 py-2 bg-[#002147] text-white text-xs font-semibold font-heading rounded hover:bg-[#003166] transition-colors duration-200"
        >
          Apply
        </a>
      </div>
    </nav>
  );
}
