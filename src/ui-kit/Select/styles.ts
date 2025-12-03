import styled from 'styled-components'

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const SelectLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #334155;
`

export const SelectStyled = styled.select`
  padding: 8px 32px 8px 12px;
  font-size: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M2 4l4 4 4-4'/%3E%3C/svg%3E") no-repeat right 12px center;
  color: #1e293b;
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #cbd5e1;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:disabled {
    background-color: #f8fafc;
    cursor: not-allowed;
  }
`
