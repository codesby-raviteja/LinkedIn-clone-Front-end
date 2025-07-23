import React, { useEffect, useRef, useState } from "react";
import CreateNewPost from "./CreateNewPost";
import axios from "axios";
import { BASE_URL } from "../constanst";

import PostComponent from "./postComponent";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { io } from "socket.io-client";

function PostsInFeed({ user }) {
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [posts, setPosts] = useState();

  const socketRef = useRef();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    const socketHandler = (updatedPost) => {
      console.log("post updated notified with socket.io");
      console.log(updatedPost);
      setPosts((prev) => {
        return prev.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
      });
    };

    socket.on("receivedUpdate", socketHandler);

    return () => {
      socket.disconnect();
      socket.removeListener("receivedUpdate", socketHandler);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(BASE_URL + "/posts", {
        withCredentials: true,
      });

      setPosts(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  function getShortTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);

    const diffInMinutes = differenceInMinutes(now, date);

    if (diffInMinutes < 60) return `${diffInMinutes}m`;

    const diffInHours = differenceInHours(now, date);
    if (diffInHours < 24) return `${diffInHours}h`;

    const diffInDays = differenceInDays(now, date);
    return `${diffInDays}d`;
  }

  return (
    <>
      <div className="min-h-48 col-span-8 lg:col-span-6 ">
        <div className="bg-white px-4 py-4 mb-4 rounded flex gap-2">
          <img
            src={user?.profileImage}
            alt=""
            className="w-12 h-12 object-cover object-top rounded-full shrink-0"
          />
          <button
            className="border w-full text-left px-4  rounded-3xl font-medium text-gray-500 cursor-pointer text-sm"
            onClick={() => setOpenCreatePost(true)}
          >
            Start a post{" "}
          </button>
        </div>
        <div className=" min-h-48 col-span-8 lg:col-span-6 rounded o">
          {posts?.length &&
            posts.map((post) => (
              <PostComponent
                key={post?._id}
                post={post}
                getShortTimeAgo={getShortTimeAgo}
                setPosts={setPosts}
              />
            ))}
        </div>
      </div>
      {openCreatePost && (
        <CreateNewPost user={user} setOpenCreatePost={setOpenCreatePost} />
      )}
    </>
  );
}

export default PostsInFeed;
