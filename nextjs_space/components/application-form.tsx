'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface FormData {
  fullName: string;
  email: string;
  institution: string;
  researchFocus: string;
  role: string;
  useCase: string;
}

const initialForm: FormData = {
  fullName: '',
  email: '',
  institution: '',
  researchFocus: '',
  role: '',
  useCase: '',
};

const roleOptions = [
  'Principal Investigator',
  'Research Scientist',
  'Postdoctoral Researcher',
  'PhD Student',
  'Genetic Counselor',
  'Lab Director',
  'Bioinformatician',
  'Other',
];

export default function ApplicationForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem('waitListJoined') === 'true') {
      setSubmitted(true);
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.fullName?.trim()) newErrors.fullName = 'Full name is required.';
    if (!form.email?.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.institution?.trim()) newErrors.institution = 'Institution or lab name is required.';
    if (!form.researchFocus?.trim()) newErrors.researchFocus = 'Research focus is required.';
    if (!form.role) newErrors.role = 'Please select your role.';
    if (!form.useCase?.trim()) newErrors.useCase = 'Please describe your use case.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('https://backend.jamesscott.tech/webhook/genomicsentinel-early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          companyName: form.institution,
          researchFocus: form.researchFocus,
          role: form.role,
          description: form.useCase,
        }),
      });
      const data = await res.json();
      if (!data?.success) {
        setServerError('Something went wrong. Please try again.');
      } else {
        localStorage.setItem('waitListJoined', 'true');
        setSubmitted(true);
        setForm(initialForm);
      }
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded border font-body text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-teal-500 ${
      errors[field]
        ? 'border-red-400 bg-red-50'
        : 'border-[oklch(0.928_0.006_264.531)] bg-white focus:border-[rgb(0,128,128)]'
    }`;

  return (
    <section
      id="apply"
      className="py-20 md:py-28"
      style={{ backgroundColor: 'oklch(0.985 0.002 247.839)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Labels */}
        <p className="font-heading font-semibold text-xs tracking-widest uppercase mb-4 text-center" style={{ color: 'rgb(0,128,128)' }}>
          Join the Pilot
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#002147] text-center mb-3">
          Tell Us About Your Research
        </h2>
        <p className="font-body text-base md:text-lg text-center mb-10 max-w-xl mx-auto" style={{ color: 'rgb(112,128,144)' }}>
          We&apos;ll review your application and send login credentials to your email within 24 hours.
        </p>

        {/* Form Card */}
        <div
          className="max-w-[580px] mx-auto bg-white rounded-[10px] border p-8 md:p-10 shadow-card"
          style={{ borderColor: 'oklch(0.928 0.006 264.531)' }}
        >
          {submitted ? (
            <div className="text-center py-8 animate-fade-in">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(0,128,128,0.1)' }}
              >
                <svg width="28" height="28" fill="none" stroke="rgb(0,128,128)" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#002147] mb-3">
                Application Received!
              </h3>
              <p className="font-body text-base leading-relaxed mb-4" style={{ color: 'rgb(112,128,144)' }}>
                We&apos;ll review your application and be in touch within 24 hours.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(0,128,128,0.1)' }}>
                <svg width="16" height="16" fill="none" stroke="rgb(0,128,128)" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-heading text-sm font-semibold" style={{ color: 'rgb(0,128,128)' }}>
                  Submitted
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block font-heading font-semibold text-sm text-[#002147] mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Dr. Jane Smith"
                  className={inputClass('fullName')}
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500 font-heading">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block font-heading font-semibold text-sm text-[#002147] mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane.smith@university.edu"
                  className={inputClass('email')}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500 font-heading">{errors.email}</p>}
              </div>

              {/* Institution */}
              <div>
                <label className="block font-heading font-semibold text-sm text-[#002147] mb-1.5">
                  Institution or Lab Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="institution"
                  value={form.institution}
                  onChange={handleChange}
                  placeholder="Stanford Genomics Lab"
                  className={inputClass('institution')}
                />
                {errors.institution && <p className="mt-1 text-xs text-red-500 font-heading">{errors.institution}</p>}
              </div>

              {/* Research Focus */}
              <div>
                <label className="block font-heading font-semibold text-sm text-[#002147] mb-1.5">
                  Research Focus <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="researchFocus"
                  value={form.researchFocus}
                  onChange={handleChange}
                  placeholder="e.g. Oncogenomics, Rare Variants, Pharmacogenomics..."
                  className={inputClass('researchFocus')}
                />
                {errors.researchFocus && <p className="mt-1 text-xs text-red-500 font-heading">{errors.researchFocus}</p>}
              </div>

              {/* Role */}
              <div>
                <label className="block font-heading font-semibold text-sm text-[#002147] mb-1.5">
                  Your Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className={`${inputClass('role')} cursor-pointer`}
                >
                  <option value="" disabled>Select your role...</option>
                  {roleOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.role && <p className="mt-1 text-xs text-red-500 font-heading">{errors.role}</p>}
              </div>

              {/* Use Case */}
              <div>
                <label className="block font-heading font-semibold text-sm text-[#002147] mb-1.5">
                  What do you want to use Genomic Sentinel for? <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="useCase"
                  value={form.useCase}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe what you're working on and how you'd apply Genomic Sentinel to your research..."
                  className={`${inputClass('useCase')} resize-none`}
                />
                {errors.useCase && <p className="mt-1 text-xs text-red-500 font-heading">{errors.useCase}</p>}
              </div>

              {/* Server error */}
              {serverError && (
                <div className="p-3 rounded bg-red-50 border border-red-200">
                  <p className="text-xs text-red-600 font-heading">{serverError}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#002147] text-white font-heading font-bold text-sm rounded hover:bg-[#003166] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>Request My Early Access Spot →</>
                )}
              </button>

              <p className="text-xs text-center font-body" style={{ color: 'rgb(112,128,144)' }}>
                By submitting, you agree to receive platform access details and occasional product updates from Genomic Sentinel. No spam. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
