import React, { Fragment, useContext } from "react"
import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../providers/UserProvider"

export const NavBar = () => {
  const { isLoggedIn, logout } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    navigate("/")
    await logout()
  }

  return (
    <Disclosure as="nav" className="bg-purple-950">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-violet-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-baseline justify-center sm:items-end sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <span className="text-white font-bold inline lg:hidden">
                      Hooper
                    </span>
                  </Link>
                  <Link to="/">
                    <span className="hidden text-white font-bold lg:inline">
                      Hooper
                    </span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {!isLoggedIn && (
                      <>
                        <Link to="/signin">
                          <p className="text-gray-100 hover:bg-violet-400  hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                            <span>Sign In</span>
                          </p>
                        </Link>
                      </>
                    )}
                    {isLoggedIn && (
                      <>
                        <Link to="/profile">
                          <p className="text-gray-100 hover:bg-violet-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                            <span>Profile</span>
                          </p>
                        </Link>
                        <p
                          className="text-gray-100 hover:bg-violet-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          onClick={handleLogout}
                        >
                          <button>
                            <span>Logout</span>
                          </button>
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {!isLoggedIn && (
                <>
                  <p className="text-gray-100 hover:bg-violet-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                    <Link to="/signip">
                      <span>Sign In</span>
                    </Link>
                  </p>
                </>
              )}
              {isLoggedIn && (
                <>
                  <p className="text-gray-100 hover:bg-violet-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                    <Link to="/profile">
                      <span>Profile</span>
                    </Link>
                  </p>
                  <p
                    className="text-gray-100 hover:bg-violet-400  hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    onClick={handleLogout}
                  >
                    <button>
                      <span>Logout</span>
                    </button>
                  </p>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
