interface PropsType {
  children?: React.ReactNode
}

function LoginLayout({ children }: PropsType) {
  return (
    <div>
      LoginLayout
      {children}
    </div>
  )
}

export default LoginLayout
