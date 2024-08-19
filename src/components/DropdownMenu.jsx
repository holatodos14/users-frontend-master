import { MdAccountCircle, MdGroup, MdOutlineExitToApp } from 'react-icons/md'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useToken } from '../hooks/useToken'
import { useUser } from '../hooks/useUser'
import { AuthService } from '../services'
import { AxiosError } from 'axios'

function DropdownMenuItem({ Icon, children, className }) {
  return (
    <li
      className={`flex items-center gap-2 p-1 sm:p-3 text-xs rounded-md hover:text-[#4F4F4F] hover:bg-[#f2f2f2] ${className}`}
    >
      <Icon className="w-[15px] h-[15px] sm:w-[20px] sm:h-[20px]" />
      {children}
    </li>
  )
}

DropdownMenuItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { removeToken } = useToken()
  const { user, isLoading } = useUser()

  const flipTriangle = isOpen
    ? 'border-b-[5px] border-b-[#333] dark:border-b-[#e0e0e0]'
    : 'border-t-[5px] border-t-[#333] dark:border-t-[#e0e0e0]'

  const openAnimation = `${
    isOpen ? 'scale-y-100' : 'scale-y-0'
  } transition-transform origin-top duration-150 ease-in`

  const showText = `${
    isOpen ? 'opacity-100' : 'opacity-0'
  } transition-[opacity] origin-top delay-150 duration-200 ease-in`

  async function handleLogOut() {
    try {
      await AuthService.logoutUser()
      removeToken()
      navigate(`/`)
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response && e.response.status === 403) {
          console.error('Invalid email/password!')
          throw e
        }
      }
    }
  }

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <div className="relative">
      <button className="flex items-center gap-5" onClick={() => setIsOpen((open) => !open)}>
        <img
          className="rounded-lg"
          src={user?.photo ?? 'https://source.unsplash.com/random/32x36?sig=1'}
          width="32"
          height="36"
          alt=""
        />
        <p className="hidden sm:inline-block">{user?.name}</p>
        <div
          className={`${flipTriangle} w-0 h-0 border-l-[5px] border-l-transparent border-r-transparent border-r-[5px] hidden sm:block`}
        ></div>
      </button>
      <nav
        className={`${openAnimation} w-[188px] flex py-3 px-3 sm:px-6 rounded-xl absolute right-0 top-[calc(100%+1rem)] bg-white dark:bg-[#252329] border border-[#E0E0E0]`}
      >
        <ul className={`${showText} space-y-4 text-[#4F4F4F] dark:text-[#E0E0E0]`}>
          <DropdownMenuItem Icon={MdAccountCircle}>
            <Link to="/user">My Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem Icon={MdGroup}>
            <Link to="#">Group Chat</Link>
          </DropdownMenuItem>
          <hr className="border-[#E0E0E0]" />
          <DropdownMenuItem
            Icon={MdOutlineExitToApp}
            className="flex items-center gap-2 text-[#EB5757]"
          >
            <button onClick={handleLogOut}>Log Out</button>
          </DropdownMenuItem>
        </ul>
      </nav>
    </div>
  )
}
