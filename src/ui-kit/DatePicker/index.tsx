import React, { useCallback } from 'react'
import { DatePickerWrapper, DatePickerLabel, DatePickerInput } from './styles'

export interface DatePickerProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  label?: string
  onChange?: (value: string) => void
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, id, onChange, ...props }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    },
    [onChange]
  )

  return (
    <DatePickerWrapper>
      {label && <DatePickerLabel htmlFor={id}>{label}</DatePickerLabel>}
      <DatePickerInput type="date" id={id} onChange={handleChange} {...props} />
    </DatePickerWrapper>
  )
}
