import { useRef } from 'react'
import { signIn } from 'next-auth/client'

// The signIn function takes the arguments like this:
/*
	signIn('credentials', {
		redirect: false,
		username: ${THE NAME OF THE USER},
		password: ${THE PASSWORD OF THE USER},
	})

	As simple as that.
*/

const LoginPage = () => {
  const usernameRef = useRef()
  const passwordRef = useRef()

  return (
    <>
      <input ref={usernameRef} />
      <input ref={passwordRef} />
      <button
        onClick={async () => {
          const result = await signIn('credentials', {
            redirect: false,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
          })

          console.log(result)
        }}
      >
        Enviar
      </button>
    </>
  )
}

export default LoginPage
