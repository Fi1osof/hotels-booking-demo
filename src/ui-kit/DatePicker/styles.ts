import styled from 'styled-components'

export const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const DatePickerLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #334155;
`

export const DatePickerInput = styled.input`
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #fff;
  color: #1e293b;
  cursor: pointer;
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
    background: #f8fafc;
    cursor: not-allowed;
  }
`
