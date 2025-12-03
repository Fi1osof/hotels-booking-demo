import styled, { css, DefaultTheme } from 'styled-components'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning'

interface BadgeStyledProps {
  $variant: BadgeVariant
}

const variantStyles = (theme: DefaultTheme) => ({
  default: css`
    background: ${theme.colors.secondary};
    color: ${theme.colors.textMuted};
  `,
  primary: css`
    background: #dbeafe;
    color: ${theme.colors.primaryHover};
  `,
  success: css`
    background: ${theme.colors.successBg};
    color: ${theme.colors.success};
  `,
  warning: css`
    background: ${theme.colors.warningBg};
    color: ${theme.colors.warning};
  `,
})

export const BadgeStyled = styled.span<BadgeStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radii.full};
  ${({ $variant, theme }) => variantStyles(theme)[$variant]}
`
