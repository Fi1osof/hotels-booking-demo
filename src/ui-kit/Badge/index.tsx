import React from 'react'
import { BadgeStyled, BadgeVariant } from './styles'

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  return <BadgeStyled $variant={variant}>{children}</BadgeStyled>
}
