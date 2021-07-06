import { getSession } from 'next-auth/client'
import { signOut } from 'next-auth/client'

function ProtectedPage() {
  return (
    <>
      <p>You can see this page, because you are logged in.</p>
      <button onClick={signOut}>Sign out</button>
    </>
  )
}

export async function getServerSideProps(context) {
	// This only checks if it's logged in or not.
	// If it's not logged in it will return to a different destination.
	// Permanent is false because you will sometimes be able to enter.
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth/loginExample',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default ProtectedPage
