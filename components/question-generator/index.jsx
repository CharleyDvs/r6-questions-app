import { useEffect, useState } from 'react'
import OpenQuestionGen from 'components/open-question-gen'
import OptionalQuestionGen from 'components/optional-question-gen'
import RangeQuestionGen from 'components/range-question-gen'
import styles from './styles.module.scss'
import { RiDeleteBin5Fill } from 'react-icons/ri'

import options from 'constants/options'

const questionTypes = [
  {
    id: 'question-type-1',
    type: 'open question',
    value: options.OPEN,
  },
  {
    id: 'question-type-2',
    type: 'optional question',
    value: options.MULTIPLE,
  },
  {
    id: 'question-type-3',
    type: 'multiple answers checkbox',
    value: options.CHECKBOX,
  },
  {
    id: 'question-type-4',
    type: 'range question',
    value: options.RANGE,
  },
]

function QuestionGenerator({ setFormData, formData, index }) {
  const [questionData, setQuestionData] = useState({
    ...formData.questions[index],
  })

  const handleDelete = () => {
    const newArray = [...formData.questions]
    newArray.splice(index, 1)
    setFormData({
      ...formData,
      questions: newArray,
    })
  }

  useEffect(() => {
    console.log(formData)
    const newArray = [...formData.questions]
    newArray[index] = questionData
    setFormData({
      ...formData,
      questions: newArray,
    })
  }, [questionData])

  return (
    <div className={styles['question-generator']}>
      <div className={styles['question-title']}>
        <h1>{`Question ${index + 1}`}</h1>
        <RiDeleteBin5Fill
          className={styles['delete-btn']}
          onClick={handleDelete}
        />
      </div>
      <div className={styles['m-1']}>
        <select
          className={styles.input}
          onChange={(e) => {
            setQuestionData({ type: e.target.value })
          }}
          value={questionData.type}
        >
          {questionTypes.map((questionType) => (
            <option
              className={styles.option}
              value={questionType.value}
              key={questionType.id}
            >
              {questionType.type}
            </option>
          ))}
        </select>
      </div>
      <div className="question-input-container">
        {questionData.type === questionTypes[0].value && (
          <OpenQuestionGen
            setData={setQuestionData}
            questionData={questionData}
          />
        )}
        {questionData.type === questionTypes[1].value && (
          <OptionalQuestionGen
            setData={setQuestionData}
            questionData={questionData}
          />
        )}
        {questionData.type === questionTypes[2].value && (
          <OptionalQuestionGen
            setData={setQuestionData}
            questionData={questionData}
          />
        )}
        {questionData.type === questionTypes[3].value && (
          <RangeQuestionGen
            setData={setQuestionData}
            questionData={questionData}
          />
        )}
      </div>
    </div>
  )
}

export default QuestionGenerator
