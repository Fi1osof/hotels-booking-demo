import React from 'react'
import { ButtonStyled, ButtonVariant, ButtonSize } from './styles'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <ButtonStyled $variant={variant} $size={size} $fullWidth={fullWidth} {...props}>
      {children}
    </ButtonStyled>
  )
}
