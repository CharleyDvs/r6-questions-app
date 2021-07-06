import { AiOutlineForm } from 'react-icons/ai'
import styles from './styles.module.scss'

const FormTitleInput = ({ setFormData, formData }) => {
  return (
    <div className={styles['form-title-container']}>
      <AiOutlineForm className={styles['form-title-icon']} />
      <label className={styles['form-title-label']} htmlFor="">
        Add a title to your form:
      </label>
      <input
        className={styles['form-title-input']}
        type="text"
        onChange={(e) =>
          setFormData({
            ...formData,
            formTitle: e.target.value,
          })
        }
        value={formData.formTitle}
      />
    </div>
  )
}

export default FormTitleInput
