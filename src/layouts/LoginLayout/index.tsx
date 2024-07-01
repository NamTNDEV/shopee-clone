import Footer from 'src/components/Footer'
import LoginHeader from 'src/components/LoginHeader'

interface PropsType {
  children?: React.ReactNode
}

function LoginLayout({ children }: PropsType) {
  return (
    <div>
      <LoginHeader />
      {children}
      <Footer />
    </div>
  )
}

export default LoginLayout
