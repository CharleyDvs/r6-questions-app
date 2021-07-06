import { useSession } from 'next-auth/client'

// NextAuth provides a hook.
// The session has the name, and the id added.
// The id can be used to ask for forms, or to create forms with the user id.

function SessionPage() {
  const [session, isLoading] = useSession()

  if (!isLoading && session) {
    return (
      <div>
        <p>User name: {session.user.name}</p>
        {/* You can use this to ask for anything regarding the user. */}
        <p>User id: {session.user.id}</p>
      </div>
    )
  }

  if (!isLoading && !session) {
    return <p>You are not logged in</p>
  }

  return <div>{isLoading && <p>It is loading</p>}</div>
}

export default SessionPage
