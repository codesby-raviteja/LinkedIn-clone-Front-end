import React, { useState } from "react"
import { Link } from "react-router"
import { RxCross2 } from "react-icons/rx"
import { AiFillPlusCircle } from "react-icons/ai"
import { GoPencil } from "react-icons/go"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import InputComponent from "./InputComponent"
import { BASE_URL } from "../constanst.js"
import { addUser } from "../store/userSlice.jsx"

function EditUser({ setOpenEditProfile }) {
  const userData = useSelector((state) => state.userData)
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState("")
  const [userDetails, setUserDetails] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    userName: userData?.userName || "",
    gender: userData?.gender || "",
    headline: userData?.headline || "",
    profileImage: null,
    coverImage: null,
  })

  const [images, setImages] = useState({
    profileImage: userData?.profileImage,
    coverImage: userData?.coverImage,
  })

  const [skills, setSkills] = useState(userData?.skills)
  const [skill, setSkill] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const addSkill = () => {
    if (!skills.includes(skill)) {
      setSkills((prev) => [...prev, skill])
    }
    setSkill("")
  }

  const removeSkill = (idx) => {
    const newSkills = skills.filter((skill, index) => index !== idx)
    setSkills(newSkills)
  }

  const HandleImages = (e) => {
    const file = e.target.files[0]
    const { name } = e.target
    setUserDetails((prev) => ({ ...prev, [name]: file }))
    setImages((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }))
  }


  const handleInput = async function (e) {
    const name = e.target.name
    const value = e.target.value
    setUserDetails((prev) => ({ ...prev, [name]: value }))
    // if (inputErrors[name]) {
    //   setInputErrors((prev) => ({ ...prev, [name]: "" }))
    // }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      Object.keys(userDetails).forEach((key) => {
        formData.append(key, userDetails[key])
      })
      formData.append("skills", JSON.stringify(skills))
      setIsSaving(true)
      const { data } = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      })
      dispatch(addUser(data?.data))
      setIsSaving(false)
      setOpenEditProfile(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="fixed z-10 left-0 right-0 min-h-fit bottom-0 top-18 px-4 py-2 h-[calc(100vh-73px)] flex justify-center items-center ">
      <div
        className="fixed  bg-gray-500/80 inset-0  p-4"
        onClick={() => setOpenEditProfile(false)}
      ></div>

      <form
        className="bg-white z-1  min-w-xl max-w-xl  rounded px-4 py-3 "
        onSubmit={handleSubmit}
     
      >
        <div className="w-full  sm:h-full relative sm:min-h-34 max-h-38  ">
          {/* coverImage */}
          <img
            src={images.coverImage}
            alt=""
            className="w-full object-cover object-top bg-gray-300 h-full sm:min-h-38 max-h-38 "
          />

          {/*changeCoverImage  */}
          <label
            htmlFor="coverImage"
            className="absolute top-4 sm:top-5 right-4 sm:right-6 p-1 rounded-full overflow-hidden bg-white"
          >
            <GoPencil className="text-2xl sm:text-3xl   cursor-pointer  " />
          </label>
          <input
            type="file"
            accept="image/*"
            id="coverImage"
            name="coverImage"
            className="hidden"
            onChange={HandleImages}
          />

          {/* ProfileImage */}
          <div className="absolute left-4 -bottom-10 ">
            <img
              className="  object-top object-cover  size-22 sm:size-28 rounded-full outline -outline-offset-1 outline-gray-950/5"
              src={images?.profileImage}
              width="42"
              height="42"
            ></img>

            <label
              htmlFor="profileImage"
              className="absolute bottom-2  left-16 sm:left-20"
            >
              <AiFillPlusCircle className="text-2xl sm:text-3xl bg-white rounded-full   text-blue-500 cursor-pointer  " />
            </label>
            <input
              type="file"
              accept="image/*"
              id="profileImage"
              name="profileImage"
              className="hidden"
              onChange={HandleImages}
            />
          </div>
        </div>

        <div className="mt-15">
          {/* firstName */}

          <InputComponent
            type={"text"}
            title={"First Name"}
            id={"firstName"}
            name={"firstName"}
            action={handleInput}
            // errorMessage={inputErrors.first_name}
            value={userDetails.firstName}
            hover_color={"bg-green-500/40"}
          />

          {/* lastName */}
          <InputComponent
            type={"text"}
            title={"Last Name"}
            id={"lastName"}
            name={"lastName"}
            action={handleInput}
            // errorMessage={inputErrors.last_name}
            value={userDetails.lastName}
            hover_color={"bg-green-500/40"}
          />
          {/* userName */}
          <InputComponent
            type={"text"}
            title={"User Name"}
            id={"userName"}
            name={"userName"}
            action={handleInput}
            // errorMessage={inputErrors.email}
            value={userDetails.userName}
            hover_color={"bg-green-500/40"}
          />

          {/* headline */}
          <InputComponent
            type={"text"}
            title={"Headline"}
            id={"headline"}
            name={"headline"}
            action={handleInput}
            // errorMessage={inputErrors.email}
            value={userDetails.headline}
            hover_color={"bg-green-500/40"}
          />

          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-base">
              Gender*
            </label>
            <select
              name="gender"
              id="gender"
              className="border text-base h-[34px] rounded px-1"
              value={userDetails.gender}
              onChange={handleInput}
            >
              <option value="" hidden>
                select Gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="others">others</option>
            </select>
          </div>

          {/* Skills */}
          <div className="my-4  px-2">
            <label htmlFor="" className="my-1">
              Skills*
            </label>
            <div className="flex flex-wrap gap-2 my-2 ">
              {skills.map((skill, idx) => (
                <span
                  className="pl-2  border rounded-2xl bg-gray-500/10 overflow-hidden flex gap-2"
                  key={skill}
                >
                  {skill}{" "}
                  <button
                    className="px-1 bg-red-400/80 border-l rounded-r-2xl rounded-br-2xl fle cursor-pointer"
                    type="button"
                    onClick={() => removeSkill(idx)}
                  >
                    <RxCross2 />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-1 my-2 ">
              <input
                type="text"
                className="w-full border px-4 rounded-2xl "
                placeholder="mention skills.."
                value={skill}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    addSkill()
                  }
                }}
                onChange={(e) => setSkill(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-400/80 px-4 py-1 rounded-2xl cursor-pointer"
                onClick={addSkill}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <button
          className="border border-blue-400 text-base font-medium ml-auto block my-3 bg-blue-400 text-white px-12 py-1 rounded-3xl cursor-pointer hover:bg-blue-500 disabled:bg-sky-300/90 disabled:border-blue-300 disabled:cursor-no-drop"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>

        {errorMessage && (
          <p className="text-red-600 text-center text-xl font-medium">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  )
}

export default EditUser
