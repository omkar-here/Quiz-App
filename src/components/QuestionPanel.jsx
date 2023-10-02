import React from "react";
import QuestionStats from "./QuestionStats";
export default function QuestionPanel(props) {
  const {
    questions,
    setQuestions,
    currentQuestion,
    setCurrentQuestion,
    reportPage,
  } = props;

  const CSS = {
    currentQuestionFocusCSS: "border-4 box-border border-red-400",
    visitedQuestionCSS: "bg-yellow-500 text-white font-bold",
    unvisitedQuestionCSS: "bg-blue-500 text-white font-bold",
    markedQuestionCSS: "bg-green-500 text-white font-bold",
  };

  const handleQuestionButtonClick = (questionIndex) => {
    if (reportPage === false) {
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[questionIndex].visited = true;
        return updatedQuestions;
      });
    }

    setCurrentQuestion(questionIndex);
  };
  return (
    <div>
      <div>
        <QuestionStats questions={questions} />
      </div>
      <div className="grid  grid-cols-3 gap-4 p-5">
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
