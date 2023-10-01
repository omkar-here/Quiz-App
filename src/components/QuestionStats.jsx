// QuestionStats.js

import React, { useEffect, useReducer } from "react";
import { BiSolidRectangle } from "react-icons/bi";
const initialState = {
  visitedCount: 1,
  markedCount: 0,
  unvisitedCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VISITED_COUNT":
      return { ...state, visitedCount: action.payload };
    case "UPDATE_MARKED_COUNT":
      return { ...state, markedCount: action.payload };
    case "UPDATE_UNVISITED_COUNT":
      return { ...state, unvisitedCount: action.payload };
    default:
      return state;
  }
};

function QuestionStats({ questions }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("hi");
    console.log(questions);
    // Count visited questions
    const visited = questions.filter((question) => question.visited).length;
    dispatch({ type: "UPDATE_VISITED_COUNT", payload: visited });

    // Count marked questions
    const marked = questions.filter((question) =>
      question.marked_answer ? true : false
    ).length;
    dispatch({ type: "UPDATE_MARKED_COUNT", payload: marked });

    // Count unvisited questions
    const unvisited = questions.filter((question) => !question.visited).length;
    dispatch({ type: "UPDATE_UNVISITED_COUNT", payload: unvisited });
  }, [questions]);

  return (
    <div className="p-2">
      <div className="mb-4 flex  items-center">
        <div className="bg-yellow-500 w-5 h-5  inline-block mr-2"></div>
        <span className="text-lg font-semibold inline-block  mr-2">
          Visited Questions:
        </span>
        <span className="text-xl text-yellow-500">{state.visitedCount}</span>
      </div>
      <div className="mb-4 flex items-center">
        <div className="bg-green-500 w-5 h-5 inline-block mr-2"></div>
        <span className="text-lg font-semibold inline-block  mr-2">
          Marked Questions:
        </span>
        <span className="text-xl text-green-500">{state.markedCount}</span>
      </div>
      <div className="mb-4 flex items-center">
        <div className="bg-blue-500 w-5 h-5 inline-block mr-2"></div>
        <span className="text-lg font-semibold inline-block  mr-2">
          Unvisited Questions:
        </span>
        <span className="text-xl text-blue-500">{state.unvisitedCount}</span>
      </div>
    </div>
  );
}

export default QuestionStats;
