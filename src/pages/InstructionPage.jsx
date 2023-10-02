import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

function InstructionPage() {
  const [showInstructions, setShowInstructions] = useState(false);
  const { userData, updateUser } = useUser();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateUser({ [name]: value });

    const isUsernameValid = userData.username.trim() !== "";
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email);

    setIsButtonDisabled(!(isUsernameValid && isEmailValid));
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex flex-col justify-center items-center text-white">
      <div>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-extrabold mb-6">Welcome to the Quiz!</h1>

          <p className="text-lg text-gray-200 mb-4">
            Here are some instructions on how to participate:
          </p>

          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="text-white hover:text-white transition duration-300"
          >
            {showInstructions ? (
              <p className="bg-red-600 p-2 rounded-md">Hide Instructions</p>
            ) : (
              <p className="bg-green-400 p-2 rounded-md">Show Instructions</p>
            )}
          </button>
        </div>
      </div>
      <div>
        <div className="container">
          <ul
            className={`text-left list-disc pl-6 ${
              showInstructions ? "" : "hidden"
            }`}
          >
            <li className="text-gray-300 mb-2">
              Read each question carefully.
            </li>
            <li className="text-gray-300 mb-2">
              Select your answer and move to the next question.
            </li>
            <li className="text-gray-300 mb-2">
              Complete the quiz within the given time.
            </li>
          </ul>
          <div className={`mt-6`}>
            <label className="text-gray-300 block">Username:</label>
            <input
              autoComplete="off"
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className="border text-black border-gray-300 rounded-md p-2 mb-4 w-full"
              placeholder="Enter your username"
            />

            <label className="text-gray-300 block">Email:</label>
            <input
              autoComplete="off"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="border text-black border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter your email"
            />
          </div>

          <div className="mt-6">
            <Link
              to={isButtonDisabled ? "/" : "/quiz "}
              className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isButtonDisabled}
            >
              Start Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructionPage;
