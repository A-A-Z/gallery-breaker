import { useState, useCallback } from 'react'
import { LetterCol } from './LetterCol'
import './styles/form.css'

import type { FC } from 'react';
import type { FormProps, LettersGroup, SetColFn } from './types'

const MAX_COLUMNS = 8

export const Form: FC<FormProps> = ({ setLetters }) => {
  const [draft, setDraft] = useState<LettersGroup>(
    Array.from({ length: MAX_COLUMNS }, () => [])
  )

  const setCol: SetColFn = useCallback((index, value) => {
    setDraft(oldValue => {
      const newValue = [...oldValue]
      newValue[index] = value
      return newValue
    })
  }, [])

  const onSubmit = () => {
    setLetters(draft)
  }

  return (
    <section className="form">
      <h2 id="form-title">Letters</h2>
      <ul className="form-grid">
        {draft.map((col, index) => <LetterCol key={index} index={index} letters={col} setCol={setCol} />)}
      </ul>
      <button className="submit" onClick={onSubmit}>Check</button>
    </section>
  )
}
