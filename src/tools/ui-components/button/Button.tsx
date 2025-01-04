import React from 'react'
import styles from './Button.module.scss'
import type { FC, ReactNode } from 'react';

type Props = {
  size?: 's' | 'm' | 'l'
  onClick?: (event: React.MouseEvent) => void
  variant?: 'primary' | 'secondary' | 'danger'
  children: ReactNode
}

export const Button: FC<Props> = (props) => {
  const size = props.size || 'm'
  const variant = props.variant || 'primary'

  const handleOnClick = (event: React.MouseEvent) => {
    if (props.onClick) props.onClick(event)
  }

  return (
    <button
      className={styles.button}
      data-size={size}
      data-variant={variant}
      onClick={handleOnClick}
    >
      {props.children}
    </button>
  )
}


