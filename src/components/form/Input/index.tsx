import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  name: string
  className: string
  placeholder: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  errorMessage: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: RegisterOptions<any>
}

function Input({ className, errorMessage, name, placeholder, register, type, rules }: Props) {
  return (
    <div className='mt-3'>
      <input type={type} className={className} placeholder={placeholder} {...register(name, rules)} />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}

export default Input
