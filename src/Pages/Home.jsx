import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constanst";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/profile/data", {
        withCredentials: true,
      });

      dispatch(addUser(data?.data));
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  if (!userData) {
    return null;
  }
  return (
    <div className="min-h-screen bg-[#EDEEF3]  ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
