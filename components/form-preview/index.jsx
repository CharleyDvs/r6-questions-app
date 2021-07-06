import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { connect } from 'react-redux'
import { removeForm } from 'store/formsReducer'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { VscPreview } from 'react-icons/vsc'
import { GrShareOption } from 'react-icons/gr'
import styles from './styles.module.scss'

const FormPreview = ({ formId, title, removeForm }) => {
  const FORM_URI = `https://r6-questions-app-1.vercel.app/form/${formId}`

  const [copied, setCopied] = useState(true)

  const copyFormUrl = () => {
    const el = document.createElement('input')
    el.value = FORM_URI
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  const deleteForm = async () => {
    try {
      const body = JSON.stringify({
        id: formId,
      })
      const response = await fetch(
        'https://r6-questions-app-1.vercel.app/api/forms/delete',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body,
        }
      )
      const json = await response.json()
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  const router = useRouter()
  return (
    <div className={styles.container}>
      <Link href={`/my-forms/${formId}`}>
        <h1 className={styles['form-title']}>{title}</h1>
      </Link>
      <div className={styles.controls}>
        <p hidden={copied}>Copied to clipboard!</p>
        <GrShareOption
          className={styles['control-btn']}
          onClick={() => {
            setCopied(false)
            copyFormUrl()
          }}
        />
        <VscPreview
          className={styles['control-btn']}
          onClick={() => {
            router.push(`/preview/${formId}`)
          }}
        />
        <RiDeleteBin5Fill
          className={styles['control-btn']}
          onClick={() => {
            removeForm(formId)
            deleteForm()
          }}
        />
      </div>
    </div>
  )
}

const MapDispatchToProps = (dispatch) => ({
  removeForm: (formId) => dispatch(removeForm(formId)),
})

export default connect(null, MapDispatchToProps)(FormPreview)
