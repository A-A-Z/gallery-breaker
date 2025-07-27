import type { FC, KeyboardEventHandler, ChangeEventHandler } from 'react'
import type { LetterColProps } from './types'

export const LetterCol: FC<LetterColProps> = ({ index, letters, setCol }) => {
  // We don't really need onChange events, just here to make React happy
  const onChange: ChangeEventHandler<HTMLInputElement> = () => {}

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = ({ key }) => {
    if (/^[a-z]$/.test(key) && !letters.some(entry => entry == key)) {
      setCol(index, [...letters, key])
      return
    }

    if (key === 'Backspace' || key === 'Delete') {
      const popped = [...letters]
      popped.pop()
      setCol(index, popped)
    }
  }

  return (
    <li className="letter-col">
      <label className="letter-col__label">
        <input
          autoFocus={index === 0}
          className="visually-hidden"
          type="text"
          maxLength={1}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={''}
          // because we are abusing the use of label above we need to create a ARIA label
          aria-label="Add keys"
        />
        <ul className="letter-col__list">
          {letters.map(letter => <li key={letter}>{letter}</li>)}
        </ul>
      </label>
    </li>
  )
}
