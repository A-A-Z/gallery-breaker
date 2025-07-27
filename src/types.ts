export type LettersGroup = Array<Array<string>>

export type SetColFn = (index: number, value: string[]) => void

export type MatchesGroups = Record<string, string[]>

export interface FormProps {
  letters: LettersGroup
  setLetters: (value: LettersGroup) => void
}

export interface LetterColProps {
  index: number
  letters: string[]
  setCol: SetColFn
}

export interface ResultsProps {
  letters: LettersGroup
}
