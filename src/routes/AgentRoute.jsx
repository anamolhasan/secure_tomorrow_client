import { Navigate } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'

const AgentRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  console.log('I was here, in SellerRoute')
  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'agent') return children
  return <Navigate to='/' replace='true' />
}

export default AgentRoute