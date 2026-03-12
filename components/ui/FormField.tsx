import { cn } from "@/lib/utils";

type BaseFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
};

type InputFieldProps = BaseFieldProps & {
  as?: "input";
  type?: "text" | "email" | "tel";
};

type TextareaFieldProps = BaseFieldProps & {
  as: "textarea";
  rows?: number;
};

type FormFieldProps = InputFieldProps | TextareaFieldProps;

export function FormField(props: FormFieldProps) {
  const { id, label, placeholder, required, error, value, onChange } = props;
  const fieldClassName = cn(
    "mt-2 w-full rounded-2xl border bg-panel/85 px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-accent/45",
    error ? "border-rose-400/60" : "border-line/15",
  );

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </label>
      {props.as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={props.rows ?? 5}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClassName}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={props.type ?? "text"}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClassName}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
