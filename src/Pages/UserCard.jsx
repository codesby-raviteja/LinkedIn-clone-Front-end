import React from "react";

import { FaPencilAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserCard = ({ setOpenEditProfile }) => {
  const userData = useSelector((state) => state.userData);

  return (
    <div className="bg-white min-h-48  max-h-fit col-span-4 lg:col-span-3 rounded md:sticky top-20">
      <div className="relative z-0">
        <img
          src={userData?.coverImage}
          alt=""
          className="h-26 w-full object-top md:object-cover"
        />
        <img
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 object-cover object-top size-20 rounded-full outline -outline-offset-1 outline-gray-950/5"
          src={userData?.profileImage}
          width="42"
          height="42"
        ></img>
      </div>
      <div className="mt-8 text-center px-4 pb-2">
        <h2 className="text-lg font-semibold">{`${userData?.firstName} ${userData?.lastName}`}</h2>
        <p className="text-sm font-medium mt-2">{userData?.headline}</p>
      </div>
      <hr className="border-1 border-gray-400 my-1" />
      <button
        className="text-lg mb-8 flex items-center cursor-pointer gap-2 justify-center border-2 border-sky-500 text-sky-500 mt-4 mx-auto rounded-2xl w-[45%] px-2 md:w-[80%] "
        onClick={() => setOpenEditProfile((prev) => !prev)}
      >
        Edit Profile
        <FaPencilAlt />
      </button>
    </div>
  );
};

export default UserCard;
