import React from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../constanst"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { removeUser } from "../store/userSlice"

const ProfileCard = ({ setOpenProfileCard }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userData)

  const handleLogout = async () => {
    try {
      const response = await axios.get(BASE_URL + "/logout", {
        withCredentials: true,
      })
      setOpenProfileCard(false)
      dispatch(removeUser())
      return navigate("/login")
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleProfile = () => {
    setOpenProfileCard(false)
  }

  return (
    <div className="absolute w-64 bg-white top-17   p-3 right-2 rounded shadow-2xl z-100">
      <div className=" text-base flex gap-3 ">
        <img
          className="object-cover cursor-pointer size-14 rounded-full outline -outline-offset-1 outline-gray-950/5"
          src={userData?.profileImage}
          width="36"
          height="36"
          alt=""
        ></img>
        <div>
          <h2 className="font-medium">{`${userData?.firstName} ${userData?.lastName}`}</h2>
          <p className="text-sm line-clamp-8">{userData?.headline}</p>
        </div>
      </div>
      <button
        className="text-base w-full my-3 border-2 border-sky-400 py-1 cursor-pointer rounded-3xl font-medium text-sky-400"
        onClick={handleProfile}
      >
        View Profile
      </button>
      <div className="bg-gray-300 w-full h-0.5"></div>
      <button
        className="text-base w-full my-3 border-2 border-red-400 py-1 cursor-pointer rounded-3xl font-medium text-red-400"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>
  )
}

export default ProfileCard
