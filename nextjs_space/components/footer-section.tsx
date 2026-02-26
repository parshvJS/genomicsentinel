import Image from 'next/image';

export default function FooterSection() {
  return (
    <footer className="bg-[#002147] py-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="https://genomicsentinel.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/logo-footer.png"
              alt="Genomic Sentinel - Footer"
              width={180}
              height={44}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
          </a>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-heading text-sm hover:text-white transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Privacy Policy
            </a>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <a
              href="#"
              className="font-heading text-sm hover:text-white transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Terms of Service
            </a>
          </div>

          {/* Copyright */}
          <p className="font-heading text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            © 2026 Genomic Sentinel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
