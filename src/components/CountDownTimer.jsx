import React, { useState, useEffect } from "react";
import Hourglass from "./Hourglass";
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} min ${remainingSeconds} sec`;
}

function CountDownTimer(props) {
  const { isTimeout, setIsTimeout, reportPage, setReportPage} = props;
  const [showAutoSubmitPopup, setShowAutoSubmitPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState(1 * 60); // 30 minutes in seconds

  // Define a function to update the timer
  const updateTimer = () => {
    setCurrentTime((prevTime) => prevTime - 1);
  };

  // Define a function to handle the timer timeout
  const handleTimeout = () => {
    setIsTimeout(true);
    setReportPage(true);
    setShowAutoSubmitPopup(true); // Show the auto-submit popup
  };

  // Close the popup after 5 seconds (adjust the time as needed)
  useEffect(() => {
    console.log(isTimeout);
    if (showAutoSubmitPopup) {
      setTimeout(() => {
        setShowAutoSubmitPopup(false);
        // Add logic to submit the quiz here
      }, 2000); // 5 seconds
    }
  }, [showAutoSubmitPopup]);
  useEffect(()=>{
    console.log("igfen")
    reportPage===true ? setCurrentTime(0) : "";
  },[reportPage]);
  // Update the timer every second
  useEffect(() => {
    if (currentTime > 0) {
      const timerInterval = setInterval(updateTimer, 1000);
      return () => clearInterval(timerInterval);
    } else {
      handleTimeout();
    }
  }, [currentTime]);

  return (
    <div className="">
      <div className="timer flex items-center ">
        <Hourglass />{" "}
        <div className="text-2xl ml-1 font-bold">{formatTime(currentTime)}</div>
      </div>

      {isTimeout === true && <p>Time's up! Quiz has ended.</p>}
      <div></div>
      {/* Auto-submit popup */}
      {showAutoSubmitPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className=" p-6 rounded-lg shadow-lg bg-red-400">
            <p className="text-lg font-semibold text-black ">
              Quiz Submitted Successfully. Evaluating your results...
            </p>
          </div>
        </div>
      )}

      {/* Add your quiz questions and other components */}
    </div>
  );
}

export default CountDownTimer;
