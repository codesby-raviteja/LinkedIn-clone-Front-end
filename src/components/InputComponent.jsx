import React from "react"


function InputComponent({
  title,
  type,
  name,
  id,
  value,
  action,
  errorMessage,
  hover_color,
}) {
  return (
    <div className="flex flex-col my-2  ">
      <label className="text-base" htmlFor={id}>
        {title}*
      </label>
      <input
        className={`border text-base p-1 px-2 rounded`}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={action}
      />
    </div>
  )
}

export default InputComponent
