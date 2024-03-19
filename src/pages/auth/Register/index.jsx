import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLock,
  faUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function RegisterIndex() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setUserRole, updateUserNames } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [signupCredentials, setSignUpCredentials] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "https://mk-be-strapi-production.up.railway.app/api/auth/local/register",
        {
          method: "POST",
          body: JSON.stringify(signupCredentials),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUserRole(data.role);
        navigate("/auth/login");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Sign Up error:", error);
      setError("An error occurred while logging in. Please try again later.");
    }

    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const registerImage =
    "https://edp.raincode.my.id/static/media/login.cc0578413db10119a7ff.png";
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full flex-col md:flex-row">
          {/* Image */}
          <div className="md:bg-sky-500 md:min-h-screen flex flex-wrap md:w-1/2">
            <div className="items-center text-center flex flex-col relative justify-center mx-auto">
              <img
                src={registerImage}
                alt="Logo"
                className="md:w-72 w-48 mx-auto"
              />
              <div className="md:block hidden text-slate-100">
                <h1 className="font-semibold text-2xl pb-2">
                  Register an Account
                </h1>
              </div>
            </div>
          </div>
          {/* Register Section */}
          <div className="flex flex-col md:flex-1 items-center justify-center">
            <div className="loginWrapper flex flex-col w-full lg:px-36 md:px-8 px-8 md:py-8">
              {/* Login Header Text */}
              <div className="hidden md:block font-medium self-center text-xl sm:text-3xl text-gray-800">
                Sign Up{" "}
              </div>

              {/* Sparator */}
              <div className="hidden md:block relative mt-10 h-px bg-gray-300">
                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                    Please Fill in your Details{" "}
                  </span>
                </div>
              </div>

              <div className="md:hidden block my-4">
                <h1 className="text-2xl font-semibold">Register</h1>
              </div>

              {/* Register Form */}
              <div className="md:mt-10 mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col mb-3">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>

                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        onChange={(e) =>
                          setSignUpCredentials({
                            ...signupCredentials,
                            firstName: e.target.value,
                          })
                        }
                        value={signupCredentials.firstName}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-sky-400"
                        placeholder="Enter First Name"
                      />
                    </div>
                    {error?.firstName && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {error.firstName[0]}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col mb-3">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>

                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        onChange={(e) =>
                          setSignUpCredentials({
                            ...signupCredentials,
                            lastName: e.target.value,
                          })
                        }
                        value={signupCredentials.lastName}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-sky-400"
                        placeholder="Enter Last Name"
                      />
                    </div>
                    {error?.lastName && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {error.lastName[0]}
                      </span>
                    )}
                  </div>

                  {/* Username */}
                  <div className="flex flex-col mb-3">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>

                      <input
                        id="email"
                        type="text"
                        name="email"
                        onChange={(e) =>
                          setSignUpCredentials({
                            ...signupCredentials,
                            email: e.target.value,
                          })
                        }
                        value={signupCredentials.email}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-sky-400"
                        placeholder="Enter E-Mail Address"
                      />
                    </div>
                    {error?.email && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {error.email[0]}
                      </span>
                    )}
                  </div>

                  {/* Username */}
                  <div className="flex flex-col mb-3">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faUser} />
                      </div>

                      <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={(e) =>
                          setSignUpCredentials({
                            ...signupCredentials,
                            username: e.target.value,
                          })
                        }
                        value={signupCredentials.username}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-sky-400"
                        placeholder="Enter unique user name "
                      />
                    </div>
                    {error?.name && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {error.email[0]}
                      </span>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col mb-3">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faLock} />
                      </div>

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={(e) =>
                          setSignUpCredentials({
                            ...signupCredentials,
                            password: e.target.value,
                          })
                        }
                        value={signupCredentials.password}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-sky-400"
                        placeholder="Password"
                      />
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="absolute top-0 right-0 mt-2 mr-4 text-gray-500 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    </div>
                    {error?.password && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {error.password[0]}
                      </span>
                    )}
                  </div>

                  {/* Button Register */}
                  <div className="flex w-full">
                    <button
                      disabled={loading}
                      type="submit"
                      className="flex items-center justify-center focus:outline-none text-white text-sm bg-sky-500 hover:bg-sky-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
                    >
                      <span className="mr-2 md:uppercase">
                        {loading ? "Processing...." : "Register"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Register Link */}
              <div className="flex justify-center items-center my-6 md:mb-0">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center font-bold text-sky-500 hover:text-sky-700 text-xs text-center"
                >
                  <span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                  </span>
                  <span className="ml-2">Have An Account?</span>
                </Link>
              </div>
              {/* End Register Link */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterIndex;
