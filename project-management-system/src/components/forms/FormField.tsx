import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

function FormField({
  label,
  htmlFor,
  error,
  required = false,
  children
}: FormFieldProps) {

  return (
    <div className="form-field">

      <label htmlFor={htmlFor}>
        {label}

        {required && (
          <span className="required-mark"> *</span>
        )}
      </label>

      {children}

      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}

    </div>
  );
}

export default FormField;