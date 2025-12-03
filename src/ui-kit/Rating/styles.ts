import styled from 'styled-components'

export const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const RatingLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #334155;
`

export const RatingStars = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`

interface StarProps {
  $filled: boolean
  $interactive: boolean
}

export const Star = styled.button<StarProps>`
  background: none;
  border: none;
  padding: 0;
  font-size: 20px;
  color: ${({ $filled }) => ($filled ? '#fbbf24' : '#e2e8f0')};
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ $interactive }) => ($interactive ? '#fbbf24' : undefined)};
  }

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
`

export const RatingValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  margin-left: 8px;
`
