import { connect } from 'react-redux'
import { cleanForms } from 'store/formsReducer'
import { unsubscribeUser } from 'store/userReducer'
import Link from 'next/Link'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'


const Navbar = (props) => {
  const router = new useRouter()

  const { user, unsubscribeUser, cleanForms } = props

  function loginHandler() {
    props.handleLogin('Login')
  }
  function signupHandler() {
    props.handleLogin('Signup')
  }
  return (
    <nav className={styles.Navbar}>
      <div>
        <Link href="/">
          <h1>ENROUTE FORMS</h1>
        </Link>
      </div>
      {!user.userId ? (
        <div>
          <button onClick={loginHandler}>Login</button>
          <button className={styles.Signup} onClick={signupHandler}>
            Sign Up
          </button>
        </div>
      ) : (
        <div className={styles.logoutdiv}>
          <h1>{` Hi, ${user.username}`} </h1>
          <button
            className={styles.Signup}
            onClick={() => {
              unsubscribeUser()
              cleanForms()
              router.push('/')
            }}
          >
            Log out
          </button>
        </div>
      )}
    </nav>
  )
}

const mapStateToProps = ({ user }) => ({
  user,
})

const mapDispatchToProps = (dispatch) => ({
  unsubscribeUser: () => dispatch(unsubscribeUser()),
  cleanForms: () => dispatch(cleanForms()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
