import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import LoginLayout from 'src/layouts/LoginLayout'
import MainLayout from 'src/layouts/MainLayout'
import LoginPage from 'src/pages/Login'
import ProductListPage from 'src/pages/ProductList'
import ProfilePage from 'src/pages/Profile'
import RegisterPage from 'src/pages/Register'

function ProtectedRoute() {
  const isAuth = useContext(AppContext).isAuth
  return isAuth ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const isAuth = useContext(AppContext).isAuth
  return !isAuth ? <Outlet /> : <Navigate to='/' />
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
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
          path: path.profile,
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
          path: path.login,
          element: (
            <LoginLayout>
              <LoginPage />
            </LoginLayout>
          )
        },
        {
          path: path.register,
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
