import styles from './styles.module.scss'

const RangeQuestionGen = ({ setData, questionData }) => {
  const rangeValue = questionData.rangeLimit || ''
  const textValue = questionData.text || ''
  return (
    <div className={styles['question-gen-container']}>
      <label className={styles.label}>Add your question</label>
      <input
        className={styles.input}
        type="text"
        onChange={(e) => setData({ ...questionData, text: e.target.value })}
        value={textValue}
      />
      <label className={styles.label} htmlFor="">
        Add the last value for the range (the starting value is always 0)
      </label>
      <input
        className={styles.input}
        type="number"
        onChange={(e) => {
          if (e.target.value > 0) {
            setData({ ...questionData, rangeLimit: e.target.value })
          }
        }}
        value={rangeValue}
      />
    </div>
  )
}

export default RangeQuestionGen
