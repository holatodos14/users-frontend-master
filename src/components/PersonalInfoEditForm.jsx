/* eslint-disable no-undef */
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { MdCameraAlt } from 'react-icons/md'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { validateUserData } from '../types'
import { UserService } from '../services'

export function PersonalInfoEditForm({ user }) {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: user,
    mode: 'onBlur',
    resolver: async (values) => {
      const result = validateUserData(values)
      if (result.errors) {
        return { values: {}, errors: result.errors }
      }
      return { values, errors: {} }
    },
  })

  const onSubmit = async (formData) => {
    toast.promise(
      async () => {
        try {
          let key
          for (key in formData) {
            if (
              (key === 'password' && !formData.password) ||
              (key === 'email' && !formData.email)
            ) {
              delete formData[key]
            } else if (user[key] && formData[key] === user[key]) {
              delete formData[key]
            }
          }
          const { accessToken } = await UserService.updateUser(formData)
          setToken(accessToken)
          navigate('/user')
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
        success: 'Values updated successfully!',
        loading: 'Loading...',
      },
    )
  }

  return (
    <form className="space-y-6 text-[13px]" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex items-center gap-7 my-6">
          <div className="relative">
            <img
              className="rounded-lg"
              src={user?.photo ?? 'https://source.unsplash.com/random/72x72?sig=1'}
              width={72}
              height={72}
              alt="profile picture"
            />
            <MdCameraAlt
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24px] h-[24px] bg-black rounded"
              tabIndex={0}
            />
          </div>
          <input
            className="text-[#828282] px-2 border rounded-xl border-[#828282] bg-transparent hover:text-black dark:hover:text-white max-w-full"
            {...register('photo')}
            placeholder="CHANGE PHOTO"
            id="photo"
            size={40}
          />
        </div>
        {errors.photo && <p className="text-red-400">{errors.photo?.message}</p>}
      </div>
      <div>
        <label>
          Name
          <input
            className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
            type="text"
            {...register('name')}
            placeholder="Enter your name..."
          />
        </label>
        {errors.name && <p className="text-red-400">{errors.name?.message}</p>}
      </div>
      <div>
        <label>
          Bio
          <textarea
            className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
            {...register('bio')}
            placeholder="Nice to meet you"
          ></textarea>
        </label>
        {errors.bio && <p className="text-red-400">{errors.bio?.message}</p>}
      </div>
      <div>
        <label>
          Phone
          <input
            className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
            type="text"
            {...register('phone')}
            placeholder="(55) 92321-1231"
          />
        </label>
        {errors.phone && <p className="text-red-400">{errors.phone?.message}</p>}
      </div>
      <div>
        <label>
          Email
          <input
            className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
            type="email"
            {...register('email')}
            placeholder="myemail@ssss.com"
            readOnly={user.provider !== 'local'}
          />
        </label>
        {errors.email && <p className="text-red-400">{errors.email?.message}</p>}
      </div>
      <div>
        <label>
          Password
          <input
            className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
            type="text"
            {...register('password')}
            placeholder="*******"
            readOnly={user.provider !== 'local'}
          />
        </label>
        {errors.password && <p className="text-red-400">{errors.password?.message}</p>}
      </div>
      <button
        className="bg-blue-600 mt-1 py-2 px-6 rounded-lg text-white disabled:brightness-50"
        disabled={!isDirty || !isValid}
      >
        Save
      </button>
    </form>
  )
}

PersonalInfoEditForm.propTypes = {
  user: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
  }).isRequired,
}
