"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { contactPageData } from "@/data/contact";

type FormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.company.trim()) {
    errors.company = "Company is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
}

export function ConsultationForm() {
  const { form } = contactPageData;
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const hasErrors = Object.keys(errors).length > 0;

  const updateField = (field: keyof FormValues, value: string) => {
    setSubmitted(false);
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setValues(initialValues);
  };

  return (
    <div className="panel-surface rounded-[2rem] p-6 sm:p-8">
      <div className="border-b border-line/10 pb-6">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink">{form.title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted">{form.description}</p>
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="name"
            label="Name"
            required
            value={values.name}
            error={errors.name}
            onChange={(value) => updateField("name", value)}
            placeholder="Your name"
          />
          <FormField
            id="company"
            label="Company"
            required
            value={values.company}
            error={errors.company}
            onChange={(value) => updateField("company", value)}
            placeholder="Organization"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="email"
            label="Email"
            type="email"
            required
            value={values.email}
            error={errors.email}
            onChange={(value) => updateField("email", value)}
            placeholder="name@company.com"
          />
          <FormField
            id="phone"
            label="Phone"
            type="tel"
            value={values.phone}
            error={errors.phone}
            onChange={(value) => updateField("phone", value)}
            placeholder="Optional"
          />
        </div>

        <FormField
          id="message"
          as="textarea"
          label="Message"
          required
          value={values.message}
          error={errors.message}
          onChange={(value) => updateField("message", value)}
          placeholder="Share the context, current priorities, or areas of concern."
          rows={6}
        />

        <div className="flex flex-col gap-3 border-t border-line/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {submitted
              ? form.successMessage
              : "Consultation requests are handled discreetly and answered within normal business time."}
          </p>
          <Button type="submit">{form.submitLabel}</Button>
        </div>

        {hasErrors ? (
          <p className="text-sm text-rose-300" aria-live="polite">
            Review the highlighted fields and try again.
          </p>
        ) : null}

        {submitted ? (
          <p className="text-sm text-accent" aria-live="polite">
            Consultation request submitted.
          </p>
        ) : null}
      </form>
    </div>
  );
}
