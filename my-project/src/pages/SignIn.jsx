import React, { useRef, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import  OAuth from "../components/OAuth"

const SignIn = () => {
const emailRef = useRef();
const passwordRef = useRef();
const { loading, error } = useSelector((state) => state.user);
const navigate = useNavigate();
const dispatch = useDispatch();
const handleSubmit = async (e) => {
  e.preventDefault();

  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  try {
    dispatch(signInStart());
    const res = await fetch("/api/auth/signin", {
      email,
      password,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate("/profile");
  } catch (error) {
    signInFailure(error);
  }
};

return (
  <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        id="email"
        className="bg-slate-100 p-3 rounded-lg"
        ref={emailRef}
      />
      <input
        type="password"
        placeholder="Password"
        id="password"
        className="bg-slate-100 p-3 rounded-lg"
        ref={passwordRef}
      />
      <button className="bg-slate-700 text-white p-3 rounded-lg uppercase disabled:opacity-80 hover:opacity-95 ">
        {loading ? "loading..." : "Sign In"}
      </button>
      <OAuth />
    </form>
    <div className="mt-5 flex gap-2">
      <p>Dont Have an account?</p>
      <Link to="/sign-up">
        <span className="text-blue-500">Sign Up</span>
      </Link>
    </div>
    <p className="text-red-700 mt-5">
      {error ? error || "Something went wrong" : ""}
    </p>
  </div>
);
}

export default SignIn