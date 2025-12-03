import styled from 'styled-components'

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const SelectLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`

export const SelectStyled = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} 32px ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M2 4l4 4 4-4'/%3E%3C/svg%3E") no-repeat right ${({ theme }) => theme.spacing.md} center;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  appearance: none;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.borderHover};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundMuted};
    cursor: not-allowed;
  }
`
