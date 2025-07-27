import { useState } from 'react'
import { Form } from './Form'
import { Results } from './Results'
import './styles/app.css'

import type { FC } from 'react'
import type { LettersGroup } from './types'

const App: FC = () => {
  const [letters, setLetters] = useState<LettersGroup>([])
  return (
    <>
      <header>
        <h1>Gallery Beaker</h1>
      </header>
      <main>
        <Form letters={letters} setLetters={setLetters} />
        <Results letters={letters} />
      </main>
    </>
  )
}

export default App
