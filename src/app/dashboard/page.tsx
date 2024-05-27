import { getServerSession } from 'next-auth'
import { AuthOptions } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'


const Dashboard = async () => {

  const session = await getServerSession(authOptions)

  if(!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false
      }
    }
  }
    
  return (
    <div className='h-screen flex items-center justify-center'>
        <h1>Welcome, {session.user?.email}</h1>
    </div>
  )
}

export default Dashboard