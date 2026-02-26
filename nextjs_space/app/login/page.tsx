'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email?.trim() || !password?.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Redirect to genomicsentinel.com on success
      window.location.href = 'https://genomicsentinel.com';
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded border font-body text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-teal-500 border-[oklch(0.928_0.006_264.531)] bg-white focus:border-[rgb(0,128,128)]';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.002 250)' }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: 'oklch(0.928 0.006 264.531)' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src="https://genomicsentinel.com/GenomicSentinelLogo.png"
              alt="Genomic Sentinel"
              width={180}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 md:py-24">
        <div className="max-w-[420px] mx-auto px-6">
          <div
            className="bg-white rounded-[10px] border p-8 md:p-10"
            style={{ borderColor: 'oklch(0.928 0.006 264.531)' }}
          >
            <div className="text-center mb-8">
              <h1 className="font-heading font-bold text-2xl text-[#002147] mb-2">
                Welcome Back
              </h1>
              <p className="font-body text-base" style={{ color: 'rgb(112,128,144)' }}>
                Sign in to access Genomic Sentinel.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block font-heading font-semibold text-sm text-[#002147] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={inputClass}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block font-heading font-semibold text-sm text-[#002147] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={inputClass}
                  required
                />
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 rounded bg-red-50 border border-red-200">
                  <p className="text-xs text-red-600 font-heading">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#002147] text-white font-heading font-bold text-sm rounded hover:bg-[#003166] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>Sign In</>  
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="font-body text-sm" style={{ color: 'rgb(112,128,144)' }}>
                Don&apos;t have an account?{' '}
                <Link href="/" className="font-semibold hover:underline" style={{ color: 'rgb(0,128,128)' }}>
                  Request early access
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#002147] py-8">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-white/60 text-sm font-body">
            © 2026 Genomic Sentinel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
