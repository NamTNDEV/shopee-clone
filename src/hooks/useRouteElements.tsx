import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import LoginLayout from 'src/layouts/LoginLayout'
import MainLayout from 'src/layouts/MainLayout'
import LoginPage from 'src/pages/Login'
import ProductListPage from 'src/pages/ProductList'
import ProfilePage from 'src/pages/Profile'
import RegisterPage from 'src/pages/Register'

const isAuth = false

function ProtectedRoute() {
  return isAuth ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  return !isAuth ? <Outlet /> : <Navigate to='/' />
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <ProductListPage />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
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
      ]
    }
  ])
  return routeElements
}

export default useRouteElements
