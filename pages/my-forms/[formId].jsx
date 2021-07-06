import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import FormCreationInterface from 'components/form-creation-interface'
const FormGeneratorUI = ({user}) => {
  
  const router = new useRouter()
  if (!user.username) {
    router.push('/')
    return null
  }
  
  return( 
      <div>
        <FormCreationInterface />
      </div>
  )
}

const MapStateToProps = ({ user }) => ({
  user
})

export default connect(MapStateToProps)(FormGeneratorUI)

