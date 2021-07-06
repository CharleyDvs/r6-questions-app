import { BsPlusCircleFill, BsFillDashCircleFill } from 'react-icons/bs'
import { GiBouncingSword } from 'react-icons/gi'
import styles from './styles.module.scss'

const ButtonControls = ({ addFn, subtractFn, addText, subtractText }) => {
	console.log(addText, subtractText)
  return (
    <div className={styles.container}>
      <div onClick={addFn} className={styles.btn}>
        <BsPlusCircleFill />
        <span>{addText}</span>
      </div>
      <div onClick={subtractFn} className={styles.btn}>
        <BsFillDashCircleFill />
        <span>{subtractText}</span>
      </div>
    </div>
  )
}

export default ButtonControls
