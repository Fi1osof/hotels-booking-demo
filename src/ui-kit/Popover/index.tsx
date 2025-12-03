import React, { useState, useRef, useEffect, useCallback } from 'react'
import { PopoverWrapper, PopoverTrigger, PopoverContent, PopoverArrow } from './styles'

export interface PopoverProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

export const Popover: React.FC<PopoverProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }, [])

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, handleClickOutside, handleEscape])

  return (
    <PopoverWrapper ref={wrapperRef}>
      <PopoverTrigger type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent $isOpen={isOpen}>
        <PopoverArrow />
        {children}
      </PopoverContent>
    </PopoverWrapper>
  )
}
