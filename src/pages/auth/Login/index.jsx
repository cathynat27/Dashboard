import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLock,
  faUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function LoginIndex() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUserRole, updateUserNames, handleLoginIndex } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleForgotPassword = () => {
    toggleModal();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "https://mk-be-strapi-production.up.railway.app/api/auth/local?populate=*",
        {
          method: "POST",
          body: JSON.stringify(loginCredentials),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      handleLoginIndex();

      if (response.ok) {
        const fullName = `${data.user.firstName} ${data.user.lastName}`;
        updateUserNames(fullName);
        setUserRole(data.role);
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in. Please try again later.");
    }

    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const LoginImage =
    "https://edp.raincode.my.id/static/media/login.cc0578413db10119a7ff.png";
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full flex-col md:flex-row">
          {/* Image */}
          <div className="md:bg-sky-500 md:min-h-screen flex flex-wrap md:w-1/2">
            <div className="items-center text-center flex flex-col relative justify-center mx-auto">
              <img
                src={LoginImage}
                alt="Logo Login"
                className="md:w-72 w-48 mx-auto"
              />
              <div className="md:block hidden text-slate-100">
                <h1 className="font-semibold text-2xl pb-2">
                  Login to Access Dashboard
                </h1>
              </div>
            </div>
          </div>
          {/* Login Section */}
          <div className="flex flex-col md:flex-1 items-center justify-center">
            <div className="loginWrapper flex flex-col w-full lg:px-36 md:px-8 px-8 md:py-8">
              {/* Login Header Text */}
              <div className="hidden md:block font-medium self-center text-xl sm:text-3xl text-gray-800">
                Mobiklinic Renal Dashboard!
              </div>

              {/* Sparator */}
              <div className="hidden md:block relative mt-10 h-px bg-gray-300">
                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                    Welcome Back
                  </span>
                </div>
              </div>

              <div className="md:hidden block my-4">
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>

              {/* Login Form */}
              <div className="md:mt-10 mt-4">
                <form onSubmit={handleLogin}>
                  {/* Username */}
                  <div className="flex flex-col mb-3">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faUser} />
                      </div>

                      <input
                        id="username"
                        type="text"
                        name="identifier"
                        value={loginCredentials.identifier}
                        onChange={(e) =>
                          setLoginCredentials({
                            ...loginCredentials,
                            identifier: e.target.value,
                          })
                        }
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-sky-400"
                        placeholder="Enter Username"
                      />
                    </div>
                    {error?.username && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {error.username[0]}
                      </span>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col mb-6">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faLock} />
                      </div>

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginCredentials.password}
                        onChange={(e) =>
                          setLoginCredentials({
                            ...loginCredentials,
                            password: e.target.value,
                          })
                        }
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-sky-400"
                        placeholder="Enter Password"
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

                  {/* Forgot Password Link */}
                  <div className="flex items-center mb-6 -mt-2 md:-mt-4">
                    <div className="flex ml-auto">
                      <Link
                        to=""
                        onClick={(e) => {
                          e.preventDefault();
                          handleForgotPassword();
                        }}
                        className="inline-flex font-semibold text-xs sm:text-sm text-sky-500 hover:text-sky-700"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  {/* Button Login */}
                  <div className="flex w-full">
                    <button
                      disabled={loading}
                      type="submit"
                      className="flex items-center justify-center focus:outline-none text-white text-sm bg-sky-500 hover:bg-sky-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
                    >
                      <span className="mr-2 md:uppercase">
                        {loading ? "Processing...." : "Login"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
                      <div className="text-xl font-semibold mb-4">
                        Forgot Password
                      </div>
                      <div className="text-gray-700 mb-4">
                        If you've forgotten your password, please contact
                        Mobiklinic technical team for assistance.
                        <br />
                        <a
                          href="mailto:info@mobiklinic.com"
                          className="inline-flex font-semibold text-xs sm:text-sm text-sky-500 hover:text-sky-700"
                        >
                          info@mobiklinic.com
                        </a>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={toggleModal}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginIndex;
