import React, { useState, useEffect } from "react";

function QuizQuestion({ question, onSelectAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  useEffect(() => {
    onSelectAnswer(question.id, selectedAnswer);
  }, [selectedAnswer, onSelectAnswer, question.id]);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">{question.question}</h2>
      <ul>
        {question.choices.map((choice, index) => (
          <li key={index} className="mb-2">
            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={choice}
                checked={selectedAnswer === choice}
                onChange={handleAnswerChange}
              />
              {choice}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default QuizQuestion;