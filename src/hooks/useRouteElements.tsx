import { useRoutes } from 'react-router-dom'
import LoginLayout from 'src/layouts/LoginLayout'
import MainLayout from 'src/layouts/MainLayout'
import LoginPage from 'src/pages/Login'
import ProductListPage from 'src/pages/ProductList'
import RegisterPage from 'src/pages/Register'

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductListPage />
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <LoginLayout>
          <LoginPage />
        </LoginLayout>
      )
    },
    {
      path: '/register',
      element: (
        <LoginLayout>
          <RegisterPage />
        </LoginLayout>
      )
    }
  ])
  return routeElements
}

export default useRouteElements
