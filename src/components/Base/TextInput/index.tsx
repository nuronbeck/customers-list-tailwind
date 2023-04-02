import type { InputHTMLAttributes } from 'react';

interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  caption?: string;
  type?: 'text' | 'email' | 'password';
}

const TextInput = ({ label, type = 'text', caption, ...props }: ITextInput) => {
  return (
    <label className="block mb-6">
      {label && <span className="field-group-label">{label}</span>}

      <input
        type={type}
        className="w-full bg-white rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#BAE6FD] text-base outline-none text-gray-700 py-2 px-3 transition-colors duration-200 ease-in-out"
        {...props}
      />

      {caption && (
        <span className="block leading-7 font-normal text-sm text-[#94A3B8] mt-[10px]">
          {caption}
        </span>
      )}
    </label>
  );
};

export default TextInput;
