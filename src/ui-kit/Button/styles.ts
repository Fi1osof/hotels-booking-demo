import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonStyledProps {
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
}

const variantStyles = {
  primary: css`
    background: #2563eb;
    color: #fff;
    border: none;

    &:hover:not(:disabled) {
      background: #1d4ed8;
    }
  `,
  secondary: css`
    background: #f1f5f9;
    color: #334155;
    border: 1px solid #e2e8f0;

    &:hover:not(:disabled) {
      background: #e2e8f0;
    }
  `,
  ghost: css`
    background: transparent;
    color: #2563eb;
    border: none;

    &:hover:not(:disabled) {
      background: #f1f5f9;
    }
  `,
}

const sizeStyles = {
  sm: css`
    padding: 6px 12px;
    font-size: 12px;
  `,
  md: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  lg: css`
    padding: 12px 24px;
    font-size: 16px;
  `,
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
`
