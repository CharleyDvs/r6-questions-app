import { useState, useEffect } from 'react'
import ButtonControls from 'components/button-controls'
import styles from './styles.module.scss'

const OptionalQuestionGen = ({ setData, questionData }) => {
  const optionsArray = questionData.options || ['']
  const textValue = questionData.text || ''
  const [options, setOptions] = useState(optionsArray)

  const addOption = () => {
    const newOptions = [...options]
    newOptions.push('')
    setOptions(newOptions)
  }

  const removeOption = () => {
    const newOptions = [...options]
    newOptions.pop()
    setOptions(newOptions)
  }

  const handleOptionChange = (string, index) => {
    const newOptions = [...options]
    newOptions[index] = string
    setOptions(newOptions)
  }

  useEffect(() => {
    setData({
      ...questionData,
      options,
    })
  }, [options])

  return (
    <div className={styles['question-gen-container']}>
      <label className={styles.label}>Add your question</label>
      <input
        type="text"
        className={styles.input}
        onChange={(e) => setData({ ...questionData, text: e.target.value })}
        value={textValue}
      />
      <div className={styles['options-container']}>
        <label className={styles.label} htmlFor="">
          Add the options that you need
        </label>
        {options.map((option, index) => (
          <input
            className={styles.input}
            key={`option-input-${index}`}
            type="text"
            value={option}
            onChange={(e) => {
              handleOptionChange(e.target.value, index)
            }}
          />
        ))}
        <div>
          <ButtonControls
            addFn={addOption}
            subtractFn={removeOption}
            addText="Add option"
            subtractText="Remove option"
          />
        </div>
      </div>
    </div>
  )
}

export default OptionalQuestionGen
