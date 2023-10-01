import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Function to shuffle an array randomly
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function QuestionCarousel(props) {
  const { questions, setQuestions, currentQuestion, setCurrentQuestion } =
    props;
  useEffect(() => {
    sliderRef.current.slickGoTo(currentQuestion);
  }, [currentQuestion]);
  const [visitedArr, setVisitedArr] = useState([0]);
  const sliderRef = useRef(null);

  const handleVisitedQuestion = (questionIndex) => {
    setVisitedArr((prevArr) => {
      const updatedQuestions = new Set(prevArr);
      if (!updatedQuestions.has(questionIndex)) {
        updatedQuestions.add(questionIndex);
      }
      console.log("Visited question with index:", questionIndex);
      return updatedQuestions;
    });
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

      updatedQuestions[questionIndex].markedAnswer = choice;

      return updatedQuestions;
    });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-2xl p-6 my-6 text-white">
      <Slider
        ref={sliderRef}
        {...settings}
        initialSlide={0}
        slickGoTo={currentQuestion}
      >
        {questions?.map((question, index) => {
          // Combine correct and incorrect answers and shuffle them
          const choices = shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]);

          return (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-4">
                {question.question}
              </h2>

              <ul className="space-y-2">
                {choices.map((choice, choiceIndex) => (
                  <li
                    key={choiceIndex}
                    className="hover:bg-blue-400 hover:bg-opacity-50 p-2 rounded-md"
                  >
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio text-blue-300"
                        name={`choice-${index}`} // Add a unique name for each question
                        onChange={() => {
                          console.log("Selected choice:", choice);
                          handleMarkChoice(index, choice);
                        }}
                      />
                      <span className="ml-2 text-gray-300">{choice}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </Slider>
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
