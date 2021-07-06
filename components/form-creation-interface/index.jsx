import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { updateForm } from 'store/formsReducer'
import QuestionGenerator from 'components/question-generator'
import FormTitleInput from 'components/form-title-input'
import styles from './styles.module.scss'
import Navbar from 'components/landing-navbar'

const FormCreationInterface = ({ forms, user, updateForm }) => {
  const {
    query: { formId },
  } = useRouter()
  const [formData, setFormData] = useState({
    ...forms[formId],
  })

  const [saved, setSaved] = useState('Save Form')

  const saveForm = async () => {
    setSaved('Saved!')
    setTimeout(() => {
      setSaved('Save Form')
    }, 5000)
    try {
      formData.author = user.userId
      const body = JSON.stringify({
        id: formId,
        form: formData,
      })
      await fetch('https://r6-questions-app-1.vercel.app/api/forms/update', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body,
      })
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    updateForm({ formId, formData })
  }, [formData, formId, updateForm])

  return (
    <>
      <Navbar />
      <div className="interface-container">
        <FormTitleInput setFormData={setFormData} formData={formData} />
        {formData.questions.map((question, index) => (
          <QuestionGenerator
            key={`${formData.formTitle}-question-${index}`}
            index={index}
            setFormData={setFormData}
            formData={formData}
          />
        ))}
        <div className={styles['form-interface-controls']}>
          <button
            onClick={() => {
              let newArray = [...formData.questions]
              newArray.push({
                type: 'OPEN',
                text: '',
              })
              setFormData({
                ...formData,
                questions: newArray,
              })
            }}
          >
            <strong>Add a Question +</strong>
          </button>
          <button onClick={saveForm} style={{ marginLeft: '16px' }}>
            <strong>{saved}</strong>
          </button>
        </div>
      </div>
    </>
  )
}

const MapStateToProps = ({ forms, user }) => ({
  forms,
  user,
})

const MapDispatchToProps = (dispatch) => ({
  updateForm: (formId) => dispatch(updateForm(formId)),
})

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(FormCreationInterface)
