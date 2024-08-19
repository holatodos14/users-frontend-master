import { Link, useNavigate } from 'react-router-dom'
import { MdEmail, MdLock } from 'react-icons/md'
import PropTypes from 'prop-types'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { AuthService } from '../services'
import { SocialLogin } from './SocialLogin'
import { useToken } from '../hooks/useToken'

const authSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address'),
  password: z.string().nonempty('Password is required').min(8, 'Password must have at least 8 characters'),
})

function AuthForm({ isRegister }) {
  const { setToken } = useToken()
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(authSchema),
  })

  const onSubmit = async (formData) => {
    toast.promise(
      async () => {
        try {
          const { accessToken } = isRegister
            ? await AuthService.registerUser(formData)
            : await AuthService.loginUser(formData)
          setToken(accessToken)
          navigate(`/user`)
        } catch (e) {
          if (e instanceof AxiosError) {
            if (e.response && e.response.data.message) {
              toast.error(e.response.data.message)
              throw e
            }
          }
        }
      },
      {
        loading: 'Loading...',
        success: 'Redirecting...',
      }
    )
  }

  return (
    <>
      <form
        className="flex flex-col mt-8 gap-3.5 auto-rows-[3rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="relative text-[#828282]">
            <MdEmail
              className="text-inherit absolute w-[24px] h-[24px] left-[12px] -translate-y-1/2 top-1/2"
              name={'email-icon'}
            />
            <input
              className="placeholder:text-inherit border border-[#BDBDBD] rounded-lg w-full h-full pl-12 bg-transparent py-4"
              type="email"
              placeholder="Email"
              {...register('email')}
            />
          </div>
          {errors.email && <p className="text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <div className="relative text-[#828282]">
            <MdLock
              className="text-inherit absolute w-[24px] h-[24px] left-[12px] -translate-y-1/2 top-1/2"
              name={'password-icon'}
            />
            <input
              className="placeholder:text-inherit border border-[#BDBDBD] rounded-lg w-full h-full pl-12 bg-transparent py-4"
              type="password"
              placeholder="Password"
              {...register('password')}
            />
          </div>
          {errors.password && <p className="text-red-400">{errors.password.message}</p>}
        </div>

        <button
          className="bg-blue-600 mt-2 rounded-lg text-white disabled:brightness-50 py-4"
          disabled={!isDirty || !isValid}
        >
          {isRegister ? 'Start coding now' : 'Login'}
        </button>
      </form>
      <div className="flex flex-col gap-5 mt-10 text-center text-[#828282] text-sm">
        <p>or continue with these social profiles</p>
        <SocialLogin />
        <p>
          {isRegister ? (
            <>
              Already a member?{' '}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </>
          ) : (
            <>
              Don&apost have an account yet?{' '}
              <Link to="/register" className="text-blue-600">
                Register
              </Link>
            </>
          )}
        </p>
      </div>
    </>
  )
}

AuthForm.propTypes = {
  isRegister: PropTypes.bool.isRequired,
}

export function LoginForm() {
  return <AuthForm isRegister={false} />
}

export function RegisterForm() {
  return <AuthForm isRegister={true} />
}
