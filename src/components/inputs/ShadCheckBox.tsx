import React from "react";

interface ShadCheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const ShadCheckBox: React.FC<ShadCheckBoxProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        className={`h-4 w-4 rounded border border-primary text-primary  focus:ring-offset-0 transition-all duration-150 checked:bg-primary checked:border-primary checked:text-white ${className}`}
        {...props}
      />
      {label && <span className="text-sm text-primary">{label}</span>}
      {error && <span className="ml-2 text-xs text-destructive">{error}</span>}
    </label>
  );
};

export default ShadCheckBox;
