import React, { useState, useEffect } from "react";
import QuestionStats from "./QuestionStats";

function QuestionPanel(props) {
  const {
    questions,
    setQuestions,
    currentQuestion,
    setCurrentQuestion,
    reportPage,
  } = props;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen width is below a certain threshold (e.g., 640px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const CSS = {
    currentQuestionFocusCSS: "border-4 box-border border-red-400",
    visitedQuestionCSS: "bg-yellow-500 text-white font-bold",
    unvisitedQuestionCSS: "bg-blue-500 text-white font-bold",
    markedQuestionCSS: "bg-green-500 text-white font-bold",
  };

  const handleQuestionButtonClick = (questionIndex) => {
    if (!isMobile) {
      if (reportPage === false) {
        setQuestions((prevQuestions) => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions[questionIndex].visited = true;
          console.log(updatedQuestions[questionIndex]);
          return updatedQuestions;
        });
      }

      setCurrentQuestion(questionIndex);
    }
  };

  const toggleMobileView = () => {
    if (isMobile) {
      // Render a toggle button for mobile screens
      return (
        <button
          onClick={() => setIsMobile(false)}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
        >
          Toggle Question Panel
        </button>
      );
    }
  };

  return (
    <div>
      <div>
        <QuestionStats questions={questions} />
      </div>
      <div className="grid grid-cols-3 gap-4 p-5">
        {isMobile && toggleMobileView()}
        {questions.map((question, index) => (
          <button
            key={index}
            className={`${
              !question.marked_answer
                ? currentQuestion === index
                  ? question.visited === true
                    ? `${CSS.currentQuestionFocusCSS} ${CSS.visitedQuestionCSS}`
                    : `${CSS.currentQuestionFocusCSS}  ${CSS.unvisitedQuestionCSS}`
                  : question.visited === true
                  ? `${CSS.visitedQuestionCSS}`
                  : `${CSS.unvisitedQuestionCSS}`
                : currentQuestion === index
                ? `${CSS.markedQuestionCSS} ${CSS.currentQuestionFocusCSS}`
                : `${CSS.markedQuestionCSS}`
            } py-2 px-2 w-20 rounded`}
            onClick={() => handleQuestionButtonClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionPanel;
