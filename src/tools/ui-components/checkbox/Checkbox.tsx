import { FC, useState } from 'react'
import styles from './Checkbox.module.scss'

type Props = {
  checked: boolean
  label?: string
  size?: 's' | 'm' | 'l'
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: FC<Props> = (props: Props) => {
  const size = props.size || 'm'
  const [checked, setChecked] = useState(props.checked)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setChecked(target.checked)
    console.log(event, target.checked)
    if (props.onChange) props.onChange(event)
  }

  return (
    <label
      className={styles.checkbox}
    >
      <input
        className={styles.realCheckbox}
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <div
        className={styles.box}
        data-size={size}
      >
        <div
          className={styles.button}
          data-checked={checked ? 'true' : 'false'}
        />
      </div >
    </label>
  )
}


