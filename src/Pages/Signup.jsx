import React, { useState } from "react"
import LinkedInLogo from "../assets/LinkedInLogo.png"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../constanst"
import { useDispatch } from "react-redux"
import { addUser } from "../store/userSlice.jsx"

const Signup = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    userName: "",
  })
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInput = (e) => {
    const { name, value } = e.target
    setUserDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = (e) => {
    e.preventDefault()
    signUp()
  }

  const signUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", userDetails, {
        withCredentials: true,
      })

      setUserDetails({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        userName: "",
      })
      setError("")

      dispatch(addUser(res?.data))

      return navigate("/")
    } catch (error) {
      const { response } = error
      setError(response?.data?.message)
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-50">
      <div className="px-4 py-6 max-w-3/4 sm:mx-auto">
        <Link to={"/"}>
          <img className="h-8" src={LinkedInLogo} alt="linkedIn" />
        </Link>
      </div>
      <div className="min-h-[calc(100vh-80px)]  flex justify-center rounded-xl ">
        <form
          className="md:shadow-xl w-full h-max max-w-[460px] px-8 sm:py-6"
          onSubmit={handleSignup}
        >
          <h3 className="text-3xl  font-semibold py-6">Sign Up</h3>

          <div className="space-y-3">
            <input
              type="text"
              name="firstName"
              value={userDetails.firstName}
              placeholder="Firstname"
              className="border-2 border-gray-600 text-lg px-2 py-2 rounded  w-full "
              onChange={handleInput}
            />
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              placeholder="Lastname"
              className="border-2 border-gray-600 text-lg px-2 py-2 rounded  w-full "
              onChange={handleInput}
            />
            <input
              type="text"
              name="userName"
              value={userDetails.userName}
              placeholder="Username"
              className="border-2 border-gray-600 text-lg px-2 py-2 rounded  w-full "
              onChange={handleInput}
            />
            <input
              type="email"
              name="emailId"
              value={userDetails.emailId}
              placeholder="Email"
              className="border-2 border-gray-600 text-lg px-2 py-2 rounded  w-full "
              onChange={handleInput}
            />
            <div className="flex justify-between border-2 border-gray-600 text-lg px-2 py-2 rounded  w-full  ">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={userDetails.password}
                placeholder="Password"
                className="w-full outline-0 "
                onChange={handleInput}
              />
              <button
                className="font-semibold text-lg  text-blue-500 cursor-pointer"
                type="button"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? "hide" : "show"}
              </button>
            </div>
            {error && (
              <p className="my-4 font-medium text-red-500">
                Error: {"  " + error}
              </p>
            )}
            <button className="bg-blue-500/90 px-4 py-3 w-full text-lg font-medium text-white rounded-full mt-10 cursor-pointer hover:bg-blue-500">
              SignUp
            </button>
            <p className="text-center my-2 font-medium">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-500 font-medium">
                {" "}
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
