import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Clock } from 'lucide-react';
import {
  ContactFormInput,
  SubmittedInquiry,
  validateContactForm,
  createInquiryReferenceCode,
} from '../utils/portfolioLogic';

interface ContactSectionProps {
  isDark: boolean;
  preselectedWorkTitle: string | null;
  onClearPreselectedWork: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isDark,
  preselectedWorkTitle,
  onClearPreselectedWork,
}) => {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    projectType: 'Architectural Commission',
    locationOrTimeline: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [submittedInquiries, setSubmittedInquiries] = useState<SubmittedInquiry[]>([]);
  const [justSubmittedRef, setJustSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedWorkTitle) {
      setFormData((prev) => ({
        ...prev,
        projectType: 'Archival Fine Art Print',
        locationOrTimeline: prev.locationOrTimeline || `Edition Inquiry: ${preselectedWorkTitle}`,
        message:
          prev.message ||
          `Hello Soren, I would like to request edition availability, framing options, and pricing for the archival print "${preselectedWorkTitle}".`,
      }));
    }
  }, [preselectedWorkTitle]);

  const handleChange = (
    field: keyof ContactFormInput,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.valid) {
      setErrors(validation.errors);
      setJustSubmittedRef(null);
      return;
    }

    const referenceCode = createInquiryReferenceCode(
      formData.name,
      submittedInquiries.length + 1
    );

    const newInquiry: SubmittedInquiry = {
      ...formData,
      id: `${Date.now()}`,
      referenceCode,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      selectedWorkTitle: preselectedWorkTitle || undefined,
    };

    setSubmittedInquiries((prev) => [newInquiry, ...prev]);
    setJustSubmittedRef(referenceCode);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      projectType: 'Architectural Commission',
      locationOrTimeline: '',
      message: '',
    });
    if (preselectedWorkTitle) {
      onClearPreselectedWork();
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`py-14 sm:py-20 border-t ${
        isDark ? 'border-zinc-800/80' : 'border-zinc-200'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct Studio Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <p
                className={`text-xs font-medium tracking-wide mb-2 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                04. Commissions &amp; Collector Desk
              </p>

              <h2
                id="contact-heading"
                className={`font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-balance ${
                  isDark ? 'text-zinc-50' : 'text-zinc-950'
                }`}
              >
                Inquire about commissions, licensing, or archival prints.
              </h2>

              <p
                className={`text-sm leading-relaxed mb-8 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                No account or sign-up is required. Send a direct dispatch to the studio for
                architectural documentation bookings, editorial assignments, or signed Collector
                Edition prints.
              </p>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>
                      Direct Studio Email
                    </p>
                    <a
                      href="mailto:studio@sorenlindqvist.dk"
                      className={`font-mono-exif underline-offset-4 hover:underline ${
                        isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                      }`}
                    >
                      studio@sorenlindqvist.dk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>
                      Darkroom &amp; Archive Studio
                    </p>
                    <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>
                      Bredgade 45, 1260 København K · Denmark
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>
                      Booking Availability
                    </p>
                    <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>
                      Accepting Q4 2026 &amp; Q1 2027 European &amp; International Commissions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submitted Inquiries Log (Demonstrates End-to-End State Persistence) */}
            {submittedInquiries.length > 0 && (
              <div
                className={`rounded-2xl border p-5 ${
                  isDark
                    ? 'border-zinc-800 bg-zinc-900/50 text-zinc-200'
                    : 'border-zinc-200 bg-zinc-100/80 text-zinc-800'
                }`}
              >
                <h3 className="font-display text-sm font-semibold mb-3">
                  Dispatched Studio Inquiries ({submittedInquiries.length})
                </h3>
                <ul className="space-y-3 text-xs">
                  {submittedInquiries.map((item) => (
                    <li
                      key={item.id}
                      className={`pb-3 border-b last:border-b-0 last:pb-0 ${
                        isDark ? 'border-zinc-800' : 'border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 font-mono-exif text-[11px] text-[#F2B705] mb-1">
                        <span>Ref: {item.referenceCode}</span>
                        <span>{item.submittedAt}</span>
                      </div>
                      <p className="font-medium">
                        {item.name} · {item.projectType}
                      </p>
                      <p className={isDark ? 'text-zinc-400 mt-0.5' : 'text-zinc-600 mt-0.5'}>
                        {item.locationOrTimeline}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className={`rounded-2xl border p-6 sm:p-8 space-y-6 ${
                isDark ? 'border-zinc-800/90 bg-zinc-900/30' : 'border-zinc-200 bg-white'
              }`}
            >
              {preselectedWorkTitle && (
                <div
                  className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl border text-xs ${
                    isDark
                      ? 'border-zinc-700 bg-zinc-900 text-zinc-200'
                      : 'border-zinc-300 bg-zinc-50 text-zinc-800'
                  }`}
                >
                  <span>
                    Inquiring about plate: <strong>{preselectedWorkTitle}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={onClearPreselectedWork}
                    className="underline hover:text-[#F2B705] whitespace-nowrap cursor-pointer"
                  >
                    Clear Selection
                  </button>
                </div>
              )}

              {justSubmittedRef && (
                <div
                  role="status"
                  className={`flex items-start gap-3 p-4 rounded-xl border text-xs sm:text-sm ${
                    isDark
                      ? 'border-emerald-800/70 bg-emerald-950/40 text-emerald-200'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">
                      Inquiry Received · Reference{' '}
                      <span className="font-mono-exif">{justSubmittedRef}</span>
                    </p>
                    <p className="mt-1 opacity-90">
                      Thank you. Your commission or print dossier has been logged with the
                      Copenhagen studio desk. Soren or our archivist will respond within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className={`block text-xs font-medium mb-2 ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    Your Name or Studio *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g., Astrid Lindholm"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-colors focus:outline-none focus:border-[#F2B705] ${
                      errors.name
                        ? 'border-rose-500'
                        : isDark
                        ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600'
                        : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="error-name"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className={`block text-xs font-medium mb-2 ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="astrid@nordicarchitects.dk"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-colors focus:outline-none focus:border-[#F2B705] ${
                      errors.email
                        ? 'border-rose-500'
                        : isDark
                        ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600'
                        : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="error-email"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Inquiry Type */}
                <div>
                  <label
                    htmlFor="contact-type"
                    className={`block text-xs font-medium mb-2 ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    Inquiry Category
                  </label>
                  <select
                    id="contact-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={(e) =>
                      handleChange(
                        'projectType',
                        e.target.value as ContactFormInput['projectType']
                      )
                    }
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-colors focus:outline-none focus:border-[#F2B705] ${
                      isDark
                        ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
                        : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  >
                    <option value="Architectural Commission">Architectural Commission</option>
                    <option value="Editorial Assignment">Editorial Assignment</option>
                    <option value="Archival Fine Art Print">Archival Fine Art Print</option>
                    <option value="Exhibition & Licensing">Exhibition &amp; Licensing</option>
                  </select>
                </div>

                {/* Location / Timeline */}
                <div>
                  <label
                    htmlFor="contact-location"
                    className={`block text-xs font-medium mb-2 ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    Location, Print Format, or Timeline *
                  </label>
                  <input
                    id="contact-location"
                    name="locationOrTimeline"
                    type="text"
                    value={formData.locationOrTimeline}
                    onChange={(e) => handleChange('locationOrTimeline', e.target.value)}
                    placeholder="e.g., Oslo · November 2026 or 80×100cm Print"
                    aria-invalid={Boolean(errors.locationOrTimeline)}
                    aria-describedby={errors.locationOrTimeline ? 'error-location' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-colors focus:outline-none focus:border-[#F2B705] ${
                      errors.locationOrTimeline
                        ? 'border-rose-500'
                        : isDark
                        ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600'
                        : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                    }`}
                  />
                  {errors.locationOrTimeline && (
                    <p
                      id="error-location"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.locationOrTimeline}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Project Brief / Message */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="contact-message"
                    className={`block text-xs font-medium ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    Project Brief or Print Details *
                  </label>
                  <span
                    className={`text-[11px] font-mono-exif ${
                      isDark ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                  >
                    {formData.message.trim().length} chars (min 20)
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Describe the architectural structure, location, lighting requirements, or the archival edition you wish to acquire..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-colors focus:outline-none focus:border-[#F2B705] ${
                    errors.message
                      ? 'border-rose-500'
                      : isDark
                      ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600'
                      : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                  }`}
                />
                {errors.message && (
                  <p
                    id="error-message"
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  Direct studio correspondence · Zero automated bots or mailing lists.
                </p>

                <button
                  type="submit"
                  className={`inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isDark
                      ? 'bg-[#F2B705] text-zinc-950 hover:bg-[#facc15]'
                      : 'bg-zinc-900 text-white hover:bg-zinc-800'
                  }`}
                >
                  <span>Send Studio Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
