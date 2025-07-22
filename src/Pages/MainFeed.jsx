import React, { use, useState } from "react";

import UserCard from "./UserCard";
import EditUser from "../components/EditProfile";
import { useSelector } from "react-redux";
import PostsInFeed from "../components/PostsInFeed";

const MainFeed = () => {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const user = useSelector((state) => state.userData);

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 w-full  max-w-7xl mx-auto mt-4 gap-4 px-2   ">
      <UserCard setOpenEditProfile={setOpenEditProfile} />
      {openEditProfile && <EditUser setOpenEditProfile={setOpenEditProfile} />}
      <PostsInFeed user={user} />

      <div className="hidden lg:block bg-white min-h-48  max-h-70 md:col-span-3"></div>
    </div>
  );
};

export default MainFeed;
