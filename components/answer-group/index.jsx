import styles from './styles.module.scss'
import { Fragment } from 'react'

const AnswerGroup = ({ answers }) => {
  const fixedAnswer = (answer) => {
    if (!answer) {
      return ''
    }

    if (answer.length === undefined) {
      return answer
    }

    if (typeof answer === 'string' || typeof answer === 'number') {
      return answer
    }

    if (answer.length === 0) {
      return 'Not answered'
    }

    return answer.join(', ')
  }

  return (
    <div className={styles['question-group']}>
      {answers &&
        Object.keys(answers).map((question, index) => (
          <Fragment key={`answer-${index}-questions`}>
            <div className={styles['question-separator']}>
              <p className={styles.question}>
                {index + 1}. {question}
              </p>
              <p className={styles.answer}>{fixedAnswer(answers[question])}</p>
            </div>
          </Fragment>
        ))}
    </div>
  )
}

export default AnswerGroup
