import { useState } from 'react'
import { connect } from 'react-redux'
import { subscribeUser } from 'store/userReducer'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from './styles.module.scss'
import launch from './Browsing.svg'
import survey from './undraw.svg'
import customer from './Customer.svg'

const Body = (props) => {
  //
  const { subscribeUser, user } = props

  //Hooks
  const [credential, setCredential] = useState({
    username: '',
    password: '',
  })
  const [statusAuth, setStatusAuth] = useState(true)
  const [passwordValid, setpasswordValid] = useState(true)
  const router = useRouter()

  //Hooks actions

  const passwordValidHandler = (event) => {
    event.target.value === credential.password
      ? setpasswordValid(false)
      : setpasswordValid(true)
  }

  const credentialHandler = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value })
  }

  const authHandler = (event) => {
    fetch(
      `https://r6-questions-app-1.vercel.app/api/auth/${event.target.name}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credential),
      }
    )
      .then((res) => res.json())
      .catch((error) => console.log(error))
      .then((response) => {
        if (response.data) {
          subscribeUser({
            ...response.data,
            username: credential.username,
          })
          router.push('/my-forms')
        }
        if (response.token) {
          subscribeUser({
            ...response,
            username: credential.username,
          })
          router.push('/my-forms')
        } else {
          setStatusAuth(false)
        }
      })
  }

  //Handlers

  function loginHandler() {
    !user.userId ? props.handleLogin('Login') : router.push('/my-forms')
  }
  function signupHandler() {
    props.handleLogin('Signup')
  }

  if (props.login === 'Home') {
    return (
      <div className={styles.theBody}>
        <div>
          <Image src={survey.src} alt="" />
        </div>
        <div className={styles.rightSide}>
          <h1>Forms for everyone!</h1>
          <p>
            {`Creating web forms with Enroute Form's unique form editor is just
            like writing a doc. Anyone can create beautiful online forms,
            quickly and intuitively, without any technical knowledge.`}
          </p>
          <button onClick={loginHandler}>
            <strong>START NOW</strong>
          </button>
        </div>
      </div>
    )
  }

  if (props.login === 'Login') {
    return (
      <div className={styles.theBody}>
        <div>
          <Image alt="" src={launch.src} />
        </div>
        <div className={styles.rightSide}>
          <h1>Login</h1>
          <label className={styles.wrong} hidden={statusAuth}>
            The username and/or password is incorrect.
            <br /> Please try again
          </label>
          <input
            type="email"
            placeholder="Username"
            name="username"
            onChange={credentialHandler}
            value={credential.username}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={credentialHandler}
          ></input>
          <button
            onClick={authHandler}
            className={styles.submit}
            name="login"
            disabled={credential.password === ''}
          >
            Log In
          </button>
          <label>
            {`Don't have an account yet?`}
            <button onClick={signupHandler}>Sign Up</button>
          </label>
        </div>
      </div>
    )
  }

  if (props.login === 'Signup') {
    return (
      <div className={styles.theBody}>
        <div>
          <Image alt="" src={customer.src} />
        </div>
        <div className={styles.rightSide}>
          <h1>Signup</h1>
          <label>Username</label>
          <input
            type="email"
            placeholder="aol@email.com"
            onChange={credentialHandler}
            name="username"
          ></input>
          <label>Password</label>
          <input
            type="password"
            placeholder="**********"
            onChange={credentialHandler}
            name="password"
            value={credential.password}
          ></input>
          <label>Confirm your password</label>
          <input
            type="password"
            onChange={passwordValidHandler}
            placeholder="**********"
          ></input>
          <button
            className={[styles.submit]}
            disabled={passwordValid}
            onClick={authHandler}
            name="register"
          >
            Sign up
          </button>
          <label>
            Already have an account?{' '}
            <button onClick={loginHandler}>Log In</button>
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user,
})

const mapDispatchToProps = (dispatch) => ({
  subscribeUser: (userdata) => dispatch(subscribeUser(userdata)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Body)
