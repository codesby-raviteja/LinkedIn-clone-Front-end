import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { BASE_URL } from "../constanst";

function CreateNewPost({ user, setOpenCreatePost,  }) {
  const [postDescription, setPostDescription] = useState("");
  const inputRef = useRef();
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      if (!postDescription) {
        return alert("Description cannot be Empty");
      }

      formData.append("description", postDescription);
      formData.append("image", inputRef.current.files[0]);

      const res = await axios.post(BASE_URL + "/post/createpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(res);
      setOpenCreatePost(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const generateImageUrl = URL.createObjectURL(image);
    setUploadedImageUrl(generateImageUrl);
  };

  return (
    <div className="absolute px-4 sm:px-8  z-10 inset-0 flex  bg-gray-500/80">
      <div className="w-full  max-w-2xl  max-h-[80%] flex flex-col  bg-white mx-auto mt-20 rounded-xl">
        <div className="px-8 py-4 flex gap-2 ">
          <img
            src={user?.profileImage}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
            alt="profile photo"
          />
          <div className="py-1 flex flex-col  ">
            <span className="font-medium text-lg sm:text-xl ">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="leading-3 text-sm">Connections Only</span>
          </div>
        </div>

        <form className="flex flex-col grow  " onSubmit={handleSubmit}>
          <div
            className="grow  overflow-y-auto 
   [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
          "
          >
            <textarea
              name="postDescription"
              className="my-2 w-full grow h-[60%] focus:border-0 focus:outline-0  resize-none px-4 py-1 sm:placeholder:text-xl placeholder:font-medium [&::-webkit-scrollbar]:w-2
 
"
              placeholder="What do you want to talk about ?"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
            ></textarea>
            {uploadedImageUrl && (
              <img
                src={uploadedImageUrl}
                className="mx-auto h-96  object-cover   "
                alt="image"
              />
            )}
          </div>

          <div className="px-4 pt-4 pb-1 flex ">
            <CiImageOn
              className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
              onClick={() => inputRef.current.click()}
            />

            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              ref={inputRef}
              onChange={handleImageChange}
            />
          </div>
          <hr className="h-0.5 bg-gray-400 border-0" />
          <div className="flex py-2 px-4">
            <button
              type="submit"
              className="bg-blue-400 px-4 rounded-2xl sm:text-lg font-medium ml-auto cursor-pointer hover:bg-blue-500"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewPost;
