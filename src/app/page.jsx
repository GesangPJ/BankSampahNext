// Component Imports
import Login from '@views/Login'
import Providers from '@components/Providers'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const LoginPage = () => {
  // Vars
  const mode = getServerMode()
  const direction = 'ltr'

  return(
    <Providers direction={direction}>
      <Login mode={mode} />
    </Providers>
)
}

export default LoginPage
