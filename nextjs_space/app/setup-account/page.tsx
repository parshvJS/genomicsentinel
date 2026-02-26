'use client';

import { useState, useEffect, FormEvent, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

function SetupAccountContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setValidating(false);
      setLoading(false);
      return;
    }

    fetch(`/api/setup-account/validate?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setTokenValid(true);
          setUserEmail(data.email);
          setUserName(data.fullName);
        }
        setValidating(false);
        setLoading(false);
      })
      .catch(() => {
        setValidating(false);
        setLoading(false);
      });
  }, [token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validate email matches
    if (email.toLowerCase().trim() !== userEmail.toLowerCase()) {
      setError('Please enter the email address associated with your early access application.');
      return;
    }

    // Validate password
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/setup-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email: email.toLowerCase().trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'An error occurred. Please try again.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch {
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded border font-body text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-teal-500 ${
      hasError
        ? 'border-red-400 bg-red-50'
        : 'border-[oklch(0.928_0.006_264.531)] bg-white focus:border-[rgb(0,128,128)]'
    }`;

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
        <div className="max-w-[480px] mx-auto px-6">
          {validating ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                <svg className="animate-spin" width="24" height="24" fill="none" stroke="rgb(0,128,128)" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-body text-base" style={{ color: 'rgb(112,128,144)' }}>Validating your access link...</p>
            </div>
          ) : !token || !tokenValid ? (
            <div
              className="bg-white rounded-[10px] border p-8 md:p-10 text-center"
              style={{ borderColor: 'oklch(0.928 0.006 264.531)' }}
            >
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}
              >
                <svg width="28" height="28" fill="none" stroke="#ef4444" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="font-heading font-bold text-2xl text-[#002147] mb-3">
                Invalid or Expired Link
              </h1>
              <p className="font-body text-base mb-6" style={{ color: 'rgb(112,128,144)' }}>
                This access link is invalid or has expired. Please request a new early access invitation.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-[#002147] text-white font-heading font-semibold text-sm rounded hover:bg-[#003166] transition-colors"
              >
                Return to Home
              </Link>
            </div>
          ) : success ? (
            <div
              className="bg-white rounded-[10px] border p-8 md:p-10 text-center animate-fade-in"
              style={{ borderColor: 'oklch(0.928 0.006 264.531)' }}
            >
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(0,128,128,0.1)' }}
              >
                <svg width="28" height="28" fill="none" stroke="rgb(0,128,128)" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="font-heading font-bold text-2xl text-[#002147] mb-3">
                Account Created Successfully!
              </h1>
              <p className="font-body text-base" style={{ color: 'rgb(112,128,144)' }}>
                Redirecting you to the login page...
              </p>
            </div>
          ) : (
            <div
              className="bg-white rounded-[10px] border p-8 md:p-10"
              style={{ borderColor: 'oklch(0.928 0.006 264.531)' }}
            >
              <div className="text-center mb-8">
                <h1 className="font-heading font-bold text-2xl text-[#002147] mb-2">
                  Welcome, {userName}!
                </h1>
                <p className="font-body text-base" style={{ color: 'rgb(112,128,144)' }}>
                  Set up your password to access Genomic Sentinel.
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
                    className={inputClass(false)}
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
                    placeholder="Create a password (min. 8 characters)"
                    className={inputClass(false)}
                    required
                    minLength={8}
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block font-heading font-semibold text-sm text-[#002147] mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className={inputClass(false)}
                    required
                    minLength={8}
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
                      Setting up...
                    </>
                  ) : (
                    <>Set Up My Account</>  
                  )}
                </button>
              </form>
            </div>
          )}
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

// Loading fallback for Suspense
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'oklch(0.97 0.002 250)' }}>
      <div className="text-center">
        <svg className="animate-spin mx-auto mb-4" width="32" height="32" fill="none" stroke="rgb(0,128,128)" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
        </svg>
        <p className="font-body text-base" style={{ color: 'rgb(112,128,144)' }}>Loading...</p>
      </div>
    </div>
  );
}

export default function SetupAccountPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SetupAccountContent />
    </Suspense>
  );
}
