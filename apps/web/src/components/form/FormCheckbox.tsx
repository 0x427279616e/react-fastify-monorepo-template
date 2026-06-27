import React from 'react';

interface FormCheckboxProps {
   name: string;
   label: string;
   checked?: boolean;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label, checked, onChange }) => {
   return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
         <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            className="form-checkbox"
         />
         <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
      </label>
   );
};

export default FormCheckbox;
