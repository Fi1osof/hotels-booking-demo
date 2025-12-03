import styled, { css, DefaultTheme } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonStyledProps {
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
}

const variantStyles = (theme: DefaultTheme) => ({
  primary: css`
    background: ${theme.colors.primary};
    color: #fff;
    border: none;

    &:hover:not(:disabled) {
      background: ${theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background: ${theme.colors.secondary};
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.border};

    &:hover:not(:disabled) {
      background: ${theme.colors.secondaryHover};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${theme.colors.primary};
    border: none;

    &:hover:not(:disabled) {
      background: ${theme.colors.secondary};
    }
  `,
})

const sizeStyles = (theme: DefaultTheme) => ({
  sm: css`
    padding: 6px ${theme.spacing.md};
    font-size: ${theme.fontSizes.xs};
  `,
  md: css`
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: ${theme.fontSizes.sm};
  `,
  lg: css`
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    font-size: ${theme.fontSizes.md};
  `,
})

export const ButtonStyled = styled.button<ButtonStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $variant, theme }) => variantStyles(theme)[$variant]}
  ${({ $size, theme }) => sizeStyles(theme)[$size]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`
