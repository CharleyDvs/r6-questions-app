import { useRef } from 'react'
// To register new users, this is the way to create new forms.
/*
	await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
              username: usernameRef.current.value,
              password: passwordRef.current.value,
            }),
            headers: { 'Content-Type': 'application/json' },
	})

	This will return either the {
		token: "A string"
	} if it works.

	Or it will return the {
		error: "Another string String"
	} if it fails

	As simple as that.
*/

const RegisterPage = () => {
  const usernameRef = useRef()
  const passwordRef = useRef()

  return (
    <>
      <input ref={usernameRef} />
      <input ref={passwordRef} />
      <button
        onClick={async () => {
          const result = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
              username: usernameRef.current.value,
              password: passwordRef.current.value,
            }),
            headers: { 'Content-Type': 'application/json' },
          })

          const data = await result.json()
          console.log(data)
        }}
      >
        Enviar
      </button>
    </>
  )
}

export default RegisterPage
