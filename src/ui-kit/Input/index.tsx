import React from 'react'
import { InputWrapper, InputLabel, InputStyled } from './styles'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <InputWrapper>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <InputStyled id={id} {...props} />
    </InputWrapper>
  )
}
