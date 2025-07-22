import React from "react"

const NavIcon = ({ ICON, text }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <ICON className="icon-font text-gray-800" />
      <span className="hidden sm:block">{text} </span>
    </div>
  )
}

export default NavIcon
