import React from "react";
import mail from "../assets/mail.svg";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
  return (
    <>
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={mail} className="w-100 h-10 mr-2" alt="Logo" />
        </a>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a class="text-base mr-5 hover:text-gray-900">Home</a>
          <a class="text-base mr-5 hover:text-gray-900">Story</a>
          <a class="text-base mr-5 hover:text-gray-900">Gallery</a>
          <a class="text-base mr-5 hover:text-gray-900">Contact Us</a>
        </nav>
      </div>

      <div className="w-screen h-[calc(100vh-5rem)]">
        <div className="bg-cover bg-[url('/mail.gif')] bg-center bg-no-repeat h-full w-full">
          <div className="container mx-auto flex flex-col my-auto align-middle h-full">
            <div className="my-auto  mx-auto lg:mx-0 w-10/12 lg:w-2/5">
              <h1 className="text-7xl mb-4">
                <span className="text-violet-500">Let’s Mail</span> To everyone
                together
              </h1>
              <p className="text-2xl mb-8">Bulk email sender</p>
              <div className="flex items-center">
                <button
                  className="rounded px-10 py-3 text-white bg-violet-500 hover:bg-violet-600"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
