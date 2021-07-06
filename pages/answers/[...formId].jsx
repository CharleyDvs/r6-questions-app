import { useEffect, useState, Fragment } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import ButtonControls from 'components/button-controls'
import Navbar from 'components/landing-navbar'

import AnswerGroup from 'components/answer-group'

const FormAnswersPage = () => {
  const [answers, setAnswers] = useState([])
  const [error, setError] = useState(null)
  const [currentAnswer, setCurrentAnswer] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { formId } = router.query

  const uniqueForm = formId ? formId[0] : null

  const goNextAnswer = () => {
    setCurrentAnswer((prevCurrAns) => {
      if (prevCurrAns + 1 > answers.length - 1) return 0
      return prevCurrAns + 1
    })
  }

  const goPrevAnswer = () => {
    setCurrentAnswer((prevCurrAns) => {
      if (prevCurrAns - 1 < 0) {
        return answers.length - 1
      }
      return prevCurrAns - 1
    })
  }

  useEffect(() => {
    if (!uniqueForm) return
    const getAnswers = async () => {
      const response = await fetch(`/api/forms/${uniqueForm}/see-answers`)
      const data = await response.json()
      if (data.error) {
        setAnswers([])
        setLoading(false)
        setError(data.error.message)
        return
      }
      setAnswers(data)
      setLoading(false)
      setCurrentAnswer(0)
    }

    getAnswers()
  }, [uniqueForm, loading])

  if (loading) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
      </>
    )
  }

  const centeredStyle = {
    textAlign: 'center',
  }

  if (error) {
    return (
      <>
        <Navbar />
        <h2 style={centeredStyle}>{"Can't load the form"}</h2>
        <p style={centeredStyle}>
          Ask the person that sent you this to try again!
        </p>
      </>
    )
  }

  const controls = (
    <div className={styles['elevated-form']}>
      <h2
        style={{
          textAlign: 'center',
        }}
      >
        Answer {currentAnswer + 1}/ {answers.length}
      </h2>
      <ButtonControls
        addFn={goNextAnswer}
        subtractFn={goPrevAnswer}
        addText="Go to next answer"
        subtractText="Go to previous answer"
      />
    </div>
  )

  return (
    <Fragment>
      <Navbar />
      {controls}
      <div>
        <AnswerGroup answers={answers[currentAnswer]} />
      </div>
      {controls}
    </Fragment>
  )
}

export default FormAnswersPage
