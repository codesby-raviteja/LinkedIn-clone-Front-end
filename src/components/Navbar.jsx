import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../assets/logo.svg"
import { IoSearchSharp } from "react-icons/io5"
import { FaHouse } from "react-icons/fa6"
import { IoPeople } from "react-icons/io5"

import { TiMessageTyping } from "react-icons/ti"
import { FaBell } from "react-icons/fa6"

import NavIcon from "./NavIcon"
import ProfileCard from "./ProfileCard"
import { useSelector } from "react-redux"

const Navbar = () => {
  const [openSearchbar, setOpenSearchbar] = useState(false)
  const [openProfileCard, setOpenProfileCard] = useState(false)
  const headerRef = useRef()
  const userData = useSelector((state) => state.userData)

  useEffect(() => {
    const windowResize = function (e) {
      if (window.innerWidth > 735) {
        setOpenSearchbar(false)
      }
    }
    const windowClick = (e) => {
      if (headerRef.current && headerRef.current.contains(e.target)) {
        return
      }
      setOpenProfileCard(false)
      setOpenSearchbar(false)
    }

    window.addEventListener("resize", windowResize)
    window.addEventListener("click", windowClick)

    return () => {
      window.removeEventListener("resize", windowResize)
      window.removeEventListener("click", windowClick)
    }
  }, [])

  return (
    <header
      className="h-14 sm:h-16 sticky z-10 top-0 right-0 left-0 shadow-xl bg-white"
      ref={headerRef}
    >
      <div className="max-w-7xl mx-auto h-full relative flex px-1 md:px-4 justify-between items-center ">
        <div
          className={`h-full  flex gap-1 sm:gap-2 items-center ${
            openSearchbar ? "w-full" : "md:w-2/7"
          }  `}
        >
          <Link to={"/"}>
            <img
              src={Logo}
              className="h-8 w-8 md:h-12 md:w-12   "
              alt="linkedIn"
            />
          </Link>
          <div
            className={`${
              openSearchbar ? "flex flex-1" : "hidden md:flex"
            } items-center bg-gray-300 py-1 px-2 gap-2 w-full rounded`}
          >
            <IoSearchSharp className="text-2xl " />
            <input
              type="text"
              className="text-base outline-0 focus:outline-0 w-full"
              placeholder="Search..."
            />
          </div>

          <IoSearchSharp
            className={`${
              openSearchbar ? "hidden" : "block"
            } md:hidden text-2xl ml-0.5 cursor-pointer`}
            onClick={() => {
              setOpenSearchbar(true)
              setOpenProfileCard(false)
            }}
          />
        </div>
        <nav
          className={`${
            openSearchbar ? "hidden" : "flex"
          } text-base  gap-8 md:gap-6 lg:gap-12  items-center `}
        >
          <NavIcon ICON={FaHouse} text={"Home"} />
          <NavIcon ICON={IoPeople} text={"My Network"} />
          <NavIcon ICON={TiMessageTyping} text={"Messaging"} />
          <NavIcon ICON={FaBell} text={"Notifications"} />
          <img
            className="object-cover cursor-pointer size-9 sm:size-10 rounded-full outline -outline-offset-1 outline-gray-950/5"
            src={userData?.profileImage}
            width="36"
            height="36"
            alt=""
            onClick={() => {
              setOpenProfileCard((prev) => !prev)
            }}
          ></img>
        </nav>
        {openProfileCard && (
          <ProfileCard setOpenProfileCard={setOpenProfileCard} />
        )}
      </div>
    </header>
  )
}

export default Navbar
