import { useMemo } from 'react'
import words from 'an-array-of-english-words'
import './styles/results.css'

import type { FC } from 'react';
import type { ResultsProps, MatchesGroups } from './types'

const MIN_LETTERS = 5

export const Results: FC<ResultsProps> = ({ letters }) => {
  const lettersClean = useMemo(() => letters.filter(group => group.length > 0), [letters])
  const lettersCount = lettersClean.length
  const hasMinLetters = lettersCount >= MIN_LETTERS

  const pattern = useMemo(() => {
    // create a array of strings for regex ranges
    const ranges = lettersClean.map(group => `[${group.join('')}]`)
    // join all ranges into a single RegExp value
    return new RegExp(`^${ranges.join('')}$`)
  }, [lettersClean])

  const results = useMemo(() => (
    hasMinLetters
      ? words.filter(word => word.length !== lettersCount ? false : pattern.test(word))
      : []
  ), [pattern, lettersCount, hasMinLetters])

  const matchesGrouped: MatchesGroups = useMemo(() => {
    return results.reduce((acc: MatchesGroups, entry) => {
      const firstLetter = entry[0]
      if (acc[firstLetter] === undefined) {
        acc[firstLetter] = [entry]
      } else {
        acc[firstLetter].push(entry)
      }
      return acc
    }, {})
  }, [results])

  return (
    <section>
      <h2 id="results-title">Results: {results.length}</h2>

      {!hasMinLetters && <p>No enough letters</p>}

      <ul className="match-letter">
        {Object.entries(matchesGrouped).map(([letter, subMatches]) => (
          <li key={letter} className="match-letter__item">
            <h3 className="match-letter__title">{letter}</h3>
            <ul className="match-group">
              {subMatches.map(word =>
                <li key={word} className="match-group__item">{word}</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
