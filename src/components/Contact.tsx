import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { inquiryTypes } from '../data';
import { cn } from '../utils/cn';
import { Button, ease, Reveal, scrollToId } from './Primitives';

interface FormState {
  fullName: string;
  email: string;
  company: string;
  inquiryType: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const blankForm: FormState = { fullName: '', email: '', company: '', inquiryType: '', subject: '', message: '' };
const draftKey = 'arya-worldwide-inquiry-draft';

function getInitialForm(): FormState {
  try {
    const saved = window.localStorage.getItem(draftKey);
    if (!saved) return blankForm;
    const parsed = JSON.parse(saved) as Partial<FormState>;
    return { ...blankForm, ...parsed };
  } catch {
    return blankForm;
  }
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.fullName.trim()) errors.fullName = 'Please enter your full name.';
  else if (form.fullName.trim().length < 2) errors.fullName = 'Please enter at least 2 characters.';
  if (!form.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.email.trim())) errors.email = 'Enter a valid email, such as name@company.com.';
  if (!form.inquiryType) errors.inquiryType = 'Please select an inquiry type.';
  if (!form.subject.trim()) errors.subject = 'Please add a project or subject.';
  else if (form.subject.trim().length < 3) errors.subject = 'Please enter at least 3 characters.';
  if (!form.message.trim()) errors.message = 'Please tell us a little about your inquiry.';
  else if (form.message.trim().length < 20) errors.message = 'Please add a little more detail (at least 20 characters).';
  return errors;
}

export function Contact({ requestedInquiry }: { requestedInquiry: { type: string; request: number } }) {
  const [form, setForm] = useState<FormState>(getInitialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [draftStatus, setDraftStatus] = useState<'empty' | 'saved' | 'unavailable'>('empty');

  useEffect(() => {
    if (requestedInquiry.type) {
      setForm((current) => ({ ...current, inquiryType: requestedInquiry.type }));
      setErrors((current) => ({ ...current, inquiryType: undefined }));
      setSuccess(false);
    }
  }, [requestedInquiry]);

  useEffect(() => {
    if (success) return;
    const hasContent = Object.values(form).some((value) => value.trim().length > 0);
    if (!hasContent) {
      setDraftStatus('empty');
      try { window.localStorage.removeItem(draftKey); } catch { /* Local storage is optional. */ }
      return;
    }
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(draftKey, JSON.stringify(form));
        setDraftStatus('saved');
      } catch {
        setDraftStatus('unavailable');
      }
    }, 350);
    return () => window.clearTimeout(timer);
  }, [form, success]);

  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = event.target.name as keyof FormState;
    const value = event.target.value;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const chooseInquiry = (type: string) => {
    setSuccess(false);
    setForm((current) => ({ ...current, inquiryType: type }));
    setErrors((current) => ({ ...current, inquiryType: undefined }));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.innerWidth < 1024) document.getElementById('inquiry-form')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(() => document.getElementById('inquiryType')?.focus({ preventScroll: true }), reduce ? 0 : 350);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      window.setTimeout(() => document.querySelector<HTMLElement>('#inquiry-form [aria-invalid="true"]')?.focus(), 0);
      return;
    }
    setSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 750));
    setSubmitting(false);
    setSuccess(true);
    try { window.localStorage.removeItem(draftKey); } catch { /* Local storage is optional. */ }
  };

  const reset = () => {
    setForm({ ...blankForm, inquiryType: requestedInquiry.type });
    setErrors({});
    setSuccess(false);
    setDraftStatus('empty');
    try { window.localStorage.removeItem(draftKey); } catch { /* Local storage is optional. */ }
  };

  const fieldClass = (name: keyof FormState) => cn(
    'mt-2 w-full border-0 border-b bg-transparent px-0 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-black/30 focus:border-black focus:ring-0',
    errors[name] ? 'border-black' : 'border-black/25',
  );

  const errorText = (name: keyof FormState) => errors[name] ? <p id={`${name}-error`} className="mt-2 text-[0.65rem] font-medium leading-5 text-black" role="alert"><span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full border border-black text-[0.55rem]">!</span>{errors[name]}</p> : null;

  return (
    <section id="contact" className="bg-charcoal py-24 sm:py-32 lg:py-40">
      <div className="site-shell grid gap-16 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="mb-7 flex items-center gap-4 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-white/50"><span className="h-px w-10 bg-white/40" />Contact & business inquiries</div>
            <h2 className="font-display text-[clamp(3.5rem,6.5vw,7.3rem)] uppercase leading-[0.84] tracking-[-0.04em]">Let’s create something extraordinary.</h2>
            <p className="mt-8 max-w-lg text-sm leading-8 text-white/60">Have a project, production, talent opportunity, or creative collaboration in mind? We’d love to hear from you.</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <p className="mb-4 text-[0.5rem] uppercase tracking-[0.24em] text-white/35">Select an inquiry desk</p>
            <div className="border-t border-white/15">
              {inquiryTypes.map((type, index) => (
                <button type="button" key={type} onClick={() => chooseInquiry(type)} className="group flex w-full items-center gap-4 border-b border-white/15 py-4 text-left" aria-pressed={form.inquiryType === type}>
                  <span className="text-[0.48rem] tracking-[0.18em] text-white/30">0{index + 1}</span>
                  <span className={cn('flex-1 text-xs transition-colors sm:text-sm', form.inquiryType === type ? 'text-white' : 'text-white/55 group-hover:text-white')}>{type}</span>
                  <ArrowRight className={cn('h-4 w-4 transition-all group-hover:translate-x-1', form.inquiryType === type ? 'text-white' : 'text-white/25')} strokeWidth={1.2} />
                </button>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[0.5rem] uppercase tracking-[0.2em] text-white/35"><span>Los Angeles / Worldwide</span><span>aryaworldwideent.com</span></div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7" y={35}>
          <div id="inquiry-form" className="scroll-mt-24 bg-ivory p-6 text-charcoal sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease }} className="flex min-h-[570px] flex-col items-start justify-center" role="status">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-black/30"><Check className="h-6 w-6" strokeWidth={1.2} /></span>
                  <p className="mt-8 text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-black/45">Front-end demo confirmation</p>
                  <h3 className="mt-5 font-display text-5xl uppercase leading-[0.9] sm:text-6xl">Your inquiry is ready.</h3>
                  <p className="mt-6 max-w-lg text-sm leading-7 text-black/65">All required fields passed validation. <strong>No message or email has been sent</strong>, because this design presentation has no backend or delivery service connected.</p>
                  <div className="mt-6 w-full border-y border-black/15 py-5 text-xs leading-6 text-black/55"><span className="block text-[0.48rem] uppercase tracking-[0.18em] text-black/40">Prepared for</span>{form.inquiryType}<br /><span className="text-black/40">{form.subject}</span></div>
                  <div className="mt-8 flex flex-wrap gap-5">
                    <Button variant="dark" onClick={reset}>Create another inquiry</Button>
                    <Button variant="text-dark" onClick={() => scrollToId('work')}>Return to selected works</Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -15 }} onSubmit={submit} noValidate>
                  <div className="mb-9 flex items-start justify-between gap-5 border-b border-black/15 pb-6">
                    <div><p className="text-[0.53rem] font-semibold uppercase tracking-[0.24em]">Start a conversation</p><p className="mt-2 text-xs text-black/45">Required fields are marked *</p></div>
                    <span className="font-display text-3xl italic text-black/20">AW</span>
                  </div>
                  <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
                    <label className="block text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-black/60">Full Name *
                      <input className={fieldClass('fullName')} name="fullName" value={form.fullName} onChange={update} autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
                      {errorText('fullName')}
                    </label>
                    <label className="block text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-black/60">Email Address *
                      <input className={fieldClass('email')} name="email" type="email" value={form.email} onChange={update} autoComplete="email" placeholder="name@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                      {errorText('email')}
                    </label>
                    <label className="block text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-black/60">Company / Organization
                      <input className={fieldClass('company')} name="company" value={form.company} onChange={update} autoComplete="organization" placeholder="Optional" />
                    </label>
                    <label className="block text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-black/60">Inquiry Type *
                      <select id="inquiryType" className={cn(fieldClass('inquiryType'), 'cursor-pointer')} name="inquiryType" value={form.inquiryType} onChange={update} aria-invalid={Boolean(errors.inquiryType)} aria-describedby={errors.inquiryType ? 'inquiryType-error' : undefined}>
                        <option value="" disabled>Select a desk</option>
                        {inquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                      </select>
                      {errorText('inquiryType')}
                    </label>
                    <label className="block text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-black/60 sm:col-span-2">Project / Subject *
                      <input className={fieldClass('subject')} name="subject" value={form.subject} onChange={update} placeholder="What would you like to discuss?" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} />
                      {errorText('subject')}
                    </label>
                    <label className="block text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-black/60 sm:col-span-2">Message *
                      <textarea className={cn(fieldClass('message'), 'min-h-32 resize-y')} name="message" value={form.message} onChange={update} placeholder="Share the creative context, opportunity, and any useful timing details." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
                      <div className="mt-2 flex items-start justify-between gap-4">{errorText('message')}<span className="ml-auto text-[0.5rem] font-normal tabular-nums tracking-[0.1em] text-black/35">{form.message.length} characters</span></div>
                    </label>
                  </div>
                  <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <Button variant="dark" type="submit" disabled={submitting} arrow={!submitting} className="sm:min-w-48">
                      {submitting ? <span className="inline-flex items-center gap-3"><LoaderCircle className="h-4 w-4 animate-spin" />Preparing demo</span> : 'Send inquiry'}
                    </Button>
                    <p className="max-w-[15rem] text-[0.5rem] uppercase leading-5 tracking-[0.14em] text-black/40">Demo only · No message will be transmitted.</p>
                  </div>
                  <div className="mt-7 flex items-center justify-between gap-4 border-t border-black/10 pt-5 text-[0.48rem] uppercase tracking-[0.14em] text-black/35">
                    <span aria-live="polite">{draftStatus === 'saved' ? 'Draft saved in this browser only' : draftStatus === 'unavailable' ? 'Local draft saving unavailable' : 'Draft saves locally as you type'}</span>
                    {draftStatus === 'saved' && <button type="button" className="underline underline-offset-4 hover:text-black" onClick={reset}>Clear draft</button>}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
