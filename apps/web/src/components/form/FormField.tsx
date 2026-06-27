import React from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
   name: string;
   label: string;
   type?: string;
   required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
   name,
   label,
   type = 'text',
   required,
   placeholder,
   disabled = false,
   ...rest
}) => {
   return (
      <div className="form-container">
         <label htmlFor={name} className="form-label">
            {label}
            {required && <span className="text-red-500"> *</span>}
         </label>
         <input
            id={name}
            name={name}
            type={type}
            className="form-field"
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
         />
      </div>
   );
};

export default FormField;
