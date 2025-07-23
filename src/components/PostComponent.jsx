import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { LuThumbsUp } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoNavigate } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "../constanst";
import { BiSolidLike } from "react-icons/bi";
import { useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

function PostComponent({ post, getShortTimeAgo, setPosts }) {
  const [newComment, setNewComment] = useState("");
  const [openParagraph, setOpenParagraph] = useState(false);
  const [openCommentSection, setOpenCommentSection] = useState(false);
  const user = useSelector((store) => store.userData);

  const {
    profileImage,
    firstName,
    lastName,
    headline,
    _id: authorId,
  } = post.author;

  const { _id, postDescription, likes, comments, createdAt, imageUrl } = post;
  const postedTime = getShortTimeAgo(createdAt);

  const reversedComments = [...comments].reverse();
  const [doesConnectionExits, setDoesConnectionExists] = useState(null);

  useEffect(() => {
    if (user._id !== authorId) {
      checkConnection();
    }
  }, []);

  const checkConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + `/check/connection/${authorId}`, {
        withCredentials: true,
      });

      setDoesConnectionExists(res?.data?.connectionExists);
    } catch (error) {
      console.log("error in checking connection");
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await axios.patch(
        BASE_URL + `/post/like/${postId}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log("Error in HandleLike function");
    }
  };

  const handleCommentUpload = async (postId) => {
    try {
      const res = await axios.patch(
        BASE_URL + `/post/comment/${postId}`,
        { comment: newComment },
        { withCredentials: true }
      );
      setNewComment("");
    } catch (error) {
      console.log(error);
      console.log("Error in HandleCommentUpload function");
    }
  };

  const handleFollow = async () => {
    try {
      try {
        const res = await axios.post(
          BASE_URL + `/connect/${authorId}`,
          {},
          { withCredentials: true }
        );
        setDoesConnectionExists(true);
      } catch (error) {
        console.log(error);
        console.log("Error in HandleFollow function");
      }
    } catch (error) {}
  };

  return (
    <div className="bg-white  my-4 rounded px-4 pt-3 pb-1">
      <div className="flex gap-2 py-2 justify-between items-start">
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
              <span className="line-clamp-1 text-sm text-gray-500 pr-2">
                {headline}
              </span>
            )}
            <span className="text-[13px] font-normal text-gray-500  ">
              {postedTime} •{" "}
            </span>
          </div>
        </div>
        {!(user._id === authorId) && !doesConnectionExits && (
          <button
            className="flex max-h-fit items-center text-blue-500 cursor-pointer hover:bg-blue-100 p-1 rounded "
            onClick={handleFollow}
          >
            <IoMdAdd className="text-[1.4rem] font-extrabold" />
            <span className="text-[1.1rem] font-medium">Follow</span>
          </button>
        )}
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
        <span className="flex items-center">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
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
        <span
          className="grow flex gap-1 items-center justify-center py-2 text-center font-medium  hover:bg-gray-200 cursor-pointer"
          onClick={() => setOpenCommentSection((prev) => !prev)}
        >
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
      <div
        className={
          openCommentSection ? "comment-transition on  " : "comment-transition"
        }
      >
        <div className="flex items-center gap-2 pt-2 pb-3  ">
          <img
            src={user.profileImage}
            alt="user profile photo"
            className="w-9 h-9 shrink-0 rounded-full object-cover  object-top"
          />
          <div className="flex grow py-0.5 items-center gap-4 rounded-3xl border-gray-400 border-2 px-2  ">
            <input
              type="text"
              className=" grow  focus:outline-0 px-1 py-1  text-[14px]"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="cursor-pointer"
              onClick={() => handleCommentUpload(_id)}
            >
              <IoSend />
            </button>
          </div>
        </div>
        {comments.length
          ? reversedComments.map((comment) => {
              const { profileImage, firstName, lastName, headline } =
                comment.user;
              return (
                <div className="flex gap-2 pb-2" key={comment._id}>
                  <img
                    src={profileImage}
                    alt="profile photo "
                    className="w-8 h-8 object-cover object-top rounded-full shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-[14px] leading-5">
                      {firstName + " " + lastName}
                    </span>
                    {headline && (
                      <span className="line-clamp-1 text-[12px] text-gray-500 pr-2">
                        {headline}
                      </span>
                    )}
                    <p className="py-2 text-sm">{comment?.content}</p>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default PostComponent;
