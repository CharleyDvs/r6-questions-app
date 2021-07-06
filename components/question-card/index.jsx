import style from './styles.module.scss'

const QuestionCard = (props) => {
  const { question, answers, setAnswers } = props

  const handleInput = (e) => {
    const newAnswers = {
      ...answers,
      [question.text]: e.target.value,
    }
    setAnswers(newAnswers)
  }

  const handleMultipleInput = (e) => {
    const { value } = e.target
    let newArray = []
    if (!answers[question.text]) {
      newArray.push(value)
    } else {
      newArray = [...answers[question.text]]
      if (!newArray.includes(value)) {
        newArray.push(value)
      } else {
        newArray = newArray.filter((currentValue) => currentValue !== value)
      }
    }

    const newAnswers = {
      ...answers,
      [question.text]: newArray,
    }
    setAnswers(newAnswers)
  }

  if (question.type === 'OPEN') {
    return (
      <div className={style.question}>
        <h2>{`${question.text}`}</h2>
        <input
          onChange={(e) => {
            handleInput(e)
          }}
          placeholder="Enter your answer here"
        ></input>
      </div>
    )
  }

  if (question.type === 'MULTIPLE') {
    return (
      <div className={style.question}>
        <h2>{`${question.text}`}</h2>
        <label> Pick an option</label>
        <form>
          {Object.values(question.options).map((option, index) => {
            return (
              <div key={`${question.text}-multiple-${index}`}>
                <input
                  className={style.option}
                  name={question.text}
                  type="radio"
                  onChange={(e) => {
                    handleInput(e)
                  }}
                  value={option}
                />
                <label>{option}</label>
              </div>
            )
          })}
        </form>
      </div>
    )
  }

  if (question.type === 'CHECKBOX') {
    return (
      <div className={style.question}>
        <h2>{`${question.text}`}</h2>
        <label> Pick one or more options</label>
        <div>
          {Object.values(question.options).map((option, index) => {
            return (
              <div key={`${question.text}-checkbox-${index}`}>
                <input
                  className={style.option}
                  type="checkbox"
                  onChange={(e) => {
                    handleMultipleInput(e)
                  }}
                  value={option}
                />
                <label>{option}</label>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (question.type === 'RANGE') {
    return (
      <div className={style.question}>
        <h2>{`${question.text}`}</h2>
        <input
          type="number"
          min="0"
          max={question.rangeLimit}
          onChange={(e) => {
            handleInput(e)
          }}
        />
      </div>
    )
  }
}

export default QuestionCard
