import type { HTMLProps, ReactNode } from "react";

export interface SelectOptionsProps {
  value: string;
  children: ReactNode;
}

interface SelectProps extends HTMLProps<HTMLSelectElement> {
  options: string[] | SelectOptionsProps[];
}

export function Select({ options, ...props }: SelectProps) {
  const renderOptions = options.map(option =>
    typeof option === "string" ? { value: option, children: option } : option,
  );
  return (
    <select {...props}>
      {renderOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.children}
        </option>
      ))}
    </select>
  );
}
