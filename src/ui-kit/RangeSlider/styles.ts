import styled from 'styled-components'

export const RangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const RangeLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #334155;
`

export const RangeInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const RangeInput = styled.input`
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #2563eb;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border: none;
    border-radius: 50%;
    background: #2563eb;
    cursor: pointer;
  }

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
`

export const RangeValues = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #64748b;
`

export const RangeValue = styled.span`
  font-weight: 500;
  color: #1e293b;
`
