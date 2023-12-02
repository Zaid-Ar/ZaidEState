// import React, { useState } from "react";
// import { Link, json } from "react-router-dom";
// export default function SignUp() {
//   const [formData,setFormData] = useState({})
//    const handleChange = (e) =>{
//     setFormData({...formData,[e.target.id]:e.target.value})
//    }
//    const handleSubmit = async (e)=>{
//     e.preventDefault()
//     const res = await fetch ("/api/auth/signup",{
//       method:"POST",
//       headers:{
//         "Content-Type":'application/json'
//       },
//       body:JSON.stringify(formData)
//     })
//    const data = await res.json()
//    console.log(data)
//   }
//      return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           placeholder="Username"
//           id="username"
//           className="bg-slate-100 p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           id="email"
//           className="bg-slate-100 p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           id="password"
//           className="bg-slate-100 p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <button className="bg-slate-700 text-white p-3 rounded-lg uppercase disabled:opacity-80 hover:opacity-95 ">
//           Sign Up
//         </button>
//       </form>
//       <div className="mt-5 flex gap-2">
//         <p>Have an account?</p>
//         <Link to="/sign-in">
//           <span className="text-blue-500">Sign In</span>
//         </Link>
//       </div>
//     </div>
//   );
// }

// import React, { useRef, useState } from "react";
// import { Link, json } from "react-router-dom";
// export default function SignUp() {

//     const userNameRef = useRef();
//     const emailRef = useRef();
//     const passwordRef = useRef();

//    const handleSubmit = async (e)=>{
//     e.preventDefault()
//      const username = userNameRef.current.value;
//      const email = emailRef.current.value;
//      const password = passwordRef.current.value;
//      const res = await fetch ("/api/auth/signup",{
//       username,
//       email,
//       password,
//       method:"POST",
//       headers:{
//         "Content-Type":'application/json'
//       },
//       body:JSON.stringify({username,email,password})
//     })
//    const data = await res.json()
//    console.log(data)
//   }

//      return (
//        <div className="p-3 max-w-lg mx-auto">
//          <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
//          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//            <input
//              type="text"
//              placeholder="Username"
//              id="username"
//              className="bg-slate-100 p-3 rounded-lg"
//              ref={userNameRef}
//            />
//            <input
//              type="email"
//              placeholder="Email"
//              id="email"
//              className="bg-slate-100 p-3 rounded-lg"
//              ref={emailRef}
//            />
//            <input
//              type="password"
//              placeholder="Password"
//              id="password"
//              className="bg-slate-100 p-3 rounded-lg"
//              ref={passwordRef}
//            />
//            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase disabled:opacity-80 hover:opacity-95 ">
//              Sign Up
//            </button>
//          </form>
//          <div className="mt-5 flex gap-2">
//            <p>Have an account?</p>
//            <Link to="/sign-in">
//              <span className="text-blue-500">Sign In</span>
//            </Link>
//          </div>
//        </div>
//      );
// }

import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
export default function SignUp() {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signup", {
        username,
        email,
        password,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      signInFailure(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          ref={userNameRef}
        />
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
          {loading ? "loading..." : "Sign Up"}
        </button>
      </form>
      <div className="mt-5 flex gap-2">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error || "Something went wrong" : ""}
      </p>
    </div>
  );
}
