import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import he from "he";

function QuestionCarousel(props) {
  const {
    questions,
    setQuestions,
    currentQuestion,
    setCurrentQuestion,
    isTimeOut,
    reportPage,
    setReportPage,
  } = props;

  useEffect(() => {
    sliderRef.current.slickGoTo(currentQuestion);
  }, [currentQuestion, questions, isTimeOut]);

  const sliderRef = useRef(null);

  const handleVisitedQuestion = (questionIndex) => {
    if (reportPage === false) {
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[questionIndex].visited = true;
        return updatedQuestions;
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      handleVisitedQuestion(currentQuestion + 1);
      sliderRef.current.slickNext();
    }
  };

  useEffect(() => {}, [currentQuestion]);

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      handleVisitedQuestion(currentQuestion - 1);
      sliderRef.current.slickPrev();
    }
  };

  const handleMarkChoice = (questionIndex, choice) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].marked_answer = choice;
      return updatedQuestions;
    });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    fade: false,
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-2xl p-6 my-5 text-white">
      {reportPage === true ? (
        <div>
          <Slider
            ref={sliderRef}
            {...settings}
            initialSlide={currentQuestion}
            slickGoTo={currentQuestion}
          >
            {questions.map((question, index) => {
              const isMarkedCorrect =
                question.marked_answer === question.correct_answer;

              return (
                <div key={index}>
                  <h2 className="text-2xl font-semibold mb-4">
                    {he.decode(question.question)}
                  </h2>
                  <ul className="space-y-2">
                    {question.answers?.map((choice, choiceIndex) => {
                      const isChoiceCorrect =
                        choice === question.correct_answer;
                      const isChoiceMarked = choice === question.marked_answer;

                      const bgColorClass = isChoiceCorrect
                        ? "bg-green-500"
                        : isChoiceMarked
                        ? "bg-red-500"
                        : "hover:bg-blue-400 hover:bg-opacity-50";

                      return (
                        <li
                          key={choiceIndex}
                          className={`${bgColorClass} p-2 rounded-md`}
                        >
                          <label className="flex items-center cursor-pointer">
                            <input
                              disabled
                              type="radio"
                              className="form-radio text-blue-300"
                              name={`choice-${index}`}
                              onChange={() => {
                                return handleMarkChoice(index, choice);
                              }}
                            />
                            <span className="ml-2 text-gray-300">
                              {he.decode(choice)}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <Slider
          ref={sliderRef}
          {...settings}
          initialSlide={currentQuestion}
          slickGoTo={currentQuestion}
        >
          {questions.map((question, index) => {
            return (
              <div key={index}>
                <h2 className="text-2xl font-semibold mb-4">
                  {he.decode(question.question)}
                </h2>
                <ul className="space-y-2">
                  {question.answers?.map((choice, choiceIndex) => (
                    <li
                      key={choiceIndex}
                      className="hover:bg-blue-400 hover:bg-opacity-50 p-2 rounded-md"
                    >
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          className="form-radio text-blue-300"
                          name={`choice-${index}`}
                          onChange={() => {
                            return handleMarkChoice(index, choice);
                          }}
                        />
                        <span className="ml-2 text-gray-300">
                          {he.decode(choice)}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Slider>
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePrev}
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md cursor-pointer ${
            currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer ${
            currentQuestion === questions.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={currentQuestion === questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default QuestionCarousel;
