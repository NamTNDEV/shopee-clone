import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from 'src/api/auth.api'
import Input from 'src/components/form/Input'
import { registerSchema, RegisterSchema } from 'src/utils/rules'
import { omit as _omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/errors'
import { ErrorResponseApi } from 'src/types/ultis.type'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { path } from 'src/constants/path'

type FormData = RegisterSchema

function RegisterPage() {
  const { setIsAuth, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(registerSchema) })

  const registerUserMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerUser(body),
    onSuccess: (data) => {
      toast.success('Đăng kí tài khoản thành công.')
      setIsAuth(true)
      setProfile(data.data.data.user)
      navigate('/')
    },
    onError: (error) => {
      console.log(error)
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof Omit<FormData, 'confirm_password'>, {
              message: formError[key as keyof Omit<FormData, 'confirm_password'>],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const onsubmit = handleSubmit((data) => {
    const registerData = _omit(data, ['confirm_password'])
    registerUserMutation.mutate(registerData)
  })

  return (
    <div className='bg-primary'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onsubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                type='email'
                className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='Email'
                register={register}
                name='email'
                errorMessage={errors.email?.message || ''}
              />
              <Input
                type='password'
                className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='Password'
                register={register}
                name='password'
                errorMessage={errors.password?.message || ''}
              />
              <Input
                type='password'
                className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='Confirm Password'
                register={register}
                name='confirm_password'
                errorMessage={errors.confirm_password?.message || ''}
              />
              <div className='mt-3'>
                <Button
                  className='w-full py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'
                  isLoading={registerUserMutation.isPending}
                  disabled={registerUserMutation.isPending}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to={path.login}>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
