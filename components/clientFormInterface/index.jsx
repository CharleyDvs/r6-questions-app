import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import QuestionCard from 'components/question-card'
import styles from './styles.module.scss'
import Link from 'next/link'

const mockup = {
  formName: 'Mockup form',
  questions: [
    {
      text: 'Que piensas del estado actual de enroute?',
      type: 'OPEN',
    },
    {
      text: 'Que corte de carne prefieres?',
      type: 'MULTIPLE',
      options: {
        option0: 'Rib Eye',
        option1: 'T-Bone',
        option2: 'New York',
      },
    },
    {
      text: 'Selecciona tus actividades favoritas',
      type: 'CHECKBOX',
      options: {
        option0: 'Musica',
        option1: 'Natacion',
        option2: 'Fotografia',
        option3: 'Baile',
        option4: 'Videojuegos',
      },
    },
    {
      text: 'Cuantos años tienes?',
      type: 'RANGE',
      rangeLimit: '99',
    },
  ],
}

const ClientFormInterface = ({ isPreview, forms }) => {
  const [questions, setQuestions] = useState([])
  const [formTitle, setFormTitle] = useState('')
  const [answers, setAnswers] = useState({})
  const router = useRouter()
  const { formId } = router.query

  const sendAnswers = async () => {
    try {
      const body = JSON.stringify({
        answer: answers,
        id: formId,
      })
      const response = await fetch(
        'https://r6-questions-app-1.vercel.app/api/forms/answer',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body,
        }
      )
      const json = await response.json()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      if (formId) {
        const response = await fetch(
          `https://r6-questions-app-1.vercel.app/api/forms/${formId}`
        )
        const parsedData = await response.json()
        const { data } = parsedData
        console.log(data)
        setQuestions(data.questions)
        setFormTitle(data.formTitle)
      }
    }
    if (isPreview && forms[formId]) {
      const { questions, formTitle } = forms[formId]
      setQuestions(questions)
      setFormTitle(formTitle)
    } else {
      fetchQuestions()
    }
  }, [formId, forms, isPreview])

  useEffect(() => {
    console.log('answers', answers)
  }, [answers])

  return (
    <div className={styles.clientForm}>
      {isPreview ? (
        <h1>{`This is a preview for ${formTitle}`}</h1>
      ) : (
        <h1>{formTitle}</h1>
      )}
      <div>
        {questions.map((questionToRender, index) => {
          return (
            <QuestionCard
              key={`form-question-${index}`}
              question={questionToRender}
              answers={answers}
              setAnswers={setAnswers}
            />
          )
        })}
      </div>
      {!isPreview && (
        <div className={styles['form-interface-controls']}>
          <Link href="/thanks">
            <button onClick={sendAnswers}>
              <strong>Finish and Upload Answers</strong>
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ forms }) => ({
  forms,
})

export default connect(mapStateToProps)(ClientFormInterface)
