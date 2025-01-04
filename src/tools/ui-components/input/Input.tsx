import React, { FC, useEffect, useState } from 'react'
import styles from './Input.module.scss'
import { minMax } from '@/tools/utils/math'

type Props = {
  size?: 's' | 'm' | 'l'
  onBlur?: (event: React.FocusEvent) => void
} & (
    {
      type: 'text'
      value: string
      length?: number
      onInput?: (value: string) => void
    } | {
      type: 'number'
      value: number
      max?: number
      min?: number
      onInput?: (value: number) => void
    } | {
      type: 'hex'
      value: string
      length?: number
      onInput?: (value: string) => void
    }
  )

export const Input: FC<Props> = (props) => {
  const [value, setValue] = useState<string | number>(props.value)

  const size = props.size || 'm'
  const max = 'max' in props ? props.max ?? Infinity : Infinity
  const min = 'min' in props ? props.min ?? -Infinity : -Infinity
  const length = 'length' in props ? props.length ?? Infinity : Infinity

  if (min > max) throw new Error('Min value cannot be greater than max value')

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement

    switch (props.type) {
      // Handle type Number
      case 'number': {
        if (target.value === '+') {
          if (max < 0) return
          setValue('')
          if (props.onInput) props.onInput(0)
          return
        }
        if (target.value === '-') {
          if (min > 0) return
          setValue('-')
          if (props.onInput) props.onInput(0)
          return
        }
        if (target.value === '') {
          setValue(target.value)
          if (props.onInput) props.onInput(0)
          return
        }
        else if (isNaN(Number(target.value))) {
          setValue(value)
          return
        } else {
          let newValue = minMax({
            value: Number(target.value),
            min,
            max
          })
          setValue(newValue)
          if (props.onInput) props.onInput(newValue)
        }
        break
      }
      // Handle type text
      case 'text': {
        let newValue: string = target.value
        if (newValue.length > length) return
        setValue(newValue)
        if (props.onInput) props.onInput(newValue)
        break
      }
      // Handle type hexadecimal
      case 'hex': {
        let newValue: string = target.value.toUpperCase()
        if (newValue.length > length) return
        if (!/^[0-9A-F]*$/.test(newValue)) {
          setValue(value)
          return
        }
        setValue(newValue)
        if (props.onInput) props.onInput(newValue)
        break
      }
      default: {
        throw new Error(`Unimplemented input type: ${props['type']}`)
      }
    }
  }

  const handleOnBlur = (event: React.FocusEvent) => {
    const target = event.target as HTMLInputElement

    switch (props.type) {
      // Handle type Number
      case 'number': {
        if (target.value === '') {
          let newValue = min > 0 ? min : 0
          setValue(newValue)
          if (props.onInput) props.onInput(newValue)
        }
        break
      }
      // Handle type text
      case 'text': {
        break
      }
      // Handle type hexadecimal
      case 'hex': {
        if (target.value.length < length) setValue(target.value.padEnd(length, '0'))
        if (props.onInput) props.onInput(target.value)
        break
      }
      default: {
        throw new Error(`Unimplemented input type: ${props['type']}`)
      }
    }
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <input
      className={styles.input}
      type='text'
      onInput={handleOnInput}
      onBlur={handleOnBlur}
      value={value}
      data-size={size}
      max={max}
      min={min}
    />
  )
}


