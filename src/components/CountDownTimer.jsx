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
  const [currentTime, setCurrentTime] = useState(30 * 60); // 30 minutes in seconds

  const updateTimer = () => {
    setCurrentTime((prevTime) => prevTime - 1);
  };

  const handleTimeout = () => {
    setIsTimeout(true);
    setReportPage(true);
    setShowAutoSubmitPopup(true); 
  };

  useEffect(() => {
    if (showAutoSubmitPopup) {
      setTimeout(() => {
        setShowAutoSubmitPopup(false);
      }, 2000); 
    }
  }, [showAutoSubmitPopup]);
  useEffect(()=>{
    reportPage===true ? setCurrentTime(0) : "";
  },[reportPage]);

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
      {showAutoSubmitPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className=" p-6 rounded-lg shadow-lg bg-red-400">
            <p className="text-lg font-semibold text-black ">
              Quiz Submitted Successfully. Evaluating your results...
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default CountDownTimer;
