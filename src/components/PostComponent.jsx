import React, { useState } from "react";
import { BiLike } from "react-icons/bi";
import { LuThumbsUp } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoNavigate } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "../constanst";
import { BiSolidLike } from "react-icons/bi";
import { useSelector } from "react-redux";

function PostComponent({ post, getShortTimeAgo, setPosts }) {
  const user = useSelector((store) => store.userData);

  const { profileImage, firstName, lastName, headline } = post.author;
  const { _id, postDescription, likes, comments, createdAt, imageUrl } = post;
  const postedTime = getShortTimeAgo(createdAt);
  const [openParagraph, setOpenParagraph] = useState(false);

  const handleLike = async (postId) => {
    try {
      const res = await axios.patch(
        BASE_URL + `/post/like/${postId}`,
        {},
        { withCredentials: true }
      );

      const likedPost = res?.data?.data;
      setPosts((prev) => {
        return prev.map((post) =>
          post._id === likedPost._id ? likedPost : post
        );
      });
    } catch (error) {
      console.log("Error in HandleLike function");
    }
  };

  return (
    <div className="bg-white  my-4 rounded px-4 pt-3" >
      <div className="flex gap-2 py-2">
        <img
          src={profileImage}
          alt="profile photo "
          className="w-12 h-12 object-cover object-top rounded-full shrink-0"
        />
        <div className="flex flex-col">
          <span className="font-medium leading-5">
            {firstName + " " + lastName}
          </span>
          {headline && (
            <span className="line-clamp-1 text-sm text-gray-500">
              {headline}
            </span>
          )}
          <span className="text-[13px] font-normal text-gray-500  ">
            {postedTime} •{" "}
          </span>
        </div>
      </div>
      <div className="flex py-2">
        <p className={openParagraph ? " " : `line-clamp-2 `}>
          {postDescription}{" "}
        </p>
        {postDescription.length > 250 && !openParagraph && (
          <button
            className="cursor-pointer hover:underline text-sm text-gray-500 hover:text-blue-400 mt-auto"
            onClick={() => setOpenParagraph(true)}
          >
            {"  "}
            ...more
          </button>
        )}
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="image"
          className="mx-auto"
          loading="lazy"
        ></img>
      )}
      <div className="mt-4 mb-1 flex px-2 justify-between">
        <span className="flex items-center gap-1">
          {likes.length} <BiLike className="text-blue-500 text-lg" />{" "}
        </span>
        <span className="flex items-center">{comments.length} comments</span>
      </div>
      <hr className="border-gray-300" />
      <div className="flex justify-between items-center px-2 py-1 gap-4">
        <span
          className="grow flex gap-1 items-center justify-center py-2 text-center font-medium  hover:bg-gray-200 cursor-pointer"
          onClick={() => handleLike(_id)}
        >
          {likes.includes(user._id) ? (
            <>
              <BiSolidLike className="text-lg text-blue-500" />
              <span className="text-[14px] text-blue-500">Liked</span>
            </>
          ) : (
            <>
              <LuThumbsUp className="text-base" />
              <span className="text-[14px]">Like</span>
            </>
          )}
        </span>
        <span className="grow flex gap-1 items-center justify-center py-2 text-center font-medium  hover:bg-gray-200 cursor-pointer">
          <FaRegCommentDots className="text-base mt-1" />{" "}
          <span className="text-[14px]">Commnent</span>
        </span>
        <span className="grow flex gap-1 items-center justify-center py-2 text-center font-medium  hover:bg-gray-200 cursor-pointer">
          <BiRepost className="text-xl " />{" "}
          <span className="text-[14px]"> Repost</span>
        </span>
        <span className="grow flex gap-1 items-center justify-center py-2 text-center font-medium  hover:bg-gray-200 cursor-pointer">
          <IoNavigate className="text-base" />{" "}
          <span className="text-[14px]">Share</span>
        </span>
      </div>
    </div>
  );
}

export default PostComponent;
