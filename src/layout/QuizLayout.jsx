import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import CountDownTimer from "../components/CountDownTimer";
import QuizCarousel from "../components/QuizCarousel";
import QuestionPanel from "../components/QuestionPanel";
import { AiOutlineAlignLeft } from "react-icons/ai";
function QuizLayout() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isTimeout, setIsTimeout] = useState(false);
  const [reportPage, setReportPage] = useState(false);
  const [marks, setMarks] = useState(0);
  const { userData, updateUser } = useUser();
  const [sidebarVisible, setSidebarVisible] = useState(
    window.innerWidth >= 640
  );

  // Reference to the sidebar element
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setSidebarVisible(window.innerWidth >= 640);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let totalMarks = 0;
    questions.forEach((question) => {
      if (question.correct_answer === question.marked_answer) {
        totalMarks += 1;
      }
    });
    setMarks(totalMarks);
  }, [reportPage]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=15"
        );

        if (response.data.results) {
          const fetchedQuestions = response.data.results;

          const shuffledQuestions = fetchedQuestions.map((question) => {
            const allAnswers = [
              ...question.incorrect_answers,
              question.correct_answer,
            ];
            const shuffledAnswers = shuffleArray(allAnswers);

            question.answers = shuffledAnswers;

            return question;
          });
          shuffledQuestions[0].visited = true;
          setQuestions(shuffledQuestions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    fetchQuestions();
  }, []);

  // Event listener to close the sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarVisible(window.innerWidth >= 640);
      }
    }

    if (sidebarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarVisible]);

  return (
    <div className="flex min-h-screen">
      {sidebarVisible && (
        <div
          ref={sidebarRef}
          className={`min-w-[30%] w-[70%] fixed sm:static z-10 min-h-screen sm:w-[30%] bg-blue-200`}
        >
          <div className="text-xl font-semibold ml-2 text-blue-800">
            Hello, <span className="text-red-600 ">{userData.username}! </span>
          </div>

          {/* Sidebar content here */}
          <QuestionPanel
            questions={questions}
            setQuestions={setQuestions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            reportPage={reportPage}
          />
        </div>
      )}

      <div className={`sm:w-[70%] w-[100%]  px-10 bg-slate-100`}>
        <div className="flex items-center">
          {reportPage && (
            <div className="mt-4 p-4 bg-blue-100 border border-blue-500 rounded-lg">
              <div>
                <p className="text-xl font-semibold text-blue-800">
                  Your Score is: <span className="text-blue-600">{marks}</span>
                </p>
                <p className="text-blue-600 mt-2">
                  You can check your answers below.
                </p>
              </div>
            </div>
          )}
          <div
            className={`${
              reportPage === false ? "sm:ml-[75%] ml-[40%]" : "ml-auto"
            } mt-1 inline-block`}
          >
            <CountDownTimer
              isTimeout={isTimeout}
              setIsTimeout={setIsTimeout}
              setReportPage={setReportPage}
              reportPage={reportPage}
            />
          </div>
        </div>
        <div className=" ">
          <QuizCarousel
            isTimeout={isTimeout}
            questions={questions}
            setQuestions={setQuestions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            reportPage={reportPage}
            setReportPage={setReportPage}
          />
        </div>
        <button
          className="bg-red-500 p-2 px-4 rounded-lg ml-[87%]"
          onClick={() => {
            setReportPage(true);
          }}
        >
          End Test
        </button>{" "}
      </div>
      {!sidebarVisible && (
        <button
          className="fixed top-0 left-0 m-4 bg-blue-500 text-white p-2 rounded-md"
          onClick={() => setSidebarVisible(true)}
        >
          <AiOutlineAlignLeft />
        </button>
      )}
    </div>
  );
}

export default QuizLayout;
