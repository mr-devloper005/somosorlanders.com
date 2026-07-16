'use client'

import { type CSSProperties, type ElementType, type ReactNode, useEffect, useRef, useState } from 'react'

type EditableRevealProps = {
  children: ReactNode
  className?: string
  index?: number
  as?: ElementType
}

export function EditableReveal({ children, className = '', index = 0, as: Tag = 'div' }: EditableRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.16 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const style = { '--editable-reveal-delay': `${Math.min(index, 10) * 70}ms` } as CSSProperties
  const state = !mounted || visible ? 'is-visible' : 'is-hidden'

  return (
    <Tag ref={ref as never} style={style} className={`editable-reveal ${state} ${className}`}>
      {children}
    </Tag>
  )
}
