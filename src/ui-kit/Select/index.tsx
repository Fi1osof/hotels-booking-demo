import React, { useCallback } from 'react'
import { SelectWrapper, SelectLabel, SelectStyled } from './styles'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'onChange'
> {
  label?: string
  options: SelectOption[]
  onChange?: (value: string) => void
}

export const Select: React.FC<SelectProps> = ({ label, options, id, onChange, ...props }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value)
    },
    [onChange]
  )

  return (
    <SelectWrapper>
      {label && <SelectLabel htmlFor={id}>{label}</SelectLabel>}
      <SelectStyled id={id} onChange={handleChange} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectStyled>
    </SelectWrapper>
  )
}
