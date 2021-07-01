import { BsPlusCircleFill, BsFillDashCircleFill } from 'react-icons/bs'
import styles from './styles.module.scss'

const ButtonControls = ({ addFn, subtractFn, addText, subtractText }) => {
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
