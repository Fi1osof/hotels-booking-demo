import styled, { css } from 'styled-components'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning'

interface BadgeStyledProps {
  $variant: BadgeVariant
}

const variantStyles = {
  default: css`
    background: #f1f5f9;
    color: #475569;
  `,
  primary: css`
    background: #dbeafe;
    color: #1d4ed8;
  `,
  success: css`
    background: #dcfce7;
    color: #16a34a;
  `,
  warning: css`
    background: #fef3c7;
    color: #d97706;
  `,
}

export const BadgeStyled = styled.span<BadgeStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 9999px;
  ${({ $variant }) => variantStyles[$variant]}
`
