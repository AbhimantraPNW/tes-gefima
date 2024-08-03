import React from 'react';

import { FormikHandlers } from 'formik';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface FormTextAreaProps {
  name: string;
  placeholder: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  value: string;
  isError: boolean;
  error: string | undefined;
  label: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  name,
  label,
  placeholder,
  onChange,
  onBlur,
  value,
  isError,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name} className={isError ? 'text-red-500' : ''}>
        {label}
      </Label>
      <Textarea
        name={name}
        placeholder={placeholder}
        style={{ resize: 'none' }}
        rows={4}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {isError ? <div className="text-xs text-red-500">{error}</div> : null}
    </div>
  );
};

export default FormTextArea;
